import request from '../util/request'

// 会员登录
export function login(params) {
    return request({
        url: `/ucenter/member/login/`,
        method: 'post',
        data: params,
        headers: {
            noToken: true
        }
    })
}

// 注册会员
export function register(params) {
    return request({
        url: `/ucenter/member/register/`,
        method: 'post',
        data: params,
        headers: {
            noToken: true
        }
    })
}

// 获取(登录后在请求)
export function getUserInfo() {
    return request({
        url: `/ucenter/member/`,
        method: 'get',
    })
}