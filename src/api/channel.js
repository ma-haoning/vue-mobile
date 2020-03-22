// 这个是获取用户频道的请求
import request from '@/utiles/request'

// 获取用户频道
export function getChannels () {
  return request({
    url: '/user/channels'
  })
}

// 获取所有的频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
