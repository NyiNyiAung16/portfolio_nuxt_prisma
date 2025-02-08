<script setup>
const { id } = useRoute().params;

const projectsStore = useProjectsStore();
const { project, loading } = storeToRefs(projectsStore);

onMounted(async () => {
  await projectsStore.show(id);
});
</script>

<template>
  <div class="py-16">
    <Head>
      <Title>{{ project?.title }}</Title>
      <Meta name="description" :content="project?.description" />
    </Head>
    <div class="transition-colors duration-500 darkMode">
      <div v-if="loading.type === 'show' && loading.value">
        <Loading />
      </div>
      <div class="mt-5" v-if="project && !loading.value">
        <div
          class="w-[90%] md:w-[80%] bg-[#eaeaea] dark:bg-gray-700 rounded mx-auto pb-10 dark:text-white"
        >
          <Gallery :is-cover-flow="false" :images="project.images_path" />
          <div class="mt-7 px-6 dark:text-white">
            <div class="space-y-1 mt-3">
              <h2 class="font-bold text-2xl">{{ project.title }}</h2>
              <p
                class="font-light leading-relaxed"
                :class="{
                  'text-md sm:text-lg md:text-xl': project.description.length < 150,
                  'text-sm sm:text-base md:text-lg': project.description.length >= 150,
                }"
              >
                {{ project.description }}
              </p>
            </div>
            <div class="mt-3">
              <span class="font-medium">Youtube Link</span> -
              <NuxtLink
                :href="project.youtube_link"
                :external="true"
                target="_blank"
                class="underline dark:text-blue-500"
                >{{ project.youtube_link }}</NuxtLink
              >
            </div>
            <div
              class="flex items-center flex-wrap gap-3 mt-4 text-sm dark:text-white"
            >
              <div
                v-for="tag in project.tags"
                :key="tag"
                class="inline-block px-3 py-2 rounded-md bg-[#fff] select-none darkMode"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="project && !loading.value"
        class="w-[90%] md:max-w-md sm:px-0 mx-auto"
      >
        <CommentForm :project-id="id" />
        <Comments />
      </div>
    </div>
  </div>
</template>
