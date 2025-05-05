<script setup>
import FeaturedNews from '@/components/FeaturedNews.vue'
import NewsCard from '@/components/NewsCard.vue'
import Navbar from './Navbar.vue'
import Button from './Button.vue'

import { useNewsStore } from '@/stores/NewsStore'
import { onMounted } from 'vue'

const newsStore = useNewsStore()

onMounted(() => {
  if (!newsStore.articles.length) {
    newsStore.fetchAllArticles()
    console.log(newsStore)
  }
})
</script>

<template>
  <div class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
    <Navbar />
  </div>
  <div class="mt-[130px] lg:mt-0">
    <!-- <div class="relative space-y-2 mt-[20%] md:mt-0 mx-auto px-2 sm:px-4 md:px-6 lg:px-8"> -->
    <div class="relative space-y-2 mt-[20%] md:mt-0 mx-auto px-2 sm:px-4">
      <router-link v-if="newsStore.featuredArticle" :to="`/${newsStore.featuredArticle.id}`">
        <FeaturedNews :article="newsStore.featuredArticle" />
      </router-link>

      <div class="flex flex-col gap-4 w-full">
        <router-link
          v-for="article in newsStore.regularArticles"
          :key="article.id"
          :to="`/${article.id}`"
          class="block"
        >
          <NewsCard :article="article" />
        </router-link>
      </div>

      <div class="fixed bottom-0 left-0 right-0 z-50 bg-white block lg:hidden">
        <Button />
      </div>
    </div>
  </div>
</template>
