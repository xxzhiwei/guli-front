// // import Vue from 'vue'
// import Vuex from 'vuex'
// import jsCookie from 'js-cookie'

// const userInfo = jsCookie.getJSON('userInfo')
// const token = jsCookie.get('token')
// const expiresTime = jsCookie.get('expiresTime')
// console.log(userInfo, token, expiresTime);

// // 如果在函数里创建store时，会出现数据不同步的问题（可能以这种方式创建的store，是不相关的对象）
// // 修改为：在函数中返回创建好的对象
// const store = new Vuex.Store({
//     state: {
//         token: token || '',
//         expiresTime: expiresTime ? +expiresTime : 0,
//         userInfo: userInfo || {}
//     },
//     mutations: {
//         saveUserInfo(state, userInfo) {
//             state.userInfo = userInfo
//             jsCookie.set('userInfo', userInfo)
//         },
//         saveTokenR(state, tokenR) {
//             const { token, expiresDays, expiresTime } = tokenR
//             state.token = token
//             state.expiresTime = expiresTime
//             jsCookie.set('token', token, { expires: expiresDays })
//             jsCookie.set('expiresTime', expiresTime)
//         }
//     }
// })

// export default function createStore () {
//     return store
// }