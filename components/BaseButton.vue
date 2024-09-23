<script setup>

defineProps({
    className:{
        type: String,
        default: 'bg-black text-white'
    },
    href: {
        type: String,
        required: true
    }
})

</script>

<template>
    <NuxtLink :href="href" :class="`${className} text-lg font-medium rounded-md px-3 py-2 hover:bg-opacity-80 active:bg-opacity-100 duration-150`">
        <slot/>
    </NuxtLink>
</template>