/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {defineConfig} from 'vite'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        legacy(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest:{
                theme_color:'#007bff',
                background_color:'#FFFFFF',
                display:'standalone',
                icons:[
                    {
                        src:'/pwa/64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src:'/pwa/192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src:'/pwa/256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src:'/pwa/512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ],
                screenshots:[
                    {
                        src:'/pwa/screenshot_PC.png',
                        type: 'image/jpg',
                        sizes: '2880x1800',
                        form_factor:'wide'
                    },
                    {
                        src:'/pwa/screenshot_iPhone_XR.png',
                        type: 'image/jpg',
                        sizes: '828x1792'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => url.origin === 'https://preyai.ddns.net',
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24, // 1 день
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
            devOptions: {
                enabled: true
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    test: {
        globals: true,
        environment: 'jsdom'
    },
})
