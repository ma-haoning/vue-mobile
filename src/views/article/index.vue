<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|relativeTimer}}</p>
        </div>
        <!-- 如果返回来的是true 说明已经关注了 页面上显示应该是取消关注;如果返回来的是false  说明没有关注  页面上应该显示 + 关注 -->
        <van-button round size="small" :loading="btn_loading" type="info" @click="followAndUnfollow">{{article.is_followed?'取消关注':'+ 关注'}}</van-button>
      </div>
      <!-- 因为后台传过来的文章的内容数据有可能是html版的  所以 -->
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button round size="small" :class="{active:article.attitude===1}" plain icon="like-o">点赞</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          plain
          icon="delete"
          :class="{active:article.attitude===0}"
        >不喜欢</van-button>
      </div>
      <comment />
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show='show' class-name="color">
      <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center"><van-loading type="spinner" color="skyblue"/>亲爱哒,请稍等...</div>
    </van-overlay>
  </div>
</template>

<script>
import { articleInfo } from '@/api/articleList' // 引入获取文章详情的请求
import { followUser, unFollowUser } from '@/api/user' // 引入关注和取消关注的请求
import comment from './components/comment' // 引入评论组件
export default {
  // name: 'article'
  components: {
    comment
  },
  data () {
    return {
      article: {}, // 定义文章的空对象 请求结束接收数据 后台回来的数据就是对象  所以得设置对象
      show: true, // 遮罩层的默认值
      btn_loading: false// 关注按钮的默认值
    }
  },
  methods: {
    async getArticleInfo () {
      this.show = true // 请求前显示遮罩
      // 获取文章的详情  需要文章的id值 当然了 文章的id值已经通过点击文章列表的时候通过query传参的方法传到了地址上
      // 获取query的参数
      const { articleId } = this.$route.query // 因为query是对象 通过对象结构赋值的意思  把query上的属性名 和前面的属性名写一致就直接获取到query的值 另外前面的对象中 属性名和变量名一样 可以直接写变量名
      // 已经得到文章的id值可以发送请求获取数据啦
      this.article = await articleInfo(articleId)
      // console.log(this.article)
      this.show = false// 请求后关闭遮罩
    },
    // 关注或者取消关注
    async followAndUnfollow () {
      // 点击按钮之后就让loading蓶true
      this.btn_loading = true
      await this.$sleep()
      try {
        if (this.article.is_followed) { // 如果是true 是关注状态 那么就要去发送取消关注的请求
          await unFollowUser(this.article.aut_id.toString())
        } else { // 如果是false 是取消关注状态 那么就要去发送关注的请求
          await followUser({ target: this.article.aut_id })
        }
        this.article.is_followed = !this.article.is_followed// 只要进try分支 不管是if还是else 都会对当前的状态取反
      } catch (error) {
        this.$notify({ message: '操作失败', duration: 500 })
      } finally {
        this.btn_loading = false// 不管请求成功也好失败也好 在最后 把按钮加载为false
      }
    }
  },
  // 实例创建结束就执行
  created () {
    // 实例结束直接获取文章详情的数据
    this.getArticleInfo()
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  .color {
    background-color: #fff;
  }
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 10px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    // position: sticky;
    background-color: #fff;
    top: 46px;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
