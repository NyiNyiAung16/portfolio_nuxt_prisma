<script setup>
const props = defineProps({
  images: {
    type: Array,
  },
});

const emits = defineEmits(["update:images"]);

const onChange = (e) => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;

  const newImages = files.map((file, index) => ({
    public_id: index,
    secure_url: URL.createObjectURL(file),
    file,
  }));

  emits("update:images", [...props.images, ...newImages]);
};

const onDeleteImage = async (id) => {
  const updatedImages = props.images.filter((img) => img.public_id !== id);
  emits("update:images", updatedImages);
};
</script>

<template>
  <div>
    <label
      for="files"
      class="w-full block text-center px-3 py-2 bg-[#eaeaea] dark:bg-gray-700 rounded-md text-[#929292] cursor-pointer"
    >
      <span>Upload Images</span>
    </label>
    <input
      type="file"
      id="files"
      multiple
      accept=".jpg, .jpeg, .png"
      @change="onChange"
      class="hidden"
    />
  </div>
  <div v-if="images.length > 0" class="flex flex-wrap items-center gap-2 mt-2">
    <div
      v-for="image in images"
      :key="image.public_id"
      class="group relative flex items-center justify-center px-4 py-2 rounded-lg bg-[#eaeaea] text-sm font-medium text-gray-700 shadow-sm transition-colors duration-150 hover:bg-slate-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
      <img
      :src="image.secure_url"
        alt="Preview"
        class="w-[100px] h-[100px] object-cover rounded-md mr-2 mt-2"
      />
       <!-- Overlay Delete Icon -->
          <div
            @click="onDeleteImage(image.public_id)"
            class="absolute inset-0 flex items-center justify-center rounded-lg cursor-pointer bg-slate-300/80 dark:bg-gray-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          >
            <Icons-XMark
              class="h-7 w-7 text-gray-700 hover:text-red-600 dark:text-gray-100 dark:hover:text-red-400  transition-colors"
            />
          </div>
    </div>
  </div>
</template>
