<script setup>
import { useFile } from '~/componsables/useFile';


definePageMeta({
    layout: 'admin-layout'
});

const files = ref(null);
const previewImages = ref([]);

const onChange = async (file) => {
    previewImages.value = [];

    const { tempFiles, tempPreviewImages } = await useFile(file);

    files.value = tempFiles;
    previewImages.value = tempPreviewImages;
}

const onSubmit = () => {
    console.log(files.value)
}

</script>


<template>
    <div class="max-w-lg mx-auto">
        <h1 class="text-xl font-bold text-center mb-5 text-[#808080]">Create Project Overview</h1>
        <form @submit.prevent="onSubmit" class="space-y-3">
            <div>
                <label for="files" class="block px-3 py-2 bg-[#eaeaea] rounded-md text-[#929292] cursor-pointer">Images</label>
                <input type="file" id="files" multiple accept=".jpg, .jpeg, .png" @change="onChange" class="hidden ">
            </div>
            <div v-show="previewImages.length > 0" class="flex items-start flex-wrap gap-3">
                <div v-for="image in previewImages" :key="image">
                    <img :src="image" :alt="image" class="w-[150px] object-cover rounded-md">
                </div>
            </div>    
            <BaseButton class-name="text-sm" type="submit">Create</BaseButton>
        </form>
    </div>
</template>

