<script setup>
definePageMeta({ layout: "admin-layout", middleware: "admin" });

import ProjectForm from '~/components/ProjectForm.vue';
</script>

<template>
  <div class="py-5">
    <ProjectForm/>
  </div>
</template>

