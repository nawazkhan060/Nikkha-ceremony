(function () {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;

  const petals = [];
  const stars = [];

  const PETAL_COUNT = window.innerWidth < 640 ? 12 : 25;
  const STAR_COUNT = 20;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // 🌸 PETAL CLASS
  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : -20;

      this.size = Math.random() * 14 + 6;
      this.speedY = Math.random() * 0.4 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;

      this.rot = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.01;

      this.alpha = Math.random() * 0.5 + 0.4;
      this.shape = Math.random();
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rot += this.rotSpeed;

      if (this.y > H + 20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha;

      ctx.beginPath();

      if (this.shape > 0.5) {
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      } else {
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size, 0, this.size, this.size, 0, this.size);
        ctx.bezierCurveTo(-this.size, this.size, -this.size, 0, 0, -this.size);
      }

      let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.6, 'rgba(245,220,200,0.7)');
      grad.addColorStop(1, 'rgba(212,175,55,0.3)');

      ctx.fillStyle = grad;

      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(212,175,55,0.4)';

      ctx.fill();
      ctx.restore();
    }
  }

  // ✨ STAR SPARKLES CLASS
  class StarSparkle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;

      this.size = Math.random() * 5 + 3;
      this.life = 0;
      this.maxLife = Math.random() * 60 + 40;

      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;

      this.alpha = 0;
    }

    update() {
      this.life++;
      this.rotation += this.rotSpeed;

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

      // ⭐ star shape
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(0, this.size);
        ctx.translate(0, this.size);
        ctx.rotate((Math.PI * 2) / 10);
        ctx.lineTo(0, -this.size);
        ctx.translate(0, -this.size);
        ctx.rotate(-(Math.PI * 6) / 10);
      }

      ctx.closePath();

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

  function init() {
    resize();
    petals.length = 0;
    stars.length = 0;

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new Petal());
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new StarSparkle());
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    petals.forEach(p => {
      p.update();
      p.draw();
    });

    stars.forEach(s => {
      s.update();
      s.draw();
    });

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);

  init();
  loop();
})();