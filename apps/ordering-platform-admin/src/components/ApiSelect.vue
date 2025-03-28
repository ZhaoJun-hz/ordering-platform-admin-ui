<script setup lang="ts">
import { onMounted } from 'vue';

import { ElTransfer } from 'element-plus';

interface Option {
  key: number;
  label: string;
}
interface IApiSelectProps {
  data: Option[];
  selected?: number[];
  titles: [string, string];
  buttonTexts: [string, string];
  filterable?: boolean;
}
const props = defineProps<IApiSelectProps>();
const emit = defineEmits(['onInit']);
const selectValues = defineModel<number[]>('selectValues');
onMounted(() => {
  emit('onInit', selectValues.value);
});
</script>
<template>
  <div class="w-full">
    <ElTransfer
      v-model="selectValues"
      :button-texts="props.buttonTexts"
      :data="props.data"
      :filterable="props.filterable"
      :right-default-checked="props.selected"
      :titles="props.titles"
    />
  </div>
</template>
<style scoped lang="scss"></style>
