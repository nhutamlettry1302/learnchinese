/* Công cụ giảng dạy: đồng hồ + lịch (HSK1: đọc giờ, ngày tháng, thứ) */
(function(){
const Z=['零','一','二','三','四','五','六','七','八','九'],P=['líng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ'];
const nz=n=>n<10?Z[n]:n<20?'十'+(n%10?Z[n%10]:''):Z[Math.floor(n/10)]+'十'+(n%10?Z[n%10]:'');
const np=n=>n<10?P[n]:n<20?'shí'+(n%10?' '+P[n%10]:''):P[Math.floor(n/10)]+' shí'+(n%10?' '+P[n%10]:'');
const hz=h=>h===2?'两':nz(h),hp=h=>h===2?'liǎng':np(h);
const pad=n=>String(n).padStart(2,'0'),E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const whale=(n,s)=>{try{return RWH(n,s)}catch(e){return''}};

/* ---------- cách đọc giờ ---------- */
function readTime(H,m){
 const h=H%12||12,nx=h%12+1;
 const per=H<5?['凌晨','língchén','rạng sáng']:H<8?['早上','zǎoshang','sáng sớm']:H<12?['上午','shàngwǔ','buổi sáng']:H<13?['中午','zhōngwǔ','trưa']:H<18?['下午','xiàwǔ','chiều']:['晚上','wǎnshang','tối'];
 const mk=(a,b)=>({zh:a,py:b}),A=hz(h),B=hp(h);let main,alts=[],note='';
 if(m===0)main=mk(A+'点整',B+' diǎn zhěng');
 else if(m<10){main=mk(`${A}点零${nz(m)}分`,`${B} diǎn líng ${np(m)} fēn`);alts.push(mk(`${A}点${nz(m)}分`,`${B} diǎn ${np(m)} fēn`))}
 else if(m===15){main=mk(`${A}点一刻`,`${B} diǎn yí kè`);alts.push(mk(`${A}点十五分`,`${B} diǎn shí wǔ fēn`));note='一刻 = 15 phút (một khắc)'}
 else if(m===30){main=mk(`${A}点半`,`${B} diǎn bàn`);alts.push(mk(`${A}点三十分`,`${B} diǎn sān shí fēn`));note='半 = rưỡi (30 phút)'}
 else if(m===45){main=mk(`${A}点三刻`,`${B} diǎn sān kè`);alts.push(mk(`差一刻${hz(nx)}点`,`chà yí kè ${hp(nx)} diǎn`),mk(`${A}点四十五分`,`${B} diǎn sì shí wǔ fēn`));note='三刻 = 45 phút · 差 = kém'}
 else{main=mk(`${A}点${nz(m)}分`,`${B} diǎn ${np(m)} fēn`);if(m>=40){alts.push(mk(`差${nz(60-m)}分${hz(nx)}点`,`chà ${np(60-m)} fēn ${hp(nx)} diǎn`));note='差 = kém (còn thiếu ... phút nữa tới giờ sau)'}}
 const vi=`${h} giờ`+(m===0?' đúng':m===30?' rưỡi':` ${m} phút`)+' '+per[2];
 return{per,main,alts,vi,note,full:per[0]+main.zh,fullpy:per[1]+' '+main.py};
}

/* ---------- cách đọc ngày ---------- */
const WZ=['天','一','二','三','四','五','六'],WP=['tiān','yī','èr','sān','sì','wǔ','liù'],WV=['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
const yz=y=>String(y).split('').map(d=>Z[d]).join(''),yp=y=>String(y).split('').map(d=>P[d]).join(' ');
const day0=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
function readDate(d){const y=d.getFullYear(),m=d.getMonth()+1,n=d.getDate(),w=d.getDay();
 const diff=Math.round((day0(d)-day0(new Date()))/864e5),R={'-2':['前天','qián tiān','hôm kia'],'-1':['昨天','zuó tiān','hôm qua'],'0':['今天','jīn tiān','hôm nay'],'1':['明天','míng tiān','ngày mai'],'2':['后天','hòu tiān','ngày kia']}[diff]||null;
 return{zh:`${yz(y)}年${nz(m)}月${nz(n)}号 星期${WZ[w]}`,py:`${yp(y)} nián ${np(m)} yuè ${np(n)} hào xīngqī ${WP[w]}`,
  wr:`${y}年${m}月${n}日 星期${w===0?'日':WZ[w]}`,vi:`${WV[w]}, ngày ${n} tháng ${m} năm ${y}`,rel:R,
  mzh:`${nz(m)}月`,mpy:np(m)+' yuè',wzh:'星期'+WZ[w],wpy:'xīngqī '+WP[w],speak:`${yz(y)}年${nz(m)}月${nz(n)}号，星期${WZ[w]}`}}

/* ---------- trạng thái ---------- */
const now=new Date();
const XT=t=>t==='shop'||t==='num'||t==='wheel';
const S={tool:'clock',quiz:true,reveal:false,clock:{h:now.getHours(),m:now.getMinutes(),snap:1},cal:{y:now.getFullYear(),m:now.getMonth(),sel:day0(now)}};
let root=null;
window.TTspeak=t=>speak(t);window.__ttQuiz=()=>S.quiz;
const speak=t=>{try{const u=new SpeechSynthesisUtterance(t);u.lang='zh-CN';u.rate=.8;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}};

/* ---------- CSS ---------- */
if(!document.getElementById('tt-css')){const st=document.createElement('style');st.id='tt-css';st.textContent=`
.tabs{flex-wrap:wrap}
.tt-tabs{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}
.tt-tab{display:flex;align-items:center;gap:8px;font:800 18px var(--f-d);border:2.5px solid var(--outline);background:var(--panel2);color:var(--ink);border-radius:18px;padding:6px 18px 6px 8px;cursor:pointer;box-shadow:0 4px 0 var(--outline)}
.tt-tab.on{background:var(--accent);color:var(--on-accent)}
.tt-tab .wh{width:44px;height:auto}
.tt-card{position:relative}
.tt-bar{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:10px}
.tt-chk{display:flex;align-items:center;gap:8px;font-weight:700;cursor:pointer}
.tt-chk input{flex:none;min-width:0;width:20px;height:20px;margin:0}
.tt-grid{display:grid;grid-template-columns:minmax(260px,420px) 1fr;gap:22px;align-items:start}
@media(max-width:760px){.tt-grid{grid-template-columns:1fr}}
.tt-cw{display:flex;flex-direction:column;align-items:center;gap:6px}
#tt-svg{width:100%;max-width:420px;touch-action:none;cursor:grab;user-select:none}
#tt-svg .face{fill:var(--panel2);stroke:var(--outline);stroke-width:5}
#tt-svg .tk{stroke:var(--outline);stroke-width:2;stroke-linecap:round}
#tt-svg .tk5{stroke-width:4}
#tt-svg text{fill:var(--ink);font:800 24px var(--f-d);text-anchor:middle;dominant-baseline:central}
#tt-svg .hh{stroke:var(--ink);stroke-width:11;stroke-linecap:round}
#tt-svg .mh{stroke:var(--c0);stroke-width:7;stroke-linecap:round}
#tt-svg .kh{fill:var(--ink)}#tt-svg .km{fill:var(--c0)}
#tt-svg .hit{fill:transparent}
.tt-digi{font:800 44px var(--f-d);letter-spacing:2px}.tt-digi small{font-size:18px;letter-spacing:0;color:var(--muted);margin-left:6px}
.tt-read{border:2.5px dashed var(--outline);border-radius:18px;padding:14px 16px;background:var(--panel2);min-height:150px}
.tt-zh{font:800 40px/1.25 var(--f-z);color:var(--ink)}
.tt-py{font:700 22px/1.4 var(--f-b);color:var(--accent);margin-top:2px}
.tt-zh.sm{font-size:26px}.tt-py.sm{font-size:16px}.tt-alt .tt-wr{font:800 40px/1.25 var(--f-z);margin:6px 0}
.tt-alt .sm2{font-size:17px}.tt-alt .sm2 span{font-size:14px}
.tt-vi{font-size:18px;margin-top:6px}
.tt-alt{margin-top:10px;padding-top:8px;border-top:2px dotted var(--outline)}
.tt-alt div{font-size:20px;margin:3px 0}.tt-alt b{font-family:var(--f-z)}.tt-alt span{color:var(--accent);margin-left:8px;font-size:16px}
.tt-note{margin-top:8px;color:var(--muted)}
.tt-hide{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:120px;text-align:center}
.tt-hide .q{font:800 54px var(--f-d);color:var(--muted)}
.tt-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.tt-ctl .btn{padding:6px 14px;font-size:16px;box-shadow:0 3px 0 var(--outline)}
.tt-ctl select{font:700 16px var(--f-b);border:2.5px solid var(--outline);border-radius:12px;padding:5px 8px;background:var(--panel2);color:var(--ink)}
.tt-tip{margin-top:14px;font-size:16px;line-height:1.6}
.tt-tip table{border-collapse:collapse;width:100%}.tt-tip td{padding:4px 8px;border-bottom:1px dotted var(--outline)}
.tt-tip .z{font:800 20px var(--f-z)}.tt-tip .p{color:var(--accent)}
.tt-nav{display:flex;align-items:center;gap:6px;margin-bottom:8px}
.tt-nav .t{font:800 24px var(--f-d);flex:1;min-width:0;text-align:center}
.tt-nav .btn{flex:none;padding:4px 12px;font-size:16px;box-shadow:0 3px 0 var(--outline)}
.tt-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.tt-cal .wd{text-align:center;font:800 18px var(--f-z);padding:2px 0;line-height:1.1}.tt-cal .wd small{display:block;font:700 12px var(--f-b);color:var(--muted)}
.tt-cal .wd.we{color:var(--c0)}
.tt-cal button{font:800 20px var(--f-d);aspect-ratio:1/.82;border:2px solid var(--outline);border-radius:12px;background:var(--panel);color:var(--ink);cursor:pointer;padding:0}
.tt-cal button.we{color:var(--c0)}
.tt-cal button.td{background:var(--butter,#f9e7af);color:var(--ink)}
.tt-cal button.sel{background:var(--accent);color:var(--on-accent);box-shadow:0 3px 0 var(--outline)}
.tt-cal i{visibility:hidden}
.tt-card:fullscreen{background:var(--bg);padding:26px;overflow:auto;border-radius:0}
.tt-card:fullscreen .tt-zh{font-size:64px}.tt-card:fullscreen .tt-py{font-size:32px}.tt-card:fullscreen .tt-zh.sm{font-size:26px}.tt-py.sm{font-size:16px}.tt-alt .tt-wr{font:800 40px/1.25 var(--f-z);margin:6px 0}
.tt-vi{font-size:24px}
.tt-card:fullscreen .tt-grid{grid-template-columns:minmax(300px,640px) 1fr}
@media(max-width:560px){.tt-alt .tt-wr{font-size:34px}.tt-zh.sm{font-size:22px}.tt-zh{font-size:32px}.tt-py{font-size:18px}.tt-digi{font-size:36px}.tt-nav .t{font-size:20px}}
`;document.head.appendChild(st)}

/* ---------- Đồng hồ ---------- */
function svgClock(){let t='';for(let i=0;i<60;i++){const a=i*6*Math.PI/180,big=i%5===0,r1=big?112:120,r2=128,s=Math.sin(a),c=-Math.cos(a);t+=`<line class="tk ${big?'tk5':''}" x1="${150+s*r1}" y1="${150+c*r1}" x2="${150+s*r2}" y2="${150+c*r2}"/>`}
 for(let i=1;i<=12;i++){const a=i*30*Math.PI/180;t+=`<text x="${150+Math.sin(a)*90}" y="${150-Math.cos(a)*90}">${i}</text>`}
 return`<svg id="tt-svg" viewBox="0 0 300 300" role="img" aria-label="Đồng hồ kim, kéo kim để chỉnh giờ"><circle class="face" cx="150" cy="150" r="140"/>${t}
 <g id="tt-hh"><line class="hh" x1="150" y1="150" x2="150" y2="92"/><circle class="kh" cx="150" cy="92" r="8"/></g>
 <g id="tt-mh"><line class="mh" x1="150" y1="150" x2="150" y2="48"/><circle class="km" cx="150" cy="48" r="8"/></g>
 <circle class="kh" cx="150" cy="150" r="9"/></svg>`}
function clockHtml(){return`<div class="tt-grid"><div class="tt-cw">${svgClock()}<div class="tt-digi" id="tt-digi"></div><span class="muted">Kéo kim phút (vòng ngoài) hoặc kim giờ (vòng trong) để chỉnh giờ</span></div>
 <div><div class="tt-read" id="tt-read"></div>
 <div class="tt-ctl"><button class="btn" data-a="h-">− 1 giờ</button><button class="btn" data-a="h+">+ 1 giờ</button><button class="btn" data-a="m-">− 5 phút</button><button class="btn" data-a="m+">+ 5 phút</button></div>
 <div class="tt-ctl"><button class="btn" data-a="s0">:00 · 整</button><button class="btn" data-a="s15">:15 · 一刻</button><button class="btn" data-a="s30">:30 · 半</button><button class="btn" data-a="s45">:45 · 三刻</button></div>
 <div class="tt-ctl"><button class="btn" data-a="ampm">☀️ Sáng ⇄ 🌙 Chiều</button><button class="btn" data-a="now">Bây giờ</button><button class="btn pri" data-a="rand">🎲 Giờ ngẫu nhiên</button>
 <label class="muted">Kim phút nhảy: <select id="tt-snap"><option value="1">1 phút</option><option value="5">5 phút</option></select></label></div>
 <div class="tt-tip"><b>Cần nhớ</b><table>
 <tr><td class="z">点</td><td class="p">diǎn</td><td>giờ</td><td class="z">分</td><td class="p">fēn</td><td>phút</td></tr>
 <tr><td class="z">刻</td><td class="p">kè</td><td>15 phút</td><td class="z">半</td><td class="p">bàn</td><td>rưỡi</td></tr>
 <tr><td class="z">差</td><td class="p">chà</td><td>kém</td><td class="z">两点</td><td class="p">liǎng diǎn</td><td>2 giờ (không nói 二点)</td></tr></table>
 <div style="margin-top:8px">现在几点？ <span class="muted">Xiànzài jǐ diǎn? · Bây giờ là mấy giờ?</span><br>你几点起床？ <span class="muted">Nǐ jǐ diǎn qǐchuáng? · Bạn mấy giờ thức dậy?</span></div></div></div></div>`}
function clockReadHtml(){const C=S.clock,r=readTime(C.h,C.m);
 if(S.quiz&&!S.reveal)return`<div class="tt-hide"><div class="q">?</div><div class="muted">Học sinh đọc giờ này bằng tiếng Trung</div><button class="btn pri" data-a="reveal">Hiện đáp án</button></div>`;
 return`<div class="tt-zh sm">${E(r.full)}</div><div class="tt-py sm">${E(r.fullpy)}</div>
 ${r.alts.length?`<div class="tt-alt"><b>Cách nói khác</b>${r.alts.map(a=>`<div class="sm2"><b>${E(r.per[0]+a.zh)}</b><span>${E(a.py)}</span></div>`).join('')}</div>`:''}
 <div class="tt-ctl"><button class="btn" data-a="say">🔊 Nghe</button></div>`}
function updClock(){const C=S.clock;const hh=document.getElementById('tt-hh'),mh=document.getElementById('tt-mh');if(!hh)return;
 hh.setAttribute('transform',`rotate(${(C.h%12)*30+C.m*.5} 150 150)`);mh.setAttribute('transform',`rotate(${C.m*6} 150 150)`);
 const hide=S.quiz&&!S.reveal,per=readTime(C.h,C.m).per;
 document.getElementById('tt-digi').innerHTML=hide?'?:??':`${C.h%12||12}:${pad(C.m)}`;
 document.getElementById('tt-read').innerHTML=clockReadHtml()}
function wireClock(){const svg=document.getElementById('tt-svg');if(!svg)return;let drag=null;const C=S.clock;
 const sn=document.getElementById('tt-snap');if(sn){sn.value=String(C.snap);sn.onchange=()=>{C.snap=+sn.value}}
 const pos=e=>{const r=svg.getBoundingClientRect(),k=300/r.width,x=(e.clientX-r.left)*k-150,y=(e.clientY-r.top)*k-150;return{d:Math.hypot(x,y),a:(Math.atan2(x,-y)*180/Math.PI+360)%360}};
 const mv=e=>{const p=pos(e),was=S.reveal;
  if(drag==='m'){const m=Math.round(p.a/(6*C.snap))*C.snap%60,pv=C.m;if(pv>=45&&m<=14)C.h=(C.h+1)%24;else if(pv<=14&&m>=45)C.h=(C.h+23)%24;C.m=m}
  else{const h12=Math.round(p.a/30)%12;C.h=h12+(C.h>=12?12:0)}
  if(S.quiz)S.reveal=false;updClock()};
 svg.onpointerdown=e=>{const p=pos(e);drag=p.d<80?'h':'m';try{svg.setPointerCapture(e.pointerId)}catch(x){}mv(e);e.preventDefault()};
 svg.onpointermove=e=>{if(drag)mv(e)};svg.onpointerup=svg.onpointercancel=()=>{drag=null};
 updClock()}
function clockAct(a){const C=S.clock,tot=()=>C.h*60+C.m,set=t=>{t=((t%1440)+1440)%1440;C.h=Math.floor(t/60);C.m=t%60};
 if(a==='h+')set(tot()+60);else if(a==='h-')set(tot()-60);else if(a==='m+')set(tot()+5);else if(a==='m-')set(tot()-5);
 else if(a[0]==='s'&&/^s\d+$/.test(a))C.m=+a.slice(1);
 else if(a==='ampm')C.h=(C.h+12)%24;
 else if(a==='now'){const d=new Date();C.h=d.getHours();C.m=d.getMinutes()}
 else if(a==='rand'){C.h=6+Math.floor(Math.random()*17);C.m=Math.random()<.25?Math.floor(Math.random()*60):[0,5,10,15,20,25,30,35,40,45,50,55][Math.floor(Math.random()*12)]}
 else if(a==='reveal'){S.reveal=true;updClock();return}
 else if(a==='say'){const r=readTime(C.h,C.m);speak(r.full);return}
 if(S.quiz)S.reveal=false;updClock()}

/* ---------- Lịch ---------- */
function calHtml(){const K=S.cal,first=new Date(K.y,K.m,1),off=(first.getDay()+6)%7,n=new Date(K.y,K.m+1,0).getDate(),td=day0(new Date());
 const L=['一','二','三','四','五','六','日'],V=['T2','T3','T4','T5','T6','T7','CN'];
 let cells=L.map((z,i)=>`<div class="wd ${i>4?'we':''}">${z}<small>${V[i]}</small></div>`).join('')+'<i></i>'.repeat(off).replace(/<i><\/i>/g,'<div></div>');
 for(let d=1;d<=n;d++){const dt=new Date(K.y,K.m,d),w=dt.getDay(),cls=[(w===0||w===6)?'we':'',+dt===+td?'td':'',+dt===+K.sel?'sel':''].join(' ');cells+=`<button class="${cls}" data-d="${d}">${d}</button>`}
 return`<div class="tt-grid"><div><div class="tt-nav"><button class="btn" data-a="y-">«</button><button class="btn" data-a="mo-">‹</button><div class="t">${K.y}年${K.m+1}月<div class="muted" style="font:700 14px var(--f-b)">${yp(K.y)} nián ${np(K.m+1)} yuè</div></div><button class="btn" data-a="mo+">›</button><button class="btn" data-a="y+">»</button></div>
 <div class="tt-cal">${cells}</div><div class="tt-ctl"><button class="btn" data-a="today">Hôm nay · 今天</button><button class="btn pri" data-a="rand">🎲 Ngày ngẫu nhiên</button></div></div>
 <div><div class="tt-read" id="tt-read"></div>
 <div class="tt-tip"><b>Cần nhớ</b><table>
 <tr><td class="z">月</td><td class="p">yuè</td><td>tháng</td><td class="z">号 / 日</td><td class="p">hào / rì</td><td>ngày (nói / viết)</td></tr>
 <tr><td class="z">星期</td><td class="p">xīngqī</td><td>thứ</td><td class="z">星期天 / 日</td><td class="p">xīngqī tiān</td><td>Chủ nhật</td></tr></table>
 <div style="margin-top:8px">今天几月几号？ <span class="muted">Jīntiān jǐ yuè jǐ hào? · Hôm nay ngày mấy tháng mấy?</span><br>今天星期几？ <span class="muted">Jīntiān xīngqī jǐ? · Hôm nay thứ mấy?</span><br>你的生日是几月几号？ <span class="muted">Nǐ de shēngrì shì jǐ yuè jǐ hào?</span></div></div></div></div>`}
function calReadHtml(){const r=readDate(S.cal.sel);
 if(S.quiz&&!S.reveal)return`<div class="tt-hide"><div class="q">?</div><div class="muted">Học sinh đọc ngày này bằng tiếng Trung<br><b>${S.cal.sel.getDate()}/${S.cal.sel.getMonth()+1}/${S.cal.sel.getFullYear()}</b></div><button class="btn pri" data-a="reveal">Hiện đáp án</button></div>`;
 return`${r.rel?`<div class="tt-note" style="margin:0 0 6px"><b style="font:800 22px var(--f-z)">${r.rel[0]}</b> <span class="muted">${r.rel[1]}</span></div>`:''}
 <div class="tt-zh sm">${E(r.zh)}</div><div class="tt-py sm">${E(r.py)}</div>
 <div class="tt-alt"><b>Cách viết</b><div class="tt-wr">${E(r.wr)}</div></div><div class="tt-ctl"><button class="btn" data-a="say">🔊 Nghe</button></div>`}
function updCal(){const e=document.getElementById('tt-read');if(e)e.innerHTML=calReadHtml()}
function calAct(a){const K=S.cal;
 if(a==='mo-'||a==='mo+'||a==='y-'||a==='y+'){const dm=a==='mo-'?-1:a==='mo+'?1:a==='y-'?-12:12,d=new Date(K.y,K.m+dm,1);K.y=d.getFullYear();K.m=d.getMonth();const n=new Date(K.y,K.m+1,0).getDate();K.sel=new Date(K.y,K.m,Math.min(K.sel.getDate(),n))}
 else if(a==='today'){const d=new Date();K.y=d.getFullYear();K.m=d.getMonth();K.sel=day0(d)}
 else if(a==='rand'){const n=new Date(K.y,K.m+1,0).getDate();K.sel=new Date(K.y,K.m,1+Math.floor(Math.random()*n))}
 else if(a==='reveal'){S.reveal=true;updCal();return}
 else if(a==='say'){speak(readDate(K.sel).speak);return}
 if(S.quiz)S.reveal=false;paint()}

/* ---------- khung chung ---------- */
function inner(){const T=S.tool;
 return`<div class="tt-tabs"><button class="tt-tab ${T==='clock'?'on':''}" data-tt="clock">${whale('clock',44)} Đồng hồ · 时间</button><button class="tt-tab ${T==='cal'?'on':''}" data-tt="cal">${whale('calendar',44)} Lịch · 日期</button><button class="tt-tab ${T==='shop'?'on':''}" data-tt="shop">${whale('cards',44)} Cửa hàng · 商店</button><button class="tt-tab ${T==='num'?'on':''}" data-tt="num">${whale('hanzi',44)} Số đếm · 数字</button><button class="tt-tab ${T==='wheel'?'on':''}" data-tt="wheel">${whale('dice',44)} Vòng xoay · 分组</button></div>
 <div class="card tt-card" id="tt-card"><div class="tt-bar">${T==='wheel'?'<span></span>':`<label class="tt-chk"><input type="checkbox" id="tt-quiz" ${S.quiz?'checked':''}> Ẩn đáp án để học sinh tự đọc</label>`}<button class="btn sm" data-a="fs">⛶ Toàn màn hình</button></div>${T==='clock'?clockHtml():XT(T)?(window.TTX&&TTX[T]?TTX[T].html():'<p>Chưa tải được công cụ này.</p>'):calHtml()}</div>`}
function paint(){if(!root||!document.body.contains(root))root=document.getElementById('tt-root');if(!root)return;root.innerHTML=inner();after()}
function after(){if(S.tool==='clock')wireClock();else if(XT(S.tool)){if(window.TTX&&TTX[S.tool])TTX[S.tool].after(()=>paint())}else updCal()}
function onClick(e){if((XT(S.tool))&&window.TTX&&TTX[S.tool]&&TTX[S.tool].click(e))return;const b=e.target.closest('[data-tt],[data-a],[data-d]');if(!b)return;
 if(b.dataset.tt){S.tool=b.dataset.tt;S.reveal=false;paint();return}
 if(b.dataset.d){S.cal.sel=new Date(S.cal.y,S.cal.m,+b.dataset.d);if(S.quiz)S.reveal=false;paint();return}
 const a=b.dataset.a;
 if(a==='fs'){const c=document.getElementById('tt-card');try{document.fullscreenElement?document.exitFullscreen():c.requestFullscreen()}catch(x){}return}
 if(XT(S.tool))return;S.tool==='clock'?clockAct(a):calAct(a)}
function wire(){root=document.getElementById('tt-root');if(!root)return;root.onclick=onClick;
 root.onchange=e=>{if(e.target.id==='tt-quiz'){S.quiz=e.target.checked;S.reveal=false;if(S.tool==='clock')updClock();else if(XT(S.tool)){if(window.TTX&&TTX[S.tool])TTX[S.tool].refresh()}else updCal()}};root.oninput=e=>{if((XT(S.tool))&&window.TTX&&TTX[S.tool])TTX[S.tool].input(e)};after()}
window.TT={html:()=>`<div id="tt-root">${inner()}</div>`,wire,readTime,readDate};
})();
