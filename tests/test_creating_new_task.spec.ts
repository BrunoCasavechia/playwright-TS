import { test, expect } from '@playwright/test';

test('User should be able to add a new task', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const inputTaskName = page.locator('input[class*=InputNewTask]')
  await inputTaskName.fill('Writing a new task here')

  await page.click('css = button >> text = Create')
});