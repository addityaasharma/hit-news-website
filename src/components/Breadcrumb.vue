<script setup>
const breadcrumbs = [
  { label: 'Home', icon: 'pi pi-angle-right' },
  { label: 'News', icon: 'pi pi-angle-right' },
  { label: 'Details of News' },
]
</script>

<template>
  <nav class="flex flex-wrap items-center gap-1 text-xs p-2 text-[#ADADAD]">
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <span class="flex items-center gap-1">
        {{ crumb.label }}
        <i v-if="index !== breadcrumbs.length - 1" :class="crumb.icon"></i>
      </span>
    </template>
  </nav>
</template>

<style scoped>
nav span {
  display: flex;
  align-items: center;
}
nav i {
  font-size: 14px;
  color: #ADADAD;
}
</style>
