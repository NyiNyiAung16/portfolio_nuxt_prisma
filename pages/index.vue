<script setup>
import { animate, inView } from "motion";

useHead({
  title: "Home",
  meta: [
    {
      name: 'description',
      content: 'Home Page'
    }
  ]
});


onMounted(() => {
  inView(".scrollAnimationLeft", ({ target }) => {
    animate(
      target,
      {
        opacity: [0, 1],
        x: [-100, 0],
        scale: [0.8, 1],
        filter: ["blur(10px)", "blur(0px)"],
      },
      {
        duration: 0.9,
        easing: [0.17, 0.55, 0.55, 1],
      }
    );
  });
  inView(".scrollAnimationRight", ({ target }) => {
    animate(
      target,
      {
        opacity: [0, 1],
        x: [100, 0],
        scale: [0.8, 1],
        filter: ["blur(10px)", "blur(0px)"],
      },
      {
        duration: 0.9,
        easing: [0.17, 0.55, 0.55, 1],
      }
    );
  });
});
</script>

<template>
  <div class="overflow-hidden">
    <Banner />
    <Expertise class="scrollAnimationLeft" />
    <ProjectsPreview class="scrollAnimationRight" />
    <AboutMe class="scrollAnimationLeft" />
    <HiringMe class="scrollAnimationRight" />
    <Footer class="scrollAnimationLeft" />
  </div>
</template>
