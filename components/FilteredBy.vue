<script setup>
defineProps({
  filter: {
    type: String,
  },
});

defineEmits(["onSearch", "sortBy"]);

const search = ref("");
const activeFilter = ref(false);
const activeDate = ref(false);
</script>

<template>
  <div class="flex items-center justify-between px-3 py-2 my-4">
    <div class="flex items-stretch rounded-md bg-[#eaeaea] shadow-sm">
      <BaseInput
        type="text"
        :placeholder="`Filter by ${filter}`"
        v-model="search"
        @keydown.enter="$emit('onSearch', search)"
        class="flex-1 px-3 py-2 focus:border-inherit"
      />
      <div class="px-3 py-2 bg-zinc-300 rounded-r-md">
        <FontAwesome icon="magnifying-glass" />
      </div>
    </div>
    <div class="flex items-center gap-x-2">
      <Button
        class="bg-zinc-500 hover:bg-zinc-600 space-x-2"
        @click="
          () => {
            activeFilter = !activeFilter;
            $emit('sortBy', { name: filter, type: activeFilter ? 'desc' : 'asc' });
          }
        "
      >
        <span>Sort by {{ filter }}</span>
        <FontAwesome icon="arrow-down" v-show="!activeFilter" />
        <FontAwesome icon="arrow-up" v-show="activeFilter" />
      </Button>
      <Button
        class="bg-zinc-500 hover:bg-zinc-600 space-x-2"
        @click="() => {
            activeDate = !activeDate;
            $emit('sortBy', { name: 'createdAt', type: activeDate ? 'desc' : 'asc' });
        }"
      >
        <span>Sort by date</span>
        <FontAwesome icon="arrow-down" v-show="!activeDate" />
        <FontAwesome icon="arrow-up" v-show="activeDate" />
      </Button>
    </div>
  </div>
</template>
