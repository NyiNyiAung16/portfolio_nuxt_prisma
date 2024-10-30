<script setup>
definePageMeta({ layout: "admin-layout", middleware: "admin" });

import ProjectForm from '~/components/ProjectForm.vue';
</script>

<template>
  <div class="py-5">
    <Head>
      <Title>NYI NYI AUNG | Create Project</Title>
    </Head>
    <ProjectForm/>
  </div>
</template>

