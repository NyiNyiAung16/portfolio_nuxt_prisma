<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});

defineEmits(["updatePage"]);
</script>

<template>
  <div
    class="flex items-center justify-between border-gray-200 px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="items.page === 1"
        @click="$emit('updatePage', items.page - 1)"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
        :class="{
          'cursor-not-allowed bg-gray-50 dark:bg-gray-700': items.page === 1,
        }"
      >
        Previous
      </button>
      <button
        :disabled="items.page === items.pages.length"
        @click="$emit('updatePage', items.page + 1)"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
        :class="{
          'cursor-not-allowed bg-gray-50 dark:bg-gray-700': items.page === items.pages.length,
        }"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-700"
          aria-label="Pagination"
        >
          <button
            :disabled="items.page === 1"
            @click="$emit('updatePage', items.page - 1)"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-600 dark:text-gray-300"
            :class="{
              'cursor-not-allowed bg-gray-50 dark:bg-gray-700': items.page === 1,
            }"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fill-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <p
            v-for="page in items.pages"
            :key="page"
            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 cursor-pointer dark:text-gray-300"
            :class="{
              'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                page === items.page,
              'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-600':
                page !== items.page,
            }"
            @click="$emit('updatePage', page)"
          >
            {{ page }}
          </p>
          <button
            :disabled="items.page === items.pages.length"
            @click="$emit('updatePage', items.page + 1)"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-600 dark:text-gray-300"
            :class="{
              'cursor-not-allowed bg-gray-50 dark:bg-gray-700':
                items.page === items.pages.length,
            }"
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fill-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
