/* ============================================================
   ANIMATIONS.JS — Scroll-triggered reveals & hero animation
   ============================================================ */

(function () {

  // ── Hero: Trigger fade-up elements on load ──────────────────
  function initHeroAnimations() {
    const els = document.querySelectorAll('.hero .fade-up');
    // Stagger them all as animated; delays are in CSS
    requestAnimationFrame(() => {
      els.forEach(el => el.classList.add('animated'));
    });

    // Draw divider lines with delay
    setTimeout(() => {
      document.querySelectorAll('.draw-line').forEach(line => {
        line.classList.add('drawn');
      });
    }, 600);
  }

  // ── IntersectionObserver for scroll reveals ─────────────────
  function initScrollReveals() {
    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

          setTimeout(() => {
            el.classList.add('in-view');
          }, delay);

          observer.unobserve(el);
        }
      });
    }, options);

    // Target all reveal elements
    const targets = document.querySelectorAll(
      '.reveal-up, .reveal-text, .reveal-word, .detail-card, ' +
      '.map-section__frame, .map-section__info, ' +
      '.countdown__unit, ' +
      '.invitation__text, .invitation__names-display, .invitation__dua, .invitation__label, ' +
      '.footer__names, .footer__date, .footer__dua, .footer__credit'
    );

    targets.forEach(el => observer.observe(el));
  }

  // ── Section headers ─────────────────────────────────────────
  function initSectionHeaders() {
    const headerObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const header = entry.target;
          const label = header.querySelector('.section__label');
          const title = header.querySelector('.section__title');
          const divider = header.querySelector('.section__divider');

          if (label) {
            label.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            label.style.opacity = '0';
            label.style.transform = 'translateY(16px)';
            setTimeout(() => {
              label.style.opacity = '1';
              label.style.transform = 'translateY(0)';
            }, 50);
          }

          if (title) {
            title.style.transition = 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s';
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            setTimeout(() => {
              title.style.opacity = '1';
              title.style.transform = 'translateY(0)';
            }, 50);
          }

          if (divider) {
            divider.style.transition = 'opacity 0.7s ease 0.3s';
            divider.style.opacity = '0';
            setTimeout(() => {
              divider.style.opacity = '1';
            }, 50);
          }

          headerObs.unobserve(header);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section__header').forEach(h => headerObs.observe(h));
  }

  // ── Parallax: subtle hero parallax on scroll ────────────────
  function initParallax() {
    const hero = document.querySelector('.hero');
    const streaks = document.querySelectorAll('.hero__light-streak');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroH = hero.offsetHeight;

          if (scrollY < heroH) {
            const ratio = scrollY / heroH;

            // Fade hero out slightly
            hero.style.opacity = 1 - ratio * 0.4;

            // Move streaks at different speeds
            streaks.forEach((s, i) => {
              const speed = 0.15 + i * 0.08;
              s.style.transform = `translateY(${scrollY * speed}px)`;
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Smooth scroll for anchor links ──────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        const offset = 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      });
    });
  }

  // ── Invitation text word-by-word reveal ─────────────────────
  function initInvitationReveal() {
    const invObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('in-view');
          invObs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.invitation .reveal-text, .invitation .reveal-word').forEach(el => {
      invObs.observe(el);
    });

    // Also observe invitation__names-display
    const namesDisplay = document.querySelector('.invitation__names-display');
    if (namesDisplay) invObs.observe(namesDisplay);
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollReveals();
    initSectionHeaders();
    initParallax();
    initSmoothScroll();
    initInvitationReveal();
  });

})();
 