<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { ElTree } from 'element-plus';

interface ITreeProps {
  checkStrictly?: boolean;
  data: {}[];
  defaultProps: Record<string, any>;
  defaultCheckedKeys?: number[];
  showCheckbox?: boolean;
  modelValue?: number | number[];
  multiple?: boolean;
  nodeKey?: string;
  expandOnClickNode: boolean;
}
const props = defineProps<ITreeProps>();
const emit = defineEmits(['init', 'update:modelValue']);

const treeRef = ref<InstanceType<typeof ElTree> | null>(null);
const selectValue = ref<number | number[]>(
  props.multiple
    ? ((props.modelValue as number[]) ?? [])
    : (props.modelValue ?? null),
);

// 监听勾选变化
const onCheckChange = () => {
  if (treeRef.value) {
    const checkedKeys = treeRef.value.getCheckedKeys() as number[];
    // 当 checkStrictly 为 true，忽略半选节点
    const newValue = props.checkStrictly
      ? checkedKeys
      : [...checkedKeys, ...(treeRef.value.getHalfCheckedKeys() as number[])];

    selectValue.value = props.multiple ? newValue : (newValue[0] ?? null);
  }
};

// 点击节点事件处理（若需要）
const onNodeClick = (node: any) => {
  const nodeKey = props.nodeKey ?? 'id';
  const value = node[nodeKey];
  if (value === undefined) return;

  if (props.showCheckbox) {
    // 如果显示复选框，点击节点时不直接改变选中值，由复选框处理
    return;
  }
  // 非复选框模式下的处理
  selectValue.value = props.multiple ? [value] : value;
};

// 同步父组件值
watch(selectValue, (newVal) => {
  emit('update:modelValue', newVal);
});

// 父组件传入的 modelValue 变化时更新树状态
watch(
  () => props.modelValue,
  (newVal) => {
    if (treeRef.value) {
      const keys = Array.isArray(newVal) ? newVal : [newVal].filter(Boolean);
      treeRef.value.setCheckedKeys(keys);
    }
  },
);

onMounted(() => {
  // 初始化设置默认选中
  if (props.defaultCheckedKeys && treeRef.value) {
    treeRef.value.setCheckedKeys(props.defaultCheckedKeys);
  }
  emit('init', selectValue.value);
});
</script>

<template>
  <div class="w-full">
    <ElTree
      ref="treeRef"
      :check-strictly="props.checkStrictly"
      :data="props.data"
      :default-checked-keys="props.defaultCheckedKeys"
      :expand-on-click-node="props.expandOnClickNode"
      :highlight-current="true"
      :multiple="props.multiple"
      :node-key="props.nodeKey"
      :props="props.defaultProps"
      :show-checkbox="props.showCheckbox"
      @check-change="onCheckChange"
      @node-click="onNodeClick"
    />
  </div>
</template>
