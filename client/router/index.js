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
        component: () => import(/* webpackChunkName: "A", webpackPrefetch: true */ '@components/A/A')
      },
      {
        path: '/b',
        name: 'B',
        component: () => import(/* webpackChunkName: "B", webpackPrefetch: true */ '@components/B/B')
      }
    ],
    scrollBehavior() {
      return {
        x: 0,
        y: 0
      }
    }
  })
}