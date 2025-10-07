import { chromium } from 'playwright';

async function manualDebug() {
  console.log('🚀 Manual debug - browser will stay open\n');
  console.log('Instructions:');
  console.log('1. Fill email: admin@papsnet.net');
  console.log('2. Fill password: admin123');
  console.log('3. Click login button');
  console.log('4. Check browser console for [LoginPage] logs');
  console.log('5. Press Ctrl+C when done\n');

  const browser = await chromium.launch({
    headless: false,
    devtools: true,  // Open DevTools automatically
    slowMo: 0
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  // Navigate to login
  await page.goto('http://localhost:5176/admin/login', {
    waitUntil: 'networkidle'
  });

  console.log('✅ Page loaded. Browser DevTools is open.');
  console.log('👉 Perform manual testing now...\n');

  // Keep browser open indefinitely
  await page.waitForTimeout(1000000);
}

manualDebug().catch(console.error);
