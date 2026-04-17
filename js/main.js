/* ===== LIVER DIGITAL — SHARED JS ===== */

/* CURSOR */
(function(){
  const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing'),html=document.documentElement;
  if(!cur||!ring)return;
  let mx=0,my=0,rx=0,ry=0;
  function show(){cur.classList.add('vis');ring.classList.add('vis');html.classList.add('cur-active')}
  function hide(){cur.classList.remove('vis');ring.classList.remove('vis');html.classList.remove('cur-active')}
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';show()});
  document.addEventListener('mouseleave',hide);
  document.addEventListener('mouseenter',show);
  (function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,.svc-card,.prob-card,.res-card,.pc,.who-card,.addon,.faq-item,.portfolio-item,.client-logo-box').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.5)';ring.style.borderColor='rgba(255,49,49,.7)'});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.borderColor='rgba(255,49,49,.4)'});
  });
})();

/* AMBIENT GLOW */
(function(){
  const g=document.getElementById('ambientGlow'),g2=document.getElementById('ambientGlow2');
  if(!g||!g2)return;
  const isTouch=window.matchMedia('(hover:none) and (pointer:coarse)').matches;
  let mx=window.innerWidth/2,my=window.innerHeight/2,gx=mx,gy=my,gx2=mx,gy2=my;
  if(!isTouch){
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
    (function loop(){gx+=(mx-gx)*.055;gy+=(my-gy)*.055;g.style.left=gx+'px';g.style.top=gy+'px';gx2+=(mx-gx2)*.12;gy2+=(my-gy2)*.12;g2.style.left=gx2+'px';g2.style.top=gy2+'px';requestAnimationFrame(loop)})();
  }else{
    g.style.left='50%';g2.style.left='50%';
    function upd(){const sy=window.scrollY,vh=window.innerHeight;g.style.top=(sy+vh*.45)+'px';g2.style.top=(sy+vh*.38)+'px'}
    upd();window.addEventListener('scroll',upd,{passive:true});
  }
})();

/* MOBILE NAV */
(function(){
  const toggle=document.getElementById('mobToggle'),nav=document.getElementById('mobNav'),close=document.getElementById('mobClose');
  if(!toggle||!nav||!close)return;
  toggle.addEventListener('click',()=>{nav.classList.add('open');document.body.style.overflow='hidden'});
  close.addEventListener('click',()=>{nav.classList.remove('open');document.body.style.overflow=''});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.style.overflow=''}));
})();

/* SCROLL REVEAL */
function initReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
  return obs;
}
document.addEventListener('DOMContentLoaded',initReveal);

/* SCROLL PARALLAX */
window.addEventListener('scroll',()=>{
  document.querySelectorAll('.sec-wm').forEach(el=>{
    const rect=el.closest('.sec')?.getBoundingClientRect();
    if(rect&&rect.top<window.innerHeight&&rect.bottom>0){
      el.style.transform=`translateY(${(window.innerHeight/2-rect.top)*.06}px)`;
    }
  });
},{passive:true});

/* CARD TILT */
function addTilt(selector,intensity=8){
  document.querySelectorAll(selector).forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
      const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
      card.style.transform=`perspective(800px) rotateY(${dx*intensity}deg) rotateX(${-dy*intensity}deg) translateY(-4px) scale(1.01)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform=''});
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  addTilt('.svc-card',5);addTilt('.prob-card',4);addTilt('.pc',4);addTilt('.sys-step',4);addTilt('.who-card',4);addTilt('.portfolio-item',3);
});

/* MAGNETIC BUTTONS */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.btn-p,.btn-g,.btn-w,.btn-wg,.nav-cta,.cp-wa,.pc-cta').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.18}px)`;
    });
    btn.addEventListener('mouseleave',()=>{btn.style.transform=''});
  });
});

/* FLOATING PARTICLES */
(function(){
  const style=document.createElement('style');
  style.textContent='@keyframes particleRise{0%{opacity:0;transform:translateY(0) scale(1)}10%{opacity:.35}90%{opacity:.1}100%{opacity:0;transform:translateY(-110vh) scale(.3)}}';
  document.head.appendChild(style);
  function spawn(){
    const p=document.createElement('div');
    const size=Math.random()*3+1,dur=Math.random()*12+8,delay=Math.random()*6;
    p.style.cssText=`position:fixed;left:${Math.random()*100}vw;bottom:-10px;width:${size}px;height:${size}px;background:#ff2d2d;border-radius:50%;pointer-events:none;z-index:1;opacity:0;animation:particleRise ${dur}s ${delay}s ease-in forwards`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),(dur+delay)*1000+200);
  }
  setInterval(spawn,1800);
  for(let i=0;i<4;i++)setTimeout(spawn,i*600);
})();

/* CURSOR TRAIL */
(function(){
  const count=6,trails=[];
  for(let i=0;i<count;i++){
    const t=document.createElement('div');
    t.style.cssText='position:fixed;width:4px;height:4px;background:#ff2d2d;border-radius:50%;pointer-events:none;z-index:9996;transform:translate(-50%,-50%);opacity:0;transition:opacity .3s';
    document.body.appendChild(t);
    trails.push({el:t,x:0,y:0});
  }
  let tmx=0,tmy=0;
  document.addEventListener('mousemove',e=>{tmx=e.clientX;tmy=e.clientY});
  (function loop(){
    trails.forEach((t,i)=>{
      const prev=i===0?{x:tmx,y:tmy}:trails[i-1];
      t.x+=(prev.x-t.x)*(0.35-i*.04);
      t.y+=(prev.y-t.y)*(0.35-i*.04);
      t.el.style.left=t.x+'px';t.el.style.top=t.y+'px';
      t.el.style.opacity=String((count-i)/(count*2.5));
      t.el.style.width=t.el.style.height=(4-i*.5)+'px';
    });
    requestAnimationFrame(loop);
  })();
})();

/* EMAIL OBFUSCATION */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.js-email').forEach(el=>{
    const e=el.dataset.user+'@'+el.dataset.domain,a=document.createElement('a');
    a.href='mailto:'+e;a.textContent=e;
    a.style.cssText='color:var(--white);text-decoration:none;font-weight:700;font-size:1.05rem';
    a.addEventListener('click',ev=>{ev.preventDefault();window.location.href='mailto:'+e});
    el.replaceWith(a);
  });
  document.querySelectorAll('.js-email-f').forEach(el=>{
    const e=el.dataset.user+'@'+el.dataset.domain,a=document.createElement('a');
    a.href='mailto:'+e;a.textContent=e;
    a.style.cssText='font-size:.85rem;color:rgba(245,243,238,.45);text-decoration:none;transition:color .2s';
    a.addEventListener('click',ev=>{ev.preventDefault();window.location.href='mailto:'+e});
    el.replaceWith(a);
  });
});

/* FAQ TOGGLE */
function toggleFaq(item){
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

/* PRICING TABS */
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  const btn=document.querySelector(`.${tab}-tab`);if(btn)btn.classList.add('active');
  document.querySelectorAll('.who-card').forEach(c=>c.classList.remove('active'));
  const card=document.querySelector(`.${tab}-card`);if(card)card.classList.add('active');
  document.querySelectorAll('.pricing-panel').forEach(p=>p.classList.remove('active'));
  const panel=document.getElementById(`panel-${tab}`);
  if(panel){panel.classList.add('active');setTimeout(()=>panel.querySelectorAll('.rv').forEach(el=>el.classList.add('on')),100)}
  const nav=document.getElementById('tabNav');if(nav)nav.scrollIntoView({behavior:'smooth',block:'start'});
}

/* FORM SUBMISSIONS */
document.addEventListener('DOMContentLoaded',()=>{
  const hcForm=document.getElementById('hcForm');
  if(hcForm){hcForm.addEventListener('submit',async e=>{e.preventDefault();try{const r=await fetch(hcForm.action,{method:'POST',body:new FormData(hcForm),headers:{'Accept':'application/json'}});if(r.ok){hcForm.style.display='none';const s=document.getElementById('fSuccess');if(s)s.style.display='block'}else hcForm.submit()}catch{hcForm.submit()}})}
  const nlForm=document.getElementById('nlForm');
  if(nlForm){nlForm.addEventListener('submit',async e=>{e.preventDefault();const btn=nlForm.querySelector('.f-submit span');if(btn)btn.textContent='Sending...';try{const r=await fetch(nlForm.action,{method:'POST',body:new FormData(nlForm),headers:{'Accept':'application/json'}});if(r.ok){nlForm.style.display='none';const s=document.getElementById('nlSuccess');if(s)s.style.display='block'}else nlForm.submit()}catch{nlForm.submit()}})}
});

/* PORTFOLIO: load from JSON */
async function loadPortfolio(){
  const grid=document.getElementById('portfolioGrid');
  const clientGrid=document.getElementById('clientGrid');
  const emptyWork=document.getElementById('emptyWork');
  const emptyClients=document.getElementById('emptyClients');
  if(!grid&&!clientGrid)return;
  try{
    const res=await fetch('/content/work.json');
    if(!res.ok)throw new Error('no data');
    const data=await res.json();

    if(grid&&data.portfolio&&data.portfolio.length){
      emptyWork&&(emptyWork.style.display='none');
      grid.style.display='grid';
      grid.innerHTML=data.portfolio.map(p=>`
        <div class="portfolio-item rv">
          <img class="port-img" src="${p.image||'/img/placeholder.png'}" alt="${p.title}" loading="lazy">
          <div class="port-overlay">
            <div class="port-client">${p.client||''}</div>
            <div class="port-title">${p.title||''}</div>
          </div>
        </div>`).join('');
      initReveal();
    }

    if(clientGrid&&data.clients&&data.clients.length){
      emptyClients&&(emptyClients.style.display='none');
      clientGrid.style.display='grid';
      clientGrid.innerHTML=data.clients.map(c=>`
        <div class="client-logo-box rv">
          ${c.logo?`<img src="${c.logo}" alt="${c.name}" loading="lazy">`:`<span style="font-family:'Bebas Neue',sans-serif;font-size:1.2rem;color:var(--muted);">${c.name}</span>`}
        </div>`).join('');
      initReveal();
    }
  }catch(e){
    if(emptyWork)emptyWork.style.display='block';
    if(emptyClients)emptyClients.style.display='block';
  }
}

/* RESOURCES: load from JSON */
async function loadResources(){
  const list=document.getElementById('resourcesList');
  if(!list)return;
  try{
    const res=await fetch('/content/resources.json');
    if(!res.ok)throw new Error('no data');
    const data=await res.json();
    if(data.posts&&data.posts.length){
      list.innerHTML=data.posts.map((p,i)=>`
        <a href="${p.slug?'/resources/'+p.slug+'.html':'#'}" class="res-card rv ${i>0?'d'+Math.min(i,4):''}">
          <div class="res-n">${String(i+1).padStart(2,'0')}</div>
          <div>
            <h3>${p.title}</h3>
            <p>${p.excerpt||''}</p>
          </div>
        </a>`).join('');
      initReveal();
    }
  }catch(e){/* keep static fallback */}
}

document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('portfolioGrid'))loadPortfolio();
  if(document.getElementById('resourcesList'))loadResources();
});
