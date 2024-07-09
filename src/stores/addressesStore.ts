import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Region} from "@/api/regions";
import {Area} from "@/api/areas";
import {City} from "@/api/cities";
import {Settlement} from "@/api/settlements";
import {Street} from "@/api/streets";
import {House} from "@/api/houses";

export const useAddressesStore = defineStore('addresses', () => {
    // Состояние
    const region = ref<Region | null>(null)
    const area = ref<Area | null>(null)
    const city = ref<City | null>(null)
    const settlement = ref<Settlement | null>(null)
    const street = ref<Street | null>(null)
    const house = ref<House | null>(null)

    // Действия

    const selectRegion = (_region?: Region) => {
        region.value = _region || null
    }
    const selectArea = (_area?: Area) => {
        area.value = _area || null
    }
    const selectCity = (_city?: City) => {
        city.value = _city || null
    }
    const selectSettlement = (_settlement?: Settlement) => {
        settlement.value = _settlement || null
    }
    const selectStreet = (_street?: Street) => {
        street.value = _street || null
    }
    const selectHouse = (_house?: House) => {
        house.value = _house || null
    }

    // Геттеры
    const getters = {
        region: computed(() => region.value),
        area: computed(() => area.value),
        city: computed(() => city.value),
        settlement: computed(() => settlement.value),
        street: computed(() => street.value),
        house: computed(() => house.value),
    };

    return {
        selectRegion,
        selectArea,
        selectCity,
        selectSettlement,
        selectStreet,
        selectHouse,
        ...getters,
    }
})