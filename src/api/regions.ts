import api from "@/api";
import {apiItem} from "@/types/data";

export interface Region extends apiItem {
    "regionId": number,
    "regionUuid": string,
    "regionIsoCode": string,
    "regionWithType": string,
    "regionType": string,
    "regionTypeFull": string,
    "region": string,
    "timezone": string
}

const listUrl = 'addresses/addresses'
const singleUrl = 'addresses/region'

const getRegions = async () => {
    const params: Record<string, string> = {
        include: 'regions',
    }

    const data = await api.get(listUrl, params)

    return data.addresses.regions
}

export {getRegions}