/**
 * BioskillDX - Events JavaScript (List & Detail)
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const fadeElements = document.querySelectorAll('.fade-in');

  // Page-specific elements
  const eventsList = document.getElementById('events-list');
  const articleDate = document.getElementById('article-date');
  const articleCategory = document.getElementById('article-category');
  const articleTitle = document.getElementById('article-title');
  const articleContent = document.getElementById('article-content');
  const eventInfo = document.getElementById('event-info');

  // Detect page type
  const isListPage = !!eventsList;
  const isDetailPage = !!articleContent;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  // Current language
  let currentLang = localStorage.getItem('language') || 'ja';

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
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /**
   * Get URL parameter
   */
  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // ==========================================
  // List Page Functions
  // ==========================================

  /**
   * Load and render events list
   */
  function loadEvents() {
    try {
      const data = typeof EVENTS_DATA !== 'undefined' ? EVENTS_DATA : { events: [] };
      renderEventsList(data.events);
    } catch (error) {
      console.error('Error loading events:', error);
      eventsList.innerHTML = '<p class="events-page__error">イベントの読み込みに失敗しました。</p>';
    }
  }

  /**
   * Render events list
   */
  function renderEventsList(events) {
    if (!events || events.length === 0) {
      eventsList.innerHTML = '<p class="events-page__empty" data-i18n="no_events">イベントはありません。</p>';
      return;
    }

    const html = events.map((item, index) => `
      <article class="events-page__item fade-in" style="animation-delay: ${index * 0.1}s">
        <a href="events-detail.html?id=${item.id}" class="events-page__link">
          <div class="events-page__content">
            <div class="events-page__meta">
              <time class="events-page__date">${item.date}</time>
              <span class="events-page__category">${item.category[currentLang]}</span>
              <div class="events-page__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </div>
            <h2 class="events-page__title">${item.title[currentLang]}</h2>
            <p class="events-page__summary">${item.summary[currentLang]}</p>
            <div class="events-page__info">
              <span class="events-page__info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                ${item.details.datetime[currentLang]}
              </span>
              <span class="events-page__info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                ${item.details.venue[currentLang]}
              </span>
            </div>
          </div>
        </a>
      </article>
    `).join('');

    eventsList.innerHTML = html;

    // Re-initialize fade-in for dynamic elements
    const newFadeElements = eventsList.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    newFadeElements.forEach((el) => observer.observe(el));
  }

  // ==========================================
  // Detail Page Functions
  // ==========================================

  /**
   * Load and render event detail
   */
  function loadEventDetail() {
    const eventId = getUrlParam('id');

    if (!eventId) {
      showError();
      return;
    }

    try {
      const data = typeof EVENTS_DATA !== 'undefined' ? EVENTS_DATA : { events: [] };
      const eventItem = data.events.find(item => item.id === eventId);

      if (eventItem) {
        renderEventDetail(eventItem);
      } else {
        showError();
      }
    } catch (error) {
      console.error('Error loading event detail:', error);
      showError();
    }
  }

  /**
   * Render event detail
   */
  function renderEventDetail(item) {
    articleDate.textContent = item.date;
    articleCategory.textContent = item.category[currentLang];
    articleTitle.textContent = item.title[currentLang];

    // Render event info box
    const infoLabels = {
      datetime: { ja: '日時', en: 'Date & Time' },
      venue: { ja: '場所', en: 'Venue' },
      fee: { ja: '参加費', en: 'Fee' },
      capacity: { ja: '定員', en: 'Capacity' }
    };

    let infoHtml = '<dl class="event-detail__info-list">';
    for (const [key, value] of Object.entries(item.details)) {
      if (value[currentLang]) {
        infoHtml += `
          <div class="event-detail__info-item">
            <dt>${infoLabels[key][currentLang]}</dt>
            <dd>${value[currentLang]}</dd>
          </div>
        `;
      }
    }
    infoHtml += '</dl>';
    eventInfo.innerHTML = infoHtml;

    // Build content HTML
    let contentHtml = '';

    // Add image if exists
    if (item.image) {
      contentHtml += `<div class="article-detail__image"><img src="${item.image}" alt=""></div>`;
    }

    // Add text content
    contentHtml += item.content[currentLang].map(p => `<p>${p}</p>`).join('');

    // Add link if exists
    if (item.link && item.link.url) {
      const linkText = item.link.text ? item.link.text[currentLang] : (currentLang === 'ja' ? '詳細はこちら' : 'Learn more');
      contentHtml += `
        <a href="${item.link.url}" target="_blank" rel="noopener noreferrer" class="article-detail__link">
          <span>${linkText}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      `;
    }

    articleContent.innerHTML = contentHtml;

    // Update page title
    document.title = `${item.title[currentLang]} - BioskillDX`;
  }

  /**
   * Show error message
   */
  function showError() {
    articleTitle.textContent = currentLang === 'ja' ? 'イベントが見つかりません' : 'Event not found';
    articleContent.innerHTML = `<p>${currentLang === 'ja' ? 'お探しのイベントは見つかりませんでした。' : 'The event you are looking for could not be found.'}</p>`;
    if (eventInfo) eventInfo.style.display = 'none';
  }

  // ==========================================
  // Common Functions
  // ==========================================

  /**
   * Load content based on page type
   */
  function loadContent() {
    if (isListPage) {
      loadEvents();
    } else if (isDetailPage) {
      loadEventDetail();
    }
  }

  /**
   * Language switcher
   */
  function initLangSwitcher() {
    const langBtns = document.querySelectorAll('.header__lang-btn');

    function switchLanguage(lang) {
      currentLang = lang;
      const t = translations[lang];
      if (!t) return;

      // Keys that should use innerHTML instead of textContent (for HTML support like <br>)
      const htmlKeys = ['footer_research_area_name'];

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

      document.documentElement.lang = lang;

      // Reload content with new language
      loadContent();
    }

    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        langBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const lang = btn.dataset.lang;
        localStorage.setItem('language', lang);
        switchLanguage(lang);
      });
    });

    // Apply stored language on load
    langBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
    });

    // Apply translations
    const t = translations[currentLang];
    if (t) {
      const htmlKeys = ['footer_research_area_name'];
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
    }
    document.documentElement.lang = currentLang;
  }

  /**
   * Initialize
   */
  function init() {
    window.addEventListener('scroll', handleScroll);
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    initFadeInAnimation();
    initLangSwitcher();
    loadContent();

    // Initial fade-in
    setTimeout(() => {
      fadeElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, index * 150);
      });
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
