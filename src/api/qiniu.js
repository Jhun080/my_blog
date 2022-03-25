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
