<script setup>
defineProps({
    image: {
        type: String,
        required: true
    }
});

defineEmits(['onDeleteImage']);

const hovering = ref({ value: false, image: null });

</script>

<template>
  <div class="relative w-[100px] h-[100px] overflow-hidden rounded-md">
    <img :src="image" :alt="image" class="w-full h-full object-cover" />
    <div
      class="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-300 hover:bg-opacity-75"
      @mouseover="hovering = { value: true, image }"
      @mouseleave="hovering = { value: false, image }"
    >
      <FontAwesome
        v-if="hovering.value && hovering.image === image"
        icon="xmark"
        class="text-white text-3xl cursor-pointer"
        @click="$emit('onDeleteImage',image)"
      />
    </div>
  </div>
</template>
