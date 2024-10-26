<script setup>
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogScrollContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["onOpen"]);

const localOpen = ref(props.open || false);

watch(
  () => props.open,
  (open) => {
    localOpen.value = open;
  }
);
</script>

<template>
  <Dialog v-model:open="localOpen">
    <DialogTrigger
      class="font-medium text-blue-600 hover:underline"
      @click.once.stop="$emit('onOpen')"
    >
      Edit
    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          Make changes to your project here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <slot />
    </DialogScrollContent>
  </Dialog>
</template>
