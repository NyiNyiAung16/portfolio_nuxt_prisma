<script setup>

defineProps({
  filter: {
    type: String,
  },
});

const emits = defineEmits(["onSearch", "sortBy"]);

const search = ref("");
const activeFilter = ref(false);
const activeDate = ref(false);

const debounceSearch = useDebounce((e) => {
  emits('onSearch',search.value);
},300)

</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-between gap-x-5 md:gap-x-0 px-3 py-2 my-4 sm:gap-x-4 dark:bg-gray-800 dark:text-white transition-colors duration-500"
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
          class="flex-1 px-3 py-2 focus:border-inherit min-w-max dark:bg-gray-700"
        />
        <div class="px-3 py-2 bg-zinc-300 rounded-r-md dark:bg-gray-600">
          <FontAwesome icon="magnifying-glass" />
        </div>
      </div>
    </div>
    <div
      class="flex items-center gap-x-2 sm:gap-x-4 sm:justify-end md:justify-start sm:order-1 md:order-2"
    >
      <Button
        class="bg-zinc-500 hover:bg-zinc-600 rounded-md px-3 py-2 flex items-center space-x-1 dark:bg-gray-600 dark:hover:bg-gray-700"
        @click="
          () => {
            activeFilter = !activeFilter;
            $emit('sortBy', {
              name: filter,
              type: activeFilter ? 'desc' : 'asc',
            });
          }
        "
      >
        <span class="text-sm font-semibold dark:text-gray-100">Sort by {{ filter }}</span>
        <span class="text-zinc-400">
          <FontAwesome icon="arrow-down" v-show="!activeFilter" size="xs" />
          <FontAwesome icon="arrow-up" v-show="activeFilter" size="xs" />
        </span>
      </Button>
      <Button
        class="bg-zinc-500 hover:bg-zinc-600 rounded-md px-3 py-2 flex items-center space-x-1 dark:bg-gray-600 dark:hover:bg-gray-700"
        @click="
          () => {
            activeDate = !activeDate;
            $emit('sortBy', {
              name: 'createdAt',
              type: activeDate ? 'desc' : 'asc',
            });
          }
        "
      >
        <span class="text-sm font-semibold dark:text-gray-100">Sort by date</span>
        <span class="text-zinc-400">
          <FontAwesome icon="arrow-down" v-show="!activeDate" size="xs" />
          <FontAwesome icon="arrow-up" v-show="activeDate" size="xs" />
        </span>
      </Button>
    </div>
  </div>
</template>
