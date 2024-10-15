<script setup>

defineProps({
    options: {
        type:Array,
        required:true
    },
    label: {
        type:String,
    }
});

const model = defineModel({ required:true });

</script>


<template>
    <select class="w-full box-border outline-none border-2 px-3 py-2 rounded-md bg-[#eaeaea] focus:border-zinc-400 appearance-none" v-model="model">
        <option value="" disabled>Select a {{ label }}</option>
        <option 
            v-for="option in options"
            :key="option"
        >
            {{ option }}
        </option>   
    </select></template>

