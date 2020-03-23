<template>
  <div class='container'>
     <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />
      <!-- load这个方法 在初始化会自动调用一次   -->
      <van-list v-model="upLoading" :finished="finished" @load="onLoad" finished-text="没有更多啦">
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item.art_id">
            <div class="article_item">
              <h3 class="van-ellipsis">{{item.title}}</h3>
              <div class="img_box" v-if="item.cover.type===3">
                <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box" v-if="item.cover.type===1">
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}</span>
                <span>{{item.pubdate}}</span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { searchArticles } from '@/api/articleList' // 引入获取搜索文章的请求
export default {
  name: 'searchResult',
  data () {
    return {
      upLoading: false, // 默认是false  这个是上拉加载
      finished: false,
      articles: [], // 设置一个空数组
      page: {
        page: 1, // 请求的页码
        muchPage: 10// 每页多少
      }
    }
  },
  methods: {
    async onLoad () {
      // 此时的变量必须是q  因为后台要求是q
      const { q } = this.$route.query// 先得到当前查询参数
      const res = await searchArticles({ ...this.page, q })
      console.log(res)
      this.articles.push(...res.results)// 如果直接赋值  那么就是直接代替了  这个只是从后面添加数组
      this.upLoading = false// 手动关闭圈圈
      if (res.results.length < 10) {
        this.finished = true// 每次请求都是10条 如果下次请求不是10条 不够了  说明数据库没数据了 需要把加载状态改为true
      } else {
        this.page.page++// 因为下次的数据的页码就会改变递增加1
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
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
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
