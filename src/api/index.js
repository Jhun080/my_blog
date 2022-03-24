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

/*
  获取服务器目录数据
  /qiniu/getDirectory
  get
  参数：无
*/
export const reqGetDirectory = () => {
  return requests({
    url: '/qiniu/getDirectory',
    method: 'get'
  })
}

/*
  获取分类标签数据
  /classification/findAllClassification
  get
  参数：无
*/
export const reqGetClassification = () => {
  return requests({
    url: '/classification/findAllClassification',
    method: 'get'
  })
}

/*
  //通过分类id分页查询文章
  /article/findArticlePageByLabelId
  get
  参数：无
*/
export const reqArticlePageByLabelId = (params) => {
  return requests({
    url: '/article/findArticlePageByLabelId',
    method: 'post',
    data: params
  })
}
