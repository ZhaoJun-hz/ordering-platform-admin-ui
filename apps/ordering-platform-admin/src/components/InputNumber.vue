<script setup lang="ts">
import { ElInputNumber } from 'element-plus';

const modelValue = defineModel<number>({
  required: true,
  default: 10,
});
</script>

<template>
  <ElInputNumber v-model="modelValue" controls-position="right">
    <template #decrease-icon>
      <span class="icon-[ep--arrow-down]"></span>
    </template>
    <template #increase-icon>
      <span class="icon-[ep--arrow-up]"></span>
    </template>
  </ElInputNumber>
</template>
