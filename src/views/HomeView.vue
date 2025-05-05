<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const carouselImages = ref([])
const currentImage = ref(0)
let intervalId = null

const fetchBannerImages = async () => {
  try {
    const response = await axios.get('http://192.168.1.21:5000/bannerroutes')
    // console.log('API Response:', response.data)

    const images =
      response.data.data?.map((item) => ({
        image: item.image,
        link: item.link || '#',
      })) || []

    if (images.length === 0) {
      console.warn('No images found!')
      return
    }

    carouselImages.value = images

    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(() => {
      currentImage.value = (currentImage.value + 1) % carouselImages.value.length
    }, 3000)
  } catch (error) {
    console.error('Failed to fetch banners:', error)
  }
}

onMounted(() => {
  fetchBannerImages()
})
</script>

<template>
  <main class="flex flex-col space-y-6">
    <div class="relative w-full overflow-hidden rounded-xl pl-only-1024" style="height: 180px">
      <a v-if="carouselImages.length > 0" :href="carouselImages[currentImage].link" target="_blank"
        class="w-full h-full block">
        <img :src="carouselImages[currentImage].image" :key="carouselImages[currentImage].image"
          class="w-full h-full object-cover transition-opacity duration-500" alt="Carousel Banner" />
      </a>
      <div
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-1 sm:top-1/2 sm:right-20 sm:left-auto sm:translate-x-0 sm:-translate-y-1/2 sm:text-right">
        <!-- <p class="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold sm:text-center">
          क़िस्से सियासत के
        </p> -->
        <!-- <button
          class="font-semibold bg-[linear-gradient(90deg,_#E6000E_0%,_#F92323_100%)] text-white hover:text-white px-3 py-2 ml-4 rounded shadow"
        >
          अभी देखे
        </button> -->
      </div>
    </div>
  </main>
</template>
