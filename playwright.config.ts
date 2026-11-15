import { defineConfig } from '@playwright/test';

const root = 'http://127.0.0.1:4323';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: root },
  webServer: {
    command: 'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4323',
    url: root,
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
