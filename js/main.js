/* ============================================================
   MAIN.JS — Premium init, utilities, micro-interactions
   ============================================================ */

(function () {

  // ── Prevent flash of invisible content ─────────────────────
  document.documentElement.style.visibility = 'visible';

  // ── Page load reveal ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  });

  // ── Mobile: disable hover effects on touch ──────────────────
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }

  // ── Prevent iframe scroll-trap on mobile ────────────────────
  const mapFrame = document.querySelector('.map-section__frame iframe');
  if (mapFrame) {
    mapFrame.addEventListener('touchstart', () => {
      mapFrame.style.pointerEvents = 'auto';
    });
    document.addEventListener('touchstart', (e) => {
      if (!mapFrame.contains(e.target)) {
        mapFrame.style.pointerEvents = 'none';
      }
    });
    const mapContainer = document.querySelector('.map-section__frame');
    if (mapContainer) {
      mapContainer.addEventListener('click', () => {
        mapFrame.style.pointerEvents = 'auto';
      });
    }
  }

  // ── Add radial shimmer on card hover ────────────────────────
  document.querySelectorAll('.detail-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%,
          rgba(245,233,192,0.55) 0%,
          rgba(255,252,248,0.92) 55%,
          rgba(255,252,248,0.72) 100%)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ── Map btn ripple effect ────────────────────────────────────
  const mapBtn = document.querySelector('.map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        width: 8px; height: 8px;
        left: ${e.clientX - rect.left - 4}px;
        top: ${e.clientY - rect.top - 4}px;
        background: rgba(255,255,255,0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleOut 0.5s ease-out forwards;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // ── CTA button glow enhancement ─────────────────────────────
  const ctaBtn = document.querySelector('.hero__cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 12px 40px rgba(212,175,55,0.45), 0 0 60px rgba(212,175,55,0.15)';
    });
    ctaBtn.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  }


  // ── Modal Toggle Logic ──────────────────────────────────────
  const openModalBtn  = document.getElementById('openInviteBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const exploreBtn    = document.getElementById('exploreBtn');
  const modal         = document.getElementById('invitationModal');

  function closeModalAction() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; 
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModalAction);
  }

  if (exploreBtn) {
    exploreBtn.addEventListener('click', closeModalAction);
  }

  // Close modal when clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalAction();
    }
  });

  // ── Accessibility: focus outlines only on keyboard nav ──────
  window.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
  });
  window.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // ── Inject utility styles ───────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    body:not(.keyboard-nav) *:focus { outline: none; }
    body.keyboard-nav *:focus {
      outline: 2px solid var(--gold);
      outline-offset: 3px;
    }
    body { visibility: visible !important; }

    @keyframes rippleOut {
      to { transform: scale(20); opacity: 0; }
    }


    /* Invitation arch animation */
    .invitation__arch {
      animation: archGlow 5s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);

  // ── Console watermark ────────────────────────────────────────
  console.log(
    '%c♥ Zikra Fatima & Tausif Lakha — Nikah Ceremony 2026 ♥',
    'font-family: serif; font-size: 14px; color: #D4AF37; background: #1A1208; padding: 10px 20px; border-radius: 6px; border: 1px solid #D4AF37;'
  );

})();
window.addEventListener("load", () => {

  const intro = document.getElementById("introScreen");
  const video = document.getElementById("introVideo");

  if (!intro || !video) return;

  // ALWAYS start at top
  window.scrollTo(0, 0);

  // lock scroll during intro
  document.body.style.overflow = "hidden";

  // when video finishes
  video.onended = () => {

    intro.classList.add("fade-out");

    setTimeout(() => {
      intro.style.display = "none";

      // unlock scroll
      document.body.style.overflow = "auto";

      // go to HERO section
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      }

    }, 1000);
  };

});
const video = document.getElementById("introVideo");
const card = document.getElementById("inviteCard");

video.addEventListener("ended", () => {
  card.style.opacity = "1";
  card.style.transform = "translateY(0)";
});
class StarSparkle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;

    this.size = Math.random() * 6 + 4;
    this.life = 0;
    this.maxLife = Math.random() * 60 + 40;

    this.rotation = Math.random() * Math.PI;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;

    this.alpha = 0;
  }

  update() {
    this.life++;
    this.rotation += this.rotSpeed;

    // fade in → hold → fade out
    if (this.life < this.maxLife * 0.3) {
      this.alpha += 0.03;
    } else if (this.life > this.maxLife * 0.7) {
      this.alpha -= 0.03;
    }

    if (this.life >= this.maxLife) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.alpha;

    ctx.beginPath();

    // ⭐ STAR SHAPE
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(0, this.size);
      ctx.translate(0, this.size);
      ctx.rotate((Math.PI * 2) / 10);
      ctx.lineTo(0, -this.size);
      ctx.translate(0, -this.size);
      ctx.rotate(-(Math.PI * 6) / 10);
    }

    ctx.closePath();

    // gradient glow
    let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.4, "#f5e9c0");
    grad.addColorStop(1, "rgba(212,175,55,0.2)");

    ctx.fillStyle = grad;

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";

    ctx.fill();

    ctx.restore();
  }
}