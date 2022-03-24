<!-- 侧边栏 -->
<template>
 <div>
   <UserInfo></UserInfo>
   <ClassifyInfo></ClassifyInfo>
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
  }

}
</script>

<style lang='less' scoped>

</style>
