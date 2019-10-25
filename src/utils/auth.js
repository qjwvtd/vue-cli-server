/** 
 * 迭代版本: v1.0 
 * 作者: 原浩程
 * 时间: 2019-09-27
 * 原因: 新增公用方法深拷贝
 */
import Cookies from 'js-cookie'



const TokenKey = 'Admin-Token'

//登录令牌
export const LOGINSECRET = {
  id: 'web',
  secret: 'sKuBjFlMsUiPsKlO'
}

//深拷贝
export function deepClone (source, key) {
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys], key)
      } else {
        if (keys === 'name' && key) {
          targetObj.label = source.name
        } else {
          targetObj[keys] = source[keys]
        }

      }
    }
  }
  return targetObj
}

export function getToken () {
  const isremember = Cookies.get('REMEMBER')
  if (isremember === 'true') {
    return Cookies.get(TokenKey)
  }
  if (isremember === 'false') {
    return sessionStorage.getItem(TokenKey)
  }
}

export function setToken (token) {
  const isremember = Cookies.get('REMEMBER')
  if (isremember === 'true') {
    return Cookies.set(TokenKey, token)
  }
  if (isremember === 'false') {
    sessionStorage.setItem(TokenKey, token)
  }
}

export function removeToken () {
  sessionStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}

export function setLocalStorage (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
};

export function getLocalStorage (key) {
  var obj = window.localStorage.getItem(key)
  if (obj && obj !== 'undefined' && obj !== 'null') {
    return JSON.parse(obj)
  }
  return ''
};

export function removeLocalStorage (key) {
  if (key) {
    window.localStorage.removeItem(key)
  } else {
    for (var i in arguments) {
      window.localStorage.removeItem(arguments[i])
    }
  }
}
export function setSessionStorage (key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
};

export function getSessionStorage (key) {
  var obj = window.sessionStorage.getItem(key)
  if (obj && obj !== 'undefined' && obj !== 'null') {
    return JSON.parse(obj)
  }
  return ''
};

export function removeSessionStorage (key) {
  if (key) {
    window.sessionStorage.removeItem(key)
  } else {
    for (var i in arguments) {
      window.sessionStorage.removeItem(arguments[i])
    }
  }
}



/**
 * uuid
 */
export function getUUid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 解析路由取参
 */
export function urlParse () {
  const url = window.location.search
  const obj = {}
  const reg = /[?&][^?&]+=[^?&]+/g
  const arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substr(1).split('=')
      const key = decodeURIComponent(tempArr[0])
      const val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  if (obj) {

  }
  return obj
}

/**
 * 获取hash路径
 */
export function getHashPath () {
  var params = window.location.hash
  if (params.indexOf('#') !== -1) {
    params = params.replace('#', '')
  }
  return params
}
/**
 * 日期格式化
 */
export function dateformat (fmt, date) {
  const str = date || new Date()
  var o = {
    'M+': str.getMonth() + 1, //月份 
    'd+': str.getDate(), //日 
    'h+': str.getHours(), //小时 
    'm+': str.getMinutes(), //分 
    's+': str.getSeconds(), //秒 
    'q+': Math.floor((str.getMonth() + 3) / 3), //季度
    'S': str.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 * 设置左侧二级导航下标,防止用户刷新页面时active与当前路由不匹配的问题 
 */
export const subNavigation = {
  setIndex: function (_index_) {
    sessionStorage.setItem('subnavindex', _index_)
  },
  getIndex: function () {
    return +(sessionStorage.getItem('subnavindex'))
  }
}
/**
 * 把部门人员树处理成单独的员工列表 
 */
export function hanldEmployeeList (treeData) {
  const arr = []
  function parseData (treeData) {
    treeData.forEach((item, index) => {
      if (item.employeeList.length > 0) {
        item.employeeList.forEach((eitem, eindex) => {
          arr.push(eitem)
        })
      }
      if (item.subsetList.length > 0) {
        parseData(item.subsetList)
      }
    })
    return arr
  }
  return parseData(treeData)
}

