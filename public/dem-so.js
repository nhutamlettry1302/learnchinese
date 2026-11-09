/* Công cụ giảng dạy: Số đếm 数字 (1 – 100.000) dạng bảng + ghép số tự nhập */
(function(){
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num=n=>{try{return TTX.shop.num(n)}catch(e){return['','']}};
/* biến điệu của 一 ở đầu số: yì bǎi, yì qiān, yí wàn */
const rd=n=>{let[z,p]=num(n);p=p.replace(/^yī (bǎi|qiān)/,'yì $1').replace(/^yī wàn/,'yí wàn');return[z,p]};
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const S={zh:true,py:true,val:'28',reveal:false};
const BASIC=[1,2,3,4,5,6,7,8,9,10];
const TENS=[20,30,40,50,60,70,80,90];
const BIG=[100,1000,10000,100000];
const MIX=[21,99,101,110,1050,10001];

if(!document.getElementById('ds-css')){const st=document.createElement('style');st.id='ds-css';st.textContent=`
.ds-top{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.ds-sw{display:inline-flex;align-items:center;gap:6px;font:800 16px var(--f-d);border:2.5px solid var(--outline);background:var(--panel2);color:var(--muted);border-radius:999px;padding:6px 14px;cursor:pointer}
.ds-sw.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.ds-wrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:14px}
.ds-sec{border:2.5px solid var(--outline);border-radius:20px;background:var(--panel);padding:12px 14px}
.ds-sec h3{display:flex;align-items:center;gap:8px;margin:0 0 10px;font:800 19px var(--f-d)}
.ds-sec h3 b{flex:none;width:30px;height:30px;border-radius:50%;background:var(--accent);color:var(--on-accent);text-align:center;font:800 16px/30px var(--f-d)}
.ds-g{display:grid;gap:6px}
.ds-c{border:2px solid var(--outline);border-radius:12px;background:var(--panel2);padding:5px 4px;text-align:center;line-height:1.25}
.ds-c .n{font:800 17px var(--f-d);color:var(--muted)}
.ds-c .z{font:800 28px var(--f-z);color:var(--ink)}
.ds-c .p{font:700 14px var(--f-b);color:var(--accent)}
.ds-c.hl{background:var(--butter,#f9e7af)}
.ds-c.hl .n,.ds-c.hl .z,.ds-c.hl .p{color:#3a2a05}
.ds-tbl{width:100%;border-collapse:collapse}
.ds-tbl td{padding:6px 8px;border-bottom:1px dotted var(--outline);vertical-align:middle}
.ds-tbl .n{font:800 20px var(--f-d);width:34%}
.ds-tbl .a{color:var(--muted);width:8%}
.ds-tbl .z{font:800 26px var(--f-z)}
.ds-tbl .p{color:var(--accent);font:700 15px var(--f-b)}
.ds-note{margin-top:10px;border-radius:14px;background:var(--panel2);padding:8px 12px;font-size:16px;line-height:1.5}
.ds-note .z{font:800 20px var(--f-z)}.ds-note .p{color:var(--accent);font-weight:700}
.ds-try{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:12px}
.ds-try input{font:800 24px var(--f-d);width:170px;border:2.5px solid var(--outline);border-radius:14px;padding:6px 10px;background:var(--panel2);color:var(--ink);text-align:right}
.ds-out{margin-top:10px;border:2.5px dashed var(--outline);border-radius:16px;padding:10px 14px;min-height:96px;background:var(--panel2)}
.ds-out .z{font:800 38px/1.25 var(--f-z)}.ds-out .p{font:700 20px var(--f-b);color:var(--accent)}
.ds-out .q{font:800 44px var(--f-d);color:var(--muted)}
.ds-tips{margin:0;padding-left:18px;font-size:16px;line-height:1.7}
.ds-tips .z{font:800 19px var(--f-z)}.ds-tips .p{color:var(--accent);font-weight:700}
.tt-card:fullscreen .ds-c .z{font-size:40px}.tt-card:fullscreen .ds-tbl .z{font-size:34px}.tt-card:fullscreen .ds-out .z{font-size:56px}
@media(max-width:560px){.ds-wrap{grid-template-columns:1fr}.ds-c .z{font-size:24px}}
`;document.head.appendChild(st)}

const cell=(n,z,p,hl,fix)=>`<div class="ds-c ${hl?'hl':''}"><div class="n">${fix||fmt(n)}</div>${S.zh?`<div class="z">${E(z)}</div>`:''}${S.py?`<div class="p">${E(p)}</div>`:''}</div>`;
const cn=n=>{const r=n===2?['二','èr']:rd(n);return cell(n,r[0],r[1])};
const row=n=>{const r=rd(n);return`<tr><td class="n">${fmt(n)}</td><td class="a">→</td><td>${S.zh?`<div class="z">${E(r[0])}</div>`:''}${S.py?`<div class="p">${E(r[1])}</div>`:''}</td></tr>`};
function outHtml(){const hide=window.__ttQuiz&&window.__ttQuiz()&&!S.reveal;const n=Math.min(999999,Math.max(0,parseInt(S.val,10)||0));const r=n===0?['零','líng']:rd(n);
 if(hide)return`<div class="q">?</div><div class="muted">Học sinh đọc số <b>${fmt(n)}</b> bằng tiếng Trung</div><div class="tt-ctl"><button class="btn pri" data-n="reveal">Hiện đáp án</button></div>`;
 return`<div class="muted">${fmt(n)} =</div>${S.zh?`<div class="z">${E(r[0])}</div>`:''}${S.py?`<div class="p">${E(r[1])}</div>`:''}<div class="tt-ctl"><button class="btn" data-n="say">🔊 Nghe</button></div>`}
function html(){
 return`<div class="ds-top"><span class="muted">Hiện:</span><button class="ds-sw ${S.zh?'on':''}" data-n="tg" data-v="zh"><span style="font-family:var(--f-z)">汉</span> Chữ Hán</button><button class="ds-sw ${S.py?'on':''}" data-n="tg" data-v="py">Pinyin</button></div>
 <div class="ds-wrap">
 <section class="ds-sec"><h3><b>1</b> Số cơ bản</h3><div class="ds-g" style="grid-template-columns:repeat(5,1fr)">${BASIC.map(cn).join('')}</div>
  <div class="ds-g" style="grid-template-columns:1fr;margin-top:8px">${cell(0,'零','líng',true)}</div></section>
 <section class="ds-sec"><h3><b>2</b> Từ 11 đến 19</h3><div class="ds-g" style="grid-template-columns:repeat(3,1fr)">${[11,12,13,14,15,16,17,18,19].map(cn).join('')}</div>
  <div class="ds-note"><span class="z">十</span> + số đơn vị<br>15 = <span class="z">十五</span> · <span class="p">shí wǔ</span></div></section>
 <section class="ds-sec"><h3><b>3</b> Hàng chục</h3><div class="ds-g" style="grid-template-columns:repeat(4,1fr)">${TENS.map(cn).join('')}</div>
  <div class="ds-note">28 = <span class="z">二十八</span> · <span class="p">èr shí bā</span></div></section>
 <section class="ds-sec"><h3><b>4</b> Trăm · Nghìn · Vạn</h3><div class="ds-g" style="grid-template-columns:repeat(4,1fr)">${BIG.map((n,i)=>cell(n,rd(n)[0],rd(n)[1],i===3)).join('')}</div>
  <div class="ds-note"><span class="z">百</span> <span class="p">bǎi</span> · <span class="z">千</span> <span class="p">qiān</span> · <span class="z">万</span> <span class="p">wàn</span></div></section>
 <section class="ds-sec"><h3><b>5</b> Thử ghép số</h3><table class="ds-tbl">${MIX.map(row).join('')}</table>
  <div class="ds-try"><label class="muted" for="ds-in">Nhập số (0 – 999.999):</label><input id="ds-in" type="text" inputmode="numeric" maxlength="7" value="${E(S.val)}" aria-label="Nhập một số"><button class="btn pri" data-n="rand">🎲 Số ngẫu nhiên</button></div>
  <div class="ds-out" id="ds-out">${outHtml()}</div></section>
 <section class="ds-sec"><h3><b>6</b> Nhớ nhanh</h3><ul class="ds-tips">
  <li><span class="z">零</span> <span class="p">líng</span> dùng để nối khi có hàng bị khuyết: 101 = <span class="z">一百零一</span></li>
  <li>10.000 = <span class="z">一万</span> <span class="p">yí wàn</span>, không đọc theo nhóm nghìn.</li>
  <li>100.000 = <span class="z">十万</span> <span class="p">shí wàn</span>, nghĩa là mười vạn.</li>
  <li>Số 2 đứng trước <span class="z">百 / 千 / 万</span> và trước lượng từ thì đọc <span class="z">两</span> <span class="p">liǎng</span>: 200 = <span class="z">两百</span>, 2 cuốn = <span class="z">两本</span>. Còn 12, 20, 22 vẫn đọc <span class="z">二</span>.</li>
  <li><span class="z">一</span> đứng đầu số đổi thanh: <span class="p">yì bǎi, yì qiān, yí wàn</span>.</li></ul></section>
 </div>`}

let rerender=()=>{};
function refresh(){const o=document.getElementById('ds-out');if(o)o.innerHTML=outHtml()}
function click(e){const b=e.target.closest('[data-n]');if(!b)return false;const k=b.dataset.n;
 if(k==='tg'){const v=b.dataset.v;S[v]=!S[v];if(!S.zh&&!S.py)S[v]=true;rerender();return true}
 if(k==='rand'){const t=[()=>1+Math.floor(Math.random()*99),()=>100+Math.floor(Math.random()*900),()=>1000+Math.floor(Math.random()*9000),()=>10000+Math.floor(Math.random()*90000)];S.val=String(t[Math.floor(Math.random()*4)]());S.reveal=false;const i=document.getElementById('ds-in');if(i)i.value=S.val;refresh();return true}
 if(k==='reveal'){S.reveal=true;refresh();return true}
 if(k==='say'){const n=Math.min(999999,Math.max(0,parseInt(S.val,10)||0));try{window.TTspeak&&window.TTspeak(n===0?'零':num(n)[0])}catch(x){}return true}
 return false}
function input(e){if(e.target.id!=='ds-in')return false;const v=e.target.value.replace(/\D/g,'').replace(/^0+(?=\d)/,'');S.val=v;S.reveal=false;refresh();return true}
window.TTX=window.TTX||{};window.TTX.num={html,click,input,refresh,after:r=>{rerender=r}};
})();
