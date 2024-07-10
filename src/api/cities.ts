import {apiItem} from "@/types/data";
import addressesApi from "@/api/addresses";

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

const {getList} = addressesApi<City>({name: 'cities', singleName: 'city'})

export {getList as getCities}