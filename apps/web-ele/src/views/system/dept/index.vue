<script setup lang="ts">
import type { DeptTree } from '#/api/sys/model/deptModel';

import { AccessControl } from '@vben/access';
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElPopconfirm, ElTooltip } from 'element-plus';
import { isPlainObject } from 'remeda';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { deleteDept, getDeptList, getDeptTree } from '#/api/sys/dept';

import DeptForm from './form.vue';
import { tableColumns } from './schemas';

const gridOptions: VxeGridProps = {
  minHeight: 20,
  pagerConfig: {
    enabled: false,
  },
  columns: [...(tableColumns.columns as any)],
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
    },
  },
  treeConfig: {
    parentField: 'parentDeptId',
    rowField: 'deptId',
    transform: true,
  },
  proxyConfig: {
    response: {
      list: 'data',
    },
    ajax: {
      query: async () => {
        return await getDeptList();
      },
    },
  },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: DeptForm,
});

async function openFormDrawer(record: any) {
  const result = await getDeptTree();
  const data = result.data ?? [];
  data.push({ deptId: 0, deptName: '主部门' } as DeptTree);
  const deptData = data;
  if (isPlainObject(record)) {
    drawerApi.setData({
      record,
      gridApi,
      isUpdate: true,
      deptData,
    });
  } else {
    drawerApi.setData({
      record: { sort: 10, parentDeptId: 0 },
      gridApi,
      isUpdate: false,
      deptData,
    });
  }
  drawerApi.open();
}

async function handlerDeleteMenu(record: any) {
  await deleteDept(record.deptId as number);
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar_buttons>
        <AccessControl :codes="['super admin']">
          <ElButton type="success" @click="openFormDrawer"> 新增部门 </ElButton>
        </AccessControl>
      </template>
      <template #action="{ row }">
        <ElTooltip class="box-item" content="编辑" placement="top">
          <ElButton round type="primary" @click="openFormDrawer(row)">
            <span class="icon-[ep--edit]"></span>
          </ElButton>
        </ElTooltip>

        <ElTooltip class="box-item" content="删除" placement="top">
          <span>
            <ElPopconfirm title="确定删除么?" @confirm="handlerDeleteMenu(row)">
              <template #reference>
                <ElButton round type="danger">
                  <span class="icon-[ep--delete]"></span>
                </ElButton>
              </template>
            </ElPopconfirm>
          </span>
        </ElTooltip>
      </template>
    </Grid>
    <Drawer />
  </Page>
</template>

<style scoped></style>
