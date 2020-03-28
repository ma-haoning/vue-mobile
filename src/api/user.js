// 这个是处理user用户的发送axios的请求文件
import request from '@/utiles/request' // 引入请求模块
export function login (data) {
  return request({
    url: '/authorizations', // 请求地址
    method: 'post', // 请求方式
    data// 请求的参数  es6的写法  只写变量
  })
}

// 关注用户的请求
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data// 关注用户的id
  })
}

// 取消关注用户的请求
export function unFollowUser (id) {
  return request({
    url: `/user/followings/${id}`,
    method: 'delete'
  })
}

// 获取用户的个人资料详情
export function getUserData () {
  return request({
    url: '/user'
  })
}

// 获取用户的个人资料
export function getUserInfo () {
  return request({
    url: '/user/profile'
  })
}

/****
 * 修改用户头像
 * ****/
export function updatePhoto (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data // body参数
  })
}

/******
 *  保存用户信息
 *
 * **/
export function saveUserInfo (data) {
  return request({
    url: '/user/profile',
    method: 'patch',
    data: { ...data, photo: null } // 直接将photo设置为空
  })
}
