// Performance testing script for PAPSNET homepage
const puppeteer = require('puppeteer');

async function runPerformanceTest() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable performance metrics
  await page.setViewport({ width: 1366, height: 768 });

  console.log('🚀 Starting performance test for PAPSNET homepage...');

  try {
    // Navigate to homepage and measure load time
    const navigationStart = Date.now();
    await page.goto('http://localhost:3001', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    const navigationEnd = Date.now();
    const loadTime = navigationEnd - navigationStart;

    console.log(`📊 Page Load Time: ${loadTime}ms`);

    // Get performance metrics
    const performanceMetrics = await page.metrics();
    console.log('📈 Performance Metrics:', {
      JSHeapUsedSize: `${Math.round(performanceMetrics.JSHeapUsedSize / 1024 / 1024)}MB`,
      JSHeapTotalSize: `${Math.round(performanceMetrics.JSHeapTotalSize / 1024 / 1024)}MB`,
      ScriptDuration: `${performanceMetrics.ScriptDuration}ms`,
      TaskDuration: `${performanceMetrics.TaskDuration}ms`,
      LayoutDuration: `${performanceMetrics.LayoutDuration}ms`,
    });

    // Test Core Web Vitals simulation
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        // Simulate LCP measurement
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          resolve({
            LCP: lcp ? lcp.startTime : 'N/A',
            timestamp: Date.now()
          });
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback after 5 seconds
        setTimeout(() => {
          resolve({ LCP: 'Timeout', timestamp: Date.now() });
        }, 5000);
      });
    });

    console.log('🎯 Core Web Vitals:', vitals);

    // Test bundle size by checking network requests
    const resources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources.map(resource => ({
        name: resource.name.split('/').pop(),
        size: resource.transferSize,
        type: resource.name.includes('.js') ? 'JS' :
              resource.name.includes('.css') ? 'CSS' :
              resource.name.includes('.woff') ? 'Font' : 'Other'
      }));
    });

    const totalBundleSize = resources
      .filter(r => r.type === 'JS' || r.type === 'CSS')
      .reduce((sum, r) => sum + (r.size || 0), 0);

    console.log(`📦 Total Bundle Size: ${Math.round(totalBundleSize / 1024)}KB`);

    // Test responsive performance on mobile
    await page.setViewport({ width: 375, height: 667 });
    const mobileStart = Date.now();
    await page.reload({ waitUntil: 'networkidle2' });
    const mobileEnd = Date.now();
    const mobileLoadTime = mobileEnd - mobileStart;

    console.log(`📱 Mobile Load Time: ${mobileLoadTime}ms`);

    // Performance assessment
    const assessment = {
      desktop: {
        loadTime,
        status: loadTime < 3000 ? '✅ Good' : loadTime < 5000 ? '⚠️ Needs Improvement' : '❌ Poor'
      },
      mobile: {
        loadTime: mobileLoadTime,
        status: mobileLoadTime < 3000 ? '✅ Good' : mobileLoadTime < 5000 ? '⚠️ Needs Improvement' : '❌ Poor'
      },
      bundleSize: {
        size: Math.round(totalBundleSize / 1024),
        status: totalBundleSize < 500000 ? '✅ Good' : totalBundleSize < 1000000 ? '⚠️ Needs Improvement' : '❌ Poor'
      }
    };

    console.log('\n📋 Performance Assessment:');
    console.log(`Desktop Load: ${assessment.desktop.status} (${assessment.desktop.loadTime}ms)`);
    console.log(`Mobile Load: ${assessment.mobile.status} (${assessment.mobile.loadTime}ms)`);
    console.log(`Bundle Size: ${assessment.bundleSize.status} (${assessment.bundleSize.size}KB)`);

    return assessment;

  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

// Export for use in other scripts
if (require.main === module) {
  runPerformanceTest().then(results => {
    process.exit(results ? 0 : 1);
  });
}

module.exports = { runPerformanceTest };