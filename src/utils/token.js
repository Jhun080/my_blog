// 保存用户token
export const setToken = (token) => {
  localStorage.setItem('user_token', token)
}

// 获取用户token
export const getToken = () => {
  return localStorage.getItem('user_token')
}

// 删除用户token
export const removeToken = () => {
  localStorage.removeItem('user_token')
}
