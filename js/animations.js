/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSkillBars();
});

/* === INTERSECTION OBSERVER FOR SCROLL ANIMATIONS === */
function initScrollAnimations() {
    // Options for the observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    // Create observer
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add revealed class to trigger animation
                entry.target.classList.add('revealed');
                
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll(
        '.reveal-text, .reveal-left, .reveal-right, .reveal-up, .reveal-scale'
    );
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* === ANIMATED SKILL BARS === */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset and animate
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                // Stop observing after animation
                skillObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

/* === PARALLAX EFFECT === */
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/* === STAGGER ANIMATION === */
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
    });
}

/* === SCROLL PROGRESS INDICATOR === */
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
}

/* === COUNTER ANIMATION === */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/* === NUMBER COUNTER ON SCROLL === */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* === TEXT REVEAL ANIMATION === */
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = 1;
        
        // Wrap each character in a span
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = 0;
            span.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
            element.appendChild(span);
        });
    });
}

/* === HOVER TILT EFFECT === */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* === MAGNETIC BUTTON EFFECT === */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/* === RIPPLE EFFECT === */
function createRipple(event) {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

/* === SMOOTH REVEAL ON SCROLL === */
function smoothRevealOnScroll() {
    const elements = document.querySelectorAll('.smooth-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* === LOADING ANIMATION === */
function initLoadingAnimation() {
    // Add page loaded class after content loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Optional: Hide loading spinner
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500);
        }
    });
}

/* === EXPORT FUNCTIONS === */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initSkillBars,
        initParallax,
        staggerAnimation,
        initScrollProgress,
        animateCounter,
        initCounters,
        initTextReveal,
        initTiltEffect,
        initMagneticButtons,
        createRipple,
        smoothRevealOnScroll,
        initLoadingAnimation
    };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // You can uncomment any of these to enable additional effects:
    // initParallax();
    // initScrollProgress();
    // initCounters();
    // initTiltEffect();
    // initMagneticButtons();
    smoothRevealOnScroll();
    initLoadingAnimation();
});
