import request from '../util/request'

// 会员登录
export function login(params) {
    return request({
        url: `/ucenter/member/login/`,
        method: 'post',
        data: params
    })
}

// 获取注册会员
export function register(params) {
    return request({
        url: `/ucenter/member/register/`,
        method: 'post',
        data: params
    })
}