// 当前模块，对所有API进行统一管理
import requests from './ajax'

/*
  获取全部文章
  /api/article/findAllArticle
  get
  无参数
*/
export const reqGetAllArticle = () => {
  // 发请求:axios返回的结果是promise对象
  return requests({
    url: '/article/findAllArticle',
    method: 'get'
  })
}
