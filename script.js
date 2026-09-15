document.addEventListener('DOMContentLoaded',()=>{const m=document.querySelector('.menu-toggle'),n=document.querySelector('.main-nav');if(m&&n){m.onclick=()=>{let o=n.classList.toggle('open');m.setAttribute('aria-expanded',o);m.setAttribute('aria-label',o?'Close menu':'Open menu')};n.querySelectorAll('a').forEach(a=>a.onclick=()=>n.classList.remove('open'));document.addEventListener('click',e=>{if(n.classList.contains('open')&&!n.contains(e.target)&&!m.contains(e.target))n.classList.remove('open')})}document.querySelectorAll('[data-countdown]').forEach(box=>{const t=new Date(box.dataset.countdown).getTime();const u=()=>{let d=Math.max(0,t-Date.now());let x={days:Math.floor(d/86400000),hours:Math.floor(d/3600000)%24,minutes:Math.floor(d/60000)%60,seconds:Math.floor(d/1000)%60};for(let k in x){let e=box.querySelector('[data-unit="'+k+'"]');if(e)e.textContent=String(x[k]).padStart(2,'0')}};u();setInterval(u,1000)})});
document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.getElementById('musicBtn'),playerBox=document.getElementById('musicPlayer'),iframe=document.getElementById('youtubePlayer'),note=document.getElementById('musicNote');
 if(!btn||!playerBox||!iframe)return;
 let player=null, ready=false, playing=false;
 const loadAPI=()=>new Promise(resolve=>{
   if(window.YT&&window.YT.Player){resolve();return;}
   const old=window.onYouTubeIframeAPIReady;
   window.onYouTubeIframeAPIReady=()=>{if(old)old();resolve()};
   const tag=document.createElement('script');tag.src='https://www.youtube.com/iframe_api';document.head.appendChild(tag);
 });
 const setState=(isPlaying)=>{
   playing=isPlaying;
   btn.textContent=isPlaying?'❚❚ Pause Nikkah Song':'♫ Play Nikkah Song';
   btn.setAttribute('aria-expanded',String(isPlaying));
 };
 btn.addEventListener('click',async()=>{
   playerBox.classList.add('open');playerBox.setAttribute('aria-hidden','false');
   if(note) note.classList.remove('show');
   await loadAPI();
   if(!player){
     player=new YT.Player('youtubePlayer',{events:{onReady:e=>{ready=true;e.target.playVideo();setState(true)},onStateChange:e=>{
       if(e.data===YT.PlayerState.PLAYING)setState(true);
       if(e.data===YT.PlayerState.PAUSED||e.data===YT.PlayerState.ENDED)setState(false);
     }}});
   }else if(ready){
     if(playing)player.pauseVideo();else player.playVideo();
   }
 });
});
