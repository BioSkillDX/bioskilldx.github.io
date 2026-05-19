# BioSkill-Legacy ウェブサイト リデザイン — Handoff

## 概要

`bioskilldx.github.io/legacy/` 配下のウェブサイトを、**Field-Lab Schematic**（技術ドキュメント／実験ノート風）の方向にフルリデザインしたものです。

**目的：** 一般の研究者を BioSkill-Legacy プロジェクトへの参加に誘うこと。「テンプレ感」を脱し、現場で動いている技術プロジェクトとしての真摯さと、参加した一人ひとりへの具体的な見返りを伝えることを優先しています。

このフォルダの内容は、既存の `legacy/` ディレクトリへの**ドロップイン置き換え**として動作するように作られています（HTML / CSS / JS のみ、フレームワークなし）。

---

## このバンドルについて

**注意：** このフォルダ内のファイルは **そのまま本番投入できる実装** です（プロジェクトが既に Vanilla HTML / CSS / JS で動いており、別フレームワークへの移植を伴わないため）。

ファイルは要件定義書 v0.1.0 と既存サイト構成（GitHub Pages, 親サイト共通の `../img/` 参照）を踏襲しています。

### Fidelity
**High-fidelity (hifi)** — ピクセル単位の最終色、タイポグラフィ、余白、インタラクションを含みます。コピーも完成稿として書かれています（修正したい部分があれば README §「コピー」参照）。

---

## ファイル構成

```
handoff/
├── README.md             ← このファイル
├── legacy/               ← ドロップイン置き換え対象
│   ├── index.html        ← メインページ（シングルページ・約950行）
│   ├── css/legacy.css    ← 全スタイル（約900行・コメント付き）
│   └── js/legacy.js      ← インタラクション（約100行）
└── img/
    └── logo.svg          ← プレビュー用ロゴ（本番では既存の ../img/logo.svg を使用）
```

### デプロイ手順
1. 既存 `bioskilldx.github.io/legacy/` をバックアップ
2. `handoff/legacy/*` で内容を置き換え
3. 既存の `bioskilldx.github.io/img/` 配下（ロゴ、ファビコン、メンバー写真）はそのまま再利用される
4. ローカル HTTP サーバーで動作確認後デプロイ

**変更不要な既存ファイル:**
- `../img/logo.svg`
- `../img/favicon/*`
- `../img/member/*.png|*.jpg`
- `../img/1200_630.png`（OGP用）

---

## デザインの方向性

### コンセプト
「ラボの技術ドキュメント／実験ノート」をデザイン言語として採用。

- **グリッド背景・コーナーマーク・FIG. ラベル・SECTION ナンバー**で「これは現場で動いている体系の記述だ」というトーンを作る
- **モノスペース（JetBrains Mono）の仕様ラベル**を全セクションに散らし、技術プロジェクトとしての真摯さを演出
- **ゴールドは抑制的に使う** — 罫線・記号・小さなマークのみ。面塗りは原則使わない
- 4ロール図・運用ループはオリジナルの SVG スキーマチック図解で表現

### 親サイト（BioSkillDX）との差別化

| 要素 | 親サイト | このリデザイン |
|---|---|---|
| アクセント | パープル `#AC93C8` | ゴールド `#A88C52` / `#C8A86A` |
| ヘッダー | 白 + glass morphism | 黒 (`#14110d`) + モノスペースラベル |
| トーン | 一般向けランディング | 技術ドキュメント／ラボノート |
| 図解 | アイコン中心 | スキーマチック SVG（ピペット・ロール図・運用ループ） |

---

## デザイントークン

### Color

```css
/* Surfaces */
--bg:           #ffffff   /* メイン背景 */
--paper:        #f7f5ef   /* 交互背景 / カード背景 */
--grid:         #ebe5d4   /* 背景グリッド */

/* Ink scale */
--ink:          #14110d   /* メインテキスト / 黒帯 */
--ink-2:        #3d362d   /* 本文サブ */
--ink-3:        #7a6f5e   /* 補助ラベル */
--line:         #d8d1bf   /* 罫線 */
--line-strong:  #8a8273   /* 強調罫線 */

/* Gold (accent) */
--gold:         #a88c52   /* 主アクセント（罫・ラベル） */
--gold-mark:    #c8a86a   /* マーク・小さなアクセント */
--gold-soft:    #efe5c9   /* タイトル下線・ハイライト */
```

**運用ルール：** ゴールドは罫・マーク・モノスペースラベル・ボタンのアクセントのみ。背景の面塗りには使わない。例外は ① ヒーローのタイトル下線（`--gold-soft` の薄い帯）、② CTA ボタン（`--gold-mark`）の2箇所のみ。

### Typography

```css
--font-sans:  "Lato", "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif
--font-serif: "Noto Serif JP", "Cormorant Garamond", serif       /* 引用マーク "" のみ */
--font-mono:  "JetBrains Mono", "SF Mono", ui-monospace, monospace
```

**サイズ・ウェイト (Desktop)：**

| 用途 | サイズ | ウェイト | 字間 |
|---|---|---|---|
| Hero title | 64px | 900 | -0.012em |
| Section title | 48px | 900 | -0.01em |
| Pillar / Benefit who | 26 / 24px | 900 | -0.005em |
| Body | 16px | 400 | 0.005em / line-height 1.75 |
| Card body | 13–14px | 400 | line-height 1.7 |
| Mono label | 10–11px | 500 | 0.18–0.25em / uppercase |

### Spacing

```css
--pad-x:    56px (>1024px) / 32px / 20px
--pad-y:    100px (>1024px) / 80px / 64px
container:  1200px max
```

### Breakpoints

- `> 1024px` フルレイアウト
- `768–1024px` カラム整理（4列→2列、Pillars 1列化）
- `< 768px` モバイル（ハンバーガーメニュー、全要素1カラム）

### Animation

- `.fade-in` Intersection Observer で `opacity 0 → 1 / translateY 20px → 0`、`0.8s ease`
- スクロール進捗バーは `width` を `scroll position / scroll height` で更新

---

## ページ構成

| # | セクション | コピーの核 | 既存からの変更点 |
|---|---|---|---|
| Hero | ヒーロー | "熟練者の"技"を、未来の遺産に変換する" | Spec ブロック（FOCUS / METHOD / OUTPUT）追加、累積モデル概念図 |
| 01 | Problem | "プロトコルに、書かれない知識" | 3類型カードに `e.g. "..."` の現場例を追加 |
| 02 | Mission | Data → Model → Operation の3段 | パイプラインブロックに `SPEC ·` ラベル追加 |
| 03 | Pillars | A "書くべきこと" / B 判断プロセス | Pillar ヘッダー（A/B 大きな数字 + メタ情報）を導入 |
| 04 | Structure | 4ロール + 運用ループ | **オリジナル SVG パイプライン図と運用ループ図を新規作成** |
| 05 | **Why Join** | ステークホルダー別の動機 | **「Benefits」から「Why Join」へリネーム、構成全面刷新**（後述） |
| 06 | Get Involved | 投稿 CTA + 3カテゴリ + 4段階参加 | 各カテゴリに推奨ペース・参加段階に EFFORT 表示 |
| 07 | Team | コアメンバー5名 | カードに `MEMBER · T-NN` シリアル追加 |

---

## §05 Why Join の構成（重点リファクタ）

「Benefits の列挙」を脱して、**参加の動機**に寄せました。
4ステークホルダーそれぞれに：

1. **役割タグ** （`FOR · VETERAN RESEARCHERS` 等）
2. **当事者の声としてのプルクオート** （`"口頭で消えていた判断が、引用される知見になる。"`）
3. **具体的な3つの効果** （矢印リスト、→ で先導）
4. **First Step ブロック** — 「30分の聞き取りから」など、最小の一歩を明示
5. **アンカーリンク** （`#action` へ）

| ステークホルダー | プルクオート | First Step |
|---|---|---|
| 熟練研究者 | 口頭で消えていた判断が、引用される知見になる | 30分の聞き取りから |
| 研究室・PI | 次のメンバーが、あなたを呼ばずに立ち上がる | 典型プロトコル1本から |
| 若手研究者・学生 | 先輩の頭の中が、手元で読める | ケーススタディを読む |
| 企業・メーカー | 現場で何が詰まっているか、ようやく見える | 共同テーマの相談から |

---

## オリジナルSVG図解

### 4ロール パイプライン図（`#structure` 内）
- **viewBox:** 1100 × 360
- **構造:** Upstream → Downstream の水平バス上に4つのロール（A-D）を等間隔配置
- **各ロール:** 黒帯 + 大きなレター（ゴールド）+ ステージ + タイトル + ROLE-X シリアル
- **Inputs（上方）:** 破線で各ノードに接続、紙色のボックス
- **Outputs（下方）:** 実線で各ノードから降りる、黒のボックスにゴールドのテキスト
- **凡例（下部）:** INPUT / OUTPUT / BUS の区別を明記

### 運用ループ図（`#structure` ループブロック内）
- **viewBox:** 1100 × 360
- **背景:** 黒（`--ink`）+ 細い暗グリッド
- **5ステップ:** 01 EXTRACT → 02 STRUCTURE → 03 RECORD → 04 LINK → 05 UPDATE
- **各ステップ:** ゴールド枠 + ゴールド帯ヘッダー（モノスペース）+ 大きな日本語ラベル + 補足説明（2行）
- **戻り矢印:** 下部を破線で 05 → 01 へ。中央に `RETURN / 反復` ラベル

### 累積モデル概念図（`#hero` 内）
- **viewBox:** 460 × 460
- **構造:** QUALITY × TIME の折れ線グラフ風。T1（聞き取り）→ T2（撮影）→ T3（構造化, CRITICAL POINT）→ T4（還元）
- **吹き出し:** T3 位置に「暗黙知が項目化される」のコールアウト
- **塗り:** カーブ下方をゴールド `opacity: .08` で薄塗り

---

## コピー（編集が必要な場合の参照）

### Hero
- Eyebrow: `PROJECT · BIOSKILL-LEGACY`
- Title: `熟練者の"技"を、未来の遺産に変換する。`
- Desc: `生命科学実験の再現性を支えているのは、プロトコルに書かれない「現場の判断」です。…`

### CTA primary
- Eyebrow: `PRIMARY · 5 MIN`
- Title: `現場で起きた一つの事例を、投稿してください。`
- Button: `事例を投稿する（β）`
- Link target: Google Forms URL（既存 URL を保持）

### 4 ロール（Structure）
- A. 上流 — パートナーシップ / ブランディング
- B. 現場 — データ収集
- C. 基盤 — データ整備 / アーカイブ
- D. 下流 — 解析 / モデル化

### 運用ループ（Structure）
- 01 EXTRACT 抽出 / 02 STRUCTURE 構造化 / 03 RECORD 記録 / 04 LINK 紐づけ / 05 UPDATE 更新

---

## インタラクション

`legacy.js` で実装済み：

1. **スクロール進捗バー** — `#scrollProgress` の `width` を更新
2. **モバイルメニュー** — ハンバーガーボタンで `.header__nav.is-open` 切替、オーバーレイ表示
3. **スムーススクロール** — `a[href^="#"]` に対し、ヘッダー高 (~90px) のオフセットを引いて scrollTo
4. **fade-in** — IntersectionObserver で `.fade-in` 要素を `is-visible` に
5. **アクティブセクション ハイライト** — IntersectionObserver で現在見えているセクションに対応する nav リンクに `is-active` を付与

---

## アクセシビリティ

- セマンティックHTML: `header > main > section[id]` の階層
- 全ての画像に `alt`
- 画像読み込みエラー時のフォールバック（漢字1文字）を team セクションに実装
- カラーコントラスト: 主要テキスト `#14110d` / `#ffffff` で AAA
- フォーカスリングは標準ブラウザ実装に依存（ボタン・リンク）
- `prefers-reduced-motion` を尊重したい場合は `legacy.css` の `.fade-in` トランジションをラップしてください（現状未対応）

---

## SEO / メタデータ

既存サイトと整合：
- `<title>`: `BioSkill-Legacy - 熟練者の技を未来への遺産に`
- OGP（og:title / og:description / og:image / og:url）既存値を維持
- Twitter Card `summary_large_image`
- JSON-LD `@type: ResearchProject`, `parentOrganization: BioSkillDX`
- canonical: `https://bioskilldx.github.io/legacy/`

---

## ブラウザサポート

- 想定: 最新2バージョンの Chrome / Safari / Firefox / Edge
- 使用機能: CSS Grid / Custom Properties / `aspect-ratio` / `backdrop-filter` 未使用 / Intersection Observer
- IE11 非対応（既存サイトと同じ方針）

---

## 既知の検討事項・将来対応

1. **モバイルでの Structure 図** — SVG が横スクロールせず縮小表示される。図そのものが情報量多めなので、モバイル時はもう少し簡略化した縦版を作る選択肢あり
2. **英語版** — `data-i18n` 属性は未実装（既存 v1 スコープに合わせ）。将来 `translations.js` 化する場合は要件定義書 §6.3 参照
3. **OGP 画像** — 既存 `1200_630.png` を流用しているが、リデザインに合わせた新規画像の制作を推奨
4. **アクセシビリティ** — `prefers-reduced-motion` 対応、フォーカスリング統一は次フェーズで

---

## 参考

- BioSkill-Legacy ホワイトペーパー v0.1.3 (2026-02-15)
- 要件定義書 v0.1.0 (2026-03-24)
- 既存サイト: https://bioskilldx.github.io/legacy/
- 親サイト: https://bioskilldx.github.io/
