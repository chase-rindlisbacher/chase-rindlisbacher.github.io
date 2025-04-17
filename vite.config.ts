import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/chase-rindlisbacher.github.io/",
  plugins: [react()],
})
