<script setup>

</script>


<template>
    <div>
        <div class="grid grid-cols-12 px-4 py-3 h-[88dvh]">
            <div class="col-span-3 flex flex-col gap-y-4 text-lg px-5 pt-5">    
                <NuxtLink href="/admin/dashboard">Dashboard</NuxtLink>
                <NuxtLink href="/admin/users">Users</NuxtLink>
                <NuxtLink href="/admin/project/create">Create Project</NuxtLink>
            </div>
            <div class="col-span-9 border-l border-zinc-500 px-4">
                <AdminHeader/>
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped>

.router-link-active {
    @apply text-zinc-500 font-bold
}

</style>
