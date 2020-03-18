import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 引入vant模块
import 'vant/lib/index.css' // 引入vant的css样式
import 'amfe-flexible' // 引入适配模块的时候需要引入 amfe-flexible
import '@/styles/index.less' // 引入全局样式
Vue.use(Vant) // 全局使用vant  任何地方就可以直接使用vant的任何元素

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
