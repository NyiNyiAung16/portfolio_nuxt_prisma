<script setup>

const auth = useAuth();
const { user } = storeToRefs(auth);

</script>


<template>
    <div class="flex items-center justify-between px-4 py-3 mb-7">
        <div>
            <NuxtLink href="/" title="Home">
                <FontAwesome icon="house-chimney" class="text-2xl text-gray-700 hover:text-gray-800 duration-100"/>
            </NuxtLink>
        </div>
        <div>
            <p>
                <span>{{ user.username }}</span> /
                <span>{{ user.email }}</span>
            </p>
        </div>
    </div>
</template>

