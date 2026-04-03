import { test, expect, devices } from '@playwright/test';
import fs from 'fs';

const outputDir = 'submission-assets';

async function setSliderValue(page: import('@playwright/test').Page, sliderId: string, value: number) {
  const slider = page.locator(`#${sliderId}`);
  await expect(slider).toBeVisible();
  await slider.evaluate((el: HTMLInputElement, next: number) => {
    const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    valueSetter?.call(el, String(next));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
  await expect(slider).toHaveValue(String(value));
}

test.beforeAll(() => {
  fs.mkdirSync(outputDir, { recursive: true });
});

test('capture hero landing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Cricket ops\./i })).toBeVisible();
  await page.screenshot({ path: `${outputDir}/hero-landing.png`, fullPage: false });
});

test('capture dashboard metrics', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tea Compliance Score')).toBeVisible();
  await expect(page.getByText('Kettle Readiness Index')).toBeVisible();
  await expect(page.getByText('Biscuit Coverage Ratio')).toBeVisible();
  await expect(page.getByText('Peakhurst Panthers', { exact: false })).toBeVisible();
  await expect(page.getByText('St George Strikers', { exact: false })).toBeVisible();

  await page.screenshot({ path: `${outputDir}/dashboard-metrics.png`, fullPage: false });
});

test('capture 418 failure state', async ({ page }) => {
  await page.goto('/');
  await setSliderValue(page, 'slider-kettleReadiness', 10);
  await page.getByRole('button', { name: 'Toss Analysis' }).click();

  const responseConsole = page.getByLabel('API response output');
  await expect(responseConsole).toBeVisible();
  await expect(responseConsole).toContainText('Run Toss Analysis');
  await expect(responseConsole).not.toContainText('Awaiting tactical instruction.');
  await expect(responseConsole).toContainText('\"status\": 418');
  await expect(responseConsole).toContainText("I'm a teapot");

  await page.screenshot({ path: `${outputDir}/418-failure.png`, fullPage: false });
});

test('capture override tea protocol failure', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Override Tea Protocol' }).click();

  const responseConsole = page.getByLabel('API response output');
  await expect(responseConsole).toBeVisible();
  await expect(responseConsole).toContainText('\"status\": 418');

  await page.screenshot({ path: `${outputDir}/override-failure.png`, fullPage: false });
});

test.use({
  ...devices['iPhone 13']
});

test('capture mobile dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tea Compliance Score')).toBeVisible();

  await page.screenshot({ path: `${outputDir}/mobile-dashboard.png`, fullPage: true });
});
