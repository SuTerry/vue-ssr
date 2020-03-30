export default {
  //设置登陆信息
  SET_LOGININ(state, data) {
    state.userInfo = Object.assign({}, state.userInfo, data)
    state.isLogin = true
  },
  //登出
  SET_LOGINOUT(state) {
    state.userInfo = {}
    state.isLogin = false
  },
}