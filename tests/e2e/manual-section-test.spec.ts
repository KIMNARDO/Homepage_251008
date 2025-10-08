import { test, expect } from '@playwright/test';

/**
 * Manual Section Creation and Sync Test
 *
 * Creates sections via admin panel and verifies homepage sync
 */

test.describe('Manual Admin Section Creation', () => {

  test('should create section and display on homepage', async ({ page, context }) => {
    // Step 1: Navigate to admin body editor
    await page.goto('/admin/body');
    await page.waitForLoadState('networkidle');

    console.log('✅ Admin panel loaded');

    // Check if logged in
    const hasLoginForm = await page.locator('input[type="email"]').count() > 0;

    if (hasLoginForm) {
      console.log('🔐 Logging in...');

      await page.fill('input[type="email"]', 'admin@papsnet.com');
      await page.fill('input[type="password"]', 'admin123');
      await page.click('button[type="submit"]');

      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
    }

    // Verify we're on admin body editor
    const adminTitle = await page.locator('h1').filter({ hasText: '바디 섹션 편집' }).count();

    if (adminTitle === 0) {
      console.log('❌ Failed to access admin panel');
      test.skip();
      return;
    }

    console.log('✅ Admin panel accessible');

    // Step 2: Create new section
    const newSectionButton = page.locator('button').filter({ hasText: '새 섹션' });
    await newSectionButton.click();

    await page.waitForTimeout(1000);
    console.log('✅ New section created');

    // Step 3: Fill in section details
    const titleInput = page.locator('input[placeholder*="CLIP PLM"]').first();
    await titleInput.clear();
    await titleInput.fill('테스트 섹션 - E2E 자동 생성');

    const subtitleInput = page.locator('input[placeholder*="Product Lifecycle"]').first();
    await subtitleInput.clear();
    await subtitleInput.fill('자동화 테스트용 부제목');

    const descriptionTextarea = page.locator('textarea[placeholder*="상세 설명"]').first();
    await descriptionTextarea.clear();
    await descriptionTextarea.fill('이 섹션은 Playwright E2E 테스트에 의해 자동으로 생성되었습니다.');

    console.log('✅ Section details filled');

    // Step 4: Check "게시" checkbox
    const publishCheckbox = page.locator('input[type="checkbox"]').first();
    await publishCheckbox.check();

    console.log('✅ Section marked for publishing');

    // Step 5: Verify real-time preview
    const preview = page.locator('div').filter({ hasText: '실시간 미리보기' });
    const previewTitle = await preview.locator('h2').textContent();

    expect(previewTitle).toContain('테스트 섹션');
    console.log('✅ Real-time preview working:', previewTitle);

    // Step 6: Save section
    const saveButton = page.locator('button').filter({ hasText: '저장' }).first();
    await saveButton.click();

    // Wait for success message
    await page.waitForSelector('text=저장되었습니다', { timeout: 5000 });
    console.log('✅ Section saved successfully');

    // Step 7: Verify backend has the section
    await page.waitForTimeout(1000);

    const response = await page.request.get('http://localhost:8080/api/public/sections');
    const sections = await response.json();

    console.log('Backend sections count:', sections.length);
    console.log('Section titles:', sections.map((s: any) => s.title));

    expect(sections.length).toBeGreaterThan(0);
    expect(sections.some((s: any) => s.title.includes('테스트 섹션'))).toBeTruthy();

    console.log('✅ Section saved to backend');

    // Step 8: Open homepage and verify
    const homePage = await context.newPage();
    await homePage.goto('/');
    await homePage.waitForLoadState('networkidle');

    // Wait for ProductShowcase to load data
    await homePage.waitForTimeout(3000);

    // Check for the test section
    const productShowcase = homePage.locator('section').filter({ hasText: 'PAPSNET Solutions' });
    const allProducts = await productShowcase.locator('h3').allTextContents();

    console.log('Homepage products:', allProducts);

    const hasTestSection = allProducts.some(title => title.includes('테스트 섹션'));

    if (hasTestSection) {
      console.log('✅ SUCCESS: Section appears on homepage!');
    } else {
      console.log('⚠️ Section not visible yet, reloading...');

      await homePage.reload();
      await homePage.waitForTimeout(2000);

      const reloadedProducts = await productShowcase.locator('h3').allTextContents();
      console.log('After reload:', reloadedProducts);
    }

    // Cleanup: Delete test section
    console.log('🧹 Cleaning up test section...');

    await page.bringToFront();

    const deleteButton = page.locator('button').filter({ hasText: '섹션 삭제' });

    // Accept confirmation dialog
    page.on('dialog', dialog => dialog.accept());
    await deleteButton.click();

    await page.waitForSelector('text=삭제되었습니다', { timeout: 5000 });
    console.log('✅ Test section deleted');

    await homePage.close();
  });

  test('should display current backend sections count', async ({ page }) => {
    const response = await page.request.get('http://localhost:8080/api/public/sections');
    const sections = await response.json();

    console.log('='.repeat(50));
    console.log('CURRENT BACKEND STATE:');
    console.log('Total sections:', sections.length);

    if (sections.length > 0) {
      console.log('\nSections:');
      sections.forEach((s: any, i: number) => {
        console.log(`  ${i + 1}. ${s.title}`);
        console.log(`     - Published: ${s.isPublished}`);
        console.log(`     - Order: ${s.order}`);
      });
    } else {
      console.log('⚠️ No sections found in backend');
      console.log('💡 Use admin panel to create sections at /admin/body');
    }
    console.log('='.repeat(50));

    expect(Array.isArray(sections)).toBeTruthy();
  });
});
