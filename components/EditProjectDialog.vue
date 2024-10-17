<script setup>
import ProjectForm from "./ProjectForm.vue";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const open = ref(false);

</script>

<template>
  <BaseDialog title="Edit Project" :open="open" @on-open="open = true">
    <ProjectForm :project="project" @close="open = false" />
  </BaseDialog>
</template>
