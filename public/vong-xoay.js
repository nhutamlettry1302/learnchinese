/* Công cụ giảng dạy: Vòng xoay chia nhóm A / B — nhập tên học sinh, xoay xem ai vào nhóm nào */
(function(){
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='rcv_wheel_names';
let saved='';try{saved=localStorage.getItem(KEY)||''}catch(e){}
const S={text:saved,A:[],B:[],rot:0,spin:false,auto:false,last:null,mode:'alt',first:'A',msg:''};
const COL=['#f9c6d0','#bfe0f5','#fbe8a6','#c9ecd9','#e0d4f5','#ffd9b8'];
let rerender=()=>{},raf=0;

if(!document.getElementById('vx-css')){const st=document.createElement('style');st.id='vx-css';st.textContent=`
.vx-grid{display:grid;grid-template-columns:minmax(280px,500px) 1fr;gap:22px;align-items:start}
@media(max-width:820px){.vx-grid{grid-template-columns:1fr}}
.vx-wheel{position:relative;width:100%;max-width:500px;margin:0 auto}
#vx-cv{width:100%;aspect-ratio:1/1;display:block;border-radius:50%;box-shadow:0 6px 0 var(--outline)}
.vx-ptr{position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:34px solid var(--ink);filter:drop-shadow(0 2px 0 rgba(0,0,0,.25));z-index:2;pointer-events:none}
.vx-go{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:23%;aspect-ratio:1/1;border-radius:50%;border:4px solid var(--outline);background:var(--accent);color:var(--on-accent);font:800 clamp(14px,3.2vw,22px) var(--f-d);cursor:pointer;box-shadow:0 4px 0 var(--outline);padding:0;z-index:3}
.vx-go:disabled{opacity:.55;cursor:default}
.vx-in{width:100%;box-sizing:border-box;min-height:150px;resize:vertical;font:600 17px/1.5 var(--f-b);border:2.5px solid var(--outline);border-radius:14px;padding:10px 12px;background:var(--panel2);color:var(--ink)}
.vx-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:10px 0}
.vx-row .btn{padding:6px 14px;font-size:16px;box-shadow:0 3px 0 var(--outline)}
.vx-row select{font:700 16px var(--f-b);border:2.5px solid var(--outline);border-radius:12px;padding:5px 8px;background:var(--panel2);color:var(--ink)}
.vx-res{border:2.5px dashed var(--outline);border-radius:18px;padding:12px 14px;background:var(--panel2);min-height:64px;text-align:center;font:800 26px/1.3 var(--f-d)}
.vx-res small{display:block;font:700 15px var(--f-b);color:var(--muted)}
.vx-grp{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.vx-g{border:2.5px solid var(--outline);border-radius:18px;padding:10px 12px;background:var(--panel);min-height:120px}
.vx-g h3{margin:0 0 6px;font:800 22px var(--f-d)}
.vx-g.a h3{color:#d94f75}.vx-g.b h3{color:#2f7fb3}
.vx-g ol{margin:0;padding-left:26px;font:700 18px/1.5 var(--f-b)}
.vx-g li.new{background:var(--butter,#f9e7af);border-radius:6px}
.vx-card:fullscreen .vx-wheel{max-width:min(78vh,640px)}
`;document.head.appendChild(st)}

const parse=()=>S.text.split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean);
function remaining(){const used={};[...S.A,...S.B].forEach(n=>used[n]=(used[n]||0)+1);
 return parse().filter(n=>{if(used[n]){used[n]--;return false}return true})}
const rem=()=>remaining();

function html(){
 return`<div class="vx-grid vx-card">
 <div><div class="vx-wheel"><div class="vx-ptr"></div><canvas id="vx-cv" width="1000" height="1000"></canvas><button class="vx-go" id="vx-go" data-v="go">XOAY</button></div></div>
 <div>
  <b>Nhập tên học sinh</b> <span class="muted" id="vx-cnt"></span>
  <textarea class="vx-in" id="vx-in" placeholder="Mỗi dòng một tên, ví dụ:&#10;Minh&#10;Lan&#10;Hùng&#10;Mai">${E(S.text)}</textarea>
  <div class="vx-row">
   <button class="btn pri" data-v="go">🎡 Xoay</button>
   <button class="btn" data-v="all">⏩ Xoay hết</button>
   <button class="btn" data-v="reset">↺ Làm lại</button>
   <button class="btn" data-v="copy">📋 Sao chép kết quả</button>
  </div>
  <div class="vx-row"><label class="muted">Cách chia: <select id="vx-mode"><option value="alt" ${S.mode==='alt'?'selected':''}>Chia đều (xen kẽ A – B)</option><option value="rand" ${S.mode==='rand'?'selected':''}>Ngẫu nhiên hoàn toàn</option></select></label>
   <label class="muted">Người đầu tiên vào: <select id="vx-first"><option value="A" ${S.first==='A'?'selected':''}>Nhóm A</option><option value="B" ${S.first==='B'?'selected':''}>Nhóm B</option></select></label></div>
  <div class="vx-res" id="vx-res"></div>
  <div class="vx-grp"><div class="vx-g a"><h3>Nhóm A <span id="vx-na"></span></h3><ol id="vx-la"></ol></div><div class="vx-g b"><h3>Nhóm B <span id="vx-nb"></span></h3><ol id="vx-lb"></ol></div></div>
 </div></div>`}

function lists(){
 const g=(id,arr)=>{const e=document.getElementById(id);if(e)e.innerHTML=arr.map((n,i)=>`<li class="${S.last&&S.last.n===n&&i===arr.length-1?'new':''}">${E(n)}</li>`).join('')};
 g('vx-la',S.A);g('vx-lb',S.B);
 const a=document.getElementById('vx-na'),b=document.getElementById('vx-nb');if(a)a.textContent='('+S.A.length+')';if(b)b.textContent='('+S.B.length+')';
 const c=document.getElementById('vx-cnt');if(c){const r=rem().length;c.textContent=`· còn ${r} bạn trên vòng xoay`}
 const r=document.getElementById('vx-res');if(r){
  if(S.last)r.innerHTML=`🎉 ${E(S.last.n)} → <span style="color:${S.last.g==='A'?'#d94f75':'#2f7fb3'}">Nhóm ${S.last.g}</span>`;
  else r.innerHTML=S.msg?E(S.msg):'<small>Nhập tên rồi bấm XOAY</small>'}
 const go=document.getElementById('vx-go');if(go)go.disabled=S.spin||!rem().length;
}

function draw(){
 const cv=document.getElementById('vx-cv');if(!cv)return;const ctx=cv.getContext('2d'),W=cv.width,R=W/2;
 const names=rem(),n=names.length;ctx.clearRect(0,0,W,W);
 ctx.save();ctx.translate(R,R);
 if(!n){ctx.beginPath();ctx.arc(0,0,R-4,0,7);ctx.fillStyle='#f4f1ea';ctx.fill();ctx.lineWidth=8;ctx.strokeStyle='#8a7a6a';ctx.stroke();
  ctx.fillStyle='#7a6a5a';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 46px '+getComputedStyle(document.body).fontFamily;
  ctx.fillText(S.A.length+S.B.length?'Đã chia xong!':'Nhập tên học sinh',0,0);ctx.restore();return}
 const seg=2*Math.PI/n,ff=getComputedStyle(document.body).fontFamily;
 let fs=Math.max(20,Math.min(54,(2*Math.PI*R*.62/n)*.62));
 for(let i=0;i<n;i++){
  const a0=S.rot+i*seg,a1=a0+seg;
  ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R-6,a0,a1);ctx.closePath();
  ctx.fillStyle=COL[i%COL.length];if(n%COL.length===1&&i===n-1)ctx.fillStyle=COL[2];ctx.fill();
  ctx.lineWidth=4;ctx.strokeStyle='#fff';ctx.stroke();
  ctx.save();ctx.rotate(a0+seg/2);ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillStyle='#2b3a4a';ctx.font='800 '+fs+'px '+ff;
  let t=names[i];const maxw=R*.62;while(ctx.measureText(t).width>maxw&&t.length>2)t=t.slice(0,-2)+'…';
  ctx.fillText(t,R-34,0);ctx.restore();
 }
 ctx.beginPath();ctx.arc(0,0,R-6,0,7);ctx.lineWidth=10;ctx.strokeStyle='#8a7a6a';ctx.stroke();
 ctx.restore();
}

function pickGroup(){
 if(S.mode==='rand')return Math.random()<.5?'A':'B';
 if(S.A.length<S.B.length)return'A';if(S.B.length<S.A.length)return'B';return S.first;
}
function spinOnce(done,fast){
 const names=rem(),n=names.length;if(S.spin||!n){done&&done();return}
 S.spin=true;S.msg='';const seg=2*Math.PI/n,idx=Math.floor(Math.random()*n),jit=(Math.random()-.5)*seg*.7;
 const base=-Math.PI/2-(idx*seg+seg/2)-jit,cur=S.rot,two=2*Math.PI;
 const delta=(((base-cur)%two)+two)%two+two*(fast?3:5+Math.floor(Math.random()*3));
 const dur=fast?1500:4600,t0=performance.now();
 lists();
 const step=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3.2);S.rot=cur+delta*e;draw();
  if(k<1){raf=requestAnimationFrame(step);return}
  S.rot=((S.rot%two)+two)%two;S.spin=false;
  const name=names[idx],g=pickGroup();(g==='A'?S.A:S.B).push(name);S.last={n:name,g};
  draw();lists();done&&done()};
 raf=requestAnimationFrame(step);
}
function spinAll(){
 if(S.spin||S.auto)return;S.auto=true;
 const go=()=>{if(!rem().length||!document.getElementById('vx-cv')){S.auto=false;return}spinOnce(()=>setTimeout(go,350),true)};go()}
function reset(){cancelAnimationFrame(raf);S.spin=false;S.auto=false;S.A=[];S.B=[];S.last=null;S.msg='';S.rot=0;draw();lists()}
function copy(){
 const txt='Nhóm A ('+S.A.length+'): '+S.A.join(', ')+'\nNhóm B ('+S.B.length+'): '+S.B.join(', ');
 const ok=()=>{S.msg='Đã sao chép kết quả';S.last=null;lists()},bad=()=>{S.msg='Không sao chép được, bạn chép tay nhé';S.last=null;lists()};
 try{navigator.clipboard.writeText(txt).then(ok,bad)}catch(e){bad()}
}
function click(e){const b=e.target.closest('[data-v]');if(!b)return false;const v=b.dataset.v;
 if(v==='go')spinOnce();else if(v==='all')spinAll();else if(v==='reset')reset();else if(v==='copy')copy();else return false;return true}
function input(e){
 if(e.target.id==='vx-in'){S.text=e.target.value;try{localStorage.setItem(KEY,S.text)}catch(x){}draw();lists();return true}
 return false}
function change(e){
 if(e.target.id==='vx-mode'){S.mode=e.target.value;return true}
 if(e.target.id==='vx-first'){S.first=e.target.value;return true}
 return false}
function refresh(){draw();lists()}
function after(r){rerender=r;
 const m=document.getElementById('vx-mode'),f=document.getElementById('vx-first');if(m)m.onchange=change;if(f)f.onchange=change;
 requestAnimationFrame(()=>{draw();lists()})}
window.TTX=window.TTX||{};window.TTX.wheel={html,click,input,refresh,after};
})();
