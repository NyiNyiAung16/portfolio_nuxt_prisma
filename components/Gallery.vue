<script setup>
import { register } from "swiper/element/bundle";

register();

const swiperRef = ref(null);

const { isCoverFlow } = defineProps({
  isCoverFlow: {
    type: Boolean,
    default: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

let coverflowView = ref(3);
let defaultView = ref(2);
const coverFlowEffect = ref({
  rotate: 0,
  stretch: 80,
  depth: 350,
  modifier: 0.7,
  slideShadows: true,
});

onMounted(() => {
  if (window.innerWidth < 768) {
    coverflowView.value = 1;
    defaultView.value = 1;
  } else if (window.innerWidth < 1024) {
    coverflowView.value = 3;
    defaultView.value = 2;
  } else {
    defaultView.value = 3;
  }
});

</script>

<template>
  <swiper-container
    ref="swiperRef"
    :effect="isCoverFlow ? 'coverflow' : 'slide'"
    :coverflowEffect="coverFlowEffect"
    :space-between="10"
    :slides-per-view="isCoverFlow ? coverflowView : defaultView"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :centered-slides="isCoverFlow"
    :speed="500"
    :loop="isCoverFlow"
    pagination="true"
    navigation="true"
  >
    <swiper-slide v-for="image in images" :key="image">
      <CldImage
        :src="image"
        width="700"
        height="400"
        :alt="`Image - ${image}`"
        lazy="true"
      />
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
.slide {
  background-color: rgb(97, 95, 95);
  height: 200px;
  width: 100px;
}
</style>
