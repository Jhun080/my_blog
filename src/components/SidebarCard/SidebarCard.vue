<!-- 侧边栏卡片模板 -->
<template>
  <div class="card-nav" ref="nav">
    <!-- 卡片标题 -->
    <div class="card-title">
      <slot name="title"></slot>
    </div>
    <!-- 卡片内容 -->
    <div class="content-card">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarCard',
  props: ['height'],
  data () {
    return {}
  },
  mounted () {
    // 初始化CSS样式
    this.initStyle()
  },
  methods: {
    // 初始化CSS样式
    initStyle () {
      const element = this.$refs.nav.style
      // 设置卡片高度
      element.setProperty('--nav-height', this.height + 'px')
    }
  }
}
</script>

<style lang="less" scoped>
@nav-height: var(--nav-height);
.card-nav {
  width: 75%;
  height: @nav-height;
  margin-top: 20px;
  background-color: white;
  border-radius: 20px;
  transition: all 0.5s;
  text-align: center;

  .card-title{
    height: 30%;
    line-height: calc(@nav-height * 0.3) ;
    font-size: 24px;
    font-weight: bold;
    color: rgb(126, 124, 124);
  }

  .content-card{
    height: 70%;
  }

}

.card-nav:hover {
  transform: translate(2px,-2px);
  transition: all .5s;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}
</style>
