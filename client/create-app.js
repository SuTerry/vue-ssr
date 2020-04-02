import Vue from 'vue'
import App from './app.vue'
import Meta from 'vue-meta'
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import createRouter from './router'
import createStore from './store'

Vue.use(Meta)
Vue.use(Button)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
