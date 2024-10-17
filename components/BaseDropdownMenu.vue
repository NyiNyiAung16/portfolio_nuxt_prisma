<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot name="icon"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="dark:bg-popover-dark dark:text-popover-foreground-dark ml-1 space-y-1">
        <slot name="content"/>
    </DropdownMenuContent>
  </DropdownMenu>
</template>