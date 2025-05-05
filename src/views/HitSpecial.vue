<script setup>
import { useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import DetailTopbar from '@/components/DetailTopbar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useNewsStore } from '@/stores/NewsStore'

const route = useRoute()
const newsStore = useNewsStore()
const isLoading = ref(true)

const article = computed(() => newsStore.getArticleById(route.params.id))

const icons = [{ name: 'pi pi-whatsapp' }, { name: 'pi pi-facebook' }, { name: 'pi pi-link' }]

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

// const shortIntro = computed(() => stripTags(article.value?.content || '').slice(0, 250))
// const remainingContent = computed(() => stripTags(article.value?.content || '').slice(250))

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
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Mobile Topbar -->
    <div class="fixed top-0 left-0 right-0 z-50 block lg:hidden bg-white shadow-md">
      <DetailTopbar />
    </div>

    <div v-if="isLoading" class="text-center py-20">
      <span>Loading...</span>
    </div>

    <div
      v-else
      class="space-y-4 mx-auto max-w-screen-xl w-full overflow-x-hidden px-2 md:px-6 lg:px-4 xl:px-4 pt-20 lg:pt-4 pb-10"
    >
      <!-- Breadcrumb on Desktop -->
      <div class="hidden lg:block">
        <Breadcrumb />
      </div>

      <!-- Title + Intro -->
      <div class="space-y-2">
        
        <p class="text-lg font-bold text-[#2EA965] md:text-base">
          {{ article?.title }} :
          <span class="font-medium text-[#4D4D4D] md:text-sm md:font-medium">
            {{ shortIntro }}
          </span>
        </p>
      </div>

      <!-- Meta Info -->
      <div
        class="flex justify-between text-sm text-[#ADADAD] font-semibold border-b border-dotted pb-2"
      >
        <span>{{ formatDate(article?.createdAt) }}</span>
        <span>By {{ article?.author }}</span>
      </div>

      <!-- Main Image -->
      <div>
        <img
          :src="article?.image || '/fallback.jpg'"
          alt="News Image"
          class="w-full max-h-[350px] object-cover rounded-md shadow-sm"
        />
      </div>

      <!-- Category + Share Icons -->
      <div class="flex justify-between items-center text-sm text-[#ADADAD] pt-2">
        <span class="font-medium">{{ article?.category }}</span>
        <div class="flex gap-4">
          <span
            v-for="(icon, index) in icons"
            :key="index"
            :class="['text-xl', icon.name]"
            class="hover:text-gray-900 cursor-pointer"
          />
        </div>
      </div>

      <!-- Remaining Content -->
      <div class="pt-4 text-base text-gray-800 whitespace-pre-line h-auto" v-html="article.content">
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
import { useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import DetailTopbar from '@/components/DetailTopbar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useNewsStore } from '@/stores/NewsStore'

const route = useRoute()
const newsStore = useNewsStore()
const isLoading = ref(true)

const article = computed(() => newsStore.getArticleById(route.params.id))

const icons = [{ name: 'pi pi-whatsapp' }, { name: 'pi pi-facebook' }, { name: 'pi pi-link' }]

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
    console.log(article.value)
    newsStore.fetchAllArticles().finally(() => {
      isLoading.value = false
    })
  } else {
    isLoading.value = false
  }
})
// onMounted(() => {
//   if (!article.value) {
//     console.log(article.value)
//     newsStore.fetchAllArticles()
//   }
// })

function stripTags(html) {
  if (!html) return ''
  return html.replace(/<\/?[^>]+(>|$)/g, '')
}
</script>

<template>
  <div class="relative h-screen">
    <div class="fixed top-0 left-0 right-0 z-50 block lg:hidden bg-white shadow-md">
      <DetailTopbar />
    </div>
    <div v-if="isLoading" class="text-center py-20">
      <span>Loading...</span>
    </div>

    <div
      v-else
      class="space-y-4 mx-auto max-w-screen-xl w-full overflow-x-hidden px-2 md:px-6 lg:px-4 xl:px-4 pt-20 lg:pt-4"
    >
      <div class="hidden lg:block">
        <Breadcrumb />
      </div>

      <div class="space-y-2">
        <p class="gap-1 text-lg font-bold text-[#2EA965] md:text-base">
          {{ article?.title }} :
          <span class="text-base font-medium text-[#4D4D4D] md:text-sm md:font-medium">
            {{ stripTags(article.content) }}
          </span>
        </p>
      </div>

      <div
        class="flex justify-between text-sm text-[#ADADAD] font-semibold border-b border-dotted pb-2"
      >
        <span>{{ formatDate(article?.createdAt) }}</span>
        <span>By {{ article?.author }}</span>
      </div>

      <div>
        <img
          :src="article?.image || '/fallback.jpg'"
          alt="News Image"
          class="w-full max-h-[350px] object-cover rounded-md shadow-sm"
        />
      </div>

      <div class="flex justify-between items-center text-sm text-[#ADADAD] pt-2">
        <span class="font-medium">{{ article?.category }}</span>
        <div class="flex gap-4">
          <span
            v-for="(icon, index) in icons"
            :key="index"
            :class="['text-xl', icon.name]"
            class="hover:text-gray-900 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template> -->
