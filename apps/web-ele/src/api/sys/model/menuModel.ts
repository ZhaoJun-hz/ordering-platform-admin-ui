import type { BaseListResp } from '#/api/model/baseModel';

export interface MenuInfo {
  menuId?: number;
  menuType: string;
  title: string;
  sort: number;
  parentMenuId: number;
  icon?: string;
  name?: string;
  path?: string;
  component?: string;
  permission?: string;
  hideInMenu?: boolean;
  ignoreKeepAlive?: boolean;
  linkFlag?: boolean;
  link: string;
  disabled?: boolean;
  selectApi?: number[];
}

export interface MenuMeta {
  title: string;
  icon?: string;
  keepAlive?: boolean;
  hideInMenu?: boolean;
  link: string;
  menuVisibleWithForbidden: boolean;
  order: number;
}

export interface MenuTree {
  value?: number;
  menuType?: string;
  parentMenuId?: number;
  name?: string;
  path?: string;
  component?: string;
  permission?: string;
  linkFlag?: boolean;
  meta?: MenuMeta;
  children?: MenuTree[];
}

export type MenuInfoListResp = BaseListResp<MenuInfo>;
export type MenuTreeResp = BaseListResp<MenuTree>;
