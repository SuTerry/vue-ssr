import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import state from "./state"
import getters from "./getters"
import actions from "./actions"
import plugins from "./plugins"

Vue.use(Vuex)

export default () => {
  new Vuex.Store({
    // state: getLocal("kongDashboard") || state,
    state: state,
    getters,
    actions,
    mutations,
    plugins: [plugins],
  })
}
