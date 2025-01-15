<script setup>
import { pageReplace } from '~/componsables/pageHelper';
import { setToast } from '~/componsables/toastHelper';

const route = useRoute();
const page = ref(route.query.page || 1);

const projectsStore = useProjectsStore();
const { projects, pagination, loading } = storeToRefs(projectsStore);

watch(
  () => page.value,
  async (newPage) => {
    await projectsStore.get(newPage);
  },
  { immediate: true }
);

const handlePage = async (newPage) => {
  if (newPage === null || newPage === undefined) {
    throw new Error("newPage is null or undefined");
  }

  try {
    await pageReplace(newPage);
    page.value = newPage;
  } catch (error) {
    setToast({ title: error.message });
  }
};

</script>

<template>
  <div class="mt-16">
    <Head>
      <Title>NYI NYI AUNG | Projects</Title>
      <Meta
        name="description"
        content="Projects Page"
      />
    </Head>
    <SkeletonCard v-show="loading.value && loading.type === 'get' "/>

    <div class="min-h-screen py-10" v-if="projects && projects.length > 0">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-white dark:bg-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg rounded-lg overflow-hidden duration-100"
          >
            <NuxtLink :href="`/projects/${project.id}`">
              <CldImage
                :src="project.images_path[0]"
                :alt="project.title"
                width="auto"
                height="200"
                layout="fullWidth"
              />
            </NuxtLink>
            <div class="p-6">
              <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
              <p class="text-gray-600 dark:text-gray-400">
                {{ project.description.slice(0, 100) + '...' }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end px-10" v-if="projects && projects.length > 0">
        <Pagination :items="pagination" @update-page="handlePage"/>
      </div>
      </div>
    </div>
  </div>
</template>
