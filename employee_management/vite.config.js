import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // to expose to network
    allowedHosts: [
      'ed99-136-158-78-35.ngrok-free.app' // your current ngrok domain
    ]
  }
})
