import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('\n🏁 Test suite completed');
  console.log('📊 Check test-results/ for detailed reports');
}

export default globalTeardown;
