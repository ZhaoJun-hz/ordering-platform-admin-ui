<script setup lang="ts">
import type { MenuInfo, MenuTree } from '#/api/sys/model/menuModel';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElNotification } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { createMenu, updateMenu } from '#/api/sys/menu';
import ApiSelect from '#/components/ApiSelect.vue';
import IconPicker from '#/components/IconSelect/icon-picker.vue';
import InputNumber from '#/components/InputNumber.vue';
import TreeSelect from '#/components/TreeSelect.vue';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'MenuForm',
});
const record = ref();
const gridApi = ref();
const isUpdate = ref(false);
let menuData: MenuTree[];
let apiData: { key: number; label: string }[];

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  handleSubmit: onSubmit,
  schema: [...(dataFormSchemas.schema as any)],
  wrapperClass: 'grid-cols-2',
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  async onConfirm() {
    const result = await formApi.validate();
    if (result.valid) {
      formApi.submitForm();
    }
  },
  onOpenChange(isOpen: boolean) {
    isUpdate.value = drawerApi.getData()?.isUpdate;
    record.value = isOpen ? drawerApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? drawerApi.getData()?.gridApi : null;
    menuData = drawerApi.getData()?.menuData;
    apiData = drawerApi.getData()?.apiData;
    if (isOpen) {
      formApi.setValues(record.value);
    }
    drawerApi.setState({
      title: isUpdate.value ? '编辑菜单' : '新增菜单',
    });
  },
});

async function onSubmit(values: Record<string, any>) {
  isUpdate.value
    ? await updateMenu(values as MenuInfo)
    : await createMenu(values as MenuInfo);
  ElNotification({
    title: 'Success',
    message: `${isUpdate.value ? '编辑菜单' : '新增菜单'}操作成功`,
    type: 'success',
  });
  gridApi.value.reload();
  drawerApi.close();
}
defineExpose(drawerApi);
</script>

<template>
  <Drawer
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="w-1/2"
  >
    <Form>
      <template #selectApi="props">
        <ApiSelect
          v-model:select-values="record.selectApi"
          :button-texts="['收回', '授权']"
          :data="apiData"
          :titles="['未授权', '已授权']"
          @on-init="
            (nV: number[]) => {
              console.log(`ApiSelect init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:select-values="
            (nV: number[]) => {
              console.log(`ApiSelect update 更新value ${nV}`);
              props.setValue(nV);
            }
          "
        />
      </template>
      <template #parentMenuId="props">
        <TreeSelect
          v-model="record.parentMenuId"
          :accordion="true"
          :data="menuData"
          :default-props="{ label: 'title' }"
          :multiple="false"
          value-key="menuId"
          @init="
            (nV: number) => {
              console.log(`TreeSelect init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:model-value="
            (newValue: number) => {
              console.log(`TreeSelect 更新value ${newValue}`);
              props.setValue(newValue);
            }
          "
        />
      </template>
      <template #icon="props">
        <IconPicker
          v-model:icon-value="record.icon"
          @on-init="
            (nV: string) => {
              console.log(`IconPicker init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:icon-value="
            (newValue: string) => {
              console.log(`IconPicker 更新value ${newValue}`);
              props.setValue(newValue);
            }
          "
        />
      </template>
      <template #sort="props">
        <InputNumber
          v-model:input-number="record.sort"
          @on-init="
            (nV: number) => {
              console.log(`InputNumber init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:input-number="
            (newValue: number) => {
              console.log(`InputNumber 更新value ${newValue}`);
              props.setValue(newValue);
            }
          "
        />
      </template>
    </Form>
  </Drawer>
</template>
