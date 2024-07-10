import {apiItem} from "@/types/data";
import addressesApi from "@/api/addresses";

export interface House extends apiItem {
    houseId: number,
    settlementId: number | null,
    streetId: number,
    houseUuid: string,
    houseType: string,
    houseTypeFull: string,
    houseFull: string,
    house: string,
    companyId: number | null,
}

const {getList, updateItem} = addressesApi<House>({name: 'houses', singleName: 'house'})

export {
    getList as getHouses,
    updateItem as updateHouse
}