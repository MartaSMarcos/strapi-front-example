import axios from 'axios'
import { v4 as uuid } from 'uuid'

const isServer = typeof window === 'undefined'
const baseURL = isServer
    ? process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
    : '/api'

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-EN',
    },
})

axiosInstance.interceptors.request.use(async (config) => {
    config.headers['X-Request-ID'] = uuid()
    return config
})

export default axiosInstance
