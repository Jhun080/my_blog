// 保存用户token
export const setToken = (token) => {
  sessionStorage.setItem('user_token', token)
}

// 获取用户token
export const getToken = () => {
  return sessionStorage.getItem('user_token')
}

// 删除用户token
export const removeToken = () => {
  sessionStorage.removeItem('user_token')
}
