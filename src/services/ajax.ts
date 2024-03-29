import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000,
})
instance.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + getToken()
  return config
})
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  if (errno != 0) {
    message.error(msg)
    if (msg) {
      return new Error(msg)
    }
  }
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data: ResDataType
  msg: string
}

export type ResDataType = {
  [key: string]: any
}
