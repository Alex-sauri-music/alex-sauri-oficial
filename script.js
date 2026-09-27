document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

document.addEventListener('DOMContentLoaded',()=>{
  const gallery=document.querySelector('.ig-gallery');
  if(!gallery)return;
  const track=gallery.querySelector('.ig-track');
  const slides=Array.from(gallery.querySelectorAll('.ig-slide'));
  const prev=gallery.querySelector('.ig-prev');
  const next=gallery.querySelector('.ig-next');
  const counter=gallery.querySelector('#ig-current');
  const dotsBox=gallery.querySelector('.ig-dots');
  if(!track||!slides.length)return;

  let current=0;
  let startX=0;

  if(dotsBox){
    dotsBox.innerHTML='';
    slides.forEach((_,n)=>{
      const dot=document.createElement('button');
      dot.type='button';
      dot.className='ig-dot';
      dot.setAttribute('aria-label','Ir a foto '+(n+1));
      dot.addEventListener('click',()=>go(n));
      dotsBox.appendChild(dot);
    });
  }

  function go(n){
    current=(n+slides.length)%slides.length;
    track.style.transform='translate3d(-'+(current*100)+'%,0,0)';
    if(counter)counter.textContent=current+1;
    gallery.querySelectorAll('.ig-dot').forEach((d,k)=>d.classList.toggle('active',k===current));
  }

  prev?.addEventListener('click',e=>{e.preventDefault();go(current-1)});
  next?.addEventListener('click',e=>{e.preventDefault();go(current+1)});

  track.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});
  track.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)>45)go(current+(dx<0?1:-1));
  },{passive:true});

  gallery.setAttribute('tabindex','0');
  gallery.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft')go(current-1);
    if(e.key==='ArrowRight')go(current+1);
  });

  go(0);
});