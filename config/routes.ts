export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示2',
    path: '/access',
    component: './Access',
  },
  {
    name: 'test',
    path: '/t',
    routes: [
      {
        name: ' CRUD 示例',
        path: '/t/table',
        icon: 'codeSandbox',
        component: './Access',
      },
    ],
  },
];
