<script setup>
import { defineProps, ref } from 'vue'
import { useNewsCardStore } from '@/stores/NewsCardStore'

const link = window.location.href
const showToast = ref(false)

const props = defineProps({
  article: Object,
})

const newsCardStore = useNewsCardStore()

// Function to strip HTML and limit word count
const stripAndLimit = (htmlContent, wordLimit = 25) => {
  const stripped = htmlContent.replace(/<\/?[^>]+(>|$)/g, '')
  const words = stripped.split(/\s+/).slice(0, wordLimit).join(' ')
  return words + '...'
}

// Copy link to clipboard and show toast
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(link)
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 5000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
</script>

<template>
  <router-link :to="`/${article.id}`"
    class="block bg-white p-6 hover:bg-gray-50 transition-all rounded-lg shadow-lg hover:shadow-xl">
    <div class="flex flex-col gap-4">
      <!-- Row 1: Title + Content | Image -->
      <div class="flex justify-between items-start gap-6">
        <!-- Left: Title and Content -->
        <div class="flex flex-col flex-grow">
          <p class="text-lg font-semibold text-[#F92323] mb-2 md:text-xl">
            {{ article?.title }}
          </p>
          <span class="text-base font-medium text-[#4D4D4D] md:text-sm">
            {{ stripAndLimit(article.content) }}
          </span>
        </div>

        <!-- Right: Image -->
        <div class="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <img :src="article.image || '/fallback.jpg'" alt="Article Image"
            class="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <!-- Row 2: Category | Icons -->
      <div class="flex justify-between items-center mt-3">
        <span class="text-sm text-[#ADADAD] font-medium">
          {{ article.category }}
        </span>

        <!-- Share Icon -->
        <div class="flex gap-3">
          <div v-for="icon in newsCardStore.icons" :key="icon.name" :class="icon.name"
            class="text-xl text-[#ADADAD] hover:text-gray-900 cursor-pointer"
            @click.stop.prevent="copyToClipboard">
          </div>
        </div>
      </div>

      <!-- Row 3: Author | Time -->
      <div class="flex justify-between items-center text-sm text-gray-500 mt-2">
        <span class="font-medium text-gray-700">By {{ article.author }}</span>
        <span>
          {{ article?.createdAt ? newsCardStore.formatDate(article.createdAt) : '' }}
        </span>
      </div>
    </div>
  </router-link>

  <!-- Toast notification -->
  <div v-if="showToast"
    class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300">
    Link copied to clipboard!
  </div>
</template>

<style scoped>
.block {
  display: block;
}
.bg-white {
  background-color: white;
}
.p-6 {
  padding: 1.5rem;
}
.rounded-lg {
  border-radius: 0.75rem;
}
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.hover\:shadow-xl:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
.transition-all {
  transition: all 0.3s ease-in-out;
}
.text-lg {
  font-size: 1.125rem;
}
.text-[#F92323] {
  color: #F92323;
}
.text-[#4D4D4D] {
  color: #4D4D4D;
}
.font-semibold {
  font-weight: 600;
}
.text-base {
  font-size: 1rem;
}
.md\:text-xl {
  font-size: 1.25rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.text-sm {
  font-size: 0.875rem;
}
.text-gray-500 {
  color: #6B7280;
}
.text-gray-900 {
  color: #111827;
}
.text-xl {
  font-size: 1.25rem;
}
.cursor-pointer {
  cursor: pointer;
}
.hover\:text-gray-900:hover {
  color: #111827;
}
.flex-grow {
  flex-grow: 1;
}
</style>
