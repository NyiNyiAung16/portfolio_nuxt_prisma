<script setup>
import { setToast } from "~/componsables/toastHelper";

const { project } = defineProps({
  project: {
    type: Object,
  },
});

const emits = defineEmits(["close"]);

const projectsStore = useProjectsStore();
const { error, loading } = storeToRefs(projectsStore);

//project destructured
const localProject = ref({ ...project } || {});

const hasProject = computed(() => {
  return Object.keys(localProject.value).length > 0;
});

const title = ref("");
const description = ref("");
const tags = ref([]);
const youtubeLink = ref("");
const images_path = ref([]);
const tag = ref("");

const addTag = (val) => {
  if (!val.trim() || tags.value.includes(val)) return;

  tags.value.push(val.trim());
  tag.value = "";
};

const onDeleteTag = (val) => {
  tags.value = tags.value.filter((tag) => tag != val);
};

const onSubmit = async () => {
  try {
    const data = {
      title: title.value,
      description: description.value,
      youtube_link: youtubeLink.value,
      tags: tags.value,
      images_path: images_path.value,
    };

    const response = Object.keys(localProject.value).length > 0
      ? await projectsStore.update(localProject.value.id, data)
      : await projectsStore.create(data);

    if (response?.status === 200 && response?.statusText === "OK") {
      resetForm();
      emits("close");
    }
  } catch (error) {
    setToast({ title: error.message });
  }
};

const resetForm = () => {
  title.value = "";
  description.value = "";
  youtubeLink.value = "";
  tags.value = [];
  images_path.value = [];
};

watch(
  () => localProject.value,
  () => {
    if (Object.keys(localProject.value).length > 0) {
      title.value = localProject.value.title;
      description.value = localProject.value.description;
      youtubeLink.value = localProject.value.youtube_link;
      tags.value = [...localProject.value.tags];
      images_path.value = [...localProject.value.images_path];
    }
  },
  { deep: true, immediate: true }
);

</script>

<template>
  <div
    :class="{
      'max-w-xl mx-auto border border-slate-200 rounded-md shadow-md px-6 py-4 dark:border-gray-600 dark:bg-gray-800':
        !hasProject,
    }"
  >
    <h1
      v-if="!hasProject"
      class="text-xl font-bold text-center mb-4 text-[#808080] dark:text-white"
    >
      <span>Create Project</span>
    </h1>
    <form class="space-y-3" @submit.prevent.self="onSubmit">
      <BaseInput type="text" placeholder="Title" v-model="title" />
      <BaseError v-if="error?.title">{{ error?.title }}</BaseError>
      <BaseTextarea placeholder="Description" v-model="description" />
      <BaseError v-if="error?.description">{{ error?.description }}</BaseError>
      <BaseInput type="text" placeholder="Youtube Link" v-model="youtubeLink" />
      <BaseError v-if="error?.youtube_link"
        >{{ error?.youtube_link }}
      </BaseError>
      <div class="flex gap-x-3">
        <BaseInput type="text" placeholder="Tag" v-model="tag" />
        <div
          @click="addTag(tag)"
          class="flex items-center px-3 py-2 rounded-md bg-[#eaeaea] dark:bg-gray-700 text-sm cursor-pointer hover:bg-[#dcdcdc] dark:hover:bg-gray-600 duration-150"
        >
          Add
        </div>
      </div>
      <BaseError v-if="error?.tags">{{ error?.tags }}</BaseError>
      <div v-show="tags.length > 0" class="flex items-center gap-x-3">
        <div
          v-for="tag in tags"
          :key="tag"
          class="relative px-4 py-2 rounded-lg bg-[#eaeaea] dark:bg-gray-700"
        >
          <span>{{ tag }}</span>
          <FontAwesome
            icon="xmark"
            class="absolute top-0 right-0 cursor-pointer hover:text-red-500 duration-150"
            @click="onDeleteTag(tag)"
          />
        </div>
      </div>
      <div>
        <FilesUpload v-model="images_path"/>
        <BaseError v-if="error?.images_path">{{ error?.images_path }}</BaseError>
      </div>
      <Button type="submit" :disabled="loading.value">
        <span v-if="!loading.value">{{
          project ? "Save Changes" : "Create"
        }}</span>
        <Loading v-if="loading.value" />
      </Button>
    </form>
  </div>
</template>
