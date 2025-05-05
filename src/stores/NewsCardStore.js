import { defineStore } from 'pinia'

export const useNewsCardStore = defineStore('newsCard', () => {
  const icons = [{ name: 'pi pi-link' }]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const frameImage = new URL('../assets/images/Frame 18.svg', import.meta.url).href

  return {
    icons,
    formatDate,
    frameImage,
  }
})
