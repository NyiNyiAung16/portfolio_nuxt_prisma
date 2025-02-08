<script setup>
definePageMeta({ layout: "admin-layout", middleware: "admin" });

import ProjectForm from '~/components/ProjectForm.vue';
</script>

<template>
  <div class="py-5">
    <Head>
      <Title>Create Project</Title>
      <Meta name="description" content="Create Project"/>
    </Head>
    <ProjectForm/>
  </div>
</template>

