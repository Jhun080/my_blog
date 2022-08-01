<template>
  <div class="footer-nav">
    <div class="time-nav">网站已运行{{ showTime }} (●'◡'●)ﾉ♥</div>
    <div class="record-num">
      <a href="https://beian.miit.gov.cn/">闽ICP备2021014840号-1</a>
    </div>
    <div class="author-info">Made by <a href="https://github.com/Jhun080">Jhun</a>.</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      showTime: ''
    }
  },
  mounted () {
    this.updateTime()
  },
  methods: {
    updateTime () {
      const originTime = 1646408600000 // 2022-03-05
      // 持续时间
      setInterval(() => {
        // 获取运行时间
        const continueTime = new Date().getTime() - originTime
        // 转换时间格式并赋值
        this.showTime = this.changeTime(continueTime)
      }, 1000)
    },
    // 转换时间格式
    changeTime (continueTime) {
      continueTime /= 1000
      // 转换运行时间格式
      let day = parseInt(continueTime / 60 / 60 / 24)
      day = day < 10 ? '0' + day : day
      // 得到小时 格式化成前缀加零的样式
      let hour = parseInt((continueTime / 60 / 60) % 24)
      hour = hour < 10 ? '0' + hour : hour
      // 得到分钟 格式化成前缀加零的样式
      let minute = parseInt((continueTime / 60) % 60)
      minute = minute < 10 ? '0' + minute : minute
      // 得到秒 格式化成前缀加零的样式
      let sec = parseInt(continueTime % 60)
      sec = sec < 10 ? '0' + sec : sec
      return ` ${day} 天 ${hour} 小时 ${minute} 分 ${sec} 秒 `
    }
  }
}
</script>

<style lang="less" scoped>
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100px;
  width: 100%;
  color: white;
  font-size: 14px;
  text-align: center;
  background-color: rgb(31, 30, 30);
  transition: all 0.5s;

  .record-num {
    width: 100%;
    margin: 5px 0px;
  }

  .author-info {
    width: 100%;
  }
}

a {
  color: white;
  text-decoration: none;
  transition: all 0.5s;
}
a:hover {
  color: rgb(202, 201, 201);
  transition: all 0.5s;
}
</style>
