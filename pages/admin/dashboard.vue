<script setup>
import { formatDistanceToNow } from 'date-fns';
import { onSearch, onSort } from '~/componsables/filter';


definePageMeta({ layout: 'admin-layout' });

const projectsStore = useProjectsStore();
const { projects, loading, pagination } = storeToRefs(projectsStore);

const localProjects = ref([]);

onMounted(async () => {
    await projectsStore.get();
    localProjects.value = [...projects.value];
});

const deleteProject = async (id) => {
   let response = await projectsStore.destroy(id);
   if(response) {
    const deletedProject = response?.data;
    localProjects.value = localProjects.value.filter((user) => user.id !== deletedProject.id);
  }
}


const searchValue = (value) => {
    localProjects.value = onSearch(projects.value,value,'title');
}



const sortBy = ({ name, type }) => {
    localProjects.value = onSort(localProjects.value,{name,type});
};

</script>


<template>
    <div>
        <div v-if="loading">
            <Loading class="mx-auto"/>
        </div>
        <div v-if="projects && !loading">
            <FilteredBy filter="title" @onSearch="searchValue" @sortBy="sortBy"/>
            <BaseTable>
                <template #header>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tags
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                </template>
                <template #body>
                    <tbody>
                        <tr v-for="(project,index) in localProjects" :key="project.id" class="bg-white border-b hover:bg-gray-50 ">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ index + 1 }}
                            </th>
                            <th class="px-6 py-4 ">
                                {{ project.title }}
                            </th>
                            <td class="px-6 py-4">
                                {{ project.description.toString(100) + '...' }}
                            </td>
                            <td class="px-6 py-4 space-x-2">
                                <div v-for="tag in project.tags" :key="tag" class="inline-block px-3 py-2 rounded-md bg-[#eaeaea    ] select-none">
                                    {{ tag }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                {{ formatDistanceToNow(new Date(project.createdAt)) }}
                            </td>
                            <td class="px-6 py-4 space-x-2">
                                <EditProjectDialog :project="project"/>
                                <CheckSure @on-delete="deleteProject(project.id)"/>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </BaseTable>
        </div>
        <div class="flex items-center justify-end px-10" v-if="projects?.length > 0 && !loading">
            <Pagination :items="pagination" @update-page="projectsStore.get($event)"/>
        </div>
    </div>
</template>

