<script setup>
import { formatDistanceToNow } from "date-fns";
import { onSearch, onSort } from "~/componsables/filter";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";

const projectsStore = useProjectsStore();
const { projects, pagination, loading } = storeToRefs(projectsStore);

const localProjects = ref([]);
const open = ref(false);

onMounted(async () => {
  await projectsStore.get();
  localProjects.value = [...projects.value];
});

const deleteProject = async (id) => {
  await projectsStore.destroy(id);
  open.value = false;
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
      <Loading />
    </div>
    <div v-else>
      <FilteredBy filter="title" @onSearch="searchValue" @sortBy="sortBy" />
      <div v-if="localProjects && localProjects.length > 0">
        <BaseTable caption="A list of your recent projects">
          <template #header>
            <TableHead> Id </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead> Tags </TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </template>
          <template #body>
            <TableRow
              v-for="(project, index) in localProjects"
              :key="project.id"
            >
              <TableCell class="font-medium">
                {{ index + 1 }}
              </TableCell>
              <TableCell>{{ project.title }}</TableCell>
              <TableCell>{{
                project.description.toString(100) + "..."
              }}</TableCell>
              <TableCell class="flex gap-1 items-center">
                <div
                  v-for="tag in project.tags"
                  :key="tag"
                  class="inline-block px-3 py-2 rounded-md bg-[#eaeaea] select-none"
                >
                  {{ tag }}
                </div>
              </TableCell>
              <TableCell>{{
                formatDistanceToNow(new Date(project.createdAt))
              }}</TableCell>
              <TableCell class="flex gap-1 items-center">
                <EditProjectDialog :project="project" />
                <CheckSure
                  :open="open"
                  :loading="loading"
                  @on-delete="deleteProject(project.id)"
                  description="you want to delete this project?"
                >
                  <p class="font-medium text-red-600 hover:underline">Delete</p>
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
        <p class="text-sm font-medium text-zinc-500">
          There is not any project!
        </p>
      </div>
    </div>
  </div>
</template>
