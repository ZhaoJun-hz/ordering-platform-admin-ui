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
          resultText = record.row.type === 'SYS' ? '系统' : '业务';
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
                  label: '全部',
                },
                () => '全部',
              ),
              h(
                ElOption,
                {
                  value: 'SYS',
                  label: '系统',
                },
                () => '系统',
              ),
              h(
                ElOption,
                {
                  value: 'BUS',
                  label: '业务',
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
                  label: '全部',
                },
                () => '全部',
              ),
              h(
                ElOption,
                {
                  value: 'GET',
                  label: 'GET',
                },
                () => 'GET',
              ),
              h(
                ElOption,
                {
                  value: 'POST',
                  label: 'POST',
                },
                () => 'POST',
              ),
              h(
                ElOption,
                {
                  value: 'PUT',
                  label: 'PUT',
                },
                () => 'PUT',
              ),
              h(
                ElOption,
                {
                  value: 'DELETE',
                  label: 'DELETE',
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
