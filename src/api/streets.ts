import api from "@/api";
import {apiItem} from "@/types/data";

export interface Street extends apiItem {
    "streetId": number,
    "streetUuid": string,
    "streetWithType": string,
    "streetType": string,
    "streetTypeFull": string,
    "street": string,
    "settlementId": number
    "cityId": number,
}

const listUrl = 'addresses/addresses'
const singleUrl = 'addresses/street'

const getStreets = async (query?: { cityId?: number, settlementId?: number }) => {
    const params: Record<string, string> = {
        include: 'streets',
    }

    if (query?.cityId)
        params.cityId = query.cityId.toString()

    if (query?.settlementId)
        params.settlementId = query.settlementId.toString()

    const data = await api.get(listUrl, params)

    return data.addresses.streets
}

export {getStreets}