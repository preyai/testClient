import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import SimplePage from "@/views/SimplePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import AddressesPage from "@/views/AddressesPage.vue";
import {useAuthStore} from "@/stores/authStore";
import DomophonesPage from "@/views/DomophonesPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/',
        component: SimplePage,
        children: [
            {
                path: 'addresses',
                component: AddressesPage
            },
            {
                path: 'intercoms',
                component: DomophonesPage
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated)
        await authStore.loadAuthState()
    if (to.name !== 'Login' && !authStore.isAuthenticated)
        return '/login'

})

export default router
