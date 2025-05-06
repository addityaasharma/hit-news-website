<script setup>
import Sidebar from '@/components/Sidebar.vue'
import HomeView from '@/views/HomeView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen w-full">
    <!-- Sidebar: only visible on large screens -->
    <aside class="hidden lg:block sticky top-0 h-screen lg:w-[18%] xl:w-[15%] border-r border-black/20">
      <Sidebar />
    </aside>

    <!-- Main Content Area -->
    <section class="flex flex-col w-full lg:w-[82%] xl:w-[85%] h-screen overflow-hidden">
      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto scroll-smooth w-full px-4 py-6">
        <!-- HomeView: only on large screens -->
        <div class="hidden lg:block max-w-5xl mx-auto w-full">
          <HomeView />
        </div>

        <!-- RouterView: always visible -->
        <div class="max-w-5xl mx-auto w-full">
          <RouterView :key="$route.fullPath" />
        </div>
      </div>
    </section>
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
