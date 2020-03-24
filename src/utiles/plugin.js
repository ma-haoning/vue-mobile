import dayjs from 'dayjs' // 引入时间模块
import 'dayjs/locale/zh-cn'// 中文显示
import relTime from 'dayjs/plugin/relativeTime' // 引入相对时间的格式
dayjs.extend(relTime) // 给dayjs添加这个相对时间
// 这个是封装小插件的文件
export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep// 延迟函数
    Vue.filter('relativeTimer', relativeTime)// 给Vue全局使用相对时间
  }
}

function sleep (time = 500) { // 延迟处理函数 time默认是500ms 也可以去调用的时候自己定义
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}

function relativeTime (value) {
  return dayjs().locale('zh-cn').from(value) // 从当前时刻到显示的页面上的时间的相对时间
}
