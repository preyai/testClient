import {apiItem} from "@/types/data";
import api from "@/api/index";

export interface City extends apiItem {
    "cityId": number,
    "cityUuid": string,
    "cityWithType": string,
    "cityType": string,
    "cityTypeFull": string,
    "city": string,
    "timezone": string,
    "areaId": number,
    "regionId": number,
}

const listUrl = 'addresses/addresses'
const singleUrl = 'addresses/city'

const getCities = async ({regionId, areaId}: { regionId?: number, areaId?: number }) => {
    const params: Record<string, string> = {
        include: 'cities',
    }

    if (regionId)
        params.regionId = regionId.toString();

    if (areaId)
        params.areaId = areaId.toString();

    const data = await api.get(listUrl, params)

    return data.addresses.cities
}

export {getCities}