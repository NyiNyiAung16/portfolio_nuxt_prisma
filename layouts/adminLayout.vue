<script setup>

</script>


<template>
    <div>
        <Header/>
        <div class="grid grid-cols-12 px-4 py-3 h-[88dvh]">
            <div class="col-span-3 flex flex-col gap-y-4">    
                <NuxtLink href="/admin/dashboard">Dashboard</NuxtLink>
                <NuxtLink href="/admin/users">Users</NuxtLink>
                <NuxtLink href="/admin/project/create">Create Project</NuxtLink>
            </div>
            <div class="col-span-9 border-l border-zinc-500 px-4">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped>

.router-link-active {
    @apply underline decoration-zinc-500 decoration-2 underline-offset-4
}

</style>
