<script setup></script>

<template>
  <div class="min-h-screen py-10">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white dark:bg-gray-700 dark:text-gray-200 shadow-md rounded-lg overflow-hidden"
        >
          <Skeleton
            class="w-full h-[200px] rounded-t bg-gray-300 dark:bg-gray-600"
          />
          <div class="p-6">
            <Skeleton
              class="w-3/4 h-6 mb-2 bg-gray-300 dark:bg-gray-600 rounded"
            />
            <Skeleton class="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
