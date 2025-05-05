<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useSidebarStore } from '@/stores/SidebarStore'
import { useNewsStore } from '@/stores/NewsStore'

const router = useRouter()
const newsStore = useNewsStore()
const sidebarStore = useSidebarStore()

onMounted(() => {
  sidebarStore.fetchCategories()
  sidebarStore.logoImage()
})

const goToNewsFeed = () => {
  sidebarStore.setCategory(null)
  newsStore.fetchAllArticles()
  router.push({ name: 'newsfeed' })
}

const handleClick = (categoryName) => {
  console.log('Clicked category:', categoryName)
  router.push({ name: 'newsfeed' })
  sidebarStore.setCategory(categoryName)
  newsStore.setArticlesByCategory(categoryName)
}
</script>

<template>
  <nav
    class="hidden md:block h-screen border-r border-black border-opacity-20 p-4 space-y-6 min-w-[200px] md:min-w-[210px] lg:min-w-[220px] md:pl-4"
  >
    <!-- Sidebar Logo -->
    <!-- <router-link :to="{ name: 'newsfeed' }"> -->
    <div @click="goToNewsFeed" class="w-full text-center cursor-pointer">
      <img
        :src="sidebarStore.logo"
        alt="logo"
        class="max-h-[60px] w-auto mx-auto object-contain mt-4 mb-4"
      />
    </div>

    <!-- Sidebar Categories -->
    <div
      class="flex flex-col items-start space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
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
