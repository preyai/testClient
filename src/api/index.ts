import {useAuthStore} from "@/stores/authStore";


const request = async (url: string, method?: string, body?: any) => {
    const auth = useAuthStore()

    // try {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL

    const headers = new Headers({
        authorization: `Bearer ${auth.token}`
    })
    const res = await fetch(`${SERVER_URL}/${url}`, {
        method: method,
        headers,
        body
    }).catch(() => {
        throw new Error(`Failed to fetch`);
    })
    const data: any = await res.json();
    if (data && data.error && data.error === 'tokenNotFound') {
        await useAuthStore().logout()
    }
    if (data.error)
        throw new Error(data.error)
    else
        return data
}

const get = async (url: string, params?: Record<string, string>) => {
    const _url = url + '?' + new URLSearchParams(params)
    return await request(_url)
}

const post = async (url: string, params?: object) => {

    const body = params ? JSON.stringify(params) : undefined
    return await request(url, 'POST', body)
}

const put = async (url: string, params: object) => {
    return await request(url, 'PUT', JSON.stringify(params))
}

const _delete = async (url: string, params?: object) => {
    return await request(url, 'DELETE', JSON.stringify(params))
}

export default {request, get, post, put, delete: _delete}