import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 按需加载先引入路由组件
const layout = () => import('@/views/layout') // 这个是打开服务器就看到的组件
const home = () => import('@/views/layout/home') // 这个是layout组件默认打开的子组件
const question = () => import('@/views/layout/question') // 这个是layout组件下的子组件 问答组件
const user = () => import('@/views/layout/user') // 这个是layout组件下的子组件  用户组件
const video = () => import('@/views/layout/video') // 这个是layout组件下的子组件 视频组件

const article = () => import('@/views/article') // 这个是路由组件的根组件 文章组件
const login = () => import('@/views/login') // 这个是路由组件的根组件 登录组件
const searchBig = () => import('@/views/search') // 这个是路由组件的根组件下search下的搜索组件
const searchResult = () => import('@/views/search/result') // 这个是路由组件的根组件下的search下的搜索结果组件
const userChat = () => import('@/views/user/chat') // 这个是路由组件的根组件下的user下的聊天组件
const userProfile = () => import('@/views/user/profile') // 这个是路由组件下的根组件下的user下的profile组件
const routes = [
  {
    path: '/', // 打开默认的就是这个组件
    component: layout,
    children: [// 这个是layout页面下的子组件
      {
        path: '', // 这个是layout页面下的子组件们的默认打开的子组件
        component: home
      }, {
        path: '/question',
        component: question
      }, {
        path: '/user',
        component: user
      }, {
        path: '/video',
        component: video
      }
    ]
  },
  {
    path: '/article', // 文章组件
    component: article
  },
  {
    path: '/login', // 登录组件
    component: login
  },
  {
    path: '/searchBig', // 这个是搜索组件
    component: searchBig
  },
  {
    path: '/searchResult', // 这个是搜索结果组件
    component: searchResult
  },
  {
    path: '/userChat', // 这个是聊天组件
    component: userChat
  },
  {
    path: '/userProfile', // 这个是user下的profile组件
    component: userProfile
  }
]

const router = new VueRouter({
  routes
})

export default router
