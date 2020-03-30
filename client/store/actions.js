
export default {
  loginIn: ({
    commit
  }, data) => {
    commit('SET_LOGININ', data)
  },
  loginOut: ({
    commit
  }) => {
    commit('SET_LOGINOUT')
  },
}