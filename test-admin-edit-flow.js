// Test script to simulate admin edit flow
const axios = require('axios');

async function testAdminEditFlow() {
  const API_BASE = 'http://localhost:3001/api';

  try {
    console.log('=== 관리자 편집 → 홈페이지 반영 테스트 ===\n');

    // Step 1: Get current hero.title content
    console.log('1. 현재 hero.title 확인...');
    const currentResponse = await axios.get(`${API_BASE}/public/content`);
    const currentHeroTitle = currentResponse.data.data?.find(item => item.contentKey === 'hero.title');
    console.log('   현재 값:', currentHeroTitle?.contentValue || 'Not found');
    console.log('   Content Type:', currentHeroTitle?.contentType);
    console.log('');

    // Step 2: Simulate admin edit (ID 1 is hero.title)
    const timestamp = new Date().toLocaleTimeString('ko-KR');
    const testTitle = `TEST - 관리자 편집 테스트 ${timestamp}`;

    console.log('2. 관리자 모드에서 편집 시뮬레이션...');
    console.log('   새로운 값:', testTitle);

    // This simulates what AdminContent.tsx sends
    const adminPayload = {
      title: testTitle,  // This is what admin UI sends
      content: testTitle,  // Admin might send this too
      contentValue: testTitle,  // This is what we actually need
      contentType: 'HERO_HEADING',
      sectionIdentifier: 'home-hero',
      languageCode: 'ko',
      displayOrder: 0,
      isPublished: true
    };

    const updateResponse = await axios.put(`${API_BASE}/admin/page-content/1`, adminPayload);
    console.log('   업데이트 성공:', updateResponse.data.success);
    console.log('');

    // Step 3: Verify updated content
    console.log('3. 업데이트 후 확인...');
    const verifyResponse = await axios.get(`${API_BASE}/public/content`);
    const updatedHeroTitle = verifyResponse.data.data?.find(item => item.contentKey === 'hero.title');
    console.log('   새로운 값:', updatedHeroTitle?.contentValue);
    console.log('   TEST 포함:', updatedHeroTitle?.contentValue?.includes('TEST') ? '✅ YES' : '❌ NO');
    console.log('');

    // Step 4: Check what homepage would see
    console.log('4. 홈페이지가 받을 데이터 구조:');
    console.log('   contentKey:', updatedHeroTitle?.contentKey);
    console.log('   contentValue:', updatedHeroTitle?.contentValue);
    console.log('   contentType:', updatedHeroTitle?.contentType);
    console.log('');

    // Step 5: Final result
    console.log('=== 결과 ===');
    if (updatedHeroTitle?.contentValue?.includes('TEST')) {
      console.log('✅ SUCCESS: 관리자 편집이 백엔드에 저장됨');
      console.log('✅ SUCCESS: /api/public/content에서 TEST 확인됨');
      console.log('⚠️  홈페이지는 새로고침 필요 (F5)');
    } else {
      console.log('❌ FAILED: 관리자 편집이 반영되지 않음');
    }

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Check if axios is installed
try {
  require.resolve('axios');
  testAdminEditFlow();
} catch(e) {
  console.log('Installing axios...');
  require('child_process').execSync('npm install axios', { stdio: 'inherit' });
  testAdminEditFlow();
}