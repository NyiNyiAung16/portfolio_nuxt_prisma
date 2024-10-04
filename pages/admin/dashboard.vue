<script setup>

definePageMeta({ layout: 'admin-layout' });

const projectsStore = useProjectsStore();
const { projects, loading } = storeToRefs(projectsStore);

onMounted(async () => {
    await projectsStore.get();
});

const deleteProject = async (id) => {
    await projectsStore.destroy(id);
}

</script>


<template>
    <div>
        <div v-if="loading">
            <Loading class="mx-auto"/>
        </div>
        <BaseTable v-if="projects?.data && !loading">
            <template #header>
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
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
                            Action
                        </th>
                    </tr>
                </thead>
            </template>
            <template #body>
                <tbody>
                    <tr v-for="project in projects?.data" :key="project.id" class="bg-white border-b hover:bg-gray-50 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
                        <td class="px-6 py-4 space-x-2">
                            <EditProjectDialog :project="project"/>
                            <a href="#" class="font-medium text-red-600  hover:underline" @click="deleteProject(project.id)">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </template>
        </BaseTable>
        <div class="flex items-center justify-end px-10" v-if="projects?.data.length > 0">
            <Pagination :items="projects" @update-page="projectsStore.get($event)"/>
        </div>
    </div>
</template>

