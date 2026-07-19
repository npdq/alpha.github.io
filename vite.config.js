import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { copyFileSync, existsSync } from 'node:fs';

// Rewrites /<username> to /profile.html during dev so the profile router
// can parse the username from location.pathname. Static files, known pages,
// and /users/* JSON fetches are passed through untouched.
const usernameRewrite = () => ({
  name: 'username-rewrite',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = (req.url || '/').split('?')[0];
      const passthrough =
        url === '/' ||
        url === '/index.html' ||
        url === '/profile.html' ||
        url === '/404.html' ||
        url.includes('.') ||
        url.startsWith('/@') ||
        url.startsWith('/node_modules') ||
        url.startsWith('/src') ||
        url.startsWith('/assets') ||
        url.startsWith('/users') ||
        url.startsWith('/public');
      if (!passthrough) {
        const qs = req.url.includes('?') ? req.url.slice(url.length) : '';
        req.url = '/profile.html' + qs;
      }
      next();
    });
  },
});

// GitHub Pages has no rewrite rules. Its fallback for unknown paths is 404.html.
// Copying the built profile.html to 404.html means hitting /username serves the
// profile shell with a 404 status (harmless — profile.js reads location.pathname
// and renders normally).
const githubPagesFallback = () => ({
  name: 'github-pages-fallback',
  closeBundle() {
    const profile = resolve(__dirname, 'dist/profile.html');
    const fallback = resolve(__dirname, 'dist/404.html');
    if (existsSync(profile)) copyFileSync(profile, fallback);
  },
});

export default defineConfig({
  plugins: [usernameRewrite(), githubPagesFallback()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        profile: resolve(__dirname, 'profile.html'),
      },
    },
  },
});
