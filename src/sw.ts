import {precacheAndRoute} from 'workbox-precaching'
import {registerRoute} from 'workbox-routing';
import {NetworkFirst, NetworkOnly} from 'workbox-strategies';
import {BackgroundSyncPlugin} from 'workbox-background-sync';

declare let self: ServiceWorkerGlobalScope
precacheAndRoute(self.__WB_MANIFEST)

const SERVER_URL = import.meta.env.VITE_SERVER_URL

// Регистрация маршрута для кеширования всех запросов к SERVER_URL
registerRoute(
    ({url}) => url.href.startsWith(SERVER_URL),
    new NetworkFirst({
        cacheName: 'api-cache',
    })
);

// Настройка BackgroundSyncPlugin
const bgSyncPlugin = new BackgroundSyncPlugin('photoUploadQueue', {
    maxRetentionTime: 48 * 60 // Хранить запросы в течение 48 часов
});

// Регистрация маршрута для обработки запросов на загрузку фотографий
registerRoute(
    ({url}) => url.href === `${SERVER_URL}/tt/file`,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);

console.log(123)
