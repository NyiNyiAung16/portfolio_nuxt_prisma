<script setup>
definePageMeta({
  middleware: "auth",
});

const auth = useAuth();
const { error, loading } = storeToRefs(auth);

const email = ref("");
const password = ref("");

const onSubmit = async () => {
  const response = await auth.login(email.value, password.value);

  if (response.status === 200 && response.statusText == "OK") {
    email.value = "";
    password.value = "";
    return navigateTo("/", { replace: true });
  }
};
</script>

<template>
  <div class="min-h-screen">
    <div
      class="max-w-lg mx-5 md:mx-auto mt-5 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:text-white transition-colors duration-500"
    >
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-5 text-[#808080] dark:text-white">
          Login Form
        </h1>
      </div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <BaseInput
          type="email"
          placeholder="Email Address"
          v-model="email"
          class="dark:bg-gray-700 dark:text-white"
        />
        <BaseError v-if="error?.email" class="text-sm text-red-500 dark:text-red-300">{{ error?.email }}</BaseError>
        <BaseInput
          type="password"
          placeholder="Password"
          v-model="password"
          class="dark:bg-gray-700 dark:text-white"
        />
        <BaseError v-if="error?.password" class="text-sm text-red-500 dark:text-red-300">{{ error?.password }}</BaseError>
        <Button type="submit" class=" w-full " :disabled="loading">
          <span v-if="!loading">Login</span>
          <Loading v-if="loading" />
        </Button>
      </form>
      <p class="mt-3 text-center text-sm text-[#929292] dark:text-gray-300 tracking-wide">
        Don't have an account?
        <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>
