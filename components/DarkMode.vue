<script setup>

const isDarkMode = ref(true);
const modeIcon = ref("moon");

onMounted(() => {
  // Check local storage to see if dark mode is enabled
  isDarkMode.value = localStorage.getItem('theme') === 'dark'
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  }
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
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
