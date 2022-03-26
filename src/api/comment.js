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
