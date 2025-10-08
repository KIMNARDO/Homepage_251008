import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');

  // Ensure backend server is running
  console.log('✅ Backend server should be running on http://localhost:8080');
  console.log('✅ Frontend server should be running on http://localhost:5173');

  // Optional: Verify servers are accessible
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Check backend
    const backendResponse = await page.goto('http://localhost:8080/api/public/sections', {
      timeout: 5000,
      waitUntil: 'networkidle'
    });
    console.log('✅ Backend API accessible:', backendResponse?.status());

    // Check frontend
    const frontendResponse = await page.goto('http://localhost:5173', {
      timeout: 10000,
      waitUntil: 'networkidle'
    });
    console.log('✅ Frontend accessible:', frontendResponse?.status());
  } catch (error) {
    console.error('⚠️ Server check failed:', error);
    console.log('⚠️ Please ensure both servers are running:');
    console.log('   - Backend: cd backend-simple && npm start');
    console.log('   - Frontend: npm run dev');
  } finally {
    await browser.close();
  }

  console.log('✅ Global setup complete\n');
}

export default globalSetup;
