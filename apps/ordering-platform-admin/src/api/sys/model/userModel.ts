import type { BaseListResp } from '#/api/model/baseModel';

export interface UserInfo {
  status: number; // 状态 1 停用 2 启用
  username: string; // 登录名
  password: string; // 密码
  nickname: string; // 昵称
  description: string; // 描述
  mobile: string; // 手机号
  email: string; // 邮箱
  avatar: string; // 头像
  deptId: number; // 部门id
  roleId: number; // 角色id
  createTime: string;
}

export interface UserListReq {
  username?: string; // 登录名
  nickname?: string; // 昵称
  mobile?: string; // 手机号
  email?: string; // 邮箱
  deptId: number; // 部门id
  roleId?: number; // 角色id
  PageNum: number; //  第几页
  PageSize: number; // 每页的数量
}

export type UserInfoListResp = BaseListResp<UserInfo>;
