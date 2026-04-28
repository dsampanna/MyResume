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

  /* ── Navigation helpers ── */
  /* If section exists on this page → scroll; otherwise go to index.html#id */
  function sec(id){
    var el = document.getElementById(id);
    if(el){ el.scrollIntoView({behavior:'smooth'}); }
    else  { window.location.href = 'index.html#' + id; }
  }
  function nav(url){ window.location.href = url; }

  /* ── Items ── */
  var ALL = [
    {icon:'🎨', label:'Featured Work',    sub:'scroll to carousel',  go:function(){ sec('work'); }},
    {icon:'👤', label:'About Me',         sub:'who I am',            go:function(){ sec('about'); }},
    {icon:'⚡', label:'Skills',           sub:'tools & expertise',   go:function(){ sec('skills'); }},
    {icon:'💼', label:'Experience',       sub:'career history',      go:function(){ sec('experience'); }},
    {icon:'✍️', label:'Blog',            sub:'articles',            go:function(){ sec('blog'); }},
    {icon:'📬', label:'Contact',         sub:'get in touch',        go:function(){ sec('contact'); }},
    {icon:'📄', label:'Download Resume', sub:'PDF download',        go:function(){ window.open('assets/files/SampannaRajDhungel_Résumé.pdf','_blank'); }},
    {icon:'🏠', label:'Home',            sub:'back to index',       go:function(){ nav('index.html'); }},
    {icon:'🖼️', label:'View Portfolio', sub:'all 45+ projects',    go:function(){ nav('portfolio.html'); }},
    {icon:'🛠️', label:'Services',       sub:'what I offer',        go:function(){ nav('services.html'); }},
  ];

  var filtered = ALL.slice(), active = 0;

  function render(q){
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
  }

  function setActive(n){
    active = Math.max(0, Math.min(n, filtered.length-1));
    list.querySelectorAll('.cmd-item').forEach(function(el,i){ el.classList.toggle('active',i===active); });
    var el = list.querySelector('.cmd-item.active');
    if(el) el.scrollIntoView({block:'nearest'});
  }

  function pick(){ if(filtered[active]){ close(); filtered[active].go(); } }
  function open(){ overlay.classList.add('open'); input.value=''; render(''); setTimeout(function(){ input.focus(); },40); }
  function close(){ overlay.classList.remove('open'); }

  /* ── Event listeners ── */
  document.addEventListener('keydown', function(e){
    if((e.ctrlKey||e.metaKey) && e.key==='k'){ e.preventDefault(); overlay.classList.contains('open') ? close() : open(); return; }
    if(!overlay.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowDown'){ e.preventDefault(); setActive(active+1); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); setActive(active-1); }
    else if(e.key==='Enter'){ e.preventDefault(); pick(); }
  });
  overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
  input.addEventListener('input', function(){ render(this.value); });
  list.addEventListener('click', function(e){
    var li = e.target.closest('.cmd-item');
    if(!li) return;
    active = parseInt(li.dataset.i,10); pick();
  });

})();
