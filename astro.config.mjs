import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sakibmahmud.dev',
  base: process.env.SITE_BASE || '/',
  output: 'static',
});
