// 这个是获取用户频道的请求
import request from '@/utiles/request'

export function getChannels () {
  return request({
    url: '/user/channels'
  })
}
