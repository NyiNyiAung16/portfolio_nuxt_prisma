<script setup>

const expertises = ref([
    {
        id:1,
        title: 'Web Development',
        content: 'Creating dynamic and responsive websites for any business needs.'
    },
    {
        id:2,
        title: 'Database Management',
        content: 'Efficiently managing and organizing data for smooth workflow and analysis.'
    },
    {
        id:3,
        title: 'UI/UX Design',
        content: 'Creating visually appealing and user-friendly interfaces for websites and apps.'
    },
    {
        id:4,
        title: 'Mobile App Development',
        content: 'Designing and developing user-friendly mobile applications for iOS and Android.'
    }
]);

</script>


<template>
    <div class="bg-white px-3 py-14" id="expertise">
        <div class="text-center space-y-3">
            <h2 class="font-bold text-6xl">My Expertise</h2>
            <p class="text-3xl">I have expertise in software development and coding.</p>
        </div>
        <div class="mt-12 w-full max-w-[1200px] grid grid-cols-10 gap-y-2 mx-auto">
            <div v-for="expertise in expertises" :key="expertise.id" class="col-span-5 p-2">
                <div class="flex gap-x-5 justify-start px-5">
                    <div class="text-white h-fit bg-black px-4 py-2 rounded-md">{{ expertise.id }}</div>
                    <div>
                        <h3 class="font-bold text-3xl">{{ expertise.title }}</h3>
                        <p class="text-[#929292] text-lg font-light">{{ expertise.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

