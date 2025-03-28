<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue';

import { ElOption, ElSelect } from 'element-plus';
import { isFunction } from 'remeda';

interface OptionsItem {
  label: string;
  value: number;
}

interface ISelectProps {
  api: Function; // 获取下拉框数据接口
  params: {}; // 获取下拉框数据接口参数
  resultField: string; // 接口，返回值字段
  labelField: string; // label 字段
  valueField: string; // value 字段
  modelValue: number; // 父组件传递的 v-model 初始值
  alwaysLoad?: boolean; // 是否一直获取最新数据
}
const props = defineProps<ISelectProps>();
const emit = defineEmits(['init', 'update:modelValue', 'optionsChange']);
// 本地状态：用于代理 props.modelValue
const localValue = ref<number>(props.modelValue ?? '');
const loading = ref(false);
const optionsData = ref<OptionsItem[]>([]);
// 首次是否加载过了
const isFirstLoaded = ref(false);

// 当本地状态改变时，触发父组件的事件，通知外部更新
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue); // 双向绑定事件
});

// 同步父组件传递的值到本地状态
watch(
  () => props.modelValue,
  (newValue) => {
    !unref(isFirstLoaded) && fetch();
    localValue.value = newValue;
  },
);

// 定义 get 方法
function get(obj: any, path: string, defaultValue: any = null): any {
  if (!obj || typeof path !== 'string') return defaultValue;

  const keys = path.split('.'); // 将路径按 . 分割
  let result = obj;

  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key]; // 逐层取值
    } else {
      return defaultValue; // 如果路径不存在，返回默认值
    }
  }

  return result === undefined ? defaultValue : result; // 返回结果或默认值
}
async function fetch() {
  const api = props.api;
  if (!api || !isFunction(api) || loading.value) return;
  optionsData.value = [];
  try {
    loading.value = true;
    const res = await api(props.params);
    isFirstLoaded.value = true;
    if (props.resultField) {
      optionsData.value = get(res, props.resultField) || [];
    }
    emitChange();
  } catch {
    isFirstLoaded.value = false;
  } finally {
    loading.value = false;
  }
}
async function handleFetch(visible: boolean) {
  if (visible) {
    if (props.alwaysLoad) {
      await fetch();
    } else if (!isFirstLoaded.value) {
      await fetch();
    }
  }
}

const getOptions = computed(() => {
  const { labelField, valueField } = props;
  const res: OptionsItem[] = [];
  optionsData.value.forEach((item: any) => {
    const value = item[valueField];
    res.push({
      label: item[labelField],
      value,
    });
  });
  // res.push({
  //   label: '请选择',
  //   value: 0,
  // });
  return res;
});

function emitChange() {
  emit('optionsChange', unref(getOptions));
}
</script>

<template>
  <div class="w-full">
    <ElSelect v-model="localValue" @visible-change="handleFetch">
      <ElOption
        v-for="item in getOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </div>
</template>
