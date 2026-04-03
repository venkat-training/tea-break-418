import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

// Helper to wait for console response to update
async function waitForConsoleUpdate(page: Page, expectedText: string, timeout = 8000) {
  await expect(
    page.locator('pre[aria-live="polite"]')
  ).toContainText(expectedText, { timeout });
}

async function setSliderValue(page: Page, sliderId: string, value: number) {
  const slider = page.locator(`#${sliderId}`);
  await expect(slider).toBeVisible();
  await slider.evaluate((el: HTMLInputElement, next: number) => {
    el.value = String(next);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
  await expect(slider).toHaveValue(String(value));
}

async function getMetricValue(page: Page, label: string): Promise<number> {
  const valueText = await page
    .locator('p', { hasText: label })
    .first()
    .locator('xpath=following-sibling::p[1]')
    .textContent();

  const numeric = Number((valueText || '').match(/\d+/)?.[0]);
  return numeric;
}

test.describe('Tea Break 418 — Smoke Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  // ─── 1. Hero Section ──────────────────────────────────────────────────────
  test('1. Hero section renders with correct content', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Heading
    await expect(page.getByRole('heading', { name: /Cricket ops\./i })).toBeVisible();
    await expect(page.locator('h2 span', { hasText: 'Tea-first' })).toBeVisible();

    // Tagline
    await expect(page.getByText('production dependency', { exact: false })).toBeVisible();

    // HTTP 418 badge
    await expect(page.getByText('HTTP 418 I\'m a Teapot', { exact: false })).toBeVisible();

    // Hero buttons
    await expect(page.getByRole('button', { name: /Start Match/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Emergency Tea Audit/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /View Demo/i })).toBeVisible();
  });

  // ─── 2. Start Match fires 418 with low kettle readiness ──────────────────
  test('2. Start Match returns 418 when kettle readiness is below threshold', async ({ page }) => {
    await page.getByRole('button', { name: /Start Match/i }).click();

    // Wait for response console to update
    await waitForConsoleUpdate(page, 'TEA_BREAK_ENFORCED');

    const console = page.locator('pre[aria-live="polite"]');
    const text = await console.textContent();
    const json = JSON.parse(text || '{}');

    expect(json.success).toBe(false);
    expect(json.meta.httpStatus).toBe(200);
    expect(json.data.canonicalStatus).toBe(418);
    expect(json.data.blocked).toBe(true);

    console.log('✅ 2. Start Match correctly returns 418 — kettle not ready');
  });

  // ─── 3. Kettle Readiness slider updates compliance score ─────────────────
  test('3. Kettle Readiness slider updates compliance score live', async ({ page }) => {
    // Get initial score
    const initialScore = await getMetricValue(page, 'Tea Compliance Score');

    // Find and drag the kettle readiness slider to ~80
    await setSliderValue(page, 'slider-kettleReadiness', 80);

    // Score should have updated
    await page.waitForTimeout(300);
    const newScore = await getMetricValue(page, 'Tea Compliance Score');

    expect(newScore).toBeGreaterThan(initialScore);
    console.log(`✅ 3. Slider updated score: ${initialScore} → ${newScore}`);
  });

  // ─── 4. Start Match succeeds after raising kettle readiness ──────────────
  test('4. Start Match returns 200 after kettle readiness raised above 65', async ({ page }) => {
    // Raise all sliders to passing values
    const sliders = [
      { id: 'slider-kettleReadiness', value: '80' },
      { id: 'slider-biscuitCoverage', value: '80' },
      { id: 'slider-umpireHydration', value: '80' },
      { id: 'slider-captainConfidence', value: '80' }
    ];

    for (const { id, value } of sliders) {
      await setSliderValue(page, id, Number(value));
    }

    await page.waitForTimeout(300);

    await page.getByRole('button', { name: /Start Match/i }).click();
    await waitForConsoleUpdate(page, '"success": true');

    const consoleText = await page.locator('pre[aria-live="polite"]').textContent();
    const json = JSON.parse(consoleText || '{}');

    expect(json.success).toBe(true);
    expect(json.meta.httpStatus).toBe(200);
    console.log('✅ 4. Start Match returns HTTP 200 after raising kettle readiness');
  });

  // ─── 5. Tea Mode selector changes compliance score ───────────────────────
  test('5. Tea Mode selector — Herbal Infusion lowers score, Masala Chai raises it', async ({ page }) => {
    // Get baseline score with English Breakfast
    await page.getByRole('button', { name: /English Breakfast/i }).click();
    await page.waitForTimeout(200);
    const baseScore = await getMetricValue(page, 'Tea Compliance Score');

    // Switch to Herbal Infusion — score should drop
    await page.getByRole('button', { name: /Herbal Infusion/i }).click();
    await page.waitForTimeout(200);
    const herbalScore = await getMetricValue(page, 'Tea Compliance Score');
    expect(herbalScore).toBeLessThan(baseScore);

    // Switch to Masala Chai — score should be higher than Herbal
    await page.getByRole('button', { name: /Masala Chai/i }).click();
    await page.waitForTimeout(200);
    const chaiScore = await getMetricValue(page, 'Tea Compliance Score');
    expect(chaiScore).toBeGreaterThan(herbalScore);

    console.log(`✅ 5. Tea Mode scores — English Breakfast: ${baseScore}, Herbal Infusion: ${herbalScore}, Masala Chai: ${chaiScore}`);
  });

  // ─── 6. Override Tea Protocol always returns 418 ─────────────────────────
  test('6. Override Tea Protocol always returns 418 regardless of tea state', async ({ page }) => {
    // Raise all metrics to maximum — should still 418
    const sliders = ['slider-kettleReadiness', 'slider-biscuitCoverage', 'slider-umpireHydration', 'slider-captainConfidence'];
    for (const id of sliders) {
      await setSliderValue(page, id, 100);
    }
    await page.getByRole('button', { name: /Masala Chai/i }).click();
    await page.waitForTimeout(200);

    // Now try to override
    await page.getByRole('button', { name: /Override Tea Protocol/i }).click();
    await waitForConsoleUpdate(page, 'TEA_BREAK_ENFORCED');

    const consoleText = await page.locator('pre[aria-live="polite"]').textContent();
    const json = JSON.parse(consoleText || '{}');

    expect(json.success).toBe(false);
    expect(json.meta.httpStatus).toBe(418);
    expect(json.error.code).toBe('TEA_BREAK_ENFORCED');
    console.log('✅ 6. Override Tea Protocol correctly fires 418 even at 100% compliance');
  });

  // ─── 7. Emergency Tea Audit returns score and grade ──────────────────────
  test('7. Emergency Tea Audit returns compliance score and grade', async ({ page }) => {
    await page.getByRole('button', { name: /Emergency Tea Audit/i }).click();
    await waitForConsoleUpdate(page, 'complianceScore');

    const consoleText = await page.locator('pre[aria-live="polite"]').textContent();
    const json = JSON.parse(consoleText || '{}');

    expect(json.success).toBe(true);
    expect(typeof json.data.complianceScore).toBe('number');
    expect(['CRITICAL', 'WARNING', 'NOMINAL', 'OPTIMAL']).toContain(json.data.grade);
    expect(json.data.teaState).toBeDefined();
    console.log(`✅ 7. Tea Audit returned score: ${json.data.complianceScore}, grade: ${json.data.grade}`);
  });

  // ─── 8. Footer rotating facts ────────────────────────────────────────────
  test('8. Footer renders RFC 2324 attribution', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('span.font-mono', { hasText: 'RFC 2324' })).toBeVisible();
    await expect(footer.locator('span.font-mono', { hasText: 'HTTP 418' })).toBeVisible();
    console.log('✅ 8. Footer renders RFC attribution correctly');
  });

  // ─── 9. Demo page renders correctly ──────────────────────────────────────
  test('9. /demo page renders 6-step guide', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: /Tea Break 418 Demo/i })).toBeVisible();

    // All 6 steps should be present
    for (let i = 1; i <= 6; i++) {
      await expect(page.getByText(String(i))).toBeVisible();
    }

    // Return link works
    const returnLink = page.getByRole('link', { name: /Return to Dashboard/i });
    await expect(returnLink).toBeVisible();
    await returnLink.click();
    await expect(page).toHaveURL(BASE_URL + '/');
    console.log('✅ 9. /demo page renders 6-step guide and return link works');
  });

  // ─── 10. Scoreboard renders match data ───────────────────────────────────
  test('10. Scoreboard displays match data correctly', async ({ page }) => {
    await expect(page.getByText('Peakhurst Panthers', { exact: false })).toBeVisible();
    await expect(page.getByText('St George Strikers', { exact: false })).toBeVisible();
    await expect(page.getByText('87/3')).toBeVisible();
    await expect(page.getByText('T20', { exact: false })).toBeVisible();
    console.log('✅ 10. Scoreboard renders match data correctly');
  });

  // ─── 11. All 5 tactical action buttons present ───────────────────────────
  test('11. All 5 tactical action buttons are rendered', async ({ page }) => {
    const actions = [
      'Batting Aggression',
      'Toss Analysis',
      'Powerplay Accel.',
      'Bowling Change',
      'Override Tea Protocol'
    ];
    for (const action of actions) {
      await expect(page.getByRole('button', { name: new RegExp(action, 'i') })).toBeVisible();
    }
    console.log('✅ 11. All 5 tactical action buttons present');
  });

  // ─── 12. Compliance grade badge updates with slider ──────────────────────
  test('12. Compliance grade badge reflects score changes', async ({ page }) => {
    // Set to very low values — should show WARNING or CRITICAL
    const sliders = ['slider-kettleReadiness', 'slider-biscuitCoverage', 'slider-umpireHydration', 'slider-captainConfidence'];
    for (const id of sliders) {
      await setSliderValue(page, id, 10);
    }
    await page.getByRole('button', { name: /Herbal Infusion/i }).click();
    await page.waitForTimeout(300);

    const lowGrade = page.locator('.badge-critical, .badge-warning').first();
    await expect(lowGrade).toBeVisible();

    // Now set to high values
    for (const id of sliders) {
      await setSliderValue(page, id, 100);
    }
    await page.getByRole('button', { name: /Masala Chai/i }).click();
    await page.waitForTimeout(300);

    const highGrade = page.locator('.badge-optimal, .badge-nominal').first();
    await expect(highGrade).toBeVisible();
    console.log('✅ 12. Grade badge updates correctly with slider changes');
  });

});
