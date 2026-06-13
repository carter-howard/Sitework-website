// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open', mobileMenu.classList.contains('open'));
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .approach-step, .serve-card, .resource-card, .problem-item, .stat, .transform-col, .value'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── FORM SUBMIT ──
function handleSubmit(e) {
  e.preventDefault();
  document.querySelector('.contact-form').style.display = 'none';
  document.getElementById('formSuccess').classList.add('visible');
}

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── BLUEPRINT INTRO CLEANUP ──
// Remove the overlay from the DOM after its exit animation finishes.
(function () {
  const intro = document.getElementById('intro');
  if (!intro) return;
  if (!document.documentElement.classList.contains('intro-active')) {
    intro.remove();
    return;
  }
  setTimeout(() => intro.remove(), 2400);
})();

// ── COUNT-UP STATS ──
// Hold the count until the stats have actually faded in:
// longer on first visit (intro playing), shorter on return visits.
const countStartDelay = document.documentElement.classList.contains('intro-active') ? 2300 : 900;

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countObserver.unobserve(entry.target);

    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;

    setTimeout(() => {
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, countStartDelay);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach((el) => countObserver.observe(el));

// ── NAV DROPDOWNS ──
function toggleDrop(id) {
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  // close all first
  document.querySelectorAll('.nav-drop').forEach(d => {
    d.classList.remove('open');
    d.querySelector('button').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    el.classList.add('open');
    el.querySelector('button').setAttribute('aria-expanded', 'true');
  }
}

// Close dropdowns on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-drop')) {
    document.querySelectorAll('.nav-drop').forEach(d => {
      d.classList.remove('open');
      const btn = d.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});

// Close dropdowns on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.nav-drop').forEach(d => {
      d.classList.remove('open');
      const btn = d.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});
