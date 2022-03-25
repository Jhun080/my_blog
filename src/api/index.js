// 当前模块，对所有API进行统一管理
import * as article from './article.js'
import * as classification from './classification.js'
import * as qiniu from './qiniu.js'
import * as user from './user.js'

export default {
  ...article,
  ...classification,
  ...qiniu,
  ...user
}
