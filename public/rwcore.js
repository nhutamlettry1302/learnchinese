/* Rừng Cá Voi – lõi dùng chung: đăng nhập (tùy chọn), phòng học, nội dung từ vựng/ngữ pháp, ghi điểm */
(function(){
const RW=window.RW||{},ON=!!(RW.url&&RW.key);
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const J=s=>{try{return JSON.parse(s)}catch(e){return null}};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- đăng nhập (GoTrue qua REST) ---------- */
let sess=J(ls.get('rw_sess'));
const saveSess=s=>{sess=s;s?ls.set('rw_sess',JSON.stringify(s)):ls.del('rw_sess')};
async function auth(path,body){const r=await fetch(RW.url+'/auth/v1/'+path,{method:'POST',headers:{apikey:RW.key,'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(d.msg||d.error_description||d.message||('Lỗi '+r.status));return d}
function take(d){if(d&&d.access_token){saveSess({access_token:d.access_token,refresh_token:d.refresh_token,exp:Math.floor(Date.now()/1000)+(d.expires_in||3600),user:d.user||(sess&&sess.user)});return true}return false}
async function token(){if(!sess)return RW.key;if(sess.exp-60<Date.now()/1000){try{const d=await auth('token?grant_type=refresh_token',{refresh_token:sess.refresh_token});take(d)}catch(e){saveSess(null);return RW.key}}return sess.access_token}
async function rpc(fn,body){const t=await token();const r=await fetch(RW.url+'/rest/v1/rpc/'+fn,{method:'POST',headers:{apikey:RW.key,Authorization:'Bearer '+t,'Content-Type':'application/json'},body:JSON.stringify(body||{})});
 if(!r.ok){let m='';try{m=(await r.json()).message||''}catch(e){}throw new Error(m||('Lỗi '+r.status))}const x=await r.text();return x?JSON.parse(x):null}
let prof=J(ls.get('rw_prof'));
const Auth={
 get user(){return sess&&sess.user},get profile(){return sess?prof:null},get loggedIn(){return !!sess},
 async signUp(email,pw,name){const d=await auth('signup',{email,password:pw,data:{name}});if(take(d)){await Auth.refresh(name);return{ok:true}}return{ok:true,confirm:true}},
 async signIn(email,pw){const d=await auth('token?grant_type=password',{email,password:pw});take(d);await Auth.refresh();return{ok:true}},
 async refresh(name){if(!sess)return null;try{prof=await rpc('rw_me',{p_name:name||''});ls.set('rw_prof',JSON.stringify(prof))}catch(e){}return prof},
 signOut(){saveSess(null);prof=null;ls.del('rw_prof')},
 async becomeTeacher(pass){await rpc('rw_become_teacher',{p_pass:pass});return Auth.refresh()}
};
/* ---------- phòng & người chơi ---------- */
const Room={
 get me(){return J(ls.get('rw_me'))},           // {name,code,cls}  (khớp với trò Chém hoa quả)
 get cfg(){return J(ls.get('rw_room'))},         // {code,name,config}
 async join(code,name){code=String(code||'').trim().toUpperCase();const r=await rpc('room_get',{p_code:code});if(!r)throw new Error('Mã phòng không đúng.');if(r.closed)throw new Error('Phòng này đã đóng.');
  ls.set('rw_room',JSON.stringify(r));ls.set('rw_me',JSON.stringify({name:name,code:r.code,cls:r.name}));return r},
 leave(){ls.del('rw_room');ls.del('rw_me')},
 async leaderboard(game,limit){const m=Room.me;if(!m)return[];return rpc('leaderboard',{p_game:game,p_code:m.code,p_limit:limit||10})}
};
async function submit(game,score){const m=Room.me;if(!ON||!m||!score)return false;try{await rpc('submit_score',{p_game:game,p_code:m.code,p_player:m.name,p_score:Math.round(score)});return true}catch(e){return false}}
/* ---------- nội dung ---------- */
function loadScript(src){return new Promise((ok,no)=>{if(document.querySelector('script[data-src="'+src+'"]'))return ok();const s=document.createElement('script');s.src=src;s.dataset.src=src;s.onload=ok;s.onerror=()=>no(new Error('Không tải được '+src));document.head.appendChild(s)})}
const Data={
 async need(vocab,gram){if(vocab&&!window.VOC)await loadScript('vocab.js');if(gram&&!window.GRM)await loadScript('gram.js')},
 vocabLevels(){return(window.VOC||[]).map(l=>({k:l.k,n:l.n,ls:l.ls.map(x=>({n:x.n,t:x.t,c:x.w.length}))}))},
 gramLevels(){return Object.keys(window.GRM||{}).map(k=>({k,n:k,ls:GRM[k].lessons.map(x=>({n:x.n,t:x.t,c:GRM[k].quiz.filter(q=>q.l===x.n).length}))}))},
 vocab(sel){const out=[];(window.VOC||[]).forEach(L=>{const ls_=sel&&sel[L.k];if(!ls_||!ls_.length)return;L.ls.forEach(x=>{if(ls_.includes(x.n))x.w.forEach(w=>out.push({zh:w[0],py:w[1],vn:w[2],lv:L.k,l:x.n}))})});return out},
 gramQuiz(sel){const out=[];Object.keys(sel||{}).forEach(k=>{const G=window.GRM&&GRM[k];if(!G)return;const ls_=sel[k];G.quiz.forEach(q=>{if(ls_.includes(q.l))out.push({s:q.s,a:q.a,zh:q.zh,lv:k,pool:G.pool||[]})})});return out},
 gramPoints(sel){const out=[];Object.keys(sel||{}).forEach(k=>{const G=window.GRM&&GRM[k];if(!G)return;G.lessons.forEach(x=>{if(!sel[k].includes(x.n))return;x.pts.forEach(p=>out.push({zh:p.zh,en:p.en,vn:p.vn,ex:p.ex,lv:k}))})});return out}
};
/* Nội dung đang chơi: trong phòng thì theo giáo viên chọn, ngoài phòng thì theo lựa chọn của chính người chơi */
const Ctx={
 get sel(){const r=Room.cfg,m=Room.me;if(r&&m&&r.code===m.code)return r.config||{};return J(ls.get('rw_sel'))||{vocab:{HSK1:[1,2,3]},gram:{}}},
 setSel(s){ls.set('rw_sel',JSON.stringify(s))},
 get inRoom(){const r=Room.cfg,m=Room.me;return !!(r&&m&&r.code===m.code)},
 async load(){const s=Ctx.sel;await Data.need(true,Object.keys(s.gram||{}).length>0);return{room:Ctx.inRoom?Room.cfg:null,sel:s,vocab:Data.vocab(s.vocab),quiz:Data.gramQuiz(s.gram),points:Data.gramPoints(s.gram)}}
};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n,not)=>{const o=[];for(const x of shuf(a)){if(not&&not(x))continue;o.push(x);if(o.length>=n)break}return o};
/* câu hỏi trắc nghiệm từ nội dung: nghĩa, chữ Hán, pinyin, điền từ ngữ pháp */
function makeQ(c,kind){const V=c.vocab,Q=c.quiz;
 const k=kind||(Q.length&&(!V.length||Math.random()<.4)?'gram':['zh2vn','vn2zh','zh2py'][Math.floor(Math.random()*3)]);
 if(k==='gram'&&Q.length){const q=Q[Math.floor(Math.random()*Q.length)],pool=q.pool.filter(x=>x!==q.a);const opts=shuf([q.a].concat(pick(pool,3)));return{type:'gram',prompt:q.s,sub:q.zh,opts,ans:q.a,say:q.s.replace('____',q.a)}}
 if(V.length<4)return null;const w=V[Math.floor(Math.random()*V.length)],o=pick(V,3,x=>x.zh===w.zh||x.vn===w.vn);
 if(k==='vn2zh')return{type:'vn2zh',prompt:w.vn,sub:'Chọn chữ Hán đúng',opts:shuf([w.zh].concat(o.map(x=>x.zh))),ans:w.zh,say:w.zh};
 if(k==='zh2py')return{type:'zh2py',prompt:w.zh,sub:'Chọn pinyin đúng',opts:shuf([w.py].concat(o.map(x=>x.py))),ans:w.py,say:w.zh,zh:true};
 return{type:'zh2vn',prompt:w.zh,sub:w.py,opts:shuf([w.vn].concat(o.map(x=>x.vn))),ans:w.vn,say:w.zh,zh:true}}
/* ---------- âm thanh ---------- */
let ac;function beep(ok){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type=ok?'triangle':'sawtooth';const t=ac.currentTime;o.frequency.setValueAtTime(ok?660:200,t);if(ok)o.frequency.setValueAtTime(880,t+.09);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.start(t);o.stop(t+.26)}catch(e){}}
function say(t){if(window.rwSay)window.rwSay(t,{})}
window.RWC={ON,ls,J,esc,Auth,Room,Data,Ctx,rpc,submit,shuf,pick,makeQ,beep,say,loadScript};
})();
