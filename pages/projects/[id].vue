<script setup>

const { id } = useRoute().params;

const project = ref(
    {
        id:6,
        title: 'Ecommerce Website',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image_path: '/photos/6.jpg',
        tags: ['CSS','Tailwind','React', 'Nuxt']
    }
)

</script>


<template>
    <div class="mt-10 pb-10">
        <div class="w-[80%] bg-[#eaeaea] rounded mx-auto pb-10">
            <Gallery :is-cover-flow="false"/>
            <div class="mt-7 px-6">
                <div class="space-y-1 mt-3">
                    <h2 class="font-bold text-2xl">{{ project.title }}</h2>
                    <p class="font-light">{{ project.description }}</p>
                </div>
                <div class="mt-3">
                    <span class="font-medium">Youtube Link</span> - <NuxtLink href="/" class="underline">'http://kdkdkdk'</NuxtLink>
                </div>
                <div class="flex items-center gap-3 mt-4 text-sm">
                    <div v-for="tag in project.tags" :key="tag" class="inline-block px-3 py-2 rounded-md bg-[#fff] select-none">
                        {{ tag }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

