<script setup>
import { setToast } from "~/componsables/toastHelper.js";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const { loggedIn, clear: clearSession, user } = useUserSession();

const logout = async () => {
  await clearSession();
  setToast({ title: "Logout Successful🙌🙌" });
};
</script>

<template>
  <header
    class="flex justify-between px-4 py-2 md:px-8 md:py-4 select-none darkMode transition-colors duration-500"
  >
    <h2
      class="font-bold text-xl text-gray-800 md:text-2xl dark:text-white flex items-center gap-x-1"
    >
      <NuxtLink href="/" active-class="''" exact-active-class="''">NYI NYI AUNG</NuxtLink>
    </h2>
    <ul class="hidden md:flex gap-3 items-center md:gap-6">
      <li>
        <NuxtLink href="/" class="block md:inline-block">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink href="/projects" class="block md:inline-block"
          >Projects</NuxtLink
        >
      </li>
      <li v-if="user?.role === 'ADMIN'">
        <NuxtLink href="/admin/dashboard" class="block md:inline-block"
          >Dashboard</NuxtLink
        >
      </li>
      <li v-if="!loggedIn">
        <NuxtLink href="/login" class="block md:inline-block">Login</NuxtLink>
      </li>
      <li v-if="!loggedIn">
        <NuxtLink href="/register" class="block md:inline-block"
          >Register</NuxtLink
        >
      </li>
      <li v-if="loggedIn">
        <p @click="logout" class="cursor-pointer block md:inline-block">
          Logout
        </p>
      </li>
      <li class="self-end">
        <DarkMode />
      </li>
    </ul>
    <div class="block md:hidden">
      <BaseDropdownMenu>
        <template #icon>
          <FontAwesome
            icon="bars"
            class="text-2xl text-gray-700 hover:text-gray-800 duration-100 dark:text-white"
          />
        </template>
        <template #content>
          <DropdownMenuItem
            :class="{
              'bg-gray-200 text-gray-900': $route.path === '/',
            }"
          >
            <NuxtLink href="/" class="w-full">Home</NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            :class="{
              'bg-gray-200 text-gray-900': $route.path === '/projects',
            }"
          >
            <NuxtLink href="/projects" class="w-full">Projects</NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            :class="{
              'bg-gray-200 text-gray-900': $route.path === '/admin/dashboard',
            }"
            v-if="user?.role === 'ADMIN'"
          >
            <NuxtLink href="/admin/dashboard" class="w-full"
              >Dashboard</NuxtLink
            >
          </DropdownMenuItem>
          <DropdownMenuItem
            :class="{
              'bg-gray-200 text-gray-900': $route.path === '/login',
            }"
            v-if="!loggedIn"
          >
            <NuxtLink href="/login" class="w-full">Login</NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            :class="{
              'bg-gray-200 text-gray-900': $route.path === '/register',
            }"
            v-if="!loggedIn"
          >
            <NuxtLink href="/register" class="w-full">Register</NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            :class="{
              'bg-gray-200 text-gray-900': $route.path === '/logout',
            }"
            v-if="loggedIn"
          >
            <p @click="logout">Logout</p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DarkMode />
          </DropdownMenuItem>
        </template>
      </BaseDropdownMenu>
    </div>
  </header>
</template>

<style scoped>
.router-link-active {
  @apply md:underline md:decoration-zinc-500 md:decoration-2 md:underline-offset-4;
}
</style>
