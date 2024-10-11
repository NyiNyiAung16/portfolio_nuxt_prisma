<script setup>

defineProps({
    placeholder:{
        type:String,
        default:''
    }
});

const model = defineModel({ required:true });

</script>


<template>
    <input
        v-model="model"
        :placeholder="placeholder"
        class="w-full box-border outline-none border-2 px-3 py-2 rounded-md bg-[#eaeaea]  border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-zinc-200 "
    >
</template>

