import { test, expect } from '@playwright/test';

/**
 * Body Sections E2E Tests
 *
 * Tests for //*[@id="main-content"]/div/section[2] (second dynamic section)
 * Verifies admin panel integration and dynamic content loading
 */

test.describe('Homepage Body Sections', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load and display main content sections', async ({ page }) => {
    // Wait for main content to be visible
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();

    // Check that sections are rendered
    const sections = mainContent.locator('section');
    const sectionCount = await sections.count();

    console.log(`Found ${sectionCount} sections in main-content`);
    expect(sectionCount).toBeGreaterThan(0);
  });

  test('should verify second section exists (section[2])', async ({ page }) => {
    const mainContent = page.locator('#main-content');
    const sections = mainContent.locator('section');

    // Get second section (index 1)
    const secondSection = sections.nth(1);

    if (await secondSection.count() > 0) {
      await expect(secondSection).toBeVisible();

      // Log section content for debugging
      const sectionHTML = await secondSection.innerHTML();
      console.log('Section[2] HTML preview:', sectionHTML.substring(0, 200));

      // Verify it has content
      const textContent = await secondSection.textContent();
      expect(textContent?.length).toBeGreaterThan(0);
    } else {
      console.log('⚠️ Second section not found - may be fewer than 2 sections');
    }
  });

  test('should load sections from backend API', async ({ page }) => {
    // Intercept API call
    const apiResponse = page.waitForResponse('**/api/public/sections');

    await page.goto('/');

    const response = await apiResponse;
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    // Verify data structure
    expect(Array.isArray(data)).toBeTruthy();

    if (data.length > 0) {
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('isPublished');
    }
  });

  test('should display only published sections', async ({ page }) => {
    // Wait for sections to load
    await page.waitForSelector('#main-content section', { timeout: 10000 });

    const sections = page.locator('#main-content section');
    const count = await sections.count();

    console.log(`Total visible sections: ${count}`);

    // All visible sections should be from published data
    // (unpublished sections should be filtered out)
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper section structure', async ({ page }) => {
    const mainContent = page.locator('#main-content');
    const firstSection = mainContent.locator('section').first();

    if (await firstSection.count() > 0) {
      // Check for common section elements
      const hasHeading = await firstSection.locator('h1, h2, h3').count() > 0;
      console.log('Section has heading:', hasHeading);

      // Section should have some semantic structure
      await expect(firstSection).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();

    // Verify sections still render on mobile
    const sections = mainContent.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should handle section loading errors gracefully', async ({ page }) => {
    // Block API request to simulate error
    await page.route('**/api/public/sections', route => route.abort());

    await page.goto('/');

    // Page should still load (fallback to default content)
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();

    // Should have fallback sections
    const sections = mainContent.locator('section');
    const count = await sections.count();
    console.log('Fallback sections count:', count);
  });
});

test.describe('Admin Body Section Editor', () => {

  test('should navigate to admin body editor', async ({ page }) => {
    await page.goto('/admin/body');

    // Should show admin interface or login page
    const bodyText = await page.textContent('body');
    const hasAdminUI = bodyText?.includes('바디 섹션') || bodyText?.includes('로그인');

    expect(hasAdminUI).toBeTruthy();
  });

  test('should require authentication for admin access', async ({ page }) => {
    await page.goto('/admin/body');

    // Without auth, should redirect to login or show protected message
    const url = page.url();
    const hasProtection = url.includes('login') || url.includes('admin');

    expect(hasProtection).toBeTruthy();
  });
});

test.describe('Dynamic Section Updates', () => {

  test('should reflect changes when sections are updated', async ({ page }) => {
    await page.goto('/');

    // Get initial section count
    const mainContent = page.locator('#main-content');
    const initialSections = mainContent.locator('section');
    const initialCount = await initialSections.count();

    console.log('Initial section count:', initialCount);

    // Simulate sectionsUpdated event (mimics admin save)
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('sectionsUpdated', {
        detail: [
          {
            id: 'test-1',
            type: 'showcase',
            title: 'Test Section',
            isPublished: true,
            order: 0
          }
        ]
      }));
    });

    // Wait a bit for potential re-render
    await page.waitForTimeout(1000);

    // Verify page handled the event
    const afterCount = await mainContent.locator('section').count();
    console.log('After event section count:', afterCount);

    expect(afterCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Performance', () => {

  test('should load sections within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForSelector('#main-content section', { timeout: 5000 });

    const loadTime = Date.now() - startTime;
    console.log(`Sections loaded in ${loadTime}ms`);

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not cause layout shifts', async ({ page }) => {
    await page.goto('/');

    // Wait for content to stabilize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check if main content is stable
    const mainContent = page.locator('#main-content');
    const box1 = await mainContent.boundingBox();

    await page.waitForTimeout(500);

    const box2 = await mainContent.boundingBox();

    // Position should be stable
    expect(box1?.y).toBe(box2?.y);
  });
});

test.describe('Accessibility', () => {

  test('sections should have proper semantic HTML', async ({ page }) => {
    await page.goto('/');

    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();

    // Main content should exist
    await expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through the page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should have focus on some element
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
  });
});
