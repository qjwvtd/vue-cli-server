import http from '@http/http'


/************** 登录 **************/
// 手机密码登录
export const postUserLogin = data => http.POST('./api/authentication/v1/authorize/mobile', data)
