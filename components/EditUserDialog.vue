<script setup>

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const open = ref(false);

</script>

<template>
  <BaseDialog title="Edit User" :open="open" @on-open="open = true">
    <UserForm :user="user" @close="open = false" />
  </BaseDialog>
</template>
