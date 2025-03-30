<script setup lang="ts">
import type { DeptInfo } from '#/api/sys/model/deptModel';

import { AccessControl } from '@vben/access';
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElPopconfirm, ElTooltip } from 'element-plus';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { deleteDept, getDeptList } from '#/api/sys/dept';

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

async function openFormDrawer(record?: DeptInfo) {
  drawerApi.setData({
    record,
    gridApi,
    isUpdate: !!record,
  });
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
        <AccessControl :codes="['systemDept:add']" type="code">
          <ElButton type="success" @click="openFormDrawer()">
            新增部门
          </ElButton>
        </AccessControl>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-center space-x-4">
          <AccessControl :codes="['systemDept:edit']" type="code">
            <ElTooltip class="box-item" content="编辑" placement="top">
              <ElButton circle type="primary" @click="openFormDrawer(row)">
                <span class="icon-[ep--edit]"></span>
              </ElButton>
            </ElTooltip>
          </AccessControl>

          <AccessControl :codes="['systemDept:delete']" type="code">
            <ElTooltip class="box-item" content="删除" placement="top">
              <span>
                <ElPopconfirm
                  title="确定删除么?"
                  @confirm="handlerDeleteMenu(row)"
                >
                  <template #reference>
                    <ElButton circle type="danger">
                      <span class="icon-[ep--delete]"></span>
                    </ElButton>
                  </template>
                </ElPopconfirm>
              </span>
            </ElTooltip>
          </AccessControl>
        </div>
      </template>
    </Grid>
    <Drawer />
  </Page>
</template>

<style scoped></style>
