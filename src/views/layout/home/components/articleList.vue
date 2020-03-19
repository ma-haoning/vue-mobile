<template>
  <div class="scroll-wrapper">
    <van-list>
      <div class="article_item">
        <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
        <!-- 三图 -->
        <div class="img_box">
          <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <!-- 单图 -->
        <!-- <div class="img_box">
          <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div> -->
        <div class="info_box">
          <span>你像一阵风</span>
          <span>8评论</span>
          <span>10分钟前</span>
          <span class="close">
            <van-icon name="cross"></van-icon>
          </span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getArticleList } from '@/api/articleList' // 引入获取文章列表的axios的请求
export default {
  // 父组件给子组件把channel_id传过来了  需要用props接收一下
  props: {
    channel_id: { // 之前学过的props传值 可以是数组  ['channel_id']这样的形式
      required: true, // 现在可以用对象的方式  另外可以对当前传过来的值 进行配置项的设置
      type: Number,
      default: null // 默认值是null
    }
  },
  data () {
    return {
      timestamp: null
    }
  },
  methods: {
    async getArticleList () {
      const res = await getArticleList({
        channel_id: this.channel_id, // 这个是频道的id
        timestamp: this.timestamp || Date.now() // 判断如果时间戳存在就使用当前的时间戳 如果时间戳不存在  比如说第一次点击频道的id  就需要把当前的时间戳赋值给 timestamp
      })
      console.log(res.results)
    }
  },
  // 实例创建完就执行函数
  created () {
    this.getArticleList()
  }
}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
