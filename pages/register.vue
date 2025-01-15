<script setup>
import { setToast } from "~/componsables/toastHelper";
import { registerSchema } from '../validations/authValidations.js';
import { zodErrorsToObject } from '../componsables/zodErrorsHelper.js';
import { z } from 'zod';

definePageMeta({
  middleware: "auth",
});

const auth = useAuth();
const { error, loading } = storeToRefs(auth);

const username = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const onSubmit = async () => {
  try {
    const result = registerSchema.parse({ username: username.value, email: email.value, password: password.value });
    const response = await auth.register(result);

    if (response && response.status === 200) {
      username.value = "";
      email.value = "";
      password.value = "";
      await nextTick(() => {
        if (import.meta.client) {
          navigateTo("/", { replace: true });
        }
      });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      error.value = zodErrorsToObject(e.errors);
      setTimeout(() => error.value = null, 1500);
    } else if (e instanceof Error) {
      setToast({ title: error.message });
    }
  }
};
</script>

<template>
  <div>
    <Head>
      <Title>NYI NYI AUNG | Register</Title>
    </Head>
    <div class="min-h-screen flex items-center justify-center">
      <div
        class="max-w-lg mx-5 md:mx-auto w-full bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:text-white transition-colors duration-500"
      >
        <h1
          class="text-3xl text-center font-bold text-[#808080] mb-5 dark:text-white"
        >
          Register Form
        </h1>
        <form class="space-y-3" @submit.prevent="onSubmit">
          <BaseInput
            type="text"
            placeholder="Username"
            v-model="username"
            class="dark:bg-gray-700 dark:text-white"
          />
          <BaseError
            v-if="error?.username"
            class="text-sm text-red-500 dark:text-red-300"
            >{{ error?.username }}</BaseError
          >
          <BaseInput
            type="email"
            placeholder="Email Address"
            v-model="email"
            class="dark:bg-gray-700 dark:text-white"
          />
          <BaseError
            v-if="error?.email"
            class="text-sm text-red-500 dark:text-red-300"
            >{{ error?.email }}</BaseError
          >
          <div class="relative">
            <BaseInput
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="password"
              class="dark:bg-gray-700 dark:text-white"
            />
            <FontAwesome
              :icon="showPassword ? 'eye' : 'eye-slash'"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer select-none"
            />
          </div>
          <BaseError
            v-if="error?.password"
            class="text-sm text-red-500 dark:text-red-300"
            >{{ error?.password }}</BaseError
          >
          <Button type="submit" class="w-full" :disabled="loading">
            <span v-if="!loading">Register</span>
            <Loading v-if="loading" />
          </Button>
        </form>
        <p
          class="mt-3 text-center text-sm text-[#929292] dark:text-gray-300 tracking-wide"
        >
          Already have an account?
          <NuxtLink to="/login" class="underline hover:text-gray-500 duration-100">Login</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
