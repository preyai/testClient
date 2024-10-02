import {onMounted, onUnmounted, Ref} from "vue";
import * as vue from "vue";
import parseFloatEx from "@/utils/parseFloatEx";
import api from "@/api";
import dayjs from "dayjs";
import parseIntEx from "@/utils/parseIntEx";
import {DetailIssue} from "@/types/tt";
import useAlert from "@/hooks/useAlert";
import {useTtStore} from "@/stores/ttStore";
import useMap from "@/hooks/useMap";
import escapeHTML from "@/utils/escapeHTML";
import nl2br from "@/utils/nl2br";
import convertLinks from "@/utils/convertLinks";
import {useAuthStore} from "@/stores/authStore";
import {useActions} from "@/hooks/useActions";

// declare global {
//     interface Window {
//         parseFloatEx?: typeof parseFloatEx;
//         escapeHTML?: typeof escapeHTML;
//         nl2br?: typeof nl2br;
//         convertLinks?: typeof convertLinks;
//     }
// }

// Интерфейс для функции getViewer
interface GetViewer {
    (value: any, issue: DetailIssue, field: string): any;
}

// Интерфейс для хука useViewers
export interface UseViewers {
    getViewer: (code: string) => GetViewer;
}

const useViewers = (): UseViewers => {

    const auth = useAuthStore()
    const tt = useTtStore()
    const alerts = useAlert()
    const modals = useAlert()
    const map = useMap()
    const actions = useActions()

    // const setGlobals = () => {
    //     // if (!window.parseFloatEx)
    //     window.parseFloatEx = parseFloatEx
    //     if (!window.escapeHTML)
    //         window.escapeHTML = escapeHTML
    //     if (!window.nl2br)
    //         window.nl2br = nl2br
    //     if (!window.convertLinks)
    //         window.convertLinks = convertLinks
    // }
    //
    // const removeGlobals = () => {
    //     if (window.parseFloatEx)
    //         delete window.parseFloatEx
    //     if (window.escapeHTML)
    //         delete window.escapeHTML
    //     if (window.nl2br)
    //         delete window.nl2br
    //     if (window.convertLinks)
    //         delete window.convertLinks
    // }

    const getViewer = (code: string): GetViewer => {
        const utils = {
            vue,
            api,
            auth,
            tt,
            alerts,
            modals,
            map,
            actions,
            dayjs,
            parseFloatEx,
            escapeHTML,
            nl2br,
            convertLinks
        }
        const f = new Function('value', 'issue', 'field', 'target', 'filter', 'utils', code)

        return (value, issue, field) => f(value, issue, field, 'pwa', null, utils)
    }

    // onMounted(setGlobals)
    // onUnmounted(removeGlobals)

    return {getViewer}
}

export default useViewers