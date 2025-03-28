<script setup lang="ts">
import type { MenuTree } from '#/api/sys/model/menuModel';
import type { RoleInfo } from '#/api/sys/model/roleModel';

import { ref } from 'vue';

import { useVbenDrawer, useVbenForm } from '@vben/common-ui';

import { ElNotification } from 'element-plus';

import { createRole, updateRole } from '#/api/sys/role';
import InputNumber from '#/components/InputNumber.vue';
import Tree from '#/components/Tree.vue';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'RoleForm',
});

const record = ref();
const gridApi = ref();
const isUpdate = ref(false);
let menuData: MenuTree[];

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
    if (isOpen) {
      formApi.setValues(record.value);
    }
    drawerApi.setState({
      title: isUpdate.value ? '编辑角色' : '新增角色',
    });
  },
});

async function onSubmit(values: Record<string, any>) {
  isUpdate.value
    ? await updateRole(values as RoleInfo)
    : await createRole(values as RoleInfo);
  ElNotification({
    title: 'Success',
    message: `${isUpdate.value ? '编辑角色' : '新增角色'}操作成功`,
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
      <template #selectMenus="props">
        <Tree
          v-model="record.selectMenus"
          :check-strictly="true"
          :data="menuData"
          :default-checked-keys="record.defaultSelectMenus"
          :default-props="{ label: 'title' }"
          :expand-on-click-node="false"
          :multiple="true"
          :show-checkbox="true"
          node-key="menuId"
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
    </Form>
  </Drawer>
</template>
