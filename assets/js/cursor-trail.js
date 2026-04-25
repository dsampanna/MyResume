/* Cursor Trail Particles — included on every page */
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
  var particles = [];
  document.addEventListener('mousemove', function(e){
    for(var i = 0; i < 4; i++){
      particles.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random()-0.5)*2.5,
        vy: (Math.random()-0.5)*2.5 - 0.5,
        life: 1,
        r: Math.random()*3+1
      });
    }
  });
  (function frame(){
    ctx.clearRect(0,0,W,H);
    particles = particles.filter(function(p){
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.038; p.r *= 0.96;
      if(p.life <= 0) return false;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(p.r, 0), 0, Math.PI*2);
      ctx.fillStyle = 'rgba(14,181,160,'+p.life.toFixed(2)+')';
      ctx.fill();
      return true;
    });
    requestAnimationFrame(frame);
  })();
})();
