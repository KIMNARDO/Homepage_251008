import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const subPages = [
    { name: '활용사례', url: 'http://localhost:5173/case-studies' },
    { name: '가격정책', url: 'http://localhost:5173/pricing' },
    { name: '기술문서', url: 'http://localhost:5173/docs' },
    { name: '블로그', url: 'http://localhost:5173/blog' },
    { name: '연락처', url: 'http://localhost:5173/contact' }
  ];

  for (const subPage of subPages) {
    console.log(`\n📄 Testing: ${subPage.name} (${subPage.url})`);

    try {
      const response = await page.goto(subPage.url, { waitUntil: 'networkidle', timeout: 5000 });
      await page.waitForTimeout(1000);

      const title = await page.title();
      const heading = await page.locator('h1').first().textContent().catch(() => 'No H1 found');
      const bodyText = await page.locator('body').textContent();

      console.log(`  ✅ Status: ${response.status()}`);
      console.log(`  📋 Title: ${title}`);
      console.log(`  📌 H1: ${heading}`);
      console.log(`  📝 Content length: ${bodyText.length} chars`);

      // Screenshot
      await page.screenshot({
        path: `d:/Claude_Code/HomePAGE_V6.0_250920/page-${subPage.name}.png`,
        fullPage: true
      });
      console.log(`  📸 Screenshot saved: page-${subPage.name}.png`);

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }

  console.log('\n✅ All tests completed!');
  await browser.close();
})();
