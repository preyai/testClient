import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import AddressesPage from "@/views/AddressesPage.vue";
import RegionsPage from "@/views/RegionsPage.vue";
import AreasPage from "@/views/AreasPage.vue";
import CitiesPage from "@/views/CitiesPage.vue";
import SettlementsPage from "@/views/SettlementsPage.vue";
import StreetsPage from "@/views/StreetsPage.vue";
import HousesPage from "@/views/HousesPage.vue";
import MainPage from "@/views/MainPage.vue";
import LoginPage from '@/views/LoginPage.vue';
import {useAuthStore} from "@/stores/authStore";
import SimplePage from "@/views/SimplePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import IssuesPage from "@/views/IssuesPage.vue";
import FiltersPage from "@/views/FiltersPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/',
        component: MainPage,
        children: [
            {
                path: 'addresses',
                component: SimplePage,
                children: [
                    {
                        path: '',
                        component: AddressesPage,
                    },
                    {
                        path: 'regions',
                        component: RegionsPage,
                    },
                    {
                        path: 'areas',
                        component: AreasPage,
                    },
                    {
                        path: 'cities',
                        component: CitiesPage,
                    },
                    {
                        path: 'settlements',
                        component: SettlementsPage,
                    },
                    {
                        path: 'streets',
                        component: StreetsPage,
                    },
                    {
                        path: 'houses',
                        component: HousesPage,
                    },
                ]
            },
            {
                path: 'tt',
                component: SimplePage,
                children: [
                    {
                        path: '',
                        redirect:'/tt/filters'
                        // component: SimplePage
                    },
                    {
                        path: 'issues',
                        component: IssuesPage,
                    },
                    {
                        path: 'filters',
                        component: FiltersPage,
                    }
                ]
            },
            {
                path: 'settings',
                component: SimplePage,
                children: [
                    {
                        path: '',
                        component: SettingsPage
                    }
                ]
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
    if (to.path === '/')
        return '/addresses'
})

export default router
