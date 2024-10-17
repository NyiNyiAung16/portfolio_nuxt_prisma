<script setup>
const expertises = ref([
  {
    id: 1,
    title: "Web Development",
    content: "Creating dynamic and responsive websites for any business needs.",
  },
  {
    id: 2,
    title: "Database Management",
    content:
      "Efficiently managing and organizing data for smooth workflow and analysis.",
  },
  {
    id: 3,
    title: "UI/UX Design",
    content:
      "Creating visually appealing and user-friendly interfaces for websites and apps.",
  },
  {
    id: 4,
    title: "Mobile App Development",
    content:
      "Designing and developing user-friendly mobile applications for iOS and Android.",
  },
]);
</script>

<template>
  <div
    class="bg-white dark:bg-[#1A202C] px-3 py-14"
    id="expertise"
  >
    <div class="text-center space-y-3">
      <h2
        class="font-bold text-3xl sm:text-5xl md:text-6xl text-black dark:text-white"
      >
        My Expertise
      </h2>
      <p class="text-md sm:text-2xl md:text-3xl text-black dark:text-white">
        I have expertise in software development and coding.
      </p>
    </div>
    <div
      class="mt-12 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 mx-auto"
    >
      <div
        v-for="expertise in expertises"
        :key="expertise.id"
        class="p-5"
      >
        <div class="flex sm:flex-row justify-start gap-x-5">
          <div
            class="inline-block w-max text-white dark:text-black h-fit bg-black dark:bg-white px-4 py-2 rounded-md"
          >
            {{ expertise.id }}
          </div>
          <div class="flex flex-col gap-y-2">
            <h3
              class="font-bold text-2xl md:text-3xl text-black dark:text-white"
            >
              {{ expertise.title }}
            </h3>
            <p
              class="text-[#929292] md:text-lg font-light text-black dark:text-white"
            >
              {{ expertise.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
