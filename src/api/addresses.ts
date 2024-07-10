import api from "@/api/index";

const url = 'addresses'

const addressesApi = <T>({name, singleName}: {
    name: string,
    singleName: string
}) => {

    const getList = async (query?: Record<string, string | number | undefined>): Promise<T[]> => {
        const params: Record<string, string> = {
            include: name,
        };

        for (const key in query) {
            const value = query[key];
            if (value)
                params[key] = value.toString()
        }

        const data = await api.get(`${url}/${url}`, params)

        return data.addresses[name]
    }

    const getItem = async (_id: number) => {
        const data = await api.get(`${url}/${singleName}/${_id}`)
        return data[singleName]
    }

    const updateItem = async (_id: number, data: Record<string, string>) => {
        await api.put(`${url}/${singleName}`, {_id, ...data})
    }

    return {
        getList,
        getItem,
        updateItem,
    }
}

export default addressesApi