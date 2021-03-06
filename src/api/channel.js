// 这个是获取用户频道的请求
import request from '@/utiles/request'
// 引入store
import store from '@/store'
const user = 'user_channels' // 定义用户的频道
const tourist = 'tourist_channels' // 定义游客的频道

// 获取用户频道 游客和用户 浏览器本地缓存
export function getChannels () {
  // 对原有的方式进行改造 但是不想改调用方式  就可以用promise
  return new Promise(function (resolve, reject) {
    // 如果是用户登录就把用户的频道的key赋值给他  否则就是游客
    const key = store.state.user.token ? user : tourist
    const str = window.localStorage.getItem(key)
    if (str) { // 如果浏览器的缓存中有对应的用户啊还是游客的频道 直接resolve
      resolve({ channels: JSON.parse(str) })
    } else { // 如果不存在就去调用接口  不管是游客还是用户都会有一个默认的频道接口  这个的笔记中二者公用一个接口  但是后期删除和添加频道二者会有不同的显示
      request({
        url: '/user/channels'
      }).then(res => {
        window.localStorage.setItem(key, JSON.stringify(res.channels))// 存入到浏览器的缓存中 为了对应promise的return 必须要resolve
        resolve(res)
      })
    }
  })
}

// 获取所有的频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}

// 删除浏览器本地缓存的频道数据
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    // 先判断
    const key = store.state.user.token ? user : tourist
    // 这里不可能为空 因为呢当你第一次获取页面的时候不管你是用户还是游客都会把默认的频道数据加载到你的浏览器缓存中  在本地存储中知道当前用户或者游客的频道数据  先转化正常的数组
    const channels = JSON.parse(window.localStorage.getItem(key))
    // 根据id找到索引 然后对数组进行splice
    const index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      channels.splice(index, 1)// 把这个新的数组再次存储到浏览器的本地缓存中
      window.localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('该频道不存在'))
    }
  })
}

// 添加浏览器本地缓存的频道数据
export function addChannel (channel) {
  return new Promise(function (resolve, reject) {
    // 先判断
    const key = store.state.user.token ? user : tourist
    // 这里不可能为空 因为呢当你第一次获取页面的时候不管你是用户还是游客都会把默认的频道数据加载到你的浏览器缓存中  在本地存储中知道当前用户或者游客的频道数据  先转化正常的数组
    const channels = JSON.parse(window.localStorage.getItem(key))
    // 从后添加数据
    channels.push(channel)
    window.localStorage.setItem(key, JSON.stringify(channels))
    resolve()
  })
}
