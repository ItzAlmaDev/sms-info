import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
const rootDir = import.meta.dirname;

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          services: path.resolve(rootDir, 'services/index.html'),
          evacuationPlanning: path.resolve(rootDir, 'evacuation-planning/index.html'),
          safetyEquipment: path.resolve(rootDir, 'safety-equipment/index.html'),
          awarenessEvents: path.resolve(rootDir, 'awareness-events/index.html'),
          about: path.resolve(rootDir, 'about/index.html'),
          contact: path.resolve(rootDir, 'contact/index.html'),
          privacy: path.resolve(rootDir, 'privacy/index.html'),
          terms: path.resolve(rootDir, 'terms/index.html'),
        },
      },
    },
    server: {
      allowedHosts: ['3000-ipmqgkfv46r7pipydacby-721a6ff6.sg2.manus.computer'],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
