<script setup>
const { filter } = defineProps({
  filter: {
    type: String,
  },
});

const emits = defineEmits(["onSearch", "sortBy"]);

const search = ref("");
const isFilterAsc = ref(true);
const isDateAsc = ref(true);

const debounceSearch = useDebounce(() => {
  emits("onSearch", search.value);
}, 300);

const toggleFilterSort = () => {
  isFilterAsc.value = !isFilterAsc.value;
  emits("sortBy", {
    name: filter,
    type: isFilterAsc.value ? "desc" : "asc",
  });
};

const toggleDateSort = () => {
  isDateAsc.value = !isDateAsc.value;
  emits("sortBy", {
    name: "createdAt",
    type: isDateAsc.value ? "desc" : "asc",
  });
};
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-between gap-x-5 md:gap-x-0 px-3 py-2 my-4 sm:gap-x-4 darkMode transition-colors duration-500"
  >
    <div class="sm:w-1/2 md:w-1/3 sm:order-2 md:order-1 mb-3 sm:mb-0">
      <div
        class="flex items-stretch rounded-md bg-[#eaeaea] dark:bg-gray-700 shadow-sm"
      >
        <BaseInput
          type="text"
          :placeholder="`Filter by ${filter}`"
          v-model="search"
          @input="debounceSearch"
          class="flex-1 px-3 py-2 focus:border-inherit border-none min-w-max dark:bg-gray-700"
        />
        <div class="px-3 py-2 bg-zinc-300 rounded-r-md dark:bg-gray-600">
          <Icons-Search class="w-6 text-gray-600 dark:text-gray-200" />
        </div>
      </div>
    </div>
    <div
      class="flex items-center gap-x-2 sm:gap-x-4 sm:justify-end md:justify-start sm:order-1 md:order-2"
    >
      <Button
        class="bg-zinc-500 hover:bg-zinc-600 rounded-md px-3 py-2 flex items-center space-x-1 dark:bg-gray-600 dark:hover:bg-gray-700"
        @click="toggleFilterSort"
      >
        <span class="text-sm font-semibold dark:text-gray-100">Sort by {{ filter }}</span>
        <span class="text-zinc-400">
          <Icons-ArrowDown class="w-4" v-if="isFilterAsc" />
          <Icons-ArrowUp class="w-4" v-if="!isFilterAsc" />
        </span>
      </Button>
      <Button
        class="bg-zinc-500 hover:bg-zinc-600 rounded-md px-3 py-2 flex items-center space-x-1 dark:bg-gray-600 dark:hover:bg-gray-700"
        @click="toggleDateSort"
      >
        <span class="text-sm font-semibold dark:text-gray-100">Sort by date</span>
        <span class="text-zinc-400">
          <Icons-ArrowDown class="w-4" v-show="isDateAsc" />
          <Icons-ArrowUp class="w-4" v-show="!isDateAsc" />
        </span>
      </Button>
    </div>
  </div>
</template>
