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
        class="w-full box-border outline-none border-2 px-3 py-2 rounded-md bg-[#eaeaea] focus:border-zinc-400"
    >
</template>

