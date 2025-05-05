<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const icons = [{ name: 'pi pi-whatsapp' }, { name: 'pi pi-facebook' }, { name: 'pi pi-link' }]
const backIcon = { name: 'pi pi-arrow-left' }

// Go to NewsFeed route
const goToNewsFeed = () => {
  router.push({ name: 'newsfeed' })
  console.log(goToNewsFeed)
}
</script>

<template>
  <div class="lg:hidden px-2 pt-1 m-3">
    <div class="flex items-center justify-between">
      <span
        :class="backIcon.name"
        class="text-xl text-[#ADADAD] hover:text-gray-900 cursor-pointer"
        @click="goToNewsFeed"
      />

      <!-- Share Icons -->
      <div class="flex gap-4">
        <span
          v-for="icon in icons"
          :key="icon.name"
          :class="icon.name"
          class="text-xl text-[#ADADAD] hover:text-gray-900 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
