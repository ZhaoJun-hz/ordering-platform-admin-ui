<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MenuInfo } from '#/api/sys/model/menuModel';

import { onMounted } from 'vue';

import { AccessControl } from '@vben/access';
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton, ElPopconfirm, ElTooltip } from 'element-plus';
import { isPlainObject } from 'remeda';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getApiList } from '#/api/sys/api';
import { deleteMenu, getMenuInfo, getMenuList } from '#/api/sys/menu';

import MenuForm from './form.vue';
import { tableColumns } from './schemas';

// table
const gridOptions: VxeGridProps<MenuInfo> = {
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
    parentField: 'parentMenuId',
    rowField: 'menuId',
    transform: true,
  },
  proxyConfig: {
    response: {
      list: 'data',
    },
    ajax: {
      query: async () => {
        return await getMenuList();
      },
    },
  },
};
let apiData: { key: number; label: string }[] = [];
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: MenuForm,
});

async function openFormDrawer(record: any) {
  // 编辑
  if (isPlainObject(record)) {
    const result = await getMenuInfo(record.menuId as number);
    record.selectApi = result.selectApi ?? [];
    drawerApi.setData({
      record,
      gridApi,
      isUpdate: true,
      apiData,
    });
  } else {
    // 新增
    drawerApi.setData({
      record: { sort: 10, parentMenuId: 0 },
      gridApi,
      isUpdate: false,
      apiData,
    });
  }

  drawerApi.open();
}
async function handlerDeleteMenu(record: any) {
  await deleteMenu(record.menuId as number);
  gridApi.reload();
}
onMounted(async () => {
  const apiList = await getApiList({ pageNum: 1, pageSize: 10_000 });
  apiData = apiList.data.map((item) => {
    return Object.assign({}, { key: item.id!, label: item.title! });
  });
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar_buttons>
        <AccessControl :codes="['super admin']">
          <ElButton type="success" @click="openFormDrawer"> 新增菜单 </ElButton>
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
