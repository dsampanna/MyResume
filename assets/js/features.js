// ============================================================
// 1. SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position:fixed;top:0;left:0;height:3px;width:0%;
    background:linear-gradient(90deg,#f5c518,#0563bb,#f5c518);
    background-size:200% 100%;
    z-index:99999;pointer-events:none;
    animation:progressShimmer 2s linear infinite;
    transition:width 0.1s ease;
  `;
  document.head.insertAdjacentHTML('beforeend',
    '<style>@keyframes progressShimmer{0%{background-position:0% 0%}100%{background-position:200% 0%}}</style>'
  );
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.min(100, (scrollTop / docHeight) * 100) + '%';
  });
}

// ============================================================
// 2. TILT EFFECT ON PORTFOLIO CARDS
// ============================================================
function initTiltEffect() {
  function applyTilt(cards) {
    cards.forEach(card => {
      if (card.dataset.tiltInit) return;
      card.dataset.tiltInit = '1';
      card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
      card.style.willChange = 'transform';
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        const rx = -(y / r.height) * 12;
        const ry = (x / r.width) * 12;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
        card.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5}px 30px rgba(5,99,187,0.2)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = '';
      });
    });
  }
  applyTilt(document.querySelectorAll('.portfolio-wrap'));
  const obs = new MutationObserver(() => applyTilt(document.querySelectorAll('.portfolio-wrap')));
  const container = document.querySelector('.portfolio-container');
  if (container) obs.observe(container, { childList: true, subtree: true });
}

// ============================================================
// 3. PARTICLE / STAR BACKGROUND ON HERO
// ============================================================
function initParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  hero.style.position = 'relative';
  hero.insertBefore(canvas, hero.firstChild);
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = hero.offsetWidth; H = canvas.height = hero.offsetHeight; }
  function mkP() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.6 ? '#f5c518' : '#ffffff'
    };
  }
  resize();
  for (let i = 0; i < 120; i++) particles.push(mkP());
  window.addEventListener('resize', resize);
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
}

// ============================================================
// 4. PROJECT COUNTER
// ============================================================
function initProjectCounter() {
  const section = document.getElementById('portfolio');
  if (!section) return;
  const counter = document.createElement('div');
  counter.id = 'project-counter';
  counter.style.cssText = `
    text-align:center;margin-bottom:20px;font-size:13px;
    color:#6b7a99;font-family:'Syne',sans-serif;font-weight:600;letter-spacing:0.5px;
  `;
  const grid = section.querySelector('.portfolio-container');
  if (grid) grid.before(counter);
  function updateCount() {
    const all = section.querySelectorAll('.portfolio-item');
    const active = section.querySelector('#portfolio-flters .filter-active');
    const filter = active ? active.textContent.trim() : 'All';
    let count;
    if (filter === 'All') {
      count = all.length;
    } else {
      count = section.querySelectorAll('.portfolio-item:not(.isotope-hidden)').length;
    }
    counter.textContent = `Showing ${count} project${count !== 1 ? 's' : ''}${filter !== 'All' ? ' in ' + filter : ''}`;
  }
  updateCount();
  document.querySelectorAll('#portfolio-flters li').forEach(li => {
    li.addEventListener('click', () => setTimeout(updateCount, 600));
  });
}

// ============================================================
// 5. SKILL RADAR CHART
// ============================================================
function initSkillRadar() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const skills = [
    { label: 'UI/UX', value: 75 },
    { label: 'Illustrator', value: 80 },
    { label: 'After Effects', value: 50 },
    { label: 'Photoshop', value: 65 },
    { label: 'Video Edit', value: 50 },
    { label: 'HTML/CSS', value: 45 },
    { label: '3D (Maya)', value: 40 },
    { label: 'Sound', value: 40 },
    { label: 'InDesign', value: 50 },
    { label: 'Animation', value: 25 },
  ];
  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:40px;text-align:center;';
  wrap.innerHTML = `
    <div style="font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:#0563bb;
      text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;">Skill Overview</div>
    <canvas id="radarCanvas" width="420" height="380" style="max-width:100%;"></canvas>
  `;
  skillsSection.querySelector('.container').appendChild(wrap);

  function drawRadar(progress) {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.34;
    const n = skills.length;
    const step = (Math.PI * 2) / n;
    ctx.clearRect(0, 0, W, H);
    for (let ring = 1; ring <= 5; ring++) {
      const rr = (R * ring) / 5;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = i * step - Math.PI / 2;
        i === 0 ? ctx.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a))
                : ctx.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(5,99,187,0.12)'; ctx.lineWidth = 1; ctx.stroke();
    }
    skills.forEach((_, i) => {
      const a = i * step - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(5,99,187,0.1)'; ctx.lineWidth = 1; ctx.stroke();
    });
    ctx.beginPath();
    skills.forEach((s, i) => {
      const a = i * step - Math.PI / 2;
      const val = (s.value / 100) * R * progress;
      i === 0 ? ctx.moveTo(cx + val * Math.cos(a), cy + val * Math.sin(a))
              : ctx.lineTo(cx + val * Math.cos(a), cy + val * Math.sin(a));
    });
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(245,197,24,0.5)');
    grad.addColorStop(1, 'rgba(5,99,187,0.25)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#0563bb'; ctx.lineWidth = 2; ctx.stroke();
    skills.forEach((s, i) => {
      const a = i * step - Math.PI / 2;
      const val = (s.value / 100) * R * progress;
      const x = cx + val * Math.cos(a), y = cy + val * Math.sin(a);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f5c518'; ctx.fill();
      ctx.strokeStyle = '#0563bb'; ctx.lineWidth = 1.5; ctx.stroke();
    });
    if (progress >= 0.9) {
      ctx.font = 'bold 11px Syne, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      skills.forEach((s, i) => {
        const a = i * step - Math.PI / 2;
        const labelR = R + 28;
        ctx.fillStyle = '#1a1f2e';
        ctx.fillText(s.label, cx + labelR * Math.cos(a), cy + labelR * Math.sin(a));
      });
    }
  }

  let animated = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      let start = null;
      (function animate(ts) {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / 1200);
        drawRadar(p);
        if (p < 1) requestAnimationFrame(animate);
      })(performance.now());
    }
  }, { threshold: 0.3 }).observe(wrap);

  drawRadar(0);
}

// ============================================================
// 6. NEPAL MAP PIN — VISIBLE & PROMINENT
// ============================================================
function initNepalMap() {
  const about = document.getElementById('about');
  if (!about) return;
  const gsInfo = about.querySelector('.gs-info-grid');
  if (!gsInfo) return;

  document.head.insertAdjacentHTML('beforeend', `<style>
    #nepal-map-wrap {
      margin-top:20px;
      background: linear-gradient(135deg,#f0f6ff,#e8f4ea);
      border-radius:16px;
      border:1px solid #d0e4f5;
      padding:16px;
      overflow:hidden;
    }
    #nepal-map-wrap .map-label {
      font-size:11px;font-weight:700;color:#0563bb;
      text-transform:uppercase;letter-spacing:1.5px;
      margin-bottom:12px;font-family:'Syne',sans-serif;
      display:flex;align-items:center;gap:6px;
    }
    #nepal-map-inner {
      position:relative;height:140px;
      background:linear-gradient(160deg,#cce8f4 0%,#d4ecd0 60%,#f0e8d0 100%);
      border-radius:10px;overflow:hidden;
    }
    .map-mountains {
      position:absolute;bottom:30px;left:0;right:0;
      display:flex;align-items:flex-end;justify-content:center;gap:0;
    }
    .map-peak {
      width:0;height:0;
      border-left:solid transparent;
      border-right:solid transparent;
      border-bottom:solid;
      opacity:0.25;
    }
    .map-ground {
      position:absolute;bottom:0;left:0;right:0;height:30px;
      background:linear-gradient(to top,#8bc34a55,transparent);
    }
    .map-pin-wrap {
      position:absolute;top:35%;left:55%;
      transform:translate(-50%,-50%);
      display:flex;flex-direction:column;align-items:center;
      z-index:10;
    }
    .map-pin-pulse {
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      width:48px;height:48px;border-radius:50%;
      border:2px solid #f5c518;
      animation:mapPulse 1.6s ease-out infinite;
    }
    .map-pin-pulse2 {
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      width:28px;height:28px;border-radius:50%;
      border:2px solid rgba(245,197,24,0.6);
      animation:mapPulse 1.6s ease-out infinite 0.4s;
    }
    .map-pin-emoji {
      font-size:30px;position:relative;z-index:2;
      filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));
      animation:pinBounce 2s ease-in-out infinite;
    }
    .map-city-label {
      margin-top:4px;
      background:rgba(5,99,187,0.9);color:#fff;
      font-size:10px;font-weight:700;font-family:'Syne',sans-serif;
      padding:3px 10px;border-radius:50px;white-space:nowrap;
      box-shadow:0 2px 8px rgba(5,99,187,0.4);
    }
    .map-country-label {
      position:absolute;bottom:8px;left:12px;
      font-size:11px;font-weight:700;color:rgba(44,62,80,0.6);
      font-family:'Syne',sans-serif;letter-spacing:1px;
    }
    .map-flag {
      position:absolute;top:10px;right:12px;font-size:18px;
    }
    @keyframes mapPulse {
      0%{transform:translate(-50%,-50%) scale(0.4);opacity:1;}
      100%{transform:translate(-50%,-50%) scale(1.8);opacity:0;}
    }
    @keyframes pinBounce {
      0%,100%{transform:translateY(0);}
      50%{transform:translateY(-6px);}
    }
  </style>`);

  const mapWrap = document.createElement('div');
  mapWrap.id = 'nepal-map-wrap';
  mapWrap.innerHTML = `
    <div class="map-label">📍 My Location</div>
    <div id="nepal-map-inner">
      <!-- Mountains decoration -->
      <div class="map-mountains">
        <div class="map-peak" style="border-left-width:28px;border-right-width:28px;border-bottom-width:55px;border-bottom-color:#90a4ae;margin-right:-8px;"></div>
        <div class="map-peak" style="border-left-width:38px;border-right-width:38px;border-bottom-width:75px;border-bottom-color:#78909c;"></div>
        <div class="map-peak" style="border-left-width:32px;border-right-width:32px;border-bottom-width:60px;border-bottom-color:#90a4ae;margin-left:-8px;"></div>
        <div class="map-peak" style="border-left-width:22px;border-right-width:22px;border-bottom-width:45px;border-bottom-color:#b0bec5;margin-left:10px;"></div>
      </div>
      <div class="map-ground"></div>

      <!-- Animated Pin -->
      <div class="map-pin-wrap">
        <div class="map-pin-pulse"></div>
        <div class="map-pin-pulse2"></div>
        <div class="map-pin-emoji">📍</div>
        <div class="map-city-label">Bhaktapur</div>
      </div>

      <div class="map-country-label">NEPAL 🏔️</div>
      <div class="map-flag">🇳🇵</div>
    </div>
  `;

  gsInfo.after(mapWrap);
}

// ============================================================
// 7. BUILT WITH BADGE STRIP
// ============================================================
function initBuiltWith() {
  const portfolio = document.getElementById('portfolio');
  if (!portfolio) return;
  const tools = [
    { name:'Figma', color:'#F24E1E', icon:'🎨' },
    { name:'After Effects', color:'#9999FF', icon:'🎬' },
    { name:'Illustrator', color:'#FF9A00', icon:'✏️' },
    { name:'Photoshop', color:'#31A8FF', icon:'🖼️' },
    { name:'Premiere Pro', color:'#9999FF', icon:'🎞️' },
    { name:'Blender', color:'#E87D0D', icon:'🧊' },
    { name:'Audition', color:'#00E4BB', icon:'🎵' },
    { name:'HTML/CSS', color:'#E34F26', icon:'💻' },
  ];
  const strip = document.createElement('div');
  strip.id = 'built-with';
  strip.innerHTML = `
    <div style="font-size:11px;font-weight:700;color:#6b7a99;text-transform:uppercase;
      letter-spacing:1.5px;text-align:center;margin-bottom:16px;font-family:'Syne',sans-serif;">
      Tools I Work With
    </div>
    <div class="bw-badges">
      ${tools.map(t => `
        <div class="bw-badge" style="--bc:${t.color}">
          <span>${t.icon}</span><span class="bw-name">${t.name}</span>
        </div>`).join('')}
    </div>
  `;
  document.head.insertAdjacentHTML('beforeend', `<style>
    #built-with{padding:30px 0 0;}
    .bw-badges{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
    .bw-badge{
      display:inline-flex;align-items:center;gap:7px;padding:8px 16px;
      border-radius:50px;background:rgba(255,255,255,0.9);
      border:1px solid rgba(0,0,0,0.08);box-shadow:0 2px 10px rgba(0,0,0,0.06);
      font-size:13px;font-weight:600;color:#1a1f2e;font-family:'Syne',sans-serif;
      transition:all 0.3s ease;cursor:default;
    }
    .bw-badge:hover{
      transform:translateY(-3px) scale(1.05);
      box-shadow:0 6px 20px rgba(0,0,0,0.12);
      border-color:var(--bc);color:var(--bc);
    }
  </style>`);
  const container = portfolio.querySelector('.container');
  if (container) container.appendChild(strip);
}

// ============================================================
// 8. DAY/NIGHT AWARE GREETING
// ============================================================
function initGreeting() {
  const heroH1 = document.querySelector('#hero h1');
  if (!heroH1) return;
  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5 && hour < 12) greeting = '🌅 Good Morning';
  else if (hour >= 12 && hour < 17) greeting = '☀️ Good Afternoon';
  else if (hour >= 17 && hour < 21) greeting = '🌆 Good Evening';
  else greeting = '🌙 Good Night';
  const greetDiv = document.createElement('div');
  greetDiv.textContent = greeting;
  greetDiv.style.cssText = `
    font-size:13px;font-weight:600;color:rgba(255,255,255,0.7);
    letter-spacing:1px;margin-bottom:12px;font-family:'Syne',sans-serif;
    animation:fadeSlideIn 1s ease forwards;opacity:0;
  `;
  document.head.insertAdjacentHTML('beforeend',
    '<style>@keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}</style>'
  );
  heroH1.before(greetDiv);
}

// ============================================================
// 9. EASTER EGG — Konami Code
// ============================================================
function initEasterEgg() {
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === konami[pos]) { pos++; if (pos === konami.length) { pos = 0; triggerConfetti(); } }
    else pos = 0;
  });
  function triggerConfetti() {
    const colors = ['#f5c518','#0563bb','#ff6b6b','#51cf66','#cc5de8','#ff922b'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999999;overflow:hidden;';
    document.body.appendChild(container);
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      background:rgba(10,10,20,0.95);color:#fff;padding:20px 36px;
      border-radius:16px;font-family:'Syne',sans-serif;font-size:18px;font-weight:800;
      z-index:9999999;text-align:center;border:2px solid #f5c518;
      box-shadow:0 20px 60px rgba(0,0,0,0.5);
    `;
    toast.innerHTML = '🎉 You found the Easter Egg!<br><span style="font-size:13px;font-weight:400;opacity:0.7;">↑↑↓↓←→←→BA</span>';
    document.body.appendChild(toast);
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const c = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        c.style.cssText = `
          position:absolute;top:-20px;left:${Math.random() * window.innerWidth}px;
          width:${size}px;height:${size}px;background:${color};
          border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
          animation:confettiFall ${Math.random() * 2 + 2}s ease-in forwards;
        `;
        container.appendChild(c);
      }, i * 10);
    }
    document.head.insertAdjacentHTML('beforeend', `<style>
      @keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(${window.innerHeight+50}px) rotate(720deg);opacity:0;}}
    </style>`);
    setTimeout(() => { container.remove(); toast.remove(); }, 4000);
  }
}

// ============================================================
// 10. CURSOR TRAIL
// ============================================================
function initCursorTrail() {
  const trails = [];
  const MAX = 12;
  for (let i = 0; i < MAX; i++) {
    const t = document.createElement('div');
    const size = Math.max(3, 8 - i * 0.5);
    t.style.cssText = `
      position:fixed;pointer-events:none;z-index:99990;
      width:${size}px;height:${size}px;border-radius:50%;
      background:#f5c518;opacity:0;transform:translate(-50%,-50%);
    `;
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
  }
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    let px = mx, py = my;
    trails.forEach((t, i) => {
      const prev = trails[i - 1];
      if (prev) { px = prev.x; py = prev.y; }
      t.x += (px - t.x) * 0.35;
      t.y += (py - t.y) * 0.35;
      t.el.style.left = t.x + 'px';
      t.el.style.top = t.y + 'px';
      t.el.style.opacity = (1 - i / MAX) * 0.5;
    });
    requestAnimationFrame(loop);
  })();
}

// ============================================================
// 11. NEPAL TIME CLOCK — YELLOW, SMALL, INSIDE CONTACT
// ============================================================
function initNepalClock() {
  const contact = document.getElementById('contact');
  if (!contact) return;

  // Inject styles scoped to the clock only
  document.head.insertAdjacentHTML('beforeend', `<style>
    #nepal-clock {
      display:block;
      text-align:center;
      margin:16px auto 24px;
      position:static !important;
      width:100%;
    }
    #nepal-clock-inner {
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:10px 18px;
      background:rgba(245,197,24,0.08);
      border:1px solid rgba(245,197,24,0.35);
      border-radius:50px;
      box-shadow:0 3px 14px rgba(245,197,24,0.1);
    }
    #nepal-time {
      font-size:17px !important;
      font-weight:800;
      color:#f5c518;
      font-family:'Syne',sans-serif;
      letter-spacing:1.5px;
      line-height:1;
    }
    .npt-label {
      font-size:9px;
      font-weight:700;
      color:#c8950a;
      text-transform:uppercase;
      letter-spacing:1.2px;
      font-family:'Syne',sans-serif;
      margin-bottom:3px;
    }
    #clock-status {
      font-size:10px !important;
      font-weight:700;
      padding:3px 9px !important;
      border-radius:50px;
      font-family:'Syne',sans-serif;
    }
  </style>`);

  const clockWrap = document.createElement('div');
  clockWrap.id = 'nepal-clock';
  clockWrap.innerHTML = `
    <div id="nepal-clock-inner">
      <span style="font-size:18px;">🇳🇵</span>
      <div>
        <div class="npt-label">Nepal Time · NPT UTC+5:45</div>
        <div id="nepal-time"></div>
      </div>
      <div id="clock-status"></div>
    </div>
  `;

  // Insert after section title inside contact
  const sectionTitle = contact.querySelector('.section-title');
  if (sectionTitle) {
    sectionTitle.after(clockWrap);
  } else {
    const container = contact.querySelector('.container');
    if (container) container.prepend(clockWrap);
  }

  function updateClock() {
    const el = document.getElementById('nepal-time');
    const st = document.getElementById('clock-status');
    if (!el || !st) return;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const nepal = new Date(utc + 5 * 3600000 + 45 * 60000);
    const h = nepal.getHours(), m = nepal.getMinutes(), s = nepal.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    el.textContent = `${h12.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')} ${ampm}`;
    if (h >= 9 && h < 18) {
      st.textContent = '🟢 Working';
      st.style.cssText = 'font-size:10px;font-weight:700;padding:3px 9px;border-radius:50px;font-family:Syne,sans-serif;background:rgba(39,174,96,0.15);color:#27ae60;border:1px solid rgba(39,174,96,0.3);';
    } else if (h >= 7 && h < 9) {
      st.textContent = '🌅 Morning';
      st.style.cssText = 'font-size:10px;font-weight:700;padding:3px 9px;border-radius:50px;font-family:Syne,sans-serif;background:rgba(245,197,24,0.15);color:#c8950a;border:1px solid rgba(245,197,24,0.3);';
    } else {
      st.textContent = '🌙 Off Hours';
      st.style.cssText = 'font-size:10px;font-weight:700;padding:3px 9px;border-radius:50px;font-family:Syne,sans-serif;background:rgba(108,117,125,0.15);color:#6b7a99;border:1px solid rgba(108,117,125,0.3);';
    }
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  initScrollProgress();
  initTiltEffect();
  initParticles();
  initProjectCounter();
  initSkillRadar();
  initNepalMap();
  initBuiltWith();
  initGreeting();
  initEasterEgg();
  initCursorTrail();
  initNepalClock();
});