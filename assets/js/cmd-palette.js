/* ── COMMAND PALETTE — standalone, works on every page ── */
(function(){

  /* ── Inject CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '.cmd-overlay{position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,0.72);',
    'backdrop-filter:blur(8px);display:flex;align-items:flex-start;justify-content:center;',
    'padding-top:12vh;opacity:0;pointer-events:none;transition:opacity 0.2s}',
    '.cmd-overlay.open{opacity:1;pointer-events:auto}',
    '.cmd-box{width:100%;max-width:560px;margin:0 1rem;',
    'background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:14px;',
    'overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.6),0 0 0 1px rgba(14,181,160,0.1);',
    'transform:translateY(-12px) scale(0.97);transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1)}',
    '.cmd-overlay.open .cmd-box{transform:translateY(0) scale(1)}',
    '.cmd-search-row{display:flex;align-items:center;gap:0.75rem;padding:1rem 1.25rem;',
    'border-bottom:1px solid rgba(255,255,255,0.07)}',
    '.cmd-search-icon{color:#6b7c8f;flex-shrink:0}',
    '.cmd-input{flex:1;background:none;border:none;outline:none;color:#f0f4f8;',
    'font-size:0.95rem;font-family:inherit}',
    ".cmd-input::placeholder{color:#6b7c8f}",
    '.cmd-esc-badge{font-size:0.62rem;background:rgba(255,255,255,0.06);',
    'border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:0.15rem 0.45rem;',
    'color:#6b7c8f;flex-shrink:0;white-space:nowrap;font-family:inherit}',
    '.cmd-list{list-style:none;max-height:310px;overflow-y:auto;padding:0.4rem;',
    'scrollbar-width:thin;scrollbar-color:rgba(14,181,160,0.4) transparent}',
    '.cmd-item{display:flex;align-items:center;gap:0.75rem;padding:0.7rem 0.9rem;',
    'border-radius:8px;cursor:pointer;transition:background 0.12s}',
    '.cmd-item.active{background:rgba(14,181,160,0.1)}',
    '.cmd-item:hover{background:rgba(14,181,160,0.08)}',
    '.cmd-item-icon{font-size:1rem;width:1.5rem;text-align:center;flex-shrink:0}',
    '.cmd-item-body{display:flex;flex-direction:column;gap:0.1rem}',
    '.cmd-item-label{font-size:0.85rem;font-weight:500;color:#f0f4f8}',
    '.cmd-item-sub{font-size:0.7rem;color:#6b7c8f}',
    '.cmd-footer-row{display:flex;gap:1.5rem;align-items:center;padding:0.6rem 1.25rem;',
    'border-top:1px solid rgba(255,255,255,0.07);font-size:0.65rem;color:#6b7c8f}',
    '.cmd-footer-row kbd{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.07);',
    'border-radius:3px;padding:0.1rem 0.3rem;margin-right:0.15rem;font-size:0.6rem;',
    'font-family:inherit;color:#f0f4f8}',
    '#cmdSigCanvas{position:fixed;bottom:2rem;right:2rem;z-index:99998;pointer-events:none;',
    'opacity:0;transition:opacity 0.4s ease;border-radius:4px}',
  ].join('');
  document.head.appendChild(style);

  /* ── Inject HTML ── */
  var overlay = document.createElement('div');
  overlay.id = 'cmdOverlay';
  overlay.className = 'cmd-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label','Command palette');
  overlay.innerHTML = [
    '<div class="cmd-box">',
      '<div class="cmd-search-row">',
        '<svg class="cmd-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none"',
        ' stroke="currentColor" stroke-width="2" stroke-linecap="round">',
        '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        '<input type="text" id="cmdInput" class="cmd-input"',
        ' placeholder="Jump to section or action…" autocomplete="off" spellcheck="false">',
        '<span class="cmd-esc-badge">ESC</span>',
      '</div>',
      '<ul class="cmd-list" id="cmdList" role="listbox"></ul>',
      '<div class="cmd-footer-row">',
        '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>',
        '<span><kbd>↵</kbd> select</span>',
        '<span><kbd>Ctrl K</kbd> toggle</span>',
      '</div>',
    '</div>',
  ].join('');
  document.body.appendChild(overlay);

  var input = document.getElementById('cmdInput');
  var list  = document.getElementById('cmdList');

  /* ── Helpers ── */
  function sec(id){
    var el = document.getElementById(id);
    if(el){ el.scrollIntoView({behavior:'smooth'}); }
    else  { window.location.href = 'index.html#' + id; }
  }
  function nav(url){ window.location.href = url; }

  function toast(msg){
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:5rem;right:2rem;z-index:99999;background:#0EB5A0;color:#000;font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:0.5rem 1.1rem;border-radius:6px;opacity:0;transform:translateY(8px);transition:opacity 0.22s,transform 0.22s;pointer-events:none';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ t.style.opacity='1'; t.style.transform='translateY(0)'; }); });
    setTimeout(function(){ t.style.opacity='0'; t.style.transform='translateY(8px)'; setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); },300); },2500);
  }

  function copyText(text, msg){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ toast(msg); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(msg); } catch(e){}
      document.body.removeChild(ta);
    }
  }

  function getNepalTime(){
    var now = new Date();
    var nst = new Date(now.getTime() + now.getTimezoneOffset()*60000 + (5*60+45)*60000);
    var h = nst.getHours(), m = nst.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m<10?'0':'') + m + ' ' + ap + ' NST';
  }

  function toggleGrain(){
    var g = document.getElementById('grainOverlay');
    if(!g) return;
    g._off = !g._off;
    g.style.opacity = g._off ? '0' : '0.038';
    toast(g._off ? '🌾 Grain off' : '🌾 Grain on');
  }

  /* ── Font size toggle ── */
  var _fontBig = false;
  function toggleFontSize(){
    _fontBig = !_fontBig;
    document.documentElement.style.fontSize = _fontBig ? '19px' : '';
    toast(_fontBig ? '🔡 Font enlarged' : '🔡 Font reset');
  }

  /* ── Language toggle (Nepali) ── */
  var _nepali = false;
  var NP_MAP = {
    'Featured Work':'फिचर्ड काम','About Me':'मेरो बारेमा','Skills':'सीपहरू',
    'Experience':'अनुभव','Blog':'ब्लग','Contact':'सम्पर्क','Download Resume':'रेज्युमे डाउनलोड',
    'Home':'गृहपृष्ठ','View Portfolio':'पोर्टफोलियो हेर्नुस्','Services':'सेवाहरू',
    'Copy email':'इमेल प्रतिलिपि','Open WhatsApp':'ह्वाट्सएप खोल्नुस्',
    'Surprise me':'अचम्म पार्नुस्','Back to top':'माथि जानुस्',
    'Copy page URL':'URL प्रतिलिपि','Toggle grain':'ग्रेन टगल','Print page':'पृष्ठ प्रिन्ट',
    'Nepal time':'नेपाल समय','Increase font size':'फन्ट ठुलो','Switch language':'भाषा फेर्नुस्',
    'High contrast':'उच्च कन्ट्रास्ट','Copy phone':'फोन प्रतिलिपि',
    'Open email draft':'इमेल ड्राफ्ट','Schedule a call':'कल तालिका',
    'Sitemap':'साइटम्याप','Portfolio stats':'पोर्टफोलियो तथ्याङ्क',
    'Last updated':'अन्तिम अपडेट','Sign the page':'हस्ताक्षर','Reel mode':'रिल मोड'
  };
  function toggleLanguage(){
    _nepali = !_nepali;
    list.querySelectorAll('.cmd-item-label').forEach(function(el){
      var eng = el.dataset.eng || el.textContent;
      if(!el.dataset.eng) el.dataset.eng = eng;
      el.textContent = _nepali ? (NP_MAP[eng] || eng) : eng;
    });
    toast(_nepali ? '🌐 नेपाली मोड' : '🌐 English mode');
  }

  /* ── High contrast toggle ── */
  var _hiContrast = false;
  var _hcStyle = null;
  function toggleHighContrast(){
    _hiContrast = !_hiContrast;
    if(_hiContrast){
      _hcStyle = document.createElement('style');
      _hcStyle.id = 'cmdHcStyle';
      _hcStyle.textContent = ':root{--teal:#00ffe0!important;--cyan:#00ffff!important}' +
        'body{background:#000!important;color:#fff!important}' +
        'p,span,li,a,h1,h2,h3,h4,h5,h6{color:#fff!important}' +
        'a{text-decoration:underline!important}';
      document.head.appendChild(_hcStyle);
      toast('♿ High contrast on');
    } else {
      if(_hcStyle && _hcStyle.parentNode) _hcStyle.parentNode.removeChild(_hcStyle);
      _hcStyle = null;
      toast('♿ High contrast off');
    }
  }

  /* ── Sign the page ── */
  function signPage(){
    var existing = document.getElementById('cmdSigCanvas');
    if(existing && existing.parentNode) existing.parentNode.removeChild(existing);
    var c = document.createElement('canvas');
    c.id = 'cmdSigCanvas';
    c.width = 260; c.height = 90;
    document.body.appendChild(c);
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function(){
      var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, 260, 90);
      var d = ctx.getImageData(0, 0, 260, 90);
      for(var i=0; i<d.data.length; i+=4){
        var lum = 0.299*d.data[i]+0.587*d.data[i+1]+0.114*d.data[i+2];
        var a = d.data[i+3];
        if(a > 30 && lum < 200){
          d.data[i]=14; d.data[i+1]=181; d.data[i+2]=160;
        } else {
          d.data[i+3]=0;
        }
      }
      ctx.putImageData(d, 0, 0);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ c.style.opacity='1'; }); });
      setTimeout(function(){
        c.style.opacity='0';
        setTimeout(function(){ if(c.parentNode) c.parentNode.removeChild(c); },450);
      },3500);
    };
    img.onerror = function(){ toast('🖋️ Signature loaded!'); };
    img.src = (function(){
      var s = document.querySelector('script[src*="cmd-palette"]');
      if(s){ return s.src.replace(/assets\/js\/cmd-palette\.js.*/,'assets/img/signature.png'); }
      return 'assets/img/signature.png';
    })();
    toast('🖋️ Signed!');
  }

  /* ── Reel mode (auto-advance carousel) ── */
  var _reelTimer = null;
  function toggleReel(){
    if(_reelTimer){
      clearInterval(_reelTimer);
      _reelTimer = null;
      toast('🎬 Reel mode off');
    } else {
      var btn = document.getElementById('pcNext') || document.querySelector('[id*="Next"]');
      if(!btn){ toast('🎬 No carousel found'); return; }
      _reelTimer = setInterval(function(){ btn.click(); }, 2500);
      toast('🎬 Reel mode on — ESC to stop');
    }
  }

  /* ── Sitemap drill-down ── */
  var _inSitemap = false;
  var SITEMAP_ITEMS = [
    {icon:'◀', label:'← Back',               sub:'return to main menu',       go:function(){ _inSitemap=false; render(input.value); }},
    {icon:'🏠', label:'Home',                 sub:'index.html',                go:function(){ nav('index.html'); }},
    {icon:'🖼️', label:'Portfolio',           sub:'portfolio.html',            go:function(){ nav('portfolio.html'); }},
    {icon:'🛠️', label:'Services',            sub:'services.html',             go:function(){ nav('services.html'); }},
    {icon:'✍️', label:'Blog',               sub:'blog.html',                  go:function(){ nav('blog.html'); }},
    {icon:'📝', label:'Blog · Brand Identity',sub:'blog-brand-identity.html',  go:function(){ nav('blog-brand-identity.html'); }},
    {icon:'📝', label:'Blog · Freelancing',  sub:'blog-freelancing-nepal.html',go:function(){ nav('blog-freelancing-nepal.html'); }},
    {icon:'📝', label:'Blog · Sound Design', sub:'blog-sound-design.html',     go:function(){ nav('blog-sound-design.html'); }},
    {icon:'📝', label:'Blog · UX Process',   sub:'blog-ux-process.html',       go:function(){ nav('blog-ux-process.html'); }},
    {icon:'📝', label:'Blog · Pricing',      sub:'blog-pricing.html',          go:function(){ nav('blog-pricing.html'); }},
    {icon:'📝', label:'Blog · 3D Animation', sub:'blog-3d-animation.html',     go:function(){ nav('blog-3d-animation.html'); }},
    {icon:'🌿', label:'Case Study · Griham', sub:'project.html?id=griham-organic', go:function(){ nav('project.html?id=griham-organic'); }},
    {icon:'🏔️', label:'Case Study · Himaltrek',sub:'project.html?id=himaltrek-nepal',go:function(){ nav('project.html?id=himaltrek-nepal'); }},
  ];

  function openSitemap(){
    _inSitemap = true;
    input.value = '';
    renderSitemap();
    input.placeholder = 'Search pages…';
  }

  function renderSitemap(){
    var q = (input.value||'').toLowerCase();
    var src = q ? SITEMAP_ITEMS.filter(function(it,i){
      if(i===0) return true; // always show Back
      return it.label.toLowerCase().indexOf(q)!==-1 || it.sub.toLowerCase().indexOf(q)!==-1;
    }) : SITEMAP_ITEMS;
    list.innerHTML = src.map(function(it,i){
      return '<li class="cmd-item'+(i===0?' active':'')+'" data-i="'+i+'" data-sitemap="1">' +
        '<span class="cmd-item-icon">'+it.icon+'</span>' +
        '<div class="cmd-item-body"><span class="cmd-item-label">'+it.label+'</span>' +
        '<span class="cmd-item-sub">'+it.sub+'</span></div></li>';
    }).join('');
    active = 0;
    _sitemapFiltered = src;
  }
  var _sitemapFiltered = SITEMAP_ITEMS.slice();

  /* ── Logo easter egg — triple-click nav signature ── */
  (function(){
    var mark = document.querySelector('.nav-logo-mark');
    if(!mark) return;
    var clicks=0, timer=null;
    mark.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(function(){ clicks=0; }, 700);
      if(clicks >= 3){
        clicks=0; clearTimeout(timer);
        var tip = document.createElement('div');
        tip.style.cssText='position:fixed;top:68px;left:16px;z-index:99999;background:#0d1117;border:1px solid rgba(14,181,160,0.3);border-radius:12px;padding:1rem 1.3rem;max-width:270px;font-size:0.77rem;color:#f0f4f8;line-height:1.55;box-shadow:0 12px 40px rgba(0,0,0,0.6);animation:fadeInUp 0.25s ease';
        tip.innerHTML='<div style="color:#0EB5A0;font-weight:700;font-size:0.85rem;margin-bottom:0.4rem">🥚 Easter egg found!</div>This is my actual handwritten signature — drawn with a brush pen, scanned, and colourised to teal in real-time using canvas pixel processing.<div style="margin-top:0.55rem;font-size:0.63rem;color:#6b7c8f;letter-spacing:0.05em">CLICK ANYWHERE TO CLOSE</div>';
        document.body.appendChild(tip);
        var close=function(){ tip.parentNode&&tip.parentNode.removeChild(tip); document.removeEventListener('click',close); };
        setTimeout(function(){ document.addEventListener('click',close,{once:true}); },50);
      }
    });
  })();

  var SURPRISES = [
    'blog-brand-identity.html','blog-freelancing-nepal.html','blog-sound-design.html',
    'blog-ux-process.html','blog-pricing.html','blog-3d-animation.html',
    'project.html?id=griham-organic','project.html?id=himaltrek-nepal',
    'project.html?id=old-man-smoking','project.html?id=city-motion',
    'project.html?id=pepsi-logo-reveal','project.html?id=araniko-fc',
  ];

  /* ── Items ── */
  var ALL = [
    /* Navigation */
    {icon:'🎨', label:'Featured Work',    sub:'scroll to carousel',        go:function(){ sec('work'); }},
    {icon:'👤', label:'About Me',         sub:'who I am',                  go:function(){ sec('about'); }},
    {icon:'⚡', label:'Skills',           sub:'tools & expertise',         go:function(){ sec('skills'); }},
    {icon:'💼', label:'Experience',       sub:'career history',            go:function(){ sec('experience'); }},
    {icon:'✍️', label:'Blog',            sub:'articles',                  go:function(){ sec('blog'); }},
    {icon:'📬', label:'Contact',         sub:'get in touch',              go:function(){ sec('contact'); }},
    {icon:'📄', label:'Download Resume', sub:'PDF download',              go:function(){ window.open('assets/files/SampannaRajDhungel_Résumé.pdf','_blank'); }},
    {icon:'🏠', label:'Home',            sub:'back to index',             go:function(){ nav('index.html'); }},
    {icon:'🖼️', label:'View Portfolio', sub:'all 45+ projects',          go:function(){ nav('portfolio.html'); }},
    {icon:'🛠️', label:'Services',       sub:'what I offer',              go:function(){ nav('services.html'); }},
    /* ── Actions ── */
    {icon:'📋', label:'Copy email',      sub:'sampannadhungel@gmail.com', go:function(){ copyText('sampannadhungel@gmail.com','✓ Email copied!'); }},
    {icon:'💬', label:'Open WhatsApp',   sub:'quick response guaranteed', go:function(){ window.open('https://wa.me/9779861487026','_blank'); }},
    {icon:'🎲', label:'Surprise me',     sub:'random blog or project',    go:function(){ nav(SURPRISES[Math.floor(Math.random()*SURPRISES.length)]); }},
    {icon:'🔝', label:'Back to top',     sub:'scroll to top of page',     go:function(){ window.scrollTo({top:0,behavior:'smooth'}); }},
    {icon:'🔗', label:'Copy page URL',   sub:'share this page',           go:function(){ copyText(window.location.href,'✓ URL copied!'); }},
    {icon:'🌾', label:'Toggle grain',    sub:'film grain overlay on/off', go:function(){ toggleGrain(); }},
    {icon:'🖨️', label:'Print page',     sub:'save as PDF',               go:function(){ setTimeout(window.print.bind(window),200); }},
    {icon:'⏱️', label:'Nepal time',     sub:'current time in NST',       go:function(){ toast('🕐 ' + getNepalTime()); }},
    /* ── New unique commands ── */
    {icon:'🔡', label:'Increase font size', sub:'toggle larger text for readability', go:function(){ toggleFontSize(); }},
    {icon:'🌐', label:'Switch language',    sub:'toggle Nepali / English labels',     go:function(){ toggleLanguage(); }},
    {icon:'♿', label:'High contrast',      sub:'boost contrast for accessibility',   go:function(){ toggleHighContrast(); }},
    {icon:'📞', label:'Copy phone',         sub:'+977 9861487026',                   go:function(){ copyText('+977 9861487026','✓ Number copied!'); }},
    {icon:'✉️', label:'Open email draft',  sub:'pre-filled message to Sampanna',    go:function(){ window.open('mailto:sampannadhungel@gmail.com?subject=Hi%20Sampanna%20%E2%80%94%20Let%27s%20work%20together&body=Hi%20Sampanna%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.%0A%0AThanks%2C','_blank'); }},
    {icon:'📅', label:'Schedule a call',    sub:'WhatsApp with meeting request',      go:function(){ window.open('https://wa.me/9779861487026?text=Hi%20Sampanna!%20I%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20a%20project.%20When%20are%20you%20available%3F','_blank'); }},
    {icon:'🗺️', label:'Sitemap',           sub:'browse all pages',                   go:function(){ openSitemap(); }},
    {icon:'📊', label:'Portfolio stats',    sub:'projects · clients · years',         go:function(){ toast('📊 45+ projects · 30+ clients · 7+ yrs'); }},
    {icon:'🕐', label:'Last updated',       sub:'when this portfolio was refreshed',  go:function(){ toast('🕐 Last updated: April 2026'); }},
    {icon:'🖋️', label:'Sign the page',     sub:'teal signature appears bottom-right',go:function(){ signPage(); }},
    {icon:'🎬', label:'Reel mode',          sub:'auto-advance carousel every 2.5s',   go:function(){ toggleReel(); }},
  ];

  var filtered = ALL.slice(), active = 0;

  function render(q){
    if(_inSitemap){ renderSitemap(); return; }
    input.placeholder = 'Jump to section or action…';
    q = (q||'').toLowerCase();
    filtered = ALL.filter(function(it){
      return !q || it.label.toLowerCase().indexOf(q)!==-1 || it.sub.toLowerCase().indexOf(q)!==-1;
    });
    list.innerHTML = filtered.map(function(it,i){
      return '<li class="cmd-item'+(i===0?' active':'')+'" data-i="'+i+'">' +
        '<span class="cmd-item-icon">'+it.icon+'</span>' +
        '<div class="cmd-item-body"><span class="cmd-item-label">'+it.label+'</span>' +
        '<span class="cmd-item-sub">'+it.sub+'</span></div></li>';
    }).join('');
    active = 0;
    /* re-apply language labels if Nepali is active */
    if(_nepali){
      list.querySelectorAll('.cmd-item-label').forEach(function(el){
        var eng = el.textContent;
        el.dataset.eng = eng;
        el.textContent = NP_MAP[eng] || eng;
      });
    }
  }

  function setActive(n){
    var src = _inSitemap ? _sitemapFiltered : filtered;
    active = Math.max(0, Math.min(n, src.length-1));
    list.querySelectorAll('.cmd-item').forEach(function(el,i){ el.classList.toggle('active',i===active); });
    var el = list.querySelector('.cmd-item.active');
    if(el) el.scrollIntoView({block:'nearest'});
  }

  function pick(){
    var src = _inSitemap ? _sitemapFiltered : filtered;
    if(src[active]){ var it=src[active]; if(!_inSitemap) close(); it.go(); }
  }
  function open(){ overlay.classList.add('open'); input.value=''; _inSitemap=false; render(''); setTimeout(function(){ input.focus(); },40); }
  function close(){ overlay.classList.remove('open'); _inSitemap=false; input.placeholder='Jump to section or action…'; }

  /* ── Event listeners ── */
  document.addEventListener('keydown', function(e){
    if((e.ctrlKey||e.metaKey) && e.key==='k'){ e.preventDefault(); overlay.classList.contains('open') ? close() : open(); return; }
    if(!overlay.classList.contains('open')) return;
    if(e.key==='Escape'){
      if(_inSitemap){ _inSitemap=false; input.value=''; render(''); }
      else { close(); }
    }
    else if(e.key==='ArrowDown'){ e.preventDefault(); setActive(active+1); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); setActive(active-1); }
    else if(e.key==='Enter'){ e.preventDefault(); pick(); }
  });
  overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
  input.addEventListener('input', function(){ render(this.value); });
  list.addEventListener('click', function(e){
    var li = e.target.closest('.cmd-item');
    if(!li) return;
    active = parseInt(li.dataset.i,10);
    if(li.dataset.sitemap){
      var it = _sitemapFiltered[active];
      if(it) it.go();
    } else {
      pick();
    }
  });

})();
