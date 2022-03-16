<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <div class="header" ref="header">
      <Header></Header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  data () {
    return {}
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 80px;
}

</style>
