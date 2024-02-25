import { Request } from './config'


export const login = (username, password) => new Promise((resolve, reject) => {

    Request.post('/auth/sign-in', { username, password }).then((res) => {
        resolve(res)
    }).catch((err) => {
        reject(err)
    })
})