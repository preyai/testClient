import {ComponentRef} from "@ionic/core"
import {modalController} from "@ionic/vue";
import IssueAddComment from "@/components/IssueAddComment.vue";
import IssueAddFile from "@/components/IssueAddFile.vue";
import IssueAction from "@/components/IssueAction.vue";

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
        else
            openModal(IssueAction, {name, withoutAccept})
    }

    const openModal = (component: ComponentRef, props?: any) => {
        modalController.create({
            component: component,
            componentProps: props
        }).then(modal => modal.present())
    }

    return {
        initAction
    }
}