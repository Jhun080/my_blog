<!-- 侧边栏 -->
<template>
 <div>
   <UserInfo></UserInfo>
 </div>
</template>

<script>
import UserInfo from './UserInfo/UserInfo.vue'

export default {
  name: 'Sidebar',
  components: {
    UserInfo
  },
  data () {
    return {

    }
  }

}
</script>

<style lang='less' scoped>

</style>
