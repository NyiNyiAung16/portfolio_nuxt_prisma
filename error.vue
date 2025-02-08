<script setup>
defineProps({
  error: Object,
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-center"
  >
    <h1 class="text-9xl font-extrabold tracking-widest">
      {{ error.statusCode }}
    </h1>
    <div class="mt-4 prose">
      <p>{{ error.message }}</p>
    </div>
    <NuxtLink
      to="/"
      class="mt-10 px-4 py-2 border-2 border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-150"
    >
      Go back home
    </NuxtLink>
  </div>
</template>
