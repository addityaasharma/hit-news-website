import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHitSpecialStore = defineStore('hitSpecial', () => {
  const article = ref(null)
  const icons = [{ name: 'pi pi-whatsapp' }, { name: 'pi pi-facebook' }, { name: 'pi pi-link' }]

  const fetchArticleById = (id) => {
    article.value = newsList.find((item) => item.id === parseInt(id))
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })

    const formattedTime = date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    })

    return `${formattedDate}, ${formattedTime}`
  }


  // const headLineImage = new URL('../assets/images/Rectangle 2.svg', import.meta.url).href

  // const headLineSubImage = new URL('../assets/images/Rectangle 3.svg', import.meta.url).href

  return {
    article,
    icons,
    fetchArticleById,
    formatDate,
    headLineImage,
    headLineSubImage,
  }
})
