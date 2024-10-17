<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
  },
});

const model = defineModel({ required: true });
</script>

<template>
  <select
  class="w-full box-border outline-none border-2 px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:focus:ring-zinc-400 dark:focus:outline-none bg-[#eaeaea]  border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-zinc-200"
  v-model="model"
>
  <option value="" disabled>Select a {{ label }}</option>
  <option v-for="option in options" :key="option">
    {{ option }}
  </option>
</select>
</template>
