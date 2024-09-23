<script setup>

</script>

<template>
    <div class="flex justify-between p-8 select-none">
        <h2 class="font-bold text-2xl">NYI NYI AUNG</h2>
        <ul class="flex gap-3 items-center">
            <li>
                <NuxtLink href="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink href="/projects">Projects</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.router-link-active {
    @apply underline decoration-zinc-500 decoration-2 underline-offset-4
}
</style>

