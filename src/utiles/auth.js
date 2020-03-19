// 这个是本地管理token的代码
export function setUser (user) { // 这个是设置token 以user_prove为名字的token
  window.localStorage.setItem('user_prove', JSON.stringify(user)) // 这里的user是一个对象 里面有token和refresh_token
}

export function getUser () { // 这个是获取token 需要parse转换一下
  // ||的意思表示前面是true 就用前面的数据 前面为false则用后面的数据
  return JSON.parse(window.localStorage.getItem('user_prove') || {})
}

export function delUser () { // 删除token的函数
  window.localStorage.removeItem('user_peove')
}
