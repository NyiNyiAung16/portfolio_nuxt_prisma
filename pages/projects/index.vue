<script setup>
const projectsStore = useProjectsStore();
const { projects, pagination, loading } = storeToRefs(projectsStore);

onMounted(async () => {
  await projectsStore.get();
});


</script>

<template>
  <div>
    <!-- Skeleton Feature -->
   <SkeletonCard v-show="loading.value && loading.type === 'get' "/>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 pb-10 mt-7"
      v-if="projects && projects.length > 0"
    >
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-[#eaeaea] rounded"
      >
        <div class="w-full h-[250px]">
          <NuxtLink :href="`/projects/${project.id}`">
            <img
              :src="`/project/photos/${project.images_path[0]}`"
              alt="image"
              class="w-full h-full object-cover rounded-t"
            />
          </NuxtLink>
        </div>
        <div class="px-3 pt-2 pb-4 space-y-1 mt-3">
          <h2 class="font-bold text-2xl">{{ project.title }}</h2>
          <p class="font-light">
            {{ project.description.substring(0, 90) + "..." }}
          </p>
        </div>
      </div>
    </div>    <div class="flex items-center justify-end px-10" v-if="projects && projects.length > 0">
      <Pagination :items="pagination" @update-page="projectsStore.get($event)"/>
    </div>
  </div>
</template>
