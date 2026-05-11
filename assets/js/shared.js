/* shared.js — Runs on every page of the site
   Contains: BTT · Page transitions · Features 11-17
   ─────────────────────────────────────────────── */

/* Guard: don't double-run if already loaded */
if(window.__sharedLoaded) { throw new Error('shared.js already loaded'); }
window.__sharedLoaded = true;

/* ══════════════════════════════════════════════════
   FEATURE 28b — SMOOTH PAGE TRANSITIONS
   Fade-out on navigate, fade-in on load
   ══════════════════════════════════════════════════ */
(function(){
  var s=document.createElement('style');
  s.textContent='#pt-veil{position:fixed;inset:0;background:#0d1117;opacity:0;pointer-events:none;z-index:99990;transition:opacity 0.28s ease}.pt-leaving #pt-veil{opacity:1;pointer-events:all}';
  document.head.appendChild(s);
  var veil=document.createElement('div'); veil.id='pt-veil';
  document.body.appendChild(veil);
  /* Fade in on arrival */
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ document.body.classList.remove('pt-leaving'); }); });
  /* Intercept same-origin link clicks */
  document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a||!a.href||a.target==='_blank'||a.getAttribute('href').startsWith('#')||a.getAttribute('href').startsWith('mailto')||a.getAttribute('href').startsWith('tel')) return;
    try{ var u=new URL(a.href); if(u.origin!==location.origin) return; } catch(x){ return; }
    e.preventDefault();
    var dest=a.href;
    document.body.classList.add('pt-leaving');
    setTimeout(function(){ location.href=dest; },280);
  });
})();

/* ══════════════════════════════════════════════════
   FEATURE 28c — BLOG READING PROGRESS BAR
   Thin teal bar at top, grows as you scroll through article
   ══════════════════════════════════════════════════ */
(function(){
  if(!/blog-/.test(location.pathname)&&!/blog-/.test(location.href)) return;
  var s=document.createElement('style');
  s.textContent='#rdprog{position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#0EB5A0,#0cc9b2);z-index:99995;transition:width 0.1s linear;pointer-events:none}';
  document.head.appendChild(s);
  var bar=document.createElement('div'); bar.id='rdprog';
  document.body.appendChild(bar);
  window.addEventListener('scroll',function(){
    var el=document.documentElement;
    var pct=(el.scrollTop/(el.scrollHeight-el.clientHeight))*100;
    bar.style.width=Math.min(pct,100)+'%';
  },{passive:true});
})();

/* ══════════════════════════════════════════════════
   FEATURE 28d — KONAMI CODE EASTER EGG
   ↑↑↓↓←→←→BA → confetti burst + secret message
   ══════════════════════════════════════════════════ */
(function(){
  var SEQ=[38,38,40,40,37,39,37,39,66,65], pos=0;
  document.addEventListener('keydown',function(e){
    if(e.keyCode===SEQ[pos]){ pos++; } else { pos=0; if(e.keyCode===SEQ[0]) pos=1; }
    if(pos<SEQ.length) return;
    pos=0;
    /* Message */
    var msg=document.createElement('div');
    msg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999999;background:#0d1117;border:1px solid #0EB5A0;padding:2rem 3rem;text-align:center;font-family:var(--display,monospace);pointer-events:none;box-shadow:0 0 60px rgba(14,181,160,0.3)';
    msg.innerHTML='<div style="font-size:2rem;margin-bottom:0.5rem">🎮</div><div style="font-size:1.1rem;font-weight:700;color:#0EB5A0;letter-spacing:0.05em">You found the easter egg.</div><div style="font-size:0.78rem;color:rgba(255,255,255,0.5);margin-top:0.4rem">Thanks for exploring every corner.</div>';
    document.body.appendChild(msg);
    /* Confetti */
    for(var i=0;i<80;i++){
      (function(){
        var c=document.createElement('div');
        var hue=Math.random()>0.5?Math.round(Math.random()*40+160):Math.round(Math.random()*360);
        c.style.cssText='position:fixed;width:'+(4+Math.random()*6)+'px;height:'+(4+Math.random()*6)+'px;background:hsl('+hue+',80%,60%);border-radius:'+Math.round(Math.random()*50)+'%;top:50%;left:50%;z-index:999998;pointer-events:none;transition:none';
        document.body.appendChild(c);
        var angle=Math.random()*Math.PI*2, dist=80+Math.random()*300, dur=600+Math.random()*800;
        var tx=Math.cos(angle)*dist, ty=Math.sin(angle)*dist;
        requestAnimationFrame(function(){
          c.style.transition='transform '+dur+'ms cubic-bezier(.2,.8,.4,1),opacity '+dur+'ms';
          c.style.transform='translate('+tx+'px,'+ty+'px) rotate('+Math.random()*720+'deg)';
          c.style.opacity='0';
        });
        setTimeout(function(){ c.remove(); },dur+100);
      })();
    }
    setTimeout(function(){ msg.style.transition='opacity 0.5s'; msg.style.opacity='0'; setTimeout(function(){ msg.remove(); },500); },3000);
  });
})();


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


/* ── BACK TO TOP (removed) ── */


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
    {section:'New Features'},
    {keys:['F'],desc:'<strong>Focus mode</strong> — spotlight the current section, dim everything else'},
    {keys:['T'],desc:'<strong>Font switcher</strong> — cycle through 4 curated type pairings'},
    {keys:['1','–','8'],desc:'<strong>Keyboard piano</strong> — play musical notes (sound designer approved)'},
    {keys:['R'],desc:'<strong>Recruiter mode</strong> — slide-in CV panel with full experience & contact'},
    {keys:['S'],desc:'<strong>Session stats</strong> — time on page, scroll depth, sections visited'},
    {keys:['credits'],desc:'<strong>Credits roll</strong> — type the word to see movie-style credits'},
    {keys:['3× logo'],desc:'<strong>Triple-click logo</strong> — reveals a secret nav item'},
    {keys:['Hover clock'],desc:'<strong>Nepal clock</strong> — hold 2s to see your local time alongside'},
    {keys:['15s idle'],desc:'<strong>Generative art</strong> — Lissajous curve draws from your last cursor position'},
    {keys:['Season'],desc:'<strong>Weather effects</strong> — petals (spring) · rain (monsoon) · snow (winter)'},
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


/* FEATURE 16 — OPEN TO PROJECTS BANNER (removed — sticky-cta in index.html handles this) */


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
            window.__gToast('⚡ You just scrolled past years of work in 0.3 seconds.', 3800);
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


/* FEATURE 24 — NOW PLAYING BADGE removed */


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
})();


/* ══════════════════════════════════════════════════
   FEATURE 27 — SEASON EFFECTS (viewer's live weather)
   🌸 petals · 🌧 rain · ❄ snow  via wttr.in
   ══════════════════════════════════════════════════ */
(function(){
  function initParticles(season,weatherDesc,city){
    var cv=document.createElement('canvas');
    cv.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2';
    document.body.appendChild(cv);
    var ctx=cv.getContext('2d');
    function resize(){ cv.width=window.innerWidth; cv.height=window.innerHeight; }
    resize(); window.addEventListener('resize',resize);
    var COUNT=season==='monsoon'?140:season==='spring'?30:55, particles=[];
    function newP(init){
      var p={x:Math.random()*window.innerWidth,y:init?Math.random()*window.innerHeight:-20};
      if(season==='monsoon'){ p.vx=-1.5+Math.random()*0.5; p.vy=10+Math.random()*8; p.len=8+Math.random()*10; p.a=0.2+Math.random()*0.3; }
      else if(season==='winter'){ p.vx=-0.3+Math.random()*0.6; p.vy=0.6+Math.random()*1.4; p.r=2+Math.random()*3; p.a=0.45+Math.random()*0.4; p.w=Math.random()*Math.PI*2; }
      else{ p.vx=-0.25+Math.random()*0.5; p.vy=0.18+Math.random()*0.37; p.r=3+Math.random()*5; p.a=0.5+Math.random()*0.35; p.rot=Math.random()*Math.PI*2; p.rv=(Math.random()-0.5)*0.025; var c=[{r:255,g:183,b:197},{r:255,g:200,b:215},{r:255,g:160,b:180}]; p.col=c[Math.floor(Math.random()*c.length)]; }
      return p;
    }
    for(var i=0;i<COUNT;i++) particles.push(newP(true));
    (function draw(){
      ctx.clearRect(0,0,cv.width,cv.height);
      particles.forEach(function(p,i){
        if(season==='monsoon'){
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x+p.vx*0.8,p.y+p.len);
          ctx.strokeStyle='rgba(160,210,255,'+p.a+')'; ctx.lineWidth=1; ctx.stroke();
          p.x+=p.vx; p.y+=p.vy;
        } else if(season==='winter'){
          p.w+=0.018; p.x+=Math.sin(p.w)*0.5+p.vx; p.y+=p.vy;
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle='rgba(220,238,255,'+p.a+')'; ctx.fill();
        } else {
          p.rot+=p.rv; p.x+=p.vx+Math.sin(p.rot)*0.3; p.y+=p.vy;
          ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
          ctx.beginPath(); ctx.ellipse(0,0,p.r,p.r/2.2,0,0,Math.PI*2);
          ctx.fillStyle='rgba('+p.col.r+','+p.col.g+','+p.col.b+','+p.a+')'; ctx.fill(); ctx.restore();
        }
        if(p.y>cv.height+30||p.x<-30||p.x>cv.width+30) particles[i]=newP(false);
      });
      requestAnimationFrame(draw);
    })();
    setTimeout(function(){
      var icon=season==='spring'?'🌸':season==='monsoon'?'🌧':'❄';
      var label=city?weatherDesc+' in '+city:weatherDesc;
      window.__gToast&&window.__gToast(icon+' '+label+' right now',4000);
    },3500);
  }

  function parseAndInit(data, city){
    var code=parseInt(data.current_condition[0].weatherCode);
    var desc=data.current_condition[0].weatherDesc[0].value;
    var snowCodes=[179,182,185,227,230,323,326,329,332,335,338,350,371,374,377];
    var season;
    if(snowCodes.indexOf(code)!==-1) season='winter';
    else if(code>=176) season='monsoon';
    else if(code<=116) season='spring';
    if(season) initParticles(season,desc,city);
  }

  function calendarFallback(){
    var m=new Date().getMonth();
    var season=(m>=2&&m<=4)?'spring':(m>=5&&m<=7)?'monsoon':(m>=11||m<=1)?'winter':null;
    if(season) initParticles(season,'','your location');
  }

  function fetchByCoords(lat,lon){
    fetch('https://wttr.in/'+lat+','+lon+'?format=j1')
      .then(function(r){ return r.json(); })
      .then(function(data){
        /* nearest_area from wttr gives a city name */
        var area=data.nearest_area&&data.nearest_area[0];
        var city=area?(area.areaName[0].value+(area.country[0].value?', '+area.country[0].value:'')):null;
        parseAndInit(data, city);
      })
      .catch(calendarFallback);
  }

  function fetchByIP(){
    /* ip-api gives lat/lon without requiring user permission */
    fetch('https://ip-api.com/json/?fields=lat,lon,city,country')
      .then(function(r){ return r.json(); })
      .then(function(d){
        if(d.lat) fetchByCoords(d.lat.toFixed(4), d.lon.toFixed(4));
        else calendarFallback();
      })
      .catch(calendarFallback);
  }

  /* Try precise GPS first; silently fall back to IP geolocation */
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(pos){ fetchByCoords(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4)); },
      function(){ fetchByIP(); },
      {timeout:4000, maximumAge:600000}
    );
  } else {
    fetchByIP();
  }
})();


/* ══════════════════════════════════════════════════
   FEATURE 28 — IDLE SIGNATURE ART (5 s idle)
   Teal-tinted signature drawn from last cursor pos
   ══════════════════════════════════════════════════ */
(function(){
  var IDLE=5000,timer,cv,ctx,animId,on=false;
  var lx=window.innerWidth/2,ly=window.innerHeight/2;
  var sigCanvas=null,sigLoaded=false;

  /* Pre-load /assets/img/signature.png and teal-ify dark pixels */
  (function loadSig(){
    var img=new Image();
    img.onload=function(){
      var tmp=document.createElement('canvas');
      tmp.width=img.naturalWidth; tmp.height=img.naturalHeight;
      var tc=tmp.getContext('2d');
      tc.drawImage(img,0,0);
      var d=tc.getImageData(0,0,tmp.width,tmp.height),px=d.data;
      for(var i=0;i<px.length;i+=4){
        var a=px[i+3];
        if(a<15){ px[i+3]=0; continue; } /* transparent bg → keep transparent */
        /* Stroke pixel (any colour) → teal, preserve anti-alias alpha */
        px[i]=14; px[i+1]=181; px[i+2]=160;
        px[i+3]=Math.min(255,Math.round(a*0.95+12));
      }
      tc.putImageData(d,0,0);
      sigCanvas=tmp; sigLoaded=true;
    };
    img.src='/assets/img/signature.png';
  })();

  function makeCV(){
    if(cv) return;
    cv=document.createElement('canvas');
    cv.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;transition:opacity 0.8s';
    document.body.appendChild(cv); ctx=cv.getContext('2d');
    function r(){ cv.width=window.innerWidth; cv.height=window.innerHeight; }
    r(); window.addEventListener('resize',r);
  }

  function start(){
    if(on||!sigLoaded) return; on=true; makeCV();
    ctx.clearRect(0,0,cv.width,cv.height);
    cv.style.opacity='1';

    var W=sigCanvas.width,H=sigCanvas.height;
    var scale=Math.min(window.innerWidth*0.42/W,window.innerHeight*0.22/H,1.5);
    var sw=W*scale,sh=H*scale;
    var dx=Math.max(20,Math.min(cv.width-sw-20,lx-sw/2));
    var dy=Math.max(20,Math.min(cv.height-sh-20,ly-sh/2));

    var frame=0,FRAMES=50;
    (function draw(){
      if(!on) return;
      ctx.clearRect(0,0,cv.width,cv.height);
      var revealW=sw*(frame/FRAMES);
      ctx.save();
      ctx.beginPath();
      ctx.rect(dx,dy-4,revealW,sh+8);
      ctx.clip();
      ctx.shadowBlur=28; ctx.shadowColor='rgba(14,181,160,0.5)';
      ctx.drawImage(sigCanvas,dx,dy,sw,sh);
      ctx.restore();
      if(frame<FRAMES){ frame++; animId=requestAnimationFrame(draw); }
      else{ setTimeout(function(){ if(on) stop(); },2000); }
    })();
  }

  function stop(){
    if(!on) return; on=false; cancelAnimationFrame(animId);
    if(cv){ cv.style.opacity='0'; setTimeout(function(){ if(ctx) ctx.clearRect(0,0,cv.width,cv.height); },900); }
  }

  function reset(){ clearTimeout(timer); if(on) stop(); timer=setTimeout(start,IDLE); }
  document.addEventListener('mousemove',function(e){ lx=e.clientX; ly=e.clientY; reset(); });
  document.addEventListener('keydown',reset); document.addEventListener('click',reset);
  document.addEventListener('scroll',reset,{passive:true}); reset();
})();


/* ══════════════════════════════════════════════════
   FEATURE 29 — FOCUS MODE  [ F ]
   ══════════════════════════════════════════════════ */
(function(){
  var active=false,obs,current=null;
  var s=document.createElement('style');
  s.textContent=
    'body.fm section,body.fm .hero,body.fm footer{opacity:0.07;filter:blur(1.5px);transition:opacity 0.4s,filter 0.4s}'+
    'body.fm .fm-on{opacity:1!important;filter:none!important}'+
    '#fm-badge{position:fixed;top:4.5rem;left:50%;transform:translateX(-50%);background:#0d1117;border:1px solid rgba(14,181,160,0.4);color:#0EB5A0;font-size:0.6rem;font-weight:700;letter-spacing:0.12em;padding:4px 16px;z-index:99993;pointer-events:none;font-family:\'Syne\',sans-serif;text-transform:uppercase;opacity:0;transition:opacity 0.3s;white-space:nowrap}'+
    '#fm-badge.show{opacity:1}';
  document.head.appendChild(s);
  var badge=document.createElement('div'); badge.id='fm-badge'; badge.textContent='◎ Focus Mode  ·  F to exit';
  document.body.appendChild(badge);
  document.addEventListener('keydown',function(e){
    if((e.key!=='f'&&e.key!=='F')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    active=!active; document.body.classList.toggle('fm',active); badge.classList.toggle('show',active);
    if(active){
      var els=Array.from(document.querySelectorAll('section,.hero'));
      /* Immediately highlight the most visible section */
      var best=null,bestVis=-1;
      els.forEach(function(el){
        var r=el.getBoundingClientRect();
        var vis=Math.min(r.bottom,window.innerHeight)-Math.max(r.top,0);
        if(vis>bestVis){ bestVis=vis; best=el; }
      });
      if(best){ current=best; best.classList.add('fm-on'); }
      /* Observer keeps it updated on scroll */
      obs=new IntersectionObserver(function(entries){
        entries.forEach(function(ent){
          if(ent.isIntersecting&&ent.intersectionRatio>=0.25){
            if(current) current.classList.remove('fm-on');
            current=ent.target; current.classList.add('fm-on');
          }
        });
      },{threshold:0.25});
      els.forEach(function(el){ obs.observe(el); });
      window.__gToast&&window.__gToast('◎ Focus mode ON — scroll to spotlight each section');
    } else {
      if(obs) obs.disconnect();
      document.querySelectorAll('.fm-on').forEach(function(el){ el.classList.remove('fm-on'); });
      window.__gToast&&window.__gToast('◎ Focus mode OFF');
    }
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 30 — FONT SWITCHER  [ T ]
   ══════════════════════════════════════════════════ */
(function(){
  var pairs=[
    {d:"'Syne',sans-serif",b:"'DM Sans',sans-serif",lbl:'Syne / DM Sans',loaded:true},
    {d:"'Playfair Display',serif",b:"'Inter',sans-serif",lbl:'Playfair Display / Inter',src:'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500&display=swap'},
    {d:"'Space Grotesk',sans-serif",b:"'Outfit',sans-serif",lbl:'Space Grotesk / Outfit',src:'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=Outfit:wght@300;400;500&display=swap'},
    {d:"'Bebas Neue',cursive",b:"'JetBrains Mono',monospace",lbl:'Bebas Neue / JetBrains Mono',src:'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;500&display=swap'},
  ];
  var fi=0;
  document.addEventListener('keydown',function(e){
    if((e.key!=='t'&&e.key!=='T')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    fi=(fi+1)%pairs.length; var p=pairs[fi];
    if(!p.loaded&&p.src){ var l=document.createElement('link'); l.rel='stylesheet'; l.href=p.src; document.head.appendChild(l); p.loaded=true; }
    document.documentElement.style.setProperty('--display',p.d);
    document.documentElement.style.setProperty('--body',p.b);
    window.__gToast&&window.__gToast('Aa '+p.lbl+(fi===0?' (default)':''));
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 31 — KEYBOARD PIANO  [ 1 – 8 ]
   ══════════════════════════════════════════════════ */
(function(){
  var FREQS=[261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25];
  var NAMES=['C','D','E','F','G','A','B','C♪'];
  var actx=null;
  function getCtx(){ return actx||(actx=new(window.AudioContext||window.webkitAudioContext)()); }
  function playNote(freq,idx){
    var c=getCtx(),osc=c.createOscillator(),gain=c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.frequency.value=freq; osc.type='sine';
    gain.gain.setValueAtTime(0.22,c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,c.currentTime+1.1);
    osc.start(); osc.stop(c.currentTime+1.1);
    var k=document.getElementById('pk'+idx);
    if(k){ k.classList.add('pka'); setTimeout(function(){ k.classList.remove('pka'); },280); }
  }
  var s=document.createElement('style');
  s.textContent=
    '#pkwrap{position:fixed;bottom:9.5rem;left:50%;transform:translateX(-50%);z-index:99993;display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0;pointer-events:none;transition:opacity 0.3s}'+
    '#pkwrap.show{opacity:1;pointer-events:auto}'+
    '#pklbl{font-size:0.58rem;font-weight:700;color:rgba(14,181,160,0.65);letter-spacing:0.14em;font-family:\'Syne\',sans-serif;text-transform:uppercase}'+
    '#pkkeys{display:flex;gap:3px}'+
    '.pkk{width:38px;height:64px;background:#111820;border:1px solid rgba(14,181,160,0.18);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:7px;gap:2px;cursor:pointer;transition:background 0.1s,border-color 0.1s;border-radius:0 0 4px 4px}'+
    '.pkk.pka,.pkk:hover{background:rgba(14,181,160,0.2);border-color:#0EB5A0}'+
    '.pkn{font-size:0.55rem;font-weight:700;color:#0EB5A0;font-family:\'Syne\',sans-serif}'+
    '.pki{font-size:0.45rem;color:#6b7c8f;font-family:monospace}';
  document.head.appendChild(s);
  var wrap=document.createElement('div'); wrap.id='pkwrap';
  wrap.innerHTML='<div id="pklbl">🎹 Keys 1–8 · click or press again to hide</div><div id="pkkeys">'+NAMES.map(function(n,i){ return '<div class="pkk" id="pk'+(i+1)+'"><div class="pkn">'+n+'</div><div class="pki">'+(i+1)+'</div></div>'; }).join('')+'</div>';
  document.body.appendChild(wrap);
  var hideT;
  function bump(){ clearTimeout(hideT); wrap.classList.add('show'); hideT=setTimeout(function(){ wrap.classList.remove('show'); },8000); }
  document.addEventListener('keydown',function(e){
    var n=parseInt(e.key);
    if(n>=1&&n<=8&&!e.ctrlKey&&!e.metaKey){ var tag=document.activeElement.tagName; if(tag==='INPUT'||tag==='TEXTAREA') return; bump(); playNote(FREQS[n-1],n); }
  });
  wrap.addEventListener('click',function(e){ var k=e.target.closest('.pkk'); if(!k) return; var n=parseInt(k.id.replace('pk','')); if(n>=1&&n<=8){ bump(); playNote(FREQS[n-1],n); } });
})();


/* ══════════════════════════════════════════════════
   FEATURE 32 — RECRUITER MODE  [ R ]
   Slide-in panel with CV summary
   ══════════════════════════════════════════════════ */
(function(){
  var open=false,panel;
  var s=document.createElement('style');
  s.textContent=
    '#rec-panel{position:fixed;top:0;right:0;height:100vh;width:340px;max-width:92vw;background:#0d1117;border-left:1px solid rgba(14,181,160,0.2);z-index:99996;transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);overflow-y:auto;padding:2rem 1.75rem 2rem;display:flex;flex-direction:column;gap:1.1rem}'+
    '#rec-panel.open{transform:translateX(0)}'+
    '.rp-x{position:absolute;top:1rem;right:1rem;background:none;border:none;color:#6b7c8f;font-size:1.1rem;cursor:pointer;transition:color 0.2s;line-height:1}.rp-x:hover{color:#f0f4f8}'+
    '.rp-tag{font-size:0.58rem;font-weight:700;color:#0EB5A0;letter-spacing:0.14em;text-transform:uppercase;display:flex;align-items:center;gap:0.4rem}.rp-tag::before{content:\'\';width:14px;height:1px;background:#0EB5A0}'+
    '.rp-name{font-family:\'Syne\',sans-serif;font-size:1.3rem;font-weight:800;color:#f0f4f8;letter-spacing:-0.02em;line-height:1.1;margin-top:0.15rem}'+
    '.rp-title{font-size:0.72rem;color:#0EB5A0;font-weight:500;letter-spacing:0.03em}'+
    '.rp-sep{height:1px;background:rgba(255,255,255,0.07)}'+
    '.rp-h{font-size:0.55rem;font-weight:700;color:rgba(14,181,160,0.55);letter-spacing:0.16em;text-transform:uppercase;margin-bottom:0.55rem;font-family:\'Syne\',sans-serif}'+
    '.rp-chips{display:flex;flex-wrap:wrap;gap:0.35rem}'+
    '.rp-chip{font-size:0.62rem;color:#9ca3af;border:1px solid rgba(255,255,255,0.09);padding:2px 8px}'+
    '.rp-job{margin-bottom:0.7rem}.rp-job-role{font-size:0.76rem;font-weight:600;color:#f0f4f8}.rp-job-org{font-size:0.65rem;color:#0EB5A0}.rp-job-date{font-size:0.58rem;color:#6b7c8f}'+
    '.rp-links a{display:block;font-size:0.7rem;color:#9ca3af;padding:0.28rem 0;text-decoration:none;transition:color 0.2s}.rp-links a:hover{color:#0EB5A0}'+
    '.rp-dl{display:block;text-align:center;background:#0EB5A0;color:#080c10;font-size:0.7rem;font-weight:700;letter-spacing:0.06em;padding:0.6rem;text-decoration:none;font-family:\'Syne\',sans-serif;text-transform:uppercase;transition:background 0.2s;margin-top:0.25rem}.rp-dl:hover{background:#0cc9b2}';
  document.head.appendChild(s);
  panel=document.createElement('div'); panel.id='rec-panel';
  panel.innerHTML=
    '<button class="rp-x" id="rpX">✕</button>'+
    '<div><div class="rp-tag">Recruiter View</div><div class="rp-name">Sampanna Raj Dhungel</div><div class="rp-title">Creative Director & Digital Media Designer</div></div>'+
    '<div class="rp-sep"></div>'+
    '<div><div class="rp-h">Core Skills</div><div class="rp-chips">'+['UI/UX Design','Brand Identity','Motion Graphics','3D Animation','Video Production','Sound Design','Art Direction','Figma / XD','Illustrator','After Effects','Blender','HTML/CSS/JS'].map(function(x){ return '<span class="rp-chip">'+x+'</span>'; }).join('')+'</div></div>'+
    '<div class="rp-sep"></div>'+
    '<div><div class="rp-h">Experience</div>'+
    '<div class="rp-job"><div class="rp-job-role">Marketing & Creative Director</div><div class="rp-job-org">Joon Nepal · Bhaktapur</div><div class="rp-job-date">Jan 2024 – Feb 2025</div></div>'+
    '<div class="rp-job"><div class="rp-job-role">UI/UX Designer (Freelance)</div><div class="rp-job-org">Tangible Tech Studio · Kathmandu</div><div class="rp-job-date">May – Dec 2023</div></div>'+
    '<div class="rp-job"><div class="rp-job-role">Video Editor / Graphics Designer</div><div class="rp-job-org">Explorer Nepal · Kathmandu</div><div class="rp-job-date">Oct 2022 – Feb 2023</div></div>'+
    '<div class="rp-job"><div class="rp-job-role">Animator</div><div class="rp-job-org">Innovate Tech · Kathmandu</div><div class="rp-job-date">Mar – Jul 2022</div></div></div>'+
    '<div class="rp-sep"></div>'+
    '<div><div class="rp-h">Education</div><div class="rp-job"><div class="rp-job-role">BSc (Hons) Multimedia Technologies</div><div class="rp-job-org">Islington College — London Met</div><div class="rp-job-date">Mar 2020 – Sep 2023</div></div></div>'+
    '<div class="rp-sep"></div>'+
    '<div class="rp-links"><div class="rp-h">Contact</div><a href="mailto:sampannadhungel@gmail.com">✉ sampannadhungel@gmail.com</a><a href="https://wa.me/9779861487026" target="_blank">💬 +977 9861487026</a><a href="https://linkedin.com/in/dsampanna" target="_blank">🔗 linkedin.com/in/dsampanna</a></div>'+
    '<a href="assets/files/SampannaRajDhungel_R%C3%A9sum%C3%A9.pdf" download class="rp-dl">⬇ Download Resume PDF</a>';
  document.body.appendChild(panel);
  document.getElementById('rpX').addEventListener('click',function(){ open=false; panel.classList.remove('open'); });
  document.addEventListener('keydown',function(e){
    if((e.key!=='r'&&e.key!=='R')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    open=!open; panel.classList.toggle('open',open);
    window.__gToast&&window.__gToast(open?'📋 Recruiter mode — press R or ✕ to close':'📋 Recruiter mode closed');
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&open){ open=false; panel.classList.remove('open'); } });
})();


/* ══════════════════════════════════════════════════
   FEATURE 33 — SESSION STATS  [ S ]
   ══════════════════════════════════════════════════ */
(function(){
  var t0=Date.now(),maxScroll=0,hits=new Set(),fired=0,sOpen=false,sEl;
  window.addEventListener('scroll',function(){ var d=Math.min(100,Math.round((window.scrollY+window.innerHeight)/Math.max(document.body.scrollHeight,1)*100)); if(d>maxScroll) maxScroll=d; },{passive:true});
  var obs2=new IntersectionObserver(function(e){ e.forEach(function(x){ if(x.isIntersecting) hits.add(x.target.id||x.target.className.split(' ')[0]); }); },{threshold:0.3});
  document.querySelectorAll('section[id],.hero').forEach(function(el){ obs2.observe(el); });
  var _orig=window.__gToast;
  window.__gToast=function(m,d){ fired++; if(_orig) _orig(m,d); };
  var s=document.createElement('style');
  s.textContent=
    '#sp{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.95);background:#0d1117;border:1px solid rgba(14,181,160,0.22);min-width:270px;padding:1.75rem 2rem;z-index:99997;opacity:0;pointer-events:none;transition:opacity 0.25s,transform 0.25s;backdrop-filter:blur(16px)}'+
    '#sp.open{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:auto}'+
    '.sp-ttl{font-family:\'Syne\',sans-serif;font-size:0.7rem;font-weight:800;color:#0EB5A0;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1.2rem}'+
    '.sp-row{display:flex;justify-content:space-between;align-items:center;padding:0.48rem 0;border-bottom:1px solid rgba(255,255,255,0.05)}.sp-row:last-child{border:none}'+
    '.sp-l{font-size:0.68rem;color:#6b7c8f}.sp-v{font-size:0.82rem;font-weight:700;color:#f0f4f8;font-family:\'Syne\',sans-serif}.sp-v.hi{color:#0EB5A0}'+
    '.sp-x2{position:absolute;top:0.75rem;right:0.9rem;background:none;border:none;color:#6b7c8f;font-size:1rem;cursor:pointer;transition:color 0.2s}.sp-x2:hover{color:#f0f4f8}';
  document.head.appendChild(s);
  sEl=document.createElement('div'); sEl.id='sp';
  sEl.innerHTML='<button class="sp-x2" id="spX">✕</button><div class="sp-ttl">📊 Session Stats</div><div id="sp-rows"></div>';
  document.body.appendChild(sEl);
  document.getElementById('spX').addEventListener('click',function(){ sOpen=false; sEl.classList.remove('open'); });
  function fmtT(ms){ var s=Math.floor(ms/1000),m=Math.floor(s/60); return m>0?m+'m '+Math.floor(s%60)+'s':s+'s'; }
  function update(){
    var rows=[{l:'Time on page',v:fmtT(Date.now()-t0),hi:true},{l:'Scroll depth',v:maxScroll+'%',hi:maxScroll>70},{l:'Sections visited',v:hits.size,hi:hits.size>4},{l:'Interactions fired',v:fired,hi:fired>3}];
    document.getElementById('sp-rows').innerHTML=rows.map(function(r){ return '<div class="sp-row"><span class="sp-l">'+r.l+'</span><span class="sp-v'+(r.hi?' hi':'')+'">'+(typeof r.v==='number'?r.v:r.v)+'</span></div>'; }).join('');
  }
  document.addEventListener('keydown',function(e){
    if((e.key!=='s'&&e.key!=='S')||e.ctrlKey||e.metaKey) return;
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable) return;
    sOpen=!sOpen; update(); sEl.classList.toggle('open',sOpen);
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&sOpen){ sOpen=false; sEl.classList.remove('open'); } });
})();


/* ══════════════════════════════════════════════════
   FEATURE 34 — TRIPLE-CLICK LOGO → SECRET NAV
   ══════════════════════════════════════════════════ */
(function(){
  var clicks=0,timer;
  document.addEventListener('click',function(e){
    if(!e.target.closest('.nav-logo')) return;
    clicks++; clearTimeout(timer); timer=setTimeout(function(){ clicks=0; },500);
    if(clicks>=3){
      clicks=0;
      var ex=document.getElementById('secret-nav-li');
      if(ex){ ex.remove(); return; }
      var li=document.createElement('li'); li.id='secret-nav-li';
      var a=document.createElement('a'); a.href='secret.html'; a.textContent='★ Found it';
      a.style.cssText='color:#a78bfa!important;font-style:italic'; li.appendChild(a);
      var nl=document.querySelector('.nav-links');
      if(nl){ nl.appendChild(li); window.__gToast&&window.__gToast('★ Secret nav item revealed — check the menu!'); }
    }
  });
})();


/* ══════════════════════════════════════════════════
   FEATURE 35 — TYPE "credits" FOR ROLL
   ══════════════════════════════════════════════════ */
(function(){
  var SEQ='credits',pos=0;
  document.addEventListener('keydown',function(e){
    var tag=document.activeElement.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||document.activeElement.isContentEditable){ pos=0; return; }
    if(e.key.toLowerCase()===SEQ[pos]) pos++; else pos=(e.key.toLowerCase()===SEQ[0]?1:0);
    if(pos===SEQ.length){ pos=0; roll(); }
  });
  function roll(){
    if(document.getElementById('cred-ov')) return;
    var s=document.createElement('style');
    s.textContent=
      '#cred-ov{position:fixed;inset:0;background:#080c10;z-index:999999;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:0;transition:opacity 0.6s;cursor:pointer}'+
      '#cred-ov.show{opacity:1}'+
      '#cred-inner{width:100%;text-align:center;animation:credRoll 30s linear both;padding:100vh 2rem;max-width:560px}'+
      '@keyframes credRoll{0%{transform:translateY(60vh)}100%{transform:translateY(-100%)}}'+
      '.cr-big{font-family:\'Syne\',sans-serif;font-size:clamp(1.6rem,5vw,2.4rem);font-weight:800;background:linear-gradient(135deg,#0EB5A0,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.4rem}'+
      '.cr-sub{font-size:0.72rem;color:#6b7c8f;margin-bottom:4rem;letter-spacing:0.06em}'+
      '.cr-sec{font-size:0.55rem;font-weight:700;color:rgba(14,181,160,0.5);letter-spacing:0.2em;text-transform:uppercase;margin:3rem 0 0.8rem;font-family:\'Syne\',sans-serif}'+
      '.cr-item{font-size:0.88rem;color:#9ca3af;margin:0.4rem 0;line-height:1.6}'+
      '.cr-item strong{color:#f0f4f8;font-weight:500}'+
      '.cr-end{margin-top:4rem;font-size:0.7rem;color:#6b7c8f;letter-spacing:0.06em;line-height:2}'+
      '#cred-esc{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);font-size:0.6rem;color:rgba(255,255,255,0.25);letter-spacing:0.1em;font-family:\'DM Sans\',sans-serif;z-index:1000000;pointer-events:none}';
    document.head.appendChild(s);
    var ov=document.createElement('div'); ov.id='cred-ov';
    ov.innerHTML='<div id="cred-inner">'+
      '<div class="cr-big">Sampanna Raj Dhungel</div><div class="cr-sub">Portfolio · '+new Date().getFullYear()+'</div>'+
      '<div class="cr-sec">Design & Direction</div><div class="cr-item"><strong>Concept, Design & Code</strong><br>Sampanna Raj Dhungel · Bhaktapur, Nepal</div>'+
      '<div class="cr-sec">Typography</div><div class="cr-item"><strong>Syne</strong> — headings & display<br><strong>DM Sans</strong> — body & UI</div>'+
      '<div class="cr-sec">Tools</div><div class="cr-item">Figma · Adobe Illustrator · VS Code<br>After Effects · Blender · DaVinci Resolve<br>Adobe Audition · Cubase</div>'+
      '<div class="cr-sec">APIs & Services</div><div class="cr-item"><strong>Formspree</strong> — contact form<br><strong>Last.fm</strong> — now playing badge<br><strong>Sunrise-Sunset.org</strong> — golden hour<br><strong>Plausible</strong> — privacy analytics</div>'+
      '<div class="cr-sec">Fonts from</div><div class="cr-item">Google Fonts</div>'+
      '<div class="cr-sec">Special Thanks</div><div class="cr-item">The clients who trusted the process.<br>The designers who share their work openly.<br>Every recruiter who scrolled past the fold.</div>'+
      '<div class="cr-sec">Coffee Consumed</div><div class="cr-item"><strong>≈ 1,460 cups</strong> and counting ☕</div>'+
      '<div class="cr-end">Made with intention<br>Fueled by curiosity<br>✦</div></div>'+
      '<div id="cred-esc">Esc or click to exit</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function(){ ov.classList.add('show'); });
    function close(){ ov.classList.remove('show'); setTimeout(function(){ ov.remove(); },600); document.removeEventListener('keydown',onKey); }
    function onKey(e){ if(e.key==='Escape') close(); }
    document.addEventListener('keydown',onKey); ov.addEventListener('click',close);
  }
})();


/* ══════════════════════════════════════════════════
   FEATURE 36 — NEPAL CLOCK → YOUR LOCAL TIME
   Hover the Nepal clock for 2 s to reveal
   ══════════════════════════════════════════════════ */
(function(){
  var clockEl=document.getElementById('nepalClock');
  if(!clockEl) return;
  var s=document.createElement('style');
  s.textContent=
    '#clk-tip{position:fixed;background:#0d1117;border:1px solid rgba(14,181,160,0.32);padding:0.45rem 0.9rem;z-index:99990;pointer-events:none;opacity:0;transition:opacity 0.25s,transform 0.25s;transform:translateY(4px)}'+
    '#clk-tip.show{opacity:1;transform:translateY(0)}'+
    '#clk-tip .ct-l{font-size:0.55rem;color:#6b7c8f;letter-spacing:0.06em;margin-bottom:2px}'+
    '#clk-tip .ct-v{font-size:0.78rem;font-weight:700;color:#0EB5A0;font-family:\'Syne\',sans-serif;white-space:nowrap}';
  document.head.appendChild(s);
  var tip=document.createElement('div'); tip.id='clk-tip';
  tip.innerHTML='<div class="ct-l">Your local time</div><div class="ct-v" id="ctv">—</div>';
  document.body.appendChild(tip);
  var hT,iv;
  function pos(){ var r=clockEl.getBoundingClientRect(); tip.style.left=r.left+'px'; tip.style.top=(r.top-54)+'px'; }
  function show(){ pos(); document.getElementById('ctv').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',timeZoneName:'short'}); tip.classList.add('show'); iv=setInterval(function(){ pos(); document.getElementById('ctv').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',timeZoneName:'short'}); },1000); }
  function hide(){ clearTimeout(hT); clearInterval(iv); tip.classList.remove('show'); }
  clockEl.addEventListener('mouseenter',function(){ hT=setTimeout(show,1800); });
  clockEl.addEventListener('mouseleave',hide);
})();


/* ══════════════════════════════════════════════════
   FEATURE 41 — CASE STUDY PROGRESS TRACKER
   Sticky top bar showing which section you're in
   Activates on pages with .cs-section elements
   ══════════════════════════════════════════════════ */
(function(){
  var sections = Array.from(document.querySelectorAll('.cs-section'));
  if(sections.length < 2) return;
  var labels = sections.map(function(s){
    var num = s.querySelector('.cs-section-num');
    return num ? num.textContent.split('—')[0].trim() : '';
  });
  var st=document.createElement('style');
  st.textContent=
    '#cs-tracker{position:fixed;top:0;left:0;right:0;z-index:9998;background:rgba(8,12,16,0.96);border-bottom:1px solid rgba(14,181,160,0.2);backdrop-filter:blur(12px);padding:0.45rem 1.5rem;display:flex;align-items:center;gap:0;overflow-x:auto;transition:transform 0.3s;scrollbar-width:none}'+
    '#cs-tracker::-webkit-scrollbar{display:none}'+
    '#cs-tracker.hidden{transform:translateY(-100%)}'+
    '.cs-step{display:flex;align-items:center;gap:0;flex-shrink:0}'+
    '.cs-step-num{font-size:0.58rem;font-weight:700;letter-spacing:0.08em;color:#6b7c8f;padding:0.3rem 0.7rem;transition:color 0.2s;white-space:nowrap;cursor:pointer}'+
    '.cs-step-num:hover{color:#0EB5A0}'+
    '.cs-step.active .cs-step-num{color:#0EB5A0}'+
    '.cs-step-sep{width:20px;height:1px;background:rgba(255,255,255,0.12);flex-shrink:0}'+
    '.cs-progress-line{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#0EB5A0,#06b6d4);z-index:9999;width:0%;transition:width 0.15s}';
  document.head.appendChild(st);
  /* Progress line */
  var line=document.createElement('div'); line.className='cs-progress-line'; document.body.appendChild(line);
  var bar=document.createElement('div'); bar.id='cs-tracker';
  labels.forEach(function(lbl,i){
    var step=document.createElement('div'); step.className='cs-step'; step.dataset.i=i;
    var num=document.createElement('span'); num.className='cs-step-num'; num.textContent=lbl;
    num.addEventListener('click',function(){ sections[i].scrollIntoView({behavior:'smooth',block:'start'}); });
    step.appendChild(num);
    if(i<labels.length-1){ var sep=document.createElement('span'); sep.className='cs-step-sep'; step.appendChild(sep); }
    bar.appendChild(step);
  });
  document.body.insertBefore(bar, document.body.firstChild);
  /* Push body down */
  document.body.style.paddingTop = (bar.offsetHeight+2)+'px';
  var lastY=0;
  window.addEventListener('scroll',function(){
    var scrollY=window.scrollY;
    /* Show/hide on scroll direction */
    bar.classList.toggle('hidden', scrollY>lastY && scrollY>120);
    lastY=scrollY;
    /* Progress line */
    var pct=scrollY/(document.body.scrollHeight-window.innerHeight)*100;
    line.style.width=Math.min(100,pct)+'%';
    /* Active section */
    var active=0;
    sections.forEach(function(s,i){ if(s.offsetTop-150<=scrollY) active=i; });
    bar.querySelectorAll('.cs-step').forEach(function(st,i){ st.classList.toggle('active',i===active); });
  },{passive:true});
})();


/* FEATURE 37 — SCROLL-TO-TOP BUTTON (removed) */


/* ══════════════════════════════════════════════════
   FEATURE 38 — AUTO READ TIME on blog posts
   Counts words in .blog-body or article, shows
   dynamic read time next to the existing span
   ══════════════════════════════════════════════════ */
(function(){
  if(!/blog-/.test(location.pathname) && !/blog-/.test(location.href)) return;
  var body = document.querySelector('.blog-body, .post-body, .article-body, article');
  if(!body) return;
  var words = body.innerText.trim().split(/\s+/).length;
  var mins = Math.max(1, Math.round(words / 220));
  var spans = document.querySelectorAll('.blog-read, .post-read');
  spans.forEach(function(el){ el.textContent = mins + ' min read'; });
})();


/* ══════════════════════════════════════════════════
   FEATURE 39 — TABLE OF CONTENTS
   Auto-generated from h2/h3 inside .blog-body
   Injected into #toc-target if present, or
   prepended to .blog-body as a floating card
   ══════════════════════════════════════════════════ */
(function(){
  if(!/blog-/.test(location.pathname) && !/blog-/.test(location.href)) return;
  var body = document.querySelector('.blog-body, .post-body');
  if(!body) return;
  var headings = Array.from(body.querySelectorAll('h2,h3'));
  if(headings.length < 3) return;
  /* Ensure each heading has an id */
  headings.forEach(function(h,i){
    if(!h.id) h.id = 'toc-h-' + i;
  });
  var s=document.createElement('style');
  s.textContent=
    '.toc-card{background:rgba(13,17,23,0.8);border:1px solid rgba(14,181,160,0.18);padding:1.25rem 1.5rem;margin-bottom:2rem;border-radius:0}'+
    '.toc-title{font-size:0.62rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0EB5A0;margin-bottom:0.85rem}'+
    '.toc-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.35rem}'+
    '.toc-item a{font-size:0.78rem;color:#8a9eb0;transition:color 0.2s;display:block}'+
    '.toc-item a:hover,.toc-item.active a{color:#0EB5A0}'+
    '.toc-item.h3 a{padding-left:1rem;font-size:0.73rem}';
  document.head.appendChild(s);
  var ul = document.createElement('ul'); ul.className='toc-list';
  headings.forEach(function(h){
    var li=document.createElement('li'); li.className='toc-item'+(h.tagName==='H3'?' h3':'');
    li.innerHTML='<a href="#'+h.id+'">'+h.textContent+'</a>'; ul.appendChild(li);
  });
  var card=document.createElement('div'); card.className='toc-card';
  card.innerHTML='<div class="toc-title">In this article</div>';
  card.appendChild(ul);
  var target = document.getElementById('toc-target') || body;
  if(document.getElementById('toc-target')){ target.appendChild(card); }
  else { body.insertBefore(card, body.firstChild); }
  /* Active highlight on scroll */
  window.addEventListener('scroll',function(){
    var scrollY=window.scrollY+120;
    headings.forEach(function(h,i){
      var next=headings[i+1];
      var inView = h.offsetTop <= scrollY && (!next || next.offsetTop > scrollY);
      ul.querySelectorAll('.toc-item')[i].classList.toggle('active',inView);
    });
  },{passive:true});
})();


/* ══════════════════════════════════════════════════
   FEATURE 40 — BLOG POST EMOJI REACTIONS
   Adds 👏 ❤️ 🤯 reaction buttons at the end of
   each blog post via .blog-reactions placeholder
   ══════════════════════════════════════════════════ */
(function(){
  var wrap = document.getElementById('blogReactions');
  if(!wrap) return;
  var slug = location.pathname.split('/').pop().replace('.html','') || 'blog-post';
  var emojis = ['👏','❤️','🤯','💡'];
  var labels = ['Clap','Love','Mind blown','Useful'];
  var s=document.createElement('style');
  s.textContent=
    '.react-row{display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem}'+
    '.react-btn{display:inline-flex;align-items:center;gap:0.45rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);padding:0.45rem 1rem;cursor:pointer;font-size:0.78rem;color:#8a9eb0;transition:background 0.2s,border-color 0.2s,color 0.2s;border-radius:999px}'+
    '.react-btn:hover{background:rgba(14,181,160,0.1);border-color:rgba(14,181,160,0.35);color:#0EB5A0}'+
    '.react-btn.reacted{background:rgba(14,181,160,0.12);border-color:rgba(14,181,160,0.4);color:#0EB5A0}'+
    '.react-count{font-weight:700}'+
    '.react-lbl{font-size:0.65rem;letter-spacing:0.04em}';
  document.head.appendChild(s);
  var title=document.createElement('div'); title.style.cssText='font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8f;margin-bottom:0.5rem'; title.textContent='Was this helpful?';
  wrap.appendChild(title);
  var row=document.createElement('div'); row.className='react-row'; wrap.appendChild(row);
  var stored = JSON.parse(localStorage.getItem('reactions-'+slug)||'{}');
  emojis.forEach(function(em,i){
    var key=slug+'-'+i;
    var btn=document.createElement('button'); btn.className='react-btn'+(stored[i]?' reacted':''); btn.setAttribute('aria-label',labels[i]);
    btn.innerHTML='<span>'+em+'</span><span class="react-count" id="rc-'+i+'">—</span><span class="react-lbl">'+labels[i]+'</span>';
    fetch('https://api.countapi.xyz/get/sampannadhungel.com.np/'+key).then(function(r){return r.json();}).then(function(d){ var el=document.getElementById('rc-'+i); if(el&&d.value!=null) el.textContent=d.value; }).catch(function(){});
    btn.addEventListener('click',function(){
      if(stored[i]) return;
      stored[i]=true; localStorage.setItem('reactions-'+slug, JSON.stringify(stored));
      btn.classList.add('reacted');
      fetch('https://api.countapi.xyz/hit/sampannadhungel.com.np/'+key).then(function(r){return r.json();}).then(function(d){ var el=document.getElementById('rc-'+i); if(el&&d.value!=null) el.textContent=d.value; }).catch(function(){});
    });
    row.appendChild(btn);
  });
})();
