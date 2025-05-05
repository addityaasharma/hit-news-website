<script setup>
import Sidebar from '@/components/Sidebar.vue'
// import Shorts from '@/components/Shorts.vue'
import HomeView from '@/views/HomeView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen w-full">
    <!-- Left Sidebar -->
    <div class="hidden lg:block sticky top-0 h-screen md:w-[20%] lg:w-[18%] xl:w-[15%]">
      <Sidebar />
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col w-full lg:w-[64%] xl:w-[66%] h-screen overflow-hidden">
      <!-- Scrollable Content -->
      <div
        class="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        <!-- HomeView only visible on lg+ screens, scrolls with content -->
        <div class="hidden lg:block p-2 md:p-4 pl-only-1024 max-w-5xl mx-auto w-full">
          <HomeView />
        </div>

        <!-- RouterView shared for all screen sizes -->
        <div class="p-2 md:p-4 pl-only-1024 max-w-5xl mx-auto w-full">
          <RouterView :key="$route.fullPath" />
        </div>
      </div>
    </div>

    <!-- Right Side (for future Shorts) -->
    <div
      class="hidden lg:block sticky top-0 self-start h-screen w-[280px] xl:w-[260px] 2xl:w-[280px] p-for-shorts"
    >
      <!-- <Shorts /> -->
    </div>
  </main>
</template>

.
<style scoped>
@media (min-width: 1024px) and (max-width: 1024px) {
  .pl-only-1024 {
    /* border: 1px solid red; */
    margin-left: 2rem;
  }
}

@media (min-width: 1024px) and (max-width: 1024px) {
  .pl-for-1024 {
    /* border: 1px solid red; */
    padding: 0 0 1rem 0;
    margin-left: 2rem;
  }
}

@media (min-width: 1024px) and (max-width: 1024px) {
  .p-for-shorts {
    /* border: 1px solid red; */
    padding: 2px 4px;
  }
}
</style>
