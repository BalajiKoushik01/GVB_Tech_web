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
  await expect(page.getByText('Combined 9 visible copies', { exact: false })).toBeVisible();
  const canvas = page.getByLabel('Editable indexed design');
  await expect(canvas).toHaveAttribute('width', '8');
  await expect(canvas).toHaveAttribute('height', '8');
  await page.getByRole('button', { name: 'Mark an obstruction' }).click();
  for (const [x, y] of [[17, 10], [18, 11]]) {
    await image.click({ position: { x: x * box.width / 96, y: y * box.height / 64 } });
  }
  await extract.click();
  await expect(page.getByText(/Recovered [1-9]\d* masked cells/)).toBeVisible();
  await expect(canvas).toHaveAttribute('width', '8');
  await page.getByRole('button', { name: 'Clear obstruction' }).click();
  await page.getByLabel('I know how many copies are in the crop').check();
  await page.getByLabel('Copies across crop').fill('8');
  await page.getByLabel('Copies down crop').fill('6');
  await extract.click();
  await expect(page.getByText('Extracted one unit from the specified 8 × 6 layout.', { exact: false })).toBeVisible();
  await expect(canvas).toHaveAttribute('width', '8');
  await page.getByLabel('Target panel columns').fill('19');
  await page.getByLabel('Target panel rows').fill('11');
  await page.getByRole('button', { name: 'Tile to panel size' }).click();
  await expect(canvas).toHaveAttribute('width', '19');
  await expect(canvas).toHaveAttribute('height', '11');


});

test('assemble separate border and body projects and export the joined design', async ({ page }) => {
  await page.goto('/tools/weavecore');
  const makePanel = (name: string, palette: number[][], names: string[], indices: number[]) => ({
    name: name + '.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      schema: 'weavecore.indexed.v1', width: 3, height: 1, palette, names,
      regions: [], indices: Buffer.from(indices).toString('base64'),
    })),
  });
  await page.getByLabel('Import panel projects').setInputFiles([
    makePanel('Border', [[224, 181, 77], [224, 181, 77]], ['Zari A', 'Zari B'], [0, 1, 0]),
    makePanel('Body', [[10, 80, 55]], ['Ground'], [0, 0, 0]),
  ]);
  await expect(page.getByLabel('Panel 2 name')).toHaveValue('Body');
  await page.getByRole('button', { name: 'Move panel 2 earlier' }).click();
  await expect(page.getByLabel('Panel 1 name')).toHaveValue('Body');
  await page.getByRole('button', { name: 'Build assembled saree' }).click();
  const canvas = page.getByLabel('Editable indexed design');
  await expect(canvas).toHaveAttribute('width', '3');
  await expect(canvas).toHaveAttribute('height', '2');
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export indexed BMP', exact: true }).click();
  const bmp = await readFile(await (await pending).path());
  const start = bmp.readUInt32LE(10);
  expect([...bmp.subarray(start, start + 3)]).toEqual([1, 2, 1]);
  expect([...bmp.subarray(start + 4, start + 7)]).toEqual([0, 0, 0]);
});

test('automatic panel proposals prepare an editable draft without crop clicks', async ({ page }) => {
  const outline = [[100, 100], [900, 100], [900, 900], [100, 900]];
  await page.route('**/api/weavecore/analyze', route => route.fulfill({ json: {
    saree: [outline], zari: [outline],
    panels: [
      { kind: 'pallu', outline, crop: [[200, 200], [800, 200], [800, 800], [200, 800]] },
      { kind: 'border', outline, crop: null },
    ],
  } }));
  await page.goto('/tools/weavecore');
  const png = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 96;
    canvas.height = 96;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#093f78';
    ctx.fillRect(0, 0, 96, 96);
    return canvas.toDataURL().split(',')[1];
  });
  await page.locator('.studio-header input[type=file]').setInputFiles({ name: 'saree.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
  await page.getByRole('button', { name: 'Analyze saree photo' }).click();
  await expect(page.getByText('No usable patch was identified.', { exact: false })).toBeVisible();
  await page.getByLabel('Photo outline overlay').selectOption('zari');
  await expect(page.locator('.photo-outline-zari')).toHaveCount(1);
  await page.getByRole('button', { name: 'Open pallu draft' }).click();
  await expect(page.getByLabel('Editable indexed design')).toHaveAttribute('width', '57');
});
