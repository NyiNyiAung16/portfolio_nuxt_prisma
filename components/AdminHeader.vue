<script setup>
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const auth = useAuth();
const { user } = storeToRefs(auth);
</script>

<template>
  <div
    class="dark:bg-gray-800 dark:text-white transition-colors duration-500 flex items-center justify-between px-4 py-3 mb-7"
  >
    <div class="flex items-center gap-x-5 md:block">
      <div class="block md:hidden">
        <BaseDropdownMenu>
          <template #icon>
            <FontAwesome
              icon="bars"
              class="text-2xl text-gray-700 hover:text-gray-800 duration-100 dark:text-gray-300"
            />
          </template>
          <template #content>
            <DropdownMenuItem>
              <NuxtLink href="/">Home</NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              :class="{
                'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300':
                  $route.path === '/admin/dashboard',
              }"
            >
              <NuxtLink href="/admin/dashboard" class="w-full"
                >Dashboard</NuxtLink
              >
            </DropdownMenuItem>
            <DropdownMenuItem
              :class="{
                'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300':
                  $route.path === '/admin/users',
              }"
            >
              <NuxtLink href="/admin/users" class="w-full">Users</NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              :class="{
                'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-300':
                  $route.path === '/admin/project/create',
              }"
            >
              <NuxtLink href="/admin/project/create" class="w-full"
                >Create Project</NuxtLink
              >
            </DropdownMenuItem>
          </template>
        </BaseDropdownMenu>
      </div>
      <div class="hidden md:block">
        <BaseTooltip>
          <template #icon>
            <NuxtLink href="/">
              <FontAwesome
                icon="right-to-bracket"
                transform="rotate-180"
                class="text-2xl text-gray-700 hover:translate-x-[-5px] duration-300 dark:text-gray-300"
              />
            </NuxtLink>
          </template>
          <template #content>
            <p>Back to Home</p>
          </template>
        </BaseTooltip>
      </div>
    </div>
    <div>
      <div class="flex items-center gap-x-2">
        <p class="font-semibold">{{ user.username }}</p>
        <span class="text-gray-500 dark:text-gray-400">/</span>
        <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>
