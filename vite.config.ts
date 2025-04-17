import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "LOTR-Mini-Games",
  plugins: [react()],
})
