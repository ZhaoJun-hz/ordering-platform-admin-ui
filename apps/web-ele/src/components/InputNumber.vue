<script setup lang="ts">
import { onMounted } from 'vue';

import { ElInputNumber } from 'element-plus';

const emit = defineEmits(['onInit']);
const inputNumber = defineModel<number>('inputNumber');
onMounted(() => {
  emit('onInit', inputNumber.value);
});
</script>

<template>
  <ElInputNumber v-model="inputNumber" controls-position="right">
    <template #decrease-icon>
      <span class="icon-[ep--arrow-down]"></span>
    </template>
    <template #increase-icon>
      <span class="icon-[ep--arrow-up]"></span>
    </template>
  </ElInputNumber>
</template>
