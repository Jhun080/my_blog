<!-- 侧边栏 -->
<template>
 <div>
   <UserInfo></UserInfo>
   <ClassifyInfo v-show="tab=='Home'"></ClassifyInfo>
 </div>
</template>

<script>
import UserInfo from './UserInfo/UserInfo.vue'
import ClassifyInfo from './ClassifyInfo/ClassifyInfo.vue'

export default {
  name: 'Sidebar',
  components: {
    UserInfo,
    ClassifyInfo
  },
  data () {
    return {

    }
  },
  computed: {
    // 当前路由名name
    tab () {
      return this.$route.name
    }
  }

}
</script>

<style lang='less' scoped>

</style>
