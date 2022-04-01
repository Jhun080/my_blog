<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <div class="header" ref="header">
      <Header></Header>
    </div>
    <router-view></router-view>
    <!-- 底部备案栏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer/Footer.vue'

export default {
  data () {
    return {}
  },
  components: {
    Header,
    Footer
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 80px;
}

</style>
