const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('music-status');
const horrorBtn = document.getElementById("horror-btn");
const normalMusicSrc = "normal-track.mp3"; 
const horrorMusicSrc = "horrortrack.mp3"; 
let normalMusicTime = 0; 

// music control
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

// horror mode detailing
const horrorTexts = {
  ".welcome": "THERE'S NO GOING BACK NOW HAHAHA",
  ".myintro": "I'm Alisha. You've just stepped out of the light and into the red.",
  ".bubblybox": "Does the 'game-like' layout still look friendly in the dark? It shouldn't. It's a paper shroud, and you're staring right through the rot. This isn't a portfolio anymore. This is my first software project, and I've made sure it's... sticky. Keep your expectations gentle. I'd hate for the site to get angry while you're still trapped inside.",
  "#section2 h3.HC": "OH... LOOK WHO CRAWLED INTO THE CELLAR.",
  "#section2 .bubblybox": "You've found the remains. This is where I keep my projects: the survivors, the corpses, and the half-formed things I'm still stitching together in the dark. Witness what I built, how I broke it, and what crawled out of the wreckage. Explore the decay, feed on the inspiration, or just let the chaos swallow you whole. (Listen to some music... if you dare. 👁️)",
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

  // swap texts
  for (const selector in horrorElements) {
    const el = horrorElements[selector];
    if (inHorror) {
      if (!(selector in originalTexts)) originalTexts[selector] = el.textContent;
      fadeText(el, horrorTexts[selector]);
    } else {
      fadeText(el, originalTexts[selector]);
    }
  }

  // music source swap (user decides whether to play)
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

// smooth scroll
      const snapSections = () => [
        document.querySelector('header'),
        ...document.querySelectorAll('main > section'),
        document.querySelector('footer')
      ].filter(Boolean);

      document.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        const sections = snapSections();
        const scrollMid = window.scrollY + window.innerHeight / 2;
        let currentIdx = 0;
        sections.forEach((sec, i) => {
          if (sec.offsetTop <= scrollMid) currentIdx = i;
        });
        const targetIdx = e.key === 'ArrowDown'
          ? Math.min(currentIdx + 1, sections.length - 1)
          : Math.max(currentIdx - 1, 0);
        sections[targetIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

// goal data
const allGoals = [
  {
    title: "Egg Timer",
    startDate: "2026-02-10",
    endDate: "2026-02-28",
    tasks: [
      { text: "Create 3 separate timers (Soft, Medium, Hard)", done: true },
      { text: "Ensure Back / Reset button works", done: true },
      { text: "Design pixel-style timer images", done: true },
      { text: "Deploy to hosting provider", done: true }
    ]
  },
  {
    title: "SatScope: Satellite Explorer",
    startDate: "2026-03-10",
    endDate: "2026-04-10",
    tasks: [
      { text: "Core UI: HTML Structure & Retro-Styling", done: true },
      { text: "3D Engine: Three.js Scene & Satellite Model", done: true },
      { text: "Interactivity: Orbit Controls & Mouse Dragging", done: true },
      { text: "Logic: Raycasting & Info Panels", done: true },
      { text: "Final Polish: Camera Animations & Deployment", done: false }
    ]
  }
];

// the "how it looks" part
function renderAllGoals() {
  const wrapper = document.getElementById("goals-wrapper");
  if (!wrapper) return; 

  wrapper.innerHTML = ""; 

  allGoals.forEach(goal => {
    // task Progress
    const totalTasks = goal.tasks.length;
    const completedTasks = goal.tasks.filter(t => t.done).length;
    const taskPercent = Math.round((completedTasks / totalTasks) * 100);

    // create the HTML Card
    const goalCard = document.createElement("div");
    goalCard.className = "goal-card"; 
    
    goalCard.innerHTML = `
      <h2 class="goalTitle">${goal.title}</h2>
      <p class="dateInfo" style="font-family: 'Press Start 2P'; font-size: 0.5rem; color: #8bb8cc; margin-bottom: 15px;">
        ${goal.startDate} → ${goal.endDate}
      </p>
      
      <div class="progress-container">
        <div class="progressBar" style="width: ${taskPercent}%"></div>
      </div>
      
      <p class="progressText" style="font-family: 'Press Start 2P'; font-size: 0.55rem; color: #ffd6a5; margin-bottom: 15px;">
        ${taskPercent}% Completed
      </p>

      <ul class="checklist" style="list-style: none;">
        ${goal.tasks.map(task => `
          <li class="${task.done ? 'completed' : ''}" style="margin: 8px 0; font-size: 0.9rem;">
            ${task.text}
          </li>
        `).join('')}
      </ul>
    `;

    wrapper.appendChild(goalCard);
  });
}

renderAllGoals();