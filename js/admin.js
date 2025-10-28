// 관리자 대시보드 JavaScript

let products = [];
let currentEditId = null;

// 세션 확인
function checkAuth() {
    const sessionData = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');
    if (!sessionData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(sessionData);
}

// 로그아웃
function logout() {
    localStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminSession');
    window.location.href = 'login.html';
}

// 섹션 전환
function showSection(sectionName) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });

    // 네비게이션 활성화 상태 변경
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 선택된 섹션 표시
    if (sectionName === 'dashboard') {
        document.getElementById('dashboardSection').style.display = 'block';
        document.querySelector('[onclick="showSection(\'dashboard\')"]').classList.add('active');
        updateDashboardStats();
    } else if (sectionName === 'products') {
        document.getElementById('productsSection').style.display = 'block';
        document.querySelector('[onclick="showSection(\'products\')"]').classList.add('active');
        loadProductsTable();
    }
}

// 제품 데이터 로드
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
        products = await response.json();
        return products;
    } catch (error) {
        console.error('제품 데이터 로드 실패:', error);
        return [];
    }
}

// 대시보드 통계 업데이트
async function updateDashboardStats() {
    await loadProducts();

    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('securityProducts').textContent =
        products.filter(p => p.category === 'security').length;
    document.getElementById('networkProducts').textContent =
        products.filter(p => p.category === 'network').length;
    document.getElementById('cloudProducts').textContent =
        products.filter(p => p.category === 'cloud').length;

    // 로그인 시간 표시
    const session = checkAuth();
    if (session) {
        document.getElementById('adminUsername').textContent = session.username;
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const diff = Math.floor((now - loginTime) / 1000 / 60);
        document.getElementById('loginTime').textContent =
            diff < 1 ? '방금 전' : `${diff}분 전`;
    }
}

// 제품 테이블 로드
async function loadProductsTable() {
    await loadProducts();
    const tbody = document.getElementById('productsTableBody');

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><strong>${product.name}</strong></td>
            <td>
                <span class="category-badge ${product.category}">
                    ${getCategoryName(product.category)}
                </span>
            </td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editProduct(${product.id})" title="수정">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id})" title="삭제">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 카테고리 이름 변환
function getCategoryName(category) {
    const categories = {
        'security': '보안',
        'network': '네트워크',
        'cloud': '클라우드',
        'collaboration': '협업'
    };
    return categories[category] || category;
}

// 제품 추가 모달 열기
function openAddProductModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = '제품 추가';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModal').classList.add('active');
}

// 제품 수정
function editProduct(id) {
    currentEditId = id;
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalTitle').textContent = '제품 수정';
    document.getElementById('productId').value = product.id;
    document.getElementById('productNameInput').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDesc').value = product.description;
    document.getElementById('productDetailDesc').value = product.detailDescription;
    document.getElementById('productFeatures').value = product.features.join('\n');
    document.getElementById('productPrice').value = product.price;

    document.getElementById('productModal').classList.add('active');
}

// 제품 삭제
async function deleteProduct(id) {
    if (!confirm('정말 이 제품을 삭제하시겠습니까?')) {
        return;
    }

    products = products.filter(p => p.id !== id);
    await saveProducts();
    loadProductsTable();
    updateDashboardStats();

    alert('제품이 삭제되었습니다.');
}

// 모달 닫기
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    currentEditId = null;
}

// 제품 폼 제출
document.getElementById('productForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('productNameInput').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDesc').value,
        detailDescription: document.getElementById('productDetailDesc').value,
        features: document.getElementById('productFeatures').value
            .split('\n')
            .map(f => f.trim())
            .filter(f => f.length > 0),
        price: document.getElementById('productPrice').value,
        image: `images/${document.getElementById('productCategory').value}.jpg`
    };

    if (currentEditId) {
        // 수정
        const index = products.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            products[index] = { ...products[index], ...formData };
        }
    } else {
        // 추가
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...formData });
    }

    await saveProducts();
    closeProductModal();
    loadProductsTable();
    updateDashboardStats();

    alert(currentEditId ? '제품이 수정되었습니다.' : '제품이 추가되었습니다.');
});

// 제품 데이터 저장
async function saveProducts() {
    try {
        // 실제 환경에서는 서버 API로 전송
        // 여기서는 localStorage에 저장
        localStorage.setItem('productsData', JSON.stringify(products));

        // 데모를 위해 콘솔에 출력
        console.log('저장된 제품 데이터:', products);
        console.log('JSON 데이터:', JSON.stringify(products, null, 2));

        return true;
    } catch (error) {
        console.error('제품 저장 실패:', error);
        alert('제품 저장에 실패했습니다.');
        return false;
    }
}

// localStorage에서 제품 데이터 복원
async function loadProductsFromStorage() {
    const savedData = localStorage.getItem('productsData');
    if (savedData) {
        try {
            products = JSON.parse(savedData);
            console.log('localStorage에서 제품 데이터 복원:', products.length + '개');
        } catch (error) {
            console.error('저장된 데이터 파싱 실패:', error);
        }
    }
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});

// ESC 키로 모달 닫기
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async () => {
    // 인증 확인
    checkAuth();

    // localStorage에서 데이터 복원
    await loadProductsFromStorage();

    // 기본 제품 데이터 로드 (localStorage에 없을 경우)
    if (products.length === 0) {
        await loadProducts();
    }

    // 대시보드 표시
    updateDashboardStats();
});
