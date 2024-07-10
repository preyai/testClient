import {apiItem} from "@/types/data";
import addressesApi from "@/api/addresses";

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

const {getList} = addressesApi<Area>({name: 'areas', singleName: 'area'})

export {getList as getAreas}