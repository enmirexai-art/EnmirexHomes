import { test, expect } from '@playwright/test';

test('home page loads', async ({ page, baseURL }) => {
  const res = await page.goto(baseURL + '/');
  expect(res?.ok()).toBeTruthy();
  
  // Just check that we get some HTML content
  const content = await page.content();
  expect(content.length).toBeGreaterThan(0);
  expect(content).toContain('html');
});

test('health endpoint', async ({ request, baseURL }) => {
  const res = await request.get(baseURL + '/api/health');
  expect(res.ok()).toBeTruthy();
  const json = await res.json();
  expect(json.status).toBe('healthy');
});


