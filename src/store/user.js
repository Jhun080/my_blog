import { setToken, getToken, removeToken } from '@/utils/token.js'
import { reqUserInfo, reqLogout } from '@/api/user.js'
const state = {
  // token令牌
  token: getToken(),
  // 用户信息
  userInfo: {}
}
const mutations = {
  SETTOKEN (state, token) {
    state.token = token
    // 将token保存至sessionStorage
    setToken(token)
  },
  SETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR (state) {
    // 仓库中相关用户数据清空
    state.token = ''
    state.userInfo = {}
    // 本地存储数据清空
    removeToken()
  }
}
const actions = {
  // 用户登录(token)
  // async userLogin ({ commit }, user) {
  //   const result = await reqUserLogin(user)
  //   // 服务器下发token，用户唯一标识符（uuid）
  //   // 将来需要通过携带token找服务器要数据
  //   if (result.code == 200) {
  //     // 登录成功，获取到token
  //     commit('USERLOGIN', result.data.token)
  //     // 持久化存储token
  //     setToken(result.data.token)
  //     return 'ok'
  //   } else {
  //     return Promise.reject(new Error('faile'))
  //   }
  // },
  // 获取用户信息（需要携带token）
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('SETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout ({ commit }, user) {
    const result = await reqLogout(user)
    if (result.code === 200) {
      // 清空数据
      commit('CLEAR')
      return { code: 200 }
    } else {
      return Promise.reject(new Error('请求失败'))
    }
  }
}
const getters = {
  // 计算出的用户名
  username (state) {
    const userInfo = state.userInfo || {}
    return userInfo.user_name || null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
