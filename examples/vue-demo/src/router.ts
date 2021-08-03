import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(), // 路由模式
  // 每个页面的信息
  routes: [
    {
      path: '/', // url地址
      name: 'Home',
      component: () => import('@/views/Index.vue'), // 渲染的组件
    },
    {
      path: '/table',
      name: 'Table',
      component: () => import('@/views/TableDemo.vue'),
    },
  ],
});
