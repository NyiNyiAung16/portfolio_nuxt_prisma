<script setup></script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <div class="flex flex-col h-full">
      <div class="h-full grid grid-cols-1 md:grid-cols-4">
        <div class="h-full hidden md:block col-span-1 md:col-span-1 border-r border-zinc-500 py-4 px-4 bg-white darkMode">
          <div class="flex flex-col gap-y-2">
            <NuxtLink
              href="/admin/dashboard"
              class="flex gap-x-2 rounded-md py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span class="ml-2">Dashboard</span>
            </NuxtLink>
            <NuxtLink
              href="/admin/users"
              class="flex gap-x-2 rounded-md py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FontAwesome :icon="['far', 'user']"  class="w-6 h-6 text-lg"/>
              <span class="ml-2">Users</span>
            </NuxtLink>
            <NuxtLink
              href="/admin/project/create"
              class="flex gap-x-2 rounded-md py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="ml-2">Create Project</span>
            </NuxtLink>
          </div>
        </div>
        <div class="h-full col-span-3 md:col-span-3 py-4 px-4 bg-white darkMode">
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
