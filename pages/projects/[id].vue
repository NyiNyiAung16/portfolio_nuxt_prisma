<script setup>
const { id } = useRoute().params;

const projectsStore = useProjectsStore();
const { project, loading } = storeToRefs(projectsStore);

onMounted(async () => {
  await projectsStore.show(id);
});
</script>

<template>
  <div class="py-5">
    <div v-if="loading.type === 'show' && loading.value">
      <Loading class="mx-auto" />
    </div>
    <div class="mt-5" v-if="project && !loading.value">
      <div class="w-[80%] bg-[#eaeaea] rounded mx-auto pb-10">
        <Gallery :is-cover-flow="false" :images="project.images_path" />
        <div class="mt-7 px-6">
          <div class="space-y-1 mt-3">
            <h2 class="font-bold text-2xl">{{ project.title }}</h2>
            <p class="font-light">{{ project.description }}</p>
          </div>
          <div class="mt-3">
            <span class="font-medium">Youtube Link</span> -
            <NuxtLink
              :href="project.youtube_link"
              :external="true"
              target="_blank"
              class="underline"
              >{{ project.youtube_link }}</NuxtLink
            >
          </div>
          <div class="flex items-center gap-3 mt-4 text-sm">
            <div
              v-for="tag in project.tags"
              :key="tag"
              class="inline-block px-3 py-2 rounded-md bg-[#fff] select-none"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>    </div>
    <div v-if="project && !loading.value">
      <CommentForm :project-id="id" />
      <Comments />
    </div>
  </div>
</template>
