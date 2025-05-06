<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Define breadcrumbs based on route or manually
const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: 'News', path: '/' }, // Your newsfeed is the homepage
  {
    label: route.params.id ? `News #${route.params.id}` : 'Details of News',
    path: route.params.id ? `/${route.params.id}` : ''
  }
]
// Navigate using Vue Router
const navigate = (path) => {
  if (path && path !== route.fullPath) {
    router.push(path)
  }
}
</script>

<template>
  <nav class="flex flex-wrap items-center gap-1 text-xs p-2 text-gray-400">
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <span class="flex items-center gap-1">
        <!-- Clickable if not last -->
        <a
          v-if="index < breadcrumbs.length - 1"
          @click.prevent="navigate(crumb.path)"
          class="hover:text-gray-600 transition-colors cursor-pointer"
        >
          {{ crumb.label }}
        </a>

        <!-- Last crumb (current page) -->
        <span v-else class="font-medium">
          {{ crumb.label }}
        </span>

        <!-- Chevron icon -->
        <svg
          v-if="index !== breadcrumbs.length - 1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-gray-400"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
    </template>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
