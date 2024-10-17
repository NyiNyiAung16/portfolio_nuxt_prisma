<script setup>
defineProps({
  className: {
    type: String,
    default: "",
  },
  defaultBgStyle: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <button
    :class="`${
      defaultBgStyle ? 'bg-black text-white' : ''
    } ${className} cursor-pointer text-lg font-medium rounded-md px-3 py-2 hover:bg-opacity-80 active:bg-opacity-100 duration-150`"
  >
    <slot />
  </button>
</template>
