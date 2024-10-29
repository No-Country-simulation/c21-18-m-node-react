import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'chunk-WD72NPUI.js',
      'chunk-SL7TAUY5.js'
    ],
  },
})
