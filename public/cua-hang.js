/* Công cụ giảng dạy: Cửa hàng 商店 – luyện số lượng, lượng từ và giá cả với bộ đồ vật Roxie */
(function(){
const V=window.VATPHAM;if(!V)return;
const Z=['零','一','二','三','四','五','六','七','八','九'],P=['líng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ'];
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const IT=V.items.map(r=>({id:r[0],g:r[1],vi:r[2],zh:r[3],py:r[4],m:r[5],mp:V.measure[r[5]]||''}));
const BY=Object.fromEntries(IT.map(x=>[x.id,x]));
const MAXQ=20,MAXP=999,MAXI=8;

/* ---------- đọc số (0–999999) ---------- */
function num(n){ /* trả về [chữ Hán, pinyin] ; 2 đứng đầu đọc 两 khi là số lượng/giá lẻ */
 const r=(n,lead)=>{ /* lead: có phần lớn hơn đứng trước không */
  if(n===0)return['',''];
  const out=[],py=[];
  const put=(z,p)=>{out.push(z);py.push(p)};
  const d=(x,two)=>two&&x===2?['两','liǎng']:[Z[x],P[x]];
  let rest=n;
  if(rest>=10000){const w=Math.floor(rest/10000);const a=r(w,false);put(a[0]==='二'?'两':a[0],a[0]==='二'?'liǎng':a[1]);put('万','wàn');rest%=10000;if(rest>0&&rest<1000)put('零','líng')}
  if(rest>=1000){const t=Math.floor(rest/1000);const q=d(t,true);put(q[0],q[1]);put('千','qiān');rest%=1000;if(rest>0&&rest<100)put('零','líng')}
  if(rest>=100){const h=Math.floor(rest/100);const q=d(h,true);put(q[0],q[1]);put('百','bǎi');rest%=100;if(rest>0&&rest<10)put('零','líng')}
  if(rest>=10){const t=Math.floor(rest/10),o=rest%10,higher=n>=100;
   if(t===1&&!higher)put('十','shí');else{put(Z[t],P[t]);put('十','shí')}
   if(o)put(Z[o],P[o])}
  else if(rest>0){const q=d(rest,n===rest);put(q[0],q[1])}
  return[out.join(''),py.join(' ')]};
 if(n===0)return['零','líng'];return r(n,false)}
const nz=n=>num(n)[0],np=n=>num(n)[1];
const tone=w=>{const t=w.match(/[āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]/);if(!t)return 0;return 'āēīōūǖ'.includes(t[0])?1:'áéíóúǘ'.includes(t[0])?2:'ǎěǐǒǔǚ'.includes(t[0])?3:4};
const yi=mp=>{const t=tone(mp.split(' ')[0]);return t===4||t===0?'yí':'yì'}; /* biến điệu của 一 trước lượng từ */
const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);

/* ---------- trạng thái ---------- */
const S={sel:[],zh:true,py:true,vi:true,grp:-1,q:'',open:true,reveal:false};
const find=id=>S.sel.find(x=>x.id===id);
const rnd=n=>Math.floor(Math.random()*n);
const rprice=()=>[2,3,5,8,10,12,15,18,20,25,30,35,50,60,80,100,120,150,200][rnd(19)];
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
function add(id){const x=find(id);if(x){x.q=Math.min(MAXQ,x.q+1);return}if(S.sel.length>=MAXI){toast('Quầy chỉ chứa tối đa '+MAXI+' món. Hãy xoá bớt một món.');return}S.sel.push({id,q:1,p:rprice()})}
function toast(t){const e=document.getElementById('cs-toast');if(!e)return;e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>{e.hidden=true},2800)}

/* ---------- CSS ---------- */
if(!document.getElementById('cs-css')){const st=document.createElement('style');st.id='cs-css';st.textContent=`
.cs-top{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.cs-sw{display:inline-flex;align-items:center;gap:6px;font:800 16px var(--f-d);border:2.5px solid var(--outline);background:var(--panel2);color:var(--muted);border-radius:999px;padding:6px 14px;cursor:pointer}
.cs-sw.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.cs-sw .z{font-family:var(--f-z)}
.cs-toast{background:var(--butter,#f9e7af);color:#4a3a10;border-radius:12px;padding:6px 12px;font-weight:700;margin:6px 0}
.cs-pick{border:2.5px dashed var(--outline);border-radius:18px;padding:10px;margin-bottom:14px;background:var(--panel2)}
.cs-pick>summary{cursor:pointer;font:800 18px var(--f-d);list-style:none}
.cs-pick>summary::-webkit-details-marker{display:none}
.cs-chips{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}
.cs-chip{font:700 14px var(--f-b);border:2px solid var(--outline);background:var(--panel);color:var(--ink);border-radius:999px;padding:4px 12px;cursor:pointer}
.cs-chip.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.cs-search{font:600 15px var(--f-b);border:2px solid var(--outline);border-radius:12px;padding:6px 10px;background:var(--panel);color:var(--ink);min-width:150px;flex:1;max-width:260px}
.cs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(98px,1fr));gap:8px;max-height:330px;overflow:auto;padding:2px}
.cs-it{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;border:2px solid var(--outline);border-radius:14px;background:var(--panel);color:var(--ink);padding:6px 4px;cursor:pointer;font:700 12.5px/1.25 var(--f-b);text-align:center}
.cs-it:hover{border-color:var(--accent)}
.cs-it img{width:62px;height:62px;object-fit:contain}
.cs-it .z{font:800 15px var(--f-z)}
.cs-it .py{color:var(--accent);font-size:11.5px}
.cs-it .n{position:absolute;top:3px;right:3px;background:var(--accent);color:var(--on-accent);border-radius:999px;min-width:20px;height:20px;font:800 12px/20px var(--f-d);padding:0 4px}
.cs-shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin:10px 0}
.cs-card{border:2.5px solid var(--outline);border-radius:20px;background:var(--panel);padding:10px;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;box-shadow:0 4px 0 var(--outline)}
.cs-card img{width:120px;height:120px;object-fit:contain}
.cs-card .z{font:800 26px var(--f-z)}
.cs-card .py{color:var(--accent);font:700 15px var(--f-b)}
.cs-card .vi{color:var(--muted);font:600 14px var(--f-b)}
.cs-card .m{font:600 13px var(--f-b);color:var(--muted)}
.cs-x{position:absolute;top:6px;right:6px;border:0;background:transparent;color:var(--muted);font-size:20px;cursor:pointer;line-height:1}
.cs-row{display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap;justify-content:center}
.cs-row .btn{padding:2px 12px;font-size:20px;box-shadow:0 3px 0 var(--outline);min-width:40px}
.cs-q{font:800 24px var(--f-d);min-width:34px;text-align:center}
.cs-price{display:flex;align-items:center;gap:4px;font:800 18px var(--f-d)}
.cs-price input{width:84px;font:800 18px var(--f-d);border:2.5px solid var(--outline);border-radius:12px;padding:4px 6px;text-align:right;background:var(--panel2);color:var(--ink)}
.cs-chp{display:flex;gap:4px;flex-wrap:wrap;justify-content:center}
.cs-chp button{font:700 12.5px var(--f-b);border:1.5px solid var(--outline);background:var(--panel2);color:var(--ink);border-radius:999px;padding:1px 8px;cursor:pointer}
.cs-sub{font:700 14px var(--f-b);color:var(--muted)}
.cs-empty{border:2.5px dashed var(--outline);border-radius:18px;padding:26px;text-align:center;color:var(--muted)}
.cs-qa{border:2.5px dashed var(--outline);border-radius:18px;background:var(--panel2);padding:12px 16px;margin-top:12px}
.cs-qa h4{margin:10px 0 4px;font:800 18px var(--f-d)}
.cs-qa h4:first-child{margin-top:0}
.cs-l{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin:4px 0}
.cs-l .t{flex:none;width:22px;height:22px;border-radius:50%;background:var(--accent);color:var(--on-accent);font:800 13px/22px var(--f-d);text-align:center}
.cs-l .t.a{background:#f3d88e;color:#3a2a05}
.cs-l .zh{font:800 26px/1.3 var(--f-z)}
.cs-l .p{color:var(--accent);font:700 17px var(--f-b)}
.cs-l .v{color:var(--muted);font:600 15px var(--f-b)}
.cs-tot{font:800 20px var(--f-d);margin-top:8px}
.tt-card:fullscreen .cs-card img{width:150px;height:150px}.tt-card:fullscreen .cs-l .zh{font-size:36px}.tt-card:fullscreen .cs-l .p{font-size:22px}
@media(max-width:560px){.cs-l .zh{font-size:22px}.cs-shelf{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}.cs-card img{width:90px;height:90px}}
`;document.head.appendChild(st)}

/* ---------- hiển thị ---------- */
const tx=(x,big)=>`${S.zh?`<div class="z">${E(x.zh)}</div>`:''}${S.py?`<div class="py">${E(x.py)}</div>`:''}${S.vi?`<div class="vi">${E(x.vi)}</div>`:''}`;
function pickHtml(){const q=S.q.trim().toLowerCase();
 const list=IT.filter(x=>(S.grp<0||x.g===S.grp)&&(!q||x.vi.toLowerCase().includes(q)||x.zh.includes(q)||x.py.toLowerCase().includes(q)));
 return`<details class="cs-pick" ${S.open?'open':''} id="cs-pick"><summary>➕ Chọn đồ vật cho quầy hàng <span class="cs-sub">(bấm vào món để thêm, bấm nhiều lần để tăng số lượng)</span></summary>
 <div class="cs-chips"><button class="cs-chip ${S.grp<0?'on':''}" data-s="grp" data-v="-1">Tất cả (${IT.length})</button>${V.groups.map((g,i)=>`<button class="cs-chip ${S.grp===i?'on':''}" data-s="grp" data-v="${i}">${E(g)}</button>`).join('')}<input class="cs-search" id="cs-q" placeholder="Tìm món… (Việt / 汉字 / pinyin)" value="${E(S.q)}"></div>
 <div class="cs-grid" id="cs-grid">${gridHtml(list)}</div></details>`}
function gridHtml(list){return list.map(x=>{const s=find(x.id);return`<button class="cs-it" data-s="add" data-id="${x.id}" title="Thêm ${E(x.vi)}">${s?`<span class="n">${s.q}</span>`:''}<img src="assets/vatpham/${String(x.id).padStart(3,'0')}.webp" alt="${E(x.vi)}" loading="lazy">${tx(x)}</button>`}).join('')||'<div class="cs-empty" style="grid-column:1/-1">Không tìm thấy món nào.</div>'}
function shelfHtml(){if(!S.sel.length)return`<div class="cs-empty">Quầy hàng đang trống. Hãy chọn vài đồ vật ở trên, hoặc bấm <b>🎲 Quầy ngẫu nhiên</b>.</div>`;
 return`<div class="cs-shelf">${S.sel.map(s=>{const x=BY[s.id];return`<div class="cs-card" data-id="${s.id}"><button class="cs-x" data-s="del" data-id="${s.id}" aria-label="Bỏ món này">×</button>
 <img src="assets/vatpham/${String(x.id).padStart(3,'0')}.webp" alt="${E(x.vi)}">${tx(x)}${S.zh||S.py?`<div class="m">lượng từ: ${S.zh?E(x.m):''} ${S.py?E(x.mp):''}</div>`:''}
 <div class="cs-row"><button class="btn" data-s="dec" data-id="${s.id}" aria-label="Giảm số lượng">−</button><span class="cs-q" id="cs-q${s.id}">${s.q}</span><button class="btn pri" data-s="inc" data-id="${s.id}" aria-label="Tăng số lượng">+</button></div>
 <div class="cs-price">Giá: <input type="number" min="1" max="${MAXP}" inputmode="numeric" data-s="price" data-id="${s.id}" value="${s.p}" aria-label="Giá một món"> 元</div>
 <div class="cs-chp">${[2,5,10,20,50,100].map(v=>`<button data-s="setp" data-id="${s.id}" data-v="${v}">${v}</button>`).join('')}<button data-s="rp" data-id="${s.id}" title="Giá ngẫu nhiên">🎲</button></div>
 <div class="cs-sub" id="cs-sub${s.id}">${s.q>1?`${s.q} × ${s.p} = ${fmt(s.q*s.p)} 元`:''}</div></div>`}).join('')}</div>`}

/* ---------- câu hỏi và đáp án ---------- */
function sentences(){const out=[];let sum=0;
 S.sel.forEach(s=>{const x=BY[s.id];sum+=s.q*s.p});
 const L=(q,a)=>({q,a});
 const have=[],price=[];
 S.sel.forEach(s=>{const x=BY[s.id],n=s.q,N=n===1?['一',yi(x.mp)]:num(n),tot=s.q*s.p,Pz=num(s.p),Tz=num(tot);
  const nm=`${N[0]}${x.m}${x.zh}`,nmp=`${N[1]} ${x.mp} ${x.py}`;
  have.push(L({zh:`你有几${x.m}${x.zh}？`,py:cap(`nǐ yǒu jǐ ${x.mp} ${x.py}?`),vi:`Bạn có mấy ${x.vi.toLowerCase()}?`},{zh:`我有${nm}。`,py:cap(`wǒ yǒu ${nmp}.`),vi:`Tôi có ${n} ${x.vi.toLowerCase()}.`}));
  price.push(L({zh:`这${x.m}${x.zh}多少钱？`,py:cap(`zhè ${x.mp} ${x.py} duōshao qián?`),vi:`${x.vi} này giá bao nhiêu?`},{zh:`一${x.m}${x.zh}${Pz[0]}块。`,py:cap(`${yi(x.mp)} ${x.mp} ${x.py} ${Pz[1]} kuài.`),vi:`Một ${x.vi.toLowerCase()} giá ${s.p} nhân dân tệ.`}));
  if(n>1)price.push(L({zh:`${nm}多少钱？`,py:cap(`${nmp} duōshao qián?`),vi:`${n} ${x.vi.toLowerCase()} giá bao nhiêu?`},{zh:`${nm}${Tz[0]}块。`,py:cap(`${nmp} ${Tz[1]} kuài.`),vi:`${n} ${x.vi.toLowerCase()} giá ${tot} nhân dân tệ.`}))});
 const T=num(sum);
 const total=L({zh:'一共多少钱？',py:'Yígòng duōshao qián?',vi:'Tổng cộng bao nhiêu tiền?'},{zh:`一共${T[0]}块。`,py:`Yígòng ${T[1]} kuài.`,vi:`Tổng cộng ${sum} nhân dân tệ.`});
 return{have,price,total,sum}}
function lineHtml(t,o,hide){const piece=(k,cls)=>(k==='zh'?S.zh:k==='py'?S.py:S.vi)?`<${k==='zh'?'span class="zh"':'span class="'+(k==='py'?'p':'v')+'"'}>${E(o[k])}</span>`:'';
 return`<div class="cs-l"><span class="t ${t==='A'?'a':''}">${t}</span>${hide?'<span class="v">· · ·</span>':piece('zh')+piece('py')+piece('vi')}</div>`}
function qaHtml(){if(!S.sel.length)return'';const g=sentences(),hide=!!(window.__ttQuiz&&window.__ttQuiz()&&!S.reveal);
 const blk=(title,arr)=>arr.length?`<h4>${title}</h4>${arr.map(p=>lineHtml('Q',p.q,false)+lineHtml('A',p.a,hide)).join('')}`:'';
 return`<div class="cs-qa" id="cs-qa">${blk('① Hỏi số lượng · 数量',g.have)}${blk('② Hỏi giá · 价格',g.price)}<h4>③ Tổng tiền · 总价</h4>${lineHtml('Q',g.total.q,false)}${lineHtml('A',g.total.a,hide)}
 <div class="cs-tot">Tổng: ${fmt(g.sum)} 元</div>
 <div class="tt-ctl">${hide?'<button class="btn pri" data-s="reveal">Hiện đáp án</button>':''}<button class="btn" data-s="say">🔊 Nghe câu hỏi tổng tiền</button></div></div>`}

function html(){return`<div class="cs-top"><span class="muted">Hiện:</span>
 <button class="cs-sw ${S.zh?'on':''}" data-s="tg" data-v="zh"><span class="z">汉</span> Chữ Hán</button><button class="cs-sw ${S.py?'on':''}" data-s="tg" data-v="py">Pinyin</button><button class="cs-sw ${S.vi?'on':''}" data-s="tg" data-v="vi">Tiếng Việt</button>
 <span style="flex:1"></span><button class="btn sm" data-s="rand">🎲 Quầy ngẫu nhiên</button><button class="btn sm" data-s="prices">🎲 Đổi hết giá</button><button class="btn sm" data-s="clear">Xoá quầy</button></div>
 <div class="cs-toast" id="cs-toast" hidden></div>${pickHtml()}
 <div id="cs-shelf">${shelfHtml()}</div><div id="cs-qawrap">${qaHtml()}</div>`}

/* ---------- gắn sự kiện ---------- */
let rerender=()=>{};
function refresh(){const sh=document.getElementById('cs-shelf'),qa=document.getElementById('cs-qawrap'),gr=document.getElementById('cs-grid');if(sh)sh.innerHTML=shelfHtml();if(qa)qa.innerHTML=qaHtml();if(gr){const q=S.q.trim().toLowerCase();gr.innerHTML=gridHtml(IT.filter(x=>(S.grp<0||x.g===S.grp)&&(!q||x.vi.toLowerCase().includes(q)||x.zh.includes(q)||x.py.toLowerCase().includes(q))))}}
function refreshQA(){const qa=document.getElementById('cs-qawrap');if(qa)qa.innerHTML=qaHtml();S.sel.forEach(s=>{const e=document.getElementById('cs-sub'+s.id);if(e)e.textContent=s.q>1?`${s.q} × ${s.p} = ${fmt(s.q*s.p)} 元`:''})}
function click(e){const b=e.target.closest('[data-s]');if(!b)return false;const k=b.dataset.s,id=+b.dataset.id,s=find(id);
 if(k==='price')return true;
 if(k==='grp'){S.grp=+b.dataset.v;rerender();return true}
 if(k==='tg'){const v=b.dataset.v;S[v]=!S[v];if(!S.zh&&!S.py&&!S.vi)S[v]=true;rerender();return true}
 if(k==='add'){add(id);S.reveal=false;refresh();return true}
 if(k==='del'){S.sel=S.sel.filter(x=>x.id!==id);S.reveal=false;refresh();return true}
 if(k==='inc'&&s){s.q=Math.min(MAXQ,s.q+1);S.reveal=false;refresh();return true}
 if(k==='dec'&&s){s.q=Math.max(1,s.q-1);S.reveal=false;refresh();return true}
 if(k==='setp'&&s){s.p=+b.dataset.v;S.reveal=false;refresh();return true}
 if(k==='rp'&&s){s.p=rprice();S.reveal=false;refresh();return true}
 if(k==='prices'){S.sel.forEach(x=>x.p=rprice());S.reveal=false;refresh();return true}
 if(k==='clear'){S.sel=[];S.reveal=false;refresh();return true}
 if(k==='rand'){const n=3+rnd(3),ids=new Set();while(ids.size<n)ids.add(IT[rnd(IT.length)].id);S.sel=[...ids].map(i=>({id:i,q:1+rnd(4),p:rprice()}));S.reveal=false;refresh();return true}
 if(k==='reveal'){S.reveal=true;refreshQA();return true}
 if(k==='say'){const g=sentences();try{window.TTspeak&&window.TTspeak(g.total.q.zh)}catch(x){}return true}
 return false}
function input(e){const t=e.target;if(t.id==='cs-q'){S.q=t.value;const gr=document.getElementById('cs-grid');if(gr){const q=S.q.trim().toLowerCase();gr.innerHTML=gridHtml(IT.filter(x=>(S.grp<0||x.g===S.grp)&&(!q||x.vi.toLowerCase().includes(q)||x.zh.includes(q)||x.py.toLowerCase().includes(q))))}return true}
 if(t.dataset&&t.dataset.s==='price'){const s=find(+t.dataset.id);if(s){let v=Math.round(+t.value);if(!(v>=1))return true;s.p=Math.min(MAXP,v);S.reveal=false;refreshQA()}return true}return false}
function after(r){rerender=r}
window.TTX={shop:{html,click,input,after,refresh:()=>refreshQA(),num}};
})();
