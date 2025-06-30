import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

    build: {
        chunkSizeWarningLimit: 200 * 1024,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    const fileName = assetInfo.name || '';
                    const extType = fileName.split('.').pop();

                    if (extType) {
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            return `static/img/[name]-[hash][extname]`;
                        } else if (/woff|woff2/.test(extType)) {
                            return `static/css/[name]-[hash][extname]`;
                        } else {
                            return `static/other/[name]-[hash][extname]`;
                        }
                    } else {
                        return `static/other/[name]-[hash][extname]`;
                    }
                },
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5174,
        strictPort: true,
    },
});
