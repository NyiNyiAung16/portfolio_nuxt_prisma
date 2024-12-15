<script setup>

const images = ref([
   "jz7kqgwtlr0uqa2njgav",
   "ykgcjk54jmqk7kjlxu8z",
   "o0p4oelflphczgd20zah",
   "txi1vlq7cipxpcivcsqj",
   "mlhltupuukxfizgqnmpy",
   "u1hgqxvefylsmxdgujqc",
   "xs1gblqtxngiif9pjzuq",
   "dgyhzefraaxgu2dkfzel"
])

</script>


<template>
    <section class="block md:block px-6 py-14 dark:bg-gray-800 dark:text-white transition-colors duration-500">
        <div>
            <div class="text-center space-y-3">
                <h2 class="font-bold text-3xl sm:text-4xl md:text-6xl dark:text-white">My Projects</h2>
                <p class="text-md sm:text-xl md:text-3xl dark:text-gray-300">Examples of my projects completed</p>
            </div>
            <div class="mt-10 max-w-[1200px] mx-5 md:mx-auto">
                <Gallery :images="images"/>
            </div>
        </div>
    </section> 
</template>
