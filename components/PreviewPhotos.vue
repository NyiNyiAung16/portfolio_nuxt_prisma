<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },
});

defineEmits(["onDeleteImage"]);

const hovering = ref({ value: false, image: null });
</script>

<template>
  <div
    class="flex items-start flex-wrap gap-1 mt-1"
  >
    <div v-for="image in images" :key="image" class="relative w-[100px] h-[100px] overflow-hidden rounded-md">
      <CldImage
        :src="image"
        width="100"
        height="100"
        alt="test"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-300 hover:bg-opacity-75"
        @mouseover="hovering = { value: true, image }"
        @mouseleave="hovering = { value: false, image }"
      >
        <FontAwesome
          v-if="hovering.value && hovering.image === image"
          icon="xmark"
          class="text-white text-3xl cursor-pointer"
          @click.once="$emit('onDeleteImage', image)"
        />
      </div>
    </div>
  </div>
</template>