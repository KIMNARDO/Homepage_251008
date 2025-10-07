import { chromium } from 'playwright';

async function testLoginIntercept() {
  console.log('🚀 Testing with console interception...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 800
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  // Intercept console.error and console.log
  await page.addInitScript(() => {
    const originalError = console.error;
    const originalLog = console.log;
    const originalWarn = console.warn;

    window._capturedLogs = [];

    console.error = (...args) => {
      window._capturedLogs.push({ type: 'error', args: args.map(String) });
      originalError.apply(console, args);
    };

    console.log = (...args) => {
      window._capturedLogs.push({ type: 'log', args: args.map(String) });
      originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      window._capturedLogs.push({ type: 'warn', args: args.map(String) });
      originalWarn.apply(console, args);
    };
  });

  try {
    console.log('📍 Navigate to login page');
    await page.goto('http://localhost:5176/admin/login', {
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(2000);

    console.log('\n📍 Fill credentials');
    await page.fill('input[name="email"]', 'admin@papsnet.net');
    await page.fill('input[name="password"]', 'admin123');

    console.log('\n📍 Click submit');

    // Click and wait for response
    const [response] = await Promise.all([
      page.waitForResponse(response => response.url().includes('/admin/login') || true, { timeout: 5000 }).catch(() => null),
      page.click('button[type="submit"]')
    ]);

    console.log('Response:', response ? response.url() : 'No API call detected');

    await page.waitForTimeout(3000);

    // Get captured logs from browser
    const logs = await page.evaluate(() => window._capturedLogs || []);

    console.log('\n📋 Captured browser logs:');
    logs.forEach((log, i) => {
      console.log(`[${log.type}] ${log.args.join(' ')}`);
    });

    // Check for errors on page
    const errorText = await page.locator('.bg-red-50').textContent().catch(() => '');
    if (errorText) {
      console.log('\n❌ Error on page:', errorText);
    }

    // Check URL
    const currentURL = page.url();
    console.log('\n📍 Current URL:', currentURL);

    if (currentURL.includes('/admin/login')) {
      console.log('❌ Still on login page');

      // Try to find out why
      const formData = await page.evaluate(() => {
        const email = document.querySelector('input[name="email"]')?.value;
        const password = document.querySelector('input[name="password"]')?.value;
        return { email, password };
      });
      console.log('Form data:', formData);
    } else if (currentURL.includes('/admin')) {
      console.log('✅ Successfully navigated to admin');
    }

    // Check storage
    const storage = await page.evaluate(() => {
      return {
        accessToken: !!localStorage.getItem('auth-access-token'),
        user: !!localStorage.getItem('auth-user'),
        store: localStorage.getItem('admin-auth-store')
      };
    });

    console.log('\n📦 Storage:', JSON.stringify(storage, null, 2));

    await page.screenshot({ path: 'intercept-test.png', fullPage: true });
    console.log('\n📸 Screenshot saved');

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
    await page.screenshot({ path: 'intercept-error.png' });
  } finally {
    await page.waitForTimeout(2000);
    await browser.close();
    console.log('\n🏁 Test complete');
  }
}

testLoginIntercept().catch(console.error);
