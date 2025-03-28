<script setup lang="ts">
import type { DeptTree } from '#/api/sys/model/deptModel';

import { onMounted, ref } from 'vue';

import { AccessControl } from '@vben/access';
import { Page, useVbenDrawer, type VbenFormProps } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElCol,
  ElPopconfirm,
  ElRow,
  ElTooltip,
} from 'element-plus';
import { isPlainObject } from 'remeda';

import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { getDeptTree } from '#/api/sys/dept';
import { deleteUser, getUserList } from '#/api/sys/user';
import Tree from '#/components/Tree.vue';

import UserForm from './form.vue';
import { searchFormSchemas, tableColumns } from './schemas';

const deptData = ref<DeptTree[]>([]);
const selectedDeptId = ref();
async function fetchDeptData() {
  const result = await getDeptTree();
  deptData.value = result.data;
  // selectedDeptId.value = result.data[0]?.deptId;
}

onMounted(async () => {
  await fetchDeptData();
});

const formOptions: VbenFormProps = {
  collapsed: true,
  schema: [...(searchFormSchemas.schema as any)],
  showCollapseButton: true,
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
        return await getUserList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deptId: selectedDeptId.value,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: UserForm,
});

async function openFormDrawer(record: any) {
  // 编辑
  if (isPlainObject(record)) {
    drawerApi.setData({
      record,
      gridApi,
      isUpdate: true,
    });
  } else {
    // 新增
    drawerApi.setData({
      gridApi,
      isUpdate: false,
    });
  }
  drawerApi.open();
}
async function handlerDeleteUser(record: any) {
  await deleteUser(record.userId as number);
  gridApi.reload();
}
</script>

<template>
  <ElRow>
    <ElCol :span="4">
      <Page auto-content-height>
        <ElCard class="h-full">
          <template #header>
            <div class="card-header">
              <span>所属部门</span>
            </div>
          </template>
          <Tree
            :data="deptData"
            :default-props="{ label: 'deptName' }"
            :expand-on-click-node="false"
            node-key="deptId"
            @update:model-value="
              (newValue: number) => {
                selectedDeptId = newValue;
                gridApi.reload();
              }
            "
          />
        </ElCard>
      </Page>
    </ElCol>
    <ElCol :span="20">
      <Page auto-content-height>
        <Grid>
          <template #toolbar_buttons>
            <AccessControl :codes="['super admin']">
              <ElButton type="success" @click="openFormDrawer">
                新增用户
              </ElButton>
            </AccessControl>
          </template>
          <template #action="{ row }">
            <div class="flex items-center justify-center space-x-4">
              <ElTooltip class="box-item" content="编辑" placement="top">
                <ElButton circle type="primary" @click="openFormDrawer(row)">
                  <span class="icon-[ep--edit]"></span>
                </ElButton>
              </ElTooltip>

              <ElTooltip class="box-item" content="删除" placement="top">
                <span>
                  <ElPopconfirm
                    title="确定删除么?"
                    @confirm="handlerDeleteUser(row)"
                  >
                    <template #reference>
                      <ElButton circle type="danger">
                        <span class="icon-[ep--delete]"></span>
                      </ElButton>
                    </template>
                  </ElPopconfirm>
                </span>
              </ElTooltip>
            </div>
          </template>
        </Grid>
        <Drawer />
      </Page>
    </ElCol>
  </ElRow>
</template>

<style scoped></style>
