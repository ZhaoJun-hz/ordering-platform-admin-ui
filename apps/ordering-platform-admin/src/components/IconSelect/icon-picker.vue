<script lang="ts" setup>
import { computed, ref } from 'vue';

import { IconPicker } from '@vben/common-ui';
import { listIcons } from '@vben/icons';

import { ElInput } from 'element-plus';

import iconsData from './icons.data';

export interface Props {
  allowClear?: boolean;
  pageSize?: number;
  /**
   * 可以通过prefix获取系统中使用的图标集
   */
  prefix?: string;
  readonly?: boolean;
  value?: string;
  width?: string;
}

// Don't inherit FormItem disabled、placeholder...
defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(defineProps<Props>(), {
  allowClear: false,
  pageSize: 36,
  prefix: '',
  readonly: false,
  value: '',
  width: '100%',
});
const modelValue = defineModel<string>({ required: true, default: '' });
const refIconPicker = ref();

const currentList = computed(() => {
  try {
    if (props.prefix) {
      const icons = listIcons('', props.prefix);
      if (icons.length === 0) {
        console.warn(`No icons found for prefix: ${props.prefix}`);
      }
      return icons;
    } else {
      const prefix = iconsData.prefix;
      return iconsData.icons.map((icon) => `${prefix}:${icon}`);
    }
  } catch (error) {
    console.error('Failed to load icons:', error);
    return [];
  }
});

const triggerPopover = () => {
  refIconPicker.value?.changeOpenState?.();
};

const handleChange = (icon: string) => {
  modelValue.value = icon;
};
</script>

<template>
  <ElInput
    v-model="modelValue"
    :clearable="props.allowClear"
    :readonly="props.readonly"
    :style="{ width }"
    class="cursor-pointer"
    placeholder="点击选中图标"
    @click="triggerPopover"
  >
    <template #append>
      <IconPicker
        ref="refIconPicker"
        :icons="currentList"
        :page-size="pageSize"
        :value="modelValue"
        @change="handleChange"
      />
    </template>
  </ElInput>
</template>
