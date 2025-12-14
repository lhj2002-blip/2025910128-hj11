// 캐러셀 기능
document.addEventListener('DOMContentLoaded', () => {
    // 모든 캐러셀 초기화
    initCarousel('.guide-carousel');
    initCarousel('.product-carousel');
});

function initCarousel(carouselSelector) {
    const carousels = document.querySelectorAll(carouselSelector);
    
    carousels.forEach(carousel => {
        const cards = carousel.querySelectorAll('.guide-card, .product-card');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (cards.length === 0) return;
        
        let currentIndex = 0;
        
        // 이전 버튼 클릭
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCarousel(cards, dots, currentIndex);
            });
        }
        
        // 다음 버튼 클릭
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarousel(cards, dots, currentIndex);
            });
        }
        
        // 도트 클릭 이벤트
        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(dot.getAttribute('data-index'));
                if (!isNaN(index)) {
                    currentIndex = index;
                    updateCarousel(cards, dots, currentIndex);
                }
            });
        });
    });
}

function updateCarousel(cards, dots, index) {
    // 모든 카드 숨기기
    cards.forEach(card => {
        card.classList.remove('active');
    });
    
    // 모든 도트 비활성화
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 현재 카드와 도트 활성화
    if (cards[index]) {
        cards[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// 스크롤 애니메이션
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

// 애니메이션 적용할 요소들
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.stats-section, .intro-section, .indoor-section, .guide-section, .product-section, .outdoor-section'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
