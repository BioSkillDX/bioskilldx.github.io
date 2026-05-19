/* ============================================================
   BioSkill-Legacy — Interactions
   ============================================================ */
(() => {
  'use strict';

  /* Scroll progress bar */
  const progressEl = document.getElementById('scrollProgress');
  if (progressEl) {
    const updateProgress = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      progressEl.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* Mobile menu */
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const overlay = document.createElement('div');
  overlay.className = 'header__overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    zIndex: 998, opacity: 0, visibility: 'hidden',
    transition: 'opacity .3s, visibility .3s'
  });
  document.body.appendChild(overlay);

  const closeNav = () => {
    if (!menuBtn || !nav) return;
    menuBtn.classList.remove('is-active');
    nav.classList.remove('is-open');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  };
  const openNav = () => {
    if (!menuBtn || !nav) return;
    menuBtn.classList.add('is-active');
    nav.classList.add('is-open');
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
  };

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.contains('is-active') ? closeNav() : openNav();
    });
    overlay.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }

  /* Smooth scroll for anchor links (offset for fixed header) */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* Fade-in via Intersection Observer */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* Active-section nav highlighting */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-list a');
  if (sections.length && navLinks.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => {
            const href = l.getAttribute('href');
            l.classList.toggle('is-active', href === '#' + id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => navIo.observe(s));
  }
})();
