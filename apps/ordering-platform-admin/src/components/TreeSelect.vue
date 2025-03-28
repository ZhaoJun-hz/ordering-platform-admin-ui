<script setup lang="ts">
import { ref, unref, watch } from 'vue';

import { ElTreeSelect } from 'element-plus';
import { isFunction } from 'remeda';

interface OptionsItem {
  label: string;
  value: number;
  children?: OptionsItem[];
}

interface ITreeSelectProps {
  api: Function; // 获取树形数据接口
  params: {}; // 获取树形数据接口参数
  // defaultProps: Record<string, any>; // 树节点配置项
  resultField: string; // 接口返回值字段
  labelField: string; // label 字段
  valueField: string; // value 字段
  modelValue: null | number | number[]; // 父组件传递的 v-model 初始值
  multiple?: boolean; // 是否多选
  showCheckbox?: boolean; // 是否显示复选框
  accordion?: boolean; // 是否每次只打开一个同级树节点展开
  // valueKey: string; // 节点唯一标识字段
  expandOnClickNode: boolean; // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
  appendData?: OptionsItem; // 追加到树形数据中的一条数据
}

const props = defineProps<ITreeSelectProps>();
const emit = defineEmits(['init', 'update:modelValue', 'optionsChange']);
const selectValue = ref<null | number | number[]>(props.modelValue ?? null);
const loading = ref(false);
const treeData = ref<OptionsItem[]>(props.appendData ? [props.appendData] : []);
const isFirstLoaded = ref(false);

// 获取接口数据
async function fetch() {
  const api = props.api;
  if (!api || !isFunction(api) || loading.value) return;
  try {
    loading.value = true;
    const res = await api(props.params);
    isFirstLoaded.value = true;
    let data = transformTreeData(res);

    // 如果有追加数据，则追加到树形数据中
    if (props.appendData) {
      data = [...data, props.appendData];
    }
    treeData.value = data;
    emitChange();
  } catch (error) {
    console.error('Error fetching tree data:', error);
    treeData.value = [];
  } finally {
    loading.value = false;
  }
}

// 数据转换方法
function transformTreeData(data: any): OptionsItem[] {
  const { resultField, labelField, valueField } = props;
  const rawData = get(data, resultField, []);
  return rawData.map((item: any) => ({
    label: item[labelField],
    value: item[valueField],
    children: item.children
      ? transformTreeData({ [resultField]: item.children })
      : undefined,
  }));
}

// 深度获取对象属性
function get(obj: any, path: string, defaultValue: any = null): any {
  if (!obj || typeof path !== 'string') return defaultValue;

  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result === undefined ? defaultValue : result;
}

// 当 `selectValue` 改变时，触发 `update:modelValue` 事件
watch(selectValue, (newValue) => {
  emit('update:modelValue', newValue);
});

// 同步父组件传递的 `modelValue` 到本地状态
watch(
  () => props.modelValue,
  (newValue) => {
    !unref(isFirstLoaded) && fetch();
    selectValue.value = newValue;
  },
);

// 触发外部事件，通知数据变更
function emitChange() {
  emit('optionsChange', treeData.value);
}

async function handleFetch(visible: boolean) {
  if (visible && !isFirstLoaded.value) {
    await fetch();
  }
}
</script>

<template>
  <div class="w-full">
    <ElTreeSelect
      v-model="selectValue"
      :accordion="props.accordion"
      :check-strictly="true"
      :data="treeData"
      :expand-on-click-node="props.expandOnClickNode"
      :loading="loading"
      :multiple="props.multiple"
      :show-checkbox="props.showCheckbox"
      value-key="value"
      @visible-change="handleFetch"
    />
  </div>
</template>

<style scoped lang="scss"></style>
