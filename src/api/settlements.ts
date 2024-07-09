import api from "@/api";
import {apiItem} from "@/types/data";

export interface Settlement extends apiItem {
    "settlementId": number,
    "settlementUuid": string,
    "settlementWithType": string,
    "settlementType": string,
    "settlementTypeFull": string,
    "settlement": string,
    "areaId": number
    "cityId": number,
}

const listUrl = 'addresses/addresses'
const singleUrl = 'addresses/settlement'

const getSettlements = async () => {
    const params: Record<string, string> = {
        include: 'settlements',
    }

    const data = await api.get(listUrl, params)

    return data.addresses.settlements
}

export {getSettlements}