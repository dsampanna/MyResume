/* Scroll Reveal — fades/slides elements in as they enter the viewport.
   Add data-reveal to any element. Optional:
     data-reveal-delay="150"   (ms, 0-600)
     data-reveal-dir="up|down|left|right"  (default: up) */
(function(){
  if(!('IntersectionObserver' in window)) {
    /* Fallback: show everything immediately on old browsers */
    document.querySelectorAll('[data-reveal]').forEach(function(el){
      el.classList.add('revealed');
    });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.dataset.revealDelay, 10) || 0;
      setTimeout(function(){ el.classList.add('revealed'); }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function(el){
    io.observe(el);
  });
})();
