const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('music-status');

window.addEventListener('load', () => {
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = localStorage.getItem('musicTime');

    if (savedTime) audio.currentTime = parseFloat(savedTime);
    
    if (isPlaying) {
        audio.play().then(() => updateUI(true)).catch(() => updateUI(false));
    }
});

setInterval(() => {
    if (!audio.paused) {
        localStorage.setItem('musicTime', audio.currentTime);
    }
}, 1000);

function updateUI(playing) {
    if (playing) {
        musicIcon.innerText = "🎶";
        musicIcon.style.animation = "pulse 1.5s infinite";
    } else {
        musicIcon.innerText = "🎵";
        musicIcon.style.animation = "none";
    }
}

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        localStorage.setItem('musicPlaying', 'true');
        updateUI(true);
    } else {
        audio.pause();
        localStorage.setItem('musicPlaying', 'false');
        updateUI(false);
    }
}

musicIcon.addEventListener('click', toggleMusic);
// Horror Mode Toggle
// const horrorModeButton = document.getElementById('horror-btn');
// horrorModeButton.addEventListener('click', () => {
    // document.body.classList.toggle('horrormode');
// });