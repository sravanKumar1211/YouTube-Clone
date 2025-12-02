import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,        // 🔥 Force frontend to always run on this port
    strictPort: true,  // 🔥 Do NOT allow Vite to switch to any other port
  }
})
