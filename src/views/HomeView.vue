<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const carouselImages = ref([])
const currentImage = ref(0)
let intervalId = null

const fetchBannerImages = async () => {
  try {
    const response = await axios.get('https://backend-5gsq.onrender.com/bannerroutes')

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
    <div class="relative w-full overflow-hidden rounded-xl shadow-lg" style="height: 400px;">
      <a v-if="carouselImages.length > 0" :href="carouselImages[currentImage].link" target="_blank"
        class="w-full h-full block">
        <img :src="carouselImages[currentImage].image" :key="carouselImages[currentImage].image"
          class="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
          alt="Carousel Banner" />
      </a>
      <div class="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div class="space-y-2">
          <p class="text-2xl font-bold sm:text-3xl lg:text-4xl drop-shadow-lg">
            क़िस्से सियासत के
          </p>
          <button
            class="font-semibold bg-[linear-gradient(90deg,_#E6000E_0%,_#F92323_100%)] text-white hover:text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105">
            अभी देखे
          </button>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
/* Styling the carousel container */
.relative {
  position: relative;
}

.w-full {
  width: 100%;
}

.overflow-hidden {
  overflow: hidden;
}

.rounded-xl {
  border-radius: 1rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Styling the image */
object-cover {
  object-fit: cover;
}

/* Styling the text container */
.text-center {
  text-align: center;
}

.text-white {
  color: white;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: bold;
}

.drop-shadow-lg {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}


.bg {
  background: linear-gradient(90deg, #E6000E 0%, #F92323 100%);
}


.hover\:text-white:hover {
  color: white;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Mobile and responsive design tweaks */
@media (max-width: 640px) {
  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>
