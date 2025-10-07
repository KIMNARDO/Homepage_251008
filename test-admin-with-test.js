const { chromium } = require('playwright');

async function testAdminContentWithTEST() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down actions for visibility
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('=== PAPSNET Admin Content TEST Verification ===\n');

    // Step 1: Check initial homepage
    console.log('1. Checking initial homepage content...');
    await page.goto('http://localhost:5176');
    await page.waitForSelector('h1', { timeout: 10000 });

    const initialTitle = await page.textContent('h1');
    console.log(`   Initial hero title: "${initialTitle}"`);

    // Take initial screenshot
    await page.screenshot({ path: 'test-before.png', fullPage: true });
    console.log('   Screenshot saved: test-before.png\n');

    // Step 2: Update content via API directly (bypass login UI issues)
    console.log('2. Updating content via API with TEST...');
    const timestamp = new Date().toLocaleTimeString('ko-KR');
    const testTitle = `TEST - Playwright 자동화 테스트 ${timestamp}`;

    // Use API to update content directly
    const updateResponse = await page.evaluate(async (newTitle) => {
      const response = await fetch('http://localhost:3001/api/admin/page-content/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          contentKey: 'hero.title',
          contentValue: newTitle,
          isActive: true,
          isPublished: true
        })
      });
      return await response.json();
    }, testTitle);

    if (updateResponse.success) {
      console.log(`   ✅ Content updated successfully via API`);
      console.log(`   New title set to: "${testTitle}"`);
    } else {
      console.log(`   ❌ Failed to update content via API`);
    }

    // Step 3: Navigate to homepage and verify TEST content
    console.log('\n3. Verifying TEST content on homepage...');

    // Clear any cache by navigating away and back
    await page.goto('about:blank');
    await page.waitForTimeout(1000);

    // Navigate back to homepage
    await page.goto('http://localhost:5176');

    // Force reload to get fresh content
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 10000 });

    // Wait a bit for React to update
    await page.waitForTimeout(2000);

    const updatedTitle = await page.textContent('h1');
    console.log(`   Updated hero title: "${updatedTitle}"`);

    // Take after screenshot
    await page.screenshot({ path: 'test-after.png', fullPage: true });
    console.log('   Screenshot saved: test-after.png\n');

    // Step 4: Verify TEST keyword presence
    console.log('4. Checking for TEST keyword...');
    const hasTestKeyword = updatedTitle.includes('TEST');

    if (hasTestKeyword) {
      console.log('   ✅ TEST keyword found in hero title!');
    } else {
      console.log('   ❌ TEST keyword NOT found in hero title');
    }

    // Step 5: Alternative - Check via admin panel UI
    console.log('\n5. Attempting to verify via Admin UI...');
    await page.goto('http://localhost:5176/admin');

    // Try to login
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await page.fill('input[type="email"]', 'admin@papsnet.net');
      await page.fill('input[type="password"]', 'admin123');

      // Find and click login button
      const loginButton = await page.$('button:has-text("로그인")');
      if (loginButton) {
        await loginButton.click();
        console.log('   Clicked login button');

        // Wait for navigation
        await page.waitForTimeout(3000);

        // Take screenshot of result
        await page.screenshot({ path: 'test-admin.png' });
        console.log('   Admin screenshot saved: test-admin.png');
      }
    }

    // Final Results
    console.log('\n=== TEST RESULTS ===');
    console.log(`Before: "${initialTitle}"`);
    console.log(`After: "${updatedTitle}"`);

    if (hasTestKeyword && updatedTitle !== initialTitle) {
      console.log('\n✅ SUCCESS: TEST content is visible on homepage!');
      console.log(`   The word "TEST" was successfully added and displayed.`);
      console.log(`   Content synchronization is working correctly.`);
    } else if (updatedTitle !== initialTitle) {
      console.log('\n⚠️ PARTIAL SUCCESS: Content changed but TEST keyword missing');
      console.log(`   Content was updated but doesn't contain "TEST"`);
    } else {
      console.log('\n❌ FAILED: Content was not updated on homepage');
      console.log(`   The homepage still shows the original content`);
    }

    // Step 6: Verify via direct API call
    console.log('\n6. Verifying backend data...');
    const apiData = await page.evaluate(async () => {
      const response = await fetch('http://localhost:3001/api/public/content');
      const data = await response.json();
      if (data.success && data.data) {
        const heroTitle = data.data.find(item => item.contentKey === 'hero.title');
        return heroTitle ? heroTitle.contentValue : null;
      }
      return null;
    });

    console.log(`   Backend API returns: "${apiData}"`);

    if (apiData && apiData.includes('TEST')) {
      console.log('   ✅ Backend has TEST content stored correctly');
    }

  } catch (error) {
    console.error('\nTest failed with error:', error);
    await page.screenshot({ path: 'test-error.png' });
    console.log('Error screenshot saved: test-error.png');
  } finally {
    console.log('\n=== Closing browser ===');
    await browser.close();
  }
}

// Run the test
console.log('Starting Playwright TEST verification...\n');
testAdminContentWithTEST();