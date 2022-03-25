import requests from './ajax'

/*
  //验证用户登录
  /user/verifyUser
  post
  参数：user
*/
export const reqVerifyUser = (params) => {
  return requests({
    url: '/user/verifyUser',
    method: 'post',
    data: params
  })
}

/*
  获取用户信息
  /user/getUserInfo
  post
  参数：无
*/
export const reqUserInfo = () => {
  return requests({
    url: '/user/getUserInfo',
    method: 'post'
  })
}

/*
  退出登录
  /user/logout
  post
  参数：无
*/
export const reqLogout = (params) => {
  return requests({
    url: '/user/logout',
    method: 'post',
    data: params
  })
}
