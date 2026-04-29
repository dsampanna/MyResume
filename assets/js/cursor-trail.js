/* Cursor Trail Particles — section-aware colours + scroll-speed burst */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:99994;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var W = canvas.width  = window.innerWidth;
  var H = canvas.height = window.innerHeight;
  window.addEventListener('resize', function(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  /* RGB for each section */
  var COLORS = {
    hero:       [14,  181, 160],   /* teal        */
    work:       [80,  210, 255],   /* cyan-blue   */
    about:      [180, 130, 255],   /* soft purple */
    skills:     [255, 185, 70 ],   /* amber       */
    education:  [255, 140, 100],   /* peach       */
    experience: [255, 120, 100],   /* warm red    */
    blog:       [80,  215, 145],   /* green       */
    services:   [255, 180, 80 ],   /* amber       */
    contact:    [20,  225, 195],   /* bright teal */
    _default:   [14,  181, 160]
  };

  var cur = COLORS._default.slice();
  var tgt = COLORS._default.slice();

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && COLORS[e.target.id])
          tgt = COLORS[e.target.id].slice();
      });
    }, {threshold: 0.25});
    Object.keys(COLORS).forEach(function(id){
      if(id === '_default') return;
      var el = document.getElementById(id);
      if(el) io.observe(el);
    });
  }

  var particles = [];
  var mx = W / 2, my = H / 2;

  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    cur = cur.map(function(c,i){ return Math.round(c + (tgt[i]-c)*0.06); });
    for(var i=0; i<4; i++){
      particles.push({
        x:e.clientX, y:e.clientY,
        vx:(Math.random()-0.5)*2.5,
        vy:(Math.random()-0.5)*2.5-0.5,
        life:1, r:Math.random()*3+1,
        rgb:cur.slice()
      });
    }
  });

  /* ── Scroll-speed burst ── */
  var lastScrollY = window.scrollY;
  var scrollVel   = 0;
  window.addEventListener('scroll', function(){
    var now = window.scrollY;
    scrollVel = Math.abs(now - lastScrollY);
    lastScrollY = now;
  }, {passive: true});

  (function frame(){
    ctx.clearRect(0, 0, W, H);

    /* Emit extra particles based on scroll velocity */
    if(scrollVel > 6){
      var burst  = Math.min(Math.floor(scrollVel / 7), 14);
      var bright = Math.min(1, scrollVel / 50);
      for(var b = 0; b < burst; b++){
        var rc = cur.map(function(c){
          return Math.min(255, Math.round(c * (0.8 + bright * 0.5)));
        });
        particles.push({
          x: mx + (Math.random()-0.5)*30,
          y: my + (Math.random()-0.5)*30,
          vx:(Math.random()-0.5)*5,
          vy:(Math.random()-0.5)*5,
          life: 0.5 + bright * 0.5,
          r:   Math.random()*4+1.5,
          rgb: rc
        });
      }
      scrollVel *= 0.80; /* velocity decay per frame */
    }

    particles = particles.filter(function(p){
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.038; p.r *= 0.96;
      if(p.life <= 0) return false;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(p.r, 0), 0, Math.PI*2);
      ctx.fillStyle = 'rgba('+p.rgb[0]+','+p.rgb[1]+','+p.rgb[2]+','+p.life.toFixed(2)+')';
      ctx.fill();
      return true;
    });
    requestAnimationFrame(frame);
  })();
})();
