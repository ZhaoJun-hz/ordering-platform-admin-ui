import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { ElOption, ElTag } from 'element-plus';

export const tableColumns: VxeGridProps = {
  columns: [
    { type: 'seq', width: 70 },
    {
      title: '描述',
      field: 'title',
    },
    {
      title: '请求路径',
      field: 'path',
    },
    {
      title: '请求方法',
      field: 'action',
    },
    {
      title: '处理方法',
      field: 'handle',
    },
    {
      title: '类型',
      field: 'method',
      width: 70,
      slots: {
        default: (record) => {
          let resultText = '';
          resultText = record.row.action === 'SYS' ? '系统' : '业务';
          return h(
            ElTag,
            {
              type: record.row.action === 'SYS' ? 'danger' : 'primary',
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
  ],
};

export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'type',
      component: 'Select',
      label: '接口类型',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElOption,
                {
                  value: '',
                },
                () => '全部',
              ),
              h(
                ElOption,
                {
                  value: 'SYS',
                },
                () => '系统',
              ),
              h(
                ElOption,
                {
                  value: 'BUS',
                },
                () => '业务',
              ),
            ];
          },
        };
      },
      defaultValue: '',
    },
    {
      fieldName: 'action',
      component: 'Select',
      label: '请求方法',
      renderComponentContent: () => {
        return {
          default: () => {
            return [
              h(
                ElOption,
                {
                  value: '',
                },
                () => '全部',
              ),
              h(
                ElOption,
                {
                  value: 'GET',
                },
                () => 'GET',
              ),
              h(
                ElOption,
                {
                  value: 'POST',
                },
                () => 'POST',
              ),
              h(
                ElOption,
                {
                  value: 'PUT',
                },
                () => 'PUT',
              ),
              h(
                ElOption,
                {
                  value: 'DELETE',
                },
                () => 'DELETE',
              ),
            ];
          },
        };
      },
      defaultValue: '',
    },
  ],
};
