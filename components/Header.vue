<script setup>
import { setToast } from "~/componsables/toastHelper.js";

const { loggedIn, clear } = useUserSession();

const logout = async () => {
    await clear();
    setToast({ title: "Logout Successful🙌🙌", duration: 3000 } );
}

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
            <li v-if="!loggedIn">
                <NuxtLink href="/login">Login</NuxtLink>
            </li>
            <li v-if="!loggedIn">
                <NuxtLink href="/register">Register</NuxtLink>
            </li>
            <li v-if="loggedIn"> 
                <p @click="logout" class="cursor-pointer">Logout</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.router-link-active {
    @apply underline decoration-zinc-500 decoration-2 underline-offset-4
}
</style>

