import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/HomePage.vue'),
      },
      {
        path: '/detail',
        component: () => import('src/pages/DetailPage.vue'),
      },
      {
        path: '/fileremoved',
        component: () => import('src/pages/FileRemovedPage.vue'),
      },
      {
        path: '/fileuploaded',
        component: () => import('src/pages/FileUploadedPage.vue'),
      },
      {
        path: '/helpresource',
        component: () => import('src/pages/HelpResourcePage.vue'),
      },
      {
        path: '/errorempty',
        component: () => import('src/pages/ErrorEmptyPage.vue'),
      },
      {
        path: '/modal',
        component: () => import('src/pages/ModalPage.vue'),
      },
      {
        path: '/profilesetting',
        component: () => import('src/pages/ProfileSettingPage.vue'),
      },
      {
        path: '/dashboard',
        component: () => import('src/pages/DashboardPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
