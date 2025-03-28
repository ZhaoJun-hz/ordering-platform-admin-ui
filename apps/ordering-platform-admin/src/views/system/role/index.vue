<script setup lang="ts">
import { AccessControl } from '@vben/access';
import { Page, useVbenDrawer, type VbenFormProps } from '@vben/common-ui';

import { ElButton, ElPopconfirm, ElTooltip } from 'element-plus';
import { isPlainObject } from 'remeda';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { getMenuTree } from '#/api/sys/menu';
import { deleteRole, getRoleInfo, getRoleList } from '#/api/sys/role';

import RoleForm from './form.vue';
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

const gridOptions: VxeGridProps = {
  minHeight: 20,
  columns: [...(tableColumns.columns as any)],
  keepSource: true,
  pagerConfig: {},
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
    },
  },
  proxyConfig: {
    response: {
      result: 'data',
    },
    ajax: {
      query: async ({ page }, formValues) => {
        return await getRoleList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

// 搜索 表格
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: RoleForm,
});

async function openFormDrawer(record: any) {
  const result = await getMenuTree({ needButton: true });
  const menuData = result.data ?? [];
  // 编辑
  if (isPlainObject(record)) {
    const result = await getRoleInfo(record.roleId as number);
    record.selectMenus = result.selectMenus ?? [];
    record.admin = result.admin;
    record.defaultSelectMenus = result.selectMenus ?? [];
    drawerApi.setData({
      record,
      gridApi,
      isUpdate: true,
      menuData,
    });
  } else {
    // 新增
    drawerApi.setData({
      record: { sort: 10, selectMenus: [], defaultSelectMenus: [] },
      gridApi,
      isUpdate: false,
      menuData,
    });
  }
  drawerApi.open();
}
async function handlerDeleteRole(record: any) {
  await deleteRole(record.roleId as number);
  gridApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar_buttons>
        <AccessControl :codes="['systemRole:add']" type="code">
          <ElButton type="success" @click="openFormDrawer"> 新增角色 </ElButton>
        </AccessControl>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-center space-x-4">
          <AccessControl :codes="['systemRole:edit']" type="code">
            <ElTooltip class="box-item" content="编辑" placement="top">
              <ElButton circle type="primary" @click="openFormDrawer(row)">
                <span class="icon-[ep--edit]"></span>
              </ElButton>
            </ElTooltip>
          </AccessControl>

          <AccessControl :codes="['systemRole:delete']" type="code">
            <ElTooltip class="box-item" content="删除" placement="top">
              <span>
                <ElPopconfirm
                  title="确定删除么?"
                  @confirm="handlerDeleteRole(row)"
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
