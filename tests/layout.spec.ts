import { test, expect } from '@playwright/test';

test('home page layout sanity', async ({ page }) => {
  await page.goto('/');
  // Wait for news feed to load
  await page.waitForSelector('article');
  
  // Check that SVG icons have reasonable sizes
  const svgIcons = await page.locator('svg').all();
  console.log(`Found ${svgIcons.length} SVG icons`);
  
  for (const icon of svgIcons) {
    const box = await icon.boundingBox();
    if (box) {
      console.log(`SVG size: ${box.width}x${box.height}`);
      // Ensure icons are not excessively large (e.g., > 500px)
      expect(box.width).toBeLessThan(500);
      expect(box.height).toBeLessThan(500);
      // Ensure icons are not zero sized
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  }
  
  // Check bookmark button exists and is visible
  const bookmarkButton = page.locator('button[aria-label="Add bookmark"], button[aria-label="Remove bookmark"]').first();
  await expect(bookmarkButton).toBeVisible();
  
  // Check comment section toggle button exists
  const commentToggle = page.locator('button:has-text("comment")').first();
  await expect(commentToggle).toBeVisible();
  
  // Take screenshot for debugging
  await page.screenshot({ path: '/tmp/layout.png' });
});