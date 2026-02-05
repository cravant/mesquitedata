// ===========================
// Mesquite Data - Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // Mobile Navigation Toggle
    // ===========================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    
    // ===========================
    // Sticky Navigation on Scroll
    // ===========================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ===========================
    // Active Navigation Link Highlighting
    // ===========================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-menu a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    
    // ===========================
    // Scroll Reveal Animations
    // ===========================
    
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on load
    revealOnScroll();
    
    // Check on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            revealOnScroll();
        });
    });
    
    
    // ===========================
    // Smooth Scrolling for Anchor Links
    // ===========================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===========================
    // Contact Form Handling
    // ===========================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simple validation
            const requiredFields = ['name', 'company', 'email', 'service', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc2626';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailInput = contactForm.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#dc2626';
            }
            
            if (!isValid) {
                showFormMessage('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For this static site, we'll just show a success message
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                // Show success message
                showFormMessage('Thank you for your message! We\'ll get back to you within one business day.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        });
    }
    
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            
            // Hide error messages after 5 seconds
            if (type === 'error') {
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    }
    
    
    // ===========================
    // Interactive Hover Effects
    // ===========================
    
    // Add subtle hover animations to cards
    const cards = document.querySelectorAll('.value-card, .service-card, .location-card, .mission-card, .principle-card, .benefit-card, .approach-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
    
    
    // ===========================
    // Hero Stats Animation
    // ===========================
    
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const heroTop = heroSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (heroTop < windowHeight * 0.75) {
            statsAnimated = true;
            
            stats.forEach(stat => {
                const text = stat.textContent;
                
                // Only animate if it's a number
                if (text.match(/^\d+$/)) {
                    const finalValue = parseInt(text);
                    let currentValue = 0;
                    const increment = finalValue / 40;
                    const duration = 1500;
                    const stepTime = duration / 40;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            stat.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(currentValue);
                        }
                    }, stepTime);
                }
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateStats);
    // Check on load
    animateStats();
    
    
    // ===========================
    // Service Card Filtering (if needed in future)
    // ===========================
    
    // This section can be expanded for filtering services
    // Currently just a placeholder for future functionality
    
    
    // ===========================
    // Lazy Loading for Images (if images are added)
    // ===========================
    
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    
    // ===========================
    // Performance Optimization
    // ===========================
    
    // Debounce function for scroll events
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
    
    
    // ===========================
    // Accessibility Enhancements
    // ===========================
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Focus management for mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                // Focus first link when menu opens
                setTimeout(() => {
                    const firstLink = navMenu.querySelector('a');
                    if (firstLink) firstLink.focus();
                }, 100);
            }
        });
    }
    
    
    // ===========================
    // Page Load Optimizations
    // ===========================
    
    // Add loaded class to body when page is fully loaded
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    
    // ===========================
    // Console Easter Egg
    // ===========================
    
    console.log('%cMesquite Data', 'font-size: 24px; font-weight: bold; color: #2563eb;');
    console.log('%cTexas-based data & web solutions built to scale real businesses.', 'font-size: 14px; color: #334155;');
    console.log('%cInterested in working with us? Visit: https://mesquitedata.com/contact', 'font-size: 12px; color: #64748b;');
    
});


// ===========================
// Utility Functions
// ===========================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return (scrollTop / (documentHeight - windowHeight)) * 100;
}
