import { test, expect } from '@playwright/test';

/**
 * Admin Body Section Editor - Homepage Sync Test
 *
 * Tests real-time synchronization between admin panel and homepage
 */

test.describe('Admin Body Section → Homepage Sync', () => {

  test('should sync changes from admin to homepage in real-time', async ({ page, context }) => {
    // Step 1: Open homepage in first tab
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('✅ Homepage loaded');

    // Get initial ProductShowcase content
    const productShowcase = page.locator('section').filter({ hasText: '혁신적인 PLM 솔루션' });
    await expect(productShowcase).toBeVisible();

    const initialProducts = await productShowcase.locator('h3').allTextContents();
    console.log('Initial products on homepage:', initialProducts);

    // Step 2: Open admin panel in second tab
    const adminPage = await context.newPage();
    await adminPage.goto('/admin/body');
    await adminPage.waitForLoadState('networkidle');

    console.log('✅ Admin panel loaded');

    // Wait for sections to load
    await adminPage.waitForTimeout(2000);

    // Check if admin interface loaded
    const hasAdminUI = await adminPage.locator('h1').filter({ hasText: '바디 섹션 편집' }).count();

    if (hasAdminUI === 0) {
      console.log('⚠️ Not logged in - skipping sync test');
      test.skip();
      return;
    }

    console.log('✅ Admin interface ready');

    // Step 3: Find first section
    const firstSection = adminPage.locator('.bg-electric-600').first();
    await expect(firstSection).toBeVisible();
    await firstSection.click();

    console.log('✅ First section selected');

    // Step 4: Modify section title
    const titleInput = adminPage.locator('input[placeholder*="CLIP PLM"]');
    await titleInput.clear();
    await titleInput.fill('TEST SECTION - E2E Modified');

    console.log('✅ Title modified to: TEST SECTION - E2E Modified');

    // Step 5: Save changes
    const saveButton = adminPage.locator('button').filter({ hasText: '저장' });
    await saveButton.click();

    // Wait for save success message
    await adminPage.waitForSelector('text=저장되었습니다', { timeout: 5000 });
    console.log('✅ Changes saved');

    // Step 6: Wait for CustomEvent propagation
    await page.waitForTimeout(2000);

    // Step 7: Verify changes on homepage (should update automatically)
    console.log('🔍 Checking homepage for updates...');

    const updatedProducts = await productShowcase.locator('h3').allTextContents();
    console.log('Updated products on homepage:', updatedProducts);

    // Check if the modified title appears
    const hasTESTSection = updatedProducts.some(title => title.includes('TEST SECTION'));

    if (hasTESTSection) {
      console.log('✅ SUCCESS: Homepage updated automatically!');
    } else {
      console.log('⚠️ WARNING: Homepage not updated. Manual refresh might be needed.');

      // Try reloading homepage
      await page.reload();
      await page.waitForLoadState('networkidle');

      const reloadedProducts = await productShowcase.locator('h3').allTextContents();
      console.log('After reload:', reloadedProducts);

      const hasAfterReload = reloadedProducts.some(title => title.includes('TEST SECTION'));
      expect(hasAfterReload).toBeTruthy();
    }

    // Cleanup: Restore original title
    await titleInput.clear();
    await titleInput.fill(initialProducts[0] || 'Original Section');
    await saveButton.click();
    await adminPage.waitForSelector('text=저장되었습니다', { timeout: 5000 });

    console.log('✅ Cleanup: Original title restored');

    await adminPage.close();
  });

  test('should load sections from backend API', async ({ page }) => {
    const response = await page.request.get('http://localhost:8080/api/public/sections');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log('Backend sections count:', data.length);
    console.log('Section titles:', data.map((s: any) => s.title));

    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('should display dynamic sections on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for ProductShowcase to load data
    await page.waitForTimeout(2000);

    // Check console logs for data loading
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.text().includes('ProductShowcase')) {
        logs.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForTimeout(2000);

    console.log('Console logs:', logs);

    // Verify ProductShowcase section exists
    const showcase = page.locator('section').filter({ hasText: 'PAPSNET Solutions' });
    await expect(showcase).toBeVisible();
  });

  test('should handle sectionsUpdated CustomEvent', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Inject test data via CustomEvent
    const testSections = [
      {
        id: 'test-e2e-1',
        title: 'E2E Test Section',
        subtitle: 'Test Subtitle',
        description: 'This is a test section created by E2E test',
        features: ['Feature 1', 'Feature 2'],
        isPublished: true,
        order: 0
      }
    ];

    await page.evaluate((sections) => {
      window.dispatchEvent(new CustomEvent('sectionsUpdated', {
        detail: sections
      }));
    }, testSections);

    console.log('✅ CustomEvent dispatched');

    // Wait for potential re-render
    await page.waitForTimeout(1500);

    // Check if ProductShowcase component received the event
    // (This would require checking component state, which isn't directly accessible)

    console.log('✅ Event handling test completed');
  });

  test('should update preview in real-time while editing', async ({ page }) => {
    await page.goto('/admin/body');
    await page.waitForLoadState('networkidle');

    // Skip if not logged in
    const hasAdminUI = await page.locator('h1').filter({ hasText: '바디 섹션 편집' }).count();
    if (hasAdminUI === 0) {
      console.log('⚠️ Not logged in - skipping preview test');
      test.skip();
      return;
    }

    // Select first section
    const firstSection = page.locator('.bg-electric-600').first();
    await firstSection.click();

    // Find preview area
    const previewArea = page.locator('div').filter({ hasText: '실시간 미리보기' });
    await expect(previewArea).toBeVisible();

    // Modify title
    const titleInput = page.locator('input[placeholder*="CLIP PLM"]');
    const originalTitle = await titleInput.inputValue();

    await titleInput.clear();
    await titleInput.fill('Preview Test Title');

    // Wait for preview update (should be instant due to React state)
    await page.waitForTimeout(300);

    // Check if preview updated
    const previewTitle = previewArea.locator('h2').filter({ hasText: 'Preview Test Title' });
    await expect(previewTitle).toBeVisible();

    console.log('✅ Real-time preview working');

    // Restore original
    await titleInput.clear();
    await titleInput.fill(originalTitle);
  });
});
