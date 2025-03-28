import type { BaseListResp } from '#/api/model/baseModel';

export interface DeptInfo {
  deptId: number;
  parentDeptId: number;
  deptName: string;
  sort: number;
  leader: string;
  phone: string;
  email: string;
  status: number;
  createTime: string;
}

export interface DeptTree {
  deptId?: number;
  value?: number;
  parentDeptId?: number;
  deptName?: string;
  sort?: number;
  leader?: string;
  phone?: string;
  email?: string;
  status?: number;
  createTime?: string;
  children?: DeptTree[];
}

export type DeptInfoListResp = BaseListResp<DeptInfo>;
export type DeptTreeResp = BaseListResp<DeptTree>;
