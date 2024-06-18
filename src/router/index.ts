import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import SimplePage from "@/views/SimplePage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: SimplePage
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
