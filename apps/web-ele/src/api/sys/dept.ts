import type { BaseResp } from '../model/baseModel';
import type {
  DeptInfo,
  DeptInfoListResp,
  DeptTreeResp,
} from './model/deptModel';

import { requestClient } from '../request';

enum Api {
  BaseDeptApi = '/sys/dept/',
  DeptTreeApi = '/sys/dept/tree',
}

export const createDept = (params: DeptInfo) => {
  return requestClient.post<BaseResp>(Api.BaseDeptApi, params);
};

export const updateDept = (params: DeptInfo) => {
  return requestClient.put<BaseResp>(
    `${Api.BaseDeptApi}/${params.deptId}`,
    params,
  );
};

export const getDeptList = () => {
  return requestClient.get<DeptInfoListResp>(Api.BaseDeptApi);
};

export const getDeptTree = () => {
  return requestClient.get<DeptTreeResp>(Api.DeptTreeApi);
};

export const getDeptInfo = (id: number) => {
  return requestClient.get<DeptInfo>(`${Api.BaseDeptApi}/${id}`);
};

export const deleteDept = (id: number) => {
  return requestClient.delete<BaseResp>(`${Api.BaseDeptApi}/${id}`);
};
