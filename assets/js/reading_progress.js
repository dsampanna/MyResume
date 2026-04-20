// Reading Progress Bar — add to all 3 blog article pages
(function() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed;top:0;left:0;height:3px;width:0%;z-index:99999;
    pointer-events:none;
    background:linear-gradient(90deg,#f5c518,#0563bb,#f5c518);
    background-size:200% 100%;
    animation:readShimmer 2s linear infinite;
    transition:width 0.1s ease;
  `;
  document.head.insertAdjacentHTML('beforeend',
    '<style>@keyframes readShimmer{0%{background-position:0% 0%}100%{background-position:200% 0%}}</style>'
  );
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    const d = document.documentElement;
    const pct = (d.scrollTop || document.body.scrollTop) / (d.scrollHeight - d.clientHeight);
    bar.style.width = Math.min(100, pct * 100) + '%';
  });
})();
