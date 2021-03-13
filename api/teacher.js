import request from '../util/request'

export function getTeachers(params) {
    return request({
        url: `/edu/teachers/`,
        method: 'get',
        headers: {
            noToken: true
        },
        params
    })
}

export function getTeacherById(id) {
    return request({
        url: `/edu/teachers/${id}`,
        method: 'get',
        headers: {
            noToken: true
        }
    })
}
