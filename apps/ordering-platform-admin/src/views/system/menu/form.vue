<script setup lang="ts">
import type { MenuInfo } from '#/api/sys/model/menuModel';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElNotification } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { createMenu, updateMenu } from '#/api/sys/menu';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'MenuForm',
});
const record = ref();
const gridApi = ref();
const isUpdate = ref(false);

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
    if (isOpen) {
      formApi.setValues(record.value);
    }
    drawerApi.setState({
      title: isUpdate.value ? '编辑菜单' : '新增菜单',
    });
  },
});

async function onSubmit(values: Record<string, any>) {
  if (isUpdate.value && !values.password) {
    delete values.password; // 编辑时如果密码为空则删除该字段
  }

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
    <Form />
  </Drawer>
</template>
