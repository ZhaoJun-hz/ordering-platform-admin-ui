import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Icon } from '@iconify/vue';
import { ElRadioButton, ElTag } from 'element-plus';

export const tableColumns: VxeGridProps = {
  columns: [
    { title: '菜单标题', field: 'title', treeNode: true },
    {
      title: 'icon',
      field: 'icon',
      slots: {
        default: (data) => {
          return h(Icon, {
            icon: data.row.icon,
            width: 20,
          });
        },
      },
      width: 50,
    },
    {
      title: '路由名称',
      field: 'name',
    },
    {
      title: '组件路径',
      field: 'component',
    },
    { title: '路由地址', field: 'path' },
    { title: '排序', field: 'sort' },
    {
      title: '禁用',
      field: 'disabled',
      width: 70,
      slots: {
        default: (record) => {
          let resultText = '';
          resultText = record.row.disabled ? '是' : '否';
          return h(
            ElTag,
            {
              type: record.row.disabled ? 'danger' : 'primary',
            },
            () => resultText,
          );
        },
      },
    },
    {
      title: '隐藏',
      field: 'hideInMenu',
      width: 70,
      slots: {
        default: (record) => {
          let resultText = '';
          resultText = record.row.hideInMenu ? '是' : '否';
          return h(
            ElTag,
            {
              type: record.row.hideInMenu ? 'danger' : 'primary',
            },
            () => resultText,
          );
        },
      },
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 200,
    },
  ],
};

export const dataFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'menuId',
      label: 'ID',
      component: 'Input',
      dependencies: {
        show: false,
        triggerFields: ['menuId'],
      },
    },
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
      rules: 'required',
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
      componentProps: {},
      rules: 'required',
      help: '指当前菜单停靠的菜单归属',
    },
    // 菜单图标
    {
      component: 'Input',
      fieldName: 'icon',
      label: '菜单图标',
      componentProps: {},
      dependencies: {
        if(values) {
          return values.menuType !== 'F';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['menuType'],
      },
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
      label: '组件路径',
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
                  value: false,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: true,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: false,
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
                  value: false,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: true,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: false,
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
                  value: false,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: true,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: false,
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
          return values.menuType === 'C' && values.linkFlag;
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
                  value: false,
                },
                () => '否',
              ),
              h(
                ElRadioButton,
                {
                  value: true,
                },
                () => '是',
              ),
            ];
          },
        };
      },
      defaultValue: false,
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
};
