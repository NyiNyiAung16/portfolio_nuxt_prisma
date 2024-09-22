<script setup>

</script>


<template>
    <div class="overflow-hidden">
        <div class="w-screen h-[90dvh] flex flex-col justify-evenly">
            <div class="flex flex-col items-center gap-6">
                <div>
                    <h2 class="font-bold text-8xl">Nyi Nyi Aung</h2>
                </div>
                <div>
                    <h4 class="font-bold text-3xl">Software Developer | Showcasing my projects</h4>
                </div>
                <div class="flex items-center gap-2">
                    <BaseButton>
                        <NuxtLink href="#footer">Contact Me</NuxtLink>
                    </BaseButton>
                    <BaseButton class-name="border border-black text-black bg-[#eaeaea]">
                        <NuxtLink href="#expertise">My expertise</NuxtLink>
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

