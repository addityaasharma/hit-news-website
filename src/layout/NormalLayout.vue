<script setup>
import Sidebar from '@/components/Sidebar.vue'
import HomeView from '@/views/HomeView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen w-full">
    <!-- Left Sidebar -->
    <div class="lg:block sticky top-0 h-screen w-full lg:w-[10%] xl:w-[15%] hidden border-r border-opacity-[40%] border-black">
      <Sidebar />
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col w-full lg:w-[90%] xl:w-[85%] h-screen overflow-hidden flex-grow">
      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto scroll-smooth w-full px-4 py-6">
        <!-- HomeView only visible on lg+ screens -->
        <div class="hidden lg:block max-w-5xl mx-auto w-full">
          <HomeView />
        </div>

        <!-- RouterView shared for all screen sizes -->
        <div class="max-w-5xl mx-auto w-full">
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
