// 这个是获取文章列表的axios请求
import request from '@/utiles/request' // 引入请求拦截器

export function getArticleList (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles', // 这个地址比较特殊 并不是我们所规定的基地址
    params: {
      with_top: 1, // 当前的这个参数是固定的所以只需要房子此处就可以
      ...params // 形参是一个对象 用 ...的方式就是把对象内部（形参）的每个元素分开  到这里就是每个对象的元素
    }
  })
}

// 在搜索框内输入文本 联想数据
export function auto (params) {
  return request({
    url: '/suggestion',
    params
  })
}

// 搜索文章的请求
export function searchArticles (params) {
  return request({
    url: '/search',
    params
  })
}

// 获取文章详情的请求
export function articleInfo (articleId) {
  return request({
    url: `/articles/${articleId}`
  })
}

// 获取文章评论和回复的请求
export function commentAndReply (params) {
  return request({
    url: '/comments',
    params
  })
}

// 添加文章评论或者回复的请求
export function subComments (data) {
  return request({
    url: '/comments',
    method: 'post',
    data
  })
}
