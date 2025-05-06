<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSidebarStore } from '@/stores/SidebarStore'
import { useNewsStore } from '@/stores/NewsStore'

const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()
const sidebarStore = useSidebarStore()
const activeCategorys = ref('')

const isMobileSidebarOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

// Get current active category from route or store
const activeCategory = computed(() => {
  return sidebarStore.currentCategory || null
})

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
  activeCategorys.value = categoryName  // ✅ set active category
  sidebarStore.setCategory(categoryName)
  newsStore.setArticlesByCategory(categoryName)
  router.push({ name: 'newsfeed' })
  isMobileSidebarOpen.value = false
}


// Close sidebar when clicking outside on mobile
const handleOutsideClick = (event) => {
  if (!isDesktop.value &&
    isMobileSidebarOpen.value &&
    !event.target.closest('nav') &&
    !event.target.closest('button')) {
    isMobileSidebarOpen.value = false
  }
}

// Add event listener for outside clicks
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div>
    <!-- Overlay when mobile sidebar is open -->
    <div v-if="!isDesktop && isMobileSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-30"
      @click="isMobileSidebarOpen = false"></div>

    <!-- Toggle Button for Mobile -->
    <button v-show="!isDesktop" class="fixed top-4 left-4 z-50 bg-white rounded-md shadow-md p-2 focus:outline-none"
      @click.stop="isMobileSidebarOpen = !isMobileSidebarOpen" aria-label="Toggle sidebar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Sidebar -->
    <nav :class="[
      'top-0 left-0 h-screen z-40 bg-white transition-all duration-300 ease-in-out',
      isDesktop ? 'static border-r' : 'fixed shadow-lg border-r',
      !isDesktop && !isMobileSidebarOpen ? '-translate-x-full' : 'translate-x-0',
      'p-4 space-y-6 min-w-[200px] md:min-w-[210px] lg:min-w-[100px]'
    ]">
      <!-- Logo -->
      <div @click="goToNewsFeed" class="w-full text-center cursor-pointer">
        <img :src="sidebarStore.logo" alt="logo" class="max-h-[60px] w-auto mx-auto object-contain mt-4 mb-4" />
      </div>

      <!-- Categories -->
      <!-- <div class="flex flex-col items-start space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-1 scrollbar-hide">
        <button v-for="category in sidebarStore.categories" :key="category._id" @click="handleClick(category.name)"
          :class="[
            'flex items-center space-x-2 text-[15px] rounded-md px-2 py-2 w-full text-left transition-colors',
            activeCategory === category.name ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
          ]">
          <img :src="category.image" alt="category image" class="w-5 h-5 shrink-0" />
          <span class="truncate">{{ category.name }}</span>
        </button>
      </div> -->
      <div class="flex flex-col items-start space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-1 scrollbar-hide">
        <button v-for="category in sidebarStore.categories" :key="category._id" @click="handleClick(category.name)"
          :class="[
            'flex items-center space-x-2 text-[15px] rounded-md px-2 py-2 w-full text-left transition-colors',
            activeCategorys === category.name ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-800'
          ]">
          <img :src="category.image" alt="category image" class="w-5 h-5 shrink-0" />
          <span class="truncate">{{ category.name }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>