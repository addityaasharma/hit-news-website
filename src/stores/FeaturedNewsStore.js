import { defineStore } from 'pinia'

export const useFeaturedNewsStore = defineStore('featuredNews', () => {
  const icons = [{ name: 'pi pi-link' }]
  // const icons = ref([
  //   { name: 'pi pi-whatsapp', link: 'https://wa.me/your-phone-number' },
  //   { name: 'pi pi-facebook', link: 'https://facebook.com/your-profile' },
  //   { name: 'pi pi-link', link: 'https://your-link.com' },
  // ])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const topImage = new URL('../assets/images/Rectangle 2.svg', import.meta.url).href

  return {
    icons,
    formatDate,
    topImage,
  }
})
