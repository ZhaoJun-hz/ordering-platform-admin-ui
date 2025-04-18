import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { ElRadioButton, ElTag } from 'element-plus';

import { STATUS_MAP, StatusEnum } from '#/api/model/baseModel';
import { getDeptTree } from '#/api/sys/dept';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      title: '部门名称',
      field: 'deptName',
      treeNode: true,
    },
    {
      title: '顺序',
      field: 'sort',
    },
    {
      title: '负责人名字',
      field: 'leader',
    },
    {
      title: '负责人手机号',
      field: 'phone',
    },
    {
      title: '负责人邮箱',
      field: 'email',
    },
    {
      title: '状态',
      field: 'status',
      width: 70,
      slots: {
        default: ({ row }) => {
          const statusKey = row.status as StatusEnum;
          const { text, color } =
            STATUS_MAP[statusKey] ?? STATUS_MAP[StatusEnum.DISABLED];
          return h(ElTag, { type: color as 'danger' | 'primary' }, () => text);
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

export const dataFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'deptId',
      label: 'ID',
      component: 'Input',
      dependencies: {
        show: false,
        triggerFields: ['deptId'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'deptName',
      label: '部门名称',
      rules: 'required',
    },
    {
      component: 'CustomTreeSelect',
      fieldName: 'parentDeptId',
      label: '上级部门',
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
      help: '指当前部门归属的部门',
      defaultValue: 0,
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'leader',
      label: '负责人名字',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'phone',
      label: '负责人手机号',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'email',
      label: '负责人邮箱',
    },
    {
      component: 'CustomInputNumber',
      fieldName: 'sort',
      label: '显示排序',
      componentProps: {
        controlsPosition: 'right',
        min: 0,
        max: 999,
        precision: 0,
      },
      rules: 'required',
      help: '根据序号升序排列',
      defaultValue: 10,
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: '状态',
      renderComponentContent: () => ({
        default: () => [
          h(
            ElRadioButton,
            {
              value: StatusEnum.DISABLED,
            },
            () => '停用',
          ),
          h(
            ElRadioButton,
            {
              value: StatusEnum.ENABLED,
            },
            () => '启用',
          ),
        ],
      }),
      defaultValue: StatusEnum.ENABLED,
    },
  ],
};
