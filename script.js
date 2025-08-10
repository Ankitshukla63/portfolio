document.addEventListener('DOMContentLoaded', function () {

  // --- SELECTORS ---
  const typedElement = document.getElementById('typed');
  const yearElement = document.getElementById('year');
  const navbar = document.querySelector('.custom-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  const filterContainer = document.querySelector('#project-filters');
  const projectItems = document.querySelectorAll('.project-item');
  const mobileNav = document.getElementById('nav');
  const bsCollapse = mobileNav ? new bootstrap.Collapse(mobileNav, { toggle: false }) : null;


  // --- INITIALIZATIONS & HANDLERS ---

  // 1. Typed.js Animation
  if (typedElement && window.Typed) {
    new Typed('#typed', {
      strings: ['a Web Developer.', 'a UI/UX Enthusiast.', 'a Full-Stack Developer.'],
      typeSpeed: 60, backSpeed: 30, backDelay: 1500, loop: true, cursorChar: '|'
    });
  }

  // 2. Set Copyright Year
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // 3. Smooth Scrolling for Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (bsCollapse && mobileNav.classList.contains('show')) bsCollapse.hide();
      }
    });
  });

  // 4. All Scroll-based behaviors
  const handleScroll = () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    scrollTopBtn.classList.toggle('active', scrollY > 300);
    let currentSectionId = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 120) currentSectionId = sec.getAttribute('id');
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`));
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  
  // 5. Project Filtering Logic
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;

      filterContainer.querySelector('.active').classList.remove('active');
      e.target.classList.add('active');
      const filterValue = e.target.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category');
        item.style.display = (filterValue === '*' || itemCategories.includes(filterValue)) ? 'block' : 'none';
      });
    });
  }

  // --- ANIMATION LOGIC ---

  // 6. Staggered Fade-in Animation Logic
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Use a staggered delay based on the element's position in its parent
        const delay = entry.target.dataset.staggerDelay || 150;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-stagger').forEach((el, index) => {
    el.dataset.staggerDelay = index * 100; // Assign a delay to each item
    observer.observe(el);
  });


  // 7. Interactive Spotlight Card Logic
  document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside the element.
      const y = e.clientY - rect.top;  // y position inside the element.
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});