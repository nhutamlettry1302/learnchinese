/* Nhạc nền vui nhộn tự tổng hợp bằng WebAudio (không dùng file, không vướng bản quyền).
   RWM.set('race'|'calm'|null) bật/tắt theo trạng thái trò chơi; nút 🔊/🔇 góc phải dưới để tắt/bật. */
(function(){
const KEY='rw_music';let ac,master,timer,mode=null,step=0,next=0,on=true;
try{on=localStorage.getItem(KEY)!=='off'}catch(e){}
const P=[0,2,4,7,9,12,14,16,19,21]; /* thang âm ngũ cung (C major pentatonic) theo bán cung */
const f=n=>261.63*Math.pow(2,n/12);
const MEL={race:[[0,4,7,4],[9,7,4,7],[7,9,12,9],[7,4,2,4],[0,4,7,12],[9,12,9,7],[4,7,9,7],[2,4,0,-3]],
 calm:[[0,-1,4,-1],[7,-1,4,-1],[9,-1,7,-1],[4,-1,2,-1],[0,-1,4,-1],[7,-1,12,-1],[9,-1,7,-1],[4,-1,0,-1]]};
const BASS=[-24,-24,-19,-19,-17,-17,-19,-19];
function tone(t,hz,d,type,v){const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=hz;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05)}
function noise(t,d,v){const n=ac.sampleRate*d,b=ac.createBuffer(1,n,ac.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=ac.createBufferSource(),g=ac.createGain(),h=ac.createBiquadFilter();h.type='highpass';h.frequency.value=6000;s.buffer=b;g.gain.value=v;s.connect(h);h.connect(g);g.connect(master);s.start(t)}
function tick(){if(!ac||!mode)return;const bpm=mode==='race'?132:92,sp=60/bpm/2; /* nốt móc đơn */
 while(next<ac.currentTime+.4){const row=Math.floor(step/4)%8,i=step%4,m=MEL[mode][row][i];
  if(m!==-1)tone(next,f(m),mode==='race'?.22:.5,mode==='race'?'triangle':'sine',mode==='race'?.5:.4);
  if(step%8===0)tone(next,f(BASS[Math.floor(step/8)%8]),sp*7,'sine',.7);
  if(mode==='race'){if(i%2===0)noise(next,.04,.12);if(i===0||i===2)tone(next,f(-12),.07,'square',.12)}
 step++;next+=sp}}
function boot(){if(ac)return true;try{ac=new (window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=on?.07:0;master.connect(ac.destination);return true}catch(e){return false}}
function run(){if(!mode||!on)return;if(!boot())return;if(ac.state==='suspended')ac.resume();if(!timer){next=ac.currentTime+.05;timer=setInterval(tick,120)}}
function halt(){if(timer){clearInterval(timer);timer=null}if(ac&&ac.state==='running')ac.suspend().catch(()=>{})}
function btn(){let b=document.getElementById('rw-mus');if(b)return b;b=document.createElement('button');b.id='rw-mus';b.type='button';b.style.cssText='position:fixed;right:14px;bottom:14px;z-index:99;width:44px;height:44px;border-radius:50%;border:1px solid #b9c9b0;background:#fffef9;color:#244c3d;font-size:20px;cursor:pointer;box-shadow:0 3px 10px #0003;display:none';b.onclick=()=>{on=!on;try{localStorage.setItem(KEY,on?'on':'off')}catch(e){}paint();if(on){run();if(master)master.gain.value=.07}else if(master)master.gain.value=0};document.body.appendChild(b);return b}
function paint(){const b=btn();b.textContent=on?'🎵':'🔇';b.title=on?'Tắt nhạc nền':'Bật nhạc nền';b.setAttribute('aria-label',b.title);b.style.display=mode?'block':'none'}
function unlock(){if(mode&&on)run()}
['pointerdown','keydown','touchstart'].forEach(e=>document.addEventListener(e,unlock,{passive:true}));
window.RWM={set(m){if(m===mode)return;mode=m||null;if(!mode){halt()}else{step=0;if(ac)next=ac.currentTime+.05;run()}if(document.body)paint()},isOn:()=>on};
})();
