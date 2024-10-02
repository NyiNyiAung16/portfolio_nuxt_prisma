<script setup>
import { setToast } from "~/componsables/toastHelper";
import { useFile } from "~/componsables/useFile";

definePageMeta({ layout: "admin-layout" });

const { handleFileInput, files } = useFileStorage();

const projectsStore = useProjectsStore();

const { error, loading } = storeToRefs(projectsStore);

const title = ref("");
const description = ref("");
const tags = ref([]);
const tag = ref("");
const youtubeLink = ref("");
const previewImages = ref([]);

const onChange = async (files) => {
  previewImages.value = [];

  await handleFileInput(files);

  const { tempPreviewImages } = await useFile(files);

  previewImages.value = tempPreviewImages;
};

const addTag = (val) => {
  if (val == "") return;

  tags.value.push(val);
  tag.value = "";
};

const onClick = (val) => {
  tags.value = tags.value.filter((tag) => tag != val);
  ``;
};

const onSubmit = async () => {
  const data = {
    title: title.value,
    description: description.value,
    youtube_link: youtubeLink.value,
    tags: tags.value,
    images_path: null,
  };

  const response = await projectsStore.create(data, files.value);

  if(response.status === 200 && response.statusText == "OK"){
    title.value = '';
    description.value = '';
    youtubeLink.value = '';
    tags.value = [];
    previewImages.value = [];
    files.value = [];
  }

};
</script>

<template>
  <div class="max-w-xl mx-auto border border-slate-200 rounded-md shadow-md px-6 py-4">
    <h1 class="text-xl font-bold text-center mb-4 text-[#808080]">
      Create Project
    </h1>
    <form class="space-y-3" @submit.prevent.self="onSubmit">
      <BaseInput type="text" placeholder="Title" v-model="title" />
      <BaseError v-if="error?.title">{{ error?.title }}</BaseError>
      <BaseInput type="text" placeholder="Description" v-model="description" />
      <BaseError v-if="error?.description">{{ error?.description }}</BaseError>
      <BaseInput type="text" placeholder="Youtube Link" v-model="youtubeLink" />
      <BaseError v-if="error?.youtube_link">{{
        error?.youtube_link
      }}  </BaseError>
      <div class="flex gap-x-3">
        <BaseInput type="text" placeholder="Tag" v-model="tag" />
        <div
          @click="addTag(tag)"
          class="flex items-center px-3 py-2 rounded-md bg-[#eaeaea] text-sm cursor-pointer hover:bg-[#dcdcdc] duration-150"
        >
          Add
        </div>
      </div>
      <BaseError v-if="error?.tags">{{ error?.tags }}</BaseError>
      <div v-show="tags.length > 0" class="flex items-center gap-x-3">
        <div
          v-for="tag in tags"
          :key="tag"
          class="relative px-4 py-2 rounded-lg bg-[#eaeaea]"
        >
          <span>{{ tag }}</span>
          <FontAwesome
            icon="xmark"
            class="absolute top-0 right-0 cursor-pointer hover:text-red-500 duration-150"
            @click="onClick(tag)"
          />
        </div>
      </div>
      <div>
        <label
          for="files"
          class="block px-3 py-2 bg-[#eaeaea] rounded-md text-[#929292] cursor-pointer"
          >Images</label
        >
        <input
          type="file"
          id="files"
          multiple
          accept=".jpg, .jpeg, .png"
          @change="onChange"
          class="hidden"
        />
      </div>
      <BaseError v-if="error?.images_path">{{ error?.images_path }}</BaseError>
      <div
        v-show="previewImages.length > 0"
        class="flex items-start flex-wrap gap-3"
      >
        <div v-for="image in previewImages" :key="image">
          <img
            :src="image"
            :alt="image"
            class="w-[150px] object-cover rounded-md"
          />
        </div>
      </div>
      <BaseButton class-name="text-sm" type="submit" :disabled="loading">
          <span v-if="!loading">Create</span>
          <Loading v-if="loading" />
      </BaseButton>
    </form>
    <Toaster/>
  </div>
</template>
