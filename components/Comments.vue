<script setup lang="ts">
import { setToast } from '~/componsables/toastHelper';
import type { FormData } from '~/types/Comment';

const id = useRoute().params.id as string;

const commentsStore = useCommentsStore();
const { loading, comments } = storeToRefs(commentsStore);

onMounted(async () => {
  await commentsStore.get(id);
});

const deleteComment = async (commentId: string) => {
  try {
    await commentsStore.destroy(commentId);
  } catch (error: any) {
    setToast({ title: error.message });
  }
};

const updateComment = async (commentId: string, data: FormData) => {
  try {
    await commentsStore.update(commentId, data);
  } catch (error: any) {
    setToast({ title: error.message });
  }
};
</script>

<template>
  <div>
    <div
      v-if="
        loading.value && (loading.type === 'get' || loading.type === 'update')
      "
    >
      <LoadingDots class="my-2" />
    </div>
    <div v-if="comments && comments.length > 0" class="space-y-4">
      <div v-for="comment in comments" :key="comment.id">
        <Comment
          :comment="comment"
          @deleteComment="deleteComment(comment.id)"
          @updateComment="
            ($event) =>
              updateComment(comment.id, {
                content: $event,
                userId: comment.user.id,
                projectId: id,
              })
          "
        />
      </div>
    </div>
  </div>
</template>
