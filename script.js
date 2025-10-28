// ============================================
// PAPSNET Homepage - Interactive Features
// ============================================

/**
 * Mobile Navigation Toggle
 * Handles the hamburger menu functionality
 */
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

        // Toggle menu visibility
        navMenu.classList.toggle('active');

        // Update aria attributes for accessibility
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileToggle.setAttribute('aria-label', isExpanded ? '메뉴 열기' : '메뉴 닫기');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', '메뉴 열기');
        }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', '메뉴 열기');
        });
    });
}

/**
 * Smooth Scrolling
 * Adds smooth scroll behavior to anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');

            // Skip if it's just '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            event.preventDefault();

            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Navbar Scroll Effect
 * Changes navbar appearance on scroll
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add shadow when scrolled
        if (currentScrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

/**
 * Intersection Observer for Animations
 * Animates elements when they enter viewport
 */
function initScrollAnimations() {
    // Elements to observe
    const observerTargets = document.querySelectorAll(
        '.service-card, .portfolio-item, .visual-card, .stat-item, .contact-item'
    );

    if (observerTargets.length === 0) return;

    // Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with slight delay for stagger effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);

                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial styles and observe
    observerTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(30px)';
        target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(target);
    });
}

/**
 * Contact Form Handler
 * Handles form submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '전송 중...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            alert('문의가 성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다.');

            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            alert('문의 전송에 실패했습니다. 다시 시도해주세요.');
            console.error('Form submission error:', error);
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Dynamic Year in Footer
 * Updates copyright year automatically
 */
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');

    if (copyrightText) {
        copyrightText.innerHTML = `&copy; ${currentYear} PAPSNET. All rights reserved.`;
    }
}

/**
 * Parallax Effect for Hero Section
 * Creates subtle parallax scrolling effect
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        const orbs = hero.querySelectorAll('.gradient-orb');

        // Apply parallax only if user hasn't disabled motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = `${1 - scrolled / 600}`;
            }

            orbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                orb.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
            });
        }
    }, { passive: true });
}

/**
 * Number Counter Animation
 * Animates stat numbers when they become visible
 */
function initNumberCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                // Animate counter
                animateCounter(target, 0, numericValue, 2000, suffix);

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Helper: Animate Counter
 * Counts from start to end over duration
 */
function animateCounter(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

/**
 * Add Active State to Current Section
 * Highlights current section in navigation
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 100;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/**
 * Carousel Class
 * Handles carousel functionality with smooth transitions
 */
class Carousel {
    constructor(carouselId) {
        this.carouselId = carouselId;
        this.wrapper = document.querySelector(`[data-carousel="${carouselId}"]`);

        if (!this.wrapper) return;

        this.track = this.wrapper.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = document.querySelector(`[data-carousel-control="${carouselId}"][data-direction="prev"]`);
        this.nextBtn = document.querySelector(`[data-carousel-control="${carouselId}"][data-direction="next"]`);
        this.indicators = document.querySelector(`[data-carousel-indicators="${carouselId}"]`);
        this.indicatorButtons = this.indicators ? Array.from(this.indicators.children) : [];

        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        // Set up event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Indicator buttons
        this.indicatorButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch/swipe support
        this.initTouchSupport();

        // Keyboard navigation
        this.initKeyboardSupport();

        // Start autoplay
        this.startAutoplay();

        // Pause on hover
        this.wrapper.addEventListener('mouseenter', () => this.stopAutoplay());
        this.wrapper.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = index;

        const offset = -index * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        this.updateIndicators();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);

        // Reset autoplay
        this.stopAutoplay();
        this.startAutoplay();
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    updateIndicators() {
        this.indicatorButtons.forEach((button, index) => {
            if (index === this.currentIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    initTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoplay();
        }, { passive: true });

        this.wrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        this.wrapper.addEventListener('touchend', () => {
            if (!isDragging) return;

            const diff = startX - currentX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            isDragging = false;
            this.startAutoplay();
        });
    }

    initKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard if carousel is in view
            const rect = this.wrapper.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isInView) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.next();
            }
        });
    }
}

/**
 * Initialize Carousels
 * Creates carousel instances for all carousels on the page
 */
function initCarousels() {
    const portfolioCarousel = new Carousel('portfolio');
    const testimonialsCarousel = new Carousel('testimonials');

    // Store carousel instances globally for debugging
    window.carousels = {
        portfolio: portfolioCarousel,
        testimonials: testimonialsCarousel
    };
}

/**
 * Initialize All Features
 * Main initialization function
 */
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        initializeAll();
    }
}

/**
 * Initialize all functions
 */
function initializeAll() {
    console.log('🚀 PAPSNET Homepage initialized');

    // Initialize all features
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initScrollAnimations();
    initContactForm();
    updateCopyrightYear();
    initParallaxEffect();
    initNumberCounters();
    initActiveNavigation();
    initCarousels(); // Initialize carousels

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
}

// Start initialization
init();
