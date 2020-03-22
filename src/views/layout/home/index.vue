<template>
  <div class="container">
    <van-tabs v-model="activeIndex">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 这里是自己定义的一个新组建  因为这个组件里面是文章的列表 -->
        <!-- 用父组件给子组件传值的方式给子组件把id传过去 因为子组件发送请求需要id -->
        <articleList :channel_id='item.id'></articleList>
      </van-tab>
    </van-tabs>
    <div class="bar_btn" @click="show=true" >
      <!-- 当前的icon在给的css样式中配置好了  直接引入即可 -->
      <van-icon name="wap-nav" />
    </div>
    <!-- 这个是频道编辑的组件 -->
    <!-- 当前必须有一个遮罩层 van-action-sheet  绑定v-model就是  让当前的蓶false  只要一点击就把true赋值给v-model  他就会显示啦  -->
    <!-- round是van-action-sheet的一个属性 默认是true false就是取消圆角  当然必须加上: 如果不加就是字符串 -->
    <van-action-sheet v-model="show" title="编辑频道" :round="false">
      <!-- 父组件给子组件传值 通过props :channesl是要传过去的变量 等号后面是当前组件的变量 -->
      <!-- 通过$emit传过来值之后  写他的方法  这个方法就是当前组件的方法  接收传过来的值 -->
      <!-- 需求:父组件给子组件传值  通过props 既然父组件的频道和子组件的频道是传递过去的并且一模一样  还可以通过props对当前父组件的tab栏的索引传给子组件的索引  让子组件的索引高亮-->
      <channelsEdit :channels='channels' @selectedChannel='selectedChannel' :activeIndex='activeIndex'></channelsEdit>
    </van-action-sheet>

  </div>
</template>

<script>
import { getChannels } from '@/api/channel' // 引入获取用户频道列表的axios的请求
import articleList from './components/articleList' // 这个是文章列表的组件
import channelsEdit from './components/channelsEdit'
export default {
  name: 'home', // devtools查看组件时  可以看到 对应的name名称
  components: {
    articleList, channelsEdit
  },
  data () {
    return {
      // 设置一个空数组 当请求发送成功之后  把从后台获取到的数据给了当前的channels
      channels: [],
      show: false, // 这个是频道编辑组件的  默认显示状态  false是隐藏  当点击对应的图标 true赋值给v-model
      activeIndex: 0 // tabs默认的是0这个下标
    }
  },
  methods: {
    // 下面的getChannels是本实例下的方法 和引入的sxios请求没干系
    async getChannels () {
      // 用异步函数来执行同步代码
      const res = await getChannels()
      // console.log(res)
      this.channels = res.channels
    },
    // 这个是自定义事件 子组件给父组件传值的方法
    selectedChannel (id) {
      // 子组件中传过来的id和当前父组件的item.id如果一样的话 说明就是要找的下标 然后让这个下标赋值给tabs的activeIndex
      const index = this.channels.findIndex((item) => item.id === id)
      this.activeIndex = index // 这就可以得到  点击编辑频道的内部的任意频道 回到父组件的对应的tabs栏
      this.show = false // 关闭遮罩层
    }
  },
  // 钩子函数
  created () {
    // 实例化vue之后就运行下面的函数
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
    padding-left:15px;
    // margin-right:25px;
    .article_item .info_box span.close[data-v-9ad410c0]{
      right: 15px;
    }
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}

</style>
