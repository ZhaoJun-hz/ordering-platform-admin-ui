<script setup lang="ts">
import { onMounted } from 'vue';

import { ElTreeSelect } from 'element-plus';

interface ITreeSelectProps {
  date: {}[];
}
const props = defineProps<ITreeSelectProps>();
const emit = defineEmits(['onInit']);
const selectValue = defineModel<number>('selectValue');
onMounted(() => {
  emit('onInit', selectValue.value);
});
</script>
<template>
  <div class="w-full">
    <ElTreeSelect
      v-model="selectValue"
      :data="props.date"
      accordion
      check-strictly
    />
  </div>
</template>
<style scoped lang="scss"></style>
