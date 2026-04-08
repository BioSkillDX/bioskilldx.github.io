/**
 * BioSkill-Legacy - Main JavaScript
 */
(function () {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav-list a');
  const fadeElements = document.querySelectorAll('.fade-in');
  const scrollProgress = document.getElementById('scrollProgress');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  /**
   * Header scroll effect
   */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  /**
   * Scroll progress bar
   */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
  }

  /**
   * Mobile menu toggle
   */
  function toggleMenu() {
    menuBtn.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    menuBtn.classList.remove('is-active');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  /**
   * Smooth scroll to section
   */
  function handleNavClick(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header.offsetHeight + 10;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      closeMenu();
    }
  }

  /**
   * Intersection Observer for fade-in animations
   */
  function initFadeIn() {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger animation
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Active nav link tracking
   */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          if (scrollPos >= top && scrollPos < bottom) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        }
      });
    });
  }

  // Event Listeners
  window.addEventListener('scroll', function () {
    handleScroll();
    updateScrollProgress();
    updateActiveNav();
  }, { passive: true });

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleNavClick);
  });

  // Also handle footer nav links with smooth scroll
  document.querySelectorAll('.footer__nav a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header.offsetHeight + 10;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Initialize
  handleScroll();
  updateScrollProgress();
  initFadeIn();
})();
