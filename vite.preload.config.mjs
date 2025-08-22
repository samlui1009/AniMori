import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        lib: {
          entry: 'src/preload.js',
          formats: ['cjs']
        },
        outDir: 'dist/preload',
        rollupOptions: {
          external: ['electron']
        },
        emptyOutDir: true
      }
});
