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

test('saree photo mode requires a fabric selection and extracts a smaller repeat', async ({ page }) => {
  await page.goto('/tools/weavecore');
  const encoded = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 96;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ff8888';
    ctx.fillRect(0, 0, 96, 64);
    ctx.fillStyle = '#000033';
    ctx.fillRect(16, 8, 64, 48);
    ctx.fillStyle = '#ffee99';
    for (let y = 8; y < 56; y += 8) {
      for (let x = 16; x < 80; x += 8) ctx.fillRect(x + 1, y + 2, 3, 3);
    }
    return canvas.toDataURL().split(',')[1];
  });
  await page.locator('.studio-header input[type=file]').setInputFiles({ name: 'fabric.png', mimeType: 'image/png', buffer: Buffer.from(encoded, 'base64') });
  await page.getByLabel('Image type').selectOption('photo');
  const extract = page.getByRole('button', { name: 'Find and extract repeat' });
  await expect(extract).toBeDisabled();
  const image = page.getByAltText('Original design reference');
  await expect(image).toBeVisible();
  const box = (await image.boundingBox())!;
  for (const [x, y] of [[16, 8], [79, 8], [79, 55], [16, 55]]) {
    await image.click({ position: { x: x * box.width / 96, y: y * box.height / 64 } });
  }
  await page.getByLabel('Output columns').fill('64');
  await page.getByLabel('Output rows').fill('48');
  await extract.click();
  await expect(page.getByText('Repeat found on both axes.', { exact: false })).toBeVisible();
  const canvas = page.getByLabel('Editable indexed design');
  await expect(canvas).toHaveAttribute('width', '8');
  await expect(canvas).toHaveAttribute('height', '8');
});
