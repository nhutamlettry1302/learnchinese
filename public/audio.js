/* Đọc tiếng Trung: giọng máy (nếu có) -> Youdao -> Google. Không cần khóa. */
(function(){
 let voice=null,tried=0,cur=null;
 function pick(){try{const v=speechSynthesis.getVoices();voice=v.find(x=>/zh[-_]CN|cmn-Hans-CN/i.test(x.lang))||v.find(x=>/^zh/i.test(x.lang))||null}catch(e){}}
 try{pick();speechSynthesis.onvoiceschanged=pick}catch(e){}
 function urls(t){const q=encodeURIComponent(t);return['https://dict.youdao.com/dictvoice?audio='+q+'&le=zh','https://translate.google.com/translate_tts?ie=UTF8&q='+q+'&tl=zh-CN&client=tw-ob']}
 function viaFile(t,i,done){const u=urls(t);if(i>=u.length){done(false);return}
  try{if(cur){cur.pause();cur=null}const a=new Audio(u[i]);cur=a;let ok=false;
   a.onerror=()=>{if(!ok){ok=true;viaFile(t,i+1,done)}};
   const p=a.play();if(p&&p.then)p.then(()=>{if(!ok){ok=true;done(true)}}).catch(()=>{if(!ok){ok=true;viaFile(t,i+1,done)}});else done(true)}catch(e){viaFile(t,i+1,done)}}
 window.rwSay=function(t,opt){opt=opt||{};
  const fail=()=>{if(!tried){tried=1;window.dispatchEvent(new CustomEvent('rw-nosound'))}};
  if(voice&&'speechSynthesis' in window){try{const u=new SpeechSynthesisUtterance(t);u.voice=voice;u.lang=voice.lang;u.rate=opt.rate||.85;speechSynthesis.cancel();speechSynthesis.speak(u);return}catch(e){}}
  viaFile(t,0,ok=>{if(!ok)fail()})};
 window.rwCanSay=true;
})();
