<script setup>

onMounted(() => {
  document.documentElement.classList.toggle('dark', localStorage.getItem('theme') === 'dark')
})

</script>

<template>
  <div class="dark:bg-gray-800 dark:text-white">
    <Toaster />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
