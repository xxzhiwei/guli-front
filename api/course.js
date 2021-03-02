import request from '../util/request'

// 获取课程
export function getCourses() {
    return request({
        url: `/cms/courses/`,
        method: 'get',
    })
}

// 获取课程详细信息
export function getCourseById(courseId) {
    return request({
        url: `/cms/courses/${courseId}`,
        method: 'get',
    })
}