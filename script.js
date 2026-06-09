/* ── Navbar scroll effect ──────────────────────────── */
const navbar = document.getElementById('navbar');

// On sub-pages, nav is always scrolled
if (document.body.classList.contains('page-inner')) {
  navbar.classList.add('scrolled');
} else {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });
}

/* ── Active nav tracking (homepage only) ───────────── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!navLinks.length) return;

  let current = 'hero';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const active = link.getAttribute('data-section') === current;
    link.classList.toggle('active', active);
  });
}

/* ── Mobile menu toggle ─────────────────────────────── */
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinksContainer.classList.toggle('mobile-open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('mobile-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ── Intersection Observer for scroll animations ────── */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .about-card, .contact-card, .overview-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
  observer.observe(el);
});

// Stagger project cards
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.15}s`;
});

// Stagger about cards
document.querySelectorAll('.about-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger overview cards
document.querySelectorAll('.overview-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});
