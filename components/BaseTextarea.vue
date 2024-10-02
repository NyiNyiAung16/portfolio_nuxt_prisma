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
  <textarea
    class="w-full min-h-[130px] box-border outline-none border-2 px-3 py-2 rounded-md bg-[#eaeaea] focus:border-zinc-400 resize-none"
    v-model="model"
    :placeholder="placeholder"
  ></textarea>
</template>
