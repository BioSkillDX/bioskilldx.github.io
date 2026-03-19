/**
 * BioskillDX - Simple Authentication
 */
(function() {
  'use strict';

  // 認証情報（Base64エンコード済み）
  // admin:bioskilldx2025
  const VALID_CREDENTIALS = 'YWRtaW46Ymlvc2tpbGxkeDIwMjU=';
  const AUTH_KEY = 'bioskilldx_auth';

  // 認証済みかチェック
  function isAuthenticated() {
    const auth = sessionStorage.getItem(AUTH_KEY);
    return auth === VALID_CREDENTIALS;
  }

  // 認証されていない場合は即座にページを隠す
  if (!isAuthenticated()) {
    // ページを即座に非表示にするスタイルを注入
    document.write('<style>html{visibility:hidden !important;}</style>');

    // 認証ダイアログを表示
    function showAuthDialog() {
      const username = prompt('ユーザー名を入力してください:');
      if (username === null) {
        window.location.href = 'about:blank';
        return;
      }

      const password = prompt('パスワードを入力してください:');
      if (password === null) {
        window.location.href = 'about:blank';
        return;
      }

      const credentials = btoa(username + ':' + password);
      if (credentials === VALID_CREDENTIALS) {
        sessionStorage.setItem(AUTH_KEY, credentials);
        // 認証成功したらページを再読み込み
        window.location.reload();
      } else {
        alert('ユーザー名またはパスワードが正しくありません。');
        showAuthDialog();
      }
    }

    showAuthDialog();
  }
})();
