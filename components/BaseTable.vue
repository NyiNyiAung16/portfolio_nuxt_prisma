<script setup>

</script>


<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <slot name="header"/>
            <slot name="body"/>
        </table>
    </div>

</template>
