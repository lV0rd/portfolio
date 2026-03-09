const FEATURE_YOUTUBE_URL   = "https://www.youtube.com/watch?v=6HPO9YbsTrY";
const FEATURE_YOUTUBE_URL_2 = "https://www.youtube.com/watch?v=Lw4wYCMZ3bg";

function extractYouTubeID(url) {
  if (!url || typeof url !== 'string') return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
    /v=([A-Za-z0-9_-]{6,})/,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m && m[1]) return m[1];
  }
  try {
    const u = new URL(url);
    return u.searchParams.get('v');
  } catch (e) {}
  return null;
}

function setupLiteYouTube(containerId, url) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const id = extractYouTubeID(url);
  if (!id) {
    el.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#999;background:#000;">Invalid YouTube URL</div>';
    return;
  }
  el.style.position = "relative";
  el.style.cursor = "pointer";
  el.innerHTML = `
    <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
    <div style="
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      width:68px;height:48px;
      background:rgba(0,0,0,0.6);
      border-radius:14%;
    ">
      <div style="
        position:absolute;left:26px;top:14px;
        width:0;height:0;
        border-left:18px solid white;
        border-top:10px solid transparent;
        border-bottom:10px solid transparent;
      "></div>
    </div>
  `;
  el.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    el.innerHTML = "";
    el.appendChild(iframe);
  });
}

function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  addEventListener('resize', resize);
  resize();

  function createParticles(n = 80) {
    particles = [];
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: 0.08 + Math.random() * 0.22
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,119,0,' + p.alpha + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }

  createParticles();
  draw();
}

function initNavAndScroll() {
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('main section, header.hero'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const id = ent.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.22 });

  sections.forEach(s => io.observe(s));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          try { target.focus({ preventScroll: true }); } catch (e) {}
        }, 600);
      }
    });
  });
}

function initFadeIn() {
  const elems = document.querySelectorAll('header.hero, section');
  elems.forEach((el, i) => setTimeout(() => el.classList.add('visible'), 100 * i));
}

function init() {
  setupLiteYouTube('featuredMedia', FEATURE_YOUTUBE_URL);
  setupLiteYouTube('featuredMedia2', FEATURE_YOUTUBE_URL_2);
  initParticles();
  initNavAndScroll();
  initFadeIn();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}