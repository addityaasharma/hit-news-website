<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/SidebarStore'
import { useNewsStore } from '@/stores/NewsStore'

const router = useRouter()
const newsStore = useNewsStore()
const sidebarStore = useSidebarStore()

const isMobileSidebarOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

const updateScreenSize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) {
    isMobileSidebarOpen.value = false
  }
}

onMounted(() => {
  sidebarStore.fetchCategories()
  sidebarStore.logoImage()
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})

const goToNewsFeed = () => {
  sidebarStore.setCategory(null)
  newsStore.fetchAllArticles()
  router.push({ name: 'newsfeed' })
  isMobileSidebarOpen.value = false
}

const handleClick = (categoryName) => {
  console.log('Clicked category:', categoryName)
  router.push({ name: 'newsfeed' })
  sidebarStore.setCategory(categoryName)
  newsStore.setArticlesByCategory(categoryName)
  isMobileSidebarOpen.value = false
}
</script>

<template>
  <!-- Toggle Button for Mobile -->
  <button
    v-show="!isDesktop"
    class="fixed top-4 left-4 z-50 bg-white rounded-md shadow-md p-2"
    @click="isMobileSidebarOpen = !isMobileSidebarOpen"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Sidebar -->
  <nav
    v-show="isDesktop || isMobileSidebarOpen"
    :class="[
      'top-0 left-0 h-screen z-40 bg-white transition-transform duration-300 ease-in-out',
      isDesktop ? 'static border-r' : 'fixed shadow-lg border-r translate-x-0',
      isMobileSidebarOpen && !isDesktop ? 'translate-x-0' : (!isDesktop ? '-translate-x-full' : ''),
      'p-4 space-y-6 min-w-[200px] md:min-w-[210px] lg:min-w-[220px]'
    ]"
  >
    <!-- Logo -->
    <div @click="goToNewsFeed" class="w-full text-center cursor-pointer">
      <img
        :src="sidebarStore.logo"
        alt="logo"
        class="max-h-[60px] w-auto mx-auto object-contain mt-4 mb-4"
      />
    </div>

    <!-- Categories -->
    <div
      class="flex flex-col items-start space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-1 
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
    >
      <button
        v-for="category in sidebarStore.categories"
        :key="category._id"
        @click="handleClick(category.name)"
        class="flex items-center space-x-2 text-[15px] hover:bg-gray-200 rounded-md px-2 py-2 w-full text-left"
      >
        <img :src="category.image" alt="category image" class="w-5 h-5 shrink-0" />
        <span class="truncate">{{ category.name }}</span>
      </button>
    </div>
  </nav>
</template>
