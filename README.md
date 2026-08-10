# website
Repository for the official BioSkillDX project website

## Regenerating detail pages

After editing `data/news-data.js` or `data/events-data.js`, regenerate the static detail pages and sitemap:

```bash
node tools/generate-detail-pages.mjs
```

Commit the updated files under `news/` and `events/` together with `sitemap.xml`.
