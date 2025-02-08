<script setup>
import { setToast } from "~/componsables/toastHelper";
import { loginSchema } from "../validations/authValidations.js";
import { zodErrorsToObject } from "../componsables/zodErrorsHelper.js";
import { z } from "zod";

definePageMeta({
  middleware: "auth",
});

const auth = useAuth();
const { error, loading } = storeToRefs(auth);

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const onSubmit = async () => {
  try {
    const result = loginSchema.parse({
      email: email.value,
      password: password.value,
    });
    const response = await auth.login(result);

    if (response && response.status === 200) {
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
      setTimeout(() => (error.value = null), 1500);
    } else if (e instanceof Error) {
      setToast({ title: e.message });
    }
  }
};
</script>

<template>
  <div>
    <Head>
      <Title>Login</Title>
      <Meta name="description" content="Login" />
    </Head>
    <div class="min-h-screen flex items-center justify-center">
      <div
        class="w-full max-w-md sm:max-w-lg md:max-w-xl mx-4 sm:mx-5 md:mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 dark:bg-gray-900 dark:text-white transition-colors duration-500"
      >
        <div class="text-center">
          <h1
            class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 text-[#808080] dark:text-white"
          >
            Login Form
          </h1>
        </div>
        <form class="space-y-3" @submit.prevent="onSubmit">
          <BaseInput
            type="email"
            placeholder="Email Address"
            v-model="email"
            class="dark:bg-gray-700 dark:text-white"
          />
          <BaseError
            v-if="error?.email"
            class="text-xs sm:text-sm text-red-500 dark:text-red-300"
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
              class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer select-none"
            />
          </div>
          <BaseError
            v-if="error?.password"
            class="text-xs sm:text-sm text-red-500 dark:text-red-300"
            >{{ error?.password }}</BaseError
          >
          <Button type="submit" class="w-full" :disabled="loading">
            <span v-if="!loading">Login</span>
            <Loading v-if="loading" />
          </Button>
        </form>
        <p
          class="mt-2 sm:mt-3 text-center text-[#929292] dark:text-gray-300 tracking-wide text-sm md:text-base lg:text-lg"
        >
          Don't have an account?
          <NuxtLink
            to="/register"
            class="underline hover:text-gray-500 duration-100"
            >Register</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
