<script setup>
import { useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import DetailTopbar from '@/components/DetailTopbar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useNewsStore } from '@/stores/NewsStore'

const route = useRoute()
const newsStore = useNewsStore()
const isLoading = ref(true)
const showToast = ref(false)
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

const article = computed(() => newsStore.getArticleById(route.params.id))

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  })
  return `${formattedDate}, ${formattedTime}`
}

onMounted(() => {
  if (!article.value) {
    newsStore.fetchAllArticles().finally(() => {
      isLoading.value = false
    })
  } else {
    isLoading.value = false
  }
})

function stripTags(html) {
  if (!html) return ''
  return html.replace(/<\/?[^>]+(>|$)/g, '')
}

const fullContent = computed(() => stripTags(article.value?.content || ''))

const shortIntro = computed(() => {
  const text = fullContent.value.slice(0, 300)

  const punctuations = ['.', '?', '|', '।']
  let cutIndex = -1

  for (let punc of punctuations) {
    const index = text.lastIndexOf(punc)
    if (index > cutIndex) cutIndex = index
  }

  if (cutIndex > 100) {
    return text.slice(0, cutIndex + 1).trim()
  }

  const lastSpace = text.lastIndexOf(' ')
  return text.slice(0, lastSpace !== -1 ? lastSpace : 250).trim()
})

const remainingContent = computed(() => {
  let remaining = fullContent.value.slice(shortIntro.value.length).trim()

  const weakStarts = /^(is|are|was|were|a|an|the|but|and|or|so)\b/i
  remaining = remaining.replace(weakStarts, '').trimStart()

  return remaining
})

const linkeddisplay = ref(false)
const link = window.location.href;

const handleLinkClick = () => {
  linkeddisplay.value = !linkeddisplay.value
}

const closeModal = () => {
  linkeddisplay.value = false
}
</script>

<template>
  <div class="relative min-h-screen bg-gray-100">
    <!-- Mobile Topbar -->
    <div class="fixed top-0 left-0 right-0 z-50 block lg:hidden bg-white shadow-md">
      <DetailTopbar />
    </div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="text-center py-20">
      <span class="text-lg font-semibold text-gray-500">Loading...</span>
    </div>

    <div v-else class="space-y-8 mx-auto max-w-screen-xl w-full overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <!-- Breadcrumb on Desktop -->
      <div class="hidden lg:block">
        <Breadcrumb />
      </div>

      <!-- Title + Intro -->
      <div class="space-y-3">
        <p class="text-2xl font-bold text-[#2EA965] leading-tight">
          {{ article?.title }} :
          <span class="text-lg font-medium text-[#4D4D4D]">{{ shortIntro }}</span>
        </p>
      </div>

      <!-- Meta Info -->
      <div class="flex justify-between text-sm text-[#ADADAD] font-semibold border-b border-dotted pb-2">
        <span>{{ formatDate(article?.createdAt) }}</span>
        <span>By {{ article?.author }}</span>
      </div>

      <!-- Main Image -->
      <div class="mt-4">
        <img :src="article?.image || '/fallback.jpg'" alt="News Image"
          class="w-full max-h-[350px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
      </div>

      <!-- Category + Share Icons -->
      <div class="flex justify-between items-center text-sm text-[#ADADAD] pt-2">
        <span class="font-semibold">{{ article?.category }}</span>
        <div class="flex gap-4">
          <!-- Share Icon -->
          <span v-for="(icon, index) in [{ name: 'pi pi-link' }]" :key="index"
            :class="['text-xl', icon.name, 'hover:text-[#2EA965] cursor-pointer transition-colors']"
            @click="copyToClipboard" />
        </div>
      </div>

      <!-- Link Modal -->
      <!-- <div v-if="linkeddisplay"
        class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-white border border-gray-300 shadow-lg rounded-xl px-4 py-3 flex items-center justify-between gap-2">
        Link Text
        <span class="text-sm text-gray-800 truncate flex-1">{{ link }}</span>

        Close Button
        <button @click="closeModal" class="text-base font-bold text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Close">
          &times;
        </button>
      </div> -->
      <div v-if="showToast"
        class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300">
        Link copied to clipboard!
      </div>


      <!-- Background Blur when modal is open -->
      <div v-if="linkeddisplay" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

      <!-- Remaining Content -->
      <div class="pt-6 text-base text-gray-800 whitespace-pre-line space-y-4" v-html="article.content">
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive padding for mobile devices */
@media (max-width: 640px) {
  .lg\:pt-4 {
    padding-top: 2rem;
  }

  .lg\:px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .lg\:block {
    display: block;
  }

  .lg\:hidden {
    display: none;
  }
}

/* Subtle shadow for images */
img {
  transition: all 0.3s ease;
}

img:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Modal styling */
button {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 1.5rem;
  cursor: pointer;
}

button:hover {
  color: #f44336;
  /* Red color for hover */
}

/* Background Blur */
.backdrop-blur-sm {
  backdrop-filter: blur(5px);
  /* Adds a blur effect to the background */
}
</style>
