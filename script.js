// ==========================================================================
// Portfolio — Joan Camacho
// Vanilla JS: no dependencies, no build step.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------------
     Signal bar: fills as the page is read, like a transmission progress
  --------------------------------------------------------------------- */
  const signalFill = document.getElementById('signalFill');

  function updateSignal() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (signalFill) signalFill.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateSignal, { passive: true });
  updateSignal();

  /* ---------------------------------------------------------------------
     Scroll-spy: highlight the active section in the nav
  --------------------------------------------------------------------- */
  const sections = ['conoceme', 'proyectos', 'trayectoria', 'contacto']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navAnchors = document.querySelectorAll('.nav__links a[data-section]');

  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navAnchors.forEach((a) => {
              a.classList.toggle('is-active', a.dataset.section === id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------------------------------------------------------------
     Reveal-on-scroll for [data-reveal] elements
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------------------
     Hero dispatch line: a single, restrained typing moment on load
  --------------------------------------------------------------------- */
  const typedLine = document.getElementById('typedLine');
  const dispatchText = 'periodismo → branding → automatización';

  if (typedLine) {
    if (prefersReducedMotion) {
      typedLine.textContent = dispatchText;
    } else {
      let i = 0;
      const type = () => {
        if (i <= dispatchText.length) {
          typedLine.textContent = dispatchText.slice(0, i);
          i++;
          setTimeout(type, 32);
        }
      };
      type();
    }
  }
});
