<script setup>
const latestYear = new Date().getFullYear();

</script>


<template>
    <div class="flex flex-col items-center justify-center gap-y-10 pt-[100px] pb-[50px] dark:bg-gray-800 dark:text-white" id="footer">
        <div class="flex flex-col items-center gap-y-5">
            <h1 class="text-5xl md:text-7xl font-bold">Nyi Nyi Aung</h1>
            <ul class="flex gap-x-4 items-center text-sm md:text-md lg:text-lg">
                <li>
                    <NuxtLink href="/facebook" :external="true" target="_blank">Facebook</NuxtLink>
                </li>
                <li>
                    <NuxtLink href="/github" :external="true" target="_blank">Github</NuxtLink>
                </li>
                <li>
                    <NuxtLink href="/linkedin" :external="true" target="_blank">Linkedin</NuxtLink>
                </li>
                <li>
                    <NuxtLink href="/twitter" :external="true" target="_blank">Twitter</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="flex flex-col items-center gap-y-2">
            <p>&copy; {{ latestYear }} All rights reserved.</p>
            <p> Terms and Privacy</p>
        </div>
    </div>
</template>

