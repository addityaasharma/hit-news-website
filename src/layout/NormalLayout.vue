<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue'
import HomeView from '@/views/HomeView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen w-full">
    <!-- Left Sidebar (visible on lg+ screens) -->
    <div
      class="hidden lg:block sticky top-0 h-screen w-full lg:w-[10%] xl:w-[15%] border-r border-black border-opacity-[40%]">
      <Sidebar />
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col w-full lg:w-[90%] xl:w-[85%] h-screen overflow-hidden flex-grow">
      <div class="flex-1 overflow-y-auto scroll-smooth w-full px-4">
        <Navbar/>
        <div class="mt-[50px] lg:mt-4 max-w-5xl mx-auto w-full">
          <HomeView />
        </div>

        <div class="max-w-5xl mx-auto w-full md:-mt-4">
          <RouterView :key="$route.fullPath" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.scroll-smooth {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.max-w-5xl {
  max-width: 1280px;
}
</style>
