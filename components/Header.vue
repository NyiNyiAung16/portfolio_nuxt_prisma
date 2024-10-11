<script setup>
import { setToast } from "~/componsables/toastHelper.js";

const { loggedIn, clear, user } = useUserSession();

const logout = async () => {
    await clear();
    setToast({ title: "Logout Successful🙌🙌", duration: 3000 } );
}

</script>

<template>
    <div class="flex justify-between px-4 py-2 md:px-8 md:py-4 select-none">
        <h2 class="font-bold text-2xl text-gray-800 md:text-3xl">NYI NYI AUNG</h2>
        <ul class="flex gap-3 items-center md:gap-6">
            <li>
                <NuxtLink href="/" class="block md:inline-block">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink href="/projects" class="block md:inline-block">Projects</NuxtLink>
            </li>
            <li v-if="user?.role === 'ADMIN'">
                <NuxtLink href="/admin/dashboard" class="block md:inline-block">Dashboard</NuxtLink>
            </li>
            <li v-if="!loggedIn">
                <NuxtLink href="/login" class="block md:inline-block">Login</NuxtLink>
            </li>
            <li v-if="!loggedIn">
                <NuxtLink href="/register" class="block md:inline-block">Register</NuxtLink>
            </li>
            <li v-if="loggedIn"> 
                <p @click="logout" class="cursor-pointer block md:inline-block">Logout</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.router-link-active {
    @apply underline decoration-zinc-500 decoration-2 underline-offset-4
}
</style>

