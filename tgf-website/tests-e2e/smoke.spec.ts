import { test, expect } from '@playwright/test';

test('home loads and CTA visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Invest in a greener future' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore Projects' })).toBeVisible();
});

