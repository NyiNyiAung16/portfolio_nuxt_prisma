<script setup>
import { formatDistanceToNow } from 'date-fns'

defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["deleteComment","updateComment"]);

const commentsStore = useCommentsStore();
const { error } = storeToRefs(commentsStore);


const active = ref(false);
const content = ref('');

const openEditInput = (comment) => {
    content.value = comment.content;
    active.value = !active.value;
}

const onKeydown = () => {
    emits('updateComment',content.value);
    active.value = false;
}

</script>

<template>
  <div
    class="max-w-lg w-full mx-auto bg-[#eaeaea] px-6 py-4 rounded-md shadow-sm"
  >
    <div class="flex items-start justify-between">
      <h1 class="text-lg font-bold">{{ comment.user.username }}</h1>
      <div>
        <span class="text-sm text-[#808080]">{{
          formatDistanceToNow(new Date(comment.createdAt),{
            includeSeconds:true
          })
        }}</span>
        <div class="flex items-center justify-end gap-x-3 pt-1">
          <FontAwesome
            icon="pen"
            class="text-blue-500 hover:text-blue-600 duration-150 cursor-pointer"
            @click="openEditInput(comment)"
          />
          <FontAwesome
            icon="trash"
            class="text-red-500 hover:text-red-600 duration-150 cursor-pointer"
            @click="$emit('deleteComment', comment.id)"
          />
        </div>
      </div>
    </div>
    <div class="mt-3">
        <p class="font-medium" v-if="!active">{{ comment.content }}</p>
        <input type="text" class="w-full bg-inherit px-3 py-2 border border-[#808080] rounded-sm outline-none" autofocus v-if="active" v-model="content" @keydown.enter="onKeydown">
        <BaseError v-if="error?.content">{{ error?.content }}</BaseError>
    </div>
  </div>
</template>
