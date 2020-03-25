<template>
  <div class="comment">
    <van-list v-model="loading"  :finished="finished" finished-text="没有更多了" @load="onload">
        <!-- 关闭自动加载的状态 因为每次点击不同的按钮 需要按照规定的顺序来找到对应的回复的数据 而不是直接手动加载 不规范 -->
      <div class="item van-hairline--bottom van-hairline--top" v-for="item in comment" :key="item.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="item.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{item.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{item.like_count}}</span>
            </span>
          </p>
          <p>{{item.content}}</p>
          <p>
            <span class="time">{{item.pubdate|relativeTimer}}</span>&nbsp;
            <van-tag plain @click="replyBtn(item.com_id.toString())">{{item.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
        <!-- 回复 -->
    <van-action-sheet v-model="showReply" :round="false" class="reply_dialog" title="回复评论">
      <van-list v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了" @load="onloadd" :immediate-check="false">
        <div class="item van-hairline--bottom van-hairline--top" v-for="item in reply.list" :key="item.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
          <div class="info">
            <p><span class="name">{{item.aut_name}}</span></p>
            <p>{{item.content}}。</p>
            <p><span class="time">{{item.pubdate|relativeTimer}}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">评论</span>
      </van-field>
    </div>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { commentAndReply } from '@/api/articleList'
export default {
  data () {
    return {
      // 上拉加载中
      loading: false,
      // 全部加载完毕
      finished: false,
      // 输入的内容
      value: '',
      // 控制提交中状态数据
      submiting: false,
      comment: [], // 定义一个接受评论的数据
      offset: null, // 设置必传的参数为null
      showReply: false, // 面板的显示状态
      reply: {
        commentId: '',
        loading: false, // van-list的默认
        finished: false,
        offset: null, // 偏移参数必填
        list: []// 接收回复的数据
      }// 这个是回复里的设置项
    }
  },
  methods: {
    // 获取文章的评论
    async onload () {
      const { articleId } = this.$route.query // 获取当前query的参数  它需要传出去获取文章的评论
      const res = await commentAndReply({
        type: 'a', // 获取文章的评论的类型是a
        source: articleId, // 当前文章的id
        offset: this.offset// 这个是必填的参数
      })
      // console.log(res)
      this.comment.push(...res.results)
      this.loading = false// 手动关闭加载状态
      this.finished = res.end_id === res.last_id// 如果当前的获取数据的最后一个id===整个评论列表的id 那么就意味着加载结束了
      if (!this.false) { // 如果加载没有结束  就把当前页面的最后一条评论赋值给this.offset  以供滚动条到底部的距离小于规定值之后再次调用  下次调用的offset参数就变啦
        this.offset = res.last_id
      }
    },
    // 回复的方法
    replyBtn (id) { // 这个是回复的id  接收一下
      this.showReply = true// 一点击就出现面板
      this.reply.commentId = id// 传过来id接收一下
      this.reply.list = []// 重新点击其他按钮 重置数组
      this.reply.finished = false// 重新点击其他按钮  加载并不是结束
      this.reply.loading = true// 需要手动加载 因为上面取消了自动加载
      this.offset = null
      this.onloadd()// 加载
    },
    // van-list的滚动条
    async onloadd () {
    //   await this.$sleep()
      const res = await commentAndReply({
        type: 'c', // 回复的类型是c
        source: this.reply.commentId, // 这个是当前评论的id
        offset: this.reply.offset
      })
      // console.log(res)
      this.reply.list.push(...res.results)// 把得到的数据赋值给list
      this.reply.loading = false// 手动关闭加载状态
      this.reply.finished = res.end_id === res.last_id// 如果二者想等说明加载结束
      if (!this.reply.finished) { // 如果没有加载完毕
        this.reply.offset = res.last_id// 把这个请求的最后一个回复的值给了offset  改变下次请求的参数
      }
    }
  }
}
</script>

<style lang='less' scoped>
.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
</style>
