import { expect, test } from '@playwright/test';

test('home loads and shows teapot governance', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tea Break 418')).toBeVisible();
  await page.getByRole('button', { name: 'Override Tea Protocol' }).click();
  await expect(page.getByText('TEA_BREAK_ENFORCED')).toBeVisible();
});

test('hero buttons work', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tea Break 418')).toBeVisible();

  // Test Start Match button
  await page.getByRole('button', { name: 'Start Match' }).click();
  await expect(page.getByText('Awaiting tactical instruction.')).not.toBeVisible(); // Response should change

  // Test Trigger Emergency Tea Audit button
  await page.getByRole('button', { name: 'Trigger Emergency Tea Audit' }).click();
  await expect(page.getByText('complianceScore')).toBeVisible();

  // Test View Demo Dashboard button
  await page.getByRole('button', { name: 'View Demo Dashboard' }).click();
  await expect(page).toHaveURL('/demo');
  await expect(page.getByText('Tea Break 418 Demo')).toBeVisible();
});
