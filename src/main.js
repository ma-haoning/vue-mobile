import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 引入vant模块
import plugin from '@/utiles/plugin'
import 'vant/lib/index.less' // 引入vant的css样式  把原来的css样式改成less
import 'amfe-flexible' // 引入适配模块的时候需要引入 amfe-flexible
import '@/styles/index.less' // 引入全局样式
import '@/permission' // 引入路由守卫
Vue.use(Vant) // 全局使用vant  任何地方就可以直接使用vant的任何元素
Vue.use(plugin) // 全局可以使用plugin内部声明的函数
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
