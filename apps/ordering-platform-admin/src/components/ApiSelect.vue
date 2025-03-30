<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { ElTransfer } from 'element-plus';
import { isFunction } from 'remeda';

interface Option {
  key: number;
  label: string;
}
interface IApiSelectProps {
  api: (params: any) => Promise<any>; // 数据获取接口
  params: Record<string, any>; // 接口参数
  selected?: number[];
  titles: [string, string];
  buttonTexts: [string, string];
  filterable?: boolean;
  resultField: string; // 接口返回数据字段路径
  valueField: string; // value字段名
  labelField: string; // label字段名
}
const props = withDefaults(defineProps<IApiSelectProps>(), {
  selected: () => [],
  filterable: false,
});
const modelValue = defineModel<number[]>({ required: true, default: [] });
const loading = ref(false);
const transferData = ref<Option[]>([]);

// 数据转换方法
const transformData = (data: any[]): Option[] => {
  return data.map((item) => ({
    key: item[props.valueField],
    label: item[props.labelField],
  }));
};

// 获取接口数据
const fetchData = async () => {
  if (!props.api || !isFunction(props.api)) return;

  try {
    loading.value = true;
    // 使用 for...of 替代 reduce
    let current: any = await props.api(props.params);
    for (const field of props.resultField.split('.')) {
      current = current?.[field];
      if (current === undefined) break;
    }
    const rawData = current || [];

    transferData.value = transformData(rawData);
  } catch (error) {
    console.error('数据获取失败:', error);
    transferData.value = [];
  } finally {
    loading.value = false;
  }
};
// 监听参数变化自动刷新
watch(() => props.params, fetchData, { deep: true });

// 初始化加载
onMounted(fetchData);
</script>
<template>
  <div class="w-full">
    <ElTransfer
      v-model="modelValue"
      :button-texts="props.buttonTexts"
      :data="transferData"
      :filterable="props.filterable"
      :right-default-checked="props.selected"
      :titles="props.titles"
    />
  </div>
</template>
<style scoped lang="scss"></style>
