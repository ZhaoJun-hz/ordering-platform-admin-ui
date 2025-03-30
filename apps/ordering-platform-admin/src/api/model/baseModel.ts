export interface BaseListResp<T> {
  data: T[];
  total: number;
}

export interface BaseDataResp<T> {
  code: number;
  msg: string;
  data: T;
}

export interface BaseResp {
  code?: number;
  msg: string;
}

export enum StatusEnum {
  DISABLED = 2,
  ENABLED = 1,
}

export type StatusKey = keyof typeof StatusEnum; // 获取枚举的键类型

export const STATUS_MAP: Record<StatusEnum, { color: string; text: string }> = {
  [StatusEnum.DISABLED]: { text: '停用', color: 'danger' },
  [StatusEnum.ENABLED]: { text: '启用', color: 'primary' },
} as const;
