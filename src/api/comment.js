import requests from './ajax'

/*
  获取全部评论
  /comment/findAllComment
  get
  参数：无
*/
export const reqGetAllComment = () => {
  return requests({
    url: '/comment/findAllComment',
    method: 'get'
  })
}

/*
  上传评论
  /comment/addComment
  post
  参数：comment
*/
export const reqAddComment = (params) => {
  return requests({
    url: '/comment/addComment',
    method: 'post',
    data: params
  })
}

/*
  查询评论总条数
  /comment/findCommentNum
  get
  参数：无
*/
export const reqGetCommentTotal = () => {
  return requests({
    url: '/comment/findCommentNum',
    method: 'get'
  })
}

/*
  分页查询评论
  /comment/findCommentPage
  post
  参数：
*/
export const reqGetCommentPage = (params) => {
  return requests({
    url: '/comment/findCommentPage',
    method: 'post',
    data: params
  })
}

/*
  通过评论id删除评论
  /comment/deleteComment
  get
  参数：评论id
*/
export const reqDeleteComment = (commentId) => {
  return requests({
    url: `/comment/deleteComment?commentId=${commentId}`,
    method: 'get'
  })
}
