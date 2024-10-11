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
  description: {
    type:String,
    default: 'you want to delete the data?'
  }
})

const emits = defineEmits(['onDelete']);

const open = ref(false);

const onClick = () => {
    emits('onDelete');
    open.value = false;
}

</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <slot/>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure!</DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <Button class="bg-red-700 hover:bg-red-800 text-white" @click.once.stop="onClick">Delete</Button>
      <Button class="bg-gray-700" @click.once.stop="open = false">Cancel</Button>
    </DialogContent>
  </Dialog>
</template>


