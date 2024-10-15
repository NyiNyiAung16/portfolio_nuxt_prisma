<template>
  <div>
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
