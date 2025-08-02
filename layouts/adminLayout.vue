<script setup></script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <div class="flex flex-col h-full">
      <div class="h-full grid grid-cols-1 md:grid-cols-4">
        <div
          class="h-full hidden md:block col-span-1 md:col-span-1 border-r border-zinc-500 py-4 px-4 bg-white darkMode"
        >
          <div class="flex flex-col gap-y-2">
            <NuxtLink
              href="/admin/dashboard"
              class="flex gap-x-2 rounded-md py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icons-House class="w-6 h-6" />
              <span class="ml-2">Dashboard</span>
            </NuxtLink>
            <NuxtLink
              href="/admin/users"
              class="flex gap-x-2 rounded-md py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icons-User class="w-6 h-6" />
              <span class="ml-2">Users</span>
            </NuxtLink>
            <NuxtLink
              href="/admin/project/create"
              class="flex gap-x-2 rounded-md py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icons-Create class="w-6 h-6" />
              <span class="ml-2">Create Project</span>
            </NuxtLink>
          </div>
        </div>
        <div
          class="h-full col-span-3 md:col-span-3 py-4 px-4 bg-white darkMode"
        >
          <AdminHeader />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-gray-600 font-medium bg-gray-200;
}
</style>
