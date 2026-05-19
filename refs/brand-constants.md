# BioSkillDX ブランドカラー定数

キービジュアルのアクセントカラー `#A68EC2`（パープル/ラベンダー）を基準とした配色体系。
用途に応じて Dark（セミナー・対外発表） / Light（内部資料・レポート）を使い分ける。

---

## JavaScript 定数（PptxGenJS用）

```javascript
// === BioSkillDX Brand Colors ===
// KV accent: Purple #A68EC2, Logo: Black wordmark

// ── 共通アクセント（モード非依存） ──
const ACCENT = {
  PURPLE:       "A68EC2",   // KVメインカラー ← 全モード共通の基準色
  PURPLE_DARK:  "8B73A8",   // パープル暗め（ホバー、アクティブ、アイコン背景）
  PURPLE_LIGHT: "C4B0D8",   // パープル明るめ（ハイライト、グラフ）
  CORAL:        "E8534A",   // 警告、重要ハイライト
  GOLD:         "D4A843",   // 実績・受賞強調
  CHARCOAL:     "2D2D2D",   // ロゴ色（ニアブラック）
};

// ── Mode A: Dark Premium（セミナー・カンファレンス・対外発表） ──
const DARK = {
  BG:           "1B1520",   // ディープパープルブラック
  CARD:         "2A2335",   // ダークパープルスレート
  CARD_LIGHT:   "3A3248",   // カード明るめ
  CARD_HOVER:   "4A425A",   // インタラクティブ要素
  TEXT:         "FFFFFF",   // 主テキスト
  TEXT_SUB:     "B0A5BA",   // サブテキスト
  TEXT_MUTED:   "7D7389",   // キャプション・注釈
  FOOTER:       "6B6175",   // フッターテキスト
  DIVIDER:      "3D3550",   // 区切り線
};

// ── Mode B: Light Clean（内部資料・レポート・提案書） ──
const LIGHT = {
  BG:           "F6F4F8",   // オフホワイト（微パープル）
  CARD:         "FFFFFF",   // ホワイトカード
  CARD_ALT:     "EEEBF2",   // 交互行、セカンダリ
  TEXT:         "1B1520",   // 主テキスト（ダークパープル）
  TEXT_SUB:     "6B6175",   // サブテキスト
  TEXT_MUTED:   "9A92A3",   // キャプション・注釈
  FOOTER:       "B0A5BA",   // フッターテキスト
  DIVIDER:      "D8D3DE",   // 区切り線
  CARD_BORDER:  "D8D3DE",   // ライトモードのカード枠線
};

// ── タイポグラフィ ──
const FONTS = {
  HEADING: "Yu Gothic",
  BODY:    "Yu Gothic",
  MONO:    "Consolas",
};

const SIZES = {
  TITLE:     36,
  SECTION:   32,
  SUBTITLE:  20,
  BODY:      15,
  CARD_TEXT: 13,
  CAPTION:   10,
  HIGHLIGHT: 60,
  FOOTER:    7,
};

// ── モード取得ヘルパー ──
const getMode = (mode) => mode === "dark" ? DARK : LIGHT;
```

---

## Logo Assets

```javascript
// ロゴはPNGファイルとして assets/ に格納。実装時にbase64変換する。
// SM/MD サイズ統一: 600px版のみ使用
// アスペクト比: 約 5.4:1。sizing: { type: "contain" } で比率維持。

const fs = require("fs");
const LOGO_ASSETS = "bioskilldx.github.io/assets";  // Claude Code ローカルパス
const loadLogo = (filename) =>
  `image/png;base64,${fs.readFileSync(`${LOGO_ASSETS}/${filename}`).toString("base64")}`;

const LOGO_BLACK = loadLogo("logo_black_md.png");  // Light背景用（黒色版）
const LOGO_WHITE = loadLogo("logo_white_md.png");  // Dark/Purple背景用（白色版）

// 旧定数との互換エイリアス
const LOGO_BLACK_SM = LOGO_BLACK;
const LOGO_BLACK_MD = LOGO_BLACK;
const LOGO_WHITE_SM = LOGO_WHITE;
const LOGO_WHITE_MD = LOGO_WHITE;
```

| 定数名 | 用途 |
|---|---|
| `LOGO_BLACK` | Light背景用（黒色版） |
| `LOGO_WHITE` | Dark/Purple背景用（白色版） |

### ロゴ使い分け

| 背景 | ロゴ |
|---|---|
| Dark BG (`1B1520` 等) | 白色版 `LOGO_WHITE` |
| Light BG (`F6F4F8` 等) | 黒色版 `LOGO_BLACK` |
| パープル BG（セクション区切り） | 白色版 `LOGO_WHITE` |

---

## キービジュアル

KVはファイルサイズが大きいため base64 埋め込みではなく、タイトルスライド等で使用する場合は
ユーザーのアップロードファイルまたはプロジェクトファイルから読み込むこと。

- **KVコンセプト**: 熟練者の暗黙知を「秘伝の巻物」に見立て、開いて次世代へ継承する姿。巻物の中に実験現場・記録・データ基盤・知の共有という活動の全体像が描かれている
- **カラー**: パープル系モノトーン
- **制作**: Swallow Design Studio

---

## Reusable Style Factories

**CRITICAL**: PptxGenJS はオブジェクトを変更するため、必ず関数で新規生成する。

```javascript
const makeCardShadow = (mode) => ({
  type: "outer", color: "000000",
  blur: mode === "dark" ? 8 : 4,
  offset: 2, angle: 135,
  opacity: mode === "dark" ? 0.3 : 0.08,
});

const makeTitleStyle = (mode) => {
  const C = getMode(mode);
  return {
    fontFace: FONTS.HEADING,
    fontSize: SIZES.TITLE,
    bold: true,
    color: C.TEXT,
    margin: 0,
  };
};

const makeBodyStyle = (mode) => {
  const C = getMode(mode);
  return {
    fontFace: FONTS.BODY,
    fontSize: SIZES.BODY,
    color: C.TEXT,
  };
};

const makeCaptionStyle = (mode) => {
  const C = getMode(mode);
  return {
    fontFace: FONTS.BODY,
    fontSize: SIZES.CAPTION,
    color: C.TEXT_MUTED,
  };
};

const makeSubtitleStyle = (mode) => {
  const C = getMode(mode);
  return {
    fontFace: FONTS.BODY,
    fontSize: SIZES.SUBTITLE,
    color: C.TEXT_SUB,
  };
};
```

---

## フッター定義

```javascript
// 全コンテンツスライドに共通のフッター
const addFooter = (slide, mode) => {
  const C = getMode(mode);
  const logo = mode === "dark" ? LOGO_WHITE_SM : LOGO_BLACK_SM;

  // 左: プロジェクト情報
  slide.addText("BioSkillDX（研究開発小項目 I-2-c）", {
    x: 0.4, y: "92%", w: 3.5, h: 0.3,
    fontFace: FONTS.BODY, fontSize: SIZES.FOOTER,
    color: C.FOOTER,
  });

  // 中央: ロゴ
  slide.addImage({
    data: logo, x: 4.0, y: "92.5%", w: 1.6, h: 0.29,
    sizing: { type: "contain", w: 1.6, h: 0.29 },
  });

  // 右: 日付
  slide.addText("2026", {
    x: 6.2, y: "92%", w: 3.0, h: 0.3,
    fontFace: FONTS.BODY, fontSize: SIZES.FOOTER,
    color: C.FOOTER, align: "right",
  });
};
```

---

## スライドマスター定義

```javascript
// Dark mode マスター
pres.defineSlideMaster({
  title: "BSDX_DARK",
  background: { color: DARK.BG },
  objects: [],
});

// Light mode マスター
pres.defineSlideMaster({
  title: "BSDX_LIGHT",
  background: { color: LIGHT.BG },
  objects: [],
});

// タイトル用（ダーク固定）
pres.defineSlideMaster({
  title: "BSDX_TITLE",
  background: { color: DARK.BG },
  objects: [],
});
```

---

## モード使い分けガイド

| 用途 | モード | 理由 |
|---|---|---|
| セミナー・講演 | Dark | スクリーン映え、KVとの調和 |
| カンファレンス発表 | Dark | ブランド訴求、インパクト |
| 内部報告資料 | Light | 読みやすさ、情報密度 |
| 提案書・レポート | Light | 信頼感、データ視認性 |

**混在ルール**: PtBio と同様。1デッキ1モード統一。タイトル/クロージング/セクション区切りのみ例外可。

---

## ブランド固有QA項目

- [ ] フッター（プロジェクト情報 + ロゴ + 日付）が全コンテンツスライドにあるか
- [ ] ロゴが背景に適した版（黒色/白色）か
- [ ] 全スライドでモード統一されているか
- [ ] KVを使用する場合、ファイル読み込み（base64埋め込みでない）か
