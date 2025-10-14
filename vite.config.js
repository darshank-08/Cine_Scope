import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Cine_Scope/', // e.g., '/movie-app/'
  plugins: [react()]
})
