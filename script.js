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
            div.innerHTML = `<a href="${item.link}"><img src="${item.thumbnail}" alt="${item.title}" width="100"><br>${index + 1}: ${item.title}</a>`;
            historyList.appendChild(div);
        });
    } else {
        historyList.textContent = '履歴はありません。';
    }
}

// 再生した動画を保存する関数
function savePlayedVideo(videoTitle, videoThumbnail, videoLink) {
    let history = getCookie('videoHistory');
    history = history ? JSON.parse(history) : [];
    history.push({ title: videoTitle, thumbnail: videoThumbnail, link: videoLink });
    setCookie('videoHistory', JSON.stringify(history), 365);
}

document.addEventListener('DOMContentLoaded', () => {
    // 履歴ボタンのクリックイベント
    document.getElementById('history-button').addEventListener('click', displayHistory);

    // 動画リンクのクリックイベント
    document.querySelectorAll('.video-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const videoTitle = event.target.getAttribute('data-title');
            const videoThumbnail = event.target.getAttribute('data-thumbnail');
            const videoLink = event.target.href;
            savePlayedVideo(videoTitle, videoThumbnail, videoLink);
            window.location.href = videoLink;
        });
    });
});
