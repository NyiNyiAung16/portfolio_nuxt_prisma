<script setup>

const projects = ref([
    {
        id:1,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/1.jpg'
    },
    {
        id:2,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/2.jpg'
    },
    {
        id:3,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/3.jpg'
    },
    {
        id:4,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/4.jpg'
    },
    {
        id:5,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/5.jpg'
    },
    {
        id:6,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/6.jpg'
    },
])

</script>


<template>
    <div class="grid grid-cols-9 gap-5 items-center justify-center px-10 pb-10 mt-7">
        <div v-for="project in projects" :key="project.id" class="col-span-3 bg-[#eaeaea] rounded">
            <div class="w-full h-[250px]">
                <NuxtLink href="/projects/1">
                    <img :src="project.image_path" alt="image" class="w-full h-full object-cover rounded-t">
                </NuxtLink>
            </div>
            <div class="px-3 pt-2 pb-4 space-y-1 mt-3">
                <h2 class="font-bold text-2xl">{{ project.title }}</h2>
                <p class="font-light">{{ project.description.substring(0,90) + '...' }}</p>
            </div>
        </div>
    </div>
</template>
