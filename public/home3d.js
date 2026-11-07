/* Nhà 3D (góc nhìn xiên cố định): đồ nội thất dựng khối 3D, dời được, nhân vật đi/ngồi/nằm */
(function(){
const N=7,TW=104,TH=52,WH=190,CW=800,CH=610,OX=CW/2,OY=WH+34;
const P=(x,y,z)=>[OX+(x-y)*TW/2,OY+(x+y)*TH/2-(z||0)];
const FP={bed:[3,2],sofa:[2,1],chair:[1,1],plant:[1,1],cactus:[1,1],tv:[2,1],books:[1,1],bear:[1,1],cat:[1,1],whale:[1,1],piano:[2,1],bike:[2,1],fish:[1,1],tea:[1,1]};
Object.assign(FP,{"cloudbed":[3,2],"oceanbed":[3,2],"mintsofa":[2,1],"lavendersofa":[2,1],"wardrobe":[2,1],"bookcase":[2,1],"desk":[2,1],"vanity":[2,1],"kitchen":[2,1],"fridge":[1,1],"sink":[1,1],"bath":[2,1],"lamp":[1,1],"terrarium":[1,1],"record":[1,1],"coffeetable":[2,1],"dresser":[2,1],"laundry":[1,1],"petbed":[1,1],"dining":[2,1]});const SITS=['sofa','chair','mintsofa','lavendersofa'],LIES=['bed','cloudbed','oceanbed'];
const rgb=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return[0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(h,t,f)=>{const a=rgb(h),b=rgb(t);return'#'+a.map((v,i)=>Math.round(v+(b[i]-v)*f).toString(16).padStart(2,'0')).join('')};
const C=b=>({t:mix(b,'#ffffff',.22),l:b,r:mix(b,'#000000',.22)});
function poly(k,pts,fill,stroke){k.beginPath();pts.forEach((p,i)=>i?k.lineTo(p[0],p[1]):k.moveTo(p[0],p[1]));k.closePath();k.fillStyle=fill;k.fill();if(stroke!==false){k.lineWidth=1.4;k.strokeStyle='rgba(30,20,10,.55)';k.stroke()}}
function box(k,x,y,z,dx,dy,dz,c,alpha){if(typeof c==='string')c=C(c);if(alpha!=null)k.globalAlpha=alpha;
 poly(k,[P(x,y+dy,z),P(x+dx,y+dy,z),P(x+dx,y+dy,z+dz),P(x,y+dy,z+dz)],c.l);
 poly(k,[P(x+dx,y,z),P(x+dx,y+dy,z),P(x+dx,y+dy,z+dz),P(x+dx,y,z+dz)],c.r);
 poly(k,[P(x,y,z+dz),P(x+dx,y,z+dz),P(x+dx,y+dy,z+dz),P(x,y+dy,z+dz)],c.t);if(alpha!=null)k.globalAlpha=1}
function ball(k,x,y,z,r,col){const[p,q]=P(x,y,z);const g=k.createRadialGradient(p-r*.35,q-r*.4,r*.1,p,q,r);g.addColorStop(0,mix(col,'#ffffff',.4));g.addColorStop(1,mix(col,'#000000',.2));k.beginPath();k.arc(p,q,r,0,7);k.fillStyle=g;k.fill();k.lineWidth=1.3;k.strokeStyle='rgba(30,20,10,.5)';k.stroke()}
function cyl(k,x,y,z,r,h,col){const[p,q]=P(x,y,z),rx=.707*r*TW,ry=.707*r*TH;const g=k.createLinearGradient(p-rx,0,p+rx,0);g.addColorStop(0,mix(col,'#ffffff',.18));g.addColorStop(1,mix(col,'#000000',.28));
 k.beginPath();k.ellipse(p,q,rx,ry,0,0,Math.PI);k.lineTo(p-rx,q-h);k.ellipse(p,q-h,rx,ry,0,Math.PI,0,true);k.closePath();k.fillStyle=g;k.fill();k.lineWidth=1.3;k.strokeStyle='rgba(30,20,10,.5)';k.stroke();
 k.beginPath();k.ellipse(p,q-h,rx,ry,0,0,7);k.fillStyle=mix(col,'#ffffff',.3);k.fill();k.stroke()}
const WOOD='#b9814f',DWOOD='#8a5a34';
/* mỗi món: draw(k,x,y,phase). phase 0 = thân, phase 1 = phần che phía trước nhân vật khi ngồi/nằm */
const DRAW={
 bed(k,x,y,ph){if(ph===1)return;
  box(k,x+.04,y+.04,0,2.92,1.92,16,WOOD);box(k,x+.04,y+.04,16,.2,1.92,50,DWOOD);box(k,x+.24,y+.14,16,2.7,1.72,13,'#f6f4fa');box(k,x+.3,y+.36,29,.62,1.28,8,'#ffffff');
  box(k,x+1.15,y+.12,16,1.75,1.76,16,'#5aa9e6')},
 sofa(k,x,y,ph){if(ph===1)return;
  box(k,x,y,0,2,1,20,'#4a9ad8');box(k,x,y,20,2,.3,38,'#3f86c2');box(k,x+.02,y+.3,20,.26,.7,18,'#3f86c2');box(k,x+1.72,y+.3,20,.26,.7,18,'#3f86c2');
  box(k,x+.28,y+.3,20,1.44,.7,9,'#6bb8f0')},
 chair(k,x,y,ph){if(ph===1)return;for(const[a,b]of[[.14,.14],[.76,.14],[.14,.76],[.76,.76]])box(k,x+a,y+b,0,.1,.1,24,DWOOD);box(k,x+.1,y+.1,24,.8,.8,7,'#d49a5e');box(k,x+.1,y+.1,31,.8,.12,36,WOOD)},
 plant(k,x,y){cyl(k,x+.5,y+.5,0,.26,24,'#c9653f');for(const[a,b,z,r]of[[0,0,52,16],[-.15,.05,40,13],[.15,-.05,42,13],[0,.14,32,11],[.05,-.14,60,11]])ball(k,x+.5+a,y+.5+b,z,r,'#46b062')},
 cactus(k,x,y){cyl(k,x+.5,y+.5,0,.22,16,'#c9653f');cyl(k,x+.5,y+.5,16,.14,46,'#4aa857');cyl(k,x+.5+.2,y+.5,38,.07,18,'#4aa857');cyl(k,x+.5-.18,y+.5+.1,28,.07,14,'#4aa857')},
 tv(k,x,y){box(k,x+.1,y+.18,0,1.8,.6,26,'#8f6a46');box(k,x+.2,y+.3,26,1.6,.12,54,{t:'#2a343c',l:'#2fb0c0',r:'#16202a'});box(k,x+.8,y+.3,17,.4,.2,9,'#333')},
 books(k,x,y){box(k,x+.18,y+.18,0,.64,.64,10,'#d9534f');box(k,x+.22,y+.2,10,.56,.6,9,'#4a8fd0');box(k,x+.16,y+.22,19,.62,.58,8,'#e9a23b')},
 bear(k,x,y){ball(k,x+.5,y+.5,24,19,'#b57a45');ball(k,x+.5,y+.5,56,15,'#c18a52');ball(k,x+.35,y+.45,70,6,'#b57a45');ball(k,x+.65,y+.45,70,6,'#b57a45');ball(k,x+.5,y+.62,52,5,'#f1d6b4')},
 cat(k,x,y){ball(k,x+.5,y+.5,18,17,'#f09a3e');ball(k,x+.5,y+.62,42,13,'#f4a84e');ball(k,x+.4,y+.6,56,4,'#f09a3e');ball(k,x+.6,y+.6,56,4,'#f09a3e')},
 whale(k,x,y){ball(k,x+.5,y+.5,24,25,'#5aa9e6');ball(k,x+.5,y+.62,16,16,'#e8f4fb');ball(k,x+.9,y+.5,38,9,'#5aa9e6');ball(k,x+.42,y+.7,32,3,'#12424f')},
 piano(k,x,y){box(k,x,y,0,2,1,34,'#25252b');box(k,x+.05,y+.05,34,1.9,.6,6,'#33333b');box(k,x+.1,y+.6,34,1.8,.34,5,'#f6f6f6');box(k,x+.1,y+.06,40,1.8,.1,28,'#25252b')},
 bike(k,x,y){const wheel=(gx)=>{k.beginPath();for(let a=0;a<=24;a++){const t=a/24*Math.PI*2,p=P(x+gx+Math.cos(t)*.42,y+.5,26+Math.sin(t)*26);a?k.lineTo(p[0],p[1]):k.moveTo(p[0],p[1])}k.lineWidth=5;k.strokeStyle='#2a2a30';k.stroke()};wheel(.5);wheel(1.5);
  const a=P(x+.5,y+.5,26),b=P(x+1.5,y+.5,26),c=P(x+1.0,y+.5,54),d=P(x+1.45,y+.5,60);k.strokeStyle='#d9534f';k.lineWidth=5;k.beginPath();k.moveTo(a[0],a[1]);k.lineTo(c[0],c[1]);k.lineTo(b[0],b[1]);k.moveTo(c[0],c[1]);k.lineTo(d[0],d[1]);k.stroke()},
 fish(k,x,y){box(k,x+.12,y+.12,0,.76,.76,18,'#8a6244');box(k,x+.12,y+.12,18,.76,.76,44,{t:'#bfe9f5',l:'#9fdcee',r:'#7cc8dc'},.55);ball(k,x+.5,y+.5,40,7,'#ff8a3d');ball(k,x+.42,y+.55,52,5,'#ffd34d')},
 tea(k,x,y){box(k,x+.1,y+.1,0,.8,.8,26,'#c9a06a');ball(k,x+.5,y+.5,36,11,'#e9efe6');ball(k,x+.72,y+.5,38,3,'#e9efe6')}};
function wallArt(k,it,side,u,z){const h=it.s*1.25,e=it.e;k.save();
 const o=side==='L'?P(0,u,z):P(u,0,z),len=Math.hypot(TW/2,TH/2),ax=(TW/2)/len,ay=(side==='L'?-1:1)*(TH/2)/len;
 k.transform(ax,ay,0,1,o[0],o[1]);k.font=`${h*1.1}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;k.textAlign='center';k.textBaseline='middle';
 k.fillStyle='rgba(0,0,0,.18)';k.fillText(e,3,-h*.5+3);k.fillStyle='#000';k.fillText(e,0,-h*.5);k.restore()}
/* ---- trạng thái ---- */
const HRs=window.HR||{};
const G={gx:5.5,gy:5.5,view:0,pose:'stand',on:null,path:[],after:null,moving:false};let drag=null;
const fp=id=>FP[id]||[1,1];
const items=()=>ST.home.placed.map((p,i)=>({...p,i,it:ITEM[p.id]})).filter(o=>o.it);
const floorItems=()=>items().filter(o=>o.it.k==='f'&&o.g);
function occ(skip){const m=new Set();for(const o of floorItems()){if(o.i===skip)continue;const[w,h]=fp(o.id);for(let a=0;a<w;a++)for(let b=0;b<h;b++)m.add((o.g[0]+a)+','+(o.g[1]+b))}return m}
function fits(id,gx,gy,skip){const[w,h]=fp(id);if(gx<0||gy<0||gx+w>N||gy+h>N)return false;const m=occ(skip);for(let a=0;a<w;a++)for(let b=0;b<h;b++)if(m.has((gx+a)+','+(gy+b)))return false;return true}
function bfs(sx,sy,tx,ty,skip){const m=occ(skip),key=(x,y)=>x+','+y,q=[[sx,sy]],prev={[key(sx,sy)]:null};
 while(q.length){const[x,y]=q.shift();if(x===tx&&y===ty)break;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=N||ny>=N||prev[key(nx,ny)]!==undefined||m.has(key(nx,ny)))continue;if(dx&&dy&&(m.has(key(x+dx,y))||m.has(key(x,y+dy))))continue;prev[key(nx,ny)]=[x,y];q.push([nx,ny])}}
 if(prev[key(tx,ty)]===undefined)return null;const path=[];let c=[tx,ty];while(c){path.unshift(c);c=prev[key(c[0],c[1])]}path.shift();return path}
function resetHero(){G.pose='stand';G.on=null;G.after=null;G.path=[]}
function walkTile(tx,ty,after){if(G.pose!=='stand'){const o=G.on!=null?ST.home.placed[G.on]:null;G.pose='stand';G.on=null;if(o&&o.g){const[w,h]=fp(o.id);const cand=[[o.g[0]-1,o.g[1]],[o.g[0]+w,o.g[1]],[o.g[0],o.g[1]+h],[o.g[0],o.g[1]-1]].filter(c=>c[0]>=0&&c[1]>=0&&c[0]<N&&c[1]<N&&!occ().has(c.join(',')));if(cand.length){G.gx=cand[0][0]+.5;G.gy=cand[0][1]+.5}}}
 const sx=Math.min(N-1,Math.max(0,Math.floor(G.gx))),sy=Math.min(N-1,Math.max(0,Math.floor(G.gy)));const p=bfs(sx,sy,tx,ty);if(!p){return false}G.path=p;G.after=after||null;return true}
/* ---- vẽ ---- */
function inv(sx,sy){const a=(sx-OX)/(TW/2),b=(sy-OY)/(TH/2);return[(a+b)/2,(b-a)/2]}
function drawRoom(k,t){const PV=window.__pv||{},F=FLOORS[PV.floor||ST.home.floor]||FLOORS.f0,Wl=WALLS[PV.wall||ST.home.wall]||WALLS.w0;k.clearRect(0,0,CW,CH);
 const top=P(0,0,0),r=P(N,0,0),l=P(0,N,0),b=P(N,N,0),up=z=>[0,-z];
 // tường trái (gx=0) và phải (gy=0)
 const wp=(A,B,fill,line)=>{poly(k,[A,B,[B[0],B[1]-WH],[A[0],A[1]-WH]],fill,false)};
 const gL=k.createLinearGradient(l[0],0,top[0],0);gL.addColorStop(0,mix(Wl[1],'#000000',.12));gL.addColorStop(1,mix(Wl[1],'#000000',.05));wp(l,top,gL);
 const gR=k.createLinearGradient(top[0],0,r[0],0);gR.addColorStop(0,Wl[0]);gR.addColorStop(1,mix(Wl[0],'#ffffff',.1));wp(top,r,gR);
 k.strokeStyle='rgba(60,40,20,.35)';k.lineWidth=2;k.beginPath();k.moveTo(l[0],l[1]-WH);k.lineTo(top[0],top[1]-WH);k.lineTo(r[0],r[1]-WH);k.moveTo(top[0],top[1]);k.lineTo(top[0],top[1]-WH);k.stroke();
 // ván chân tường
 poly(k,[l,top,[top[0],top[1]-14],[l[0],l[1]-14]],mix(Wl[1],'#000000',.25),false);poly(k,[top,r,[r[0],r[1]-14],[top[0],top[1]-14]],mix(Wl[0],'#000000',.2),false);
 // sàn
 for(let i=0;i<N;i++)for(let j=0;j<N;j++){poly(k,[P(i,j,0),P(i+1,j,0),P(i+1,j+1,0),P(i,j+1,0)],(i+j)%2?F[0]:F[1],false)}
 k.strokeStyle='rgba(80,50,20,.18)';k.lineWidth=1;for(let i=0;i<=N;i++){k.beginPath();k.moveTo(...P(i,0,0));k.lineTo(...P(i,N,0));k.moveTo(...P(0,i,0));k.lineTo(...P(N,i,0));k.stroke()}
 // độ dày sàn
 poly(k,[l,b,[b[0],b[1]+16],[l[0],l[1]+16]],mix(F[1],'#000000',.35),false);poly(k,[b,r,[r[0],r[1]+16],[b[0],b[1]+16]],mix(F[1],'#000000',.5),false);
 // đồ treo tường
 for(const o of items())if(o.it.k==='w'&&o.w)wallArt(k,o.it,o.w,o.u,o.z);
 // lưới đặt đồ
 const sel=hSel&&ITEM[hSel]&&ITEM[hSel].k==='f'?hSel:null;const dr=drag&&ITEM[drag.id].k==='f'?drag.id:null;const hl=sel||dr;
 if(hl&&G.hov){const[w,h]=fp(hl),gx=Math.round(G.hov[0]-w/2+.5-.5+ (w%2?0:0)),gy=Math.round(G.hov[1]-h/2);const gx2=Math.floor(G.hov[0]-w/2+.5),gy2=Math.floor(G.hov[1]-h/2+.5);const ok=fits(hl,gx2,gy2,drag?drag.i:-1);G.ghost=[gx2,gy2,ok];
  poly(k,[P(gx2,gy2,0),P(gx2+w,gy2,0),P(gx2+w,gy2+h,0),P(gx2,gy2+h,0)],ok?'rgba(80,200,120,.45)':'rgba(230,80,70,.45)',false)}
 // vật thể + nhân vật theo độ sâu
 const seated=G.on!=null&&G.pose!=='stand'?ST.home.placed[G.on]:null;DRAW._occ=!!seated;
 const L=floorItems().filter(o=>!(drag&&drag.i===o.i)).map(o=>({d:o.g[0]+fp(o.id)[0]+o.g[1]+fp(o.id)[1]-.01,o}));if(!seated)L.push({d:G.gx+G.gy+.35,hero:1});L.push({d:G.gx+G.gy+.9,pet:1});L.sort((a,b)=>a.d-b.d);
 for(const e of L){if(e.pet){const pp=P(G.gx-.85,G.gy+.35,0);if(window.drawPetAt)drawPetAt(k,pp[0],pp[1]-70+Math.sin(t/420)*5,1,50,null,true);continue}if(e.hero){const p=P(G.gx,G.gy,0);drawPerson(k,p[0],p[1],{hero:true,time:t,scale:1.2,view:G.view,moving:G.moving});continue}
  const o=e.o,f=DRAW[o.id];if(f)f(k,o.g[0],o.g[1],0);else{const p=P(o.g[0]+.5,o.g[1]+.5,20);k.font='60px serif';k.textAlign='center';k.fillText(o.it.e,p[0],p[1])}
  if(seated&&seated===ST.home.placed[o.i]){const[w,h]=fp(o.id),cx=o.g[0]+w/2,cy=o.g[1]+h/2;
   if(G.pose==='sit'){const p=P(cx,cy+(o.id==='chair'?.12:.3),o.id==='chair'?30:15);drawSL(k,p[0],p[1],o.id==='chair'?0:1)}
   else{const p=P(cx+.15,cy,36);k.save();k.translate(p[0],p[1]);k.rotate(Math.atan2(TH,TW));k.translate(-p[0],-p[1]);drawSL(k,p[0],p[1]+18,2);k.restore();
    const f2=Math.floor(t/600)%3;k.fillStyle='#3a5a8a';k.font='800 '+(20+f2*4)+'px system-ui,sans-serif';k.textAlign='left';const q=P(cx-1.1,cy-.2,95+f2*8);k.fillText('Z'.repeat(f2+1),q[0],q[1])}
   if(f)f(k,o.g[0],o.g[1],1)}}
 DRAW._occ=false;
 // món đang cầm (dời)
 if(drag&&G.hov&&G.ghost){}
 k.textAlign='center';k.textBaseline='middle';k.fillStyle='rgba(255,255,255,.92)';k.strokeStyle='rgba(20,60,50,.5)';k.lineWidth=4;k.font='700 17px system-ui,sans-serif';
 const msg=hSel?'Bấm vào sàn hoặc tường để đặt '+ITEM[hSel].e:drag?'Bấm vào chỗ mới để đặt '+ITEM[drag.id].e:hMode==='move'?'Bấm một món rồi bấm chỗ mới':hMode==='remove'?'Bấm vào món đồ để cất lại':G.pose!=='stand'?'Bấm vào sàn để đứng dậy':'Bấm ghế/giường để ngồi/nằm, bấm sàn để đi';k.strokeText(msg,CW/2,18);k.fillText(msg,CW/2,18)}
const SLI=window.drawSL;
window.drawHome=function(t){const c=$('hc');if(c)drawRoom(c.getContext('2d'),t||performance.now())};
function tick(t){const c=$('hc');if(!c||!$('ovm').classList.contains('on')){homeLoop=false;return}
 const dt=Math.min(.05,(t-(tick.l||t))/1000);tick.l=t;G.moving=false;
 if(G.path.length){const[tx,ty]=[G.path[0][0]+.5,G.path[0][1]+.5],dx=tx-G.gx,dy=ty-G.gy,d=Math.hypot(dx,dy),st=2.4*dt;
  if(d<=st){G.gx=tx;G.gy=ty;G.path.shift();if(!G.path.length){const f=G.after;G.after=null;if(f)f()}}else{G.gx+=dx/d*st;G.gy+=dy/d*st;G.moving=true;const sx=(dx-dy)*TW/2,sy=(dx+dy)*TH/2;G.view=Math.abs(sx)>Math.abs(sy)*1.3?(sx>0?1:3):(sy<0?2:0)}}
 drawRoom(c.getContext('2d'),t);requestAnimationFrame(tick)}
/* ---- hộp thoại và thao tác ---- */
function pointer(c,e){const r=c.getBoundingClientRect();return[(e.clientX-r.left)*CW/r.width,(e.clientY-r.top)*CH/r.height]}
function hitItem(sx,sy){let best=null,bd=-1;for(const o of items()){let box;if(o.it.k==='f'&&o.g){const[w,h]=fp(o.id),a=P(o.g[0],o.g[1]+h,0),b2=P(o.g[0]+w,o.g[1],0),tp=P(o.g[0],o.g[1],70);box=[a[0],tp[1]-10,b2[0],P(o.g[0]+w,o.g[1]+h,0)[1]]}
  else if(o.it.k==='w'&&o.w){const q=o.w==='L'?P(0,o.u,o.z):P(o.u,0,o.z);const s=o.it.s;box=[q[0]-s*.7,q[1]-s*1.4,q[0]+s*.7,q[1]+s*.4]}else continue;
  if(sx>=box[0]&&sx<=box[2]&&sy>=box[1]&&sy<=box[3]){const dd=o.g?o.g[0]+o.g[1]:-1;if(dd>bd){bd=dd;best=o}}}return best}
function wallAt(sx,sy){for(const side of['L','R']){const[u,z]=side==='L'?[(OX-sx)/(TW/2),OY+((OX-sx)/(TW/2))*TH/2-sy]:[(sx-OX)/(TW/2),OY+((sx-OX)/(TW/2))*TH/2-sy];if(u>.3&&u<N-.3&&z>20&&z<WH)return{w:side,u,z}}return null}
function bind(){const pm=$('pm');
 pm.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{hTab=b.dataset.tab;if(hTab!=='shop')window.__pv=null;hSel=null;drag=null;renderHome()});
 pm.querySelectorAll('[data-hm]').forEach(b=>b.onclick=()=>{hMode=b.dataset.hm;hSel=null;drag=null;renderHome()});
 pm.querySelectorAll('[data-put]').forEach(b=>b.onclick=()=>{hSel=hSel===b.dataset.put?null:b.dataset.put;hMode='walk';drag=null;renderHome()});
 pm.querySelectorAll('[data-wall]').forEach(b=>b.onclick=()=>{ST.home.wall=b.dataset.wall;saveState();renderHome()});
 pm.querySelectorAll('[data-try]').forEach(b=>b.onclick=()=>{const it=ITEM[b.dataset.try];window.__pv=Object.assign({},window.__pv,it.k==='wp'?{wall:it.id}:{floor:it.id});renderHome();const c=$('hc');if(c)c.scrollIntoView({block:'nearest'})});
 pm.querySelectorAll('[data-untry]').forEach(b=>b.onclick=()=>{window.__pv=null;renderHome()});
 pm.querySelectorAll('[data-floor]').forEach(b=>b.onclick=()=>{ST.home.floor=b.dataset.floor;saveState();renderHome()});
 pm.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const it=ITEM[b.dataset.buy];if(ST.coins<it.p){toast('Chưa đủ xu, làm thêm nhiệm vụ nhé!');return}ST.coins-=it.p;ST.inv[it.id]=(ST.inv[it.id]||0)+1;saveState();toast('Đã mua '+(it.e||'')+' '+it.n);renderHome()});
 const c=$('hc');if(c){c.onpointermove=e=>{const[sx,sy]=pointer(c,e);G.hov=inv(sx,sy)};c.onpointerleave=()=>{G.hov=null};
  c.onclick=e=>{const[sx,sy]=pointer(c,e),[gx,gy]=inv(sx,sy);G.hov=[gx,gy];
   const place=(id,w,hh,rem)=>{const it=ITEM[id];if(it.k==='f'){const[w2,h2]=fp(id),x=Math.floor(gx-w2/2+.5),y=Math.floor(gy-h2/2+.5);if(!fits(id,x,y,drag?drag.i:-1)){toast('Chỗ này không đặt được');return false}return{id,g:[x,y]}}
    const wa=wallAt(sx,sy);if(!wa){toast('Hãy bấm lên tường để treo');return false}return{id,w:wa.w,u:wa.u,z:wa.z}};
   if(hSel){const it=ITEM[hSel];if(ST.home.placed.length>=40){toast('Phòng đã đầy');return}const r=place(hSel);if(!r)return;ST.home.placed.push(r);ST.inv[hSel]--;if(ST.inv[hSel]<=0)hSel=null;resetHero();saveState();renderHome();return}
   if(drag){const r=place(drag.id);if(!r)return;ST.home.placed[drag.i]=r;drag=null;resetHero();saveState();renderHome();return}
   const o=hitItem(sx,sy);
   if(hMode==='remove'){if(o){ST.home.placed.splice(o.i,1);ST.inv[o.id]=(ST.inv[o.id]||0)+1;resetHero();saveState();renderHome();toast('Đã cất '+o.it.n)}return}
   if(hMode==='move'){if(o){drag={id:o.id,i:o.i};G.hov=[gx,gy];toast('Bấm vào chỗ mới');}return}
   if(o&&o.it.k==='f'&&o.g){const[w,h]=fp(o.id);const near=[];for(let a=-1;a<=w;a++)for(let b=-1;b<=h;b++){if(a>=0&&a<w&&b>=0&&b<h)continue;const x=o.g[0]+a,y=o.g[1]+b;if(x>=0&&y>=0&&x<N&&y<N&&!occ().has(x+','+y))near.push([x,y])}
    const kind=SITS.includes(o.id)?'sit':LIES.includes(o.id)?'lie':null;if(!kind){toast(o.it.n);return}
    near.sort((p,q)=>Math.hypot(p[0]-G.gx,p[1]-G.gy)-Math.hypot(q[0]-G.gx,q[1]-G.gy));
    for(const[x,y]of near){if(walkTile(x,y,()=>{G.pose=kind;G.on=o.i;G.view=kind==='sit'&&o.id==='sofa'?0:0}))return}
    toast('Không có đường đi tới đó');return}
   if(o){toast(o.it.n);return}
   const x=Math.floor(gx),y=Math.floor(gy);if(x>=0&&y>=0&&x<N&&y<N){if(!walkTile(x,y))toast('Chỗ này có đồ rồi')}}}
 const cl=$('cl');if(cl)cl.onclick=closeM}
window.renderHome=function(){const body=homeBody();
 modal(`<h2>Nhà của ${esc(ST.name||'bạn')} 🏠</h2><canvas id="hc" width="${CW}" height="${CH}" style="display:block;margin:0 auto;width:min(100%,calc(58vh*${CW/CH}));border-radius:18px;background:#fff0dc;touch-action:manipulation"></canvas>${hTab==='inv'?`<div class="seg"><button class="${hMode==='walk'&&!hSel?'on':''}" data-hm="walk">🚶 Đi, ngồi, nằm</button><button class="${hMode==='move'?'on':''}" data-hm="move">✋ Dời đồ</button><button class="${hMode==='remove'?'on':''}" data-hm="remove">🧹 Cất đồ</button></div>`:''}<div class="seg"><button class="${hTab==='inv'?'on':''}" data-tab="inv">🎒 Đồ của tôi</button><button class="${hTab==='shop'?'on':''}" data-tab="shop">🛍️ Cửa hàng</button></div>${body}<div class="row"><button class="btn" id="cl">Ra phố</button></div>`);
 $('pm').classList.add('wide');drawHome();bind();if(!homeLoop){homeLoop=true;requestAnimationFrame(tick)}};
window.openHome=function(tab){
 // chuyển nhà cũ (2D) sang nhà 3D: trả đồ cũ về kho
 let migrated=false;ST.home.placed=ST.home.placed.filter(p=>{if(p.g||p.w)return true;migrated=true;ST.inv[p.id]=(ST.inv[p.id]||0)+1;return false});
 if(!ST.s3d||migrated){ST.s3d=1;if(!ST.home.placed.length){const put=(id,g)=>{if(!ITEM[id])return;if((ST.inv[id]||0)>0)ST.inv[id]--;ST.home.placed.push({id,g})};put('bed',[0,0]);put('sofa',[4,0]);put('chair',[6,3]);put('plant',[0,5]);toast('Cô tặng bạn giường, sofa, ghế và chậu cây cho căn nhà 3D!')}saveState()}
 window.__pv=null;hTab=tab||'inv';hSel=null;hMode='walk';drag=null;G.gx=5.5;G.gy=5.5;G.view=0;resetHero();renderHome()};
window.__home3d={G,occ,fits};window.__iso={P,box,ball,cyl,poly,mix,C,DRAW,N,TW,TH,WH,CW,CH,OX,OY};
})();
