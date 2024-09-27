<script setup>

const { user, clear, session } = useUserSession();

const logout = async () => {
    await clear();
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
            <li v-if="!user">
                <NuxtLink href="/login">Login</NuxtLink>
            </li>
            <li v-if="!user">
                <NuxtLink href="/register">Register</NuxtLink>
            </li>
            <li v-if="user"> 
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

