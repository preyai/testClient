import {apiItem} from "@/types/data";
import addressesApi from "@/api/addresses";

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

const {getList} = addressesApi<Settlement>({name: 'settlements', singleName: 'settlement'})

export {getList as getSettlements}