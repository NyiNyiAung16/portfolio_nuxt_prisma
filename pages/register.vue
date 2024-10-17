<script setup>
definePageMeta({
  middleware: "auth",
});

const auth = useAuth();
const { error, loading } = storeToRefs(auth);

const username = ref("");
const email = ref("");
const password = ref("");

const onSubmit = async () => {
  try {
    const response = await auth.register(
      username.value,
      email.value,
      password.value
    );
  
    if (response.status === 200 && response.statusText == "OK") {
      username.value = '';
      email.value = '';
      password.value = '';
      return navigateTo("/", { replace: true });
    }
  } catch (error) {
    setToast({ title: error.message });
  }
};
</script>

<template>
  <div class="h-screen">
    <div class="max-w-lg mx-5 md:mx-auto mt-5 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <h1 class="text-3xl text-center font-bold text-[#808080] mb-5 dark:text-white">
        Register Form
      </h1>
      <form class="space-y-3" @submit.prevent="onSubmit">
        <BaseInput type="text" placeholder="Username" v-model="username" class="dark:bg-gray-700 dark:text-white" />
        <BaseError v-if="error?.username" class="text-sm text-red-500 dark:text-red-300">{{ error?.username }}</BaseError>
        <BaseInput type="email" placeholder="Email Address" v-model="email" class="dark:bg-gray-700 dark:text-white" />
        <BaseError v-if="error?.email" class="text-sm text-red-500 dark:text-red-300">{{ error?.email }}</BaseError>
        <BaseInput type="password" placeholder="Password" v-model="password" class="dark:bg-gray-700 dark:text-white" />
        <BaseError v-if="error?.password" class="text-sm text-red-500 dark:text-red-300">{{ error?.password }}</BaseError>
        <Button  type="submit" class=" w-full " :disabled="loading">
          <span v-if="!loading">Register</span>
          <Loading v-if="loading" />
        </Button>
      </form>
      <p class="mt-3 text-center text-sm text-[#929292] dark:text-gray-300 tracking-wide">
        Already have an account?
        <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>
