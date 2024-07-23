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
                theme_color:'#4DBA87',
                background_color:'#FFFFFF',
                icons:[
                    {
                        src:'/192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src:'/512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
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
