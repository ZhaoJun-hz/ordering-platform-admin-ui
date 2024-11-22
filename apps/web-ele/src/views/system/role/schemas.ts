import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { ElOption, ElRadioButton, ElTag } from 'element-plus';

export const tableColumns: VxeGridProps = {
  columns: [
    { type: 'seq', width: 70 },
    {
      title: '角色名称',
      field: 'roleName',
    },
    {
      title: '权限字符',
      field: 'roleKey',
    },
    {
      title: '默认路由',
      field: 'defaultRouter',
    },
    {
      title: '排序',
      field: 'sort',
    },
    {
      title: '状态',
      field: 'status',
      width: 70,
      slots: {
        default: (record) => {
          let resultText = '';
          resultText = record.row.status === 1 ? '停用' : '启用';
          return h(
            ElTag,
            {
              type: record.row.type === 'SYS' ? 'danger' : 'primary',
            },
            () => resultText,
          );
        },
      },
    },
    {
      title: 'createTime',
      field: 'createTime',
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

export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'roleName',
      component: 'Input',
      label: '角色名称',
    },
    {
      fieldName: 'roleKey',
      component: 'Input',
      label: '权限字符',
    },
    {
      fieldName: 'status',
      component: 'Select',
      label: '状态',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElOption,
                {
                  value: 0,
                  label: '全部',
                },
                () => '全部',
              ),
              h(
                ElOption,
                {
                  value: 2,
                  label: '启用',
                },
                () => '启用',
              ),
              h(
                ElOption,
                {
                  value: 1,
                  label: '停用',
                },
                () => '停用',
              ),
            ];
          },
        };
      },
      defaultValue: 0,
    },
  ],
};

export const dataFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'roleId',
      label: 'ID',
      component: 'Input',
      dependencies: {
        show: false,
        triggerFields: ['roleId'],
      },
    },
    {
      fieldName: 'admin',
      label: 'admin',
      component: 'Space',
      dependencies: {
        show: false,
        triggerFields: ['admin'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入角色名称',
      },
      fieldName: 'roleName',
      label: '角色名称',
      rules: 'required',
      dependencies: {
        disabled(values) {
          return !!values.roleId;
        },
        triggerFields: ['roleId'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入权限字符',
      },
      fieldName: 'roleKey',
      label: '权限字符',
      rules: 'required',
      dependencies: {
        disabled(values) {
          return !!values.roleId;
        },
        triggerFields: ['roleId'],
      },
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入默认路由',
      },
      fieldName: 'defaultRouter',
      label: '默认路由',
    },
    {
      component: 'Input',
      fieldName: 'sort',
      label: '显示排序',
      rules: 'required',
      help: '根据序号升序排列',
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: '状态',
      formItemClass: 'col-span-1',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElRadioButton,
                {
                  value: 1,
                },
                () => '停用',
              ),
              h(
                ElRadioButton,
                {
                  value: 2,
                },
                () => '启用',
              ),
            ];
          },
        };
      },
      defaultValue: 2,
    },
    {
      component: 'Input',
      fieldName: 'selectMenus',
      label: '菜单权限',
      formItemClass: 'col-span-2',
      dependencies: {
        show(values) {
          return !values.admin;
        },
        triggerFields: ['admin'],
      },
    },
  ],
};
