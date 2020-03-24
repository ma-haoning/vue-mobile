<template>
  <div class="comment">
    <van-list v-model="loading"  :finished="finished" finished-text="没有更多了" @load="onload">
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
            <van-tag plain @click="showReply=true">{{item.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">提交</span>
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
      offset: null// 设置必传的参数为null
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
      console.log(res)
      this.comment.push(...res.results)
      this.loading = false// 手动关闭加载状态
      this.finished = res.end_id === res.last_id// 如果当前的获取数据的最后一个id===整个评论列表的id 那么就意味着加载结束了
      if (!this.false) { // 如果加载没有结束  就把当前页面的最后一条评论赋值给this.offset  以供滚动条到底部的距离小于规定值之后再次调用  下次调用的offset参数就变啦
        this.offset = res.last_id
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
