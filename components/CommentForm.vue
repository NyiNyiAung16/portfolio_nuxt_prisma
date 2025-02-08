<script setup>
import { setToast } from "~/componsables/toastHelper";
import { z } from "zod";
import commentSchema from "~/validations/commentValidation";
import { zodErrorsToObject } from "~/componsables/zodErrorsHelper";

const { projectId } = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const auth = useAuth();
const { user } = storeToRefs(auth);

const content = ref("");
const active = ref(false);

const commentsStore = useCommentsStore();
const { loading, error } = storeToRefs(commentsStore);

const onSubmit = async () => {
  if (!user.value) return navigateTo("/login", { replace: true });

  const data = {
    content: content.value,
    userId: user.value.id,
    projectId,
  };

  try {
    const result = commentSchema.parse(data);
    await commentsStore.create(result);

    content.value = "";
  } catch (e) {
    if (e instanceof z.ZodError) {
      error.value = zodErrorsToObject(e.errors);
      setTimeout(() => error.value = null, 1500);
    } else if (e instanceof Error) {
      setToast({ title: e.message });
    }
  }
};
</script>

<template>
  <div class="darkMode dark:text-white transition-colors duration-500">
    <div class="w-full mx-auto mt-6 mb-4">
      <Button
        class="text-lg font-medium space-x-1 px-3 py-2"
        @click="active = !active"
      >
        <span>Comment Form </span>
        <FontAwesome icon="arrow-up" v-show="active" />
        <FontAwesome icon="arrow-down" v-show="!active" />
      </Button>
      <form class="space-y-1 mt-5" @submit.prevent="onSubmit" v-show="active">
        <BaseTextarea v-model="content" placeholder="Write your thougth.." />
        <BaseError v-if="error?.content">{{ error?.content }}</BaseError>
        <Button
          type="submit"
          :disabled="loading.value && loading.type === 'create'"
        >
          <span v-if="!loading.value || loading.type != 'create'">Create</span>
          <Loading v-if="loading.value && loading.type === 'create'" />
        </Button>
      </form>
    </div>
  </div>
</template>
