import {Storage} from "@ionic/storage";
import {App} from "vue";

export default {
    install: async (app: App) => {
        const storage = new Storage();

        app.config.globalProperties.$ionicStorage = storage
        app.provide('storage', storage);
        await storage.create()
    }
}