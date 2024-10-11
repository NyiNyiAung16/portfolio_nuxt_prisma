<script setup>


</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 pb-10 mt-7">
    <div
      v-for="n in 6"
      :key="n"
      class=" bg-[#eaeaea] rounded"
    >
      <div class="w-full h-[250px]">
        <Skeleton class="w-full h-full object-cover rounded-t bg-[#b8b8b8]"/>
      </div>
      <div class="px-3 pt-2 pb-4 space-y-1 mt-3">
        <Skeleton class="w-full h-6 bg-[#b8b8b8]"/>
        <Skeleton class="w-full h-4 bg-[#b8b8b8]"/>
      </div>
    </div>
  </div>
</template>
