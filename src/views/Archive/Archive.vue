<!-- 归档页面 -->
<template>
  <div class="archive-nav" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="archive-title">
      归档
    </div>
    <div class="timeline-nav">
      <el-timeline
        :reverse=true
      >
        <el-timeline-item
          v-for="archive in archiveData"
          :key="archive.article_id"
          :icon="archive.icon"
          :color="archive.color"
          :size="archive.size"
          :timestamp="archive.timestamp"
          @click.native="toDeatil(archive.article_url)">
          {{archive.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Archive',
  data () {
    return {
      // 归档数据
      archiveData: [],
      fullscreenLoading: false
    }
  },
  mounted () {
    // 获取归档数据
    this.getArchiveData()
  },
  methods: {
    // 获取归档数据
    async getArchiveData () {
      // 开启页面加载效果
      this.fullscreenLoading = true
      const result = await this.$API.reqGetAllArticle()
      if (result.code === 200) {
        // 将网站数据转化为时间轴数据
        this.handleArchive(result.data)
      }
      // 关闭页面加载效果
      this.fullscreenLoading = false
    },
    // 将网站数据转化为时间轴数据
    handleArchive (article) {
      this.archiveData = article.map(item => {
        return {
          content: item.article_title,
          timestamp: this.$dayjs(item.article_createtime).format('YYYY-MM-DD'),
          // size: 'large',
          // type: 'danger ',
          color: 'DarkCyan',
          icon: 'el-icon-link',
          article_url: item.article_url,
          article_id: item.article_id
        }
      })
    },
    // 跳转至文章详情
    toDeatil (articleURL) {
      this.$router.push(`/main/detail?aricleURL=${articleURL}`)
    }
  }
}
</script>

<style lang='less' scoped>
.archive-nav{
  background-color: white;
  width: 85%;

  .archive-title{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: rgb(68,68,68);
  }

  .timeline-nav{
      position: relative;
      left: 130px;
      margin-top: 25px;
  }

}

//时间线样式
.el-timeline{
  //时间线-文字内容样式
  /deep/.el-timeline-item__content{
    font-size: 16px;
  }

  //时间线-时间戳样式
  /deep/.el-timeline-item__timestamp{
    position: relative;
    right: 135px;
    bottom: 26px;
    color: DarkCyan;
    font-size: 16px;
  }

  //时间线-时间icon样式
  /deep/.el-timeline-item__node--normal{
    left: -5px;
    width: 20px;
    height: 20px;
  }

  /deep/.el-timeline-item__wrapper{
    cursor: pointer;
  }

  /deep/.el-timeline-item__wrapper:hover{
    transform: translate(2px,-2px);
    transition: all .5s;
  }
}
</style>
