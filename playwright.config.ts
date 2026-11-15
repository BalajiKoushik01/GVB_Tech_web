import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1',
    url: 'http://localhost:3000/tools/weavecore',
    reuseExistingServer: !process.env.CI,
  },
});
