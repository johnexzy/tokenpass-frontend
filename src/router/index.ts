import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { checkIfWalletIsConnected } from 'src/scripts/utils/walletUtil';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
import { useUserStore } from '../stores/user';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  Router.beforeEach((to, from, next) => {
    // console.log(store().getters)
    (async () => {
      const $store = useUserStore();
      await checkIfWalletIsConnected($store);
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if ($store.Account) {
          next();
          return;
        }
        next('/errorempty');
      } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
        if ($store.Account) {
          next('/');
          return;
        }
        next();
      } else if (to.matched.some((record) => record.meta.requiresItemGated)) {
        console.log('ItemGated');
        if ($store.gatedResponseStatus === 201) {
          next();
          return;
        }
        next('/');
      } else {
        next();
      }
    })();
  });

  return Router;
});
