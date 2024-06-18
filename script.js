const videos = [
    { url: 'video1.mp4', hashtags: ['#short', '#fun'] },
    { url: 'video2.mp4', hashtags: ['#short', '#music'] },
    { url: 'video3.mp4', hashtags: ['#short', '#travel'] },
    // 他の動画とハッシュタグを追加
];

let userHistory = [];

document.addEventListener('DOMContentLoaded', () => {
    playRandomVideo(videos);
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            playRandomVideo(videos);
        }
    });
});

function playRandomVideo(videoList) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // コンテナをクリア

    const randomIndex = Math.floor(Math.random() * videoList.length);
    const video = document.createElement('video');
    video.src = videoList[randomIndex].url;
    video.controls = true;
    video.autoplay = true;
    videoContainer.appendChild(video);

    // 閲覧履歴に追加
    userHistory.push(videoList[randomIndex].url);

    video.addEventListener('ended', () => {
        playRandomVideo(videoList);
    });
}

function showHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = ''; // コンテナをクリア
    historyContainer.style.display = 'block';

    if (userHistory.length === 0) {
        historyContainer.innerText = '閲覧履歴がありません。';
    } else {
        userHistory.forEach(url => {
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            historyContainer.appendChild(video);
        });
    }
}

function searchVideos() {
    const hashtagInput = document.getElementById('hashtagInput').value.trim();
    const hashtag = hashtagInput.startsWith('#') ? hashtagInput : `#${hashtagInput}`;

    const filteredVideos = videos.filter(video => video.hashtags.includes(hashtag));
    if (filteredVideos.length > 0) {
        playRandomVideo(filteredVideos);
    } else {
        alert('該当する動画が見つかりませんでした。');
    }
}
