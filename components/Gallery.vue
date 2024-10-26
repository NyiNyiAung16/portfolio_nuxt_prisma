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

let coverflowView = ref(3);
let defaultView = ref(2);

onMounted(() => {
    if(window.innerWidth < 768) {
        coverflowView.value = 1;
        defaultView.value = 1;
    } else {
        coverflowView.value = 3;
        defaultView.value = 2;
    }
})

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
        :space-between="10"
        :slides-per-view="isCoverFlow ? coverflowView : defaultView"
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
            <CldImage
                :src="image"
                width="700"
                height="400"
                :alt="`Image - ${image}`"
            />
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

