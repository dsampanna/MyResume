/* Text Scramble Decoder — included on every page
   Triggers on .sec-label when scrolled into view,
   and on nav links on hover.                       */
(function(){
  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?!';

  function ScrambleText(el){
    var original = el.dataset.scrambleOriginal;
    if(!original){
      original = el.textContent.trim();
      el.dataset.scrambleOriginal = original;
    }
    var frame = 0;
    var speed = 3;          /* resolve one char every N frames */
    var resolved = 0;
    var raf;

    function tick(){
      var out = '';
      for(var i = 0; i < original.length; i++){
        if(original[i] === ' '){
          out += ' ';
        } else if(i < resolved){
          out += original[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = out;
      frame++;
      if(frame % speed === 0) resolved++;
      if(resolved <= original.length){
        raf = requestAnimationFrame(tick);
      } else {
        el.textContent = original;
      }
    }

    if(raf) cancelAnimationFrame(raf);
    resolved = 0; frame = 0;
    tick();
  }

  /* ── Section labels: decode on scroll into view ── */
  var labels = document.querySelectorAll('.sec-label, [data-scramble]');
  if(labels.length && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          ScrambleText(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    labels.forEach(function(el){ io.observe(el); });
  }

  /* ── Nav links: decode on hover ── */
  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function(el){
    /* store original so dropdown toggle arrow survives */
    el.dataset.scrambleOriginal = el.textContent.trim();
    el.addEventListener('mouseenter', function(){ ScrambleText(el); });
  });
})();
