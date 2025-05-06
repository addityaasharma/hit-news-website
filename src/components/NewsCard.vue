<script setup>
import { defineProps, ref } from 'vue'
import { useNewsCardStore } from '@/stores/NewsCardStore'

const link = window.location.href;
const isVisible = ref(false) // Default is false, so link is hidden initially

// Toggle link sharing panel visibility
const toggleLinkVisibility = () => {
  isVisible.value = !isVisible.value;
}


const props = defineProps({
  article: Object,
})

const stripAndLimit = (htmlContent, wordLimit = 25) => {
  const stripped = htmlContent.replace(/<\/?[^>]+(>|$)/g, '');  // Remove HTML tags
  const words = stripped.split(/\s+/).slice(0, wordLimit).join(' ');
  return words + '...'; // Append ellipsis
}

const newsCardStore = useNewsCardStore()
</script>

<template>
  <router-link :to="`/${article.id}`"
    class="block bg-white p-6 hover:bg-gray-50 transition-all rounded-lg shadow-lg hover:shadow-xl">
    <div class="flex flex-col gap-4">
      <!-- Row 1: Title + Content | Image -->
      <div class="flex justify-between items-start gap-6">
        <!-- Left side: Title + Content -->
        <div class="flex flex-col flex-grow">
          <p class="text-lg font-semibold text-[#F92323] mb-2 md:text-xl">
            {{ article?.title }}
          </p>
          <span class="text-base font-medium text-[#4D4D4D] md:text-sm">
            {{ stripAndLimit(article.content) }}
          </span>
        </div>

        <!-- Right side: Image -->
        <div class="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <img :src="article.image || '/fallback.jpg'" alt="Article Image"
            class="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <!-- Row 2: Category | Icons -->
      <div class="flex justify-between items-center mt-3">
        <!-- Category -->
        <span class="text-sm text-[#ADADAD] font-medium">
          {{ article.category }}
        </span>

        <!-- Icons -->
        <div class="flex gap-3">
          <div v-for="icon in newsCardStore.icons" :key="icon.name" :class="icon.name"
            class="text-xl text-[#ADADAD] hover:text-gray-900 cursor-pointer"
            @click.stop.prevent="toggleLinkVisibility"></div>
        </div>
      </div>

      <!-- Row 3: Author | Time -->
      <div class="flex justify-between items-center text-sm text-gray-500 mt-2">
        <!-- Author -->
        <span class="font-medium text-gray-700">By {{ article.author }}</span>

        <!-- Time -->
        <span>
          {{ article?.createdAt ? newsCardStore.formatDate(article.createdAt) : '' }}
        </span>
      </div>
    </div>
  </router-link>

  <!-- Link sharing panel -->
  <div v-if="isVisible"
    class="mt-2 p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg flex justify-between items-center">
    <span class="truncate flex-grow">{{ link }}</span>
    <button @click="toggleLinkVisibility" class="ml-2 p-1 text-gray-500 hover:text-gray-700"
      aria-label="Close link sharing">
      <!-- <span class="pi pi-times"></span> -->
    </button>
  </div>

</template>

<style scoped>
/* Style improvements */
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

.text {
  color: #ADADAD;
}

.font-medium {
  font-weight: 500;
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
