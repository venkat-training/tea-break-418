import { test, expect, devices } from '@playwright/test';
import fs from 'fs';

const outputDir = 'submission-assets';

test.beforeAll(() => {
  fs.mkdirSync(outputDir, { recursive: true });
});

test('capture hero landing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
  await page.screenshot({ path: `${outputDir}/hero-landing.png`, fullPage: false });
});

test('capture dashboard metrics', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Tea Compliance Score')).toBeVisible();
  await expect(page.getByText('Kettle Readiness')).toBeVisible();
  await expect(page.getByText('Biscuit Coverage')).toBeVisible();
  await expect(page.getByText('Scoreboard')).toBeVisible();

  await page.screenshot({ path: `${outputDir}/dashboard-metrics.png`, fullPage: false });
});

test('capture 418 failure state', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByText('Run Toss Analysis').click();

  await expect(page.getByText('418')).toBeVisible();
  await expect(page.getByText("I'm a teapot")).toBeVisible();

  await page.screenshot({ path: `${outputDir}/418-failure.png`, fullPage: false });
});

test('capture override tea protocol failure', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByText('Override Tea Protocol').click();

  await expect(page.getByText('418')).toBeVisible();

  await page.screenshot({ path: `${outputDir}/override-failure.png`, fullPage: false });
});

test.use({
  ...devices['iPhone 13']
});

test('capture mobile dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Tea Compliance Score')).toBeVisible();

  await page.screenshot({ path: `${outputDir}/mobile-dashboard.png`, fullPage: true });
});