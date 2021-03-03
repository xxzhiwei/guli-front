import request from '../util/request'

// 获取课程
export function getCourses() {
    return request({
        url: `/edu/courses/`,
        method: 'get',
        headers: {
            noToken: true
        }
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