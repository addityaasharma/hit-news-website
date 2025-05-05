<script setup>
import { useSidebarStore } from '@/stores/SidebarStore'
import { onMounted } from 'vue'

import { useNewsStore } from '@/stores/NewsStore'

const newsStore = useNewsStore()
const sidebarStore = useSidebarStore()

onMounted(() => {
  sidebarStore.fetchCategories()
  sidebarStore.logoImage()
})

const handleClick = (categoryName) => {
  console.log('Clicked category:', categoryName)
  sidebarStore.setCategory(categoryName)
  newsStore.setArticlesByCategory(categoryName)
}
</script>

<template>
  <nav class="block lg:hidden sticky top-0 z-20 bg-white shadow-sm">
    <div class="flex items-center justify-between px-4 w-full">
      <div class="w-28 h-20 sm:w-28 sm:h-26 md:w-32 md:h-28 lg:w-40 lg:h-32">
        <img
          :src="sidebarStore.logo"
          alt="logo"
          class="max-h-[60px] w-auto mx-auto object-contain mt-4 mb-4"
        />
      </div>

      <div
        class="flex items-center gap-2 px-3 py-2 bg-[#F6F6F6] border rounded-full w-fit sm:w-[180px] md:w-[190px] lg:w-[180px]"
      >
        <img :src="sidebarStore.whatsappIcon" alt="WhatsApp" class="w-6 h-6 sm:w-4 sm:h-4" />
        <span class="text-xs sm:text-sm md:text-base font-medium text-[#4D4D4D] whitespace-nowrap">
          {{ sidebarStore.whatsappText }}
        </span>
      </div>
    </div>

    <!-- Category Buttons Scroll -->
    <div class="flex whitespace-nowrap w-full px-4 space-x-4 overflow-x-auto pb-2">
      <button
        v-for="category in sidebarStore.categories"
        :key="category._id"
        @click="handleClick(category.name)"
        class="flex-shrink-0 flex items-center gap-2 px-2 py-2 text-sm sm:text-base rounded-md hover:bg-gray-200 transition"
      >
        <div class="flex items-center gap-2">
          <img :src="category.image" alt="category image" class="w-5 h-5" />
          <span class="whitespace-nowrap">{{ category.name }}</span>
        </div>
      </button>
    </div>
  </nav>
</template>
