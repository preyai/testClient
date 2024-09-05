import {ComponentRef} from "@ionic/core"
import {ActionSheetButton, modalController} from "@ionic/vue";
import IssueAddComment from "@/components/IssueAddComment.vue";
import IssueAddFile from "@/components/IssueAddFile.vue";
import IssueAction from "@/components/IssueAction.vue";
import {IssueData} from "@/types/tt";
import {useI18n} from "vue-i18n";
import api from "@/api";
import {useTtStore} from "@/stores/ttStore";

const specialActions = [
    "saAddComment",
    "saAddFile",
    "saAddSingleFile",
    "saAddSingleFileQuiet",
    "saAssignToMe",
    "saWatch",
    "saDelete",
    "saSubIssue",
    "saCoordinate",
    "saLink",
]

export const useActions = () => {

    const {t} = useI18n()
    const tt = useTtStore()

    const getActionLabel = (action: string) => {
        let text: string;
        if (action.at(0) === '!')
            text = action.slice(1);
        else
            text = action

        if (specialActions.includes(text))
            return t(`tt.${text}`);
        else
            return text
    }

    const getButtons = (issue: IssueData): ActionSheetButton[] => {
        return Object.values(issue.actions || {}).map(i => {
            if (i === "-") {
                // Создаем объект разделителя
                return {role: 'separator', disabled: true};
            }
            return {
                text: getActionLabel(i),
                handler: () => initAction(i),
            };
        })
    }

    const initAction = (_name: string) => {
        let name = _name
        const withoutAccept = name.at(0) === '!'
        if (withoutAccept)
            name = name.slice(1)
        if (specialActions.includes(name))
            switch (name) {
                case "saAddComment":
                    openModal(IssueAddComment)
                    break;
                case "saAddFile":
                    openModal(IssueAddFile)
                    break;
                default:
                    console.log(name)
            }
        else if (withoutAccept)
            doAction(name)
                .then(() => ({}))
        else
            openModal(IssueAction, {name})
    }

    const openModal = (component: ComponentRef, props?: any) => {
        modalController.create({
            component: component,
            componentProps: props
        }).then(modal => modal.present())
    }

    const doAction = async (action: string, set?: any) => {
        await api.put(`tt/action/${tt.issue?.issue.issueId}`, {
            action,
            set
        });
        if (tt.issue)
            return tt.setIssue(tt.issue.issue.issueId)
    }

    return {
        getActionLabel,
        getButtons,
        doAction,
        initAction
    }
}