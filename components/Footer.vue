<script setup>
const latestYear = new Date().getFullYear();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-y-10 pt-[100px] pb-[50px] dark:bg-gray-800 dark:text-white"
    id="footer"
  >
    <div class="flex flex-col items-center gap-y-5">
      <h1 class="text-5xl md:text-7xl font-bold">Nyi Nyi Aung</h1>
      <ul class="flex gap-x-4 items-center text-sm md:text-md lg:text-lg">
        <li>
          <NuxtLink
            href="https://www.facebook.com/nyinyiaung.nyinyiaung.75054689"
            :external="true"
            target="_blank"
            class="hover:underline"
            >Facebook</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="https://github.com/NyiNyiAung16"
            :external="true"
            target="_blank"
            class="hover:underline"
            >Github</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="https://www.linkedin.com/in/nyi-nyi-aung-36500b264"
            :external="true"
            target="_blank"
            class="hover:underline"
            >Linkedin</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            href="https://t.me/NyiNyiAung16"
            :external="true"
            target="_blank"
            class="hover:underline"
            >Telegram</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div
      class="flex flex-col items-center gap-y-2 text-sm md:text-base lg:text-lg"
    >
      <p>Copyright &copy; {{ latestYear }} All rights reserved.</p>
      <p class="md:text-center lg:text-left">Terms and Privacy</p>
    </div>
  </div>
</template>
