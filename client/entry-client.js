import Vue from 'vue'
import { clientPlugin } from 'vue-ssr-prefetcher'
import createApp from './create-app'
const config = require('../config')['server']
Vue.use(clientPlugin)

const { app, router } = createApp()

router.onReady(() => {

  if (window.__INITIAL_STATE__) {
    const { $$selfStore } = window.__INITIAL_STATE__
    if ($$selfStore) app.$$selfStore = $$selfStore
  }
  
  if (parseInt(location.port) === config.port) {
    clientPlugin.$$resolved = true
  }

  app.$mount('#app')
  clientPlugin.$$resolved = true
})