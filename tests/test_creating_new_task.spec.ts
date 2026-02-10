import { test, expect } from '@playwright/test';

test('User should be able to add a new task', async ({ page, request }) => {

  const taskName = 'Writing a new task here'

  await request.delete('http://localhost:3333/helper/tasks/' + taskName) 

  await page.goto('http://localhost:8080');

  const inputTaskName = page.locator('input[class*=InputNewTask]')
  await inputTaskName.fill(taskName)

  await page.click('css = button >> text = Create')
}); 