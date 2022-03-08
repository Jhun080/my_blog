<!-- 首页内容 -->
<template>
    <!-- 文章内容简介列表组 -->
    <div class="list-group">
      <List>

      </List>
      <List></List>
      <List></List>
      <List></List>
      <List></List>
      <List></List>
      <List></List>
    </div>
</template>

<script>
import List from '@/components/List/List.vue'

export default {
  name: 'Home',
  data () {
    return {
      listData: [
        {
          title: '测试标题',
          content: '&emsp;&emsp;测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
        }
      ]
    }
  },
  components: {
    List
  }
}
</script>

<style lang="less" scoped>
.list-group{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
