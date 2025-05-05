import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSidebarStore = defineStore('sidebar', () => {
  const selectedCategory = ref('TOP NEWS')
  const whatsappText = 'Join Our Group'
  const categories = ref([])
  const logo = ref('')

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://backend-5gsq.onrender.com/categoryroutes')
      categories.value = response.data.data
      // console.log('Fetched categories:', categories.value)
    } catch (error) {
      console.error('Failed to fetch categories:', error.message)
    }
  }

  const logoImage = async () => {
    try {
      const response = await axios.get('https://backend-5gsq.onrender.com/logoroutes')
      // console.log(response)
      logo.value = response.data.logo[0].image
    } catch (error) {
      console.error('Fail to fetch logo:', error.message)
    }
  }

  const setCategory = (label) => {
    selectedCategory.value = label
  }

  // const getApiImageUrl = (filename) => `http://192.168.1.44:5000/uploads/${filename}`

  // const getImageUrl = (filename) => new URL(`../assets/images/${filename}`, import.meta.url).href
  // const logoUrl = new URL('../assets/logo.png', import.meta.url).href
  const whatsappIcon = new URL('../assets/images/logos_whatsapp-icon.svg', import.meta.url).href

  return {
    categories,
    selectedCategory,
    setCategory,
    // getImageUrl,
    // logoUrl,
    whatsappIcon,
    whatsappText,
    fetchCategories,
    logoImage,
    logo,
  }
})
