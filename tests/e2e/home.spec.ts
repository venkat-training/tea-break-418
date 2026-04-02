import { expect, test } from '@playwright/test';

test('home loads and shows teapot governance', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Tea Break 418')).toBeVisible();
  await page.getByRole('button', { name: 'Override Tea Protocol' }).click();
  await expect(page.getByText('TEA_BREAK_ENFORCED')).toBeVisible();
});
