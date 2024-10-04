<script setup>
const id = useRoute().params.id;

const commentsStore = useCommentsStore();
const { loading, comments } = storeToRefs(commentsStore);

onMounted(async () => {
    await commentsStore.get(id);
    console.log(comments.value)
})


const deleteComment = async (commentId) => {
   let response = await commentsStore.destroy(id,commentId);
   if(response) {
    let deletedComment = comments.value.filter((comment) => comment.id !== commentId);
    comments.value = deletedComment;
   }
}


const updateComment = async (commentId,data) => {
   let response = await commentsStore.update(commentId,data);
   if(response) {
    comments.value = comments.value.map((comment) => comment.id === commentId ? {...comment, content: data.content} : comment);
   }
}
</script>

<template>
  <div>
    <div v-if="loading && comments?.length === 0">
      <Loading class="mx-auto" />
    </div>
    <div v-if="comments && comments.length > 0" class="space-y-4">
      <div v-for="comment in comments" :key="comment.id">
        <Comment
          :comment="comment"
          @deleteComment="deleteComment(comment.id)"
          @updateComment="
            ($event) =>
              updateComment(comment.id,{
                content: $event,
                userId : comment.user.id,
                projectId: id,
              })
          "
        />
      </div>
    </div>
  </div>
</template>
