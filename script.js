document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // State management
    let currentSlide = 0;
    let slideInterval;

    // Navbar functionality
    function toggleNavbar(event) {
        event.stopPropagation();
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    navbarToggle.addEventListener('click', toggleNavbar);

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        if (!isClickInside && navbarMenu.classList.contains('active')) {
            toggleNavbar(event);
        }
    });

    // Prevent clicks inside the menu from closing it
    navbarMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close menu when clicking on a link
    const navbarLinks = document.querySelectorAll('.navbar-links a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (navbarMenu.classList.contains('active')) {
                toggleNavbar(event);
            }
        });
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
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Initialize components
    initializeCarousel();

    // Event listeners for carousel buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            previousSlide();
            resetSlideshow();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetSlideshow();
        });
    }

    const highlightCards = document.querySelectorAll('.highlight-card');

    function updateHighlightVisibility() {
        const screenWidth = window.innerWidth;

        highlightCards.forEach((card, index) => {
            if (screenWidth <= 768) {
                // Show first 3 on mobile
                if (index < 3) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else if (screenWidth <= 1200) {
                // Show first 6 on tablet
                if (index < 6) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else {
                // Show all on desktop
                card.style.display = 'flex';
            }
        });
    }

    // Initial check
    updateHighlightVisibility();

    // Update on window resize
    window.addEventListener('resize', updateHighlightVisibility);
});
