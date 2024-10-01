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
  <Toaster />
  <div class="max-w-xl w-full mx-auto p-5 rounded-md bg-white mt-6 shadow-md">
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
      <BaseButton class-name="text-sm" :disabled="loading">
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
