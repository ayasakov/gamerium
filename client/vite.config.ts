import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import {glob} from 'glob';

export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, "src", "*.html")),
    },
    emptyOutDir: true,
  },
  root: path.join(__dirname, "src"),
  plugins: [react()],
  server: {
    open: true,
    port: 4000,
  },
})
