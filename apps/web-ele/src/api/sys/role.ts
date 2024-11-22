import type { BaseResp } from '../model/baseModel';
import type {
  RoleInfo,
  RoleInfoListResp,
  RoleListReq,
} from './model/roleModel';

import { buildQueryParams, requestClient } from '../request';

enum Api {
  BaseRoleApi = '/sys/role',
}

export const createRole = (params: RoleInfo) => {
  return requestClient.post<BaseResp>(Api.BaseRoleApi, params);
};

export const updateRole = (params: RoleInfo) => {
  return requestClient.put<BaseResp>(
    `${Api.BaseRoleApi}/${params.roleId}`,
    params,
  );
};

export const getRoleList = (params: RoleListReq) => {
  return requestClient.get<RoleInfoListResp>(
    `${Api.BaseRoleApi}?${buildQueryParams(params)}`,
  );
};

export const getRoleInfo = (id: number) => {
  return requestClient.get<RoleInfo>(`${Api.BaseRoleApi}/${id}`);
};

export const deleteRole = (id: number) => {
  return requestClient.delete<BaseResp>(`${Api.BaseRoleApi}/${id}`);
};
