<script setup>
import { animate, inView, stagger } from "motion";

onMounted(() => {
  inView('.scrollAnimationLeft', ({ target }) => {
    animate(
      target,
      { 
        opacity: [0, 1],
        x: [-100, 0],
        scale: [0.8, 1],
        rotate: [-10, 0],
        filter: ['blur(10px)', 'blur(0px)']
      },
      {
        duration: 0.6,
        delay: stagger(0.1),
        easing: 'ease-out'
      }
    );
  });
  inView('.scrollAnimationRight', ({ target }) => {
    animate(
      target,
      { 
        opacity: [0, 1],
        x: [100, 0],
        scale: [0.8, 1],
        rotate: [10, 0],
        filter: ['blur(10px)', 'blur(0px)']
      },
      {
        duration: 0.6,
        delay: stagger(0.1),
        easing: 'ease-out'
      }
    );
  });
});
</script>

<template>
  <div class="overflow-hidden">
    <Head>
      <Title>NYI NYI AUNG | Home</Title>
      <Meta name="description" content="Home Page" />
    </Head>
    <Banner />
    <Expertise class="scrollAnimationLeft" />
    <ProjectsPreview class="scrollAnimationRight" />
    <AboutMe class="scrollAnimationLeft" />
    <HiringMe class="scrollAnimationRight" />
    <Footer class="scrollAnimationLeft" />
  </div>
</template>
