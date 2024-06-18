// 閲覧履歴をCookieに保存する関数
function saveHistory() {
    const currentPage = window.location.href;
    let history = getCookie('viewHistory');
    if (!history) {
        history = [];
    } else {
        history = JSON.parse(history);
    }

    // 重複を避けるため、既存の履歴から同じページを削除
    history = history.filter(page => page !== currentPage);

    // 最新のページを先頭に追加
    history.unshift(currentPage);

    // 最大10件までに制限
    if (history.length > 10) {
        history.pop();
    }

    setCookie('viewHistory', JSON.stringify(history), 365);
}

// Cookieを取得する関数
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Cookieを設定する関数
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// 閲覧履歴を表示する関数
function showHistory() {
    const history = getCookie('viewHistory');
    if (!history) {
        alert('閲覧履歴がありません。');
        return;
    }

    const historyArray = JSON.parse(history);
    let historyHtml = '<h3>閲覧履歴</h3><ul>';
    historyArray.forEach(page => {
        historyHtml += `<li><a href="${page}">${page}</a></li>`;
    });
    historyHtml += '</ul>';

    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = historyHtml;
}

// ページ読み込み時に閲覧履歴を保存
window.onload = saveHistory;
