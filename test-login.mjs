import { chromium } from 'playwright';

async function testLogin() {
  console.log('🚀 Starting Playwright test for login flow...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  // Listen to console messages
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      console.log(`[Browser ${type}]`, msg.text());
    }
  });

  // Listen to page errors
  page.on('pageerror', error => {
    console.error('[Page Error]', error.message);
  });

  try {
    console.log('📍 Step 1: Navigate to login page');
    await page.goto('http://localhost:5176/admin/login', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(1000);
    console.log('✅ Login page loaded\n');

    console.log('📍 Step 2: Fill in login credentials');
    await page.fill('input[type="email"]', 'admin@papsnet.net');
    await page.fill('input[type="password"]', 'admin123');
    console.log('✅ Credentials filled\n');

    console.log('📍 Step 3: Click login button');
    await page.click('button[type="submit"]');
    console.log('✅ Login button clicked\n');

    console.log('📍 Step 4: Wait for navigation to admin dashboard');
    try {
      await page.waitForURL('**/admin', { timeout: 5000 });
      console.log('✅ Navigation to /admin occurred\n');
    } catch (e) {
      console.log('⚠️ URL did not change to /admin');
      console.log('Current URL:', page.url());
    }

    await page.waitForTimeout(2000);

    console.log('📍 Step 5: Check current page state');
    const currentURL = page.url();
    const pageTitle = await page.title();
    console.log('Current URL:', currentURL);
    console.log('Page Title:', pageTitle);

    // Check for error messages
    const errorMessage = await page.locator('[role="alert"], .error-message').textContent().catch(() => null);
    if (errorMessage) {
      console.log('❌ Error message found:', errorMessage);
    }

    // Check if still on login page
    const isLoginPage = await page.locator('input[type="email"]').count() > 0;
    if (isLoginPage) {
      console.log('❌ Still on login page - login failed');
    }

    // Check if on admin dashboard
    const hasAdminContent = await page.locator('text=/Dashboard|관리자|Admin/i').count() > 0;
    if (hasAdminContent) {
      console.log('✅ Admin dashboard content detected');
    } else {
      console.log('❌ No admin dashboard content found');
    }

    // Take screenshot
    await page.screenshot({ path: 'test-result.png', fullPage: true });
    console.log('\n📸 Screenshot saved to test-result.png');

    // Check localStorage
    const authData = await page.evaluate(() => {
      return {
        accessToken: localStorage.getItem('auth-access-token'),
        refreshToken: localStorage.getItem('auth-refresh-token'),
        user: localStorage.getItem('auth-user'),
        storeData: localStorage.getItem('admin-auth-store')
      };
    });

    console.log('\n📦 LocalStorage data:');
    console.log('Access Token:', authData.accessToken ? '✅ Present' : '❌ Missing');
    console.log('Refresh Token:', authData.refreshToken ? '✅ Present' : '❌ Missing');
    console.log('User Data:', authData.user ? '✅ Present' : '❌ Missing');
    console.log('Store Data:', authData.storeData ? '✅ Present' : '❌ Missing');

    if (authData.user) {
      console.log('User Data:', JSON.parse(authData.user));
    }

    if (authData.storeData) {
      console.log('Store Data:', JSON.parse(authData.storeData));
    }

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    await page.screenshot({ path: 'test-error.png', fullPage: true });
    console.log('📸 Error screenshot saved to test-error.png');
  } finally {
    await browser.close();
    console.log('\n🏁 Test completed');
  }
}

testLogin().catch(console.error);
