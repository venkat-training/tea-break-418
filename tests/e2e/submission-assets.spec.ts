import { test, expect, devices } from '@playwright/test';
import fs from 'fs';

const outputDir = 'submission-assets';

async function setSliderValue(page: import('@playwright/test').Page, sliderId: string, value: number) {
  const slider = page.locator(`#${sliderId}`);
  await expect(slider).toBeVisible();
  await slider.evaluate((el: HTMLInputElement, next: number) => {
    const valueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    valueSetter?.call(el, String(next));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
  await expect(slider).toHaveValue(String(value));
}

async function expectConsoleJson(page: import('@playwright/test').Page) {
  const responseConsole = page.getByLabel('API response output');
  await expect(responseConsole).toBeVisible();

  const text = await expect
    .poll(async () => {
      const body = (await responseConsole.textContent()) ?? '';
      try {
        const parsed = JSON.parse(body) as {
          meta?: { action?: string; httpStatus?: number };
        };

        if (!parsed.meta?.action) {
          return null;
        }

        return parsed;
      } catch {
        return null;
      }
    }, {
      timeout: 10000,
      message: 'Timed out waiting for action response to replace the default console payload.'
    })
    .not.toBeNull();

  return text as {
    success?: boolean;
    error?: { title?: string; recoveryAction?: string; message?: string };
    meta: { action: string; httpStatus: number };
  };
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
  const tossAnalysisAction = page.getByRole('button', { name: 'Toss Analysis' });
  await expect(tossAnalysisAction).toBeEnabled();
  await tossAnalysisAction.click();

  const responseJson = await expectConsoleJson(page);

  expect(responseJson.meta.action).toBe('Run Toss Analysis');
  expect(responseJson.meta.httpStatus).toBe(418);
  expect(responseJson.error?.title).toBe("I'm a teapot");
  expect(responseJson.error?.recoveryAction).toContain('Run Toss Analysis');
  expect(responseJson.error?.message).not.toContain('Awaiting tactical instruction.');

  await page.screenshot({ path: `${outputDir}/418-failure.png`, fullPage: false });
});

test('capture override tea protocol failure', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Override Tea Protocol' }).click();

  const responseJson = await expectConsoleJson(page);

  expect(responseJson.meta.action).toBe('Override Tea Protocol');
  expect(responseJson.meta.httpStatus).toBe(418);

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
