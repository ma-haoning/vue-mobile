import Vue from 'vue'
import Vuex from 'vuex'
import { setUser, getUser, delUser } from '@/utiles/auth' // 从auth.js中引入三个函数方法

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 这个是共享的数据
    user: getUser() // 获取到token
  },
  mutations: {
    // 修改token需要在mutations中
    updateUser (state, payload) {
      state.user = payload.user // 把传过来的数据给了共享的state
      setUser(payload.user) // 保持和本地存储的内容一致
    },
    delUser (state, payload) {
      state.user = {} // 既然是删除token  把空对象赋值给state即可
      delUser() // 删除本地的缓存
    }
  },
  actions: {
  },
  modules: {
  }
})
