const appRoutes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    name: 'home',
    meta: { title: '首页' }
  },
  {
    path: '/main',
    component: () => import('@/views/main/index.vue'),
    name: 'main',
    meta: { title: '主页' }
  },
  {
    path: '/user',
    component: () => import('@/views/user/index.vue'),
    name: 'user',
    meta: { title: '用户页' }
  },
  {
    path: '/system',
    component: () => import('@/views/system/index.vue'),
    name: 'system',
    meta: { title: '系统' }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' }
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export default appRoutes
