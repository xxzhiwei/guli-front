import request from '../util/request'

// 获取热门讲师
export function getTeachers() {
    return request({
        url: `/edu/teachers/`,
        method: 'get',
        headers: {
            noToken: true
        }
    })
}
