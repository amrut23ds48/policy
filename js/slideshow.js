document.addEventListener('DOMContentLoaded', function() {
    const slideShow = document.querySelector('.slide-show');
    const banners = document.querySelectorAll('.banner');
    
    let currentSlide = 0;
    const totalSlides = banners.length;

    // Wrap banners in a container for sliding
    slideShow.style.overflow = 'hidden';
    slideShow.style.position = 'relative';
    slideShow.style.display = 'flex';
    slideShow.style.transition = 'transform 0.5s ease';

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        slideShow.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    setInterval(nextSlide, 3000);
});
