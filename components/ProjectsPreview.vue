<script setup>

const images = ref([]);

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

onMounted(async () => {
    await projectsStore.get();
    images.value = projects.value.map((project) => project.images_path[0]); 
    console.log(images.value)
});


</script>


<template>
    <section class="block md:block px-6 py-14 dark:bg-gray-800 dark:text-white transition-colors duration-500">
        <div>
            <div class="text-center space-y-3">
                <h2 class="font-bold text-3xl sm:text-4xl md:text-6xl dark:text-white">My Projects</h2>
                <p class="text-md sm:text-xl md:text-3xl dark:text-gray-300">Examples of my projects completed</p>
            </div>
            <div class="mt-10 max-w-[1200px] mx-5 md:mx-auto" v-if="images.length > 0">
                <Gallery :images="images"/>
            </div>
            <div v-else class="mt-3">
                <Loading/>
            </div>
        </div>
    </section> 
</template>
