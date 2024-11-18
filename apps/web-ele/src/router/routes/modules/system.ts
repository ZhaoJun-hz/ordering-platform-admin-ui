import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 10,
      title: '系统管理',
    },
    name: 'system',
    path: '/system',
    children: [
      {
        meta: {
          title: '菜单管理',
        },
        name: 'systemMenu',
        path: '/system/menu',
        component: () => import('#/views/system/menu/index.vue'),
      },
      {
        meta: {
          title: '角色管理',
        },
        name: 'systemRole',
        path: '/system/role',
        component: () => import('#/views/system/role/index.vue'),
      },
      {
        meta: {
          title: '用户管理',
        },
        name: 'systemUser',
        path: '/system/user',
        component: () => import('#/views/system/user/index.vue'),
      },
      {
        meta: {
          title: '部门管理',
        },
        name: 'systemDept',
        path: '/system/dept',
        component: () => import('#/views/system/dept/index.vue'),
      },
      {
        meta: {
          title: '接口管理',
        },
        name: 'systemApi',
        path: '/system/api',
        component: () => import('#/views/system/api/index.vue'),
      },
    ],
  },
];

export default routes;
