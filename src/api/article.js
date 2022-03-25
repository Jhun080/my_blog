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
  //通过分类id分页查询文章
  /article/findArticlePageByLabelId
  post
  参数：无
*/
export const reqArticlePageByLabelId = (params) => {
  return requests({
    url: '/article/findArticlePageByLabelId',
    method: 'post',
    data: params
  })
}
