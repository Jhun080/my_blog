<!-- 个人信息标签 -->
<template>
  <div class="info-nav">
    <!-- 图片区 -->
    <img id="bigImg" src="@/assets/Sidebar/UserInfo/userImage.png" />
    <!-- 链接区 -->
    <p class="message">
      你能抓到我么？
    </p>
    <div class="link-class">
      <div class="link-up">
        <el-tooltip class="item" effect="dark" content="GitHub" placement="top" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/github.png" />
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="QQ" placement="top" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/qq.png" />
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="微信" placement="top" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/weixin.png" />
          </div>
        </el-tooltip>
      </div>
      <div class="link-down">
        <el-tooltip class="item" effect="dark" content="CSDN" placement="bottom" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/csdn.png" />
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="个人" placement="bottom" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/info.png" />
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="更多" placement="bottom" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/more.png" />
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="更多" placement="bottom" style="cursor: pointer">
          <div class="mini-icon">
            <img class="icon" src="@/assets/Sidebar/UserInfo/more.png" />
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.info-nav {
  position: relative;
  width: 75%;
  height: 22vw;
  background-color: white;
  border-radius: 20px;

  #bigImg {
    position: absolute;
    top: 15px;
    left: 15px;
    width: calc(100% - 30px);
    max-height: calc(100% - 140px);
  }

  .message{
    position: absolute;
    bottom:107px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  }

  .link-class {
    position: absolute;
    bottom: 10px;
    padding-left: calc(50% - 104px);
    .mini-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 42px;
      height: 42px;
      background-color: rgb(229,229,229);
      border-radius: 50%;
      margin: 0px 5px;
      .icon {
        height: 28px;
        width: 28px;
      }
    }
    .mini-icon:hover{
      background-color: rgb(247, 148, 105);
    }
    .link-up {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .link-down {
      display: flex;
      justify-content: center;
    }
  }
}

.info-nav:hover {
  //-webkit-transform: translateY(-2px);
  transform: translateY(-2px);
  //-webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}
</style>
