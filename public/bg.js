/* Nền rừng đêm sương mù: các lớp thân cây xa dần, chùm sáng từ trăng, đom đóm mờ nhoè như ống kính. Tự dừng khi tab ẩn, đứng yên nếu máy tắt hiệu ứng chuyển động. */
(()=>{const c=document.createElement('canvas');c.setAttribute('aria-hidden','true');c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';document.body.prepend(c);
const x=c.getContext('2d');let W,H,D=Math.min(devicePixelRatio||1,1.5);const N=+(document.currentScript&&document.currentScript.dataset.n||70);
let SC=null;const rs=()=>{W=innerWidth;H=innerHeight;c.width=W*D;c.height=H*D;x.setTransform(D,0,0,D,0,0);SC=null};rs();addEventListener('resize',rs);
function seed(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));const rgb=a=>`rgb(${a[0]},${a[1]},${a[2]})`;

const LT=()=>document.documentElement.dataset.theme==='light';addEventListener('rwtheme',()=>{SC=null});
function scene(){const L=LT();const o=document.createElement('canvas');o.width=W*D;o.height=H*D;const k=o.getContext('2d');k.setTransform(D,0,0,D,0,0);const r=seed(11);
 // bầu trời đêm xanh rêu thẫm
 let g=k.createLinearGradient(0,0,0,H);if(L){g.addColorStop(0,'#c4e8de');g.addColorStop(.4,'#dbf2e8');g.addColorStop(.75,'#cfe9d9');g.addColorStop(1,'#a8d3bb')}else{g.addColorStop(0,'#020b0c');g.addColorStop(.35,'#06191a');g.addColorStop(.7,'#0a2c27');g.addColorStop(1,'#04120f')};k.fillStyle=g;k.fillRect(0,0,W,H);
 // vầng trăng mờ phía trên bên phải
 const mx=W*.74,my=-H*.04;g=k.createRadialGradient(mx,my,0,mx,my,H*.95);if(L){g.addColorStop(0,'rgba(255,248,210,.75)');g.addColorStop(.25,'rgba(255,240,190,.28)');g.addColorStop(1,'rgba(255,240,190,0)')}else{g.addColorStop(0,'rgba(190,235,220,.34)');g.addColorStop(.25,'rgba(120,190,175,.14)');g.addColorStop(1,'rgba(60,120,110,0)')};k.fillStyle=g;k.fillRect(0,0,W,H);
 // vùng sáng thấp (sương dưới chân rừng)
 g=k.createRadialGradient(W*.5,H*.78,0,W*.5,H*.78,W*.7);g.addColorStop(0,'rgba(120,200,160,.2)');g.addColorStop(1,'rgba(120,200,160,0)');k.fillStyle=g;k.fillRect(0,0,W,H);
 const fog=L?[170,218,200]:[26,86,76];
 // các lớp thân cây, từ xa (nhạt, mờ) đến gần (đen, nét)
 const layers=[{n:46,w:[3,7],t:.78,a:.55,base:.74},{n:34,w:[5,11],t:.6,a:.7,base:.78},{n:24,w:[8,18],t:.4,a:.85,base:.83},{n:13,w:[14,34],t:.18,a:1,base:.9}];
 layers.forEach((L2,li)=>{const col=mix(L?[36,92,76]:[3,12,12],fog,L2.t);
  for(let i=0;i<L2.n;i++){const px=r()*W*1.1-W*.05,w=L2.w[0]+r()*(L2.w[1]-L2.w[0]),lean=(r()-.5)*.05,top=-20,bot=H*(L2.base+r()*.06);
   k.fillStyle=rgb(col);k.globalAlpha=L2.a*(.75+r()*.25);k.beginPath();k.moveTo(px-w/2,bot);k.lineTo(px-w*.32+lean*H,top);k.lineTo(px+w*.32+lean*H,top);k.lineTo(px+w/2,bot);k.fill();
   // cành nhỏ vươn ra từ thân
   const nb=li<2?0:li<3?1:2;for(let j=0;j<nb;j++){const by=H*(.1+r()*.55),dir=r()<.5?-1:1,bl=w*(1.4+r()*2.4);k.strokeStyle=rgb(col);k.lineWidth=Math.max(1,w*.18);k.beginPath();k.moveTo(px+lean*by,by);k.quadraticCurveTo(px+dir*bl*.5+lean*by,by-bl*.25,px+dir*bl+lean*by,by-bl*.5);k.stroke()}}
  k.globalAlpha=1;
  // tán lá tối trên cao của lớp này
  for(let i=0;i<10+li*4;i++){const px=r()*W,py=r()*H*.16,rr=H*(.05+r()*.08)*(1+li*.35);const cg=k.createRadialGradient(px,py,0,px,py,rr);cg.addColorStop(0,rgb(col)+'');cg.addColorStop(1,`rgba(${col[0]},${col[1]},${col[2]},0)`);k.globalAlpha=.55+li*.12;k.fillStyle=cg;k.beginPath();k.arc(px,py,rr,0,7);k.fill()}
  k.globalAlpha=1;
  // sương phủ lên lớp này, che dần để tạo cảm giác xa
  if(li<3){const fg=k.createLinearGradient(0,H*.3,0,H);const mc=L?'255,255,255':'70,150,130';fg.addColorStop(0,`rgba(${mc},0)`);fg.addColorStop(.55,`rgba(${mc},${(L?.38:.2)-li*.06})`);fg.addColorStop(1,`rgba(${mc},0)`);k.fillStyle=fg;k.fillRect(0,H*.3,W,H*.7)}
 });
 // chùm sáng xiên từ trăng
 k.save();k.globalCompositeOperation='lighter';
 for(let i=0;i<7;i++){const sx=W*(.5+r()*.5),wd=W*(.03+r()*.07),len=H*1.1,ang=-.34+r()*.12;k.save();k.translate(sx,-20);k.rotate(ang);const lg=k.createLinearGradient(0,0,0,len);const lc=L?'255,250,215':'170,230,210';lg.addColorStop(0,`rgba(${lc},${(L?.2:.1)+r()*.06})`);lg.addColorStop(.6,`rgba(${lc},.05)`);lg.addColorStop(1,`rgba(${lc},0)`);k.fillStyle=lg;k.beginPath();k.moveTo(-wd*.3,0);k.lineTo(wd*.3,0);k.lineTo(wd*1.4,len);k.lineTo(-wd*1.4,len);k.fill();k.restore()}
 k.restore();
 // mặt đất: thảm cỏ tối, có ánh sương
 g=k.createLinearGradient(0,H*.86,0,H);if(L){g.addColorStop(0,'rgba(120,190,150,0)');g.addColorStop(.4,'rgba(70,140,100,.85)');g.addColorStop(1,'#2f6f52')}else{g.addColorStop(0,'rgba(8,40,32,0)');g.addColorStop(.4,'rgba(6,26,22,.9)');g.addColorStop(1,'#020a08')};k.fillStyle=g;k.fillRect(0,H*.86,W,H*.14);
 // cỏ tĩnh nhiều lớp, nhỏ mịn
 for(let L_=0;L_<3;L_++){const col=mix(L?[72,158,112]:[14,52,42],L?[26,86,62]:[2,10,8],L_/2);k.fillStyle=rgb(col);k.globalAlpha=.9;const n=Math.round(W/(5+L_*1.5));
  for(let i=0;i<n;i++){const px=r()*W,hh=H*(.025+r()*.05)*(1+L_*.35),by=H*(.93+L_*.025)+r()*H*.03,w=1+r()*2+L_*.5,lean=(r()-.5)*hh*.7;k.beginPath();k.moveTo(px-w,by);k.quadraticCurveTo(px+lean*.3,by-hh*.6,px+lean,by-hh);k.quadraticCurveTo(px+lean*.4+w*.3,by-hh*.5,px+w,by);k.fill()}}
 k.globalAlpha=1;
 // tối mép (vignette)
 g=k.createRadialGradient(W/2,H*.5,Math.min(W,H)*.35,W/2,H*.5,Math.max(W,H)*.85);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,L?'rgba(120,180,150,.45)':'rgba(0,4,4,.72)');k.fillStyle=g;k.fillRect(0,0,W,H);
 return o}

const R=Math.random;
// đom đóm: ba tầng độ sâu; tầng gần to và nhoè (bokeh), tầng xa nhỏ và sắc
const F=Array.from({length:N},(_,i)=>{const z=i%5===0?2:i%2?1:0;return{x:R(),y:.1+R()*.85,z,r:z===2?7+R()*7:z?2.2+R()*1.6:1.1+R()*1,s:.015+R()*.035,p:R()*7,f:.3+R()*.8,g:R()<.7?'255,226,150':'190,255,200'}});
// bụi sáng bay lơ lửng trong chùm sáng
const M=Array.from({length:Math.round(N*.9)},()=>({x:R(),y:R(),r:.5+R()*1.1,s:.004+R()*.01,p:R()*7}));
const B=Array.from({length:Math.max(2,Math.round(N/16))},()=>({x:R(),y:.2+R()*.6,s:.01+R()*.012,p:R()*7}));
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;let on=true;document.addEventListener('visibilitychange',()=>{on=!document.hidden;if(on)requestAnimationFrame(t)});
function t(ts){if(!on)return;const T=ts/1000;x.clearRect(0,0,W,H);
 if(!SC)SC=scene();x.drawImage(SC,0,0,W,H);
 const L=LT();x.save();x.globalCompositeOperation=L?'source-over':'lighter';
 for(const m of M){const px=((m.x+Math.sin(T*.2+m.p)*.01)%1)*W,py=((m.y-T*m.s*(still?0:1)+8)%1)*H;x.fillStyle=L?`rgba(255,255,255,${.35+.25*Math.sin(T*.8+m.p)})`:`rgba(200,240,225,${.12+.1*Math.sin(T*.8+m.p)})`;x.beginPath();x.arc(px,py,m.r,0,7);x.fill()}
 for(const f of F){const px=((f.x+Math.sin(T*f.s*3+f.p)*.03+(still?0:T*f.s*.06))%1)*W,py=(f.y+Math.cos(T*f.s*2+f.p)*.035)*H,a=still?.6:.2+.8*Math.pow(Math.abs(Math.sin(T*f.f+f.p)),1.5);
  const fc=L?(f.g[0]==='2'?'255,184,60':'110,190,110'):f.g;const rr=f.z===2?f.r:f.r*6;const g=x.createRadialGradient(px,py,0,px,py,rr);
  if(f.z===2){g.addColorStop(0,`rgba(${fc},${a*.1})`);g.addColorStop(.7,`rgba(${fc},${a*.16})`);g.addColorStop(1,`rgba(${fc},0)`)}
  else{g.addColorStop(0,`rgba(${fc},${a})`);g.addColorStop(.22,`rgba(${fc},${a*.3})`);g.addColorStop(1,`rgba(${fc},0)`)}
  x.fillStyle=g;x.beginPath();x.arc(px,py,rr,0,7);x.fill();
  if(f.z<2){x.fillStyle=`rgba(255,250,225,${Math.min(1,a+.1)})`;x.beginPath();x.arc(px,py,f.r*.5,0,7);x.fill()}}
 x.restore();
 for(const b of B){const px=((b.x+T*b.s*.5)%1)*W,py=(b.y+Math.sin(T*.7+b.p)*.03)*H,w=still?.6:Math.abs(Math.sin(T*6+b.p));x.fillStyle='rgba(200,235,225,.5)';
  for(const sd of[-1,1]){x.beginPath();x.ellipse(px+sd*3*w,py,4*w+.8,2.4,sd*.5,0,7);x.fill()}}
 if(!still)requestAnimationFrame(t)}
requestAnimationFrame(t)})();
