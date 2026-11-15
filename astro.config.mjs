import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sakib1263.github.io',
  base: process.env.SITE_BASE || '/',
  output: 'static',
});
