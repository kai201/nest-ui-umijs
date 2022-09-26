export default [
  {
    path: '/',
    redirect: '/console',
  },
  {
    icon: 'home',
    name: '首页',
    path: '/console',
    component: './Home',
  },
  {
    name: '系统管理',
    icon: 'home',
    path: '/sys',
    routes: [
      {
        name: '用户管理',
        icon: 'home',
        path: '/sys/user',
        component: './User',
      },
    ],
  },
];
