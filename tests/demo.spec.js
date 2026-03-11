const { test, expect } = require('@playwright/test');

test('demo site title correct', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Playwright Demo Site/);
});

test('hello button works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#nameInput', 'Shaveen');
  await page.click('#helloBtn');
  await expect(page.locator('#message')).toHaveText('Hello, Shaveen!');
});