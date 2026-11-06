/* Đọc tiếng Trung: giọng máy (nếu có và chạy được) -> Youdao -> Baidu -> Sogou -> Google.
   Dùng MỘT thẻ audio chung đã "mở khóa" ở lần chạm đầu tiên, để vẫn phát được khi âm thanh
   được gọi sau khi đi bộ / hẹn giờ (không nằm trong lần bấm) trên iPhone, iPad và Chrome điện thoại. */
(function(){
 let voice=null,lastWarn=0,seq=0,unlocked=false;
 const A=new Audio();A.preload='auto';A.setAttribute('playsinline','');
 const SILENT='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
 function pick(){try{const v=speechSynthesis.getVoices();voice=v.find(x=>/zh[-_]CN|cmn-Hans-CN/i.test(x.lang))||v.find(x=>/^zh/i.test(x.lang))||null}catch(e){}}
 try{pick();speechSynthesis.onvoiceschanged=pick}catch(e){}
 function unlock(){if(unlocked)return;unlocked=true;
  try{A.src=SILENT;const p=A.play();if(p&&p.then)p.then(()=>{A.pause()}).catch(()=>{unlocked=false})}catch(e){unlocked=false}
  try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}
  try{const C=window.AudioContext||window.webkitAudioContext;if(C){const c=new C();if(c.resume)c.resume()}}catch(e){}
  if(unlocked)['pointerdown','touchend','click','keydown'].forEach(ev=>removeEventListener(ev,unlock,true))}
 ['pointerdown','touchend','click','keydown'].forEach(ev=>addEventListener(ev,unlock,{capture:true,passive:true}));
 function urls(t){const q=encodeURIComponent(t);return[
  'https://dict.youdao.com/dictvoice?audio='+q+'&le=zh',
  'https://fanyi.baidu.com/gettts?lan=zh&text='+q+'&spd=4&source=web',
  'https://fanyi.sogou.com/reventondc/synthesis?text='+q+'&speed=0.9&lang=zh-CHS&from=translateweb',
  'https://translate.google.com/translate_tts?ie=UTF8&q='+q+'&tl=zh-CN&client=tw-ob']}
 function viaFile(t,i,done,my){const u=urls(t);if(my!==seq)return;if(i>=u.length){done(false);return}
  let fin=false;const next=()=>{if(fin)return;fin=true;cleanup();viaFile(t,i+1,done,my)};
  const ok=()=>{if(fin)return;fin=true;cleanup();done(true)};
  const timer=setTimeout(next,5000);
  const cleanup=()=>{clearTimeout(timer);A.onerror=null;A.onplaying=null};
  try{A.pause();A.onerror=next;A.onplaying=ok;A.src=u[i];A.currentTime=0;
   const p=A.play();if(p&&p.catch)p.catch(next)}catch(e){next()}}
 window.rwSay=function(t,opt){opt=opt||{};const my=++seq;
  const fail=()=>{const n=Date.now();if(n-lastWarn>20000){lastWarn=n;window.dispatchEvent(new CustomEvent('rw-nosound'))}};
  const files=()=>viaFile(t,0,ok=>{if(!ok)fail()},my);
  try{A.pause()}catch(e){}
  if(voice&&'speechSynthesis' in window){
   try{const u=new SpeechSynthesisUtterance(t);u.voice=voice;u.lang=voice.lang;u.rate=opt.rate||.85;
    let started=false,gone=false;const go=()=>{if(gone||my!==seq)return;gone=true;try{speechSynthesis.cancel()}catch(e){}files()};
    u.onstart=()=>{started=true};u.onerror=e=>{if(!started)go()};
    const wd=setTimeout(()=>{if(!started)go()},2500);u.onend=()=>clearTimeout(wd);
    speechSynthesis.cancel();speechSynthesis.speak(u);return}catch(e){}}
  files()};
 window.rwCanSay=true;
})();
