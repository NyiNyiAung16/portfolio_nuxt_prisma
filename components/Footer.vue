<script setup>
const latestYear = new Date().getFullYear();

</script>


<template>
    <div class="flex flex-col items-center justify-center gap-y-10 pt-[100px] pb-[50px]" id="footer">
        <div class="flex flex-col items-center gap-y-5">
            <h1 class="text-7xl font-bold">Nyi Nyi Aung</h1>
            <ul class="flex gap-x-4 items-center">
                <li>Facebook</li>
                <li>Github</li>
                <li>Linkedin</li>
                <li>Contact</li>
            </ul>
        </div>
        <div class="flex flex-col items-center gap-y-2">
            <p>&copy; {{ latestYear }} All rights reserved.</p>
            <p> Terms and Privacy</p>
        </div>
    </div>
</template>

