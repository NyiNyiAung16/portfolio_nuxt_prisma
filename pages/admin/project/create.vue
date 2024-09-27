<script setup>

import { useFile } from '~/componsables/useFile';

definePageMeta({ layout: 'admin-layout' });

const title = ref('');
const description = ref('');
const tags = ref([]);
const tag = ref('');
const youtubeLink = ref('');
const files = ref(null);
const previewImages = ref([]);

const onChange = async(file) => {
    previewImages.value = [];
    
    const { tempFiles, tempPreviewImages } = await useFile(file);

    files.value = tempFiles;
    previewImages.value = tempPreviewImages;
}

const addTag = (val) => {
    if(val == '') return;

    tags.value.push(val);
    tag.value = '';
}

const onClick = (val) => {
    tags.value = tags.value.filter((tag) => tag != val);``
}

const onSubmit = () => {
    const data = {
        title: title.value,
        description: description.value,
        youtubeLink: description.value,
        tags: tags.value,
        files: files.value
    };

    const form =  new FormData();
    form.append('data', JSON.stringify(data));

    const res = useFetch('/api/project',{
        method: 'POST',
        body: form
    })
    console.log(res)
}

</script>


<template>
    <div class="max-w-lg mx-auto">
        <h1 class="text-xl font-bold text-center mb-4 text-[#808080]">Create Project</h1>
        <form class="space-y-3" @submit.prevent.self="onSubmit">
            <BaseInput
                type="text"
                placeholder="Title"
                v-model="title"
            />
            <BaseInput
                type="text"
                placeholder="Description"
                v-model="description"
            />
            <BaseInput
                type="text"
                placeholder="Youtube Link"
                v-model="youtubeLink"
            />
            <div class="flex gap-x-3">
                <BaseInput
                    type="text"
                    placeholder="Tag"
                    v-model="tag"
                />
                <div @click="addTag(tag)" class="flex items-center px-3 py-2 rounded-md bg-[#eaeaea] text-sm cursor-pointer hover:bg-[#dcdcdc] duration-150">
                    Add
                </div>
            </div>
            <div v-show="tags.length > 0" class="flex items-center gap-x-3">
                <div v-for="tag in tags" :key="tag" class="relative px-4 py-2 rounded-lg bg-[#eaeaea]">
                    <span>{{ tag }}</span>
                    <FontAwesome icon="xmark" class="absolute top-0 right-0 cursor-pointer hover:text-red-500 duration-150" @click="onClick(tag)"/>
                </div>
            </div>
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

