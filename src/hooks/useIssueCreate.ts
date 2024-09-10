import {modalController} from "@ionic/vue";
import IssueCreate from "@/components/IssueCreate.vue";

const useIssueCreate = () => {
    const openModal = () => {
        modalController.create({
            component: IssueCreate,
        }).then(modal => modal.present())
    }

    return {openModal}
}

export default useIssueCreate