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
};
</script>

<template>
  <div class="max-w-lg mx-5 md:mx-auto mt-5 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
    <h1 class="text-3xl text-center font-bold text-[#808080] mb-5">
      Register Form
    </h1>
    <form class="space-y-3" @submit.prevent="onSubmit">
      <BaseInput type="text" placeholder="Username" v-model="username" />
      <BaseError v-if="error?.username">{{ error?.username }}</BaseError>
      <BaseInput type="email" placeholder="Email Address" v-model="email" />
      <BaseError v-if="error?.email">{{ error?.email }}</BaseError>
      <BaseInput type="password" placeholder="Password" v-model="password" />
      <BaseError v-if="error?.password">{{ error?.password }}</BaseError>
      <BaseButton class-name="text-sm w-full" :disabled="loading">
        <span v-if="!loading">Register</span>
        <Loading v-if="loading" />
      </BaseButton>
    </form>
    <p class="mt-3 font-light text-[#929292] tracking-wide">
      Already have an account?
      <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
    </p>
  </div>
</template>
