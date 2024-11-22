<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { ElTreeSelect } from 'element-plus';

interface ITreeSelectProps {
  data: {}[]; // 树形数据
  defaultProps: Record<string, any>; // 树节点配置项
  multiple?: boolean; // 是否多选
  showCheckbox?: boolean; // 是否显示复选框
  accordion?: boolean; // 是否每次只打开一个同级树节点展开
  modelValue?: null | number | number[]; // 父组件传递的 v-model 初始值
  valueKey: string;
}
const props = defineProps<ITreeSelectProps>();
const emit = defineEmits(['init', 'update:modelValue']);
const selectValue = ref<null | number | number[]>(props.modelValue ?? null);
onMounted(() => {
  emit('init', selectValue.value);
});
// 监听 `selectValue` 的变化，触发 `update:modelValue` 事件
watch(selectValue, (newValue) => {
  emit('update:modelValue', newValue); // 双向绑定事件
});
</script>
<template>
  <div class="w-full">
    <ElTreeSelect
      v-model="selectValue"
      :accordion="props.accordion"
      :data="props.data"
      :multiple="props.multiple"
      :props="props.defaultProps"
      :show-checkbox="props.showCheckbox"
      :value-key="props.valueKey"
    />
  </div>
</template>
<style scoped lang="scss"></style>
