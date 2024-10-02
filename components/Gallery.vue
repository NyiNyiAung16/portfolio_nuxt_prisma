<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination, Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const { isCoverFlow } = defineProps({
    isCoverFlow: {
        type: Boolean,
        default: true
    },
    images: {
        type: Array,
        required: true
    }
});

const handleClick = (event) => {
    if(isCoverFlow === false) return false;

    event.slideTo(event.clickedIndex - 1)
}

</script>

<template>
    <Swiper
        class="swiper"
        :modules="[Pagination,Autoplay,EffectCoverflow,Navigation]"
        :effect="isCoverFlow ? 'coverflow' : ''"
        :coverflow-effect="{
            rotate:0,
            stretch:80,
            depth:350,
            modifier:.7,
            slideShadows:true,
        }"
        :space-between="30"
        :slides-per-view="isCoverFlow ? 3 : 2"
        :pagination="{ clickable : true}"
        :navigation="true"
        :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }"
        :loop="isCoverFlow"
        @click="handleClick"
    >
        <SwiperSlide v-for="image in images" :key="image">
            <img :src="`/project/photos/${image}`" class="w-full h-[350px] object-cover rounded-md" :alt="`image ${image}`">
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

