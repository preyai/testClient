import {useAuthStore} from "@/stores/authStore";


const request = async (url: string, method?: string, body?: string) => {
    const auth = useAuthStore()

    const SERVER_URL = 'https://rbt-demo.lanta.me/frontend'

    const headers = new Headers({
        authorization: `Bearer ${auth.token}`
    })

    const response = await fetch(`${SERVER_URL}/${url}`, {

        method: method,
        headers,
        body
    })
    if (!response.ok) {
        throw new Error(response.status.toString());
    }
    return await response.json()
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

export default {get, post, put}