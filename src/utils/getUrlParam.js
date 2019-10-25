/** 
 * 获取指定的URL参数值 
 * URL:http://www.quwan.com/index?name=tyler 
 * 参数：paramName URL参数 
 * 调用方法:getUrlParams("name") 
 * 返回值:tyler 
 */
export default function getUrlParams (paramName) {
  const str = window.location.hash
  const xh = str.indexOf('?')
  const query = str.substr(xh + 1, str.length)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === paramName) {
      return pair[1]
    }
  }
  return false
}
