import request from '../util/request'

/**
 * 获取课程列表
 */
export function getSubjectTreeNodes() {
    return request({
        url: '/edu/subjects/treeNodes',
        method: 'get'
    })
}