import type { BaseListResp } from '#/api/model/baseModel';

export interface ApiInfo {
  id?: number;
  handle: string;
  title: string;
  path: string;
  type: string;
  action: string;
  createTime: string;
}

export type ApiListResp = BaseListResp<ApiInfo>;

export interface ApiListReq {
  pageNum: number;
  pageSize: number;
  type?: string;
  action?: string;
}
