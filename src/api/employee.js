import request from '@/utils/request'

export function getEmployee(query) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params: query
  })
}