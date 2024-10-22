document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const navbarExtra = document.querySelector('.navbar-extra');
    const navbarContainer = document.querySelector('.navbar-container');
    const slides = document.querySelectorAll('.hero-slide');
    
    // State management
    let currentSlide = 0;
    let slideInterval;

    // Navbar functionality
    function toggleNavbar() {
        navbarLinks.classList.toggle('active');
        navbarExtra.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    }

    // Handle click outside navbar to close it
    document.addEventListener('click', (event) => {
        const isClickInside = navbarContainer.contains(event.target);
        const isNavbarActive = navbarLinks.classList.contains('active');

        if (!isClickInside && isNavbarActive) {
            toggleNavbar();
        }
    });

    // Carousel functionality
    function showSlide(index) {
        // Handle edge cases
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Add active class to new slide with fade effect
        slides[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    // Initialize carousel
    function initializeCarousel() {
        if (!slides.length) return;

        // Set initial state
        slides[0].classList.add('active');

        // Add keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                previousSlide();
                resetSlideshow();
            } else if (event.key === 'ArrowRight') {
                nextSlide();
                resetSlideshow();
            }
        });

        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;

        slides.forEach(slide => {
            slide.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            slide.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
            }, { passive: true });

            slide.addEventListener('touchend', () => {
                const difference = touchStartX - touchEndX;
                if (Math.abs(difference) > 50) { // Minimum swipe distance
                    if (difference > 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }
                    resetSlideshow();
                }
            });
        });

        // Start automatic sliding
        startSlideshow();
    }

    function startSlideshow() {
        stopSlideshow(); // Clear any existing interval
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    function resetSlideshow() {
        stopSlideshow();
        startSlideshow();
    }

    // Initialize components
    if (navbarToggle && navbarLinks && navbarExtra) {
        navbarToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to document
            toggleNavbar();
        });
    }

    initializeCarousel();

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });

    // Add smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navbarLinks.classList.contains('active')) {
                    toggleNavbar();
                }
            }
        });
    });

    // Clean up on page unload
    window.addEventListener('unload', () => {
        stopSlideshow();
    });
});