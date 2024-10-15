<script setup>
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "./Loading.vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  description: {
    type:String,
    default: 'you want to delete the data?'
  },
  loading:Object
});

const emits = defineEmits(['onDelete']);
const localOpen = ref(props.open || false);

const onClick = () => {
  emits('onDelete');
}

</script>

<template>
  <Dialog v-model:open="localOpen">
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
      <Button class="bg-red-700 hover:bg-red-800 text-white" @click.once.stop="onClick">
        <span v-if="!loading?.value && loading?.type !== 'delete'">Delete</span>
        <Loading v-if="loading?.value && loading?.type === 'delete'"/>
      </Button>
      <Button class="bg-gray-700" @click.once.stop="localOpen = false">Cancel</Button>
    </DialogContent>
  </Dialog>
</template>


