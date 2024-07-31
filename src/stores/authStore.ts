import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import useStorage from "@/hooks/useStorage";
import api from "@/api";
import {useRouter} from "vue-router";


export const useAuthStore = defineStore('auth', () => {
    // Состояние
    const isAuthenticated = ref(false);
    const user = ref<string | null>(null);
    const token = ref<string | null>(null);
    const storage = useStorage()
    const router = useRouter()

    // Действия
    async function login(credentials: {
        login: string;
        password: string;
        rememberMe?: boolean;
        ua?: string;
        did?: string
    }) {
        // const storage = await getStorage();
        const response = await fetch('https://preyai.ddns.net/frontend/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const {token: fetchedToken} = data;

        isAuthenticated.value = true;
        user.value = credentials.login;
        token.value = fetchedToken;

        await storage.set('user', credentials);
        await storage.set('token', fetchedToken);
        return true
    }

    async function logout() {
        isAuthenticated.value = false;
        user.value = null;
        token.value = null;

        await storage.remove('user');
        await storage.remove('token');

        await router.replace('/login')
    }

    async function loadAuthState() {
        const storedUser = await storage.get('user');
        const storedToken = await storage.get('token');

        user.value = storedUser || null;
        token.value = storedToken || null;

        if (storedToken) {
            isAuthenticated.value = true
            api.post('server/ping')
                .catch(error => {
                    if (error.message === '403' || error.message === '401')
                        logout()
                });
        }
    }

    // Геттеры
    const getters = {
        isAuthenticated: computed(() => isAuthenticated.value),
        user: computed(() => user.value),
        token: computed(() => token.value),
    };

    return {
        login,
        logout,
        loadAuthState,
        ...getters,
    };
});
