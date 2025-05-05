<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'newsfeed' })
}

const goToShorts = () => {
  router.push({ name: 'shorts' })
}
</script>

<template>
  <div
    class="bg-[#FFFFFF] border-1 border-[#EAEAEA] border-2 flex p-1 rounded-full lg:hidden fixed bottom-4 z-50 w-max mx-auto left-0 right-0"
  >
    <button class="flex items-center space-x-1 px-2 py-1 text-sm" @click="goToHome">
      <img src="../assets/images/home 1.svg" class="w-4 h-4" />
      <span>होम</span>
    </button>

    <div class="bg-black bg-opacity-10 mx-2 p-[0.5px] h-6"></div>

    <button class="flex items-center space-x-1 px-2 py-1 text-sm" @click="goToShorts">
      <img src="../assets/images/reels 1.svg" class="w-4 h-4" />
      <span>शॉर्ट्स</span>
    </button>
  </div>
</template>
