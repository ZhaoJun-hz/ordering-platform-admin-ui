<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElCard, ElCol, ElRow } from 'element-plus';

import { getDeptTree } from '#/api/sys/dept';
import Tree from '#/components/Tree.vue';

const deptData = ref();
async function fetchDeptData() {
  const result = await getDeptTree();
  deptData.value = result.data;
}

onMounted(async () => {
  await fetchDeptData();
});
</script>

<template>
  <ElRow>
    <ElCol :span="6">
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
                console.log(`Tree 更新value ${newValue}`);
              }
            "
          />
        </ElCard>
      </Page>
    </ElCol>
    <ElCol :span="18">
      <Page auto-content-height> 用户11111111 </Page>
    </ElCol>
  </ElRow>
</template>

<style scoped></style>
