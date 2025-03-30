<script setup lang="ts">
import type { DeptInfo } from '#/api/sys/model/deptModel';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElNotification } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { createDept, updateDept } from '#/api/sys/dept';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'DeptForm',
});
const record = ref();
const gridApi = ref();
const isUpdate = ref(false);

const title = computed(() => (isUpdate.value ? '编辑部门' : '新增部门'));

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  handleSubmit: onSubmit,
  schema: dataFormSchemas.schema,
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
    // deptData = drawerApi.getData()?.deptData;
    if (isOpen) {
      formApi.setValues(record.value);
    }
    drawerApi.setState({
      title: title.value,
    });
  },
});

async function onSubmit(values: Record<string, any>) {
  isUpdate.value
    ? await updateDept(values as DeptInfo)
    : await createDept(values as DeptInfo);
  ElNotification({
    title: 'Success',
    message: `${title.value}操作成功`,
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
