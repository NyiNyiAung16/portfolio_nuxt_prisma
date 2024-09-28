<script setup>
definePageMeta({
    middleware: 'auth'
});

const auth = useAuth();
const { error, loading } = storeToRefs(auth);

const email = ref('');
const password = ref('');

const onSubmit = async () => {    
    await auth.login(email.value, password.value);
}

</script>


<template>
    <Toaster/>
    <div class="max-w-xl w-full mx-auto bg-white mt-6 p-5 rounded-md shadow-md">
        <h1 class="text-3xl text-center font-bold mb-5 text-[#808080]">Login Form</h1>
        <form class="space-y-2" @submit.prevent="onSubmit">
            <BaseInput
                type="email"
                placeholder="Email Address"
                v-model="email"
            />
            <BaseError v-if="error?.email">{{ error?.email }}</BaseError>
            <BaseInput
                type="password"
                placeholder="Password"
                v-model="password"
            />
            <BaseError v-if="error?.password">{{ error?.password }}</BaseError>
            <BaseButton type="submit" class-name="text-sm">
                <span v-if="!loading">Login</span>
                <Loading v-if="loading"/>
            </BaseButton>
        </form>
        <p class="mt-3 font-light text-[#929292] tracking-wide">Don't have an account? <NuxtLink to="/register" class="hover:underline">Register</NuxtLink></p>
    </div>
</template>

