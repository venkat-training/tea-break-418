import { test, expect, devices } from '@playwright/test';
import fs from 'fs';

const outputDir = 'submission-assets';

async function setSliderValue(
  page: import('@playwright/test').Page,
  sliderId: string,
  value: number
) {
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

// Fixed: poll returns the actual value, not the matcher result
async function expectConsoleJson(page: import('@playwright/test').Page) {
  const responseConsole = page.getByLabel('API response output');
  await expect(responseConsole).toBeVisible();

  let result: {
    success?: boolean;
    error?: { title?: string; recoveryAction?: string; message?: string };
    meta: { action: string; httpStatus: number };
  } | null = null;

  // Poll directly — read textContent and parse until meta.action is present
  await expect(async () => {
    const body = (await responseConsole.textContent()) ?? '';
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(body) as Record<string, unknown>;
    } catch {
      throw new Error('Console text is not valid JSON yet');
    }
    const meta = parsed.meta as { action?: string; httpStatus?: number } | undefined;
    if (!meta?.action) {
      throw new Error(`meta.action not present yet. Got: ${JSON.stringify(meta)}`);
    }
    result = parsed as typeof result;
  }).toPass({ timeout: 12000, intervals: [500, 500, 500, 1000, 1000, 1000, 2000] });

  if (!result) throw new Error('Console JSON never resolved with a meta.action');
  return result;
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
  // recoveryAction contains kettle/biscuit guidance, not the action name
  expect(responseJson.error?.recoveryAction).toBeTruthy();
  expect(responseJson.error?.message).not.toContain('Awaiting tactical instruction.');

  await page.screenshot({ path: `${outputDir}/418-failure.png`, fullPage: false });
});

test('capture override tea protocol failure', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Override Tea Protocol' }).click();

  const responseJson = await expectConsoleJson(page);

  expect(responseJson.meta.action).toBe('Override Tea Protocol');
  expect(responseJson.meta.httpStatus).toBe(418);
  expect(responseJson.error?.title).toBe("I'm a teapot");

  await page.screenshot({ path: `${outputDir}/override-failure.png`, fullPage: false });
});

test.use({
  ...devices['iPhone 13']
});

test('capture mobile dashboard', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/');
  await expect(page.getByText('Tea Compliance Score')).toBeVisible();
  await page.screenshot({ path: `${outputDir}/mobile-dashboard.png`, fullPage: true });
});
