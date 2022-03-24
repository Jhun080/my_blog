<template>
  <div>
    <SidebarCard height="200">
      <template slot="title"> 标签分类 </template>
      <template slot="content">
        <div class="classification-nav">
          <span class="classification" v-for="label in classification" :key="label.classification_id" @click="getArticleByLabel(label)">
            {{ label.classification_name }}
          </span>
        </div>
      </template>
    </SidebarCard>
  </div>
</template>

<script>
import SidebarCard from '@/components/SidebarCard/SidebarCard.vue'

export default {
  name: 'ClassifyInfo',
  components: {
    SidebarCard
  },
  data () {
    return {
      // 标签分类信息
      classification: []
    }
  },
  mounted () {
    // 获取标签分类信息
    this.getClassificationInfo()
  },
  methods: {
    // 获取标签分类信息
    async getClassificationInfo () {
      const result = await this.$API.reqGetClassification()
      if (result.code === 200) {
        this.classification = result.data
      }
    },
    // 通过标签获取文章信息
    getArticleByLabel (label) {
      // 发布事件：让home组件通过标签id查询文章
      this.$bus.$emit('getArticleDataByLabelId', label.classification_id)
    }
  }
}
</script>

<style lang="less" scoped>
.classification-nav {
  display: flex;
  flex-wrap: wrap;

  .classification {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background-color: rgb(134, 136, 138);
    color: white;
    padding: 0px 10px;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
  }

  .classification:hover {
    transform: translate(2px, -2px);
    transition: all 0.5s;
  }
}
</style>
