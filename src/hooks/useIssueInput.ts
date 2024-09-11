import {Project} from "@/types/tt";
import IssueInputText from "@/components/IssueInputText.vue";
import {useTtStore} from "@/stores/ttStore";
import IssueInputSelect from "@/components/IssueIonSelect.vue";
import {h, onMounted, ref} from "vue";
import api from "@/api";
import {IonInput, IonSelect, IonSelectOption, IonTextarea} from "@ionic/vue";
import {useI18n} from "vue-i18n";
import IssueIonSelect from "@/components/IssueIonSelect.vue";

const useIssueInput = () => {
    const tt = useTtStore()
    const {t} = useI18n()

    const users = ref()
    const groups = ref()

    // проверка на множественный выбор (если "assigned" в проекте === 3, 4, 5)
    const isMultiple = (project: Project) => [3, 4, 5].includes(project.assigned)

    const getPeoples = (project: Project) => {
        const withGroups = [0, 2, 3, 5].includes(project.assigned)
        const withUsers = [0, 1, 3, 4].includes(project.assigned)
        const result = []

        if (withGroups) {
            result.push(...project.groups.map(group => group.acronym))
        }
        if (withUsers) {
            result.push(...project.users.map(user => user.login))
        }

        return result
    }

    const getComponent = (field: string, _project?: Project) => {
        const project = _project || tt.project

        if (!project)
            throw new Error('Project not found.')

        let component
        const props: Record<string, any> = {
            field,
            project,
            labelPlacement: 'floating',
            label: t(`tt.${field}`)
        }
        const slots: Record<string, any> = {}

        switch (field) {
            case "subject":
                component = IonInput

                break;
            case "description":
            case "comment":
            case "optionalComment":
                component = IonTextarea
                break;
            case "resolution":
                return IonInput
            case "assigned":
            case "watchers":
                component = IssueIonSelect
                props['variants'] = getPeoples(project)
                props['multiple'] = isMultiple(project)
                break
            case "status":
            case "tags":
                component = IssueIonSelect
                props['variants'] = project.tags.map(tag => tag.tag)
                props['multiple'] = true
                break
            case "links":
            case "workflow":
                component = IssueIonSelect
                break
            case "commentPrivate":
                component = IssueIonSelect
                break
            default:
                component = IssueIonSelect
                break
        }
        return {
            component,
            props,
            slots
        }
    }

    onMounted(() => {
        api.get('accounts/users')
            .then(res => users.value = res.users)
        api.get('accounts/groups')
            .then(res => groups.value = res.groups)
    })

    return {getComponent}
}

export default useIssueInput