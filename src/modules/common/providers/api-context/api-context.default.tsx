import { AxiosInstance } from 'axios'
import axiosInstance from './axios.instance'

export type ApiContext = {
    client: AxiosInstance
    setAuthorizationToken: (token?: string) => void
}

export const DEFAULT_API_CONTEXT = Object.freeze({
    client: axiosInstance,
    setAuthorizationToken(token?: string) {
        /*if (token) {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
        } else {*/
        const basicToken = `admin:admin`
        const encodedToken = Buffer.from(basicToken).toString('base64')
        axiosInstance.defaults.headers.common.Authorization = `Basic ${encodedToken}`
        //}
    },
})

export function getApiContext() {
    return DEFAULT_API_CONTEXT
}
