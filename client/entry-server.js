import Vue from 'vue'
import createApp from './create-app'
import { createServerPlugin } from 'vue-ssr-prefetcher'


export default async context => {

  const serverPlugin = createServerPlugin()

  Vue.use(serverPlugin)

  const { app, router, store } = createApp()

  router.push(context.url)

  await routerReady(router)

  context.meta = app.$meta()
  context.rendered = serverPlugin.done
  context.state = {
    $$stroe: store ? store.state : undefined,
    $$selfStore: app.$$selfStore
  }

  return app
}

function routerReady(router) {
  return new Promise(resolve => {
    router.onReady(resolve)
  })
}