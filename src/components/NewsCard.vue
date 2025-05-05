<script setup>
import { defineProps } from 'vue'
import { useNewsCardStore } from '@/stores/NewsCardStore'

const props = defineProps({
  article: Object,
})

const stripAndLimit = (htmlContent, wordLimit = 25) => {
  const stripped = htmlContent.replace(/<\/?[^>]+(>|$)/g, '')
  const words = stripped.split(/\s+/).slice(0, wordLimit).join(' ')
  return words + ' '
}

// const truncateContent = (htmlContent) => {
//   const tempDiv = document.createElement('div')
//   tempDiv.innerHTML = htmlContent
//   const plainText = tempDiv.textContent || tempDiv.innerText || ''
//   return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText
// }

const newsCardStore = useNewsCardStore()
</script>

<template>
  <router-link
    :to="`/${article.id}`"
    class="block bg-white p-4 hover:bg-gray-50 transition rounded-lg"
  >
    <div class="flex flex-col gap-3">
      <!-- Row 1: Title + Content | Image -->
      <div class="flex justify-between items-start gap-4">
        <!-- Left side: Title + Content -->
        <p class="gap-1 text-lg font-bold text-[#F92323] md:text-base">
          {{ article?.title }}
          <span class="text-base font-medium text-[#4D4D4D] md:text-sm md:font-medium">
            {{ stripAndLimit(article.content) }}
          </span>

          <!-- Right side: Image -->
        </p>

        <div class="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <img
            :src="article.image || '/fallback.jpg'"
            alt="Article Image"
            class="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      <!-- Row 2: Category | Icons -->
      <div class="flex justify-between items-center">
        <!-- Category -->
        <span class="text-sm text-[#ADADAD] font-medium">
          {{ article.category }}
        </span>

        <!-- Icons -->
        <div class="flex gap-2">
          <span
            v-for="icon in newsCardStore.icons"
            :key="icon.name"
            :class="icon.name"
            class="text-xl text-[#ADADAD] hover:text-gray-900 cursor-pointer"
          />
        </div>
      </div>

      <!-- Row 3: Author | Time -->
      <div class="flex justify-between items-center text-sm text-gray-500">
        <!-- Author -->
        <span class="font-medium text-gray-700"> By {{ article.author }} </span>

        <!-- Time -->
        <span>
          {{ article?.createdAt ? newsCardStore.formatDate(article.createdAt) : '' }}
        </span>
      </div>
    </div>
  </router-link>
</template>
