/* Rừng Cá Voi – phòng chơi TRỰC TIẾP: giáo viên và học sinh tương tác cùng lúc (Supabase Realtime Broadcast) */
(function(){
const C=window.RWC,RW=window.RW||{};
const MOCK=/[?&]mock=1/.test(location.search);
const SB_URL='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
async function connect(code,onMsg){
 if(MOCK){const bc=new BroadcastChannel('rwl:'+code);bc.onmessage=e=>onMsg(e.data);return{send:m=>bc.postMessage(m),close:()=>bc.close(),mock:true}}
 await C.loadScript(SB_URL);
 const sb=window.supabase.createClient(RW.url,RW.key,{realtime:{params:{eventsPerSecond:30}}});
 const ch=sb.channel('rwl:'+code,{config:{broadcast:{self:false,ack:false}}});
 ch.on('broadcast',{event:'m'},p=>onMsg(p.payload));
 await new Promise((ok,no)=>{const t=setTimeout(()=>no(new Error('Không kết nối được phòng trực tiếp. Kiểm tra mạng rồi thử lại.')),12000);ch.subscribe(s=>{if(s==='SUBSCRIBED'){clearTimeout(t);ok()}else if(s==='CHANNEL_ERROR'||s==='TIMED_OUT'){clearTimeout(t);no(new Error('Không kết nối được phòng trực tiếp.'))}})});
 return{send:m=>ch.send({type:'broadcast',event:'m',payload:m}),close:()=>{try{sb.removeChannel(ch)}catch(e){}}}
}
async function getRoom(code){code=String(code||'').trim().toUpperCase();
 if(MOCK)return{code,name:'Phòng thử',config:{vocab:{HSK1:[1,2,3]},gram:{HSK1:[1,2]}}};
 const r=await C.rpc('room_get',{p_code:code});if(!r)throw new Error('Mã phòng không đúng.');return r}
const rid=()=>{let v=null;try{v=sessionStorage.getItem('rwl_id')}catch(e){}if(!v){v=Math.random().toString(36).slice(2,10);try{sessionStorage.setItem('rwl_id',v)}catch(e){}}return v};
const PETN=['Xanh dương','Hồng','Tím','Vàng','Xanh lá','Trắng','Đen'];
const petHtml=(i,w,cls)=>{i=((+i||0)%7+7)%7;const h=Math.round(w*112/190);return`<span class="pw ${cls||''}" style="width:${w}px;height:${h}px;background-size:${w*7}px ${h}px;background-position:-${i*w}px 0"></span>`};
const myPet=()=>{let v=null;try{v=localStorage.getItem('rw_live_pet')}catch(e){}if(v===null){try{v=(JSON.parse(localStorage.getItem('tp_state')||'null')||{}).pet}catch(e){}}return((+v||0)%7+7)%7};
const setPet=i=>{try{localStorage.setItem('rw_live_pet',String(i))}catch(e){}};
/* Đường đua: phần thưởng và chướng ngại vật, cùng một dãy cho cả cô và học sinh (sinh từ mã phòng + số bước) */
const KIND={star:{ic:'⭐',t:'Sao biển! +2 bước',d:2},rock:{ic:'🪨',t:'Đá ngầm! lùi 1 bước',d:-1},whirl:{ic:'🌀',t:'Xoáy nước! đứng 2 giây',lock:2000}};
function tiles(code,goal){let h=0;for(const c of String(code)+':'+goal)h=(h*31+c.charCodeAt(0))>>>0;const rnd=()=>{h=(h*1664525+1013904223)>>>0;return h/4294967296};
 const T={};let last=-9;for(let p=3;p<goal-1;p++){if(p-last<3)continue;const r=rnd();let k=null;if(r<.13)k='star';else if(r<.22)k='rock';else if(r<.29)k='whirl';if(k){T[p]=k;last=p}}return T}
window.RWL={connect,getRoom,rid,MOCK,PETN,petHtml,myPet,setPet,KIND,tiles};
})();
