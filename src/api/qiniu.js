import requests from './ajax'

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
  上传预览图片
  /qiniu/uploadPreviewImage
  post
  参数：
*/
export const reqUploadPreviewImage = (params) => {
  return requests({
    url: '/qiniu/uploadPreviewImage',
    method: 'post',
    data: params
  })
}

/*
  上传用户头像图片
  /qiniu/uploadImage
  post
  参数：
*/
export const reqUploadImage = (params) => {
  return requests({
    url: '/qiniu/uploadImage',
    method: 'post',
    data: params
  })
}
