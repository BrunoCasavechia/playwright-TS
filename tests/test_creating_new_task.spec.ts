import { test, expect, request } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';

test('User should be able to add a new task', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Writing a new task here',
    is_done: false
  }

  // Using the API helper to delete tasks with the same name
  await request.delete('http://localhost:3333/helper/tasks/' + task.name)

  // GIVEN that the user is on the main page
  await page.goto('http://localhost:8080');

  // AND the user enters a new task name
  const inputTaskName = page.locator('input[class*=InputNewTask]')
  await inputTaskName.fill(task.name)

  // WHEN the user clicks the create button
  await page.click('css = button >> text = Create')

  // THEN the new task should be visible in the list
  const target = page.locator(`css=.task-item p >> text=${task.name}`)
  await expect(target).toBeVisible()
});

test.only('It should not allow creating two identical tasks', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Writing a new task here',
    is_done: false
  }

  // Using the API helper to delete tasks with the same name
  await request.delete('http://localhost:3333/helper/tasks/' + task.name)

  // Using the API helper to create tasks with the same name

  const newTask = await request.post('http://localhost:3333/tasks', { data: task })
  expect(newTask.ok()).toBeTruthy()

  // GIVEN that the user is on the main page
  await page.goto('http://localhost:8080')

  // AND the user enters a new task name
  const inputTaskName = page.locator('input[class*=InputNewTask]')
  await inputTaskName.fill(task.name)

  // WHEN the user clicks the create button
  await page.click('css = button >> text = Create')

  // THEN the new task should be visible in the list
  const target = page.locator('.swal2-html-container')
  await expect(target).toHaveText('Task already exists!')
  await page.click('css = button >> text = Ok')
}
)