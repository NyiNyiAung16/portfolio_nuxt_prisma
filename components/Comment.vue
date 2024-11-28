<script setup>
import { formatDistanceToNow } from "date-fns";

defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["deleteComment", "updateComment"]);

const commentsStore = useCommentsStore();
const { error } = storeToRefs(commentsStore);

const auth = useAuth();
const { user } = storeToRefs(auth);

const active = ref(false);
const content = ref("");

const openEditInput = (comment) => {
  content.value = comment.content;
  active.value = !active.value;
};

const onKeydown = () => {
  emits("updateComment", content.value);
  active.value = false;
};

</script>

<template>
  <div
    class="w-full mx-auto bg-[#eaeaea] dark:bg-gray-600 px-6 py-4 rounded-md shadow-sm"
  >
    <div class="flex items-start justify-between">
      <div class="flex flex-col">
        <h1 class="text-lg font-bold dark:text-white">{{ comment.user.username }}</h1>
        <span class="text-sm text-[#808080] dark:text-gray-400">{{
          formatDistanceToNow(new Date(comment.createdAt), {
            includeSeconds: true,
          })
        }}</span>
      </div>
      <div>
        <div
          class="flex items-center justify-end gap-x-2"
          v-if="user?.id === comment.user.id"
        >
          <FontAwesome
            icon="pen"
            class="text-blue-500 hover:text-blue-600 duration-150 cursor-pointer"
            @click.stop="openEditInput(comment)"
          />
          <CheckSure @on-delete="$emit('deleteComment', comment.id)" description="you want to delete this comment?">
            <FontAwesome
              icon="trash"
              class="text-red-500 hover:text-red-600 duration-150 cursor-pointer"
            />
          </CheckSure>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <p class="font-medium dark:text-white" v-if="!active">{{ comment.content }}</p>
      <input
        type="text"
        class="w-full bg-inherit dark:bg-gray-700 dark:text-white px-3 py-2 border border-[#808080] dark:border-gray-500 rounded-sm outline-none"
        autofocus
        v-if="active"
        v-model="content"
        @keydown.enter="onKeydown"
        @blur="active = false"
      />
      <BaseError v-if="error?.content && active">{{
        error?.content
      }}</BaseError>
    </div>
  </div>
</template>
