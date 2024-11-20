import type { ApiListReq, ApiListResp } from './model/apiModel';

import { requestClient } from '#/api/request';

enum Api {
  // CreateApi = '/sys-api/api/create',
  // DeleteApi = '/sys-api/api/delete',
  // GetApiById = '/sys-api/api',
  GetApiList = '/sys/api/list',
  // UpdateApi = '/sys-api/api/update',
}

export const getApiList = (params: ApiListReq) => {
  // 拼接url
  const paramsStr = Object.keys(params)
    .map((item) => {
      const key = item as keyof ApiListReq;
      return `${key}=${params[key]}`;
    })
    .join('&');
  return requestClient.get<ApiListResp>(`${Api.GetApiList}?${paramsStr}`);
};
