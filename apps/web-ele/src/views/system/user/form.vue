<script setup lang="ts">
import type { UserInfo } from '#/api/sys/model/userModel';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElNotification } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { createUser, updateUser } from '#/api/sys/user';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'UserForm',
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
      title: isUpdate.value ? '编辑用户' : '新增用户',
    });
  },
});

async function onSubmit(values: Record<string, any>) {
  isUpdate.value
    ? await updateUser(values as UserInfo)
    : await createUser(values as UserInfo);
  ElNotification({
    title: 'Success',
    message: `${isUpdate.value ? '编辑用户' : '新增用户'}操作成功`,
    type: 'success',
  });
  gridApi.value.reload();
  drawerApi.close();
}
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
