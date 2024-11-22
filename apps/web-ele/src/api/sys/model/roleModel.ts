import type { BaseListResp } from '#/api/model/baseModel';

export interface RoleInfo {
  roleId: number;
  roleName: number; // 角色名称
  roleKey: string; //  权限字符
  status: number; // 状态 1 停用 2 启用
  sort: number; // 排序
  defaultRouter: string; // 默认路由
  selectMenus: number[]; // 菜单权限
  createTime: string;
  admin: boolean;
}

export interface RoleListReq {
  pageNum: number;
  pageSize: number;
  roleName?: number; // 角色名称
  roleKey?: string; //  权限字符
  status?: number; // 状态 1 停用 2 启用
}

export type RoleInfoListResp = BaseListResp<RoleInfo>;
