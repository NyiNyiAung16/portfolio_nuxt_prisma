<script setup>

const onDownloadCV = () => {
    location.href = '/cv.pdf';
}

</script>


<template>
    <div class="grid grid-cols-1 md:grid-cols-2 px-8 py-[100px] dark:bg-gray-800 dark:text-white">
        <div class="flex flex-col justify-center mb-3 md:mb-0 dark:text-white">
            <div class="space-y-3 pe-4 dark:text-white">
                <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold">About Me</h2>
                <p class="text-xl md:text-2xl dark:text-white">I am a passionate software developer with 5 years of experience. I have worked on various projects ranging from small businesses to large corporations. My skills and expertise have enabled me to deliver high-quality and efficient solutions to my clients.</p>
            </div>
            <div class="mt-3">
                <Button @click="onDownloadCV" class="dark:bg-gray-700 dark:text-white dark:border-white">Download CV</Button>
            </div>
        </div>
        <div>
            <img src="/photos/1.jpg" alt="image" class="w-full h-[500px] object-cover rounded dark:bg-gray-700">
        </div> 
    </div>
</template>
