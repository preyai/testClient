import {apiItem} from "@/types/data";
import addressesApi from "@/api/addresses";

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

const {getList} = addressesApi<Region>({name: 'regions', singleName: 'region'})

export {
    getList as getRegions,
}