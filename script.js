document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const navbarExtra = document.querySelector('.navbar-extra');

    navbarToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        navbarExtra.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });

    // Carousel functionality
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});