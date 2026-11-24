// ============================================================
// FILE:     src/components/MusicPlayer.jsx
// PURPOSE:  The floating music player (bottom-right).
//
// RULES FROM THE BRIEF:
//   - NO autoplay. Music starts only when the visitor presses Play.
//   - Easy to switch off: Play/Pause, Mute and a Volume slider.
//   - Unobtrusive: collapsed into one small round button.
//
// HOW TO ADD MORE SONGS:
//   1. Put the .mp3 in  public/assets/music/
//   2. Add a line to the "tracks" array below.
//   A "Next" button appears automatically when there are 2+ tracks.
//
// STATE:  open, playing, muted, volume, trackIndex, hint
// REFS:   audioRef  -> the real <audio> element (we call play()/pause() on it)
//         loadedRef -> has the song file been requested yet? (a ref, not state,
//                      because changing it should NOT redraw the screen)
// ============================================================
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";

const tracks = [{ title: "Interstellar Theme", src: "/assets/music/interstellar-theme.mp3" }];

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(35); // 0 - 100
  const [trackIndex, setTrackIndex] = useState(0);
  const [hint, setHint] = useState("Music is off until you press play.");

  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const loadedRef = useRef(false);

  // Keep the real audio element in sync with our state
  useEffect(() => { audioRef.current.volume = volume / 100; }, [volume]);
  useEffect(() => { audioRef.current.muted = muted; }, [muted]);

  // Close the panel on outside click or Escape
  useEffect(() => {
    const onClick = (e) => { if (!playerRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!loadedRef.current) {              // the file downloads only NOW, after a click
      audio.src = tracks[trackIndex].src;
      loadedRef.current = true;
    }
    if (audio.paused) {
      // play() returns a Promise — it can fail, so we handle that politely
      audio.play().catch(() => setHint("Couldn't play this file. Check the music path in MusicPlayer.jsx."));
    } else {
      audio.pause();
    }
  }

  function nextTrack() {
    const next = (trackIndex + 1) % tracks.length;
    setTrackIndex(next);
    audioRef.current.src = tracks[next].src;
    loadedRef.current = true;
    audioRef.current.play();
  }

  function handleVolume(e) {
    const value = Number(e.target.value);
    setVolume(value);
    if (muted && value > 0) setMuted(false); // dragging up while muted un-mutes
  }

  return (
    <div className={`music-player ${open ? "open" : ""} ${playing ? "playing" : ""}`} ref={playerRef}>
      <button
        type="button"
        className="music-toggle"
        aria-expanded={open}
        aria-controls="musicPanel"
        aria-label={open ? "Close music player" : "Open music player"}
        onClick={() => setOpen(!open)}
      >
        <Icon name="note" />
        <span className="eq" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>

      <div className="music-panel" id="musicPanel" role="group" aria-label="Background music controls">
        <p className="music-title">{tracks[trackIndex].title}</p>
        <p className="music-hint">{hint}</p>

        <div className="music-controls">
          <button type="button" className="music-btn music-btn-main" onClick={togglePlay} aria-label={playing ? "Pause music" : "Play music"}>
            <Icon name={playing ? "pause" : "play"} />
          </button>

          {tracks.length > 1 && (
            <button type="button" className="music-btn" onClick={nextTrack} aria-label="Next track">
              <Icon name="next" />
            </button>
          )}

          <button type="button" className="music-btn" onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute music" : "Mute music"}>
            <Icon name={muted ? "mute" : "volume"} />
          </button>

          <input
            type="range" id="musicVolume" min="0" max="100"
            value={volume} onChange={handleVolume}
            style={{ "--vol": `${volume}%` }}
            aria-label="Volume"
          />
        </div>
      </div>

      {/* preload="none" = the 7 MB file is NOT downloaded until the visitor presses play */}
      <audio
        ref={audioRef}
        preload="none"
        loop
        onPlay={() => { setPlaying(true); setHint("Now playing"); }}
        onPause={() => { setPlaying(false); setHint("Paused"); }}
      />
    </div>
  );
}
