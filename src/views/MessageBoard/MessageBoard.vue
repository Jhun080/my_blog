<!-- 留言板 -->
<template>
  <div class="messageboard-nav">
    <div class="info-nav">
      <div class="title">留言板</div>
      <div class="content">走过路过不要错过！交流、咨询、吐槽、感叹、勾搭都在这里，尽情畅谈！</div>
      <img class="image" src="@/assets/messageboard.jpg" />
    </div>
    <div class="message-nav">
      <div class="comment-box">
        <div class="comment-title">发表评论</div>
        <div class="comment-input">
          <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="说点什么呢..." v-model="comment_text"> </el-input>
        </div>
        <div class="comment-submit">
          <button @click="addComment">{{ submitMessage }}</button>
        </div>
      </div>
      <div class="message-box">
        <div class="message-title">
          ▎活捉 {{ total }} 条留言
        </div>
        <!-- 顶部的分割线 -->
        <el-divider></el-divider>
        <!-- 留言区 -->
        <div v-for="comment in commentData" :key="comment.comment_id">
          <div class="message" >
            <img :src="`http://cdn-blog-resource.huecmx.xyz/userIcon/${comment.user.user_icon}?imageView2/1/w/200/h/200/q/100`" class="user-icon">
            <div class="message-info">
              <div class="user-info">
                <div v-if="$store.getters.username=='jhun'" class="delete"><el-button type="danger" size="mini" @click="deleteComment(comment)">删除</el-button></div>
                <div class="user-name">{{ comment.user.user_name }}</div>
                <div class="comment-time">{{ $dayjs(comment.comment_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
              </div>
              <div class="comment-info">
                {{ comment.comment_text }}
              </div>
            </div>
          </div>
          <!-- 顶部的分割线 -->
          <el-divider></el-divider>
        </div>
        <!-- 分页栏 -->
        <div class="comment-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="prev, pager, next, sizes, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBoard',
  data () {
    return {
      // 用户当前评论
      comment_text: '',
      // 评论来源
      comment_source: '留言板',
      // 发送按钮中显示的内容
      submitMessage: '发送~',
      // 评论数据
      commentData: [],
      // 评论总条数
      total: 0,
      // 当前页码
      currentPage: 1,
      // 每页显示条数
      pageSize: 10,
      // 每页显示条数候选
      pageSizes: [10, 15, 20],
      // 查询条件
      query: ''
    }
  },
  mounted () {
    // 分页查询评论
    this.getCommentPage()
  },
  methods: {
    // 查询全部评论
    async getAllComment () {
      const result = await this.$API.reqGetAllComment()
      if (result.code === 200) {
        this.commentData = result.data
      }
    },
    // 分页查询评论
    async getCommentPage () {
      const result = await this.$API.reqGetCommentPage({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        query: this.query
      })
      if (result.code === 200) {
        this.commentData = result.data.rows
        this.total = result.data.total
      }
    },
    // 新增评论
    async addComment () {
      if (this.comment_text === '') {
        // 如果用户未输入评论，阻止请求
        this.submitMessage = '内容不能为空~'
        return
      }
      const result = await this.$API.reqAddComment({
        comment_time: new Date().getTime(), // 评论时间
        comment_source: this.comment_source, // 评论来源
        comment_text: this.comment_text// 评论内容
      })
      if (result.code === 200) {
        this.$message.success('留言成功~')
        // 清空评论内容
        this.comment_text = ''
        // 重新查询评论数据
        this.getCommentPage()
      } else {
        this.$message.warning('留言失败-_-！')
      }
      this.submitMessage = '发送~'
    },
    // 删除评论
    deleteComment (comment) {
      this.$confirm('确定要删除该评论吗？').then(async () => {
        const result = await this.$API.reqDeleteComment(comment.comment_id)
        if (result.code === 200) {
          this.$message.success(result.message)
        } else {
          this.$message.error(result.message)
        }
        // 重新查询评论数据
        this.getCommentPage()
      }).catch(() => {

      })
    },
    // 获取评论总条数
    async getCommentTotal () {
      const result = await this.$API.reqGetCommentTotal()
      if (result.code === 200) {
        this.total = result.data
      }
    },
    // 分页栏页码改变事件
    handleCurrentChange (val) {
      this.currentPage = val
      // 分页查询
      this.getCommentPage()
    },
    // 分页栏每页显示条数修改事件
    handleSizeChange (val) {
      this.pageSize = val
      // 分页查询
      this.getCommentPage()
    }
  }
}
</script>

<style lang="less" scoped>
.messageboard-nav {
  margin-top: 5px;
  width: 85%;

  //介绍区
  .info-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    width: 100%;
    border-radius: 20px;

    .title {
      padding: 30px 0px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }

    .content {
      width: 100%;
      margin: 10px 0px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
  }

  //评论区
  .message-nav {
    background-color: white;
    width: calc(100% - 30px);
    margin: 30px 0px;
    padding: 15px 15px 40px 15px;
    border-radius: 20px;

    //评论输入区部分
    .comment-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;

      .comment-title {
        width: 100%;
        padding-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
      }

      .comment-input {
        width: 100%;
      }

      .comment-submit{
        margin-top: 20px;
        width: 100%;

        button{
          height: 30px;
          width: 100%;
          border: 0px;
          border-radius: 8px;
          color: white;
          background-color: rgb(88, 199, 247);
          transition: all .5s;
          cursor: pointer;
        }

        button:hover{
          background-color: rgb(72,69,109);
          transition: all .5s;
        }
      }
    }

    //用户评论部分
    .message-box{
      width: 100%;

      //评论分割线样式
      .el-divider--horizontal{
        margin: 0px;
        margin-top: 10px;
      }

      .message-title{
        width: 100%;
        margin: 40px 0px;
        font-size: 18px;
        font-weight: bold;
      }

      //每一条评论的样式
      .message{
        display: flex;
        width: 100%;
        min-height: 80px;
        margin-top: 5px;
        //background-color: rgb(208, 210, 212);

        .user-icon{
          width: 60px;
          height: 60px;
          margin: 10px 16px 10px 0px;
          border-radius: 50%;
          transition: all .5s;
        }

        .user-icon:hover{
          transform: rotate(360deg);
          transition: all .5s;
        }

        .message-info{
          margin-top: 10px;
          padding-bottom: 10px;

          .user-info{

            .delete{
              position: absolute;
              left:50vw;
            }

            .user-name{
              font-size: 14px;
              font-weight: bold;
            }

            .comment-time{
              margin-top: 3px;
              font-size: 11px;
              color: rgb(183,170,197);
            }

          }

          .comment-info{
            margin-top: 5px;
            font-size: 14px;
          }

        }
      }

      .comment-pagination{
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }

    }
  }
}
</style>
