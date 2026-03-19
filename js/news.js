/**
 * BioskillDX - News JavaScript (List & Detail)
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const fadeElements = document.querySelectorAll('.fade-in');

  // Page-specific elements
  const newsList = document.getElementById('news-list');
  const articleDate = document.getElementById('article-date');
  const articleCategory = document.getElementById('article-category');
  const articleTitle = document.getElementById('article-title');
  const articleContent = document.getElementById('article-content');

  // Detect page type
  const isListPage = !!newsList;
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
   * Load and render news list
   */
  function loadNews() {
    try {
      const data = typeof NEWS_DATA !== 'undefined' ? NEWS_DATA : { news: [] };
      renderNewsList(data.news);
    } catch (error) {
      console.error('Error loading news:', error);
      newsList.innerHTML = '<p class="news-page__error">ニュースの読み込みに失敗しました。</p>';
    }
  }

  /**
   * Render news list
   */
  function renderNewsList(news) {
    if (!news || news.length === 0) {
      newsList.innerHTML = '<p class="news-page__empty" data-i18n="no_news">ニュースはありません。</p>';
      return;
    }

    const html = news.map((item, index) => `
      <article class="news-page__item fade-in" style="animation-delay: ${index * 0.1}s">
        <a href="news-detail.html?id=${item.id}" class="news-page__link">
          <div class="news-page__body">
            <div class="news-page__meta">
              <time class="news-page__date">${item.date}</time>
              <span class="news-page__category">${item.category[currentLang]}</span>
            </div>
            <h2 class="news-page__title">${item.title[currentLang]}</h2>
            <p class="news-page__excerpt">${item.content[currentLang].join(' ')}</p>
          </div>
          <div class="news-page__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </a>
      </article>
    `).join('');

    newsList.innerHTML = html;

    // Re-initialize fade-in for dynamic elements
    const newFadeElements = newsList.querySelectorAll('.fade-in');
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
   * Load and render news detail
   */
  function loadNewsDetail() {
    const newsId = getUrlParam('id');

    if (!newsId) {
      showError();
      return;
    }

    try {
      const data = typeof NEWS_DATA !== 'undefined' ? NEWS_DATA : { news: [] };
      const newsItem = data.news.find(item => item.id === newsId);

      if (newsItem) {
        renderNewsDetail(newsItem);
      } else {
        showError();
      }
    } catch (error) {
      console.error('Error loading news detail:', error);
      showError();
    }
  }

  /**
   * Render news detail
   */
  function renderNewsDetail(item) {
    articleDate.textContent = item.date;
    articleCategory.textContent = item.category[currentLang];
    articleTitle.textContent = item.title[currentLang];

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
    articleTitle.textContent = currentLang === 'ja' ? '記事が見つかりません' : 'Article not found';
    articleContent.innerHTML = `<p>${currentLang === 'ja' ? 'お探しの記事は見つかりませんでした。' : 'The article you are looking for could not be found.'}</p>`;
  }

  // ==========================================
  // Common Functions
  // ==========================================

  /**
   * Load content based on page type
   */
  function loadContent() {
    if (isListPage) {
      loadNews();
    } else if (isDetailPage) {
      loadNewsDetail();
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
