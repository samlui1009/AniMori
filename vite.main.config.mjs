import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        lib: {
          entry: 'src/main.js',
          formats: ['cjs']
        },
        outDir: 'dist/main',
        rollupOptions: {
          external: ['electron', 'better-sqlite3']
        },
        emptyOutDir: true
      }
});
