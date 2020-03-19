// 这个文件处理大数字和请求拦截器的问题
import JSONBig from 'json-bigint' // 引入大数字模块
import axios from 'axios' // 引入sxios模块
import store from '@/store'
import router from '@/router'

const instance = axios.create({ // 创建一个axios的实例
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 这个是基地址
  transformResponse: [function (data) {
    return data ? JSONBig.parse(data) : {} // 处理大数字的函数
  }]
})

// 请求拦截器
// 第一个函数是对请求拦截器的配置的管理  第二个函数是对请求失败的处理  直接Promise.reject推出错误即可
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}` // 将token 统一注入到headers中
  }
  // 如果这里第一次登录没有token的话 也是需要返回值的 刚才的错误在于发送请求之前的拦截器没有return
  // 应该是当有token的时候设置config  当没有token的时候  不需要设置config 只需要默认的config
  // 必须有return
  return config// 必须有retun
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
// 第一个函数是对响应回来的respose的管理 第二个函数是对找不到token的操作
instance.interceptors.response.use(function (response) {
  return response.data ? response.data.data : {} // 判断返回的数据是否存在  不存在就返回一个空的对象
}, async function (error) { // error有三个配置项  分别是request.response.config
  if (error.response && error.response.status === 401) {
    if (store.state.user.refresh_token) { // 判断是否还有refresh_token 如果有发送请求重新换取
      try {
        const result = await axios({
          method: 'put', // 请求类型
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations', // 完成的url地址
          headers: { Authorization: `Bearer ${store.state.user.refresh_token}` } // 在请求头中注入refresh_token
        })
        //   await 后面就是 promise成功执行完成的逻辑
        // 新token
        // 如果成功了 应该更新失效的token
        // 直接更新vuex中的数据
        store.commit('updateUser', {
          //   载荷数据
          user: {
            // token
            token: result.data.data.token, // 最新的token
            refresh_token: store.state.user.refresh_token // 还是原来的refresh_token 14天之后过期
          }
        }) // 提交mutations 更新vuex数据
        //   你之所以会到这个位置 是因为  401, 也就意味着你之前的请求 是错误的
        //  需要把之前错误的请求再次发送出去 用axios 还是 instance呢
        return instance(error.config) // 相当于 执行之前出现401错误的请求  返回这个请求的目的 是继续执行这个请求执行链下面的内容  这里需要把新换取的token重新执行一遍
      } catch (error) {
        //   如果失败意味着 你尝试去续命 可是续命失败
        // 重新登录 重新登录之前 需要  删除掉 token 因为此时 token失效 refesh_token也失效
        store.commit('delUser')
        // 重新跳到登录页面
        router.push({
          path: '/login', // 判断是否还有refresh_token 如果没有进去登录
          query: {
            redirectUrl: router.currentRoute.fullPath // 记录当前的路由query地址 当登录的时候直接跳回原来的位置
          }
        })
      }
    } else {
      store.commit('delUser')
      router.push({
        path: '/login', // 判断是否还有refresh_token 如果没有进去登录
        query: {
          redirectUrl: router.currentRoute.fullPath // 记录当前的路由query地址 当登录的时候直接跳回原来的位置
        }
      })
    }
  }
  // 这里的return相当于还需要else
  return Promise.reject(error)
})
export default instance// 导出这个axios的实例
