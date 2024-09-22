<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'


</script>

<template>
    <Swiper
        class="swiper"
        :modules="[Pagination,Autoplay,EffectCoverflow]"
        effect="coverflow"
        :space-between="30"
        :slides-per-view="3"
        :pagination="{ clickable : true}"
        :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }"
        :loop="true"
    >
        <SwiperSlide v-for="num in 8" :key="num">
            <img :src="`/photos/${num}.jpg`" class="w-full h-[330px] object-cover hover:scale-105 duration-200" alt="image">
        </SwiperSlide>
    </Swiper>
</template>

<style scoped>

.slide {
    background-color: rgb(97, 95, 95);
    height: 200px;
    width: 100px;
}

</style>

