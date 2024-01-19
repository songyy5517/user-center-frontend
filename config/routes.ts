export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './user/Login'},
      {name: '注册', path: '/user/register', component: './user/Register'},
      {component: './404'},
    ],
  },
  {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',    // access.tsx中决定，控制访问权限
    // component: './Admin',  // 访问./admin会展示该公共组件（Admin.tsx）
    routes: [
      {path: '/admin/user-manage', name: '用户管理页', icon: 'smile', component: './Admin/UserManage'},
      // {path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome'},
      {component: './404'},
    ],
  },
  {name: '查询表格', icon: 'table', path: '/list', component: './TableList'},
  {path: '/', redirect: '/welcome'},
  {component: './404'},
];
