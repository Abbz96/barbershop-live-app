import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind v4 runs as a Vite plugin — no tailwind.config.js or PostCSS setup needed.
  plugins: [react(), tailwindcss()],
})
