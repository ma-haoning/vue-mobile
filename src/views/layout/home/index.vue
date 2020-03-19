<template>
  <div class="container">
    <van-tabs>
      <van-tab v-for="item in 10" :key="item" :title="`标签${item}`">
        <!-- 这里是自己定义的一个新组建  因为这个组件里面是文章的列表 -->
        <articleList></articleList>
      </van-tab>
    </van-tabs>
    <div class="bar_btn">
      <!-- 当前的icon在给的css样式中配置好了  直接引入即可 -->
      <van-icon name="wap-nav" />
    </div>
  </div>
</template>

<script>
import articleList from './components/articleList'
export default {
  name: 'home', // devtools查看组件时  可以看到 对应的name名称
  components: {
    articleList
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
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
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
</style>
