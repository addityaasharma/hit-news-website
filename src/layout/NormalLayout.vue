<script setup>
import Sidebar from '@/components/Sidebar.vue'
import HomeView from '@/views/HomeView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen w-full">
    <!-- Left Sidebar -->
    <div class="lg:block sticky top-0 h-screen lg:w-[18%] xl:w-[15%] hidden">
      <Sidebar />
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col w-full lg:w-[66%] xl:w-[70%] h-screen overflow-hidden flex-grow justify-center items-center">
      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto scroll-smooth w-full px-4 py-6">
        <!-- HomeView only visible on lg+ screens, scrolls with content -->
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
/* Improved responsive spacing */
@media (min-width: 1024px) {
  .pl-4 {
    padding-left: 1rem; /* Add consistent padding for large screens */
  }
}

@media (max-width: 1024px) {
  /* Adjust layout for smaller screens */
  .lg\:w-[66%] {
    width: 100%; /* Full width for smaller screens */
  }
  .lg\:block {
    display: none; /* Hide sidebar on smaller screens */
  }
  .hidden {
    display: block; /* Make the sidebar visible on mobile */
  }
}

.scroll-smooth {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.max-w-5xl {
  max-width: 1280px;
}

@media (min-width: 1024px) {
  .p-for-shorts {
    padding: 2rem 4px;
  }
}
</style>
