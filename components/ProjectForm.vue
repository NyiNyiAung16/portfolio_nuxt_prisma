<script setup>
import { setToast } from "~/componsables/toastHelper";
import projectSchema from "~/validations/projectValidation";
import { zodErrorsToObject } from "~/componsables/zodErrorsHelper";
import { z } from "zod";
import LoadingDots from "./LoadingDots.vue";

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
const githubLink = ref("");
const demoLink = ref("");
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
      github_link: githubLink.value,
      demo_link: demoLink.value,
      tags: tags.value,
      images_path: images_path.value,
    };

    const result = projectSchema.parse(data);

    const response =
      Object.keys(localProject.value).length > 0
        ? await projectsStore.update(localProject.value.id, result)
        : await projectsStore.create(result);

    if (response && response.status === 200) {
      resetForm();
      emits("close");
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      error.value = zodErrorsToObject(e.errors);
      setTimeout(() => (error.value = null), 2000);
    } else if (e instanceof Error) {
      setToast({ title: e.response.data.message });
    }
  }
};

const resetForm = () => {
  title.value = "";
  description.value = "";
  githubLink.value = "";
  demoLink.value = "";
  tags.value = [];
  images_path.value = [];
};

watch(
  () => localProject.value,
  () => {
    if (Object.keys(localProject.value).length > 0) {
      title.value = localProject.value.title;
      description.value = localProject.value.description;
      githubLink.value = localProject.value.github_link;
      demoLink.value = localProject.value.demo_link;
      tags.value = [...localProject.value.tags];
      images_path.value = [...localProject.value.images_path];
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div
    :class="{
      'max-w-xl mx-auto border border-slate-200 rounded-md shadow-md px-6 py-4 dark:border-gray-600 darkMode':
        !hasProject,
    }"
  >
    <h1
      v-if="!hasProject"
      class="text-xl font-bold text-center mb-4 text-[#808080] dark:text-white"
    >
      <span>Create Project</span>
    </h1>
    <form class="space-y-3" @submit.prevent="onSubmit">
      <BaseInput type="text" placeholder="Title" v-model="title" />
      <BaseError v-if="error?.title">{{ error?.title }}</BaseError>
      <BaseTextarea
        placeholder="Description"
        class="description"
        v-model="description"
      />
      <BaseError v-if="error?.description">{{ error?.description }}</BaseError>
      <BaseInput type="text" placeholder="Github Link" v-model="githubLink" />
      <BaseError v-if="error?.github_link">{{ error?.github_link }} </BaseError>
      <BaseInput type="text" placeholder="Demo Link" v-model="demoLink" />
      <BaseError v-if="error?.demo_link">{{ error?.demo_link }} </BaseError>
      <div>
        <BaseInput
          type="text"
          @keydown.enter.prevent="addTag(tag)"
          placeholder="Tag"
          v-model="tag"
        />
        <BaseError v-if="error?.tags">{{ error?.tags }}</BaseError>
      </div>
      <div v-show="tags.length > 0" class="flex flex-wrap items-center gap-2">
        <div
          v-for="tag in tags"
          :key="tag"
          class="group relative flex items-center justify-center px-4 py-2 rounded-lg bg-[#eaeaea] text-sm font-medium text-gray-700 shadow-sm transition-colors duration-150 hover:bg-slate-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          <span>{{ tag }}</span>

          <!-- Overlay Delete Icon -->
          <div
            @click="onDeleteTag(tag)"
            class="absolute inset-0 flex items-center justify-center rounded-lg cursor-pointer bg-slate-300/80 dark:bg-gray-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          >
            <Icons-XMark
              class="h-7 w-7 text-gray-700 hover:text-red-600 dark:text-gray-100 dark:hover:text-red-400  transition-colors"
            />
          </div>
        </div>
      </div>
      <div>
        <FilesUpload v-model="images_path" />
        <BaseError v-if="error?.images_path">{{
          error?.images_path
        }}</BaseError>
      </div>
      <Button type="submit" :disabled="loading.value">
        <span v-if="!loading.value">{{
          project ? "Save Changes" : "Create"
        }}</span>
        <LoadingDots v-if="loading.value" />
      </Button>
    </form>
  </div>
</template>

<style scoped>
.description {
  --sb-track-color: transparent;
  --sb-thumb-color: #c1c1c1;
  --sb-size: 6px;
}

.description::-webkit-scrollbar {
  width: var(--sb-size);
}

.description::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 6px;
}

.description::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 6px;
  border: 1px solid var(--sb-track-color);
}

@supports not selector(::-webkit-scrollbar) {
  .description {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>
