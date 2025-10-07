import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('📱 Opening homepage...');
  await page.goto('http://localhost:5173');

  // Wait for hero section to load
  await page.waitForTimeout(3000);

  // Check if data.json content is loaded
  const heroTitle = await page.locator('h1 span.bg-gradient-to-r').textContent();
  console.log('\n✅ Hero Title Found:', heroTitle);

  // Check console logs for data.json loading
  page.on('console', msg => {
    if (msg.text().includes('[HeroSection]')) {
      console.log('🔍 Console:', msg.text());
    }
  });

  // Take screenshot
  await page.screenshot({ path: 'd:/Claude_Code/HomePAGE_V6.0_250920/homepage-hero.png', fullPage: true });
  console.log('\n📸 Screenshot saved: homepage-hero.png');

  // Check network request to backend
  const apiCalled = await page.evaluate(() => {
    return new Promise((resolve) => {
      fetch('http://localhost:8080/api/public/hero')
        .then(res => res.json())
        .then(data => {
          console.log('[TEST] API Response:', data);
          resolve(data);
        })
        .catch(err => {
          console.error('[TEST] API Error:', err);
          resolve(null);
        });
    });
  });

  console.log('\n🌐 Backend API Response:', apiCalled);

  if (heroTitle.includes('PLM 솔루션의 새로운 기준')) {
    console.log('\n✅ SUCCESS: data.json content IS reflected on homepage!');
  } else if (heroTitle.includes('People and People Solution Networks')) {
    console.log('\n❌ FAIL: Still showing old static content');
    console.log('   Expected: "PLM 솔루션의 새로운 기준"');
    console.log('   Got:', heroTitle);
  } else {
    console.log('\n⚠️  UNKNOWN: Unexpected hero title');
    console.log('   Got:', heroTitle);
  }

  console.log('\n⏳ Keeping browser open for 10 seconds...');
  await page.waitForTimeout(10000);

  await browser.close();
})();
