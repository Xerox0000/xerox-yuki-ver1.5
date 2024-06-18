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
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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

// 検索ボタンのクリックイベント
document.getElementById('search-button').addEventListener('click', () => {
    const searchBox = document.getElementById('search-box');
    const searchQuery = searchBox.value;

    if (searchQuery) {
        let history = getCookie('videoHistory');
        history = history ? JSON.parse(history) : [];
        history.push(searchQuery);
        setCookie('videoHistory', JSON.stringify(history), 365);

        alert(`検索クエリ「${searchQuery}」を履歴に保存しました。`);
        searchBox.value = '';
    }
});

// 履歴ボタンのクリックイベント
document.getElementById('history-button').addEventListener('click', displayHistory);
