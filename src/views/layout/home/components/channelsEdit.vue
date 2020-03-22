<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <!-- 业务需求:点击编辑 在每一个频道上面的X号就会显示 并且 推荐 这个频道不会显示X号 -->
        <!-- editing给的默认值是false -->
        <!-- 老师的笔记中页面布局是现有的  打开子组件的时候 editing是默认的false !editing就是true  当点击编辑按钮的时候 会把true赋值给editing   !editing就是false就会隐藏  相应的完成按钮就是与之相反 -->
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
          <!-- 这里得到了父组件给的频道数组  可以对频道数组进行遍历 -->
        <van-grid-item v-for="(item,index) in channels" :key="item.id">
          <span class="f12">{{item.name}}</span>
          <!-- X号之所以会出来  是因为editing为true 并且要求 推荐 频道不能出现X号 推荐 频道的索引还是第0个   所以 当  index！==0 && editing 的时候 同时为true 当前的X号才会显示   -->
          <van-icon class="btn" name="cross" v-if="index!==0 && editing"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="index in 8" :key="index">
          <span class="f12">频道{{index}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editing: false
    }
  },
  props: {
    // channels必须和父组件的变量名字一样 这里可以用数组 也可以是对象 如果是对象的话 可以对配置项就行设置
    channels: {
      required: true, // 必填项
      type: Array, // 类型是数组
      default: () => [] // 默认值是一个函数  返回的是数组  如果这里只是写[]  vscode就会报错  必须是一个函数  这里用箭头函数  return 就可以省略  返回一个数组的函数
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
