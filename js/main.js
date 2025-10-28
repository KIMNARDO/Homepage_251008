// PAPSNET 메인 JavaScript

// 제품 데이터 로드 및 표시
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('제품 데이터 로드 실패:', error);
        // 오프라인 또는 개발 환경을 위한 대체 데이터
        displayProducts([]);
    }
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <a href="products/detail.html?id=${product.id}" class="product-card">
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

function getCategoryName(category) {
    const categories = {
        'security': '보안',
        'network': '네트워크',
        'cloud': '클라우드',
        'collaboration': '협업'
    };
    return categories[category] || category;
}

// 캐러셀 기능
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-control.prev');
        this.nextBtn = document.querySelector('.carousel-control.next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.isPlaying = true;

        this.init();
    }

    init() {
        if (!this.slides.length) return;

        // 컨트롤 버튼 이벤트
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // 인디케이터 이벤트
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // 키보드 네비게이션
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // 자동 재생 시작
        this.startAutoPlay();

        // 마우스 호버 시 자동 재생 일시 정지
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer?.addEventListener('mouseenter', () => this.stopAutoPlay());
        carouselContainer?.addEventListener('mouseleave', () => this.startAutoPlay());

        // 터치 스와이프 지원
        this.addTouchSupport();
    }

    goToSlide(n) {
        this.slides[this.currentSlide]?.classList.remove('active');
        this.indicators[this.currentSlide]?.classList.remove('active');

        this.currentSlide = (n + this.slides.length) % this.slides.length;

        this.slides[this.currentSlide]?.classList.add('active');
        this.indicators[this.currentSlide]?.classList.add('active');
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addTouchSupport() {
        const carousel = document.querySelector('.carousel-container');
        if (!carousel) return;

        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// 모바일 메뉴 토글
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');

        // 햄버거 아이콘 애니메이션
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu?.classList.contains('active')
            ? 'rotate(45deg) translate(5px, 5px)'
            : '';
        spans[1].style.opacity = navMenu?.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu?.classList.contains('active')
            ? 'rotate(-45deg) translate(7px, -6px)'
            : '';
    });

    // 메뉴 항목 클릭 시 메뉴 닫기
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            const hamburger = document.querySelector('.hamburger');
            const spans = hamburger?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
    });
}

// 스크롤 시 헤더 효과
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// 부드러운 스크롤
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 문의 폼 제출
function initContactForm() {
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            timestamp: new Date().toISOString()
        };

        try {
            // 실제 환경에서는 서버로 전송
            console.log('문의 제출:', formData);

            // 성공 메시지
            alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
            form.reset();
        } catch (error) {
            console.error('문의 전송 실패:', error);
            alert('문의 전송에 실패했습니다. 다시 시도해주세요.');
        }
    });
}

// Intersection Observer로 애니메이션 효과
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들
    document.querySelectorAll('.product-card, .stat-item, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 제품 로드
    loadProducts();

    // 캐러셀 초기화
    new Carousel();

    // 모바일 메뉴
    initMobileMenu();

    // 스크롤 효과
    initScrollEffects();

    // 부드러운 스크롤
    initSmoothScroll();

    // 문의 폼
    initContactForm();

    // 스크롤 애니메이션
    initScrollAnimations();

    // 콘솔 메시지
    console.log('%c PAPSNET Homepage ',
        'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
    console.log('홈페이지가 성공적으로 로드되었습니다.');
});

// 페이지 로드 성능 모니터링
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`페이지 로드 시간: ${loadTime.toFixed(2)}ms`);
});
