<template>
  <div class="scroll-wrapper">
    <van-list>
      <div class="article_item">
        <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
        <!-- 三图 -->
        <div class="img_box">
          <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <!-- 单图 -->
        <!-- <div class="img_box">
          <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div> -->
        <div class="info_box">
          <span>你像一阵风</span>
          <span>8评论</span>
          <span>10分钟前</span>
          <span class="close">
            <van-icon name="cross"></van-icon>
          </span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {}
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
