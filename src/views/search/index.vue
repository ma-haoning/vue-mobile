<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search  placeholder="请输入搜索关键词" shape="round"  v-model.trim="q" @search="onSearch" />
    <!-- 搜索框内绑定v-model 只要搜索框内有内容 就会显示搜索的数据 而历史记录就会隐藏  只要搜索框内内容没了   搜索的数据就会隐藏  而历史记录就会显示  二者相反 这个就是业务需求 -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search">
        <span>j</span>ava
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-else>
      <div class="head" v-show="historyList.length">
        <span>历史记录</span>
        <van-icon name="delete" @click="clearAllHistory"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in historyList" :key="index" @click="toResult(item)">
          <a class="word_btn">{{ item }}</a>
          <van-icon class="close_btn" slot="right-icon" name="cross" @click.stop="delHistory(index)" />
          <!-- stop阻止事件冒泡 -->
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
const key = 'historyList' // 定义一个浏览器本地缓存的名字
export default {
  name: 'search',
  data () {
    return {
      q: '', // 定义一个空字符串 绑定搜索框的数据     [] 必须用''包裹
      historyList: []// 定义一个空数组
      //  JSON.parse(window.localStorage.getItem(key) || '[]') // 如果前者是true  就返回前者的值 如果前者是false  name返回的是空数组
    }
  },
  // 实例化结束就执行
  created () {
    // 定义一个变量
    const str = window.localStorage.getItem(key)
    if (str) {
      // 如果存在就把浏览器本地缓存的数组给定义的空数组 然后渲染
      this.historyList = JSON.parse(str)
    } else {
      // 如果不存在的话  设置一下浏览器本地缓存 把空数组给他
      window.localStorage.setItem(key, JSON.stringify([]))
    }
  },
  methods: {
    // 删除历史记录的小删除
    delHistory (index) {
      this.historyList.splice(index, 1)// 把页面上的删除
      window.localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 点击历史记录中的单元格调转到对应的结果组件
    toResult (text) {
      this.$router.push({ path: '/searchResult', query: { q: text } })
    },
    // 清空所有的历史记录
    clearAllHistory () {
      this.historyList = []// 让页面的数组为空
      window.localStorage.setItem(key, JSON.stringify([]))// 缓存的数据为空
    },
    // 输入框输完内容点击搜索之后执行的函数
    onSearch () {
      if (!this.q) return // 如果是空的字符串 就没必要存储到浏览器本地存储
      this.historyList.push(this.q) // 把输入的内容添加到历史记录的数组中
      window.localStorage.setItem(key, JSON.stringify(Array.from(new Set(this.historyList))))// 对新添加的数组元素去重  去重之后就是一个伪数组  通过Array.from强制转为数组 在通过stringify存储到本地
      this.$router.push({ path: '/searchResult', query: { q: this.q } })// 点击搜索调转到对应的组件
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
