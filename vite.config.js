import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2007,
    proxy: {
      // Trailing slash matters: '/api/' matches real calls like
      // '/api/exams', but does NOT match a file like 'apiClient.js'
      // just because its name happens to start with "api".
      '/api/': {
        target: 'http://localhost:2008',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
