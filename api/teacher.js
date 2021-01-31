import request from '../util/request'

// 获取热门讲师
export function getTeachers() {
    return request({
        url: `/cms/teachers/`,
        method: 'get',
    })
}
