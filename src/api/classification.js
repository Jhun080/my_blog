import requests from './ajax'

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
