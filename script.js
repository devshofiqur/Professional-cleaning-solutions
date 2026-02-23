/* =============================================
   PROSHINE PRESSURE WASHING — script.js
   =============================================
   Sections:
   1. Navigation (sticky + hamburger)
   2. Scroll animations
   3. Contact form handler
   4. Active nav link highlighter
   ============================================= */

/* ===== 1. NAVIGATION ===== */
const nav           = document.querySelector('.nav');
const hamburgerBtn  = document.getElementById('hamburgerBtn');
const mobileMenu    = document.getElementById('mobileMenu');

// Sticky shadow on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Hamburger toggle
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav__mobile .nav__link, .nav__mobile .nav__cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ===== 2. SCROLL-TRIGGERED FADE-UP ANIMATIONS ===== */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ===== 3. CONTACT FORM HANDLER ===== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const successMsg = document.getElementById('formSuccess');

    // Show loading
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate a short delay (replace with real fetch() to your backend)
    await new Promise(resolve => setTimeout(resolve, 900));

    /* 
    ─────────────────────────────────────────────────
    TO CONNECT TO A REAL BACKEND:
    Replace the simulate delay above with:

    const formData = new FormData(contactForm);
    const response = await fetch('/your-form-endpoint', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Server error');
    ─────────────────────────────────────────────────
    */

    contactForm.style.display = 'none';
    if (successMsg) {
      successMsg.classList.add('visible');
    }
  });
}

/* ===== 4. ACTIVE NAV LINK ===== */
// Highlights the correct nav link based on current page
(function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

/* ===== 5. SMOOTH SCROLL for anchor links (offset for fixed nav) ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = nav ? nav.offsetHeight : 72;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
