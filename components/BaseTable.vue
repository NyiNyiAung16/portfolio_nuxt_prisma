<!-- <template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <slot name="header"/>
            <slot name="body"/>
        </table>
    </div>

</template> -->

<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

defineProps({
  caption: String,
});
</script>

<template>
  <Table class="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <TableCaption class="dark:text-gray-300">{{ caption }}</TableCaption>
    <TableHeader>
      <TableRow>
        <slot name="header" />
      </TableRow>
    </TableHeader>
    <TableBody>
      <slot name="body" />
    </TableBody>
  </Table>
</template>
