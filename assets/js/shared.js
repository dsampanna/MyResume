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
    {section:'Interactions'},
    {keys:['Tab'],desc:'<strong>Keyboard mode</strong> — beautiful custom focus rings activate'},
    {keys:['Ctrl','C'],desc:'<strong>Copy toast</strong> — cheeky message on every copy'},
    {section:'Ambient'},
    {keys:['Idle 5s'],desc:'<strong>Idle signature</strong> — watermark appears after inactivity'},
    {keys:['Move cursor'],desc:'<strong>Word trail</strong> — design words drift from your cursor'},
    {keys:['Rage-click'],desc:'<strong>Rage ripple</strong> — click fast to see what happens'},
    {section:'Visual'},
    {keys:['Scroll'],desc:'<strong>Invisible ink</strong> — hidden message in the footer'},
    {keys:['Hover cards'],desc:'<strong>Colour dots</strong> — each card samples its own palette'},
    {keys:['Section shift'],desc:'<strong>Cursor shape</strong> — ring changes label per section'},
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
