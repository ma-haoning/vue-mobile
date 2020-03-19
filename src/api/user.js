// 这个是处理user用户的发送axios的请求文件
import request from '@/utiles/request' // 引入请求模块
export function login (data) {
  return request({
    url: '/authorizations', // 请求地址
    method: 'post', // 请求方式
    data// 请求的参数  es6的写法  只写变量
  })
}
