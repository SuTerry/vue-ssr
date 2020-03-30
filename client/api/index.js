import axios from '@api/axios'
import user from './user' // 用户

export default Object.assign({},
  user,
  {
    axios,
  }
)