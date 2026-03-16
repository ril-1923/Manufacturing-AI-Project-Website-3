// TechForge Industries Manufacturing Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initContactForm();
    initCounterAnimations();
    initParallaxEffects();
    initMobileOptimizations();
    initPerformanceOptimizations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    }, 10));
    
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Hero section animations
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    const heroVisual = document.querySelector('.hero-visual');
    
    // Animate hero elements on load
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate hero visual
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(60px)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 400);
    }
    
    // Animate overlay cards
    const overlayCards = document.querySelectorAll('.overlay-card');
    overlayCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 800 + (index * 200));
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for service cards
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
                
                // Special handling for portfolio cards
                if (entry.target.classList.contains('portfolio-card')) {
                    animatePortfolioCard(entry.target);
                }
                
                // Special handling for capability items
                if (entry.target.classList.contains('capability-item')) {
                    animateCapabilityItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .capability-item, .contact-card, .about-visual'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transitionDelay = `${index * 100}ms`;
        observer.observe(element);
    });
    
    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;
    document.head.appendChild(style);
}

function animateServiceCard(card) {
    const icon = card.querySelector('.service-icon');
    const listItems = card.querySelectorAll('.service-list li');
    const stats = card.querySelectorAll('.stat');
    
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
    
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 400 + (index * 100));
    });
    
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.5s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'scale(1)';
        }, 600 + (index * 150));
    });
}

function animatePortfolioCard(card) {
    const image = card.querySelector('img');
    
    if (image) {
        image.style.transform = 'scale(1.2)';
        setTimeout(() => {
            image.style.transition = 'transform 0.8s ease';
            image.style.transform = 'scale(1)';
        }, 100);
    }
}

function animateCapabilityItem(item) {
    const icon = item.querySelector('.capability-icon');
    const content = item.querySelector('.capability-content');
    
    if (icon) {
        icon.style.transform = 'scale(0) rotate(180deg)';
        setTimeout(() => {
            icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateX(30px)';
        setTimeout(() => {
            content.style.transition = 'all 0.5s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
        }, 400);
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Submit form
            submitForm(formData);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Required fields validation
    const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (if provided)
    if (data.phone && !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.id;
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldName, 'This field is required');
        return false;
    }
    
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldName, 'Please enter a valid email address');
        return false;
    }
    
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        showFieldError(fieldName, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formFloating = field.closest('.form-floating');
    
    // Remove existing error
    const existingError = formFloating.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.classList.add('is-invalid');
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-danger mt-1';
    errorElement.style.fontSize = '0.875rem';
    errorElement.textContent = message;
    formFloating.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const formFloating = field.closest('.form-floating');
    const errorElement = formFloating.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function submitForm(data) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending Message...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear form
        document.getElementById('contactForm').reset();
        
        // Show success message
        showNotification('Thank you for your message! Our team will contact you within 24 hours.', 'success');
        
        // Track form submission (analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': data.service
            });
        }
    }, 2000);
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    const metricsSection = document.querySelector('.hero-metrics');
    if (metricsSection) {
        counterObserver.observe(metricsSection);
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 10));
}

// Mobile optimizations
function initMobileOptimizations() {
    // Touch events for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve touch targets
        const buttons = document.querySelectorAll('.btn, .nav-link, .social-link');
        buttons.forEach(button => {
            button.style.minHeight = '44px';
            button.style.minWidth = '44px';
        });
        
        // Optimize hover effects for touch devices
        const hoverElements = document.querySelectorAll('.service-card, .portfolio-card, .contact-card');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    }
    
    // Viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalImages = [
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Update any scroll-dependent effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        max-width: 500px;
        box-shadow: var(--shadow-xl);
        border-radius: var(--radius-lg);
        border: none;
        backdrop-filter: blur(10px);
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            <div>${message}</div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto dismiss
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Analytics tracking (if Google Analytics is loaded)
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (target) {
        const text = target.textContent.trim();
        const href = target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            trackEvent('navigation_click', 'Internal Link', text);
        } else if (href && href.startsWith('http')) {
            trackEvent('external_link_click', 'External Link', href);
        } else if (target.tagName === 'BUTTON') {
            trackEvent('button_click', 'Button', text);
        }
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('#home');
        if (mainContent) {
            mainContent.focus();
        }
    }
    
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
});

// Enhanced scroll animations for better performance
function createScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;
            
            if (ratio > 0) {
                element.style.opacity = ratio;
                element.style.transform = `translateY(${(1 - ratio) * 50}px)`;
            }
        });
    }, observerOptions);
    
    // Observe elements that should have scroll animations
    const scrollElements = document.querySelectorAll('.service-card, .portfolio-card, .capability-item');
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize enhanced scroll animations
document.addEventListener('DOMContentLoaded', createScrollObserver);

// Print optimization
window.addEventListener('beforeprint', function() {
    // Hide unnecessary elements for printing
    const hideElements = document.querySelectorAll('.navbar, .hero-section, .contact-section, .footer');
    hideElements.forEach(element => {
        element.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const hideElements = document.querySelectorAll('.navbar, .hero-section, .contact-section, .footer');
    hideElements.forEach(element => {
        element.style.display = '';
    });
});

// Add CSS for touch devices
const touchStyles = document.createElement('style');
touchStyles.textContent = `
    .touch-device .service-card:hover,
    .touch-device .portfolio-card:hover,
    .touch-device .contact-card:hover {
        transform: none;
    }
    
    .touch-device .touch-hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
    }
`;
document.head.appendChild(touchStyles);