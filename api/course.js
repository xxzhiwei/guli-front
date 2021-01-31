import request from '../util/request'

// 获取课程
export function getCourses() {
    return request({
        url: `/cms/courses/`,
        method: 'get',
    })
}
