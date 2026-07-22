import { defineConfig } from 'vite'

export default defineConfig({
  base: '/weblarek/',
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
})