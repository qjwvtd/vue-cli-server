import { postUserLogin } from '@/api/app'

export default {
  //登录
  async userLogin ({ commit }, data) {
    commit('saveUser', data)
    return await postUserLogin(data)
  }
}
