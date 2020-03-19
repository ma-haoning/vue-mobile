// 这个是封装小插件的文件
export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
  }
}

function sleep (time = 500) { // 延迟处理函数 time默认是500ms 也可以去调用的时候自己定义
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}
