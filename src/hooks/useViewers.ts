import {onMounted, onUnmounted, Ref} from "vue";
import parseFloatEx from "@/utils/parseFloatEx";
import api from "@/api";
import dayjs from "dayjs";
import parseIntEx from "@/utils/parseIntEx";
import {DetailIssue} from "@/types/tt";
import useAlert from "@/hooks/useAlert";
import {useTtStore} from "@/stores/ttStore";

declare global {
    interface Window {
        parseFloatEx?: typeof parseFloatEx;
    }
}

// Интерфейс для функции getViewer
interface GetViewer {
    (value: any, issue: DetailIssue, field: string, state: Ref<string | undefined>): any;
}

// Интерфейс для хука useViewers
export interface UseViewers {
    getViewer: (code: string) => GetViewer;
}

const useViewers = (): UseViewers => {

    const tt = useTtStore()
    const alerts = useAlert()

    const setGlobals = () => {
        if (!window.parseFloatEx)
            window.parseFloatEx = parseFloatEx
    }

    const removeGlobals = () => {
        if (window.parseFloatEx)
            delete window.parseFloatEx
    }

    const getViewer = (code: string): GetViewer => {
        const utils = {
            api,
            dayjs,
            tt,
            alerts,
            parseFloatEx
        }
        const f = new Function('value', 'issue', 'field', 'target', 'filter', 'text', 'utils', code)

        return (value, issue, field, state) => f(value, issue, field, 'pwa', null, state, utils)
    }

    onMounted(setGlobals)
    onUnmounted(removeGlobals)

    return {getViewer}
}

export default useViewers