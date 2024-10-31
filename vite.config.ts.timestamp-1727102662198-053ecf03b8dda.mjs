// vite.config.ts
import legacy from "file:///home/egor/projects/testClient/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import vue from "file:///home/egor/projects/testClient/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///home/egor/projects/testClient/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///home/egor/projects/testClient/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "/home/egor/projects/testClient";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      // injectManifest:{
      //     swSrc: './src/sw.ts',
      // },
      manifest: {
        theme_color: "#007bff",
        background_color: "#FFFFFF",
        display: "standalone",
        icons: [
          {
            src: "/pwa/64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "/pwa/192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa/256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/pwa/512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/pwa/screenshot_PC.png",
            type: "image/jpg",
            sizes: "2880x1800",
            form_factor: "wide"
          },
          {
            src: "/pwa/screenshot_iPhone_XR.png",
            type: "image/jpg",
            sizes: "828x1792"
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: "module"
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9lZ29yL3Byb2plY3RzL3Rlc3RDbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Vnb3IvcHJvamVjdHMvdGVzdENsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9lZ29yL3Byb2plY3RzL3Rlc3RDbGllbnQvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXG5pbXBvcnQge1ZpdGVQV0F9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgbGVnYWN5KCksXG4gICAgICAgIFZpdGVQV0Eoe1xuICAgICAgICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICAgICAgICBzdHJhdGVnaWVzOidpbmplY3RNYW5pZmVzdCcsXG4gICAgICAgICAgICBzcmNEaXI6ICdzcmMnLFxuICAgICAgICAgICAgZmlsZW5hbWU6ICdzdy50cycsXG4gICAgICAgICAgICAvLyBpbmplY3RNYW5pZmVzdDp7XG4gICAgICAgICAgICAvLyAgICAgc3dTcmM6ICcuL3NyYy9zdy50cycsXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgbWFuaWZlc3Q6e1xuICAgICAgICAgICAgICAgIHRoZW1lX2NvbG9yOicjMDA3YmZmJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOicjRkZGRkZGJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OidzdGFuZGFsb25lJyxcbiAgICAgICAgICAgICAgICBpY29uczpbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzonL3B3YS82NC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6Jy9wd2EvMTkyLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOicvcHdhLzI1Ni5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICcyNTZ4MjU2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzonL3B3YS81MTIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY3JlZW5zaG90czpbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzonL3B3YS9zY3JlZW5zaG90X1BDLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvanBnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzOiAnMjg4MHgxODAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1fZmFjdG9yOid3aWRlJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6Jy9wd2Evc2NyZWVuc2hvdF9pUGhvbmVfWFIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9qcGcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc4Mjh4MTc5MidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnbW9kdWxlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgdGVzdDoge1xuICAgICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJ1xuICAgIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVEsb0JBQW1CO0FBQzNCLFNBQVEsZUFBYztBQU50QixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDSixjQUFjO0FBQUEsTUFDZCxZQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJVixVQUFTO0FBQUEsUUFDTCxhQUFZO0FBQUEsUUFDWixrQkFBaUI7QUFBQSxRQUNqQixTQUFRO0FBQUEsUUFDUixPQUFNO0FBQUEsVUFDRjtBQUFBLFlBQ0ksS0FBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDSSxLQUFJO0FBQUEsWUFDSixPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNJLEtBQUk7QUFBQSxZQUNKLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0ksS0FBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1Y7QUFBQSxRQUNKO0FBQUEsUUFDQSxhQUFZO0FBQUEsVUFDUjtBQUFBLFlBQ0ksS0FBSTtBQUFBLFlBQ0osTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFlBQ1AsYUFBWTtBQUFBLFVBQ2hCO0FBQUEsVUFDQTtBQUFBLFlBQ0ksS0FBSTtBQUFBLFlBQ0osTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFVBQ1g7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDRixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsRUFDakI7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
