const main = document.getElementById("intro-main");
const namePart = document.getElementById("intro-name");
const tagline = document.getElementById("intro-tagline");
const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('music-status');
const horrorBtn = document.getElementById("horror-btn");
const normalMusicSrc = "normal-track.mp3"; 
const horrorMusicSrc = "horrortrack.mp3"; 
let normalMusicTime = 0; 

// Typing Intro
const mainText = "WELCOME TO MY…";
let i = 0;

function typeIntro() {
  if (i < mainText.length) {
    main.textContent += mainText[i++];
    setTimeout(typeIntro, 90);
  } else {
    [namePart, tagline].forEach((el, idx) => {
      setTimeout(() => el.classList.add("show"), idx === 0 ? 400 : 2000);
    });
  }
}
typeIntro();

// Music Control
window.addEventListener('load', () => {
  const isPlaying = localStorage.getItem('musicPlaying') === 'true';
  const savedTime = localStorage.getItem('musicTime');

  if (savedTime) audio.currentTime = parseFloat(savedTime);

  if (isPlaying) {
    audio.play().then(() => updateMusicUI(true)).catch(() => updateMusicUI(false));
  }
});

audio.addEventListener('timeupdate', () => {
  localStorage.setItem('musicTime', audio.currentTime);
});

function updateMusicUI(playing) {
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
    updateMusicUI(true);
  } else {
    audio.pause();
    localStorage.setItem('musicPlaying', 'false');
    updateMusicUI(false);
  }
}
musicIcon.addEventListener('click', toggleMusic);

// Horror Mode
const horrorTexts = {
  "#intro-name": "I KNEW YOU'D CLICK IT.",
  "#intro-tagline": "I've been waiting for a fresh set of eyes... LOL",
  ".myintro": "I'm Alisha. You've just stepped out of the light and into the red.",
  ".bubblybox p:first-of-type": "Does the 'comic book' layout still look friendly in the dark? It shouldn't. It's a paper shroud, and you're staring right through the rot. This isn't a portfolio anymore. This is my first software project, and I've made sure it's... sticky. Keep your expectations gentle. I'd hate for the site to get angry while you're still trapped inside.",
  "#section2 h3.HC": "OH... LOOK WHO CRAWLED INTO THE CELLAR.",
  "#section2 .bubblybox p": "You've found the remains. This is where I keep my projects: the survivors, the corpses, and the half-formed things I'm still stitching together in the dark. Witness what I built, how I broke it, and what crawled out of the wreckage. Explore the decay, feed on the inspiration, or just let the chaos swallow you whole. (Listen to some music... if you dare. 👁️)",
  "#section2 h1.blob": "MY EARLY CHAOS…",
  "#section3 h1.blob": "GOALS… OR… TRAPS?",
  "#section3 p": "You're so excited to see huh?"
};

const originalTexts = {};
const horrorElements = {};

for (const selector in horrorTexts) {
  const el = document.querySelector(selector);
  if (el) horrorElements[selector] = el;
}

horrorBtn.addEventListener("click", () => {
  const inHorror = document.body.classList.toggle("horror-mode");
  horrorBtn.textContent = inHorror ? "Exit Horror Mode" : "Enter Horror Mode";

  // Swap texts
  for (const selector in horrorElements) {
    const el = horrorElements[selector];
    if (inHorror) {
      if (!(selector in originalTexts)) originalTexts[selector] = el.textContent;
      fadeText(el, horrorTexts[selector]);
    } else {
      fadeText(el, originalTexts[selector]);
    }
  }

  // Music source swap (user decides whether to play)
  if (inHorror) {
    normalMusicTime = audio.currentTime; 
    audio.src = horrorMusicSrc;           
    audio.currentTime = 0;                
  } else {
    audio.src = normalMusicSrc;           
    audio.currentTime = normalMusicTime;  
  }
});

// Smooth Text Swap
function fadeText(element, newText) {
  element.style.transition = "opacity 0.3s";
  element.style.opacity = 0;

  setTimeout(() => {
    element.textContent = newText;
    element.style.opacity = 1;
  }, 300);
}