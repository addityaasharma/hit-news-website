<script setup>
import { defineProps } from 'vue'
import { useFeaturedNewsStore } from '@/stores/FeaturedNewsStore'
const props = defineProps({
  article: Object,
})

const FeaturedNewsStore = useFeaturedNewsStore()

const stripAndLimit = (htmlContent, wordLimit = 45) => {
  const stripped = htmlContent.replace(/<\/?[^>]+(>|$)/g, '')
  const words = stripped.split(/\s+/).slice(0, wordLimit).join(' ')
  return words + ' '
}
</script>

<template>
  <router-link :to="`/${article.id}`" class="block bg-white">
    <div class="-mt-14 lg:mt-16">
      <div class="flex flex-wrap items-baseline gap-1">
        <p class="gap-1 text-lg font-bold text-[#2EA965] md:text-base">
          {{ article?.title }} :
          <span class="text-base font-medium text-[#4D4D4D] md:text-sm md:font-medium">
            {{ stripAndLimit(article.content) }}
          </span>
        </p>
      </div>
    </div>

    <div class="text-sm text-gray-500 flex items-center justify-between gap-2 p-2">
      <span class="font-medium text-[#4D4D4D]">By {{ article.author }}</span>
      <span class="text-[#4D4D4D]">
        at {{ article?.createdAt ? FeaturedNewsStore.formatDate(article.createdAt) : '' }}</span
      >
    </div>

    <div class="w-full h-64 md:h-72 lg:h-80 overflow-hidden rounded-md">
      <img
        :src="article.image || '/fallback.jpg'"
        alt="Article Image"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex justify-between items-center text-sm text-[#ADADAD] pt-4">
      <span class="font-medium">{{ article?.category }}</span>
      <div class="flex gap-3">
        <!-- <span
          v-for="(icon, index) in FeaturedNewsStore.icons"
          :key="index"
          :class="['text-xl', icon.name]"
          class="hover:text-gray-900 cursor-pointer"
        /> -->
        <!-- <a
          v-for="(icon, index) in FeaturedNewsStore.icons"
          :key="index"
          :href="icon.link"
          class="text-xl hover:text-gray-900 cursor-pointer"
        >
          <span :class="icon.name" />
        </a> -->
      </div>
    </div>
  </router-link>
</template>
