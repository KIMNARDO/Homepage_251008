import { chromium } from 'playwright';

async function testLoginDebug() {
  console.log('🚀 Starting detailed debug test...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  // Capture all console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push({ type: msg.type(), text });
    console.log(`[Console ${msg.type()}]`, text);
  });

  // Capture all errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.error('[Page Error]', error.message);
  });

  // Capture all network requests
  page.on('request', request => {
    if (request.url().includes('api')) {
      console.log('[Request]', request.method(), request.url());
    }
  });

  page.on('response', async response => {
    if (response.url().includes('api')) {
      console.log('[Response]', response.status(), response.url());
    }
  });

  try {
    console.log('📍 Navigate to login page');
    await page.goto('http://localhost:5176/admin/login', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2000);

    console.log('\n📍 Fill credentials');
    await page.fill('input[type="email"]', 'admin@papsnet.net');
    await page.fill('input[type="password"]', 'admin123');

    console.log('\n📍 Submit form');
    await page.click('button[type="submit"]');

    console.log('\n📍 Waiting for 5 seconds to see what happens...');
    await page.waitForTimeout(5000);

    // Check for error message on page
    const errorElements = await page.locator('.bg-red-50, [role="alert"]').all();
    if (errorElements.length > 0) {
      console.log('\n❌ Error messages found on page:');
      for (const el of errorElements) {
        const text = await el.textContent();
        console.log('  -', text);
      }
    }

    // Get current state
    console.log('\n📦 Current state:');
    console.log('URL:', page.url());
    console.log('Title:', await page.title());

    // Check authStore state via console
    const storeState = await page.evaluate(() => {
      const storeData = localStorage.getItem('admin-auth-store');
      return storeData ? JSON.parse(storeData) : null;
    });

    console.log('\n📊 AuthStore state:', JSON.stringify(storeState, null, 2));

    // Screenshot
    await page.screenshot({ path: 'debug-test.png', fullPage: true });
    console.log('\n📸 Screenshot saved');

    // Summary
    console.log('\n📋 Summary:');
    console.log('Console messages:', consoleMessages.length);
    console.log('Page errors:', pageErrors.length);

    if (pageErrors.length > 0) {
      console.log('\n❌ Errors encountered:');
      pageErrors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
    }

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
  } finally {
    await browser.close();
    console.log('\n🏁 Debug test completed');
  }
}

testLoginDebug().catch(console.error);
