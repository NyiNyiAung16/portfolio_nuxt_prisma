<script setup>
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const emits = defineEmits(['onDelete']);


const open = ref(false);

const onClick = () => {
    emits('onDelete');
    open.value = false;
}

</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger class="font-medium text-red-600 hover:underline">
      Delete
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure!</DialogTitle>
        <DialogDescription>
          you want to delete the data?
        </DialogDescription>
      </DialogHeader>
      <Button class="bg-red-700 hover:bg-red-800 text-white" @click="onClick">Delete</Button>
      <Button class="bg-gray-700" @click="open = false">Cancel</Button>
    </DialogContent>
  </Dialog>
</template>


