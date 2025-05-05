<script setup>
const breadcrumbs = [
  { label: 'Home', icon: 'pi-angle-right' },
  { label: 'News', icon: 'pi-angle-right' },
  { label: 'Details of News' },
]
</script>

<template>
  <nav class="flex flex-wrap items-center gap-1 text-xs p-2 text-[#ADADAD]">
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <span class="flex items-center gap-1">
        {{ crumb.label }}
        <i v-if="index !== breadcrumbs.length - 1 && crumb.icon" :class="`pi ${crumb.icon}`"></i>
      </span>
    </template>
  </nav>
</template>
