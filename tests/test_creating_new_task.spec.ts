import { test, expect, request, APIRequestContext } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';

// Using the API helper to delete tasks with the same name
async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
  await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}

test('User should be able to add a new task', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Writing the first task!',
    is_done: false
  }

  await deleteTaskByHelper(request, task.name)

  // GIVEN that the user is on the main page
  await page.goto('http://localhost:8080');

  // AND the user enters a new task name
  const inputTaskName = page.locator('input[class*=InputNewTask]')
  await inputTaskName.fill(task.name)

  // WHEN the user clicks the create button
  await page.click('css = button >> text = Create')

  // AND the new task should be visible in the list
  const target = page.locator(`css=.task-item p >> text=${task.name}`)
  await expect(target).toBeVisible()

  // THEN the task should be deleted 
  await page.locator('button[class*="listItemDeleteButton"]').last().click();
});

test('It should not allow creating two identical tasks', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Writing a duplicate task',
    is_done: false
  }

  // Using the API helper to delete tasks with the same name
  await deleteTaskByHelper(request, task.name)

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
});

test('User should be able to create a new task after attempting to create a duplicate task with identical data', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Writing the second task!',
    is_done: false
  }

  await deleteTaskByHelper(request, task.name)

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