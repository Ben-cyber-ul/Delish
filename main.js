document.addEventListener('DOMContentLoaded', function() {
  const carouselEl = document.querySelector('#heroCarousel');
  if (!carouselEl) return;

  // Initialize Bootstrap carousel with desired options
  const carousel = new bootstrap.Carousel(carouselEl, {
    interval: 5000,
    pause: false,
    ride: false
  });

  // Start cycling
  carousel.cycle();

  // Pause on hover, resume on leave
  carouselEl.addEventListener('mouseenter', () => carousel.pause());
  carouselEl.addEventListener('mouseleave', () => carousel.cycle());

  // Enable keyboard navigation when focused
  carouselEl.setAttribute('tabindex', '0');
  carouselEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') carousel.prev();
    if (e.key === 'ArrowRight') carousel.next();
  });

  // Ensure indicators update (Bootstrap handles this) and make images accessible
  const images = carouselEl.querySelectorAll('.carousel-image');
  images.forEach((el, idx) => {
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', `Slide ${idx + 1}`);
  });

  // Order form handling moved to `js/order.js` (keeps logic modular and improves UX)

  // Navbar Transparent to Dark on Scroll
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero-section');

  if (navbar && heroSection) {
    // Initial state for homepage
    navbar.classList.add('transparent');
    navbar.classList.remove('bg-dark');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
        navbar.classList.add('bg-dark'); 
      } else {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
        navbar.classList.remove('bg-dark');
      }
    });
  }
});