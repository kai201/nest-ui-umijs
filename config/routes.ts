export default [
  {
    path: '/',
    redirect: '/console',
  },
  {
    layout: false,
    path: '/auth',
    component: './Auth',
  },
  {
    icon: 'home',
    name: '首页',
    path: '/console',
    component: './Home',
  },
  {
    icon: 'home',
    name: 'IM',
    path: '/chat',
    component: './IM/Chat',
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
        component: './Sys/User',
      },
      {
        name: '客户管理',
        icon: 'home',
        path: '/sys/customer',
        component: './Sys/Customer',
      },
      {
        name: '任务管理',
        icon: 'home',
        path: '/sys/task',
        component: './Sys/Task',
      },
    ],
  },
];
