# CLAUDE.md — bioskilldx.github.io

`~/works/Claude/CLAUDE.md` の規約と `~/works/Claude/BioSkillDX/CLAUDE.md` の事業文脈を継承する。本リポジトリは **BioSkillDX プロジェクト公式サイト**（GitHub Pages）。

## 役割

- **公開 URL**: <https://bioskilldx.github.io/>
- **リポジトリ**: `BioSkillDX/bioskilldx.github.io`（public）
- **目的**: BioSkill-Legacy プロジェクトの広報・イベント告知・ニュース配信
- **ホスティング**: GitHub Pages（`.nojekyll` で Jekyll 無効化、素の HTML/CSS/JS を配信）
- **ビルドステップなし**: ファイル更新 → main push → 即反映

## 言語ポリシー（重要 — 親規約より厳格）

公開リポジトリのため、コミット・PR・issue 関連の文章は英語:

- README / コミットメッセージ / PR タイトル・説明 / issue → **英語**
- HTML 本文の表示テキスト・ニュース・イベント紹介は **日本語 + 英語併記**（`js/translations.js` で多言語管理）
- ソース内コメント（HTML/CSS/JS）は短く、英語推奨（複雑な意図を残す箇所のみ。日本語可だが他者が読む前提で抑制的に）

## 技術スタック

- **Vanilla HTML/CSS/JS**（フレームワーク不使用、親規約準拠）
- CSS: `css/style.css` 1 ファイル集約
- JS: `js/` 配下（`main.js`, `events.js`, `news.js`, `auth.js`, `translations.js`）
- データ: `data/events-data.js`, `data/news-data.js`（JS オブジェクトとして埋め込み、API なし）
- SEO: `robots.txt`, `sitemap.xml` 整備済み
- GitHub Pages: `.nojekyll` 配置済み（親規約準拠）

## 重要ファイル

| パス | 役割 |
|---|---|
| `index.html` | トップページ |
| `events.html`, `events-detail.html` | イベント一覧・詳細 |
| `news.html`, `news-detail.html` | ニュース一覧・詳細 |
| `brand-assets.html` | ブランド素材ページ（プレス向け） |
| `data/events-data.js` | イベントデータ（追加・更新の主編集対象） |
| `data/news-data.js` | ニュースデータ（同上） |
| `js/translations.js` | 多言語化テキスト（日 / 英） |
| `js/main.js` | ページ共通の初期化・ナビ |
| `js/events.js`, `js/news.js` | リスト描画・詳細遷移 |
| `js/auth.js` | 認証関連（限定コンテンツ用） |
| `css/style.css` | 全スタイル定義 |
| `refs/brand-constants.md` | カラー定数定義（パープル `#A68EC2` 基調、Dark/Light モード） |
| `assets/`, `img/` | ロゴ・写真・アイコン |
| `legacy/` | 旧版コンテンツ（参照用、原則編集しない） |
| `googled16d39596a4d0eec.html` | Google Search Console 認証ファイル（削除厳禁） |

## ブランド規約

`refs/brand-constants.md` を必ず参照:

- **アクセント**: パープル `#A68EC2`（KV メイン）、ダーク `#8B73A8`、ライト `#C4B0D8`
- **強調**: Coral `#E8534A`（警告）、Gold `#D4A843`（実績）
- **モード**: Dark Premium（外部発表用）/ Light Clean（内部資料用）
- **ロゴ**: ニアブラック `#2D2D2D` ワードマーク
- 新規ページ・新規スタイル追加時は brand-constants の色のみ使用、独自配色を増やさない

## イベント・ニュース追加の手順

1. `data/events-data.js`（or `news-data.js`）の配列に新規エントリを追加
2. 必須フィールド: `id`, `date`, `title_ja`, `title_en`, `body_ja`, `body_en`, `thumbnail`（任意）
3. ローカルで `index.html` をブラウザで開き、リスト表示・詳細遷移を確認
4. コミット → push → GitHub Pages 反映確認（数十秒〜1 分）

## 開発時の注意

- **日英対訳が崩れない**: イベント・ニュース追加時は両言語必須。`title_en` を空欄にしない
- **画像最適化**: `img/`, `assets/` への新規画像は Web 用に圧縮（数百 KB 以内目標）
- **HTML / JS の変更影響範囲**: ページ間共通レイアウト変更は `main.js` 一箇所で完結するか確認、各ページに散在させない
- **Google Search Console / Analytics**: 認証ファイル `googled16d39596a4d0eec.html` を削除しない
- **`legacy/` 配下**: 旧サイト保管用。SEO 観点で `robots.txt` を見直すこと（必要なら `Disallow: /legacy/`）

## 開発フロー

```bash
# ローカル確認（ビルド不要）
open index.html
# あるいは簡易 HTTP サーバで配信（CORS 確認等）
python3 -m http.server 8000
# → http://localhost:8000/

# 反映
git add <files>
git commit -m "Add event: <title>"   # English commit
git push origin main
# → GitHub Pages が数十秒で更新
```

## サブプロジェクト連携（親 BioSkillDX/）

- 暗黙知収集の本体は `~/works/Claude/BioSkillDX/`（CLAUDE.md 参照）
- セミナー（LEGENDS）告知は本サイト `events.html` に掲載
- 投稿企画（Troubleshooting Night, Lab Hero Stories）の参加導線も本サイトから
- ホワイトペーパー等の長文は親リポジトリの `docs/` で管理し、本サイトからリンクする運用

## スコープ外

- バックエンド API・DB（静的サイト維持、データは JS 配列で管理）
- フレームワーク導入（React 等は親規約で禁止）
- ビルドツール（Webpack / Vite 不要、素の配信を維持）

## 関連

- 親プロジェクト: `~/works/Claude/BioSkillDX/CLAUDE.md`
- ブランド定数: `refs/brand-constants.md`
- 公開 URL: <https://bioskilldx.github.io/>
