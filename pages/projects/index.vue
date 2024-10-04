<script setup>
const projectsStore = useProjectsStore();
const { projects, loading, pagination } = storeToRefs(projectsStore);

onMounted(async () => {
  await projectsStore.get();
});


</script>

<template>
  <div>
    <div
      class="grid grid-cols-9 gap-5 items-center justify-center px-10 pb-10 mt-7"
      v-if="projects && projects.length > 0"
    >
       <!-- Skeleton Feature -->
      <SkeletonCard v-for="project in projects" :key="project.id" v-show="loading && projects"/>

      <div
        v-for="project in projects"
        :key="project.id"
        class="col-span-3 bg-[#eaeaea] rounded"
        v-show="!loading"
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
    </div>
    <div class="flex items-center justify-end px-10" v-if="projects">
      <Pagination :items="pagination" @update-page="projectsStore.get($event)"/>
    </div>
  </div>
</template>
