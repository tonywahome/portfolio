/* ═══════════════════════════════════════════════════════════
   ANTONY WAHOME — Portfolio Script
   1. Canvas Starfield Animation
   2. Typing / Typewriter Hero Title
   3. Navigation: scroll spy + glassmorphism on scroll
   4. Hamburger Mobile Menu
   5. Experience Tabs
   6. Project Filter Tabs
   7. Scroll Reveal (IntersectionObserver)
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────
   1. CANVAS STARFIELD
   ~200 drifting stars + sparkle glyphs
   Colours: grey (70%) · cyan (20%) · brown (10%)
   ────────────────────────────────────── */

(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const COLOURS = {
    grey:  [210, 218, 226],
    cyan:  [6,   182, 212],
    brown: [196, 151, 62],
  };

  const PARTICLE_COUNT = 220;
  let particles = [];
  let animId;

  function randomColour() {
    const r = Math.random();
    if (r < 0.70) return COLOURS.grey;
    if (r < 0.90) return COLOURS.cyan;
    return COLOURS.brown;
  }

  class Particle {
    constructor(randomY) {
      this.reset(randomY);
    }

    reset(randomY) {
      this.x           = Math.random() * canvas.width;
      this.y           = randomY != null ? randomY : canvas.height + 10;
      this.size        = Math.random() * 1.6 + 0.3;
      this.speed       = Math.random() * 0.25 + 0.06;
      this.baseOpacity = Math.random() * 0.65 + 0.15;
      this.twinkleSpd  = Math.random() * 0.025 + 0.005;
      this.twinklePhase= Math.random() * Math.PI * 2;
      this.colour      = randomColour();
      this.isSparkle   = Math.random() < 0.09;
      this.sparkleChar = ['✦', '✧', '·', '★'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.y -= this.speed;
      this.twinklePhase += this.twinkleSpd;
      this.opacity = this.baseOpacity * (0.45 + 0.55 * Math.abs(Math.sin(this.twinklePhase)));
      if (this.y < -14) this.reset();
    }

    draw() {
      const [r, g, b] = this.colour;
      ctx.globalAlpha = Math.min(this.opacity, 1);

      if (this.isSparkle) {
        ctx.font        = `${this.size * 9}px serif`;
        ctx.fillStyle   = `rgb(${r},${g},${b})`;
        ctx.fillText(this.sparkleChar, this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread initial positions across the full viewport height
      particles.push(new Particle(Math.random() * canvas.height));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParticles, 180);
  });

  initParticles();
  animate();
})();


/* ──────────────────────────────────────
   2. TYPING / TYPEWRITER ANIMATION
   ────────────────────────────────────── */

(function initTyping() {
  const el = document.getElementById('typed-title');
  if (!el) return;

  const titles = [
    'Data Scientist',
    'ML Engineer',
    'Research Analyst',
    'Data Analyst',
  ];

  let titleIdx  = 0;
  let charIdx   = 0;
  let deleting  = false;
  let timer     = null;

  function type() {
    const current = titles[titleIdx];

    if (deleting) {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
    }

    let delay = deleting ? 45 : 95;

    if (!deleting && charIdx === current.length) {
      // Finished typing — pause then start deleting
      delay     = 2200;
      deleting  = true;
    } else if (deleting && charIdx === 0) {
      // Finished deleting — move to next title
      deleting   = false;
      titleIdx   = (titleIdx + 1) % titles.length;
      delay      = 400;
    }

    timer = setTimeout(type, delay);
  }

  // Small delay before starting so the page loads first
  setTimeout(type, 600);
})();


/* ──────────────────────────────────────
   3. NAVIGATION: Scroll spy + glassmorphism
   ────────────────────────────────────── */

(function initNavScroll() {
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Glassmorphism intensifies when page is scrolled
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Active link highlighting via IntersectionObserver
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-35% 0px -60% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));
})();


/* ──────────────────────────────────────
   4. HAMBURGER MOBILE MENU
   ────────────────────────────────────── */

(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  });

  // Close when a link is clicked
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });
})();


/* ──────────────────────────────────────
   5. EXPERIENCE TABS
   ────────────────────────────────────── */

(function initExpTabs() {
  const tabs  = document.querySelectorAll('.exp-tab');
  const items = document.querySelectorAll('.exp-item');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      items.forEach(i => i.classList.remove('active'));

      // Activate clicked
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
})();


/* ──────────────────────────────────────
   6. PROJECT FILTER TABS
   ────────────────────────────────────── */

(function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.proj-filter-btn');
  const projCards  = document.querySelectorAll('.proj-card');

  if (!filterBtns.length) return;

  // Initialise: show only "featured", hide "ongoing"
  projCards.forEach(card => {
    if (card.dataset.category !== 'featured') {
      card.style.display = 'none';
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projCards.forEach(card => {
        if (card.dataset.category === filter) {
          card.style.display = 'flex';
          // Retrigger reveal animation
          card.classList.remove('visible');
          void card.offsetWidth; // reflow
          card.classList.add('visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();


/* ──────────────────────────────────────
   7. SCROLL REVEAL (IntersectionObserver)
   ────────────────────────────────────── */

(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));
})();
