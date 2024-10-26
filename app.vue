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


body {
  --sb-track-color: #232e33;
  --sb-thumb-color: #c1c1c1;
  --sb-size: 10px;
}

body::-webkit-scrollbar {
  width: var(--sb-size)
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 0px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
  border: 1px solid #232e33;
}

@supports not selector(::-webkit-scrollbar) {
  body {
    scrollbar-color: var(--sb-thumb-color)
                     var(--sb-track-color);
  }
}
</style>
