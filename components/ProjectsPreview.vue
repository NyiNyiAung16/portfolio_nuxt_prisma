<script setup>

const images = ref([
   "dMr3htq3I0ZLa8Db5VKJsuBFDI2xWiJ5SCHtT50z8GifXGMkex.png",
   "I7S6GSt4EHAREuuohFWDHTngxOIrVYCCkx7skX0jniSvdlk6Mf.png",
   "K3tmcV0pyErp0gpLWNRaxGSLaX31mXhDyhtCJgLwirKsNZ0hyF.png",
   "nHp5r4odarXxc0pIB7aMx4BoYUM8L1UQ9OOfrdUcJNw0aExPUg.png",
   "rQp2nxZ9RrPToLjDRJKEAzpunRmEU58JfwdV8WGvjJ7qogx15A.png",
   "rQp2nxZ9RrPToLjDRJKEAzpunRmEU58JfwdV8WGvjJ7qogx15A.png",
   "wFI5SNjseW7B550KRLniH0ini2kiPGlOUIwn74DWm2BxSAYje8.png",
   "wFI5SNjseW7B550KRLniH0ini2kiPGlOUIwn74DWm2BxSAYje8.png"
])

</script>


<template>
    <div class="block md:block px-6 py-14 dark:bg-gray-800 dark:text-white transition-colors duration-500">
        <div>
            <div class="text-center space-y-3">
                <h2 class="font-bold text-3xl sm:text-4xl md:text-6xl dark:text-white">My Projects</h2>
                <p class="text-md sm:text-xl md:text-3xl dark:text-gray-300">Examples of my projects completed</p>
            </div>
            <div class="mt-10 max-w-[1200px] mx-5 md:mx-auto">
                <Gallery :images="images"/>
            </div>
        </div>
    </div> 
</template>
