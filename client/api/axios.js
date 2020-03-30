import axios from 'axios' //导入axios

/**
 * @description: http请求拦截器
 * @param :
 * @return:
 */
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})


/**
 * @description: http response 服务器拦截器
 * @param :
 * @return:
 */
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  let res = response.data
  // if (response.data.returnCode === 'SUCCESS') {
  //   res = response.data
  // }
  return res
}, err => {
  // 对响应错误做点什么
  return Promise.reject(err)
})

/**
 * @description: 导出axios
 * @param :
 * @return:
 */
export default (url, data = {}, {
  method = 'get',
  headers = {},
  timeout = 15000,
  responseType = 'json'
} = {}) => {
  let params = method == 'get' ? {
    params: data
  } :
    {
      data
    }
  return axios({
    method,
    url,
    headers,
    timeout,
    responseType,
    ...params,
  })
}