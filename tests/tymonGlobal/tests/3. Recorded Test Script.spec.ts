import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tymonglobal.com/contact-us/');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('This field is required.').first()).toBeVisible();
  await expect(page.getByText('This field is required.').nth(1)).toBeVisible();
  await expect(page.getByText('This field is required.').nth(2)).toBeVisible();
  await expect(page.getByText('This field is required.').nth(3)).toBeVisible();
  await expect(page.getByText('This field is required.').nth(4)).toBeVisible();
  await page.close();
});