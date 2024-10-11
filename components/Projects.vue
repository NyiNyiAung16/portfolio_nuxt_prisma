<script setup>
import { formatDistanceToNow } from "date-fns";
import { onSearch, onSort } from "~/componsables/filter";

const projectsStore = useProjectsStore();
const { projects, pagination, loading } = storeToRefs(projectsStore);

const localProjects = ref([]);

onMounted(async () => {
  await projectsStore.get();
  localProjects.value = [...projects.value];
});

const deleteProject = async (id) => {
  await projectsStore.destroy(id);
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
  <div>
    <div v-if="loading.type === 'get' && loading.value">
      <Loading class="mx-auto" />
    </div>
    <div v-else>
      <FilteredBy filter="title" @onSearch="searchValue" @sortBy="sortBy" />
      <div v-if="localProjects && localProjects.length > 0 && !loading.value">
        <BaseTable>
          <template #header>
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3">Id</th>
                <th scope="col" class="px-6 py-3">Title</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Tags</th>
                <th scope="col" class="px-6 py-3">Created At</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
          </template>
          <template #body>
            <tbody>
              <tr
                v-for="(project, index) in localProjects"
                :key="project.id"
                class="bg-white border-b hover:bg-gray-50"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ index + 1 }}
                </th>
                <th class="px-6 py-4">
                  {{ project.title }}
                </th>
                <td class="px-6 py-4">
                  {{ project.description.toString(100) + "..." }}
                </td>
                <td class="px-6 py-4 space-x-2">
                  <div
                    v-for="tag in project.tags"
                    :key="tag"
                    class="inline-block px-3 py-2 rounded-md bg-[#eaeaea] select-none"
                  >
                    {{ tag }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ formatDistanceToNow(new Date(project.createdAt)) }}
                </td>
                <td class="px-6 py-4 space-x-2">
                  <EditProjectDialog :project="project" />
                  <CheckSure @on-delete="deleteProject(project.id)">
                    <p class="font-medium text-red-600 hover:underline">Delete</p>
                  </CheckSure>
                </td>
              </tr>
            </tbody>
          </template>
        </BaseTable>
        <div
          class="flex items-center justify-end px-10"
        >
          <Pagination
            :items="pagination"
            @update-page="projectsStore.get($event)"
          />
        </div>
      </div>
      <div v-if="localProjects && localProjects.length === 0 && !loading.value">
          <p class="text-sm font-medium text-zinc-500">There is not any project!</p>
      </div>
    </div>
    </div>
</template>
