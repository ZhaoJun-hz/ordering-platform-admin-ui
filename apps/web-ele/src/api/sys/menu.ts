import type { BaseResp } from '../model/baseModel';
import type {
  MenuInfo,
  MenuInfoListResp,
  MenuTreeResp,
} from './model/menuModel';

import { requestClient } from '../request';

enum Api {
  BaseMenuApi = '/sys/menu/',
  MenuTreeApi = '/sys/menu/tree',
}

export const createMenu = (params: MenuInfo) => {
  return requestClient.post<BaseResp>(Api.BaseMenuApi, params);
};

export const updateMenu = (params: MenuInfo) => {
  return requestClient.put<BaseResp>(
    `${Api.BaseMenuApi}/${params.menuId}`,
    params,
  );
};

export const getMenuList = () => {
  return requestClient.get<MenuInfoListResp>(Api.BaseMenuApi);
};

export const getMenuTree = () => {
  return requestClient.get<MenuTreeResp>(Api.MenuTreeApi);
};

export const getMenuInfo = (id: number) => {
  return requestClient.get<MenuInfo>(`${Api.BaseMenuApi}/${id}`);
};

export const deleteMenu = (id: number) => {
  return requestClient.delete<BaseResp>(`${Api.BaseMenuApi}/${id}`);
};
