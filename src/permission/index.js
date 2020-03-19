// 这个是路由守卫的文件
import router from '@/router' // 引入路由
import store from '@/store' // 引入需要共享的数据

router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user')) {
    if (store.state.user.token) { // 判断有token直接放过
      next()
    } else { // 判断 没有token 记录当前的query
      router.push({
        path: '/login',
        query: {
          // to 是要去的地址栏
          redirectUrl: to.fullPath
        }
      })
    }
  } else {
    // 如果不包括user的query就直接放过
    next()
  }
})
