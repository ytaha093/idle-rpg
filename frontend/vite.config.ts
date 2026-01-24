import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";


export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],

  server: {
    host: true,
    port: 5173,

    watch: {
      usePolling: true,
      interval: 100,
    },

    allowedHosts: [
      'idle-quest.com',
      'www.idle-quest.com',
    ],

    proxy: {
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
