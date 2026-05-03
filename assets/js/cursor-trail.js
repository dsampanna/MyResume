/* Cursor Trail — Design words drift and fade from the cursor position */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;

  var WORDS = [
    'type','grid','space','rhythm','form',
    'color','flow','light','shape','line',
    'idea','make','craft','print','bold',
    'align','scale','white','black','curve'
  ];

  /* Section-aware tint colours (RGB) */
  var COLORS = {
    hero:       [14,  181, 160],
    work:       [80,  210, 255],
    about:      [180, 130, 255],
    skills:     [255, 185, 70 ],
    education:  [255, 140, 100],
    experience: [255, 120, 100],
    blog:       [80,  215, 145],
    services:   [255, 180, 80 ],
    contact:    [20,  225, 195],
    _default:   [14,  181, 160]
  };

  var curRGB = COLORS._default.slice();
  var tgtRGB = COLORS._default.slice();

  /* Track current section via IntersectionObserver */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && COLORS[e.target.id])
          tgtRGB = COLORS[e.target.id].slice();
      });
    }, {threshold: 0.25});
    Object.keys(COLORS).forEach(function(id){
      if(id === '_default') return;
      var el = document.getElementById(id);
      if(el) io.observe(el);
    });
  }

  /* Canvas overlay */
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:99994;';
  document.body.appendChild(canvas);
  var ctx2d = canvas.getContext('2d');
  var W = canvas.width  = window.innerWidth;
  var H = canvas.height = window.innerHeight;
  window.addEventListener('resize', function(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  var particles = [];
  var wordIdx   = 0;
  var frameCount = 0;

  /* Emit a word particle every N mousemove events */
  var moveCount = 0;
  document.addEventListener('mousemove', function(e){
    /* Lerp colour toward target */
    curRGB = curRGB.map(function(c, i){
      return Math.round(c + (tgtRGB[i] - c) * 0.05);
    });

    moveCount++;
    if(moveCount % 7 !== 0) return; /* throttle: 1 word per 7 moves */

    var word = WORDS[wordIdx % WORDS.length];
    wordIdx++;

    particles.push({
      word: word,
      x: e.clientX + (Math.random() - 0.5) * 18,
      y: e.clientY + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(0.35 + Math.random() * 0.5),  /* drift upward */
      alpha: 0.0,
      fadeIn: true,
      size: 9 + Math.floor(Math.random() * 5),   /* 9–13 px */
      rgb: curRGB.slice()
    });
  });

  /* Scroll burst — scatter a word cluster on fast scroll */
  var lastScrollY = window.scrollY;
  var scrollVel   = 0;
  var mx = W / 2, my = H / 2;
  document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; }, {passive:true});
  window.addEventListener('scroll', function(){
    var now = window.scrollY;
    scrollVel = Math.abs(now - lastScrollY);
    lastScrollY = now;
  }, {passive: true});

  (function frame(){
    ctx2d.clearRect(0, 0, W, H);

    /* Scroll burst */
    if(scrollVel > 10){
      var burst = Math.min(Math.floor(scrollVel / 12), 5);
      for(var b = 0; b < burst; b++){
        particles.push({
          word: WORDS[wordIdx % WORDS.length],
          wordIdx: wordIdx++,
          x: mx + (Math.random() - 0.5) * 60,
          y: my + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(0.5 + Math.random() * 0.8),
          alpha: 0.0,
          fadeIn: true,
          size: 8 + Math.floor(Math.random() * 5),
          rgb: curRGB.slice()
        });
      }
      scrollVel *= 0.75;
    }

    /* Draw & update each word */
    particles = particles.filter(function(p){
      if(p.fadeIn){
        p.alpha += 0.06;
        if(p.alpha >= 0.22){ p.alpha = 0.22; p.fadeIn = false; }
      } else {
        p.alpha -= 0.008;
      }
      if(p.alpha <= 0) return false;

      p.x += p.vx;
      p.y += p.vy;

      ctx2d.save();
      ctx2d.globalAlpha = p.alpha;
      ctx2d.font = 'italic ' + p.size + 'px \'DM Sans\',sans-serif';
      ctx2d.fillStyle = 'rgb(' + p.rgb[0] + ',' + p.rgb[1] + ',' + p.rgb[2] + ')';
      ctx2d.letterSpacing = '0.08em';
      ctx2d.fillText(p.word, p.x, p.y);
      ctx2d.restore();

      return true;
    });

    /* Cap particles to avoid buildup */
    if(particles.length > 60) particles.splice(0, particles.length - 60);

    requestAnimationFrame(frame);
  })();
})();
