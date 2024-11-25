<script setup lang="ts">
import type { DeptInfo } from '#/api/sys/model/deptModel';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElNotification } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { createDept, updateDept } from '#/api/sys/dept';
import InputNumber from '#/components/InputNumber.vue';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'DeptForm',
});
const record = ref();
const gridApi = ref();
const isUpdate = ref(false);
// let deptData: DeptTree[] = [];

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
    // deptData = drawerApi.getData()?.deptData;
    if (isOpen) {
      formApi.setValues(record.value);
    }
    drawerApi.setState({
      title: isUpdate.value ? '编辑部门' : '新增部门',
    });
  },
});

async function onSubmit(values: Record<string, any>) {
  isUpdate.value
    ? await updateDept(values as DeptInfo)
    : await createDept(values as DeptInfo);
  ElNotification({
    title: 'Success',
    message: `${isUpdate.value ? '编辑部门' : '新增部门'}操作成功`,
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
