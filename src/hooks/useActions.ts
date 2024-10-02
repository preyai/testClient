import {ComponentRef} from "@ionic/core"
import {ActionSheetButton, alertController, modalController} from "@ionic/vue";
import IssueAddComment from "@/components/IssueAddComment.vue";
import IssueAddFile from "@/components/IssueAddFile.vue";
import IssueAction from "@/components/IssueAction.vue";
import {IssueData} from "@/types/tt";
import {useI18n} from "vue-i18n";
import api from "@/api";
import {useTtStore} from "@/stores/ttStore";
import useModal from "@/hooks/useModal";

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
    const {openModal} = useModal()

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
                case "ttSaAddSingleFile":
                    openModal(IssueAddFile)
                    break;
                default:
                    console.log(name)
            }
        else if (withoutAccept)
            tt.doAction(name)
                .catch((error) => {
                    alertController.create({
                        header: 'Что то пошло не так',
                        message: error.message,
                        buttons: ['Ok'],
                    })
                        .then((alert) => alert.present())
                })
        else
            openModal(IssueAction, {name})
    }

    return {
        getActionLabel,
        getButtons,
        initAction
    }
}