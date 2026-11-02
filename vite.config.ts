import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Extract repository name from GitHub Actions or explicit env vars, ensuring proper leading and trailing slashes
  const rawRepo = process.env.GITHUB_REPOSITORY || process.env.BASE_PATH || process.env.VITE_BASE_PATH || '';
  let repoBase = './';

  if (rawRepo) {
    const repoName = rawRepo.includes('/') ? rawRepo.split('/')[1] : rawRepo;
    const cleanRepoName = repoName.replace(/^\/+|\/+$/g, '');
    if (cleanRepoName) {
      repoBase = `/${cleanRepoName}/`;
    }
  }

  return {
    base: repoBase,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
