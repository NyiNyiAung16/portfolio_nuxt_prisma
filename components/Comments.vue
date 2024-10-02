<script setup>
const id = useRoute().params.id;

const commentsStore = useCommentsStore();
const { loading, comments } = storeToRefs(commentsStore);

onMounted(async () => {
    await commentsStore.get(id);
})


</script>


<template>
    <div>
        <div v-if="loading">
            <Loading class="mx-auto"/>
        </div>
        <div v-if="comments && comments.length > 0 && !loading" class="space-y-4">
            <div v-for="comment in comments" :key="comment.id">
                <Comment :comment="comment"/>
            </div>
        </div>
    </div>
</template>

