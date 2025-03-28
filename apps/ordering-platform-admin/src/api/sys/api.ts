import type { ApiListReq, ApiListResp } from './model/apiModel';

import { buildQueryParams, requestClient } from '#/api/request';

enum Api {
  GetApiList = '/sys/api/list',
}

export const getApiList = (params: ApiListReq) => {
  return requestClient.get<ApiListResp>(
    `${Api.GetApiList}?${buildQueryParams(params)}`,
  );
};
