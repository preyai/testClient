import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Meta} from "@/types/tt";
import api from "@/api";

export const useTtStore = defineStore('tt', () => {
    // state
    const meta = ref<Meta>()
    const filter = ref<string>()
    // const tasks

    // actions
    const load = async () => {
        return api.get('tt/tt')
            .then(res => {
                meta.value = res.meta
            });
    }



    // getters
    const getters = {
        meta: computed(() => meta.value),
    }

    return {
        load,
        ...getters
    }
})