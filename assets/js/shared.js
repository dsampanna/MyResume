/* shared.js — Runs on every page of the site
   Contains: BTT · Page transitions · Features 11-17
   ─────────────────────────────────────────────── */

/* Guard: don't double-run if already loaded */
if(window.__sharedLoaded) { throw new Error('shared.js already loaded'); }
window.__sharedLoaded = true;


/* ── UNIVERSAL CUSTOM CURSOR ──
   Runs on every page. If main.js or inline code already created
   the cursor elements, the querySelector guard prevents duplication. */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;

  /* Inject cursor CSS once (case-study pages have no style.css / inline cursor CSS) */
  if(!document.getElementById('sharedCursorCSS')){
    var cs = document.createElement('style');
    cs.id = 'sharedCursorCSS';
    cs.textContent =
      '@media(pointer:fine){body{cursor:none}a,button,[role="button"],[data-cursor]{cursor:none}}' +
      '.cursor-dot{position:fixed;top:0;left:0;width:6px;height:6px;background:#0EB5A0;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:background 0.15s,transform 0.15s;will-change:transform}' +
      '.cursor-ring{position:fixed;top:0;left:0;width:32px;height:32px;border:1.5px solid rgba(14,181,160,0.6);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s,border-color 0.2s,background 0.2s,opacity 0.2s;will-change:transform}' +
      '.cursor-dot.is-hover{background:#0EB5A0;transform:translate(-50%,-50%) scale(1.8)}' +
      '.cursor-ring.is-hover{width:44px;height:44px;border-color:#0EB5A0;background:rgba(14,181,160,0.08)}' +
      '.cursor-dot.is-hidden,.cursor-ring.is-hidden{opacity:0}';
    document.head.appendChild(cs);
  }

  /* Create cursor elements only if not already in DOM */
  if(document.querySelector('.cursor-dot')) return;

  var dot  = document.createElement('div'); dot.className  = 'cursor-dot';
  var ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mx=0,my=0,rx=0,ry=0;
  document.addEventListener('pointermove',function(e){
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
    var isLink=e.target.closest('a,button,[role="button"]');
    dot.classList.toggle('is-hover',!!isLink);
    ring.classList.toggle('is-hover',!!isLink);
  });
  (function tick(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick);})();
  document.addEventListener('mouseleave',function(){dot.classList.add('is-hidden');ring.classList.add('is-hidden');});
  document.addEventListener('mouseenter',function(){dot.classList.remove('is-hidden');ring.classList.remove('is-hidden');});
})();


/* ── PAGE TRANSITION ── */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    '@keyframes pageIn{from{opacity:0}to{opacity:1}}',
    'body{animation:pageIn 0.3s ease both}',
    'body.page-out{opacity:0!important;transform:translateY(-4px)!important;transition:opacity 0.22s ease,transform 0.22s ease!important}',
  ].join('');
  document.head.appendChild(s);

  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href]');
    if(!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var href = a.getAttribute('href');
    if(!href) return;
    /* Skip: external, mailto, tel, hash-only, download, new-tab */
    if(href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') ||
       href.startsWith('#') || a.hasAttribute('download') || a.target === '_blank') return;
    e.preventDefault();
    document.body.classList.add('page-out');
    setTimeout(function(){ window.location.href = href; }, 230);
  });
})();


/* ── BACK TO TOP (styles + button) ── */
(function(){
  /* Inject CSS so it works on pages that don't load style.css */
  if(!document.getElementById('bttStyle')){
    var s = document.createElement('style');
    s.id = 'bttStyle';
    s.textContent = [
      '#btt{position:fixed;bottom:5.8rem;right:4rem;width:40px;height:40px;',
      'background:#0EB5A0;color:#080c10;border:none;font-size:1.1rem;font-weight:700;',
      'cursor:pointer;z-index:99996;opacity:0;transform:translateY(12px);',
      'transition:opacity 0.3s,transform 0.3s,background 0.2s;pointer-events:none;',
      'display:flex;align-items:center;justify-content:center}',
      '#btt.visible{opacity:1;transform:translateY(0);pointer-events:auto}',
      '#btt:hover{background:#0cc9b2}',
      '@media(max-width:480px){#btt{bottom:5.5rem;right:3rem;width:36px;height:36px;font-size:1rem}}',
    ].join('');
    document.head.appendChild(s);
  }

  var btn = document.getElementById('btt');
  if(!btn){
    btn = document.createElement('button');
    btn.id = 'btt';
    btn.setAttribute('aria-label','Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
  }
  window.addEventListener('scroll', function(){
    btn.classList.toggle('visible', window.scrollY > 400);
  }, {passive:true});
  btn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 11 — KONAMI CODE EASTER EGG
   ↑ ↑ ↓ ↓ ← → ← → B A
   ══════════════════════════════════════════════════ */
(function(){
  var CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var pos = 0;

  var s = document.createElement('style');
  s.textContent = [
    '.konami-overlay{position:fixed;inset:0;z-index:999999;background:rgba(8,12,16,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.4s}',
    '.konami-overlay.show{opacity:1;pointer-events:auto}',
    '.konami-inner{text-align:center;padding:2rem;max-width:520px}',
    '.konami-code{font-family:monospace;font-size:0.7rem;color:rgba(14,181,160,0.5);letter-spacing:0.2em;margin-bottom:1.5rem;text-transform:uppercase}',
    '.konami-emoji{font-size:4rem;margin-bottom:1rem;display:block;animation:konamiBob 1.2s ease-in-out infinite}',
    '@keyframes konamiBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}',
    '.konami-title{font-family:\'Syne\',sans-serif;font-size:clamp(1.4rem,4vw,2.2rem);font-weight:800;color:#f0f4f8;letter-spacing:-0.03em;margin-bottom:0.75rem}',
    '.konami-sub{font-size:0.9rem;color:#6b7c8f;line-height:1.7;margin-bottom:2rem;font-weight:300}',
    '.konami-close{font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border:1px solid rgba(14,181,160,0.35);color:#0EB5A0;background:none;padding:0.6rem 1.5rem;cursor:pointer;transition:background 0.2s,color 0.2s;font-family:\'Syne\',sans-serif}',
    '.konami-close:hover{background:#0EB5A0;color:#080c10}',
    '.konami-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}',
  ].join('');
  document.head.appendChild(s);

  var overlay = document.createElement('div');
  overlay.className = 'konami-overlay';
  overlay.innerHTML = [
    '<div class="konami-stars" id="konamiStars"></div>',
    '<div class="konami-inner">',
      '<div class="konami-code">↑ ↑ ↓ ↓ ← → ← → B A — Unlocked</div>',
      '<span class="konami-emoji">🎮</span>',
      '<div class="konami-title">You found the easter egg.</div>',
      '<p class="konami-sub">Not many people bother to type the Konami code on a portfolio site.<br>That makes you either a developer, a designer, or dangerously curious.<br><strong style="color:#f0f4f8">I\'d hire any of those.</strong></p>',
      '<button class="konami-close" id="konamiClose">← Back to portfolio</button>',
    '</div>',
  ].join('');
  document.body.appendChild(overlay);

  var starsEl = document.getElementById('konamiStars');
  for(var si = 0; si < 60; si++){
    var star = document.createElement('div');
    var size = Math.random() * 3 + 1;
    star.style.cssText = 'position:absolute;border-radius:50%;background:#0EB5A0;width:'+size+'px;height:'+size+'px;'
      +'left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;'
      +'opacity:'+(Math.random()*0.4+0.1)+';'
      +'animation:twinkle '+(2+Math.random()*3)+'s '+(Math.random()*2)+'s infinite alternate';
    starsEl.appendChild(star);
  }

  document.getElementById('konamiClose').addEventListener('click', function(){
    overlay.classList.remove('show'); pos = 0;
  });
  overlay.addEventListener('click', function(e){ if(e.target === overlay){ overlay.classList.remove('show'); pos = 0; } });

  document.addEventListener('keydown', function(e){
    if(overlay.classList.contains('show') && e.key === 'Escape'){ overlay.classList.remove('show'); pos = 0; return; }
    if(e.key === CODE[pos]){ pos++; } else { pos = (e.key === CODE[0]) ? 1 : 0; }
    if(pos === CODE.length){ overlay.classList.add('show'); pos = 0; }
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 12 — TAB TITLE TAUNT
   ══════════════════════════════════════════════════ */
(function(){
  var original = document.title;
  var taunts = ['👋 Miss me already?','🎨 Still designing here…','✦ Come back!','📐 Work in progress…'];
  var ti = 0;
  document.addEventListener('visibilitychange', function(){
    document.title = document.hidden ? taunts[ti++ % taunts.length] : original;
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 13 — COPY TOAST
   ══════════════════════════════════════════════════ */
(function(){
  var s = document.createElement('style');
  s.textContent = '.copy-toast{position:fixed;bottom:5rem;left:50%;transform:translateX(-50%) translateY(12px);background:#0d1117;border:1px solid rgba(14,181,160,0.35);color:#f0f4f8;font-size:0.72rem;font-weight:600;letter-spacing:0.06em;padding:0.55rem 1.25rem;z-index:99997;opacity:0;transition:opacity 0.25s,transform 0.25s;pointer-events:none;white-space:nowrap;font-family:\'DM Sans\',sans-serif}.copy-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
  document.head.appendChild(s);
  var toast = document.createElement('div');
  toast.className = 'copy-toast';
  document.body.appendChild(toast);
  var hideTimer, mi = 0;
  var msgs = ['✦ Copied — don\'t forget to credit me 😄','📋 Got it — inspiration shared responsibly?','✦ Copied — ideas spread, credit sticks.','📐 Copied — use it well!'];
  document.addEventListener('copy', function(){
    clearTimeout(hideTimer);
    toast.textContent = msgs[mi++ % msgs.length];
    toast.classList.add('show');
    hideTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2800);
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 14 — CUSTOM RIGHT-CLICK CONTEXT MENU
   ══════════════════════════════════════════════════ */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    '.ctx-menu{position:fixed;z-index:999998;background:#0d1117;border:1px solid rgba(14,181,160,0.2);min-width:200px;padding:0.35rem 0;opacity:0;transform:scale(0.95);transform-origin:top left;transition:opacity 0.15s,transform 0.15s;pointer-events:none;box-shadow:0 12px 40px rgba(0,0,0,0.5)}',
    '.ctx-menu.open{opacity:1;transform:scale(1);pointer-events:auto}',
    '.ctx-header{padding:0.45rem 1rem 0.35rem;font-size:0.6rem;font-weight:700;color:rgba(14,181,160,0.6);letter-spacing:0.12em;text-transform:uppercase;font-family:\'Syne\',sans-serif;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:0.25rem}',
    '.ctx-item{display:flex;align-items:center;gap:0.65rem;padding:0.45rem 1rem;font-size:0.78rem;color:#9ca3af;cursor:pointer;transition:background 0.12s,color 0.12s;font-family:\'DM Sans\',sans-serif}',
    '.ctx-item:hover{background:rgba(14,181,160,0.08);color:#f0f4f8}',
    '.ctx-icon{font-size:0.9rem;width:1.1rem;text-align:center;flex-shrink:0}',
    '.ctx-sep{height:1px;background:rgba(255,255,255,0.06);margin:0.25rem 0}',
  ].join('');
  document.head.appendChild(s);

  var menu = document.createElement('div');
  menu.className = 'ctx-menu';
  menu.innerHTML = [
    '<div class="ctx-header">Sampanna Raj Dhungel</div>',
    '<div class="ctx-item" data-go="index.html#contact"><span class="ctx-icon">✉</span>Hire me</div>',
    '<div class="ctx-item" data-go="portfolio.html"><span class="ctx-icon">◼</span>View portfolio</div>',
    '<div class="ctx-item" data-dl="assets/files/SampannaRajDhungel_R%C3%A9sum%C3%A9.pdf"><span class="ctx-icon">↓</span>Download résumé</div>',
    '<div class="ctx-sep"></div>',
    '<div class="ctx-item" data-ext="https://www.linkedin.com/in/dsampanna/"><span class="ctx-icon">in</span>LinkedIn</div>',
    '<div class="ctx-item" data-ext="https://www.instagram.com/__sampannaad/"><span class="ctx-icon">ig</span>Instagram</div>',
    '<div class="ctx-sep"></div>',
    '<div class="ctx-item" id="ctxClose2"><span class="ctx-icon">✕</span>Close menu</div>',
  ].join('');
  document.body.appendChild(menu);

  function show(x,y){ menu.style.left=Math.min(x,window.innerWidth-220)+'px'; menu.style.top=Math.min(y,window.innerHeight-240)+'px'; menu.classList.add('open'); }
  function hide(){ menu.classList.remove('open'); }
  function navigate(url){ hide(); setTimeout(function(){ window.location.href=url; },160); }

  document.addEventListener('contextmenu',function(e){ e.preventDefault(); show(e.clientX,e.clientY); });
  document.addEventListener('click',function(e){ if(!menu.contains(e.target)) hide(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') hide(); });
  document.getElementById('ctxClose2').addEventListener('click',hide);
  menu.addEventListener('click',function(e){
    var item=e.target.closest('[data-go],[data-ext],[data-dl]');
    if(!item) return;
    if(item.dataset.go){ navigate(item.dataset.go); }
    else if(item.dataset.ext){ hide(); setTimeout(function(){ window.open(item.dataset.ext,'_blank','noopener'); },160); }
    else if(item.dataset.dl){ hide(); var a=document.createElement('a'); a.href=item.dataset.dl; a.download=''; a.click(); }
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 15 — "?" SHORTCUT MAP OVERLAY
   ══════════════════════════════════════════════════ */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    '.smap-overlay{position:fixed;inset:0;background:rgba(8,12,16,0.92);z-index:999999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.25s;backdrop-filter:blur(10px)}',
    '.smap-overlay.open{opacity:1;pointer-events:auto}',
    '.smap-box{background:#0d1117;border:1px solid rgba(14,181,160,0.2);max-width:540px;width:92%;padding:2rem 2.25rem;position:relative;max-height:88vh;overflow-y:auto}',
    '.smap-close{position:absolute;top:0.85rem;right:1rem;background:none;border:none;color:#6b7c8f;font-size:1rem;cursor:pointer;line-height:1;transition:color 0.2s}.smap-close:hover{color:#f0f4f8}',
    '.smap-title{font-family:\'Syne\',sans-serif;font-size:1rem;font-weight:800;color:#f0f4f8;letter-spacing:-0.01em;margin-bottom:0.25rem}',
    '.smap-sub{font-size:0.7rem;color:#6b7c8f;margin-bottom:1.5rem;letter-spacing:0.04em}',
    '.smap-row{display:flex;align-items:flex-start;gap:1rem;padding:0.65rem 0;border-bottom:1px solid rgba(255,255,255,0.05)}',
    '.smap-row:last-child{border-bottom:none}',
    '.smap-kbd{flex-shrink:0;display:flex;gap:0.3rem;flex-wrap:wrap;min-width:120px}',
    '.smap-key{display:inline-block;background:#111820;border:1px solid rgba(255,255,255,0.12);border-radius:3px;font-size:0.64rem;font-weight:700;color:#9ca3af;padding:0.2rem 0.45rem;letter-spacing:0.04em;font-family:\'DM Sans\',monospace;line-height:1.4}',
    '.smap-desc{font-size:0.76rem;color:#9ca3af;line-height:1.5}',
    '.smap-desc strong{color:#f0f4f8;font-weight:600}',
    '.smap-section{font-size:0.58rem;font-weight:700;color:rgba(14,181,160,0.6);letter-spacing:0.12em;text-transform:uppercase;margin:1.1rem 0 0.4rem;font-family:\'Syne\',sans-serif}',
  ].join('');
  document.head.appendChild(s);

  var shortcuts = [
    {section:'Navigation'},
    {keys:['?'],desc:'<strong>Show this map</strong> — list of all hidden interactions'},
    {keys:['Ctrl','K'],desc:'<strong>Command palette</strong> — jump anywhere on the site'},
    {keys:['Esc'],desc:'Close any open overlay or menu'},
    {section:'Easter Eggs'},
    {keys:['↑','↑','↓','↓','←','→','←','→','B','A'],desc:'<strong>Konami code</strong> — unlock the starfield'},
    {keys:['Right-click'],desc:'<strong>Context menu</strong> — branded quick links'},
    {keys:['Source code'],desc:'<strong>3-page puzzle</strong> — clue trail hidden in HTML comments'},
    {section:'Design Tools'},
    {keys:['D'],desc:'<strong>Design mode</strong> — 12-column grid + 8px baseline overlay'},
    {keys:['G'],desc:'<strong>Break the grid</strong> — scatters layout, snaps back'},
    {keys:['B'],desc:'<strong>Color blindness</strong> — cycle through 5 vision modes'},
    {keys:['Alt','+ hover'],desc:'<strong>Blueprint mode</strong> — hover any image for wireframe filter'},
    {section:'Interactions'},
    {keys:['Tab'],desc:'<strong>Keyboard mode</strong> — beautiful custom focus rings activate'},
    {keys:['Ctrl','C'],desc:'<strong>Copy toast</strong> — cheeky message on every copy'},
    {keys:['Fast scroll'],desc:'<strong>Speed roast</strong> — scroll past work section too fast'},
    {section:'Ambient'},
    {keys:['Idle 5s'],desc:'<strong>Idle signature</strong> — watermark appears after inactivity'},
    {keys:['Move cursor'],desc:'<strong>Word trail</strong> — design words drift from your cursor'},
    {keys:['Rage-click'],desc:'<strong>Rage ripple</strong> — click fast to see what happens'},
    {keys:['Ghost cursors'],desc:'<strong>Visitors</strong> — other people browsing the site'},
    {keys:['Golden hour'],desc:'<strong>Sunrise/sunset</strong> — palette shifts at Bhaktapur golden hour'},
    {section:'Visual'},
    {keys:['Scroll'],desc:'<strong>Invisible ink</strong> — hidden message in the footer'},
    {keys:['Hover cards'],desc:'<strong>Colour dots</strong> — each card samples its own palette'},
    {keys:['Section shift'],desc:'<strong>Cursor shape</strong> — ring changes label per section'},
    {keys:['DevTools'],desc:'<strong>Console message</strong> — open DevTools to say hi'},
  ];

  var rows = shortcuts.map(function(item){
    if(item.section) return '<div class="smap-section">'+item.section+'</div>';
    var keys = item.keys.map(function(k){ return '<span class="smap-key">'+k+'</span>'; }).join('');
    return '<div class="smap-row"><div class="smap-kbd">'+keys+'</div><div class="smap-desc">'+item.desc+'</div></div>';
  }).join('');

  var overlay = document.createElement('div');
  overlay.className = 'smap-overlay';
  overlay.innerHTML = '<div class="smap-box"><button class="smap-close" aria-label="Close">✕</button><div class="smap-title">Hidden interactions</div><div class="smap-sub">Press <span style="border:1px solid rgba(14,181,160,0.4);padding:0 5px;font-family:monospace;font-size:0.65rem">?</span> anywhere to toggle this</div>'+rows+'</div>';
  document.body.appendChild(overlay);

  function openMap(){ overlay.classList.add('open'); }
  function closeMap(){ overlay.classList.remove('open'); }
  overlay.querySelector('.smap-close').addEventListener('click',closeMap);
  overlay.addEventListener('click',function(e){ if(e.target===overlay) closeMap(); });
  document.addEventListener('keydown',function(e){
    if(overlay.classList.contains('open') && e.key==='Escape'){ closeMap(); return; }
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    if(e.key==='?'){ e.preventDefault(); overlay.classList.contains('open')?closeMap():openMap(); }
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 16 — HIRE ME PULSE BADGE
   ══════════════════════════════════════════════════ */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    '@keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:0.5}}',
    '@keyframes badgeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    '.hire-badge{position:fixed;bottom:1.6rem;right:4rem;z-index:99995;display:flex;align-items:center;gap:0.55rem;background:rgba(13,17,23,0.92);border:1px solid rgba(14,181,160,0.3);padding:0.5rem 1rem 0.5rem 0.75rem;cursor:pointer;backdrop-filter:blur(10px);box-shadow:0 4px 24px rgba(0,0,0,0.4);animation:badgeIn 0.5s ease 1.5s both;transition:border-color 0.2s,box-shadow 0.2s;text-decoration:none;color:inherit}',
    '.hire-badge:hover{border-color:rgba(14,181,160,0.7);box-shadow:0 4px 32px rgba(14,181,160,0.15)}',
    '.hire-dot-wrap{position:relative;width:10px;height:10px;flex-shrink:0}',
    '.hire-dot{position:absolute;inset:0;border-radius:50%;background:#22c55e}',
    '.hire-dot-ring{position:absolute;inset:-3px;border-radius:50%;background:rgba(34,197,94,0.35);animation:pulseDot 1.8s ease-in-out infinite}',
    '.hire-badge-text{display:flex;flex-direction:column;line-height:1.2}',
    '.hire-badge-main{font-size:0.72rem;font-weight:700;color:#f0f4f8;letter-spacing:0.01em;font-family:\'DM Sans\',sans-serif}',
    '.hire-badge-sub{font-size:0.6rem;color:rgba(14,181,160,0.8);letter-spacing:0.04em;font-family:\'Syne\',sans-serif;text-transform:uppercase}',
    '@media(max-width:600px){.hire-badge{bottom:1rem;right:3rem;padding:0.4rem 0.8rem 0.4rem 0.6rem}}',
  ].join('');
  document.head.appendChild(s);

  var badge = document.createElement('a');
  badge.className = 'hire-badge';
  badge.href = '#contact';
  badge.setAttribute('aria-label','Available for work — contact Sampanna');
  badge.innerHTML = '<div class="hire-dot-wrap"><div class="hire-dot-ring"></div><div class="hire-dot"></div></div><div class="hire-badge-text"><span class="hire-badge-main">Available now</span><span class="hire-badge-sub">Open to work</span></div>';
  document.body.appendChild(badge);

  badge.addEventListener('click',function(e){
    e.preventDefault();
    var contact = document.getElementById('contact');
    if(contact){ contact.scrollIntoView({behavior:'smooth',block:'start'}); }
    else { window.location.href = 'index.html#contact'; }
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 17 — KEYBOARD-ONLY NAVIGATION MODE
   ══════════════════════════════════════════════════ */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    'body:not(.kb-nav) *:focus{outline:none}',
    'body.kb-nav a:focus-visible,body.kb-nav button:focus-visible,body.kb-nav [tabindex]:focus-visible,body.kb-nav input:focus-visible,body.kb-nav textarea:focus-visible,body.kb-nav select:focus-visible{outline:2px solid #0EB5A0;outline-offset:3px;box-shadow:0 0 0 4px rgba(14,181,160,0.18),0 0 12px rgba(14,181,160,0.15);border-radius:2px}',
    '.kb-mode-toast{position:fixed;top:1.25rem;left:50%;transform:translateX(-50%) translateY(-8px);background:#0d1117;border:1px solid rgba(14,181,160,0.3);color:#f0f4f8;font-size:0.68rem;font-weight:600;letter-spacing:0.06em;padding:0.45rem 1.1rem;z-index:99996;opacity:0;transition:opacity 0.25s,transform 0.25s;pointer-events:none;white-space:nowrap;font-family:\'DM Sans\',sans-serif}.kb-mode-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}',
  ].join('');
  document.head.appendChild(s);

  var toast = document.createElement('div');
  toast.className = 'kb-mode-toast';
  toast.innerHTML = '⌨ Keyboard navigation — Tab to move, Enter to activate';
  document.body.appendChild(toast);

  var toastTimer, kbActive = false;
  document.addEventListener('keydown',function(e){
    if(e.key==='Tab' && !kbActive){
      kbActive=true; document.body.classList.add('kb-nav');
      clearTimeout(toastTimer); toast.classList.add('show');
      toastTimer=setTimeout(function(){ toast.classList.remove('show'); },2500);
    }
  });
  document.addEventListener('mousedown',function(){
    if(kbActive){ kbActive=false; document.body.classList.remove('kb-nav'); toast.classList.remove('show'); }
  });
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GENERAL TOAST HELPER  (used by features 18-25)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function(){
  if(window.__gToast) return;
  var el, timer;
  function init(){
    if(el) return;
    var s=document.createElement('style');
    s.textContent='.g-toast{position:fixed;bottom:7.8rem;left:50%;transform:translateX(-50%) translateY(10px);background:#0d1117;border:1px solid rgba(14,181,160,0.35);color:#f0f4f8;font-size:0.72rem;font-weight:600;letter-spacing:0.06em;padding:0.55rem 1.4rem;z-index:999992;opacity:0;transition:opacity 0.25s,transform 0.25s;pointer-events:none;white-space:nowrap;font-family:\'DM Sans\',sans-serif;text-align:center}.g-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
    document.head.appendChild(s);
    el=document.createElement('div'); el.className='g-toast';
    document.body.appendChild(el);
  }
  window.__gToast=function(msg,dur){
    init(); clearTimeout(timer);
    el.textContent=msg; el.classList.add('show');
    timer=setTimeout(function(){ el.classList.remove('show'); }, dur||2400);
  };
})();


/* ══════════════════════════════════════════════════
   FEATURE 18 — GHOST CURSORS (simulated visitors)
   ══════════════════════════════════════════════════ */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  var personas=[
    {label:'Designer · 🇸🇬', color:'#a78bfa'},
    {label:'Studio · 🇩🇪',   color:'#fb923c'},
    {label:'Dev · 🇺🇸',      color:'#34d399'},
  ];
  var s=document.createElement('style');
  s.textContent=
    '.gc{position:fixed;pointer-events:none;z-index:99985;opacity:0;transition:opacity 0.6s ease}'+
    '.gc.on{opacity:0.9}'+
    '.gc-dot{position:absolute;width:10px;height:10px;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 0 3px rgba(255,255,255,0.15)}'+
    '.gc-tag{position:absolute;top:-20px;left:10px;font-size:0.58rem;font-weight:700;font-family:\'DM Sans\',sans-serif;white-space:nowrap;padding:2px 7px;letter-spacing:0.02em;border-radius:2px;color:#080c10}';
  document.head.appendChild(s);
  personas.forEach(function(p,i){
    var wrap=document.createElement('div'); wrap.className='gc';
    wrap.innerHTML='<div class="gc-dot" style="background:'+p.color+'"></div><div class="gc-tag" style="background:'+p.color+'">'+p.label+'</div>';
    document.body.appendChild(wrap);
    var cx=Math.random()*window.innerWidth, cy=Math.random()*window.innerHeight;
    var tx=cx, ty=cy;
    (function tick(){ cx+=(tx-cx)*0.055; cy+=(ty-cy)*0.055; wrap.style.left=cx+'px'; wrap.style.top=cy+'px'; requestAnimationFrame(tick); })();
    function newTarget(){ tx=80+Math.random()*(window.innerWidth-160); ty=80+Math.random()*(window.innerHeight-160); }
    function cycle(){
      var on=9000+Math.random()*14000, off=7000+Math.random()*12000;
      newTarget(); wrap.classList.add('on');
      var iv=setInterval(newTarget, 2500+Math.random()*2000);
      setTimeout(function(){ wrap.classList.remove('on'); clearInterval(iv); setTimeout(cycle,off); }, on);
    }
    setTimeout(cycle, i*4500+2000+Math.random()*2000);
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 19 — SCROLL SPEED ROAST
   ══════════════════════════════════════════════════ */
(function(){
  var lastY=window.scrollY, lastT=performance.now(), cooldown=false;
  window.addEventListener('scroll',function(){
    var now=performance.now(), dt=now-lastT;
    if(dt>0 && dt<200){
      var speed=Math.abs(window.scrollY-lastY)/dt*1000;
      if(speed>550 && !cooldown){
        var work=document.getElementById('work');
        if(work){
          var wTop=work.getBoundingClientRect().top+window.scrollY;
          if(lastY<wTop+120 && window.scrollY>wTop+60){
            cooldown=true;
            setTimeout(function(){ cooldown=false; }, 10000);
            window.__gToast('⚡ You just scrolled past 3 months of work in 0.3 seconds.', 3800);
          }
        }
      }
    }
    lastY=window.scrollY; lastT=now;
  },{passive:true});
})();


/* ══════════════════════════════════════════════════
   FEATURE 20 — BREAK THE GRID  [ G ]
   ══════════════════════════════════════════════════ */
(function(){
  var breaking=false;
  document.addEventListener('keydown',function(e){
    if((e.key!=='g'&&e.key!=='G')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    if(breaking) return;
    breaking=true;
    var els=Array.from(document.querySelectorAll('section,.hero,.marquee-wrap,footer'));
    els.forEach(function(el){
      var rx=(Math.random()-0.5)*7, tx=(Math.random()-0.5)*28, ty=(Math.random()-0.5)*18, sc=0.94+Math.random()*0.1;
      el.style.transition='transform 0.28s cubic-bezier(0.68,-0.55,0.265,1.55),filter 0.28s';
      el.style.transform='rotate('+rx+'deg) translate('+tx+'px,'+ty+'px) scale('+sc+')';
      el.style.filter='hue-rotate('+(Math.random()*30-15)+'deg)';
    });
    window.__gToast('💥 Grid broken — snapping back…', 1200);
    setTimeout(function(){
      els.forEach(function(el){
        el.style.transition='transform 0.55s cubic-bezier(0.34,1.56,0.64,1),filter 0.55s';
        el.style.transform=''; el.style.filter='';
      });
      setTimeout(function(){ breaking=false; els.forEach(function(el){ el.style.transition=''; }); }, 650);
    }, 1100);
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 21 — DESIGN MODE  [ D ]
   ══════════════════════════════════════════════════ */
(function(){
  var active=false, overlay, badge;
  function build(){
    if(overlay) return;
    var s=document.createElement('style');
    s.textContent=
      '.dm-ov{position:fixed;inset:0;pointer-events:none;z-index:99989;opacity:0;transition:opacity 0.3s}'+
      '.dm-ov.on{opacity:1}'+
      '.dm-base{position:absolute;inset:0;background-image:repeating-linear-gradient(transparent,transparent 7px,rgba(14,181,160,0.055) 7px,rgba(14,181,160,0.055) 8px)}'+
      '.dm-cols{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,rgba(14,181,160,0.09) 0,rgba(14,181,160,0.09) 1px,transparent 1px,transparent calc(100%/12));background-size:8.3334% 100%}'+
      '.dm-nums{position:absolute;top:0;left:0;right:0;display:flex;height:14px;border-bottom:1px solid rgba(14,181,160,0.15);background:rgba(8,12,16,0.5)}'+
      '.dm-n{flex:1;font-size:0.42rem;font-weight:700;font-family:monospace;color:rgba(14,181,160,0.55);text-align:center;line-height:14px;border-right:1px solid rgba(14,181,160,0.08)}'+
      '#dmBadge{position:fixed;top:4.5rem;right:1rem;background:#0EB5A0;color:#080c10;font-size:0.54rem;font-weight:800;letter-spacing:0.12em;padding:3px 9px;font-family:\'Syne\',sans-serif;text-transform:uppercase;pointer-events:none;z-index:99990;opacity:0;transition:opacity 0.3s}'+
      '#dmBadge.on{opacity:1}';
    document.head.appendChild(s);
    overlay=document.createElement('div'); overlay.className='dm-ov';
    var nums=''; for(var i=1;i<=12;i++) nums+='<div class="dm-n">'+i+'</div>';
    overlay.innerHTML='<div class="dm-base"></div><div class="dm-cols"></div><div class="dm-nums">'+nums+'</div>';
    document.body.appendChild(overlay);
    badge=document.createElement('div'); badge.id='dmBadge'; badge.textContent='◼ Design Mode';
    document.body.appendChild(badge);
  }
  document.addEventListener('keydown',function(e){
    if((e.key!=='d'&&e.key!=='D')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    build(); active=!active;
    overlay.classList.toggle('on',active); badge.classList.toggle('on',active);
    window.__gToast(active?'◼ Design mode ON — 12-col grid + 8px baseline':'◼ Design mode OFF');
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 22 — COLOR BLINDNESS SIMULATOR  [ B ]
   ══════════════════════════════════════════════════ */
(function(){
  var svgEl=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svgEl.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  svgEl.innerHTML='<defs>'
    +'<filter id="cb-deutan"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0"/></filter>'
    +'<filter id="cb-protan"><feColorMatrix type="matrix" values="0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0"/></filter>'
    +'<filter id="cb-tritan"><feColorMatrix type="matrix" values="1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0"/></filter>'
    +'</defs>';
  document.body.insertBefore(svgEl,document.body.firstChild);
  var modes=[
    {label:'Normal vision',        filter:''},
    {label:'Deuteranopia (green)', filter:'url(#cb-deutan)'},
    {label:'Protanopia (red)',     filter:'url(#cb-protan)'},
    {label:'Tritanopia (blue)',    filter:'url(#cb-tritan)'},
    {label:'Monochromacy',         filter:'grayscale(1)'},
  ];
  var mi=0;
  document.addEventListener('keydown',function(e){
    if((e.key!=='b'&&e.key!=='B')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    mi=(mi+1)%modes.length;
    document.documentElement.style.filter=modes[mi].filter;
    window.__gToast('👁 Color vision: '+modes[mi].label+(mi===0?' (default)':''));
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 23 — BLUEPRINT / WIREFRAME MODE  [ Alt ]
   ══════════════════════════════════════════════════ */
(function(){
  var altDown=false;
  var s=document.createElement('style');
  s.textContent=
    'body.alt-bp img:hover,body.alt-bp [class*="card"] img:hover{filter:invert(1) sepia(1) hue-rotate(180deg) saturate(5) brightness(0.85)!important;outline:1.5px solid #0EB5A0;outline-offset:2px;cursor:crosshair!important}'+
    '#bp-hint{position:fixed;top:4.6rem;left:50%;transform:translateX(-50%);background:#0d1117;border:1px solid rgba(14,181,160,0.45);color:#0EB5A0;font-size:0.6rem;font-weight:700;letter-spacing:0.12em;padding:4px 14px;z-index:99993;pointer-events:none;font-family:\'Syne\',sans-serif;text-transform:uppercase;opacity:0;transition:opacity 0.2s}'+
    '#bp-hint.show{opacity:1}';
  document.head.appendChild(s);
  var hint=document.createElement('div'); hint.id='bp-hint'; hint.textContent='⬡ Blueprint mode — hover any image';
  document.body.appendChild(hint);
  document.addEventListener('keydown',function(e){
    if(e.key==='Alt'&&!altDown){ altDown=true; document.body.classList.add('alt-bp'); hint.classList.add('show'); }
  });
  document.addEventListener('keyup',function(e){
    if(e.key==='Alt'){ altDown=false; document.body.classList.remove('alt-bp'); hint.classList.remove('show'); }
  });
  window.addEventListener('blur',function(){ altDown=false; document.body.classList.remove('alt-bp'); hint.classList.remove('show'); });
})();


/* ══════════════════════════════════════════════════
   FEATURE 24 — NOW PLAYING BADGE (Last.fm)
   Get a free API key → https://www.last.fm/api
   ══════════════════════════════════════════════════ */
(function(){
  var LASTFM_USER='dsampanna';
  var LASTFM_KEY='85ca23ca9720d53a7ff9451100173359';

  var s=document.createElement('style');
  s.textContent=
    '@keyframes soundBar{0%,100%{height:3px}25%{height:10px}50%{height:6px}75%{height:14px}}'+
    '@keyframes badgeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}'+
    '#np-badge{position:fixed;bottom:1.6rem;left:4rem;z-index:99994;display:flex;align-items:center;gap:0.55rem;background:rgba(13,17,23,0.92);border:1px solid rgba(255,255,255,0.08);padding:0.45rem 0.9rem 0.45rem 0.75rem;backdrop-filter:blur(10px);box-shadow:0 4px 24px rgba(0,0,0,0.4);animation:badgeIn 0.5s ease 2.5s both;max-width:230px;overflow:hidden;cursor:default}'+
    '.np-bars{display:flex;align-items:flex-end;gap:2px;height:16px;flex-shrink:0}'+
    '.np-bar{width:2px;border-radius:1px;background:#0EB5A0;animation:soundBar linear infinite}'+
    '.np-bar:nth-child(1){animation-duration:0.75s;animation-delay:0s}'+
    '.np-bar:nth-child(2){animation-duration:0.6s;animation-delay:0.1s}'+
    '.np-bar:nth-child(3){animation-duration:0.9s;animation-delay:0.2s}'+
    '.np-bar:nth-child(4){animation-duration:0.7s;animation-delay:0.05s}'+
    '#np-badge.paused .np-bar{animation-play-state:paused;height:3px;opacity:0.4}'+
    '.np-text{display:flex;flex-direction:column;line-height:1.25;min-width:0}'+
    '.np-track{font-size:0.68rem;font-weight:600;color:#f0f4f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:\'DM Sans\',sans-serif}'+
    '.np-artist{font-size:0.58rem;color:rgba(14,181,160,0.8);letter-spacing:0.04em;font-family:\'Syne\',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
    '@media(max-width:640px){#np-badge{left:1rem;bottom:1rem}}';
  document.head.appendChild(s);

  var badge=document.createElement('div'); badge.id='np-badge'; badge.className='paused';
  badge.title='What Sampanna is listening to (Last.fm)';
  badge.innerHTML='<div class="np-bars"><div class="np-bar"></div><div class="np-bar"></div><div class="np-bar"></div><div class="np-bar"></div></div><div class="np-text"><span class="np-track">Always listening…</span><span class="np-artist">Sound Design · Music</span></div>';
  document.body.appendChild(badge);

  function setTrack(track,artist,playing){
    badge.querySelector('.np-track').textContent=track||'—';
    badge.querySelector('.np-artist').textContent=artist||'—';
    badge.classList.toggle('paused',!playing);
  }
  function fetchNP(){
    if(!LASTFM_KEY||!LASTFM_USER) return;
    fetch('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+encodeURIComponent(LASTFM_USER)+'&api_key='+LASTFM_KEY+'&format=json&limit=1')
      .then(function(r){ return r.json(); })
      .then(function(d){
        var tracks=d&&d.recenttracks&&d.recenttracks.track;
        if(!tracks||!tracks.length) return;
        var t=Array.isArray(tracks)?tracks[0]:tracks;
        setTrack(t.name, t.artist&&t.artist['#text'], !!(t['@attr']&&t['@attr'].nowplaying==='true'));
      }).catch(function(){});
  }
  fetchNP(); setInterval(fetchNP,30000);
})();


/* ══════════════════════════════════════════════════
   FEATURE 25 — GOLDEN HOUR THEMING  (Bhaktapur)
   Sunrise & sunset times fetched live for 27.67°N 85.43°E
   ══════════════════════════════════════════════════ */
(function(){
  var s=document.createElement('style');
  s.textContent=
    '#gh-overlay{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0;transition:opacity 4s ease}'+
    '#gh-overlay.sunrise{background:radial-gradient(ellipse at 50% 110%,rgba(251,191,36,0.22) 0%,rgba(251,146,60,0.12) 40%,transparent 70%)}'+
    '#gh-overlay.sunset{background:radial-gradient(ellipse at 50% 110%,rgba(239,68,68,0.18) 0%,rgba(251,146,60,0.1) 40%,transparent 70%)}'+
    '#gh-overlay.active{opacity:1}'+
    '#gh-toast{position:fixed;top:5.2rem;right:1.5rem;background:rgba(13,17,23,0.95);border:1px solid rgba(251,146,60,0.4);color:#fbbf24;font-size:0.62rem;font-weight:600;letter-spacing:0.06em;padding:0.5rem 1.1rem;z-index:99991;pointer-events:none;font-family:\'DM Sans\',sans-serif;opacity:0;transition:opacity 0.5s,transform 0.5s;transform:translateY(4px)}'+
    '#gh-toast.show{opacity:1;transform:translateY(0)}';
  document.head.appendChild(s);

  var ov=document.createElement('div'); ov.id='gh-overlay';
  document.body.insertBefore(ov,document.body.firstChild);
  var gt=document.createElement('div'); gt.id='gh-toast';
  document.body.appendChild(gt);

  function showGT(msg){ gt.textContent=msg; gt.classList.add('show'); setTimeout(function(){ gt.classList.remove('show'); },7000); }

  fetch('https://api.sunrise-sunset.org/json?lat=27.6720&lng=85.4298&formatted=0')
    .then(function(r){ return r.json(); })
    .then(function(data){
      if(!data||data.status!=='OK') return;
      var now=new Date();
      var npm=(now.getUTCHours()*60+now.getUTCMinutes()+5*60+45)%1440; // Nepal = UTC+5:45
      function utcMin(iso){ var d=new Date(iso); return d.getUTCHours()*60+d.getUTCMinutes(); }
      var srNepal=(utcMin(data.results.sunrise)+5*60+45)%1440;
      var ssNepal=(utcMin(data.results.sunset)+5*60+45)%1440;
      var W=28; // ±28 min window
      if(Math.abs(npm-srNepal)<=W){
        ov.classList.add('sunrise','active');
        showGT('🌅 Golden hour in Bhaktapur — sunrise palette applied');
        setTimeout(function(){ ov.classList.remove('active'); },4*60*1000);
      } else if(Math.abs(npm-ssNepal)<=W){
        ov.classList.add('sunset','active');
        showGT('🌇 Golden hour in Bhaktapur — sunset palette applied');
        setTimeout(function(){ ov.classList.remove('active'); },4*60*1000);
      }
    }).catch(function(){});
})();


/* ══════════════════════════════════════════════════
   FEATURE 26 — DEVTOOLS CONSOLE MESSAGE
   ══════════════════════════════════════════════════ */
(function(){
  var T='color:#0EB5A0;font-weight:700';
  var D='color:#6b7c8f;font-weight:400;font-size:12px';
  var W='color:#f0f4f8;font-weight:700;font-size:13px';
  setTimeout(function(){
    console.log(
      '%c\n  ███████╗ █████╗ ███╗   ███╗██████╗ \n'
      +'  ██╔════╝██╔══██╗████╗ ████║██╔══██╗\n'
      +'  ███████╗███████║██╔████╔██║██████╔╝\n'
      +'  ╚════██║██╔══██║██║╚██╔╝██║██╔═══╝ \n'
      +'  ███████║██║  ██║██║ ╚═╝ ██║██║     \n'
      +'  ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     \n', T
    );
    console.log('%cHey curious one. 👋', W);
    console.log('%cMost people never open DevTools on a portfolio.\nThat makes you a developer, a designer, or dangerously detail-oriented.\nI\'d hire any of those.', D);
    console.log('%c────────────────────────────────────────', D);
    console.log('%c✉  sampannadhungel@gmail.com\n🔗 linkedin.com/in/dsampanna\n💬 +977 9861487026 (WhatsApp)', T);
    console.log('%c────────────────────────────────────────', D);
    console.log('%cPS: Press  ?  on the site to see all hidden interactions.', D);
    console.log('%cPPS: You\'re on clue 0 of 3. The trail starts in the page source.', D);
  },800);
})()
