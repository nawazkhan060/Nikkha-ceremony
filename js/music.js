/* ============================================================
   MUSIC.JS — Background music with Autoplay & 60% Volume
   ============================================================ */

(function () {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  // Set volume to 60% as requested
  audio.volume = 0.6;

  let hasPlayed = false;

  function playMusic() {
    if (hasPlayed) return;

    audio.play().then(() => {
      hasPlayed = true;
      console.log('Music playing at 60% volume');
    }).catch(err => {
      console.warn('Playback blocked or failed. Waiting for deeper interaction.', err);
    });
  }

  // 1. Try playing immediately (might be blocked)
  playMusic();

  // 2. Fallback: Play on any user interaction with the document
  const playOnInteraction = () => {
    if (!hasPlayed) {
      playMusic();
    }
    if (hasPlayed) {
      window.removeEventListener('click', playOnInteraction);
      window.removeEventListener('touchstart', playOnInteraction);
      window.removeEventListener('keydown', playOnInteraction);
    }
  };

  window.addEventListener('click', playOnInteraction);
  window.addEventListener('touchstart', playOnInteraction, { passive: true });
  window.addEventListener('keydown', playOnInteraction);

  // 3. Specifically hook into the "Open Invitation" button
  const openBtn = document.getElementById('openInviteBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      // Direct call to ensure it plays on this specific click
      audio.play().then(() => {
        hasPlayed = true;
      }).catch(e => console.error("Final play attempt failed:", e));
    });
  }

})();
