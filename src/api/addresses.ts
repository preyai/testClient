import api from "@/api/index";

const addressesApi = <T>({name}: {
    name: string,
    single: string
}) => {

    const getList = async (query?: Record<string, string | number>): Promise<T[]> => {
        const params: Record<string, string> = {
            include: name,
        };

        for (const key in query) {
            params[key] = query[key].toString()
        }

        const data = await api.get(`/addresses/${name}`, params)

        return data.addresses[name]
    }
}