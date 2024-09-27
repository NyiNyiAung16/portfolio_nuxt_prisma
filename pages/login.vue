<script setup>
import { useAuth } from '~/stores/useAuth';

definePageMeta({
    middleware: 'auth'
});

const auth = useAuth();

const email = ref('');
const password = ref('');

const onSubmit = async () => {
    
    const res = await auth.login(email.value, password.value);
    console.log(res)
    if(res) {
        await navigateTo('/', { replace: true});
    }
}

</script>


<template>
    <div class="max-w-xl w-full mx-auto bg-white mt-6 p-5 rounded-md shadow-md">
        <h1 class="text-3xl text-center font-bold mb-5 text-[#808080]">Login Form</h1>
        <form class="space-y-2" @submit.prevent="onSubmit">
            <BaseInput
                type="email"
                placeholder="Email Address"
                v-model="email"
            />
            <BaseInput
                type="password"
                placeholder="Password"
                v-model="password"
            />
            <BaseButton type="submit" class-name="text-sm">Login</BaseButton>
        </form>
        <p class="mt-3 font-light text-[#929292] tracking-wide">Don't have an account? <NuxtLink to="/register" class="hover:underline">Register</NuxtLink></p>
    </div>
</template>

