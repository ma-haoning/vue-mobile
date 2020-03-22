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
            <!-- 可以在事件中直接写逻辑  子组件给父组件传值  监听谁就在谁的 -->
            <!-- 因为子组件的频道是由父组件通过props传值过来的  点击当前的index 传给父组件之后 找对应的index即可 -->
          <span class="f12" @click="$emit('selectedChannel',item.id)">{{item.name}}</span>
          <!-- X号之所以会出来  是因为editing为true 并且要求 推荐 频道不能出现X号 推荐 频道的索引还是第0个   所以 当  index！==0 && editing 的时候 同时为true 当前的X号才会显示   -->
          <van-icon class="btn" name="cross" v-if="index!==0 && editing"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionalChannels" :key="item.id">
          <span class="f12">{{item.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel' // 引入全部频道的请求
export default {
  data () {
    return {
      editing: false, // 这个是显示和隐藏的默认值
      allChannels: [] // 全部频道的数据 先定义一个空数组 获取请求结束 把获取的结果赋值给当前的空数组  然后渲染即可
    }
  },
  props: {
    // channels必须和父组件的变量名字一样 这里可以用数组 也可以是对象 如果是对象的话 可以对配置项就行设置
    channels: {
      required: true, // 必填项
      type: Array, // 类型是数组
      default: () => [] // 默认值是一个函数  返回的是数组  如果这里只是写[]  vscode就会报错  必须是一个函数  这里用箭头函数  return 就可以省略  返回一个数组的函数
    }
  },
  methods: {
    // 这个函数只是当前Vue实例的一个方法 虽然和引入的获取全部频道的请求的方法一样  当时二者有本质的区别
    async getAllChannels () {
      const res = await getAllChannels()
      //   console.log(res)
      this.allChannels = res.channels // 把接口获取到的全部数据赋值给空数组
    }
  },
  // 钩子函数 当Vue实例结束自动执行
  created () {
    // Vue实例结束 直接获取全部频道的数据
    this.getAllChannels()
  },
  computed: { // 在计算属性中对全部频道进行筛选成可选频道
    // 业务需求 可选频道中不能包括你已经选择的频道  可选频道是除了已经选择的频道之外的频道 在全部频道中减去已经选择了的频道
    // 运用数组的filter和some方法就行筛选
    // 计算属性内部都是方法 必须有返回值 return
    optionalChannels () {
      // some这个方法返回的是boolean值 在通过filter对布尔值进行筛选就是真实的数据
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
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
