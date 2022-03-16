<template>
  <div>
    后台管理界面
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data () {
    return {

    }
  },
  mounted () {
    // 隐藏头部菜单(header)
    this.hideHeader()
  },
  methods: {
    // 隐藏头部菜单(header)
    hideHeader () {
      console.log(this.$parent.$refs.header.style.display = 'none')
    }

  }
}
</script>

<style lang='less' scoped>

</style>
