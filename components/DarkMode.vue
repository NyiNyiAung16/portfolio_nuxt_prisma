<script setup>

const isDarkMode = ref(true);
const modeIcon = ref("moon");

onMounted(() => {
  isDarkMode.value = localStorage.getItem('theme') === 'dark';
  modeIcon.value = isDarkMode.value ? "sun" : "moon";
  document.documentElement.classList.toggle('dark', isDarkMode.value);
})

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark', isDarkMode.value = !isDarkMode.value);
  modeIcon.value = isDarkMode.value ? "sun" : "moon";
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
}

</script>

<template>
    <button
        @click="toggleDarkMode(!isDarkMode)"
        class="cursor-pointer block md:inline-block"
    >
        <FontAwesome
        :icon="['far', modeIcon]"
        class="text-2xl text-gray-700 hover:text-gray-800 duration-100 dark:text-gray-200"
        />
    </button>
</template>
