import {Project} from "@/types/tt";
import {useTtStore} from "@/stores/ttStore";
import IssueIonSelect from "@/components/IssueIonSelect.vue";
import {onMounted, ref} from "vue";
import api from "@/api";
import {IonInput, IonTextarea} from "@ionic/vue";
import {useI18n} from "vue-i18n";
import IssueFileInput from "@/components/IssueFileInput.vue";

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

    const getCustomFieldComponent = (fieldId: string, project: Project) => {
        const cf = tt.meta?.customFields.find(cf => cf.field === fieldId)
        if (!cf)
            return
        let component;
        const props: Record<string, any> = {
            id: "_cf_" + fieldId,
            field: cf.field,
            labelPlacement: 'floating',
            label: cf.fieldDisplay || fieldId
        };
        const slots: Record<string, any> = {};

        switch (cf.type) {
            case "text":
                component = IonInput;
                props.readonly = cf.editor === "text-ro";
                props.type = cf.editor;
                break;
            case "select":
                component = IssueIonSelect;
                props.variants = cf.options.map(option => option.option);
                props.text = cf.options.reduce((acc, item) => ({
                    ...acc,
                    [item.option]: item.optionDisplay
                }), {} as Record<string, string>);
                props.multiple = cf.format?.includes("multiple");
                break;
            case "array":
                component = IssueIonSelect;
                props.variants = []; // Здесь можно добавить обработку для массивов, если необходимо
                props.multiple = true;
                props.tags = true;
                props.createTags = true;
                break;
            case "geo":
                component = IonInput;
                // Специфическая обработка для геоданных, можно добавить запросы API, если нужно
                break;
            case "users":
                component = IssueIonSelect;
                props.variants = getPeoples(project);
                props.multiple = cf.format?.includes("multiple");
                break;
            default:
                component = IonInput;
                break;
        }

        return {component, props, slots};
    };

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

        if (field.substring(0, 4) !== "_cf_")
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
                case "attachments":
                    component = IssueFileInput
                    break;
                default:
                    component = IonInput
                    break
            }
        else {
            const fieldId = field.substring(4)
            const cf = getCustomFieldComponent(fieldId, project);
            if (cf)
                return cf
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