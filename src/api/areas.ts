import api from "@/api";
import {apiItem} from "@/types/data";

export interface Area extends apiItem {
    "areaId": number,
    "areaUuid": string,
    "areaWithType": string,
    "areaType": string,
    "areaTypeFull": string,
    "area": string,
    "timezone": string
    "regionId": number,
}

const listUrl = 'addresses/addresses'
const singleUrl = 'addresses/area'

const getAreas = async () => {
    const params: Record<string, string> = {
        include: 'areas',
    }

    const data = await api.get(listUrl, params)

    return data.addresses.areas
}

export {getAreas}