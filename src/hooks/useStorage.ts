import {Storage} from "@ionic/storage";
import {inject} from "vue";

const useStorage = (): Storage => {
    return inject("storage") || new Storage();
}

export default useStorage;