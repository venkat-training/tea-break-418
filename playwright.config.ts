import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 1,
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  // Only spin up dev server when running locally (not in Codespace against live URL)
  ...(process.env.PLAYWRIGHT_BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run dev',
          url: 'http://localhost:3000',
          reuseExistingServer: true,
          timeout: 60000
        }
      })
});
