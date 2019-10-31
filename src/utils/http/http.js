import axios from 'axios'
import Vue from 'vue'
import { getToken, getHashPath } from '@/utils/auth.js'
import { Message } from 'element-ui'
import store from '@/store/index'
import router from '@/router/index.js'

const author = 'Authorization'
axios.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.common[author] = 'Bearer' + token
    const whiteList = store.getters.whiteList
    if (whiteList.indexOf(getHashPath()) !== -1) {
      delete config.headers.common[author]
      // 单独处理 "./api/enterprise/v1/company/add" 接口
      if (config.url === './api/enterprise/v1/company/add') {
        config.headers.common[author] = 'Bearer' + token
      }
    }
  }
  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus (response) {
  console.log(response)
  if (!response) {
    Message.error('网络故障,请检查您的网络')
    return
  }
  if (response.status === 200 || response.status === 304) {
    if (response.data.code === 401) {
      Message.error('登录已过期,请重新登录')
      setTimeout(() => {
        router.push('/login/userLogin')
      }, 1500)
      return
    }
    if (response.data.code !== 200) {
      Message({ message: response.data.msg || '未知异常', type: 'error' })
    }
    return response
  }
  if (response.status === 401) {
    Message.error('请求授权失败')
    setTimeout(() => {
      router.push('/login/userLogin')
    }, 1500)
  }
  if (response.status === 401) {
    Message.error('请求授权失败')
  }
  if (response.status === 403) {
    Message.error('请求不允许')
  }
  if (response.status === 404) {
    Message.error('没有发现文件、查询或URl')
  }
  if (response.status === 405) {
    Message.error('Request-Line字段定义的方法不允许')
  }
  if (response.status >= 500) {
    Message.error('服务器内部错误,' + response.statusText)
  }
}

function checkCode (res, errMsg) {
  if (!res) { return }
  if (!res.status) {
    console.log(res.data)
    switch (res.data.data.code) {
      case 1:
        Message.error(res.data.data.msg || '参数异常')
        break
      case 2:
        Message.error('未登录！')
        break
      case 3:
        Message.error('没有权限')
        break
      default:
        errMsg ? Message.error(errMsg) : Message.error(res.data.message || '未知异常')
    }
  }
  return res.data
}

export default {
  POST (url, data, errMsg) {
    const { CancelToken } = axios
    return axios.post(url, data, {
      timeout: 30000,
      cancelToken: new CancelToken((c) => {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  },
  GET (url, params, errMsg) {
    const { CancelToken } = axios
    return axios.get(url, {
      params: {
        _t: +(new Date()),
        ...params
      },
      timeout: 30000,
      cancelToken: new CancelToken((c) => {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  },
  DELETE (url, params, errMsg) {
    const { CancelToken } = axios
    return axios.delete(url, {
      params: {
        _t: +(new Date()),
        ...params
      },
      timeout: 30000,
      cancelToken: new CancelToken((c) => {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  },
  PUT (url, data, errMsg) {
    const { CancelToken } = axios
    return axios.put(url, data, {
      timeout: 30000,
      cancelToken: new CancelToken((c) => {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  }
}
