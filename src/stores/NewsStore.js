import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useNewsStore = defineStore('news', () => {
  const articles = ref([])
  const selectedArticles = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const featuredArticle = computed(() => selectedArticles.value[0])
  const regularArticles = computed(() => selectedArticles.value.slice(1))
  const getArticleById = (id) => articles.value.find((article) => article.id === id)
  const getArticlesByCategory = (category) =>
    articles.value.filter((article) => article.category === category)

  const fetchAllArticles = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await axios.get('https://backend-5gsq.onrender.com/newsroutes',{
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      })
      // console.log(res.data)
      articles.value = res.data.message.map((article) => ({
        id: article._id,
        title: article.title,
        content: article.content,
        image: article.image || '',
        category: article.category?.name || '',
        createdAt: article.createdAt,
        author: article.author?.username || 'Unknown Author',
      }))
      selectedArticles.value = articles.value
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const setArticlesByCategory = (category) => {
    if (category === 'TopNews') {
      selectedArticles.value = articles.value
    } else {
      selectedArticles.value = articles.value.filter((article) => article.category === category)
    }
    console.log('Filtering articles for:', category)
  }

  return {
    articles,
    selectedArticles,
    isLoading,
    error,
    featuredArticle,
    regularArticles,
    getArticleById,
    getArticlesByCategory,
    fetchAllArticles,
    setArticlesByCategory,
  }
})
