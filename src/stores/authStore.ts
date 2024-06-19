import {defineStore} from 'pinia';
import {Storage} from '@ionic/storage';
import {computed, inject, ref} from 'vue';
import useStorage from "@/hooks/useStorage";

interface User {
    email: string;
    // Добавьте другие поля пользователя, если необходимо
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}


export const useAuthStore = defineStore('auth', () => {
            // Состояние
            const isAuthenticated = ref(false);
            const user = ref<User | null>(null);
            const token = ref<string | null>(null);
            const storage = useStorage()

            // Действия
            async function login(credentials: {
                login: string;
                password: string;
                rememberMe?: boolean;
                ua?: string;
                did?: string
            }) {
                // const storage = await getStorage();
                const response = await fetch('https://rbt-demo.lanta.me/frontend/authentication/login', {
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
                user.value = {email: credentials.login};
                token.value = fetchedToken;

                await storage.set('isAuthenticated', true);
                await storage.set('user', {email: credentials.login});
                await storage.set('token', fetchedToken);
                return true
            }

            async function logout() {
                // const storage = await getStorage();
                isAuthenticated.value = false;
                user.value = null;
                token.value = null;

                await storage.remove('isAuthenticated');
                await storage.remove('user');
                await storage.remove('token');
            }

            async function loadAuthState() {
                // await storage.create()
                const storedIsAuthenticated = await storage.get('isAuthenticated');
                const storedUser = await storage.get('user');
                const storedToken = await storage.get('token');

                isAuthenticated.value = storedIsAuthenticated || false;
                user.value = storedUser || null;
                token.value = storedToken || null;
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
        }
    )
;
