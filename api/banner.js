import request from '../util/request'

// 获取banner
export function getBanners() {
    return request({
        url: `/edu/banners/`,
        method: 'get',
        headers: {
            noToken: true
        }
    })
}
