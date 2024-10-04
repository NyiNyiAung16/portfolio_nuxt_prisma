<script setup>
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const open = ref(false);

</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger class="font-medium text-blue-600 hover:underline">
      Edit
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogDescription>
          Make changes to your project here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <UserForm :user="user" @close="open = false" />
    </DialogContent>
  </Dialog>
</template>
