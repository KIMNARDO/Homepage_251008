// 제품 상세 페이지 JavaScript

// URL에서 제품 ID 가져오기
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// 제품 데이터 로드
async function loadProductDetail() {
    const productId = getProductIdFromUrl();

    if (!productId) {
        showError();
        return;
    }

    try {
        const response = await fetch('../data/products.json');
        const products = await response.json();
        const product = products.find(p => p.id === parseInt(productId));

        if (!product) {
            showError();
            return;
        }

        displayProductDetail(product);
        loadOtherProducts(products, parseInt(productId));
        hideLoading();
    } catch (error) {
        console.error('제품 데이터 로드 실패:', error);
        showError();
    }
}

// 제품 상세 정보 표시
function displayProductDetail(product) {
    // 페이지 타이틀
    document.title = `${product.name} - PAPSNET`;

    // Breadcrumb
    document.getElementById('breadcrumbProduct').textContent = product.name;

    // 카테고리 배지
    const categoryBadge = document.getElementById('categoryBadge');
    categoryBadge.textContent = getCategoryName(product.category);

    // 제품명
    document.getElementById('productName').textContent = product.name;

    // 설명
    document.getElementById('productDescription').textContent = product.description;

    // 상세 설명
    document.getElementById('detailDescription').textContent = product.detailDescription;

    // 기능 목록
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = product.features.map(feature => `
        <li>${feature}</li>
    `).join('');

    // 가격
    document.getElementById('productPrice').textContent = product.price;
}

// 다른 제품 로드
function loadOtherProducts(products, currentProductId) {
    const otherProducts = products.filter(p => p.id !== currentProductId).slice(0, 3);
    const otherProductsGrid = document.getElementById('otherProductsGrid');

    otherProductsGrid.innerHTML = otherProducts.map(product => `
        <a href="detail.html?id=${product.id}" class="product-card">
            <div class="product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="product-category">${getCategoryName(product.category)}</span>
        </a>
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

// 로딩 숨기기
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('productDetail').style.display = 'block';
}

// 에러 표시
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

// 문의하기 버튼 클릭 시 메인 페이지의 문의 섹션으로 이동
function scrollToContact() {
    window.location.href = '../index.html#contact';
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
});
