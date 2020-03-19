<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" :success-text="successText" @refresh='refresh'>
        <van-list v-model="upLoading" :finished="finished" :finished-text="finishedText" @load="getArticleList">
      <div class="article_item" v-for="item in articleList" :key="item.art_id.toString()">
        <h3 class="van-ellipsis">{{item.title}}</h3>
        <!-- 三图 -->
        <!-- 如果type===3 就显示 不等于3就隐藏 -->
        <div class="img_box" v-if="item.cover.type===3">
          <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
          <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
          <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
        </div>
        <!-- 单图 -->
          <!-- 如果type===1 就显示 不等于1就隐藏 -->
        <div class="img_box"  v-if="item.cover.type===1">
          <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
        </div>
        <div class="info_box">
          <span>{{item.aut_name}}</span>
          <span>{{item.comm_count}}</span>
          <span>{{item.pubdate}}</span>
          <span class="close">
            <van-icon name="cross"></van-icon>
          </span>
        </div>
      </div>
    </van-list>
    </van-pull-refresh>
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
      timestamp: null, // 设置时间戳是null
      upLoading: false, // 初始化页面的时候 upLoading会自动触发一次true 需要自己手动改成false
      finished: false, // false代表没有加载完  true代表加载结束 没数据啦
      finishedText: '', // 加载结束之后显示的文本内容
      articleList: [], // 定义一个空数组 用来接收 发送axios之后请求回来的数据
      downLoading: false, // 定义  下拉刷新为false
      successText: '' // 刷新成功的文本提示
    }
  },
  methods: {
    // 上拉加载
    async getArticleList () {
      await this.$sleep() // 同步代码  定时器500ms之后执行下面的
      const res = await getArticleList({
        channel_id: this.channel_id, // 这个是频道的id
        timestamp: this.timestamp || Date.now() // 判断如果时间戳存在就使用当前的时间戳 如果时间戳不存在  比如说第一次点击频道的id  就需要把当前的时间戳赋值给 timestamp
      })
      //   console.log(res)
      this.articleList.push(...res.results) // 这里用到...  是因为如果直接把获取的数据给替代了  会把之前的数据给替代了  ...则是把下一次获取到的数据添加到数据的后面
      this.upLoading = false // load执行是因为滚动条到底部的距离小于默认值 只要一小于 就会自动改成true  需要手动改成false
      if (res.pre_timestamp) { // 判断当前的获取到的数据是否有时间戳
        this.timestamp = res.pre_timestamp // 有的话  就把获取到的时间戳给了timestamp  只要offset一变化 他就会带着新的时间戳去发送请求
      } else { // 如果没有时间戳  说明没有东西可加载  finished==true
        this.finished = true
        this.finishedText = '无内容可加载'
      }
    },
    // 下拉刷新
    async refresh () {
      await this.$sleep() // 同步代码  定时器500ms之后执行下面的
      const res = await getArticleList({
        channel_id: this.channel_id, // 把当前的频道id赋值给channel_id
        timestamp: Date.now() // 因为是下拉刷新  所以时间戳是当前的时间戳
      })
      this.downLoading = false // 一刷新 就会自动改成true  所以需要手动改回来false
      //   console.log(res)
      if (res.results.length) { // 如果有数据的分支
        this.articleList = res.results// 刷新是把全部的articleList替换掉
        if (res.pre_timestamp) { // 如果返回的数据中存在时间戳  就把获取的时间戳给了timestamp
          this.finished = false // 上拉加载的时候 如果拖到最后的数据  finished就已经是true啦  此刻刷新了页面还是true  所以需要把finished改成false  如果再次去上拉加载的话  当前刷新的页面总会获取完 获取完依然会把finished改成true
          this.timestamp = res.pre_timestamp
        }
        this.successText = `更新了${res.results.length}条数据`
      } else {
        this.successText = '亲爱哒,已经是最新的数据啦'
      }
    }
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
