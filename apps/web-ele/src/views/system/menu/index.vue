<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { AccessControl } from '@vben/access';
import { Page, useVbenDrawer } from '@vben/common-ui';

import { ElButton } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import MenuForm from './form.vue';

// table
interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { align: 'left', title: '', type: 'checkbox', width: 100 },
    { title: '序号', type: 'seq', width: 50 },
    { field: 'category', title: 'Category' },
    { field: 'color', title: 'Color' },
    { field: 'productName', title: 'Product Name' },
    { field: 'price', title: 'Price' },
    { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
  ],
  keepSource: true,
  pagerConfig: {},
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
    },
  },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: MenuForm,
});

function openFormDrawer() {
  // function openFormDrawer(record: any) {
  // if (isPlainObject(record)) {
  // drawerApi.setData({
  // record,
  // gridApi,
  // });
  // } else {
  drawerApi.setData({
    record: null,
    gridApi,
  });
  // }

  drawerApi.open();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar_buttons>
        <AccessControl :codes="['super admin']">
          <ElButton type="success" @click="openFormDrawer"> Open </ElButton>
          <ElButton type="warning">删除</ElButton>
          <ElButton type="danger">全部删除</ElButton>
        </AccessControl>
      </template>
    </Grid>
    <Drawer />
  </Page>
</template>

<style scoped></style>
