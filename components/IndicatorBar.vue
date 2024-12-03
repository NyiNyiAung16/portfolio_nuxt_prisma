<script setup>
const nuxtApp = useNuxtApp();

const isLoading = ref(false);
const progress = ref(0);

nuxtApp.hook("page:loading:start", () => {
  start();
});

const start = () => {
  isLoading.value = true;
  progress.value += 20;
  setTimeout(() => {
    finish();
  }, 300);
};

const finish = () => {
  progress.value = 100;
  setTimeout(() => {
    isLoading.value = false;
    progress.value = 0;
  }, 300);
};
</script>

<template>
  <div class="progress-bar" v-if="isLoading">
    <div class="progress-bar-inner" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: transparent;
  z-index: 9999;
}
.progress-bar-inner {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s ease-in-out;
}
</style>
