<script setup>

</script>


<template>
    <div class="h-screen flex flex-col">
        <div class="flex flex-col h-full">
            <div class="h-full flex">
                <div class="h-full w-64 border-r border-zinc-500 py-4 px-4">
                    <div class="flex flex-col gap-y-2">
                        <NuxtLink href="/admin/dashboard" class="rounded-md py-2 px-3 hover:bg-gray-200">Dashboard</NuxtLink>
                        <NuxtLink href="/admin/users" class="rounded-md py-2 px-3 hover:bg-gray-200">Users</NuxtLink>
                        <NuxtLink href="/admin/project/create" class="rounded-md py-2 px-3 hover:bg-gray-200">Create Project</NuxtLink>
                    </div>
                </div>
                <div class="h-full flex-1 py-4 px-4">
                    <AdminHeader/>
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.router-link-active {
    @apply text-gray-600 font-medium bg-gray-200
}

</style>
