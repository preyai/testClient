import {useAuthStore} from "@/stores/authStore";


const request = async (url: string, method?: string, body?: string) => {
    const auth = useAuthStore()

    const SERVER_URL = 'https://preyai.ddns.net/frontend'

    const headers = new Headers({
        authorization: `Bearer ${auth.token}`
    })

    const response = await fetch(`${SERVER_URL}/${url}`, {

        method: method,
        headers,
        body
    })
    const json = await response.json()
    if (json && json.error && json.error === 'tokenNotFound') {
        await useAuthStore().logout()
        return json
    }
    if (!response.ok) {
        throw new Error(response.status.toString())
    }
    return json
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