import {ComponentRef} from "@ionic/core";
import {modalController} from "@ionic/vue";

const useModal = () => {
    const openModal = (component: ComponentRef, props?: any) => {
        modalController.create({
            component: component,
            componentProps: props
        }).then(modal => modal.present())
    }

    return {openModal};
}

export default useModal