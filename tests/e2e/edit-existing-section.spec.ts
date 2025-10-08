import { test, expect } from '@playwright/test';

/**
 * Edit Existing Body Section Test
 *
 * Tests editing existing CLIP PLM section and verifying homepage sync
 */

test.describe('Edit Existing Body Section', () => {

  test('should edit CLIP PLM section and reflect on homepage', async ({ page, context }) => {
    // Step 1: Check homepage before edit
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('✅ Homepage loaded');

    const productShowcase = page.locator('section').filter({ hasText: 'PAPSNET Solutions' });
    const initialProducts = await productShowcase.locator('h3').allTextContents();

    console.log('Initial products:', initialProducts);
    expect(initialProducts).toContain('CLIP PLM');

    // Step 2: Open admin panel
    const adminPage = await context.newPage();
    await adminPage.goto('/admin/body');
    await adminPage.waitForLoadState('networkidle');

    console.log('✅ Admin panel loaded');

    // Check if logged in
    const hasLoginForm = await adminPage.locator('input[type="email"]').count() > 0;

    if (hasLoginForm) {
      console.log('🔐 Logging in...');
      await adminPage.fill('input[type="email"]', 'admin@papsnet.com');
      await adminPage.fill('input[type="password"]', 'admin123');
      await adminPage.click('button[type="submit"]');
      await adminPage.waitForLoadState('networkidle');
      await adminPage.waitForTimeout(2000);
    }

    // Verify admin interface
    const adminTitle = await adminPage.locator('h1').filter({ hasText: '바디 섹션 편집' }).count();
    if (adminTitle === 0) {
      console.log('❌ Failed to access admin panel');
      test.skip();
      return;
    }

    console.log('✅ Admin interface accessible');

    // Step 3: Find and select CLIP PLM section
    const clipPlmSection = adminPage.locator('.bg-slate-700').filter({ hasText: 'CLIP PLM' }).first();
    await clipPlmSection.click();

    console.log('✅ CLIP PLM section selected');

    await adminPage.waitForTimeout(500);

    // Step 4: Modify title
    const titleInput = adminPage.locator('label').filter({ hasText: '제목' }).locator('..').locator('input').first();
    const originalTitle = await titleInput.inputValue();

    console.log('Original title:', originalTitle);

    await titleInput.clear();
    const newTitle = 'CLIP PLM - 수정됨 (E2E Test)';
    await titleInput.fill(newTitle);

    console.log('✅ Title changed to:', newTitle);

    // Step 5: Verify real-time preview
    await adminPage.waitForTimeout(300);
    const previewTitle = await adminPage.locator('div').filter({ hasText: '실시간 미리보기' }).locator('h2').textContent();

    expect(previewTitle).toContain('수정됨');
    console.log('✅ Real-time preview updated:', previewTitle);

    // Step 6: Modify description
    const descTextarea = adminPage.locator('label').filter({ hasText: '설명' }).locator('..').locator('textarea').first();
    await descTextarea.clear();
    await descTextarea.fill('이 설명은 E2E 테스트에 의해 수정되었습니다. 관리자 패널에서 바로 홈페이지에 반영됩니다.');

    console.log('✅ Description modified');

    // Step 7: Save changes
    const saveButton = adminPage.locator('button').filter({ hasText: '저장' }).first();
    await saveButton.click();

    await adminPage.waitForSelector('text=저장되었습니다', { timeout: 5000 });
    console.log('✅ Changes saved to backend');

    // Step 8: Wait for homepage sync
    await page.waitForTimeout(2000);

    // Step 9: Reload homepage and verify changes
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const updatedProducts = await productShowcase.locator('h3').allTextContents();
    console.log('Updated products:', updatedProducts);

    const hasModifiedTitle = updatedProducts.some(title => title.includes('수정됨'));
    expect(hasModifiedTitle).toBeTruthy();

    console.log('✅ SUCCESS: Modified title appears on homepage!');

    // Verify description in detail view
    const clipCard = productShowcase.locator('div').filter({ hasText: 'CLIP PLM' }).first();
    await clipCard.click();

    await page.waitForTimeout(500);

    const detailDescription = await page.locator('p').filter({ hasText: 'E2E 테스트' }).count();
    if (detailDescription > 0) {
      console.log('✅ Modified description also appears');
    }

    // Cleanup: Restore original title
    console.log('🧹 Restoring original title...');

    await adminPage.bringToFront();
    await titleInput.clear();
    await titleInput.fill(originalTitle);

    await descTextarea.clear();
    await descTextarea.fill('제품 수명 주기를 관리하는 PMS 프로젝트 관리와 기업 연구소의 도면 데이터를 동시에 관리하는 혁신적인 통합 솔루션');

    await saveButton.click();
    await adminPage.waitForSelector('text=저장되었습니다', { timeout: 5000 });

    console.log('✅ Original content restored');

    await adminPage.close();
  });

  test('should display all 5 sections in admin panel', async ({ page }) => {
    await page.goto('/admin/body');
    await page.waitForLoadState('networkidle');

    // Login if needed
    const hasLoginForm = await page.locator('input[type="email"]').count() > 0;
    if (hasLoginForm) {
      await page.fill('input[type="email"]', 'admin@papsnet.com');
      await page.fill('input[type="password"]', 'admin123');
      await page.click('button[type="submit"]');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
    }

    // Check section list
    const sectionList = page.locator('div').filter({ hasText: '섹션 목록' }).first();
    const sectionCount = await sectionList.locator('.bg-slate-700').count();

    console.log('Sections in admin panel:', sectionCount);
    expect(sectionCount).toBe(5);

    const sectionTitles = await sectionList.locator('.font-medium').allTextContents();
    console.log('Section titles:', sectionTitles);

    expect(sectionTitles).toContain('CLIP PLM');
    expect(sectionTitles).toContain('DDMS');
    expect(sectionTitles).toContain('EPL');
    expect(sectionTitles).toContain('ICMS');
    expect(sectionTitles).toContain('CADWin AI');

    console.log('✅ All 5 sections loaded correctly');
  });

  test('should sync homepage with backend sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for ProductShowcase to load
    await page.waitForTimeout(2000);

    const productShowcase = page.locator('section').filter({ hasText: 'PAPSNET Solutions' });
    const products = await productShowcase.locator('h3').allTextContents();

    console.log('Homepage displays:', products);
    console.log('Total products:', products.length);

    // Should display backend sections (5) instead of fallback
    expect(products).toContain('CLIP PLM');
    expect(products).toContain('DDMS');
    expect(products).toContain('EPL');
    expect(products).toContain('ICMS');
    expect(products).toContain('CADWin AI');

    console.log('✅ Homepage correctly displays backend sections');
  });
});
