<script setup>
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
          <slot name="icon"/>
      </TooltipTrigger>
      <TooltipContent>
        <slot name="content"/>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>