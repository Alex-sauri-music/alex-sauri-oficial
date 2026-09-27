document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

document.addEventListener('DOMContentLoaded',()=>{
  const gallery=document.querySelector('.ig-gallery');
  if(!gallery)return;
  const slides=Array.from(gallery.querySelectorAll('.ig-slide'));
  const prev=gallery.querySelector('.ig-prev');
  const next=gallery.querySelector('.ig-next');
  const counter=gallery.querySelector('#ig-current');
  const dotsBox=gallery.querySelector('.ig-dots');
  if(!slides.length)return;

  let current=0, startX=0, startY=0;

  if(dotsBox){
    dotsBox.innerHTML='';
    slides.forEach((_,n)=>{
      const d=document.createElement('button');
      d.type='button';
      d.className='ig-dot';
      d.setAttribute('aria-label','Ir a foto '+(n+1));
      d.addEventListener('click',()=>show(n));
      dotsBox.appendChild(d);
    });
  }

  function show(n){
    current=(n+slides.length)%slides.length;
    slides.forEach((slide,k)=>slide.classList.toggle('is-active',k===current));
    if(counter)counter.textContent=String(current+1);
    gallery.querySelectorAll('.ig-dot').forEach((d,k)=>d.classList.toggle('active',k===current));
  }

  prev?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();show(current-1)});
  next?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();show(current+1)});

  gallery.addEventListener('touchstart',e=>{
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
  },{passive:true});

  gallery.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.25) show(current+(dx<0?1:-1));
  },{passive:true});

  gallery.tabIndex=0;
  gallery.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}
    if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}
  });

  show(0);
});