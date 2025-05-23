import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
 
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base : '/rx-resume-web/',
  server: {
    watch: {
      usePolling: true, 
    },
  },

})
