import request from '../util/request'

// 获取banner
export function getBanners() {
    return request({
        url: `/cms/banners/`,
        method: 'get',
    })
}
