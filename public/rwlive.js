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
window.RWL={connect,getRoom,rid,MOCK};
})();
