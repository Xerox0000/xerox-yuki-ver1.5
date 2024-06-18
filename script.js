// Cookieを取得する関数
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Cookieに保存する関数
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 履歴を表示する関数
function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const historyCookie = getCookie('videoHistory');
    if (historyCookie) {
        const historyArray = JSON.parse(historyCookie);
        historyArray.forEach((item, index) => {
            const div = document.createElement('div');
            div.textContent = `${index + 1}: ${item}`;
            historyList.appendChild(div);
        });
    } else {
        historyList.textContent = '履歴はありません。';
    }
}

// ページ読み込み時に再生した動画を保存する例（仮の実装）
function savePlayedVideo(videoTitle) {
    let history = getCookie('videoHistory');
    history = history ? JSON.parse(history) : [];
    history.push(videoTitle);
    setCookie('videoHistory', JSON.stringify(history), 365);
}

document.addEventListener('DOMContentLoaded', () => {
    // 履歴ボタンのクリックイベント
    document.getElementById('history-button').addEventListener('click', displayHistory);

    // 仮の実装: 動画再生イベント（実際の実装に応じて変更が必要）
    // ここでは例として動画タイトルを保存する関数を呼び出します。
    // 動画が再生されるイベントに基づいてこの関数を呼び出してください。
    // savePlayedVideo('再生した動画のタイトル');
});
