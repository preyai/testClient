import {apiItem} from "@/types/data";
import addressesApi from "@/api/addresses";

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

const {getList} = addressesApi<Street>({name: 'streets', singleName: 'street'})

export {getList as getStreets}