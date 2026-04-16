/* ============================================================
   PARTICLES.JS — Golden dust particle system (enhanced)
   ============================================================ */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const isMobile = window.innerWidth < 640;
  const PARTICLE_COUNT = isMobile ? 32 : 65;

  let W, H, particles = [], animFrameId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x        = Math.random() * W;
      this.y        = init ? Math.random() * H : H + 12;
      this.size     = Math.random() * 2.5 + 0.3;
      this.speedY   = -(Math.random() * 0.45 + 0.12);
      this.speedX   = (Math.random() - 0.5) * 0.28;
      this.alpha    = 0;
      this.maxAlpha = Math.random() * 0.5 + 0.08;
      this.fadeSpeed = Math.random() * 0.006 + 0.002;
      this.phase    = Math.random() < 0.5 ? 'in' : (init ? 'hold' : 'in');
      this.life     = 0;
      this.maxLife  = Math.random() * 340 + 200;
      this.twinkle  = Math.random() < 0.3; // Some particles twinkle

      const tones = [
        { r:212, g:175, b:55  },
        { r:230, g:201, b:122 },
        { r:248, g:240, b:208 },
        { r:255, g:232, b:138 },
        { r:184, g:150, b:12  },
        { r:245, g:220, b:160 },
      ];
      const t = tones[Math.floor(Math.random() * tones.length)];
      this.r = t.r; this.g = t.g; this.b = t.b;
    }

    update() {
      this.x += this.speedX + Math.sin(this.life * 0.018) * 0.35;
      this.y += this.speedY;
      this.life++;

      if (this.twinkle) {
        this.alpha = Math.max(0, this.maxAlpha * (0.5 + 0.5 * Math.sin(this.life * 0.1)));
      } else if (this.phase === 'in') {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= this.maxAlpha) {
          this.alpha = this.maxAlpha;
          this.phase = 'hold';
        }
      } else if (this.phase === 'hold') {
        if (this.life > this.maxLife * 0.65) this.phase = 'out';
      } else {
        this.alpha -= this.fadeSpeed * 0.7;
        if (this.alpha <= 0 || this.y < -12) this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();

      if (this.size > 1.6) {
        const grd = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        grd.addColorStop(0, `rgba(${this.r},${this.g},${this.b},1)`);
        grd.addColorStop(0.5, `rgba(${this.r},${this.g},${this.b},0.4)`);
        grd.addColorStop(1, `rgba(${this.r},${this.g},${this.b},0)`);
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
      } else {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
      }

      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrameId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrameId);
    resize();
    loop();
  });

  init();
  loop();
})();
