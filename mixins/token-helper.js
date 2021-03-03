import jsCookie from 'js-cookie'

export const tokenHelper = {
    methods: {
        saveTokenR(tokenR) {
            const { token, expiresDays, expiresTime } = tokenR
            jsCookie.set('token', token, { expires: expiresDays })
            jsCookie.set('expiresTime', expiresTime)
        },
    }
}
