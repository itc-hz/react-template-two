/**
 * Created by shl on 2019/2/21.
 */
import axios, {AxiosRequestConfig, AxiosError, AxiosResponse, Method, AxiosInstance} from 'axios'
import {notification, message} from 'antd'
import {ERROR_CODE} from '@api/config'

interface HttpRequest {
    url: string
    method: Method
    params?: any
    data?: any
}

interface Response<T> {
    code: number
    data: T
    message: string
}

const service: AxiosInstance = axios.create({
    timeout: 60000
})

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config
    },
    (error: AxiosError) => {
        if (error.response.status === 401) {
            notification.error({message: '认证错误', description: '请重新登入后再试'})
        } else if (error.response.status === 404) {
            notification.error({message: '404', description: '服务器丢了'})
        }
        Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        if (res.code !== ERROR_CODE && !(res instanceof Blob)) {
            message.error(res.message)
        }
        return response
    },
    (error: AxiosError) => {
        console.log('err' + error)
        // token过期
        if (error.response.status === 401) {
            notification.error({message: '认证错误', description: '请重新登入后再试'})
        } else if (error.response.status === 404) {
            notification.error({message: '404', description: '服务器丢了'})
        } else {
            notification.error({
                message: '错误',
                description: typeof error === 'object' ? error.message || error.response.data.message : error
            })
        }
        return Promise.reject(error)
    }
)

export function HTTP<T>({url, method, data}: HttpRequest): Promise<Response<T>> {
    const req = {
        url: url,
        method: method || 'get',
        data: data,
        // headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Connection': 'keep-alive'},
        params: data
    }

    if (req.method.toLowerCase() === 'post') {
        /* if (postfile) {
             req.headers = {'Content-Type': 'multipart/form-data'}
         } else {
             // req.headers = {'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'Connection': 'keep-alive'}
             if (!isformdata) {
                 // req.data = JSON.stringify(req.data)
             }
         } */
        delete req.params
    } else {
        delete req.data
    }
    return service.request<Response<T>>(req).then((res: AxiosResponse) => res.data)
}
