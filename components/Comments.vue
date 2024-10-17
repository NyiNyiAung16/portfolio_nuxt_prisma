<script setup>
const id = useRoute().params.id;

const commentsStore = useCommentsStore();
const { loading, comments } = storeToRefs(commentsStore);

onMounted(async () => {
  await commentsStore.get(id);
});

const deleteComment = async (commentId) => {
  try {
    await commentsStore.destroy(commentId);
  } catch (error) {
    setToast({ title: error.message });
  }
};

const updateComment = async (commentId, data) => {
  try {
    await commentsStore.update(commentId, data);
  } catch (error) {
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
      <Loading class="my-2" />
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
