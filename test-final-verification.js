const { chromium } = require('playwright');

async function finalTestVerification() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000 // Slow for visibility
  });
  const page = await browser.newContext().then(ctx => ctx.newPage());

  try {
    console.log('=== FINAL TEST VERIFICATION ===\n');

    // Step 1: Reset to default content
    console.log('1. Resetting content to default...');
    await page.evaluate(async () => {
      const response = await fetch('http://localhost:3001/api/admin/page-content/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentKey: 'hero.title',
          contentValue: 'People and People Solution Networks',
          isActive: true
        })
      });
      return await response.json();
    });
    console.log('   Reset to: "People and People Solution Networks"');

    // Step 2: Check homepage shows default
    console.log('\n2. Checking homepage with default content...');
    await page.goto('http://localhost:5176');
    await page.waitForSelector('h1', { timeout: 10000 });
    await page.waitForTimeout(2000); // Wait for React to render

    const defaultTitle = await page.textContent('h1');
    console.log(`   Current title: "${defaultTitle}"`);

    if (!defaultTitle.includes('TEST')) {
      console.log('   ✅ No TEST keyword - default state confirmed');
    } else {
      console.log('   ⚠️ TEST keyword still present from previous test');
    }

    // Step 3: Update to TEST content via API
    console.log('\n3. Updating content to include TEST...');
    const timestamp = new Date().toLocaleTimeString('ko-KR');
    const testContent = `TEST - Final Verification ${timestamp}`;

    await page.evaluate(async (content) => {
      const response = await fetch('http://localhost:3001/api/admin/page-content/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentKey: 'hero.title',
          contentValue: content,
          isActive: true
        })
      });
      return await response.json();
    }, testContent);
    console.log(`   Updated to: "${testContent}"`);

    // Step 4: Reload page and verify TEST appears
    console.log('\n4. Reloading homepage to check for TEST...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 10000 });
    await page.waitForTimeout(2000); // Wait for React

    const newTitle = await page.textContent('h1');
    console.log(`   New title: "${newTitle}"`);

    // Step 5: Final verification
    console.log('\n=== RESULTS ===');
    console.log(`Default: "${defaultTitle}"`);
    console.log(`Updated: "${newTitle}"`);

    if (newTitle.includes('TEST') && newTitle !== defaultTitle) {
      console.log('\n✅ SUCCESS: Content synchronization working!');
      console.log('   - Default content displayed initially');
      console.log('   - TEST content displayed after update');
      console.log('   - Real-time synchronization confirmed');
    } else {
      console.log('\n❌ FAILED: Content not updating');
      console.log('   - Title did not change after update');

      // Check backend directly
      const backendData = await page.evaluate(async () => {
        const response = await fetch('http://localhost:3001/api/public/content');
        const data = await response.json();
        const heroTitle = data.data?.find(item => item.contentKey === 'hero.title');
        return heroTitle?.contentValue;
      });

      console.log(`   - Backend returns: "${backendData}"`);

      if (backendData && backendData.includes('TEST')) {
        console.log('   - ⚠️ Backend updated but frontend not syncing');
      }
    }

    // Take screenshots
    await page.screenshot({ path: 'final-test-result.png', fullPage: true });
    console.log('\nScreenshot saved: final-test-result.png');

  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

finalTestVerification();