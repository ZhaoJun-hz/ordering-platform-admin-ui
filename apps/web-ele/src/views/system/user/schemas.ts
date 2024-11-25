import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { ElRadioButton, ElTag } from 'element-plus';

import { getDeptTree } from '#/api/sys/dept';
import { getRoleList } from '#/api/sys/role';

export const tableColumns: VxeGridProps = {
  columns: [
    { type: 'seq', width: 70 },
    {
      title: '用户名',
      field: 'username',
    },
    {
      title: '昵称',
      field: 'nickname',
    },
    {
      title: '手机号',
      field: 'mobile',
    },
    {
      title: '邮箱',
      field: 'email',
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
              type: record.row.status === 1 ? 'danger' : 'primary',
            },
            () => resultText,
          );
        },
      },
    },
    {
      title: '创建时间',
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
      fieldName: 'username',
      component: 'Input',
      label: '用户名',
    },
    {
      fieldName: 'roleId',
      component: 'CustomSelect',
      label: '角色',
      componentProps: {
        api: getRoleList,
        params: {
          pageNum: 1,
          pageSize: 100,
        },
        resultField: 'data',
        labelField: 'roleName',
        valueField: 'roleId',
        multiple: true,
      },
      defaultValue: 0,
    },
    {
      fieldName: 'nickname',
      component: 'Input',
      label: '昵称',
    },
    {
      fieldName: 'mobile',
      component: 'Input',
      label: '手机号',
    },
    {
      fieldName: 'email',
      component: 'Input',
      label: '邮箱',
    },
  ],
};

export const dataFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'userId',
      label: 'ID',
      component: 'Input',
      dependencies: {
        show: false,
        triggerFields: ['userId'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名称',
      },
      fieldName: 'username',
      label: '用户名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入密码',
        type: 'password',
        showPassword: true,
      },
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
    {
      fieldName: 'roleId',
      component: 'CustomSelect',
      label: '角色',
      componentProps: {
        api: getRoleList,
        params: {
          pageNum: 1,
          pageSize: 100,
        },
        resultField: 'data',
        labelField: 'roleName',
        valueField: 'roleId',
        multiple: true,
      },
      defaultValue: 0,
      rules: 'required',
    },
    {
      component: 'CustomTreeSelect',
      fieldName: 'deptId',
      label: '部门',
      componentProps: {
        api: getDeptTree,
        params: {},
        resultField: 'data',
        valueField: 'deptId',
        labelField: 'deptName',
        accordion: true,
        expandOnClickNode: false,
        appendData: {
          label: '主部门',
          value: 0,
        },
        // defaultValue: 0,
      },
      rules: 'required',
      defaultValue: 0,
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户昵称',
      },
      fieldName: 'nickname',
      label: '用户昵称',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      fieldName: 'mobile',
      label: '手机号',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      fieldName: 'email',
      label: '邮箱',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户描述',
      },
      fieldName: 'description',
      label: '用户描述',
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
  ],
};
