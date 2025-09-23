import { test, expect } from '@playwright/test';

test('home page loads', async ({ page, baseURL }) => {
  const res = await page.goto(baseURL + '/');
  expect(res?.ok()).toBeTruthy();
  
  // Check for either the React app or the development mode message
  const hasReactApp = await page.locator('#root').isVisible().catch(() => false);
  const hasDevMessage = await page.locator('text=Development Mode').isVisible().catch(() => false);
  
  expect(hasReactApp || hasDevMessage).toBeTruthy();
});

test('health endpoint', async ({ request, baseURL }) => {
  const res = await request.get(baseURL + '/api/health');
  expect(res.ok()).toBeTruthy();
  const json = await res.json();
  expect(json.status).toBe('healthy');
});


