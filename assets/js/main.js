/* Sampanna Raj Dhungel — main.js */

/* ── PRELOADER ── */
(function(){
  var pl = document.getElementById('preloader');
  if(!pl) return;
  window.addEventListener('load', function(){
    setTimeout(function(){ pl.classList.add('done'); }, 300);
  });
  setTimeout(function(){ pl.classList.add('done'); }, 3000); /* safety fallback */
})();


/* ── CUSTOM CURSOR ── */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  var dot   = document.createElement('div'); dot.className  = 'cursor-dot';
  var ring  = document.createElement('div'); ring.className = 'cursor-ring';
  var label = document.createElement('span'); label.className = 'cursor-label';
  ring.appendChild(label);
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mx=0,my=0,rx=0,ry=0;

  document.addEventListener('pointermove',function(e){
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';

    var isLink = e.target.closest('a,button,[role="button"]');
    dot.classList.toggle('is-hover', !!isLink);
    ring.classList.toggle('is-hover', !!isLink);

    /* Section-aware label */
    var sec = e.target.closest('[data-cursor]');
    if(sec && !isLink){
      label.textContent = sec.dataset.cursor;
      ring.classList.add('has-label');
    } else {
      ring.classList.remove('has-label');
    }
  });

  (function tick(){
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  })();

  document.addEventListener('mouseleave',function(){dot.classList.add('is-hidden');ring.classList.add('is-hidden');});
  document.addEventListener('mouseenter',function(){dot.classList.remove('is-hidden');ring.classList.remove('is-hidden');});
})();

/* ── COPYRIGHT ── */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ── NAV LOGO SCROLL ── */
const navLogo = document.querySelector('.nav-logo');
if(navLogo) navLogo.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
/* Mobile Background dropdown */
var ddToggle = document.querySelector('.nav-dropdown-toggle');
if(ddToggle){
  ddToggle.addEventListener('click',function(e){
    if(window.innerWidth<=900){e.preventDefault();this.closest('.nav-dropdown').classList.toggle('open');}
  });
}
var navLinks = document.getElementById('navLinks');
function closeNav(){
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
}
hamburger.addEventListener('click', function(){
  var isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', closeNav);
});
/* Close on outside click */
document.addEventListener('click', function(e){
  if(!e.target.closest('.nav') && navLinks.classList.contains('open')) closeNav();
});
/* Close on ESC */
document.addEventListener('keydown', function(e){
  if(e.key==='Escape' && navLinks.classList.contains('open')) closeNav();
});
/* Close on resize to desktop */
window.addEventListener('resize', function(){
  if(window.innerWidth > 900) closeNav();
});

/* ── HIRE ME MODAL ── */
const hireModal = document.getElementById('hireModal');
document.getElementById('hireBtn').addEventListener('click', function(e){
  e.preventDefault();
  hireModal.classList.add('open');
  document.getElementById('modalClose').focus();
});
document.getElementById('modalClose').addEventListener('click', function(){ hireModal.classList.remove('open'); });
hireModal.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
document.getElementById('modalContactLink').addEventListener('click', function(){ hireModal.classList.remove('open'); });
/* Escape key closes modal */
document.addEventListener('keydown', function(e){ if(e.key==='Escape') hireModal.classList.remove('open'); });

/* ── PORTFOLIO DATA ── */
var portfolioItems = [
  {t:'Old Man Smoking',c:'3D Animation',f:'3d',i:'assets/img/portfolio/3D_Animation_2_thumbnail.png'},
  {t:'Old Man Chilling',c:'3D Animation',f:'3d',i:'assets/img/portfolio/3D_Animation_1_thumbnail.jpg'},
  {t:'Griham Organic',c:'Web Design',f:'web',i:'assets/img/portfolio/griham-organic-thumbnail.jpg'},
  {t:'HimalTrek Nepal',c:'Web Design',f:'web',i:'assets/img/portfolio/himaltrek-thumbnail.jpg'},
  {t:'Indreni Nursery Landing Page',c:'Web Design',f:'web',i:'assets/img/portfolio/portfolio-17.jpg'},
  {t:'Pepsi Logo Reveal',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_13_thumbnail.png'},
  {t:'City Motion',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_1_thumbnail.jpg'},
  {t:'999 to 1000 Subscribers',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_2_thumbnail.jpg'},
  {t:'Instagram Username Reveal',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_3_thumbnail.jpg'},
  {t:'Instagram Story',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_4_thumbnail.jpg'},
  {t:'Facebook Like',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_5_thumbnail.jpg'},
  {t:'Switch On',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_6_thumbnail.jpg'},
  {t:'Timer',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_7_thumbnail.jpg'},
  {t:'Coming Soon',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_8_thumbnail.jpg'},
  {t:'Chatting',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_9_thumbnail.jpg'},
  {t:'Intro Reveal',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_10_thumbnail.jpg'},
  {t:'Loading',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_11_thumbnail.jpg'},
  {t:'Transform With Sound',c:'Motion Graphics',f:'motion',i:'assets/img/portfolio/Motion_12_thumbnail.jpg'},
  {t:'Transform With Sound',c:'Sound Design',f:'sound',i:'assets/img/portfolio/Draft_Music_Design_1_thumbnail.jpg'},
  {t:'Bijaya Dashami Offer',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-11.jpg'},
  {t:'Bijaya Dashami Wishes',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-9.jpg'},
  {t:'Bijaya Dashami Wish',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-4.jpg'},
  {t:'Bijaya Dashami Wish 2',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-14.jpg'},
  {t:'Tihar Wishes',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-8.jpg'},
  {t:'Kent Water Purifier',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-6.jpg'},
  {t:'Kent Water Purifier 2',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-7.jpg'},
  {t:'Admission Open',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-5.jpg'},
  {t:'Abroad Study',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-10.jpg'},
  {t:'Offer / Voucher Code',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-12.jpg'},
  {t:'TikTok Marketing Guide',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-13.jpg'},
  {t:"Men's Collection Offer",c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-15.jpg'},
  {t:'Revenue Breakdown Kent College',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-16.jpg'},
  {t:'Affiliation Program',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-1.jpg'},
  {t:'Water Purifier',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-2.jpg'},
  {t:'Graphics Design Bootcamp',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-3.jpg'},
  {t:'Voucher Card',c:'Social Media',f:'social',i:'assets/img/portfolio/portfolio-21.jpg'},
  {t:'Visiting Card',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-18.jpg'},
  {t:'Visiting Card 2',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-19.jpg'},
  {t:'Ozil Illustration',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-20.jpg'},
  {t:'Logo — Sallaghari Burger',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-22.jpg'},
  {t:'Logo — Araniko FC',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-23.png'},
  {t:'Logo — Wine Hub Nepal',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-24.jpg'},
  {t:'Hoarding Board Design',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-25.jpg'},
  {t:'Banner Design',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-26.jpg'},
  {t:'Diary Cover Design',c:'Other Designs',f:'other',i:'assets/img/portfolio/portfolio-27.jpg'}
];

const portGrid = document.getElementById('portGrid');
if(portGrid){ portfolioItems.forEach(function(p){
  var el = document.createElement('div');
  el.className = 'port-item';
  el.dataset.f = p.f;
  el.innerHTML = '<img src="'+p.i+'" alt="'+p.t+'" loading="lazy"><div class="port-item-info"><div class="port-item-cat">'+p.c+'</div><div class="port-item-title">'+p.t+'</div></div>';
  portGrid.appendChild(el);
}); }

const portFilters = document.getElementById('portFilters');
if(portFilters){ portFilters.addEventListener('click', function(e){
  var btn = e.target.closest('.pf-btn');
  if(!btn) return;
  document.querySelectorAll('.pf-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  var f = btn.dataset.f;
  document.querySelectorAll('.port-item').forEach(function(item){
    item.classList.toggle('hidden', f!=='all' && item.dataset.f!==f);
 });
}); }
/* ── 3D CAROUSEL ── */
(function(){
 var projects=[
  {title:'Griham Organic',cat:'UI/UX · Web Design',desc:'A seamless digital experience bringing home-grown produce to online shoppers in Nepal.',img:'assets/img/portfolio/griham-organic-thumbnail.jpg',bg:'#1a2e2b',link:'project.html?id=griham-organic'},
  {title:'HimalTrek Nepal',cat:'Web Design · UI/UX',desc:'Full-stack trekking platform — 24 routes, permits, certified guides and booking.',img:'assets/img/portfolio/himaltrek-thumbnail.jpg',bg:'#0a1e0a',link:'project.html?id=himaltrek-nepal'},
  {title:'Indreni Nursery',cat:'Web Design',desc:'Clean landing page design for a local nursery — fresh, green and inviting.',img:'assets/img/portfolio/portfolio-17.jpg',bg:'#0a1a0a',link:'project.html?id=indreni-nursery'},
  {title:'Old Man Smoking',cat:'3D Animation',desc:'Character-driven 3D animation exploring texture, light, and emotional storytelling.',img:'assets/img/portfolio/3D_Animation_2_thumbnail.png',bg:'#1e1a2e',link:'project.html?id=old-man-smoking'},
  {title:'Old Man Chilling',cat:'3D Animation',desc:'A relaxed 3D character study — mood, atmosphere and subtle motion.',img:'assets/img/portfolio/3D_Animation_1_thumbnail.jpg',bg:'#1a1a2e',link:'project.html?id=old-man-chilling'},
  {title:'City Motion',cat:'Motion Graphics',desc:'Dynamic urban motion reel crafted in After Effects — rhythm, pace, and energy.',img:'assets/img/portfolio/Motion_1_thumbnail.jpg',bg:'#0d1a2e',link:'project.html?id=city-motion'},
  {title:'999 to 1000 Subscribers',cat:'Motion Graphics',desc:'Celebratory motion graphic marking a milestone subscriber count.',img:'assets/img/portfolio/Motion_2_thumbnail.jpg',bg:'#1a0d2e',link:'project.html?id=999-to-1000-subscribers'},
  {title:'Instagram Username Reveal',cat:'Motion Graphics',desc:'Stylish animated reveal for a social media username — clean and punchy.',img:'assets/img/portfolio/Motion_3_thumbnail.jpg',bg:'#2e1a0d',link:'project.html?id=instagram-username-reveal'},
  {title:'Instagram Story',cat:'Motion Graphics',desc:'Animated Instagram story template with smooth transitions and bold type.',img:'assets/img/portfolio/Motion_4_thumbnail.jpg',bg:'#2e0d1a',link:'project.html?id=instagram-story'},
  {title:'Facebook Like',cat:'Motion Graphics',desc:'Playful animation of the iconic Facebook like reaction.',img:'assets/img/portfolio/Motion_5_thumbnail.jpg',bg:'#0d1e2e',link:'project.html?id=facebook-like'},
  {title:'Switch On',cat:'Motion Graphics',desc:'Satisfying switch toggle animation — crisp timing and tactile feel.',img:'assets/img/portfolio/Motion_6_thumbnail.jpg',bg:'#0a2e1a',link:'project.html?id=switch-on'},
  {title:'Timer',cat:'Motion Graphics',desc:'Minimalist countdown timer animation with clean visual design.',img:'assets/img/portfolio/Motion_7_thumbnail.jpg',bg:'#1a2e0a',link:'project.html?id=timer'},
  {title:'Coming Soon',cat:'Motion Graphics',desc:'Animated coming soon screen with tension-building visual pacing.',img:'assets/img/portfolio/Motion_8_thumbnail.jpg',bg:'#2e1a0a',link:'project.html?id=coming-soon'},
  {title:'Chatting',cat:'Motion Graphics',desc:'Animated chat bubble sequence — light, conversational and fun.',img:'assets/img/portfolio/Motion_9_thumbnail.jpg',bg:'#0a1a2e',link:'project.html?id=chatting'},
  {title:'Intro Reveal',cat:'Motion Graphics',desc:'Bold animated intro sequence for a personal or brand channel.',img:'assets/img/portfolio/Motion_10_thumbnail.jpg',bg:'#1e0a2e',link:'project.html?id=intro-reveal'},
  {title:'Loading',cat:'Motion Graphics',desc:'Smooth loading animation loop — minimal and satisfying.',img:'assets/img/portfolio/Motion_11_thumbnail.jpg',bg:'#0a2e2e',link:'project.html?id=loading'},
  {title:'Transform With Sound',cat:'Motion · Sound Design',desc:'A motion piece that reacts visually in sync with original sound design.',img:'assets/img/portfolio/Motion_12_thumbnail.jpg',bg:'#0a0a1a',link:'project.html?id=transform-with-sound-motion'},
  {title:'Pepsi Logo Reveal',cat:'Motion · Branding',desc:"Branded logo reveal animation for one of the world's most recognisable marks.",img:'assets/img/portfolio/Motion_13_thumbnail.png',bg:'#001a3a',link:'project.html?id=pepsi-logo-reveal'},
  {title:'Transform With Sound',cat:'Sound Design',desc:'Original sound design composition built to sync with motion and visual rhythm.',img:'assets/img/portfolio/Draft_Music_Design_1_thumbnail.jpg',bg:'#0a0a0a',link:'project.html?id=transform-with-sound-audio'},
  {title:'Tihar Wishes',cat:'Social Media',desc:'Festive Tihar social media graphic — warm tones and celebratory design.',img:'assets/img/portfolio/portfolio-8.jpg',bg:'#2e1e00',link:'project.html?id=tihar-wishes'},
  {title:'Bijaya Dashami Offer',cat:'Social Media',desc:'Promotional offer graphic for Bijaya Dashami — bold and festive.',img:'assets/img/portfolio/portfolio-11.jpg',bg:'#2e0a00',link:'project.html?id=bijaya-dashami-offer'},
  {title:'Bijaya Dashami Wishes',cat:'Social Media',desc:'Warm festive wishes graphic for Bijaya Dashami celebrations.',img:'assets/img/portfolio/portfolio-9.jpg',bg:'#2e1000',link:'project.html?id=bijaya-dashami-wishes'},
  {title:'Bijaya Dashami Wish',cat:'Social Media',desc:'Clean single-post wish design for the Dashami festival.',img:'assets/img/portfolio/portfolio-4.jpg',bg:'#1e0a00',link:'project.html?id=bijaya-dashami-wish'},
  {title:'Bijaya Dashami Wish 2',cat:'Social Media',desc:'Alternative festive wish design variant with different layout and feel.',img:'assets/img/portfolio/portfolio-14.jpg',bg:'#2e0e00',link:'project.html?id=bijaya-dashami-wish-2'},
  {title:'Kent Water Purifier',cat:'Social Media',desc:'Product promotional graphic for Kent Water Purifier — clean and minimal.',img:'assets/img/portfolio/portfolio-6.jpg',bg:'#001a2e',link:'project.html?id=kent-water-purifier'},
  {title:'Kent Water Purifier 2',cat:'Social Media',desc:'Second variant promotional design for Kent Water Purifier campaign.',img:'assets/img/portfolio/portfolio-7.jpg',bg:'#00102e',link:'project.html?id=kent-water-purifier-2'},
  {title:'Admission Open',cat:'Social Media',desc:'Eye-catching admission announcement graphic for an educational institution.',img:'assets/img/portfolio/portfolio-5.jpg',bg:'#0a002e',link:'project.html?id=admission-open'},
  {title:'Abroad Study',cat:'Social Media',desc:'Aspirational study abroad promotional graphic with bold visual hierarchy.',img:'assets/img/portfolio/portfolio-10.jpg',bg:'#001e2e',link:'project.html?id=abroad-study'},
  {title:'Offer / Voucher Code',cat:'Social Media',desc:'Promotional voucher and offer graphic — structured, clear and action-driven.',img:'assets/img/portfolio/portfolio-12.jpg',bg:'#1a2e00',link:'project.html?id=offer-voucher-code'},
  {title:'TikTok Marketing Guide',cat:'Social Media',desc:'Informational carousel-style graphic breaking down TikTok marketing tips.',img:'assets/img/portfolio/portfolio-13.jpg',bg:'#0a0a0a',link:'project.html?id=tiktok-marketing-guide'},
  {title:"Men's Collection Offer",cat:'Social Media',desc:"Fashion promotional graphic for a men's clothing collection sale.",img:'assets/img/portfolio/portfolio-15.jpg',bg:'#1a1a00',link:"project.html?id=mens-collection-offer"},
  {title:'Revenue Breakdown',cat:'Social Media',desc:'Data-driven infographic breaking down revenue figures for Kent College.',img:'assets/img/portfolio/portfolio-16.jpg',bg:'#001a1a',link:'project.html?id=revenue-breakdown'},
  {title:'Affiliation Program',cat:'Social Media',desc:'Promotional graphic for an affiliation and referral program launch.',img:'assets/img/portfolio/portfolio-1.jpg',bg:'#1e1a00',link:'project.html?id=affiliation-program'},
  {title:'Water Purifier',cat:'Social Media',desc:'Minimal product feature graphic highlighting water purification benefits.',img:'assets/img/portfolio/portfolio-2.jpg',bg:'#001a1e',link:'project.html?id=water-purifier'},
  {title:'Graphics Design Bootcamp',cat:'Social Media',desc:'Event promotion graphic for a graphic design bootcamp — bold and energetic.',img:'assets/img/portfolio/portfolio-3.jpg',bg:'#1a002e',link:'project.html?id=graphics-design-bootcamp'},
  {title:'Voucher Card',cat:'Social Media',desc:'Clean voucher card design with structured layout and brand colours.',img:'assets/img/portfolio/portfolio-21.jpg',bg:'#2e1a1a',link:'project.html?id=voucher-card'},
  {title:'Araniko FC Identity',cat:'Logo Design · Branding',desc:'Full brand identity for Araniko FC — crest, typography, colour system and guidelines.',img:'assets/img/portfolio/portfolio-23.png',bg:'#1a1200',link:'project.html?id=logo-araniko-fc'},
  {title:'Logo — Sallaghari Burger',cat:'Logo Design',desc:'Fun and appetising logo design for a local burger brand.',img:'assets/img/portfolio/portfolio-22.jpg',bg:'#2e0a00',link:'project.html?id=logo-sallaghari-burger'},
  {title:'Logo — Wine Hub Nepal',cat:'Logo Design',desc:'Elegant and sophisticated logo for a premium wine retail brand in Nepal.',img:'assets/img/portfolio/portfolio-24.jpg',bg:'#1a0010',link:'project.html?id=logo-wine-hub-nepal'},
  {title:'Visiting Card',cat:'Other Designs',desc:'Clean professional visiting card design with strong typographic layout.',img:'assets/img/portfolio/portfolio-18.jpg',bg:'#0a0a1a',link:'project.html?id=visiting-card'},
  {title:'Visiting Card 2',cat:'Other Designs',desc:'Second visiting card variant — different style, same professional polish.',img:'assets/img/portfolio/portfolio-19.jpg',bg:'#1a0a0a',link:'project.html?id=visiting-card-2'},
  {title:'Ozil Illustration',cat:'Other Designs',desc:'Hand-crafted digital illustration of footballer Mesut Özil — detailed and expressive.',img:'assets/img/portfolio/portfolio-20.jpg',bg:'#0a1a0a',link:'project.html?id=ozil-illustration'},
  {title:'Hoarding Board Design',cat:'Other Designs',desc:'Large-format hoarding board design — bold, readable and impactful at scale.',img:'assets/img/portfolio/portfolio-25.jpg',bg:'#1a1a0a',link:'project.html?id=hoarding-board'},
  {title:'Banner Design',cat:'Other Designs',desc:'Versatile banner design for events or promotions — structured and clear.',img:'assets/img/portfolio/portfolio-26.jpg',bg:'#0a1a1a',link:'project.html?id=banner-design'},
  {title:'Diary Cover Design',cat:'Other Designs',desc:'Creative diary cover design — personal, tactile and beautifully composed.',img:'assets/img/portfolio/portfolio-27.jpg',bg:'#1a0a1a',link:'project.html?id=diary-cover'},
];
  /* ── Shuffle on every page load ── */
  for(var _si=projects.length-1;_si>0;_si--){var _sj=Math.floor(Math.random()*(_si+1));var _st=projects[_si];projects[_si]=projects[_sj];projects[_sj]=_st;}

  var current=0,isDragging=false,dragStartX=0;
  var total=projects.length;
  var track=document.getElementById('pcTrack');
  var dots=document.getElementById('pcDots');
  var prevBtn=document.getElementById('pcPrev');
  var nextBtn=document.getElementById('pcNext');
  var stage=document.getElementById('pcStage');
  document.getElementById('pcTotalNum').textContent=total;

  projects.forEach(function(p,i){
    var card=document.createElement('div');
    card.className='pc-card';
    var media=p.img
      ?'<img class="pc-card-img" src="'+p.img+'" alt="'+p.title+'" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><div class="pc-card-bg" style="display:none;background:'+p.bg+';position:absolute;inset:0"></div>'
      :'<div class="pc-card-bg" style="background:'+p.bg+';position:absolute;inset:0"></div>';
    card.innerHTML='<div class="pc-card-inner">'+media+'<div class="pc-card-overlay"><div class="pc-card-cat">'+p.cat+'</div><div class="pc-card-name">'+p.title+'</div><div class="pc-card-desc">'+p.desc+'</div><a href="'+p.link+'" class="pc-view-btn" target="_blank">View project →</a></div></div>';
    card.addEventListener('click',function(e){ if(i!==current){ e.preventDefault(); goTo(i); } });
    track.appendChild(card);
    var dot=document.createElement('div');
    dot.className='pc-dot'+(i===0?' active':'');
    dot.addEventListener('click',function(){ goTo(i); });
    dots.appendChild(dot);
  });

  function layout(){
    var cards=track.querySelectorAll('.pc-card');
    var ww=stage.offsetWidth;
    var mob=ww<600;
    var spread=mob?240:420,rotY=mob?28:22,scaleOff=mob?0.72:0.78,zOff=mob?-160:-260;
    cards.forEach(function(card,i){
      var off=i-current;
      if(off>total/2) off-=total;
      if(off<-total/2) off+=total;
      var abs=Math.abs(off),center=off===0,adj=abs===1;
      card.style.transform='translateX('+(off*spread)+'px) translateZ('+(center?0:zOff*abs)+'px) rotateY('+(center?0:(off>0?-rotY:rotY))+'deg) scale('+(center?1:(adj?scaleOff:scaleOff*0.82))+')';
      card.style.opacity=center?1:(adj?0.65:0.3);
      card.style.filter=center?'':(adj?'blur(2px)':'blur(5px)');
      card.style.zIndex=100-abs;
      card.classList.toggle('is-center',center);
      card.style.pointerEvents=center?'auto':(adj?'auto':'none');
    });
    dots.querySelectorAll('.pc-dot').forEach(function(d,i){ d.classList.toggle('active',i===current); });
    document.getElementById('pcCurrentNum').textContent=current+1;
  }

  function goTo(idx){ current=((idx%total)+total)%total; layout(); }
  prevBtn.addEventListener('click',function(){ goTo(current-1); });
  nextBtn.addEventListener('click',function(){ goTo(current+1); });

  var hoverTimer=null;
  function makeZone(side){
    var zone=document.createElement('div');
    var arrow=document.createElement('span');
    zone.style.cssText='position:absolute;top:0;bottom:0;width:28%;z-index:200;display:flex;align-items:center;pointer-events:auto;'+(side==='left'?'left:0;justify-content:flex-start;cursor:w-resize':'right:0;justify-content:flex-end;cursor:e-resize');
    arrow.style.cssText='font-size:2.5rem;color:rgba(14,181,160,0);padding:0 1.5rem;transition:color 0.3s;pointer-events:none;font-family:sans-serif;line-height:1';
    arrow.textContent=side==='left'?'‹':'›';
    zone.appendChild(arrow);
    var dir=side==='left'?-1:1;
    function startScroll(delay){ clearTimeout(hoverTimer); hoverTimer=setTimeout(function tick(){ goTo(current+dir); hoverTimer=setTimeout(tick,delay); },delay); }
    zone.addEventListener('mouseenter',function(){ arrow.style.color='rgba(14,181,160,0.75)'; startScroll(800); });
    zone.addEventListener('mousemove',function(e){ var pct=side==='left'?1-(e.offsetX/zone.offsetWidth):e.offsetX/zone.offsetWidth; startScroll(800-Math.round(pct*500)); });
    zone.addEventListener('mouseleave',function(){ arrow.style.color='rgba(14,181,160,0)'; clearTimeout(hoverTimer); });
    stage.appendChild(zone);
  }
  makeZone('left'); makeZone('right');

  stage.addEventListener('mousedown',function(e){ isDragging=true; dragStartX=e.clientX; });
  window.addEventListener('mouseup',function(e){ if(!isDragging)return; isDragging=false; var dx=e.clientX-dragStartX; if(Math.abs(dx)>60) goTo(dx<0?current+1:current-1); });
  stage.addEventListener('touchstart',function(e){ dragStartX=e.touches[0].clientX; },{passive:true});
  stage.addEventListener('touchend',function(e){ var dx=e.changedTouches[0].clientX-dragStartX; if(Math.abs(dx)>50) goTo(dx<0?current+1:current-1); },{passive:true});
  document.addEventListener('keydown',function(e){ if(e.key==='ArrowLeft') goTo(current-1); if(e.key==='ArrowRight') goTo(current+1); });

  layout();
  window.addEventListener('resize',layout);

stage.addEventListener('wheel',function(e){
  e.preventDefault();
  if(e.deltaY>0||e.deltaX>0) goTo(current+1);
  else goTo(current-1);
},{passive:false});

/* ── 3D TILT ON CENTER CARD ── */
(function(){
  var tilting = false;
  stage.addEventListener('mousemove',function(e){
    var card = track.querySelector('.pc-card.is-center');
    if(!card) return;
    var r = card.getBoundingClientRect();
    var inside = e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom;
    if(inside){
      if(!tilting){ card.style.transition='transform 0.1s ease-out'; tilting=true; }
      var dx = ((e.clientX-r.left)/r.width - 0.5) * 2;
      var dy = ((e.clientY-r.top)/r.height - 0.5) * 2;
      card.style.transform='translateX(0px) translateZ(0px) rotateY('+(dx*10)+'deg) rotateX('+(-dy*7)+'deg) scale(1.03)';
    } else if(tilting){
      card.style.transition='transform 0.35s ease-out';
      card.style.transform='translateX(0px) translateZ(0px) rotateY(0deg) rotateX(0deg) scale(1)';
      tilting=false;
    }
  });
  stage.addEventListener('mouseleave',function(){
    var card=track.querySelector('.pc-card.is-center');
    if(card){ card.style.transition='transform 0.35s ease-out'; card.style.transform='translateX(0px) translateZ(0px) rotateY(0deg) rotateX(0deg) scale(1)'; }
    tilting=false;
  });
})();
})();

/* ── ACTIVE NAV ON SCROLL ── */
(function(){
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = [];
  navLinks.forEach(function(a){
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if(el) sections.push({el:el, a:a});
  });
  if(!sections.length) return;

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        navLinks.forEach(function(a){ a.classList.remove('nav-active'); });
        sections.forEach(function(s){
          if(s.el === entry.target) s.a.classList.add('nav-active');
        });
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});

  sections.forEach(function(s){ obs.observe(s.el); });

  /* Mark Portfolio link active when on portfolio.html */
  var portfolioLink = document.querySelector('.nav-links a[href="portfolio.html"]');
  if(portfolioLink && window.location.pathname.includes('portfolio')){
    portfolioLink.classList.add('nav-active');
  }
})();

/* ── SKILLS ANIMATION ── */
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); obs.unobserve(e.target); } });
  },{threshold:0.3});
  document.querySelectorAll('.sk-fill').forEach(function(f){ obs.observe(f); });
})();

/* ── HERO STAT COUNTER ── */
(function(){
  var stats = document.querySelectorAll('.hstat-n[data-count]');
  if(!stats.length) return;
  var fired = false;
  function runCounters(){
    if(fired) return;
    fired = true;
    stats.forEach(function(el){
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      var duration = 700;
      var startTime = null;
      function step(ts){
        if(!startTime) startTime = ts;
        var elapsed = ts - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var container = document.querySelector('.hero-stats');
  if(!container){ runCounters(); return; }
  var obs = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){ runCounters(); obs.disconnect(); }
  }, {threshold:0.5});
  obs.observe(container);
})();


/* ── NEWSLETTER FORM ── */
(function(){
  var form = document.getElementById('newsletterForm');
  var msg  = document.getElementById('newsletterMsg');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = form.querySelector('.newsletter-btn');
    btn.textContent = 'Subscribing…';
    btn.disabled = true;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(r){
      if(r.ok){ msg.textContent = '✓ Subscribed! Thank you.'; form.reset(); }
      else     { msg.textContent = 'Something went wrong. Try again.'; }
    }).catch(function(){
      msg.textContent = 'Something went wrong. Try again.';
    }).finally(function(){
      btn.textContent = 'Subscribe →';
      btn.disabled = false;
    });
  });
})();

/* ── CONTACT FORM ── */
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name    = document.getElementById('cf-name').value.trim();
    var email   = document.getElementById('cf-email').value.trim();
    var subject = document.getElementById('cf-subject').value.trim() || 'Portfolio Enquiry';
    var message = document.getElementById('cf-message').value.trim();
    var msg     = document.getElementById('formMsg');
    if(!name||!email||!message){
      msg.className='form-msg error';
      msg.textContent='Please fill in all required fields.';
      return;
    }
    var emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      msg.className='form-msg error';
      msg.textContent='Please enter a valid email address.';
      return;
    }
    var btn = form.querySelector('.form-submit');
    btn.textContent='Sending…';
    btn.disabled=true;
    /* Formspree endpoint — replace xojyyovg with your actual ID from formspree.io */
    fetch('https://formspree.io/f/xojyyovg',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({name:name,email:email,subject:subject,message:message})
    }).then(function(r){
      if(r.ok){
        msg.className='form-msg success';
        msg.textContent='Message sent! I\'ll get back to you within 24 hours.';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    }).catch(function(){
      /* Fallback: open mailto if Formspree isn't configured yet */
      var mailto='mailto:sampannadhungel@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\nMessage:\n'+message);
      window.location.href=mailto;
      msg.className='form-msg success';
      msg.textContent='Opening your email client… Thank you!';
    }).finally(function(){
      btn.textContent='Send message →';
      btn.disabled=false;
    });
  });
})();

/* ── SCROLL PROGRESS BAR ── */
(function(){
  var bar = document.getElementById('scrollProgress');
  if(!bar) return;
  function update(){
    var h = document.documentElement;
    var scrolled = h.scrollTop || document.body.scrollTop;
    var total = h.scrollHeight - h.clientHeight;
    var pct = total > 0 ? (scrolled / total * 100) : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }
  window.addEventListener('scroll', update, {passive:true});
  update();
})();

/* ── TYPED ROLE ── */
(function(){
  var el = document.getElementById('typedRole');
  if(!el) return;
  var roles = ['Creative Director','UI/UX Designer','Motion Designer','Brand Strategist','Digital Media Designer'];
  var ri = 0, ci = 0, deleting = false, waitNext = false;
  function tick(){
    var current = roles[ri];
    if(waitNext){ waitNext=false; deleting=true; setTimeout(tick, 1800); return; }
    if(!deleting){
      ci++;
      el.textContent = current.slice(0, ci);
      if(ci === current.length){ waitNext=true; setTimeout(tick, 100); return; }
      setTimeout(tick, 70 + Math.random()*40);
    } else {
      ci--;
      el.textContent = current.slice(0, ci);
      if(ci === 0){ deleting=false; ri=(ri+1)%roles.length; setTimeout(tick, 350); return; }
      setTimeout(tick, 35);
    }
  }
  el.textContent = '';
  setTimeout(tick, 800);
})();

/* ── MAGNETIC BUTTONS ── */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches) return;
  function makeMagnetic(el, strength){
    strength = strength || 0.3;
    el.addEventListener('mousemove', function(e){
      var r = el.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width/2)) * strength;
      var dy = (e.clientY - (r.top  + r.height/2)) * strength;
      el.style.transform = 'translate('+dx+'px,'+dy+'px)';
    });
    el.addEventListener('mouseleave', function(){
      el.style.transform = '';
    });
  }
  document.querySelectorAll('.btn-teal,.btn-outline').forEach(function(b){ makeMagnetic(b, 0.28); });
  var cta = document.querySelector('.nav-cta');
  if(cta) makeMagnetic(cta, 0.18);
})();

/* ── HERO SPOTLIGHT ── */
(function(){
  var hero = document.getElementById('hero');
  var spot = document.getElementById('heroSpotlight');
  if(!hero || !spot) return;
  hero.addEventListener('mousemove', function(e){
    var r = hero.getBoundingClientRect();
    spot.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    spot.style.setProperty('--sy', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    spot.classList.add('on');
  });
  hero.addEventListener('mouseleave', function(){ spot.classList.remove('on'); });
})();

/* ── GRAIN OVERLAY ── */
(function(){
  var sz = 256;
  var c = document.createElement('canvas');
  c.width = c.height = sz;
  var ctx = c.getContext('2d');
  var id = ctx.createImageData(sz, sz);
  var d = id.data;
  for(var i = 0; i < d.length; i += 4){
    var v = Math.random() * 255 | 0;
    d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
  }
  ctx.putImageData(id, 0, 0);
  var g = document.createElement('div');
  g.id = 'grainOverlay';
  g.style.backgroundImage = 'url(' + c.toDataURL() + ')';
  document.body.appendChild(g);
})();

/* ── CARD HOVER GLOW ── */
(function(){
  document.querySelectorAll('.svc-item, .blog-card, .now-card, .edu-card, .exp-item, .newsletter-inner').forEach(function(card){
    var glow = document.createElement('div');
    glow.className = 'card-glow';
    card.appendChild(glow);
    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      glow.style.background = 'radial-gradient(260px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px, rgba(14,181,160,0.22) 0%, transparent 65%)';
      glow.style.opacity = '1';
    });
    card.addEventListener('mouseleave', function(){ glow.style.opacity = '0'; });
  });
})();

/* ── WORD REVEAL ── */
(function(){
  function escHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var targets = document.querySelectorAll('.hero-desc, .about-text, .contact-sub');
  targets.forEach(function(el){
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function(w, i){
      var delay = Math.min(i * 0.045, 0.9).toFixed(3);
      return '<span class="word-r" style="--wd:' + delay + 's">' + escHtml(w) + '</span>';
    }).join(' ');
  });
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      entry.target.querySelectorAll('.word-r').forEach(function(w){ w.classList.add('on'); });
      obs.unobserve(entry.target);
    });
  }, {threshold: 0.15});
  targets.forEach(function(el){ obs.observe(el); });
})();

/* ── PAGE TRANSITIONS ── */
(function(){
  var overlay = document.createElement('div');
  overlay.id = 'pageTrans';
  overlay.style.cssText = 'position:fixed;inset:0;background:#080c10;z-index:99997;pointer-events:none;opacity:1;transition:none';
  document.body.appendChild(overlay);
  /* Fade in on page load */
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      overlay.style.transition = 'opacity 0.42s ease';
      overlay.style.opacity = '0';
    });
  });
  /* Fade out before navigating */
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.charAt(0) === '#' || a.target === '_blank') return;
    if(/^(mailto|tel|http|\/\/)/.test(href)) return;
    if(/\.(pdf|png|jpg|jpeg|gif|zip|svg)$/i.test(href)) return;
    e.preventDefault();
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    setTimeout(function(){ window.location.href = href; }, 440);
  });
})();

/* ── HERO MOUSE PARALLAX ── */
(function(){
  var hero = document.getElementById('hero');
  if(!hero || !window.matchMedia('(pointer:fine)').matches) return;
  var layers = [
    { sel:'.hero-badge', fx:0.010, fy:0.008 },
    { sel:'.hero-name',  fx:0.020, fy:0.014 },
    { sel:'.hero-role',  fx:0.016, fy:0.011 },
    { sel:'.hero-sig',   fx:0.013, fy:0.009 },
    { sel:'.hero-desc',  fx:0.007, fy:0.005 },
  ].map(function(l){ l.el = hero.querySelector(l.sel); return l; })
   .filter(function(l){ return l.el; });

  var cx = 0, cy = 0;
  function update(){ cx = window.innerWidth/2; cy = window.innerHeight/2; }
  update(); window.addEventListener('resize', update);

  hero.addEventListener('mousemove', function(e){
    var dx = e.clientX - cx, dy = e.clientY - cy;
    layers.forEach(function(l){
      l.el.style.transform = 'translate(' + (dx*l.fx).toFixed(2) + 'px,' + (dy*l.fy).toFixed(2) + 'px)';
    });
  });
  hero.addEventListener('mouseleave', function(){
    layers.forEach(function(l){ l.el.style.transform = ''; });
  });
})();

/* ── SCROLL HINT ── */
(function(){
  var hint = document.getElementById('scrollHint');
  if(!hint) return;
  window.addEventListener('scroll', function(){
    hint.classList.toggle('gone', window.scrollY > 120);
  }, {passive:true});
})();

/* ── CONFETTI ON FORM SUBMIT ── */
(function(){
  var msg = document.getElementById('formMsg');
  if(!msg) return;
  var colors = ['#0EB5A0','#0cc9b2','#06b6d4','#ffffff','#2563EB','#a78bfa'];

  function fireConfetti(){
    var btn = document.querySelector('.form-submit');
    var originX = 50, originY = 75;
    if(btn){
      var r = btn.getBoundingClientRect();
      originX = ((r.left + r.width/2) / window.innerWidth * 100);
      originY = (r.top / window.innerHeight * 100);
    }
    for(var i = 0; i < 72; i++){
      (function(){
        var p = document.createElement('div');
        var sz = 4 + Math.random() * 7;
        var circle = Math.random() > 0.4;
        p.style.cssText = [
          'position:fixed','z-index:99998','pointer-events:none',
          'width:' + sz + 'px',
          'height:' + (circle ? sz : sz * 1.7) + 'px',
          'background:' + colors[Math.floor(Math.random() * colors.length)],
          'border-radius:' + (circle ? '50%' : '2px'),
          'left:' + originX + '%','top:' + originY + '%','opacity:1',
        ].join(';');
        document.body.appendChild(p);
        var vx = (Math.random() - 0.5) * 280;
        var vy = -(120 + Math.random() * 260);
        var rot = (Math.random() - 0.5) * 700;
        var delay = Math.random() * 180;
        setTimeout(function(){
          p.style.transition = 'transform 1.3s cubic-bezier(0.23,1,0.32,1), opacity 1.3s ease 0.3s';
          p.style.transform = 'translate(' + vx + 'px,' + vy + 'px) rotate(' + rot + 'deg)';
          setTimeout(function(){
            p.style.opacity = '0';
            setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 450);
          }, 850);
        }, delay);
      })();
    }
  }

  var fired = false;
  new MutationObserver(function(){
    if(msg.classList.contains('success') && !fired){ fired = true; fireConfetti(); }
    if(!msg.classList.contains('success')) fired = false;
  }).observe(msg, {attributes:true, attributeFilter:['class']});
})();

/* ── COMMAND PALETTE — handled by cmd-palette.js ── */

/* ── COPY EMAIL ON CLICK ── */
(function(){
  function showToast(msg){
    var t = document.createElement('div');
    t.className = 'copy-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ t.classList.add('show'); }); });
    setTimeout(function(){
      t.classList.remove('show');
      setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); }, 350);
    }, 2200);
  }

  document.querySelectorAll('a[href^="mailto:"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var email = this.getAttribute('href').replace('mailto:', '');
      e.preventDefault();
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(email).then(function(){ showToast('✓ Email copied!'); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = email; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); showToast('✓ Email copied!'); } catch(err){}
        document.body.removeChild(ta);
      }
    });
  });
})();

/* ── PROJECT DETAIL MODAL ── */
(function(){
  var overlay = document.getElementById('projModal');
  if(!overlay) return;
  var mImg   = document.getElementById('projModalImg');
  var mCat   = document.getElementById('projModalCat');
  var mTitle = document.getElementById('projModalTitle');
  var mDesc  = document.getElementById('projModalDesc');
  var mTags  = document.getElementById('projModalTags');
  var mLink  = document.getElementById('projModalLink');

  /* Category → tool tags mapping */
  var catMap = {
    'UI/UX':       ['Figma','User Research','Prototyping','Wireframing'],
    'Web Design':  ['HTML / CSS','Responsive Design','Figma'],
    '3D Animation':['Blender','Maya','Lighting','Rendering'],
    'Motion':      ['After Effects','Premiere Pro','Motion Design'],
    'Sound Design':['Adobe Audition','Cubase','Sound Mixing'],
    'Social Media':['Photoshop','Illustrator','Content Design'],
    'Logo Design': ['Illustrator','Branding','Identity Design'],
    'Branding':    ['Illustrator','Brand Strategy','Typography'],
    'Other':       ['Photoshop','Illustrator','Print Design']
  };

  function tagsFor(cat){
    var out = [];
    for(var k in catMap){
      if(cat.indexOf(k) !== -1){
        catMap[k].forEach(function(t){ if(out.indexOf(t)===-1) out.push(t); });
      }
    }
    return out.slice(0, 5);
  }

  function openModal(card){
    var img   = card.querySelector('.pc-card-img');
    var cat   = card.querySelector('.pc-card-cat');
    var title = card.querySelector('.pc-card-name');
    var desc  = card.querySelector('.pc-card-desc');
    var link  = card.querySelector('.pc-view-btn');
    mImg.src   = img   ? img.src                    : '';
    mImg.alt   = title ? title.textContent           : '';
    mCat.textContent   = cat   ? cat.textContent     : '';
    mTitle.textContent = title ? title.textContent   : '';
    mDesc.textContent  = desc  ? desc.textContent    : '';
    mLink.href = link  ? link.getAttribute('href')   : '#';
    mTags.innerHTML = '';
    tagsFor(cat ? cat.textContent : '').forEach(function(t){
      var s = document.createElement('span');
      s.className = 'proj-modal-tag'; s.textContent = t;
      mTags.appendChild(s);
    });
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Intercept "View project →" clicks on the center carousel card */
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.pc-view-btn');
    if(!btn) return;
    var card = btn.closest('.pc-card');
    if(!card || !card.classList.contains('is-center')) return;
    e.preventDefault();
    openModal(card);
  });

  document.getElementById('projModalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeModal();
  });
})();

/* ── SIGNATURE COLORIZE ── */
(function(){
  var wrap = document.querySelector('.sig-wrap');
  if(!wrap) return;
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function(){
    var dpr = Math.min(window.devicePixelRatio||1, 2);
    var cssW = 130;
    var cssH = Math.round(cssW * img.naturalHeight / img.naturalWidth);
    var canvas = document.createElement('canvas');
    canvas.width  = Math.max(1, cssW * dpr);
    canvas.height = Math.max(1, cssH * dpr);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var d  = id.data;
    /* Sample a wide area to detect background brightness */
    var totalLum = 0, totalN = 0;
    var step = 4;
    for(var sy = 0; sy < canvas.height; sy += step){
      for(var sx = 0; sx < canvas.width; sx += step){
        var si = (sy * canvas.width + sx) * 4;
        totalLum += (d[si]*77 + d[si+1]*150 + d[si+2]*29) >> 8;
        totalN++;
      }
    }
    /* If avg luminance > 128, strokes are dark on light bg → invert alpha */
    var brightBg = totalN > 0 && totalLum / totalN > 128;
    for(var i = 0; i < d.length; i += 4){
      var lum = (d[i]*77 + d[i+1]*150 + d[i+2]*29) >> 8;
      var alpha = brightBg ? (255 - lum) : lum;
      d[i]   = 14;   /* teal R #0EB5A0 */
      d[i+1] = 181;  /* teal G */
      d[i+2] = 160;  /* teal B */
      d[i+3] = alpha;
    }
    ctx.putImageData(id, 0, 0);
    canvas.style.cssText = 'display:block;width:130px;height:auto';
    wrap.appendChild(canvas);
  };
  img.onerror = function(){
    /* PNG failed — try SVG fallback with CSS filter */
    var fb = document.createElement('img');
    fb.src = 'assets/img/signature.svg';
    fb.style.cssText = 'display:block;width:130px;filter:invert(67%) sepia(61%) saturate(401%) hue-rotate(130deg) brightness(0.9)';
    wrap.appendChild(fb);
  };
  img.src = 'assets/img/signature.png';
})();

/* ── NEPAL TIME CLOCK ── */
(function(){
  var el = document.getElementById('nepalClock');
  if(!el) return;
  function update(){
    var now = new Date();
    /* Nepal is UTC+5:45 */
    var utc = now.getTime() + now.getTimezoneOffset() * 60000;
    var nst = new Date(utc + (5 * 60 + 45) * 60000);
    var h = nst.getHours(), m = nst.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.textContent = h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm + ' NST';
  }
  update();
  setInterval(update, 60000);
})();

/* ── 3. CURSOR TRAIL PARTICLES — handled by cursor-trail.js (included on every page) ── */

/* ── 4. AVAILABILITY STATUS ── */
(function(){
  var badge = document.getElementById('availBadge');
  var text  = document.getElementById('availText');
  if(!badge || !text) return;
  var STATUS = {
    available: { label:'Available for new projects', busy: false },
    booked:    { label:'Currently booked · Q3 2025', busy: true  },
    limited:   { label:'Limited availability',        busy: true  }
  };
  function applyStatus(key){
    var s = STATUS[key] || STATUS.available;
    text.textContent = s.label;
    badge.classList.toggle('busy', s.busy);
    localStorage.setItem('availability', key);
  }
  applyStatus(localStorage.getItem('availability') || 'available');
  /* Console API — type: setAvailability('booked') or setAvailability('available') */
  window.setAvailability = function(key){ applyStatus(key); console.log('Status set to:', key); };
})();

/* ── HIRE ME TICKER ── */
(function(){
  var track = document.getElementById('tickerTrack');
  if(!track) return;
  function getNST(){
    var now = new Date();
    var nst = new Date(now.getTime() + now.getTimezoneOffset()*60000 + (5*60+45)*60000);
    var h=nst.getHours(), m=nst.getMinutes(), ap=h>=12?'PM':'AM';
    h=h%12||12;
    return '🕐 '+h+':'+(m<10?'0':'')+m+' '+ap+' NST — Bhaktapur, Nepal';
  }
  var segments = [
    '● Available for new projects',
    '2 project slots open',
    'Reply within 4 hours',
    '7+ years · 45+ projects · 30+ clients',
    'UI/UX · Branding · Motion · 3D',
    'Open to remote work worldwide'
  ];
  function build(){
    var all = segments.concat([getNST()]);
    var html = all.map(function(t){ return '<span class="ticker-item">'+t+'</span><span class="ticker-sep">✦</span>'; }).join('');
    track.innerHTML = html + html; /* duplicate for seamless loop */
  }
  build();
  setInterval(build, 60000);
})();

/* ── AMBIENT COLOR SHIFT (Nepal time-based hue) ── */
(function(){
  function getNSTHour(){
    var now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset()*60000 + (5*60+45)*60000).getHours();
  }
  function apply(){
    var h = getNSTHour();
    /* base hsl(173, 85%, 38%) — shift hue by time of day */
    var hue = h>=6&&h<10 ? 180 : h>=10&&h<17 ? 173 : h>=17&&h<21 ? 165 : 185;
    document.documentElement.style.setProperty('--teal','hsl('+hue+',82%,38%)');
    document.documentElement.style.setProperty('--cyan','hsl('+(hue+14)+',88%,58%)');
  }
  apply();
  setInterval(apply, 5*60*1000);
})();

/* ── WORK TIMER ── */
(function(){
  var el = document.getElementById('updateTimer');
  if(!el) return;
  var base = new Date('2026-04-29T00:00:00+05:45');
  function ago(){
    var ms = Date.now() - base.getTime();
    var hrs = Math.floor(ms/3600000);
    var days = Math.floor(hrs/24);
    if(hrs < 1)  return 'just now';
    if(hrs < 24) return hrs+'h ago';
    if(days===1) return 'yesterday';
    return days+' days ago';
  }
  function update(){ el.textContent = 'April 29, 2026 ('+ago()+')'; }
  update();
  setInterval(update, 3600000);
})();

/* ── CLICK-TO-REVEAL CONTACT ── */
(function(){
  document.querySelectorAll('.cd').forEach(function(cd){
    var href = cd.getAttribute('href') || '';
    var isSecret = href.includes('mailto:') || href.includes('wa.me');
    if(!isSecret) return;
    /* Wrap inner text (not the label) in a span */
    var lbl = cd.querySelector('.cd-lbl');
    var val = document.createElement('span');
    val.className = 'cd-val';
    Array.from(cd.childNodes).forEach(function(node){
      if(node !== lbl) val.appendChild(node.cloneNode(true));
    });
    /* Rebuild */
    while(cd.firstChild) cd.removeChild(cd.firstChild);
    if(lbl) cd.appendChild(lbl);
    cd.appendChild(val);
    /* Add hint */
    var hint = document.createElement('span');
    hint.className = 'cd-reveal-hint';
    hint.textContent = 'Click to reveal';
    cd.appendChild(hint);
    cd.classList.add('cd-secret');
    cd.addEventListener('click', function reveal(e){
      if(!cd.classList.contains('cd-secret')) return;
      e.preventDefault();
      cd.classList.remove('cd-secret');
      cd.removeChild(hint);
      val.style.filter = '';
    });
  });
})();


/* ── BACK TO TOP ── */
(function(){
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

