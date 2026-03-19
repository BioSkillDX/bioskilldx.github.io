/**
 * BioskillDX Corporate Site - Main JavaScript
 * 翻訳データは translations.js で管理
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav-list a');
  const fadeElements = document.querySelectorAll('.fade-in');
  const titleRevealElements = document.querySelectorAll('.title-reveal');
  const contactForm = document.getElementById('contact-form');

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
  function smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        closeMenu();
      }
    }
  }

  /**
   * Fade-in animation on scroll using Intersection Observer
   */
  function initFadeInAnimation() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add delay for staggered animation
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100);

          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((element) => {
      // Skip KV elements - they have custom animations
      if (element.closest('.kv')) return;
      observer.observe(element);
    });

    // Also observe title-reveal elements
    titleRevealElements.forEach((element) => {
      observer.observe(element);
    });

    // Check elements already in viewport on page load
    setTimeout(() => {
      titleRevealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('is-visible');
        }
      });
    }, 100);
  }

  /**
   * Contact form handling
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;

    requiredFields.forEach((field) => {
      const input = contactForm.querySelector(`[name="${field}"]`);
      if (!data[field] || data[field].trim() === '') {
        isValid = false;
        input.style.borderColor = '#e74c3c';
      } else {
        input.style.borderColor = '#e8e8e8';
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = contactForm.querySelector('[name="email"]');
    if (data.email && !emailRegex.test(data.email)) {
      isValid = false;
      emailInput.style.borderColor = '#e74c3c';
    }

    if (isValid) {
      // Here you would typically send the data to a server
      // For now, we'll show a success message
      alert('お問い合わせありがとうございます。\n送信が完了しました。');
      contactForm.reset();
    } else {
      alert('必須項目を正しく入力してください。');
    }
  }

  /**
   * Add focus styles for form inputs
   */
  function initFormStyles() {
    const inputs = document.querySelectorAll('.contact__input, .contact__textarea');

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('is-focused');
      });

      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('is-focused');
        // Reset border color on blur
        if (input.value.trim() !== '') {
          input.style.borderColor = '#e8e8e8';
        }
      });
    });
  }

  /**
   * Parallax effect for KV section (subtle)
   */
  function initParallax() {
    const kvImage = document.querySelector('.kv__image');

    if (!kvImage) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;

      if (scrolled < window.innerHeight) {
        kvImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  /**
   * Character by character animation for KV description
   */
  function initCharAnimation() {
    const kvDescription = document.querySelector('.kv__description');
    if (!kvDescription) return;

    const text = kvDescription.textContent.trim();
    kvDescription.innerHTML = '';
    kvDescription.classList.add('is-visible');

    let charIndex = 0;
    // Split text into characters and wrap each in a span
    [...text].forEach((char) => {
      if (char === '\n') {
        kvDescription.appendChild(document.createElement('br'));
      } else {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${charIndex * 50}ms`;
        kvDescription.appendChild(span);
        charIndex++;
      }
    });
  }

  /**
   * Loading animation
   */
  function initLoadingAnimation() {
    document.body.classList.add('is-loaded');

    // Hide button initially
    const kvBtn = document.querySelector('.kv__btn');
    if (kvBtn) {
      kvBtn.style.opacity = '0';
      kvBtn.style.transform = 'translateY(30px)';
    }

    // Show logo first
    const kvTitle = document.querySelector('.kv__title');
    if (kvTitle) {
      setTimeout(() => {
        kvTitle.classList.add('is-visible');
      }, 300);
    }

    // Show KV image
    const kvImage = document.querySelector('.kv__image');
    if (kvImage) {
      setTimeout(() => {
        kvImage.classList.add('is-visible');
      }, 200);
    }

    // Start character animation after logo appears
    setTimeout(initCharAnimation, 600);

    // Show button after text animation completes
    const kvDescription = document.querySelector('.kv__description');
    if (kvBtn && kvDescription) {
      const text = kvDescription.textContent.trim().replace(/\n/g, '');
      const textDuration = text.length * 50 + 500; // 50ms per char + buffer
      setTimeout(() => {
        kvBtn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        kvBtn.style.opacity = '1';
        kvBtn.style.transform = 'translateY(0)';
      }, 600 + textDuration);
    }
  }

  /**
   * Language switcher
   */
  function initLangSwitcher() {
    const langBtns = document.querySelectorAll('.header__lang-btn');

    function switchLanguage(lang) {
      const t = translations[lang];
      if (!t) return;

      // Keys that should use innerHTML instead of textContent (for HTML support like <br>)
      const htmlKeys = ['footer_research_area_name'];

      // Find all elements with data-i18n attribute and update text
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach((el) => {
        const key = el.dataset.i18n;
        if (t[key]) {
          if (htmlKeys.includes(key)) {
            el.innerHTML = t[key];
          } else {
            el.textContent = t[key];
          }
        }
      });

      // Update html lang attribute
      document.documentElement.lang = lang;

      // Update contact form URL based on language
      const contactBtn = document.getElementById('contactBtn');
      if (contactBtn) {
        contactBtn.href = lang === 'en'
          ? 'https://forms.gle/15sTfWH2rPgdMhLE9'
          : 'https://forms.gle/Hz3kwcN9M9HQGWse6';
      }

      // Reload news and events section with new language
      loadTopNews();
      loadTopEvents();
    }

    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        langBtns.forEach((b) => b.classList.remove('is-active'));
        // Add active class to clicked button
        btn.classList.add('is-active');

        const lang = btn.dataset.lang;
        localStorage.setItem('language', lang);

        // Switch the language
        switchLanguage(lang);
      });
    });

    // Check stored language on load and apply
    const storedLang = localStorage.getItem('language') || 'ja';
    langBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === storedLang);
    });
    switchLanguage(storedLang);
  }

  /**
   * Active navigation link on scroll
   */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.header__nav-list a[href="#${sectionId}"]`);

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => link.classList.remove('is-active'));
            navLink.classList.add('is-active');
          }
        }
      });
    });
  }

  /**
   * Format date to Japanese style (2025年04月30日)
   */
  function formatDateJa(dateStr) {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      return `${parts[0]}年${parts[1]}月${parts[2]}日`;
    }
    return dateStr;
  }

  /**
   * Format date to English style (April 30, 2025)
   */
  function formatDateEn(dateStr) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      const monthIndex = parseInt(parts[1], 10) - 1;
      return `${months[monthIndex]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
    }
    return dateStr;
  }

  /**
   * Load and render news on top page
   */
  function loadTopNews() {
    const newsTopList = document.getElementById('news-top-list');
    if (!newsTopList) return;

    const currentLang = localStorage.getItem('language') || 'ja';

    try {
      const data = typeof NEWS_DATA !== 'undefined' ? NEWS_DATA : { news: [] };
      const latestNews = data.news.slice(0, 3); // Only show latest 3

      const html = latestNews.map((item, index) => {
        return `
          <article class="news-top__item fade-in">
            <a href="news-detail.html?id=${item.id}" class="news-top__link">
              <div class="news-top__meta">
                <time class="news-top__date">${item.date}</time>
                <span class="news-top__category">${item.category[currentLang]}</span>
              </div>
              <h3 class="news-top__item-title">${item.title[currentLang]}</h3>
            </a>
          </article>
        `;
      }).join('');

      newsTopList.innerHTML = html;

      // Re-initialize fade-in for dynamic elements
      const newFadeElements = newsTopList.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      newFadeElements.forEach((el) => observer.observe(el));
    } catch (error) {
      console.error('Error loading news:', error);
    }
  }

  /**
   * Load and render events on top page
   */
  function loadTopEvents() {
    const eventsTopList = document.getElementById('events-top-list');
    if (!eventsTopList) return;

    const currentLang = localStorage.getItem('language') || 'ja';

    try {
      const data = typeof EVENTS_DATA !== 'undefined' ? EVENTS_DATA : { events: [] };
      const latestEvents = data.events.slice(0, 3); // Only show latest 3

      const html = latestEvents.map((item, index) => {
        return `
          <article class="events-top__card fade-in">
            <a href="events-detail.html?id=${item.id}" class="events-top__card-link">
              <div class="events-top__card-header">
                <time class="events-top__card-date">${item.date}</time>
                <span class="events-top__card-category">${item.category[currentLang]}</span>
              </div>
              <h3 class="events-top__card-title">${item.title[currentLang]}</h3>
              <p class="events-top__card-summary">${item.summary[currentLang]}</p>
              <div class="events-top__card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </a>
          </article>
        `;
      }).join('');

      eventsTopList.innerHTML = html;

      // Re-initialize fade-in for dynamic elements
      const newFadeElements = eventsTopList.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      newFadeElements.forEach((el) => observer.observe(el));
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  /**
   * Initialize all functions
   */
  function init() {
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Nav links smooth scroll
    navLinks.forEach((link) => {
      link.addEventListener('click', smoothScroll);
    });

    // Also handle KV button
    const kvBtn = document.querySelector('.kv__btn');
    if (kvBtn) {
      kvBtn.addEventListener('click', smoothScroll);
    }

    // Form submission
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize features
    initFadeInAnimation();
    initFormStyles();
    initParallax();
    initActiveNav();
    initLangSwitcher();

    // Load top page news and events
    loadTopNews();
    loadTopEvents();

    // Loading animation (after a short delay)
    setTimeout(initLoadingAnimation, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
