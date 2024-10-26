<script setup>
import axios from "axios";
import { setToast } from "~/componsables/toastHelper";

const props = defineProps({
  modelValue: {
    type: Array,
  },
});

const emits = defineEmits(["update:modelValue"]);

const localImages = ref(props.images_path || []);
const loading = ref(false);

const onUpload = async (e) => {
  try {
    loading.value = true;
    const files = e.target.files;
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
  
    const { data } = await axios.post("/api/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    localImages.value.push(...data.images_path);
    emits("update:modelValue", localImages.value);
  } catch (error) {
    setToast({ title: error.message });
  } finally {
    loading.value = false;
  }
};

const onDeleteImage = async (image) => {
  try {
    await axios.delete("/api/files", {
      data: { images_path: [image] },
    });
    localImages.value = localImages.value.filter((i) => i != image);
    emits("update:modelValue", localImages.value);
  } catch (error) {
    setToast({ title: error.message });
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    localImages.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <label
      for="files"
      class="w-full block text-center px-3 py-2 bg-[#eaeaea] dark:bg-gray-700 rounded-md text-[#929292] cursor-pointer"
      >
        <span v-if="!loading">Upload Images</span>
        <Loading v-if="loading" />
      </label
    >
    <input
      type="file"
      id="files"
      multiple
      accept=".jpg, .jpeg, .png"
      @change="onUpload"
      class="hidden"
      :disabled="loading"
    />
  </div>
  <PreviewPhotos
    v-if="localImages.length > 0"
    :images="localImages"
    @on-delete-image="onDeleteImage"
  />
</template>
