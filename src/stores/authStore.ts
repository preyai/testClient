import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import api from "@/api";
import {useRouter} from "vue-router";
import {Preferences} from "@capacitor/preferences";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = defineStore('auth', () => {
    // Состояние
    const isAuthenticated = ref(false);
    const user = ref<string | null>(null);
    const token = ref<string | null>(null);
    const did = ref<string | null>(null);
    const router = useRouter()

    // Действия
    async function login(credentials: {
        login: string;
        password: string;
        rememberMe?: boolean;
    }) {
        const response = await fetch(`${SERVER_URL}/authentication/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...credentials, ...{did: did.value || ''}}),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const {token: fetchedToken} = data;

        user.value = credentials.login;
        token.value = fetchedToken;
        isAuthenticated.value = true;

        await Preferences.set({
            key: 'user',
            value: credentials.login,
        });
        await Preferences.set({
            key: 'token',
            value: fetchedToken,
        });
        return true
    }

    async function logout() {
        isAuthenticated.value = false;
        user.value = null;
        token.value = null;

        await Preferences.remove({key: 'user'});
        await Preferences.remove({key: 'token'});

        await router.replace('/login')
    }

    async function loadAuthState() {
        const storedUser = await Preferences.get({key: 'user'});
        const storedToken = await Preferences.get({key: 'token'});
        const storedDid = await Preferences.get({key: 'did'});

        if (!storedDid.value) {
            try {
                const uid = crypto.randomUUID();
                await Preferences.set({key: 'did', value: uid});
                did.value = uid;
            } catch (error) {
                console.warn(error);
            }
        }

        user.value = storedUser.value || null;
        token.value = storedToken.value || null;
        did.value = storedDid.value || null;

        if (storedToken.value) {
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
