import api from "@/api";

export interface House {
    houseId: number,
    settlementId: number | null,
    streetId: number,
    houseUuid: string,
    houseType: string,
    houseTypeFull: string,
    houseFull: string,
    house: string,
    companyId: number | null,

    [key: string]: any
}

const listUrl = 'addresses/addresses'
const singleUrl = 'addresses/house'

const getHouses = async (houseId?: number): Promise<House[]> => {
    const params: Record<string, string> = {
        include: 'houses',
    }

    if (houseId)
        params['houseId'] = houseId.toString()

    const data = await api.get(listUrl, params)

    return data.addresses.houses
}

const updateHouse = async (houseId: number, data: Record<string, string>) => {
    await api.put(`${singleUrl}`, {_id: houseId, ...data})
}

export {getHouses, updateHouse}