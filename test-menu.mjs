import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('📱 Opening homepage...');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);

  // Take screenshot of header
  const header = await page.locator('header');
  await header.screenshot({ path: 'd:/Claude_Code/HomePAGE_V6.0_250920/header-menu.png' });
  console.log('📸 Header screenshot saved: header-menu.png');

  // Check menu items
  const menuItems = await page.locator('header nav a').allTextContents();
  console.log('\n📋 Menu Items Found:', menuItems);

  // Check menu item styles
  const firstMenuItem = page.locator('header nav a').first();
  const styles = await firstMenuItem.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      fontSize: computed.fontSize,
      padding: computed.padding,
      display: computed.display
    };
  });
  console.log('\n🎨 First Menu Item Styles:', styles);

  // Check if menu is visible
  const isVisible = await firstMenuItem.isVisible();
  console.log('\n👁️  Menu Visible:', isVisible);

  await page.waitForTimeout(5000);
  await browser.close();
})();
