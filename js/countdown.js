/* ============================================================
   COUNTDOWN.JS — Live countdown to 9 May 2026
   ============================================================ */

(function () {

  // Target: 9 May 2026 — After Asar prayer (~5:30 PM as approximate)
  const TARGET = new Date('2026-05-09T17:30:00').getTime();

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return;

  // ── Update display with flip effect ─────────────────────────
  function updateEl(el, newVal) {
    const padded = String(newVal).padStart(2, '0');
    if (el.textContent !== padded) {
      el.classList.remove('flip');
      void el.offsetWidth; // Reflow
      el.classList.add('flip');
      el.textContent = padded;
    }
  }

  // ── Tick ────────────────────────────────────────────────────
  function tick() {
    const now  = Date.now();
    const diff = TARGET - now;

    if (diff <= 0) {
      // Event has passed — show zeros or a celebration message
      updateEl(daysEl, 0);
      updateEl(hoursEl, 0);
      updateEl(minutesEl, 0);
      updateEl(secondsEl, 0);

      const timerEl = document.getElementById('countdownTimer');
      if (timerEl) {
        const msgEl = document.createElement('p');
        msgEl.style.cssText = `
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--gold);
          margin-top: 16px;
          letter-spacing: 2px;
        `;
        msgEl.textContent = '🎉 Mabrook! The blessed day is here!';
        timerEl.after(msgEl);
      }
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateEl(daysEl,    days);
    updateEl(hoursEl,   hours);
    updateEl(minutesEl, minutes);
    updateEl(secondsEl, seconds);

    setTimeout(tick, 1000);
  }

  // ── IntersectionObserver: animate units when in view ────────
  const unitObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const units = document.querySelectorAll('.countdown__unit');
        units.forEach((u, i) => {
          setTimeout(() => u.classList.add('in-view'), i * 100);
        });
        unitObs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const countdownSection = document.getElementById('countdown');
  if (countdownSection) unitObs.observe(countdownSection);

  // ── Start ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', tick);

})();
