<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { ElTree } from 'element-plus';

interface ITreeProps {
  data: {}[]; // 树形数据
  defaultProps: Record<string, any>; // 树节点配置项
  defaultCheckedKeys?: number[]; // 默认选中的节点
  showCheckbox?: boolean; // 节点是否可被选择
  modelValue?: number | number[]; // 父组件传递的 v-model 初始值
  multiple?: boolean; // 是否多选
  nodeKey?: string;
  expandOnClickNode: boolean; // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
}
const props = defineProps<ITreeProps>();
const emit = defineEmits(['init', 'update:modelValue']);

// 绑定 ElTree 的实例
const treeRef = ref<InstanceType<typeof ElTree> | null>(null);

const selectValue = ref<null | number | number[]>(props.modelValue ?? null);

// 监听节点勾选状态变化
const onCheckChange = () => {
  // 获取 ElTree 中的所有选中 key
  if (treeRef.value) {
    const checkedKeys = treeRef.value.getCheckedKeys() as number[]; // 调用 getCheckedKeys 方法
    const halfCheckedKeys = treeRef.value.getHalfCheckedKeys() as number[];
    selectValue.value = [...checkedKeys, ...halfCheckedKeys];
  }
};

// 监听节点点击事件
const onNodeClick = (node: any) => {
  const nodeKey = props.nodeKey ?? 'id'; // 如果 nodeKey 未定义，使用默认值 "id"
  const value = node[nodeKey];
  if (value === undefined) return; // 如果值为 undefined，直接返回

  selectValue.value = props.multiple ? [value] : value;
};

// 监听 `selectValue` 的变化，触发 `update:modelValue` 事件
watch(selectValue, (newValue) => {
  emit('update:modelValue', newValue); // 双向绑定事件
});

onMounted(() => {
  emit('init', selectValue.value);
});
</script>

<template>
  <div class="w-full">
    <ElTree
      ref="treeRef"
      v-model="selectValue"
      :data="props.data"
      :default-checked-keys="props.defaultCheckedKeys"
      :expand-on-click-node="props.expandOnClickNode"
      :multiple="props.multiple"
      :node-key="props.nodeKey"
      :props="props.defaultProps"
      :show-checkbox="props.showCheckbox"
      @check-change="onCheckChange"
      @node-click="onNodeClick"
    />
  </div>
</template>
