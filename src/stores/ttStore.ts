import {defineStore} from "pinia";
import {computed, onMounted, ref} from "vue";
import {Meta, Project} from "@/types/tt";
import api from "@/api";

export const useTtStore = defineStore('tt', () => {
    // state
    const meta = ref<Meta>()
    const project = ref<Project>()
    const filter = ref<string>()
    // const tasks

    // actions
    const load = async () => {
        return api.get('tt/tt')
            .then(res => {
                meta.value = res.meta
            });
    }

    const setProject = (value?: Project) => {
        project.value = value
    }

    const setFilter = (value?: string) => {
        filter.value = value
    }

    const loadIssues = () => {
        return api.get('tt/issues', {
            project: 'TT',
            filter: 'all',
            skip: '0',
            limit: '50'
        });
    }

    // getters
    const getters = {
        meta: computed(() => meta.value),
        project: computed(() => project.value),
        filter: computed(() => filter.value),
    }

    onMounted(load)

    return {
        load,
        setProject,
        setFilter,
        loadIssues,
        ...getters
    }
})