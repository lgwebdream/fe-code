import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/TableDemo.vue'),
    },
    {
      path: '/table',
      name: 'Table',
      component: () => import('@/views/TableDemo.vue'),
    },
  ],
});
