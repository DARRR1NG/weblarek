import { defineConfig } from 'vite'

export default defineConfig({
  base: '/weblarek/',
  build: {
    outDir: 'docs'
  },
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