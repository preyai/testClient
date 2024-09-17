import {actionSheetController, modalController} from "@ionic/vue";
import IssueCreate from "@/components/IssueCreate.vue";
import {useI18n} from "vue-i18n";

const useIssueCreate = () => {

    const {t} = useI18n()
    const openActions = () => {
        actionSheetController.create({
            header: t('tt.actions'),
            buttons: [
                {
                    text: t('tt.createIssue'),
                    handler: openModal
                },
                {
                    text: t('base.cancel'),
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                },
            ],
        }).then(actionSheet => actionSheet.present());

    }

    const openModal = () => {
        modalController.create({
            component: IssueCreate,
        }).then(modal => modal.present())
    }

    return {openModal, openActions}
}

export default useIssueCreate