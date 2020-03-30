import { API_HOST } from '@api/config'
import axios from '@api/axios'

export default {
  /**
   * 登录
   */
  getUser() {
    return axios(API_HOST + "/api/user")
  },
}