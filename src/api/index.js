// 当前模块，对所有API进行统一管理
import requests from './ajax'

/*
  获取全部文章
  /api/article/findAllArticle
  get
  无参数
*/
export const reqGetAllArticle = () => {
  return requests({
    url: '/article/findAllArticle',
    method: 'get'
  })
}

/*
  分页查询文章
  /api/article/findArticlePage
  get
  参数：
  currentPage：当前页码
  pageSize：每页显示数据条数
  query：查询条件
*/
export const reqGetArticlePage = (params) => {
  return requests({
    url: '/article/findArticlePage',
    method: 'post',
    data: params
  })
}
