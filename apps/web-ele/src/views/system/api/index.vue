<script setup lang="ts">
import type { ApiInfo } from '#/api/sys/model/apiModel';

import { Page, type VbenFormProps } from '@vben/common-ui';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { getApiList } from '#/api/sys/api';

import { searchFormSchemas, tableColumns } from './schemas';

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [...(searchFormSchemas.schema as any)],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<ApiInfo> = {
  columns: [...(tableColumns.columns as any)],
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    response: {
      result: 'data',
    },
    ajax: {
      query: async ({ page }, formValues) => {
        return await getApiList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>

<style scoped></style>
