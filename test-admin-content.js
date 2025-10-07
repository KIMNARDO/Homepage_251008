const { chromium } = require('playwright');

async function testAdminContentFlow() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('=== Starting PAPSNET Admin Content Test ===\n');

    // Step 1: Navigate to Homepage and capture initial state
    console.log('1. Navigating to homepage...');
    await page.goto('http://localhost:5176');
    await page.waitForSelector('h1', { timeout: 10000 });

    const initialHeroTitle = await page.textContent('h1');
    console.log(`   Initial hero title: "${initialHeroTitle}"`);
    await page.screenshot({ path: 'homepage-before.png' });
    console.log('   Screenshot saved: homepage-before.png\n');

    // Step 2: Navigate to Admin Login
    console.log('2. Navigating to admin login...');
    await page.goto('http://localhost:5176/admin');
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });

    // Step 3: Login
    console.log('3. Logging in as admin...');
    await page.fill('input[type="email"]', 'admin@papsnet.net');
    await page.fill('input[type="password"]', 'admin123');

    // Click the login button (로그인)
    await page.click('button:has-text("로그인")');

    // Wait for either dashboard elements or error message
    try {
      // Wait for dashboard to load by looking for specific admin elements
      await page.waitForSelector('[data-testid="admin-dashboard"], .admin-sidebar, text=대시보드, text=콘텐츠', { timeout: 5000 });
      console.log('   Login successful!\n');
    } catch (e) {
      // Check if still on login page
      const loginButton = await page.$('button:has-text("로그인")');
      if (loginButton) {
        console.log('   Login failed - still on login page');
        // Try direct navigation to admin dashboard
        console.log('   Attempting direct navigation to dashboard...');
        await page.goto('http://localhost:5176/admin/dashboard');
        await page.waitForTimeout(2000);
      }
    }

    // Step 4: Navigate to Content Management
    console.log('4. Navigating to Content Management...');

    // Take a screenshot to see what's on the page
    await page.screenshot({ path: 'admin-dashboard.png' });
    console.log('   Screenshot saved: admin-dashboard.png');

    // Try different selectors for the menu item
    try {
      // First try with exact text
      const contentMenuItem = await page.$('text="콘텐츠 관리"');
      if (contentMenuItem) {
        await contentMenuItem.click();
      } else {
        // Try with a more flexible selector
        await page.click('a:has-text("콘텐츠"), button:has-text("콘텐츠")').catch(async () => {
          // If that fails, try navigating directly
          console.log('   Could not find menu item, navigating directly...');
          await page.goto('http://localhost:5176/admin/content');
        });
      }
    } catch (e) {
      console.log('   Navigating directly to content page...');
      await page.goto('http://localhost:5176/admin/content');
    }

    await page.waitForTimeout(2000); // Wait for content to load
    await page.screenshot({ path: 'admin-content-page.png' });
    console.log('   Screenshot saved: admin-content-page.png\n');

    // Step 5: Edit Hero Content
    console.log('5. Editing hero content...');
    const newTitle = 'PLAYWRIGHT 테스트 - ' + new Date().toLocaleTimeString('ko-KR');

    // Wait for the content to load
    await page.waitForTimeout(1000);

    // Look for any table rows containing hero.title
    const heroTitleRow = await page.$('tr:has-text("hero.title")');
    if (heroTitleRow) {
      console.log('   Found hero.title row');

      // Click the edit button in that row
      const editButton = await heroTitleRow.$('button:has-text("수정"), button:has-text("Edit"), button[title*="edit"], button[aria-label*="edit"]');
      if (editButton) {
        await editButton.click();
        console.log('   Clicked edit button');
        await page.waitForTimeout(1000);

        // Find and update the content value field in the modal/form
        const contentInput = await page.$('input[name="contentValue"], textarea[name="contentValue"], input[placeholder*="content"], textarea[placeholder*="content"]');
        if (contentInput) {
          await contentInput.fill(newTitle);
          console.log(`   New title set to: "${newTitle}"`);

          // Save the changes
          const saveButton = await page.$('button:has-text("저장"), button:has-text("Save"), button[type="submit"]');
          if (saveButton) {
            await saveButton.click();
            await page.waitForTimeout(2000);
            console.log('   Content saved!\n');
          }
        }
      }
    } else {
      console.log('   Could not find hero.title row, trying direct edit...');

      // Alternative: try to find any edit buttons
      const editButtons = await page.$$('button:has-text("수정"), button:has-text("Edit")');
      if (editButtons.length > 0) {
        console.log(`   Found ${editButtons.length} edit buttons, clicking first one`);
        await editButtons[0].click();
        await page.waitForTimeout(1000);

        // Try to update content
        const inputs = await page.$$('input[type="text"], textarea');
        if (inputs.length > 0) {
          await inputs[0].fill(newTitle);
          console.log(`   Updated first input field with: "${newTitle}"`);

          // Try to save
          await page.keyboard.press('Enter');
          await page.waitForTimeout(2000);
        }
      }
    }

    // Step 6: Navigate back to homepage to verify changes
    console.log('6. Verifying changes on homepage...');
    await page.goto('http://localhost:5176');
    await page.waitForTimeout(2000); // Give time for content to load

    // Force a page reload to ensure fresh data
    await page.reload();
    await page.waitForSelector('h1', { timeout: 10000 });

    const updatedHeroTitle = await page.textContent('h1');
    console.log(`   Updated hero title: "${updatedHeroTitle}"`);
    await page.screenshot({ path: 'homepage-after.png' });
    console.log('   Screenshot saved: homepage-after.png\n');

    // Step 7: Verify the update
    console.log('=== Test Results ===');
    if (updatedHeroTitle && updatedHeroTitle !== initialHeroTitle) {
      console.log('✅ SUCCESS: Content was updated!');
      console.log(`   Before: "${initialHeroTitle}"`);
      console.log(`   After: "${updatedHeroTitle}"`);
    } else {
      console.log('❌ FAILED: Content was not updated');
      console.log(`   Expected change from: "${initialHeroTitle}"`);
      console.log(`   But got: "${updatedHeroTitle}"`);
    }

  } catch (error) {
    console.error('Test failed with error:', error);
    await page.screenshot({ path: 'error-screenshot.png' });
  } finally {
    await browser.close();
  }
}

// Run the test
testAdminContentFlow();