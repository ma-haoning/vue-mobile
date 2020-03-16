import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 按需加载先引入路由组件
const layout = () => import('@/views/layout')
const routes = [
  {
    path: '/', // 打开默认的就是这个组件
    component: layout
  }
]

const router = new VueRouter({
  routes
})

export default router
