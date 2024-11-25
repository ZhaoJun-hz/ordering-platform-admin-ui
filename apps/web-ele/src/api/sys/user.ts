import type { BaseResp } from '../model/baseModel';
import type { RoleInfoListResp } from './model/roleModel';
import type { UserInfo, UserListReq } from './model/userModel';

import { buildQueryParams, requestClient } from '../request';

enum Api {
  BaseUserApi = '/sys/user',
}

export const createUser = (params: UserInfo) => {
  return requestClient.post<BaseResp>(Api.BaseUserApi, params);
};

export const updateUser = (params: UserInfo) => {
  return requestClient.put<BaseResp>(
    `${Api.BaseUserApi}/${params.roleId}`,
    params,
  );
};

export const getUserList = (params: UserListReq) => {
  return requestClient.get<RoleInfoListResp>(
    `${Api.BaseUserApi}?${buildQueryParams(params)}`,
  );
};

export const getUserInfo = (id: number) => {
  return requestClient.get<UserInfo>(`${Api.BaseUserApi}/${id}`);
};

export const deleteUser = (id: number) => {
  return requestClient.delete<BaseResp>(`${Api.BaseUserApi}/${id}`);
};
