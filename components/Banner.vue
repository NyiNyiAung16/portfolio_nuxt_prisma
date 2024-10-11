<script setup>

</script>


<template>
    <div class="overflow-hidden">
        <div class="container mx-auto flex flex-col justify-center h-[90dvh]">
            <div class="flex flex-col items-center gap-6">
                <div class="sm:text-6xl md:text-8xl text-4xl font-bold">
                    <h2>Nyi Nyi Aung</h2>
                </div>
                <div class="sm:text-2xl md:text-4xl text-1xl font-bold">
                    <h4>Software Developer | Showcasing my projects</h4>
                </div>
                <div class="flex items-center gap-2">
                    <BaseButton class-name="bg-black text-white text-sm sm:text-lg md:text-xl">
                        <NuxtLink href="#footer">Contact Me</NuxtLink>
                    </BaseButton>
                    <BaseButton class-name="border border-black text-black bg-[#eaeaea] text-sm sm:text-lg md:text-xl" :default-bg-style="false">
                        <NuxtLink href="#expertise">My expertise</NuxtLink>
                    </BaseButton>
                </div>
            </div>
        </div>
    </div></template>

