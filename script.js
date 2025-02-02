document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;
    const backButton = document.querySelector('.back-button');
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // State management
    let currentSlide = 0;
    let slideInterval;

    // Navbar functionality
    function toggleNavbar() {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    navbarToggle.addEventListener('click', toggleNavbar);

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        if (!isClickInside && navbarMenu.classList.contains('active')) {
            toggleNavbar();
        }
    });

    // Prevent clicks inside the menu from closing it
    navbarMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close menu when clicking on a link
    const navbarLinks = document.querySelectorAll('.navbar-links a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
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

    // Error handling wrapper
    function safeExecute(fn, fallback = () => {}) {
        try {
            fn();
        } catch (error) {
            console.error('An error occurred:', error);
            fallback();
        }
    }

    // Improved window resize handler
    const debouncedUpdateHighlightVisibility = debounce(updateHighlightVisibility, 250);

    // Highlight cards visibility
    function updateHighlightVisibility() {
        const screenWidth = window.innerWidth;

        const highlightCards = document.querySelectorAll('.highlight-card');

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

    window.addEventListener('resize', debouncedUpdateHighlightVisibility);

    // Initialize all components safely
    safeExecute(() => {
        initializeCarousel();
        updateHighlightVisibility();
    });

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

    // Add this new code to handle active state of navbar links
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const viewMoreBtn = document.getElementById('view-more-btn');
    const extendedMatches = document.getElementById('extended-matches');

    viewMoreBtn.addEventListener('click', function() {
        extendedMatches.classList.toggle('hidden');
        extendedMatches.classList.toggle('expanded');
        
        if (extendedMatches.classList.contains('hidden')) {
            viewMoreBtn.textContent = 'View More';
            // Scroll back to the top of the matches section
            document.querySelector('.upcoming-matches').scrollIntoView({ behavior: 'smooth' });
        } else {
            viewMoreBtn.textContent = 'View Less';
        }
    });

    const scorerItems = document.querySelectorAll('.scorer-item');

    scorerItems.forEach(item => {
        const scorerSummary = item.querySelector('.scorer-summary');
        const expandedList = item.querySelector('.scorer-expanded');

        scorerSummary.addEventListener('click', function() {
            // Close all other expanded lists
            scorerItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.scorer-expanded').classList.add('hidden');
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked list
            expandedList.classList.toggle('hidden');
            item.classList.toggle('active');
        });
    });

    // VC Cup Carousel
    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length > 0) {
            let currentSlide = 0;

            function showSlide(index) {
                slides[currentSlide].classList.remove('active');
                slides[index].classList.add('active');
                currentSlide = index;
            }

            function nextSlide() {
                let next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }

            setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    });

    document.querySelectorAll('.competition-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // If the click is on the link or its children, don't prevent default
            if (e.target.closest('.competition-link')) {
                return;
            }
            // Your existing click handler code...
        });
    });
});
