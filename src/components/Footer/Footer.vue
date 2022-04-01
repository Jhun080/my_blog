<template>
  <div class="footer-nav">
    <div class="time-nav">
      网站已运行{{ showTime }} (●'◡'●)ﾉ♥
    </div>
    <div class="record-num">
      <a href="https://beian.miit.gov.cn/">闽ICP备2021014840号-1</a>
    </div>
    <div class="author-info">
      Made by <a href="https://github.com/Jhun080">Jhun</a>.
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

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
      const originTime = 1646409600000 // 2022-03-05
      // 持续时间
      setInterval(() => {
        const continueTime = new Date().getTime() - originTime
        this.showTime = dayjs(continueTime).format(' DD 天 HH 小时 mm 分 ss 秒')
        // console.log(this.showTime)
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.footer-nav{
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
  transition: all .5s;

  .time-nav{

  }

  .record-num{
    width: 100%;
    margin: 5px 0px;
  }

  .author-info{
    width: 100%;
  }
}

a{
  color: white;
  text-decoration: none;
  transition: all .5s;
}
a:hover{
  color: rgb(202, 201, 201);
  transition: all .5s;
}
</style>
