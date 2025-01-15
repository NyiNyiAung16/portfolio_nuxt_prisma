<script setup>
import Switch from './ui/switch/Switch.vue';

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
  <Switch :checked="isDarkMode" @update:checked="toggleDarkMode">
    <template #thumb>
      <MoonIcon class="w-[20px]" v-if="isDarkMode" />
      <SunIcon class="w-[20px]" v-else />
    </template>
  </Switch>
</template>
