import request from '../util/request'

// 获取课程
export function getCourses(params) {
    return request({
        url: `/edu/courses/`,
        method: 'get',
        headers: {
            noToken: true
        },
        params
    })
}

// 获取课程详细信息
export function getCourseById(courseId) {
    return request({
        url: `/edu/courses/${courseId}`,
        method: 'get',
        headers: {
            noToken: true
        }
    })
}