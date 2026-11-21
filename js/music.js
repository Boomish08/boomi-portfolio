/* ============================================================
   FILE:     js/music.js
   PURPOSE:  The small floating music player (bottom-right corner).

   RULES FROM THE BRIEF:
     - NO autoplay. Music starts only when the visitor presses Play.
     - Easy to switch off: Play/Pause, Mute and a Volume slider.
     - Unobtrusive: it stays collapsed into one small round button.

   HOW TO ADD MORE SONGS:
     1. Put the .mp3 file in  assets/music/
     2. Add a line to the "tracks" array below.
     A "Next" button appears automatically when there is more than one track.
   ============================================================ */

const tracks = [
  { title: "Interstellar Theme", src: "assets/music/interstellar-theme.mp3" }
];

// Grab every element we need
const player     = document.getElementById("musicPlayer");
const toggleBtn  = document.getElementById("musicToggle");
const playBtn    = document.getElementById("musicPlay");
const nextBtn    = document.getElementById("musicNext");
const muteBtn    = document.getElementById("musicMute");
const volumeBar  = document.getElementById("musicVolume");
const titleEl    = document.getElementById("musicTitle");
const hintEl     = document.getElementById("musicHint");
const audio      = document.getElementById("bgAudio");

let trackIndex = 0;
let loaded = false;          // have we set audio.src yet?

audio.volume = Number(volumeBar.value) / 100;
volumeBar.style.setProperty("--vol", volumeBar.value + "%");   // fills the slider with gold

if (tracks.length > 1) nextBtn.hidden = false;

/* Small helper: swap the icon inside a button.
   Each button contains <svg><use href="#i-..."></use></svg> */
function setIcon(button, iconId) {
  button.querySelector("use").setAttribute("href", "#" + iconId);
}

function loadTrack(index) {
  trackIndex = index;
  audio.src = tracks[index].src;
  titleEl.textContent = tracks[index].title;
  loaded = true;
}

/* ----- Open / close the panel ----- */
toggleBtn.addEventListener("click", function () {
  const open = player.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", String(open));
  toggleBtn.setAttribute("aria-label", open ? "Close music player" : "Open music player");
});

// Close the panel when clicking elsewhere or pressing Escape
document.addEventListener("click", function (event) {
  if (!player.contains(event.target)) {
    player.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && player.classList.contains("open")) {
    player.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.focus();
  }
});

/* ----- Play / Pause ----- */
playBtn.addEventListener("click", function () {
  if (!loaded) loadTrack(trackIndex);       // the file downloads only NOW, after a click

  if (audio.paused) {
    // play() returns a Promise — it can fail, so we handle that politely
    audio.play().catch(function () {
      hintEl.textContent = "Couldn't play this file. Check the music path in js/music.js.";
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", function () {
  player.classList.add("playing");
  setIcon(playBtn, "i-pause");
  playBtn.setAttribute("aria-label", "Pause music");
  hintEl.textContent = "Now playing";
});

audio.addEventListener("pause", function () {
  player.classList.remove("playing");
  setIcon(playBtn, "i-play");
  playBtn.setAttribute("aria-label", "Play music");
  hintEl.textContent = "Paused";
});

/* ----- Next track (only visible when there are 2+ tracks) ----- */
nextBtn.addEventListener("click", function () {
  loadTrack((trackIndex + 1) % tracks.length);
  audio.play();
});

/* ----- Mute ----- */
muteBtn.addEventListener("click", function () {
  audio.muted = !audio.muted;
  setIcon(muteBtn, audio.muted ? "i-mute" : "i-volume");
  muteBtn.setAttribute("aria-label", audio.muted ? "Unmute music" : "Mute music");
});

/* ----- Volume slider ----- */
volumeBar.addEventListener("input", function () {
  audio.volume = Number(volumeBar.value) / 100;
  volumeBar.style.setProperty("--vol", volumeBar.value + "%");
  // Dragging the slider up while muted should un-mute
  if (audio.muted && audio.volume > 0) {
    audio.muted = false;
    setIcon(muteBtn, "i-volume");
    muteBtn.setAttribute("aria-label", "Mute music");
  }
});
