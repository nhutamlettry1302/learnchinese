/* Rừng Cá Voi – phòng chơi TRỰC TIẾP: giáo viên và học sinh tương tác cùng lúc (Supabase Realtime Broadcast) */
(function(){
const C=window.RWC,RW=window.RW||{};
const MOCK=/[?&]mock=1/.test(location.search);
const SB_URL='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
/* Chia học sinh vào các kênh nhỏ (SHARDS) để mỗi tin nhắn chỉ gửi tới vài bạn cùng kênh + giáo viên,
   thay vì gửi tới cả lớp. Lớp 28 bạn trước đây tạo ra hàng trăm tin/giây và bị Supabase chặn. */
const SHARDS=14;
const shardOf=id=>{let h=0;for(const c of String(id||''))h=(h*31+c.charCodeAt(0))>>>0;return h%SHARDS};
async function connect(code,onMsg,opts){opts=opts||{};const host=opts.role==='host';
 if(MOCK){const bc=new BroadcastChannel('rwl:'+code);bc.onmessage=e=>onMsg(e.data);return{send:m=>bc.postMessage(m),close:()=>bc.close(),mock:true}}
 await C.loadScript(SB_URL);
 const sb=window.supabase.createClient(RW.url,RW.key,{realtime:{params:{eventsPerSecond:80}}});
 /* giáo viên nghe tất cả kênh (kể cả kênh cũ để trình duyệt chưa tải lại vẫn vào được); học sinh chỉ vào kênh của mình */
 const names=host?['rwl:'+code,...Array.from({length:SHARDS},(_,i)=>'rwl:'+code+':s'+i)]:['rwl:'+code+':s'+shardOf(opts.id)];
 const chs=names.map(n=>{const ch=sb.channel(n,{config:{broadcast:{self:false,ack:false}}});ch.on('broadcast',{event:'m'},p=>onMsg(p.payload));return ch});
 await Promise.all(chs.map(ch=>new Promise((ok,no)=>{const t=setTimeout(()=>no(new Error('Không kết nối được phòng trực tiếp. Kiểm tra mạng rồi thử lại.')),12000);ch.subscribe(s=>{if(s==='SUBSCRIBED'){clearTimeout(t);ok()}else if(s==='CHANNEL_ERROR'||s==='TIMED_OUT'){clearTimeout(t);no(new Error('Không kết nối được phòng trực tiếp.'))}})})));
 return{send:m=>chs.forEach(ch=>ch.send({type:'broadcast',event:'m',payload:m})),close:()=>{chs.forEach(ch=>{try{sb.removeChannel(ch)}catch(e){}})}}
}
async function getRoom(code){code=String(code||'').trim().toUpperCase();
 if(MOCK)return{code,name:'Phòng thử',config:{vocab:{HSK1:[1,2,3]},gram:{HSK1:[1,2]}}};
 const r=await C.rpc('room_get',{p_code:code});if(!r)throw new Error('Mã phòng không đúng.');return r}
const rid=()=>{let v=null;try{v=sessionStorage.getItem('rwl_id')}catch(e){}if(!v){v=Math.random().toString(36).slice(2,10);try{sessionStorage.setItem('rwl_id',v)}catch(e){}}return v};
const PETN=['Xanh dương','Hồng','Tím','Vàng','Xanh lá','Trắng','Đen'];
const CARC=['#4aa3df','#ef7fa6','#9a7bd6','#f2c230','#6cc070','#e8e8e8','#4a5560'];
const SKART={
 car:c=>`<svg viewBox="0 0 120 64"><g stroke="#244c43" stroke-width="3" stroke-linejoin="round"><path d="M8 44q0-12 12-14l16-14q4-4 10-4h26q8 0 14 6l12 12q10 2 12 8v8q0 4-4 4H12q-4 0-4-6z" fill="${c}"/><path d="M40 20h22v12H34z M68 20h10l10 12H68z" fill="#e6f6ff"/></g><circle cx="34" cy="54" r="9" fill="#333" stroke="#244c43" stroke-width="3"/><circle cx="90" cy="54" r="9" fill="#333" stroke="#244c43" stroke-width="3"/><circle cx="34" cy="54" r="3" fill="#ccc"/><circle cx="90" cy="54" r="3" fill="#ccc"/></svg>`,
 rocket:c=>`<svg viewBox="0 0 120 64"><g stroke="#244c43" stroke-width="3" stroke-linejoin="round"><path d="M14 32l16-10v20z" fill="#ff9a3d"/><path d="M28 18h42q26 0 34 14q-8 14-34 14H28q-6-14 0-28z" fill="#f4f1e8"/><path d="M70 18q26 0 34 14q-8 14-34 14z" fill="${c}"/><circle cx="56" cy="32" r="8" fill="#bfe9ff"/><path d="M34 18l-8-12h18l6 12zM34 46l-8 12h18l6-12z" fill="${c}"/></g></svg>`,
 climb:c=>`<svg viewBox="0 0 120 64"><g stroke="#244c43" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><circle cx="60" cy="14" r="9" fill="#ffd9b8"/><path d="M50 8q10-10 20 0z" fill="${c}"/><rect x="48" y="24" width="24" height="22" rx="8" fill="${c}"/><rect x="40" y="26" width="10" height="20" rx="5" fill="#8a5a22"/><path d="M54 46l-8 14M66 46l8 14M72 28l16-14" fill="none"/><path d="M88 6l-4 10" /></g></svg>`,
 boat:c=>`<svg viewBox="0 0 120 64"><g stroke="#244c43" stroke-width="3" stroke-linejoin="round"><path d="M60 4v34" fill="none"/><path d="M62 6l30 26H62z" fill="#fffefa"/><path d="M58 12L34 32h24z" fill="${c}"/><path d="M12 38h96q-8 18-28 18H40q-22 0-28-18z" fill="${c}"/><path d="M16 46h88" stroke="#fff" stroke-width="3" fill="none"/></g></svg>`};

SKART.submarine=c=>`<svg viewBox="0 0 120 64"><g stroke="#244f40" stroke-width="2.5" stroke-linejoin="round"><path d="M18 24h66q23 0 27 14q-4 15-27 15H18q-12-14 0-29z" fill="${c}"/><path d="M43 24V10h17v6H51v8" fill="#e9d8a4"/><path d="M16 28L4 20v32l12-8" fill="#e9d8a4"/><circle cx="76" cy="37" r="9" fill="#d8f1eb"/><circle cx="47" cy="37" r="6" fill="#d8f1eb"/></g></svg>`;
SKART.balloon=c=>`<svg viewBox="0 0 120 64"><g stroke="#244f40" stroke-width="2" stroke-linejoin="round"><path d="M36 12C36-3 84-3 84 12q0 18-16 28H52Q36 30 36 12z" fill="${c}"/><path d="M50 3q-9 18 7 37M70 3q9 18-7 37" fill="none" stroke="#fff8dd"/><path d="M53 40l2 9m12-9-2 9"/><path d="M49 49h22l-3 12H52z" fill="#cda675"/></g></svg>`;
SKART.train=c=>`<svg viewBox="0 0 120 64"><g stroke="#244f40" stroke-width="2.5" stroke-linejoin="round"><path d="M8 22h42v25H8zM56 27h38v20H56z" fill="${c}"/><path d="M3 14h53v8H3z" fill="#e8cea0"/><path d="M14 27h14v10H14zm20 0h10v10H34z" fill="#d9f0ed"/><path d="M88 11h10v16H88zM95 39l18 9H95" fill="#cfad7a"/><path d="M60 31h18v8H60z" fill="#e1eee5"/><circle cx="21" cy="51" r="8" fill="#5f685d"/><circle cx="43" cy="51" r="8" fill="#5f685d"/><circle cx="70" cy="51" r="8" fill="#5f685d"/><circle cx="94" cy="51" r="8" fill="#5f685d"/></g></svg>`;

const skHtml=(sk,i,w,cls)=>{const c=CARC[i],h=Math.round(w*112/190);return`<span class="pw sk ${cls||''}" style="width:${w}px;height:${h}px">${SKART[sk](c).replace('<svg ',`<svg width="${w}" height="${h}" `)}</span>`};
const carHtml=(i,w,cls)=>skHtml('car',i,w,cls);
const petHtml=(i,w,cls)=>{i=((+i||0)%7+7)%7;if(window.RWL&&SKART[RWL.skin])return skHtml(RWL.skin,i,w,cls);const h=Math.round(w*112/190);return`<span class="pw ${cls||''}" style="width:${w}px;height:${h}px;background-size:${w*7}px ${h}px;background-position:-${i*w}px 0"></span>`};
const myChar=()=>{let v=null;try{v=localStorage.getItem('rw_live_pet')}catch(e){}if(v===null){try{v=(JSON.parse(localStorage.getItem('tp_state')||'null')||{}).pet}catch(e){}}const n=(window.ROXIE_CHARACTERS||[]).length||7;return(((+v||0)%n)+n)%n};
const myPet=()=>{let v=null;try{v=localStorage.getItem('rw_live_pet')}catch(e){}if(v===null){try{v=(JSON.parse(localStorage.getItem('tp_state')||'null')||{}).pet}catch(e){}}return((+v||0)%7+7)%7};
const setPet=i=>{try{localStorage.setItem('rw_live_pet',String(i))}catch(e){}};
/* Đường đua: phần thưởng và chướng ngại vật, cùng một dãy cho cả cô và học sinh (sinh từ mã phòng + số bước) */
const IC=(n,w)=>`<img class="ic" src="assets/game/${n}.svg" alt="" style="width:${w||22}px;height:${w||22}px">`;
const HEARTS=(n,m)=>Array.from({length:m||3},(_,i)=>`<img class="ic${i<n?'':' off'}" src="assets/game/pearl-life.svg" alt="" style="width:24px;height:24px">`).join('');
const MEDAL=i=>i<3?IC(['medal-gold','medal-silver','medal-bronze'][i],26):String(i+1);
const KIND={gift:{ic:IC('gift-box',26),t:'Hộp quà may mắn!',d:0},star:{ic:IC('star-fish',26),t:'Sao biển! +2 bước',d:2},rock:{ic:IC('rock',26),t:'Đá ngầm! lùi 1 bước',d:-1},whirl:{ic:IC('whirlpool',26),t:'Xoáy nước! đứng 2 giây',lock:2000}};
/* Chướng ngại vật xuất hiện/biến mất ngẫu nhiên theo thời gian (cùng một ván thì cả lớp thấy giống nhau) */
function obst(code,goal,sd,dur){let h=0;for(const c of String(code)+':'+goal+':'+(sd||0)+':o')h=(h*31+c.charCodeAt(0))>>>0;const rnd=()=>{h=(h*1664525+1013904223)>>>0;return h/4294967296};
 dur=dur||240;const n=Math.max(4,Math.round(goal/3)),ps=[];for(let g=0;g<400&&ps.length<n;g++){const p=2+Math.floor(rnd()*(goal-4));if(ps.every(q=>Math.abs(q-p)>=2))ps.push(p)}
 return ps.sort((a,b)=>a-b).map(p=>{const r=rnd(),k=r<.22?'gift':r<.46?'star':r<.74?'rock':'whirl',a=rnd()*dur*.8;return{p,k,a,b:a+20+rnd()*45}})}
function tiles(code,goal,sd){let h=0;for(const c of String(code)+':'+goal+':'+(sd||0))h=(h*31+c.charCodeAt(0))>>>0;const rnd=()=>{h=(h*1664525+1013904223)>>>0;return h/4294967296};
 /* chướng ngại vật rải ngẫu nhiên suốt đường đua, khoảng cách và loại thay đổi mỗi ván; cả lớp trong cùng ván có cùng một đường đua */
 const T={};let p=2+Math.floor(rnd()*2);while(p<goal-1){const r=rnd();T[p]=r<.36?'star':r<.7?'rock':'whirl';p+=3+Math.floor(rnd()*3)}return T}
function seedQ(C,content,sd,k){let a=0x9e3779b9^(sd|0)^Math.imul(k+1,2654435761);const R=Math.random;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};try{return C.makeQ(content)}finally{Math.random=R}}
window.RWL={seedQ,connect,getRoom,rid,MOCK,PETN,petHtml,myPet,myChar,setPet,KIND,tiles,obst,IC,HEARTS,MEDAL,CARC,carHtml};
})();
