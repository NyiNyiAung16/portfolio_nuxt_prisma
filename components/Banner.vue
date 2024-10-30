<script setup></script>

<template>
  <div class="overflow-hidden dark:bg-gray-800 transition-colors duration-500">
    <div
      class="container mx-auto flex flex-col justify-center h-[100dvh] dark:text-white"
    >
      <div class="flex flex-col items-center gap-6">
        <div class="sm:text-6xl md:text-8xl text-4xl font-bold">
          <h2>Nyi Nyi Aung</h2>
        </div>
        <div class="sm:text-2xl md:text-4xl text-1xl font-bold">
          <h4>Software Developer | Showcasing my projects</h4>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="bg-black hover:bg-opacity-90 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black dark:border-white text-sm sm:text-lg md:text-xl duration-150 px-3 py-2 rounded-md"
          >
            <NuxtLink to="#footer">Contact Me</NuxtLink>
          </button>

          <!-- Outlined Button -->
          <button
            class="border border-black text-black bg-[#eaeaea] hover:bg-opacity-80 dark:border-white dark:text-white dark:bg-[#2D3748] text-sm sm:text-lg md:text-xl duration-150 px-3 py-2 rounded-md"
          >
            <NuxtLink to="#expertise">My Expertise</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
