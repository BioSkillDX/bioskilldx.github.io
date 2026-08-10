import { readFile, mkdir, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const SITE_URL = 'https://bioskilldx.github.io';
const INFO_LABELS = {
  datetime: { ja: '日時', en: 'Date & Time' },
  venue: { ja: '場所', en: 'Venue' },
  fee: { ja: '参加費', en: 'Fee' },
  capacity: { ja: '定員', en: 'Capacity' }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

async function loadData(path, variableName) {
  const source = await readFile(path, 'utf8');
  const context = {};
  vm.createContext(context);
  vm.runInContext(source, context, { filename: path });
  return context[variableName];
}

function externalLink(item, lang) {
  if (!item.link?.url) return '';
  const text = item.link.text?.[lang] ?? (lang === 'ja' ? '詳細はこちら' : 'Learn more');
  return `
        <a href="${escapeHtml(item.link.url)}" target="_blank" rel="noopener noreferrer" class="article-detail__link">
          <span>${escapeHtml(text)}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>`;
}

function articleContent(item, lang) {
  const image = item.image
    ? `<div class="article-detail__image"><img src="../${escapeHtml(item.image)}" alt=""></div>`
    : '';
  // Content is trusted repository data and can intentionally contain inline links.
  const paragraphs = item.content[lang].map((paragraph) => `<p>${paragraph}</p>`).join('\n          ');
  return `${image}${paragraphs}${externalLink(item, lang)}`;
}

function eventInfo(item, lang) {
  if (!item.details) return '';
  const rows = Object.entries(item.details)
    .filter(([key, value]) => INFO_LABELS[key] && value[lang])
    .map(([key, value]) => `
            <div class="event-detail__info-item">
              <dt>${INFO_LABELS[key][lang]}</dt>
              <dd>${escapeHtml(value[lang])}</dd>
            </div>`)
    .join('');
  return `
        <div class="event-detail__info fade-in">
          <dl class="event-detail__info-list">${rows}
          </dl>
        </div>`;
}

function article(item, type, lang) {
  const isEvent = type === 'events';
  const backText = lang === 'ja' ? '一覧へ戻る' : 'Back to list';
  return `
    <article class="article-detail${isEvent ? ' event-detail' : ''}" data-content-lang="${lang}"${lang === 'en' ? ' hidden' : ''}>
      <div class="container">
        <div class="article-detail__header fade-in">
          <div class="article-detail__meta">
            <time class="article-detail__date">${escapeHtml(item.date)}</time>
            <span class="article-detail__category">${escapeHtml(item.category[lang])}</span>
          </div>
          <h1 class="article-detail__title">${escapeHtml(item.title[lang])}</h1>
        </div>${isEvent ? eventInfo(item, lang) : ''}
        <div class="article-detail__content fade-in">
          ${articleContent(item, lang)}
        </div>
        <div class="article-detail__footer fade-in">
          <a href="../${type}.html" class="article-detail__back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>${backText}</span>
          </a>
        </div>
      </div>
    </article>`;
}

function header(type) {
  return `
  <header class="header">
    <div class="header__inner">
      <h1 class="header__logo"><a href="../index.html"><img src="../img/logo.svg" alt="BioSkillDX"></a></h1>
      <button class="header__menu-btn" aria-label="メニューを開く"><span></span><span></span><span></span></button>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li><a href="../index.html#about" data-i18n="nav_about">About</a></li>
          <li><a href="../index.html#member" data-i18n="nav_member">Member</a></li>
          <li><a href="../news.html"${type === 'news' ? ' class="is-active"' : ''} data-i18n="nav_news">News</a></li>
          <!-- <li><a href="../events.html"${type === 'events' ? ' class="is-active"' : ''} data-i18n="nav_events">Events</a></li> -->
          <li><a href="../legacy/" data-i18n="nav_legacy">BioSkill-Legacy</a></li>
          <li><a href="../index.html#contact" data-i18n="nav_contact">Contact</a></li>
        </ul>
      </nav>
      <div class="header__lang">
        <button class="header__lang-btn is-active" data-lang="ja">JA</button>
        <span class="header__lang-divider">/</span>
        <button class="header__lang-btn" data-lang="en">EN</button>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="footer__main">
      <div class="footer__left">
        <div class="footer__logo"><a href="../index.html"><img src="../img/logo.svg" alt="BioSkillDX"></a></div>
        <div class="footer__research">
          <p class="footer__research-text" data-i18n="footer_research_area_name"><a href="https://www.jst.go.jp/k-program/" target="_blank" rel="noopener noreferrer">JST K Program 経済安全保障重要技術育成プログラム</a><br><a href="https://www.jst.go.jp/k-program/program/cyber4.html" target="_blank" rel="noopener noreferrer">ノウハウの効果的な伝承につながる人作業伝達等の研究デジタル基盤技術</a></p>
        </div>
      </div>
      <div class="footer__right"><div class="footer__nav-group">
        <h4 class="footer__nav-title" data-i18n="footer_menu">メニュー</h4>
        <nav class="footer__nav"><ul>
          <li><a href="../index.html#about" data-i18n="footer_about">私たちについて</a></li>
          <li><a href="../index.html#member" data-i18n="footer_member">メンバー</a></li>
          <li><a href="../news.html" data-i18n="footer_news">ニュース</a></li>
          <li><a href="../events.html" data-i18n="footer_events">イベント</a></li>
          <li><a href="../legacy/" data-i18n="footer_legacy">BioSkill-Legacy</a></li>
          <li><a href="../index.html#contact" data-i18n="footer_contact">お問い合わせ</a></li>
          <li><a href="../brand-assets.html" data-i18n="footer_brand">ブランド素材</a></li>
        </ul></nav>
      </div></div>
    </div>
    <div class="footer__bottom"><p class="footer__copyright">&copy; 2026 BioSkillDX. All Rights Reserved.</p></div>
  </footer>`;
}

function detailPage(item, type) {
  const singularJa = type === 'news' ? 'ニュース' : 'イベント';
  const url = `${SITE_URL}/${type}/${item.id}.html`;
  const description = stripHtml(item.content.ja[0]);
  const title = item.title.ja;
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: singularJa, item: `${SITE_URL}/${type}.html` },
      { '@type': 'ListItem', position: 3, name: title }
    ]
  };
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:site_name" content="BioSkillDX">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:title" content="${escapeHtml(title)} | BioSkillDX">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${SITE_URL}/img/1200_630.png">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)} | BioSkillDX">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${SITE_URL}/img/1200_630.png">
  <title>${escapeHtml(title)} | BioSkillDX</title>
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/x-icon" href="../img/favicon/favicon.ico">
  <link rel="icon" type="image/png" sizes="96x96" href="../img/favicon/favicon-96x96.png">
  <link rel="icon" type="image/svg+xml" href="../img/favicon/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="../img/favicon/apple-touch-icon.png">
  <link rel="manifest" href="../img/favicon/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">${JSON.stringify(breadcrumb, null, 2).replaceAll('<', '\\u003c')}</script>
</head>
<body>${header(type)}
  <main>${article(item, type, 'ja')}${article(item, type, 'en')}
  </main>${footer()}
  <script src="../js/translations.js"></script>
  <script src="../data/${type}-data.js"></script>
  <script src="../js/${type}.js"></script>
</body>
</html>
`;
}

function sitemap(news, events) {
  const staticEntries = [
    ['/', '2026-04-20', 'weekly', '1.0'],
    ['/legacy/', '2026-06-18', 'weekly', '0.9'],
    ['/news.html', '2026-04-20', 'weekly', '0.8'],
    ['/events.html', '2026-03-21', 'weekly', '0.5'],
    ['/brand-assets.html', '2026-03-21', 'monthly', '0.4']
  ];
  const staticXml = staticEntries.map(([path, lastmod, changefreq, priority]) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
  const detailXml = [...news.map((item) => [item, 'news']), ...events.map((item) => [item, 'events'])]
    .map(([item, type]) => `  <url>
    <loc>${SITE_URL}/${type}/${item.id}.html</loc>
    <lastmod>${item.date.replaceAll('.', '-')}</lastmod>
    <priority>0.6</priority>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by tools/generate-detail-pages.mjs -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${detailXml}
</urlset>
`;
}

const news = (await loadData('data/news-data.js', 'NEWS_DATA')).news;
const events = (await loadData('data/events-data.js', 'EVENTS_DATA')).events;

for (const [type, items] of [['news', news], ['events', events]]) {
  await mkdir(type, { recursive: true });
  await Promise.all(items.map((item) => writeFile(`${type}/${item.id}.html`, detailPage(item, type))));
}
await writeFile('sitemap.xml', sitemap(news, events));
console.log(`Generated ${news.length} news pages, ${events.length} event pages, and sitemap.xml.`);
