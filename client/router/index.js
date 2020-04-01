import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/a'
      },
      {
        path: '/a',
        name: 'A',
        component: () => import(/* webpackChunkName: "A", webpackPrefetch: true */ '@pages/A')
      },
      {
        path: '/b',
        name: 'B',
        component: () => import(/* webpackChunkName: "B", webpackPrefetch: true */ '@pages/B')
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "404", webpackPrefetch: true */ '@pages/404')
      },
      // 重定向
      {
        path: "/*",
        redirect: {
          name: '404'
        }
      },
    ],
    scrollBehavior() {
      return {
        x: 0,
        y: 0
      }
    }
  })
}