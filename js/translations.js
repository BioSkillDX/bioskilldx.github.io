/**
 * BioskillDX - Translation Data
 * 翻訳データを一元管理するファイル
 *
 * 使い方:
 * 1. 新しいテキストを追加する場合は、ja と en の両方に同じキーで追加
 * 2. HTMLで data-i18n="キー名" を指定
 */

const translations = {
  ja: {
    // ===== Navigation =====
    nav_about: '私たちについて',
    nav_member: 'メンバー',
    nav_news: 'ニュース',
    nav_events: 'イベント',
    nav_contact: 'お問い合わせ',

    // ===== KV Section =====
    kv_description: 'ライフサイエンス実験作業の\n暗黙知獲得と作業支援',
    kv_btn: 'お問い合わせ',

    // ===== About Section =====
    about_subtitle: 'BioSkillDXとは？',
    about_description: '本研究開発では、ライフサイエンス分野の研究開発の現場における実験作業のノウハウの効率的な蓄積と伝承に貢献することを目指し、大規模ライフサイエンス実験作業データセットの構築と実験作業に関する暗黙知獲得のためのAI技術の開発を行います。',
    about_cat1: 'ライフサイエンス',
    about_title1: '実験作業データ・暗黙知の集積',
    about_cat2: 'AI',
    about_title2: '暗黙知獲得 AIモデル構築',
    about_cat3: 'ロボティクス',
    about_title3: 'アシストシステムの開発',

    // ===== Member Section =====
    member_pi_label: '研究代表者/',

    member1_name: '佐藤 洋一',
    member1_title: '東京大学',

    member2_name: '小野 浩雅',
    member2_title: 'プラチナバイオ株式会社',

    member3_name: '大田 達郎',
    member3_title: '千葉大学',

    member4_name: '大沼 清',
    member4_title: '長岡技術科学大学',

    member5_name: '神田 元紀',
    member5_title: '東京科学大学',

    member6_name: '笹川 洋平',
    member6_title: '東京科学大学',

    member7_name: '佐藤 真一',
    member7_title: '国立情報学研究所',

    member8_name: '橋本 敦史',
    member8_title: 'オムロン サイニックエックス株式会社',

    member9_name: '藤江 学',
    member9_title: '沖縄科学技術大学院大学',

    member10_name: '光山 統泰',
    member10_title: '産業技術総合研究所',

    member11_name: '宮田 なつき',
    member11_title: '産業技術総合研究所',

    member12_name: '八木 拓真',
    member12_title: '産業技術総合研究所',

    member13_name: '吉永 智明',
    member13_title: '株式会社日立製作所',

    // ===== News Section =====
    news1_cat: 'お知らせ',
    news1_title: '年末年始休業のお知らせ',
    news1_text1: '平素より格別のご高配を賜り、厚く御礼申し上げます。',
    news1_text2: '誠に勝手ながら、下記の期間を年末年始休業とさせていただきます。',
    news1_text3: '休業期間：2024年12月28日（土）〜 2025年1月5日（日）',
    news1_text4: '休業期間中のお問い合わせにつきましては、2025年1月6日（月）以降、順次対応させていただきます。',
    news1_text5: 'ご不便をおかけいたしますが、何卒ご理解賜りますようお願い申し上げます。',

    news2_cat: 'プレスリリース',
    news2_title: '新サービス「DX診断」をリリースしました',
    news2_text1: 'この度、企業のデジタル化状況を可視化する新サービス「DX診断」をリリースいたしました。',
    news2_text2: '本サービスでは、貴社の現状を多角的に分析し、DX推進に向けた具体的なロードマップをご提案いたします。',
    news2_text3: '詳細はサービス紹介ページをご覧ください。',
    news2_text4: 'ご興味のある方は、お気軽にお問い合わせください。',

    news3_cat: 'イベント',
    news3_title: 'DXセミナーを開催いたします',
    news3_text1: '2024年12月10日（火）に、「中小企業のためのDX推進セミナー」を開催いたします。',
    news3_text2: '日時：2024年12月10日（火）14:00〜16:00',
    news3_text3: '場所：オンライン開催（Zoom）',
    news3_text4: '参加費：無料',
    news3_text5: '参加をご希望の方は、こちらの申込フォームよりお申し込みください。',

    news4_cat: 'メディア',
    news4_title: '日経新聞に当社の取り組みが掲載されました',
    news4_text1: '2024年10月5日付の日本経済新聞にて、当社のDX支援事業に関する記事が掲載されました。',
    news4_text2: '地方中小企業のデジタル化支援の取り組みについてご紹介いただいております。',
    news4_text3: '記事の詳細は日経電子版よりご確認いただけます。',

    // ===== Contact Section =====
    contact_text: 'ご質問やお問い合わせはこちらからお願いいたします。',
    contact_btn: 'お問い合わせ',

    // ===== Footer =====
    footer_research_area_name: '<a href="https://www.jst.go.jp/k-program/" target="_blank" rel="noopener noreferrer">JST K Program 経済安全保障重要技術育成プログラム</a><br><a href="https://www.jst.go.jp/k-program/program/cyber4.html" target="_blank" rel="noopener noreferrer">ノウハウの効果的な伝承につながる人作業伝達等の研究デジタル基盤技術</a>',
    footer_menu: 'メニュー',
    footer_about: '私たちについて',
    footer_member: 'メンバー',
    footer_news: 'ニュース',
    footer_events: 'イベント',
    footer_contact: 'お問い合わせ',
    footer_brand: 'ブランド素材',
    footer_link1: '外部サイト１',
    footer_link2: '外部サイト２',
    footer_link3: '外部サイト３',

    // ===== News/Events Pages =====
    news_page_title: 'News一覧',
    events_page_title: 'Events一覧',
    news_section_title: 'ニュース',
    view_news_list: 'ニュース一覧をみる',
    view_events_list: 'イベント一覧をみる',
    read_more: 'もっと見る',
    view_details: '詳細を見る',
    back_to_list: '一覧へ戻る',
    no_news: 'ニュースはありません。',
    no_events: 'イベントはありません。',

    // ===== Brand Assets Page =====
    brand_intro: 'スライドや資料等でご利用いただけるロゴ・キービジュアルのデータです。ダウンロードしてご使用ください。',
    brand_logo_heading: 'ロゴ',
    brand_logo_dark: 'ロゴ（ダーク）',
    brand_logo_white: 'ロゴ（ホワイト）',
    brand_kv_heading: 'キービジュアル',
    brand_kv: 'キービジュアル'
  },

  en: {
    // ===== Navigation =====
    nav_about: 'About',
    nav_member: 'Member',
    nav_news: 'News',
    nav_events: 'Events',
    nav_contact: 'Contact',

    // ===== KV Section =====
    kv_description: 'Unlocking Tacit Knowledge for\nExperimental Work Support in Life Sciences',
    kv_btn: 'Contact',

    // ===== About Section =====
    about_subtitle: 'What is BioSkillDX?',
    about_description: 'In this research and development project, we aim to contribute to the efficient accumulation and transfer of know-how related to experimental work in the field of life sciences by constructing a large-scale dataset of experimental tasks and developing AI technologies to capture tacit knowledge associated with experimental procedures.',
    about_cat1: 'Life Science',
    about_title1: 'Accumulation of Experimental Data & Tacit Knowledge',
    about_cat2: 'AI',
    about_title2: 'Tacit Knowledge Acquisition AI Model Development',
    about_cat3: 'Robotics',
    about_title3: 'Development of Assist Systems',

    // ===== Member Section =====
    member_pi_label: 'Principal Investigator/',

    member1_name: 'Yoichi Sato',
    member1_title: 'The University of Tokyo',

    member2_name: 'Hiromasa Ono',
    member2_title: 'PtBio Inc.',

    member3_name: 'Tazro Ohta',
    member3_title: 'Chiba University',

    member4_name: 'Kiyoshi Ohnuma',
    member4_title: 'Nagaoka University of Technology',

    member5_name: 'Genki Kanda',
    member5_title: 'Institute of Science Tokyo',

    member6_name: 'Yohei Sasagawa',
    member6_title: 'Institute of Science Tokyo',

    member7_name: "Shinichi Satoh",
    member7_title: 'National Institute of Informatics',

    member8_name: 'Atsushi Hashimoto',
    member8_title: 'OMRON SINIC X Corporation',

    member9_name: 'Manabu Fujie',
    member9_title: 'Okinawa Institute of Science and Technology',

    member10_name: 'Toutai Mitsuyama',
    member10_title: 'AIST',

    member11_name: 'Natsuki Miyata',
    member11_title: 'AIST',

    member12_name: 'Takuma Yagi',
    member12_title: 'AIST',

    member13_name: 'Tomoaki Yoshinaga',
    member13_title: 'Hitachi, Ltd.',

    // ===== News Section =====
    news1_cat: 'Notice',
    news1_title: 'Year-End and New Year Holiday Notice',
    news1_text1: 'Thank you for your continued support.',
    news1_text2: 'We will be closed during the following period for the year-end and New Year holidays.',
    news1_text3: 'Holiday Period: December 28, 2024 (Sat) - January 5, 2025 (Sun)',
    news1_text4: 'Inquiries during the holiday period will be addressed after January 6, 2025 (Mon).',
    news1_text5: 'We apologize for any inconvenience and appreciate your understanding.',

    news2_cat: 'Press Release',
    news2_title: 'New Service "DX Diagnosis" Released',
    news2_text1: 'We have released a new service "DX Diagnosis" to visualize corporate digitalization status.',
    news2_text2: 'This service analyzes your company\'s current state and proposes a concrete roadmap for DX promotion.',
    news2_text3: 'Please see the service introduction page for details.',
    news2_text4: 'If you are interested, please feel free to contact us.',

    news3_cat: 'Event',
    news3_title: 'DX Seminar to be Held',
    news3_text1: 'We will hold a "DX Promotion Seminar for SMEs" on December 10, 2024 (Tue).',
    news3_text2: 'Date: December 10, 2024 (Tue) 14:00-16:00',
    news3_text3: 'Venue: Online (Zoom)',
    news3_text4: 'Participation Fee: Free',
    news3_text5: 'Please apply using the application form.',

    news4_cat: 'Media',
    news4_title: 'Our Activities Featured in Nikkei Newspaper',
    news4_text1: 'An article about our DX support business was published in the Nikkei on October 5, 2024.',
    news4_text2: 'Our efforts to support digitalization of regional SMEs were introduced.',
    news4_text3: 'Please check the Nikkei online edition for article details.',

    // ===== Contact Section =====
    contact_text: 'Please feel free to contact us with any questions or inquiries.',
    contact_btn: 'Contact Us',

    // ===== Footer =====
    footer_research_area_name: '<a href="https://www.jst.go.jp/k-program/" target="_blank" rel="noopener noreferrer">JST K Program</a><br><a href="https://www.jst.go.jp/k-program/program/cyber4.html" target="_blank" rel="noopener noreferrer">Research and Foundational Technology Related to the Transfer of Human-Operated Tasks that Contribute to the Effective Transmission of Know-How</a>',
    footer_menu: 'Menu',
    footer_about: 'About',
    footer_member: 'Member',
    footer_news: 'News',
    footer_events: 'Events',
    footer_contact: 'Contact',
    footer_brand: 'Brand Assets',
    footer_link1: 'External Site 1',
    footer_link2: 'External Site 2',
    footer_link3: 'External Site 3',

    // ===== News/Events Pages =====
    news_page_title: 'News List',
    events_page_title: 'Events List',
    news_section_title: 'News',
    view_news_list: 'View all news',
    view_events_list: 'View all events',
    read_more: 'Read more',
    view_details: 'View details',
    back_to_list: 'Back to list',
    no_news: 'No news available.',
    no_events: 'No events available.',

    // ===== Brand Assets Page =====
    brand_intro: 'Logo and key visual assets for use in slides and documents. Please download and use as needed.',
    brand_logo_heading: 'Logo',
    brand_logo_dark: 'Logo (Dark)',
    brand_logo_white: 'Logo (White)',
    brand_kv_heading: 'Key Visual',
    brand_kv: 'Key Visual'
  }
};
