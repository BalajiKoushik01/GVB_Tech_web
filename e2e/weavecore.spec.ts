import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('visitors can open the trial, edit a sample and export indexed artwork', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('main').getByRole('link', { name: 'Try WeaveCore' }).click();
  await expect(page.getByRole('heading', { name: 'Try WeaveCore' })).toBeVisible();
  await page.getByRole('button', { name: 'Try the sample design' }).click();
  const canvas = page.getByLabel('Editable indexed design');
  await expect(canvas).toBeVisible();
  await page.getByRole('button', { name: 'Palette index 1', exact: true }).click();
  await canvas.click({ position: { x: 2, y: 2 } });
  await expect(page.getByRole('button', { name: 'Undo', exact: true })).toBeEnabled();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export indexed BMP', exact: true }).click();
  const file = await readFile(await (await download).path());
  expect(file.readUInt16LE(28)).toBe(8);
  expect(file.readInt32LE(18)).toBe(192);
  expect(file.readInt32LE(22)).toBe(144);
  await page.locator('.studio-header input[type=file]').setInputFiles({ name: 'edited.bmp', mimeType: 'image/bmp', buffer: file });
  await page.getByRole('button', { name: 'Extract a new design', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Extraction ready');
  await expect(page.getByText('Original BMP palette slots and sampled indices preserved.')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
