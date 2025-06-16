// playground/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Emular __dirname en ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: __dirname,
    plugins: [react()],
    server: { port: 5173, open: true },
    resolve: {
        alias: {
            // alias "dsl" → apunta al código fuente
            dsl: resolve(__dirname, '..', 'src')
        }
    },
    esbuild: {
        tsconfigRaw: require('./tsconfig.json')
    }
});