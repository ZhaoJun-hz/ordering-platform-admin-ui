import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { ElOption, ElTag } from 'element-plus';

// 定义行数据类型
interface RowData {
  type: 'BUS' | 'SYS';
}

// 类型映射配置（使用类型断言）
const TYPE_MAP = {
  SYS: { text: '系统', color: 'danger' as const },
  BUS: { text: '业务', color: 'primary' as const },
} satisfies Record<string, { color: 'danger' | 'primary'; text: string }>;

// 公共选项生成器（添加类型注解）
const createOptions = (options: Array<{ label: string; value: string }>) => {
  return options.map((opt) => h(ElOption, opt));
};

// 接口类型选项
const TYPE_OPTIONS = [
  { value: '', label: '全部' },
  { value: 'SYS', label: '系统' },
  { value: 'BUS', label: '业务' },
] as const;

// 请求方法选项
const METHOD_OPTIONS = [
  { value: '', label: '全部' },
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
] as const;

export const tableColumns: VxeGridProps = {
  columns: [
    { type: 'seq', width: 70 },
    { title: '描述', field: 'title' },
    { title: '请求路径', field: 'path' },
    { title: '请求方法', field: 'action' },
    { title: '处理方法', field: 'handle' },
    {
      title: '类型',
      field: 'method',
      width: 70,
      slots: {
        default: ({ row }: { row: RowData }) => {
          // 添加类型注解
          const type = row.type as keyof typeof TYPE_MAP;
          const { text, color } = TYPE_MAP[type] || TYPE_MAP.BUS;
          return h(ElTag, { type: color }, () => text);
        },
      },
    },
    { title: '创建时间', field: 'createTime' },
  ],
};

export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'type',
      component: 'Select',
      label: '接口类型',
      defaultValue: '',
      renderComponentContent: () => ({
        default: () =>
          createOptions(
            TYPE_OPTIONS as unknown as Array<{ label: string; value: string }>,
          ),
      }),
    },
    {
      fieldName: 'action',
      component: 'Select',
      label: '请求方法',
      defaultValue: '',
      renderComponentContent: () => ({
        default: () =>
          createOptions(
            METHOD_OPTIONS as unknown as Array<{
              label: string;
              value: string;
            }>,
          ),
      }),
    },
  ],
};
