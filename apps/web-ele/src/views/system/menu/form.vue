<script setup lang="ts">
import { h, reactive } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElMessage, ElRadioButton } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import ApiSelect from '#/components/ApiSelect.vue';
import IconPicker from '#/components/IconSelect/icon-picker.vue';
import InputNumber from '#/components/InputNumber.vue';
import TreeSelect from '#/components/TreeSelect.vue';

defineOptions({
  name: 'MenuForm',
});

interface Option {
  key: number;
  label: string;
}

const generateData = () => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
    });
  }
  return data;
};

const record = reactive({
  data: generateData(),
  selectApi: [],
  parentMenuId: 0,
  icon: 'ep:aim',
  sort: 10,
});

const treeSelectData = [
  {
    value: 1,
    label: 'Level one 1',
    children: [
      {
        value: 2,
        label: 'Level two 1-1',
        children: [
          {
            value: 3,
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: 4,
    label: 'Level one 2',
    children: [
      {
        value: 5,
        label: 'Level two 2-1',
        children: [
          {
            value: 6,
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: 7,
        label: 'Level two 2-2',
        children: [
          {
            value: 8,
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: 9,
    label: 'Level one 3',
    children: [
      {
        value: 10,
        label: 'Level two 3-1',
        children: [
          {
            value: 11,
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: 12,
        label: 'Level two 3-2',
        children: [
          {
            value: 13,
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
  {
    value: 0,
    label: '主菜单',
    children: [],
  },
];

const [Form, formApi] = useVbenForm({
  // layout: 'vertical',
  showDefaultActions: false,
  handleSubmit: onSubmit,
  schema: [
    // 菜单类型
    {
      component: 'RadioGroup',
      fieldName: 'menuType',
      label: '菜单类型',
      formItemClass: 'col-span-2',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElRadioButton,
                {
                  value: 'M',
                },
                () => '目录',
              ),
              h(
                ElRadioButton,
                {
                  value: 'C',
                },
                () => '菜单',
              ),
              h(
                ElRadioButton,
                {
                  value: 'F',
                },
                () => '按钮',
              ),
            ];
          },
        };
      },
      defaultValue: 'M',
      // rules: 'required',
    },
    // 菜单标题
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'title',
      label: '菜单标题',
      rules: 'required',
      help: '菜单位置显示的说明信息',
    },
    // 显示排序
    {
      component: 'Input',
      fieldName: 'sort',
      label: '显示排序',
      rules: 'required',
      help: '根据序号升序排列',
    },
    // 上级菜单
    {
      component: 'Input',
      fieldName: 'parentMenuId',
      label: '上级菜单',
      componentProps: {
        data: treeSelectData,
      },
      rules: 'required',
      help: '指当前菜单停靠的菜单归属',
    },
    // 菜单图标
    {
      component: 'Input',
      fieldName: 'icon',
      label: '菜单图标',
      componentProps: {},
    },
    // 路由名称
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入路由名称',
      },
      fieldName: 'name',
      label: '路由名称',
      help: '需要和页面name保持一致，对应页面即可选择缓存',
      dependencies: {
        if(values) {
          return values.menuType !== 'F';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
      rules: 'required',
    },
    // 组件路径
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入组件路径',
      },
      fieldName: 'component',
      label: '路由名称',
      help: '菜单对应的具体vue页面文件路径views的下级路径/admin/sys-api/index；目录类型：填写BasicLayout',
      dependencies: {
        if(values) {
          return values.menuType !== 'F';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
      rules: 'required',
    },
    // 路由地址
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入路由地址',
      },
      fieldName: 'path',
      label: '路由地址',
      help: '访问此页面自定义的url地址，建议/开头书写，例如 /app-name/menu-name',
      dependencies: {
        if(values) {
          return values.menuType !== 'F';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
      rules: 'required',
    },
    // 权限标识
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入权限标识',
      },
      fieldName: 'permission',
      label: '权限标识',
      help: '前端权限控制按钮是否显示',
      formItemClass: 'col-span-2',
      dependencies: {
        if(values) {
          return values.menuType !== 'M';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
      // rules: 'required',
    },
    // 隐藏菜单
    {
      component: 'RadioGroup',
      fieldName: 'hideInMenu',
      label: '隐藏菜单',
      formItemClass: 'col-span-1',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElRadioButton,
                {
                  value: 0,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: 1,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: 0,
    },
    // 取消页面缓存
    {
      component: 'RadioGroup',
      fieldName: 'ignoreKeepAlive',
      label: '取消页面缓存',
      formItemClass: 'col-span-1',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElRadioButton,
                {
                  value: 0,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: 1,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: 0,
      dependencies: {
        if(values) {
          return values.menuType === 'C';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
    },
    // 是否外链
    {
      component: 'RadioGroup',
      fieldName: 'linkFlag',
      label: '外链',
      formItemClass: 'col-span-1',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElRadioButton,
                {
                  value: 0,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: 1,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: 0,
      dependencies: {
        if(values) {
          return values.menuType === 'C';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
    },
    // 外链地址
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入外链地址',
      },
      fieldName: 'link',
      label: '外链地址',
      formItemClass: 'col-span-1',
      dependencies: {
        if(values) {
          return values.menuType === 'C' && values.linkFlag === 1;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType', 'linkFlag'],
      },
      // rules: 'required',
    },
    // 是否停用
    {
      component: 'RadioGroup',
      fieldName: 'disabled',
      label: '禁用',
      formItemClass: 'col-span-1',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElRadioButton,
                {
                  value: 0,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: 1,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: 0,
      dependencies: {
        if(values) {
          return values.menuType !== 'F';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
    },
    // 选择API
    {
      component: 'Input',
      fieldName: 'selectApi',
      label: '选择API',
      formItemClass: 'col-span-2 items-baseline',
      componentProps: {
        // data: data.value,
        filterable: true,
      },
      dependencies: {
        if(values) {
          return values.menuType !== 'M';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
    },
  ],
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
  onBeforeClose() {
    // console.log('Drawer onBeforeClose invoke');
    formApi.resetForm();
    formApi.resetValidate();
    // selectData.value = [];
    // treeSelectDataRef.value = 0;
    return true;
  },
});

function onSubmit(values: Record<string, any>) {
  ElMessage({
    message: `Query params: ${JSON.stringify(values)}`,
    type: 'success',
  });
}
defineExpose(drawerApi);
</script>

<template>
  <Drawer
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="w-1/2"
    title="基础示例"
  >
    <Form>
      <template #selectApi="props">
        <ApiSelect
          v-model:select-values="record.selectApi"
          :button-texts="['收回', '授权']"
          :data="record.data"
          :titles="['未授权', '已授权']"
          @on-init="
            (nV: number[]) => {
              console.log(`ApiSelect init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:select-values="
            (nV: number[]) => {
              console.log(`ApiSelect update 更新value ${nV}`);
              props.setValue(nV);
            }
          "
        />
      </template>
      <template #parentMenuId="props">
        <TreeSelect
          v-model:select-value="record.parentMenuId"
          :date="treeSelectData"
          @on-init="
            (nV: number) => {
              console.log(`TreeSelect init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:select-value="
            (newValue: number) => {
              console.log(`TreeSelect 更新value ${newValue}`);
              props.setValue(newValue);
            }
          "
        />
      </template>
      <template #icon="props">
        <IconPicker
          v-model:icon-value="record.icon"
          @on-init="
            (nV: string) => {
              console.log(`IconPicker init 更新value ${nV}`);
              props.setValue(nV);
            }
          "
          @update:icon-value="
            (newValue: string) => {
              console.log(`IconPicker 更新value ${newValue}`);
              props.setValue(newValue);
            }
          "
        />
      </template>
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
