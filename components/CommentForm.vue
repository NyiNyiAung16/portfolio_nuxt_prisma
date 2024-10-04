<script setup>
const { projectId } = defineProps({
    projectId: {
        type: String,
        required: true
    }
})


const auth = useAuth();
const { user } = storeToRefs(auth);

const content = ref("");
const active = ref(false);

const commentsStore = useCommentsStore();
const { loading, error, comments } = storeToRefs(commentsStore);

const onSubmit = async () => {
    const data = {
        content: content.value,
        userId: user.value.id,
        projectId: projectId
    }
    await commentsStore.create(data);
}

</script>

<template>
  <div>
    <div class="max-w-lg w-full mx-auto mt-6 p-5">
      <button
        class="bg-black text-white cursor-pointer text-lg font-medium rounded-md px-3 py-2 hover:bg-opacity-80 active:bg-opacity-100 duration-150"
        @click="active = !active"
      >
        Comment Form 
        <FontAwesome icon="arrow-up" v-show="active"/>
        <FontAwesome icon="arrow-down" v-show="!active"/>
      </button>
      <form class="space-y-2 mt-5" @submit.prevent="onSubmit" v-show="active">
        <BaseTextarea v-model="content" placeholder="Write your comment" />
        <BaseError v-if="error?.content">{{ error?.content }}</BaseError>
        <BaseButton type="submit" class-name="text-sm" :disabled="loading">
          <span v-if="!loading">Create</span>
          <Loading v-if="loading" />
        </BaseButton>
      </form>
    </div>
  </div>
</template>
