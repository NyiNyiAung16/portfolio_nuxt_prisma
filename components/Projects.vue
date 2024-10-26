<script setup>
import { formatDistanceToNow } from "date-fns";
import { onSearch, onSort } from "~/componsables/filter";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { setToast } from "~/componsables/toastHelper";

const projectsStore = useProjectsStore();
const { projects, pagination, loading } = storeToRefs(projectsStore);

const localProjects = ref([]);
const open = ref(false);

onMounted(async () => {
  await projectsStore.get();
  localProjects.value = [...projects.value];
});

const deleteProject = async (project) => {
  try {
    await projectsStore.destroy(project);
  } catch (error) {
    setToast({ title: error.message });
  } finally {
    open.value = false;
  }
};

const searchValue = (value) => {
  localProjects.value = onSearch(projects.value, value, "title");
};

const sortBy = ({ name, type }) => {
  localProjects.value = onSort(localProjects.value, { name, type });
};

watch(
  projects,
  () => {
    localProjects.value = [...projects.value];
  },
  { deep: true }
);
</script>

<template>
  <div class="dark:bg-gray-800 dark:text-white">
    <div v-if="loading.type === 'get' && loading.value">
      <Loading />
    </div>
    <div v-else>
      <FilteredBy filter="title" @onSearch="searchValue" @sortBy="sortBy" />
      <div v-if="localProjects && localProjects.length > 0">
        <BaseTable caption="A list of your recent projects">
          <template #header>
            <TableHead class="dark:text-gray-300"> Id </TableHead>
            <TableHead class="dark:text-gray-300">Title</TableHead>
            <TableHead class="dark:text-gray-300">Description</TableHead>
            <TableHead class="dark:text-gray-300"> Tags </TableHead>
            <TableHead class="dark:text-gray-300">Created At</TableHead>
            <TableHead class="dark:text-gray-300">Action</TableHead>
          </template>
          <template #body>
            <TableRow
              v-for="(project, index) in localProjects"
              :key="project.id"
              class="dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              <TableCell class="font-medium dark:text-gray-400">
                {{ index + 1 }}
              </TableCell>
              <TableCell class="dark:text-gray-300">{{ project.title }}</TableCell>
              <TableCell class=" dark:text-gray-300">
                {{ project.description.slice(0, 100) + "..." }}
              </TableCell>
              <TableCell class="flex flex-wrap gap-1 items-center dark:text-gray-400">
                <div
                  v-for="tag in project.tags"
                  :key="tag"
                  class="inline-block px-3 py-2 rounded-md bg-[#eaeaea] dark:bg-gray-700 select-none dark:text-white"
                >
                  {{ tag }}
                </div>
              </TableCell>
              <TableCell class="dark:text-gray-400">{{
                formatDistanceToNow(new Date(project.createdAt))
              }}</TableCell>
              <TableCell class="flex gap-1 items-center dark:text-gray-400">
                <EditProjectDialog :project="project" />
                <CheckSure
                  :open="open"
                  :loading="loading"
                  @on-delete="deleteProject(project)"
                  :description="`you want to delete the project: ${project.title}?`"
                >
                  <p class="font-medium text-red-600 hover:underline dark:text-red-500">
                    Delete
                  </p>
                </CheckSure>
              </TableCell>
            </TableRow>
          </template>
        </BaseTable>
        <div class="flex items-center justify-end px-10">
          <Pagination
            :items="pagination"
            @update-page="projectsStore.get($event)"
          />
        </div>
      </div>
      <div v-if="localProjects && localProjects.length === 0 && !loading.value">
        <p class="text-sm font-medium text-zinc-500 dark:text-gray-400">
          There is not any project!
        </p>
      </div>
    </div>
  </div>
</template>
