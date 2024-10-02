<script setup>

defineProps({
    comment: {
        type: Object,
        required: true
    }
});

</script>


<template>
    <div class="max-w-lg w-full mx-auto bg-[#eaeaea] px-6 py-4 rounded-md shadow-sm">
        <div class="flex items-center justify-between">
            <h1 class="text-lg font-bold">{{ comment.user.username }}</h1>
            <span class="text-sm text-[#808080]">{{ new Date(comment.createdAt).toLocaleDateString() }}</span>
        </div>
        <p class="font-medium mt-3">{{ comment.content }}</p>
    </div>
</template>
