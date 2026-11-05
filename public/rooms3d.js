/* Nội thất 3D cho từng địa điểm */
(function(){
const{P,box,ball,cyl,poly,mix,C,DRAW,N,TW,TH,WH,CW,CH,OX,OY}=__iso;
const WOOD='#b9814f',DW='#8a5a34';
/* tường */
const wpt=(side,u,z)=>side==='L'?P(0,u,z):P(u,0,z);
function wrect(k,side,u0,u1,z0,z1,fill,line){poly(k,[wpt(side,u0,z0),wpt(side,u1,z0),wpt(side,u1,z1),wpt(side,u0,z1)],fill,line)}
function wtext(k,side,u,z,t,size,col){k.save();const o=wpt(side,u,z),len=Math.hypot(TW/2,TH/2);k.transform((TW/2)/len,(side==='L'?-1:1)*(TH/2)/len,0,1,o[0],o[1]);k.font=`800 ${size}px "Noto Serif CJK SC","Songti SC","SimSun",serif`;k.textAlign='center';k.textBaseline='middle';k.fillStyle=col||'#fff';k.fillText(t,0,0);k.restore()}
function wemoji(k,side,u,z,e,size){k.save();const o=wpt(side,u,z),len=Math.hypot(TW/2,TH/2);k.transform((TW/2)/len,(side==='L'?-1:1)*(TH/2)/len,0,1,o[0],o[1]);k.font=`${size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;k.textAlign='center';k.textBaseline='middle';k.fillText(e,0,0);k.restore()}
/* vật dụng */
const table=(k,x,y,w,d,col)=>{for(const[a,b]of[[.08,.08],[w-.18,.08],[.08,d-.18],[w-.18,d-.18]])box(k,x+a,y+b,0,.1,.1,26,DW);box(k,x,y,26,w,d,6,col||'#d9a96a')};
const stool=(k,x,y)=>{cyl(k,x+.5,y+.5,0,.2,18,'#c9653f')};
const counter=(k,x,y,w,d,col,top)=>{box(k,x,y,0,w,d,34,col||'#c98f55');box(k,x-.04,y-.04,34,w+.08,d+.08,5,top||'#f1e1c0')};
const shelf=(k,x,y,w,d,h,cols)=>{box(k,x,y,0,w,d,h,'#9a6a3e');const rows=Math.floor(h/32);for(let r=0;r<rows;r++){const n=Math.max(2,Math.round((w>d?w:d)*3));for(let i=0;i<n;i++){const c=cols[(i+r)%cols.length],t=.9/n;if(w>=d)box(k,x+.07+i*(w-.14)/n,y+d-.02,8+r*32,(w-.14)/n*.8,.06,24,c);else box(k,x+d-.02,y+.07+i*(w-.14)/n,8+r*32,.06,(d-.14)/n*.8,24,c)}}};
const rack=(k,x,y,w)=>{box(k,x,y,0,.08,.08,64,'#777');box(k,x+w-.08,y,0,.08,.08,64,'#777');box(k,x,y,60,w,.08,5,'#999');const cs=['#e8548c','#4a9ad8','#f2c14e','#7bc47f','#b88aff','#ff8a3d'];for(let i=0;i<5;i++)box(k,x+.14+i*(w-.3)/5,y-.03,16,.2,.14,44,cs[(i+Math.floor(x))%6])};
const bench=(k,x,y,w,col)=>{box(k,x,y,0,w,.8,16,col||'#4a8fd0');box(k,x,y,16,w,.22,30,mix(col||'#4a8fd0','#000',.15))};
const seat=(k,x,y,col)=>{box(k,x+.08,y+.1,0,.84,.8,20,col||'#c0392b');box(k,x+.08,y+.1,20,.84,.2,28,mix(col||'#c0392b','#000',.2))};
const tree=(k,x,y,s)=>{cyl(k,x,y,0,.12,34*s,'#8a6244');for(const[a,b,z,r]of[[0,0,70,26],[-.18,.05,56,20],[.18,-.05,58,20],[0,.1,46,17]])ball(k,x+a,y+b,z*s,r*s,'#5cb85c')};
const flat=(k,x,y,w,d,col)=>box(k,x,y,0,w,d,3,col);
const hbed=(k,x,y)=>{box(k,x,y,0,2.6,1.4,14,'#dfe7ea');box(k,x+.1,y+.1,14,2.4,1.2,10,'#fff');box(k,x+.15,y+.3,24,.5,.8,6,'#cfe6ff');box(k,x+1.1,y+.1,24,1.4,1.2,8,'#7ec8d8')};
const cabinet=(k,x,y,w)=>{box(k,x,y,0,w,.5,90,'#e9eef1');box(k,x+.05,y+.5,10,w-.1,.03,70,'#9fc4d4')};
const fruit=(k,x,y,w)=>{const cs=['#e8483f','#f2c14e','#7bc47f','#ff8a3d'];for(let i=0;i<5;i++)ball(k,x+.2+i*(w-.4)/4,y+.35,40,7,cs[i%4])};
const awning=(k,x,y,w)=>{for(let i=0;i<6;i++)box(k,x+i*w/6,y-.1,86,w/6,.9,6,i%2?'#fff':'#d9534f')};
const lamp=(k,x,y)=>{cyl(k,x,y,0,.07,44,'#777');ball(k,x,y,52,10,'#ffe28a')};
const bowl=(k,x,y)=>{cyl(k,x,y,26,.12,6,'#fff');ball(k,x,y,34,6,'#f2c14e')};
const ROOMS={
truong:{w:'#f6efe0',f:['#e8d4a8','#dcc596'],wall:(k)=>{wrect(k,'R',1.2,5.8,55,150,'#2f5d4a');wrect(k,'R',1.2,5.8,50,55,'#b98a5a');wtext(k,'R',3.5,110,'学 习 汉 语',34,'#f4f1e6');wemoji(k,'L',2,120,'🕰️',50);wemoji(k,'L',5,115,'🗺️',56)},
 obj:(k)=>[[1,3,()=>{table(k,1,2.6,1,.7);stool(k,1,3.5)}],[3,3,()=>{table(k,3,2.6,1,.7);stool(k,3,3.5)}],[5,3,()=>{table(k,5,2.6,1,.7);stool(k,5,3.5)}],[1,5,()=>{table(k,1,4.6,1,.7);stool(k,1,5.5)}],[3,5,()=>{table(k,3,4.6,1,.7);stool(k,3,5.5)}],[5,5,()=>{table(k,5,4.6,1,.7);stool(k,5,5.5)}],[3,.7,()=>table(k,2.6,.5,1.6,.8,'#c98f55')]],npc:[3.4,1.9]},
thuvien:{w:'#eee6f7',f:['#d8c7a0','#cdb98a'],wall:(k)=>{wemoji(k,'L',3.5,120,'📚',60);wemoji(k,'R',4.5,125,'🖼️',50)},
 obj:(k)=>[[0,0,()=>shelf(k,.6,.05,1.7,.5,130,['#d9534f','#4a8fd0','#e9a23b','#7bc47f','#9b6bd0'])],[0,0,()=>shelf(k,2.5,.05,1.7,.5,130,['#4a8fd0','#e9a23b','#d9534f','#7bc47f'])],[0,0,()=>shelf(k,4.4,.05,1.7,.5,130,['#9b6bd0','#d9534f','#4a8fd0','#e9a23b'])],[0,3,()=>shelf(k,.05,1.4,.5,2.2,100,['#e9a23b','#4a8fd0','#7bc47f','#d9534f'])],[3,3,()=>{table(k,3,3,2,1.2);stool(k,3,4.4);stool(k,4.5,4.4);box(k,3.6,3.4,32,.5,.4,5,'#d9534f')}],[5,5,()=>DRAW.plant(k,5.5,5.2)]],npc:[2.4,2.3]},
rap:{w:'#3b2a5a',f:['#7a2a3a','#6a2230'],wall:(k)=>{wrect(k,'R',.8,6.2,45,165,'#e8f0f8');wtext(k,'R',3.5,105,'电影院',40,'#c0392b');wemoji(k,'L',3.5,120,'🎬',56)},
 obj:(k)=>{const a=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)a.push([1+c*1.2,2.4+r*1.2,()=>seat(k,1+c*1.2,2.4+r*1.2)]);a.push([5.4,5.4,()=>{counter(k,5,5.2,1.6,.8,'#d9534f');ball(k,5.5,5.6,48,8,'#fff3b0');ball(k,5.9,5.6,48,8,'#fff3b0')}]);return a},npc:[5.9,4.6]},
congvien:{w:'#bfe6ff',f:['#9fd88a','#8fcb7a'],wall:(k)=>{wemoji(k,'L',3,110,'☁️',70);wemoji(k,'R',4,120,'☀️',60)},
 obj:(k)=>[[1,1,()=>tree(k,1.2,1,1.1)],[5.6,1.2,()=>tree(k,5.8,1,1)],[.8,5,()=>tree(k,1,5.8,.9)],[3,4,()=>{cyl(k,3.5,3.6,0,1.1,3,'#8fd8e0')}],[5,4,()=>bench(k,4.6,4.6,1.8,'#c98f55')],[1,3,()=>{for(const[a,b,c]of[[.5,.5,'#ff7a9a'],[1,.3,'#ffd34d'],[.3,1,'#b88aff'],[.9,.9,'#ff7a9a']])ball(k,1+a,3+b,6,7,c)}]],npc:[2.6,2.8]},
nganhang:{w:'#e6eef8',f:['#b8c8d8','#a8b8c8'],wall:(k)=>{wtext(k,'R',3.5,125,'银行',44,'#2c5aa0');wemoji(k,'L',3,115,'💰',56);wemoji(k,'R',1.4,100,'🏧',50)},
 obj:(k)=>[[1,1,()=>{counter(k,1,1.4,4.6,.9,'#8fb0d0','#f1f4f8');box(k,1,1.4,39,4.6,.06,50,'#bfe9f5',.45)}],[5,4,()=>DRAW.sofa(k,4.6,4.8,0)],[1,5,()=>DRAW.plant(k,1.4,5.2)],[3,4.8,()=>table(k,2.6,4.4,1.2,.8,'#d8e0e8')]],npc:[3.2,2.8]},
benhvien:{w:'#f4fbfb',f:['#d4ece6','#c4e0da'],wall:(k)=>{wrect(k,'R',3.1,3.9,90,150,'#d9534f',false);wrect(k,'R',2.7,4.3,108,132,'#d9534f',false);wrect(k,'R',3.1,3.9,92,148,'#e8483f');wrect(k,'R',2.7,4.3,108,132,'#e8483f');wtext(k,'R',5.5,110,'医院',34,'#2c8aa0')},
 obj:(k)=>[[0,0,()=>hbed(k,.6,.7)],[0,0,()=>hbed(k,.6,2.6)],[4,0,()=>cabinet(k,4.8,.1,1.8)],[4,4,()=>{table(k,4.2,3.8,1.6,.9,'#e6eef0');box(k,4.7,4,32,.5,.4,5,'#4a9ad8')}],[5,5,()=>DRAW.chair(k,5.2,5)]],npc:[3.4,4.6]},
khachsan:{w:'#f5e6d0',f:['#8a2a2a','#7a2222'],wall:(k)=>{wemoji(k,'R',3.5,125,'🛎️',54);wemoji(k,'L',3.5,120,'🖼️',56)},
 obj:(k)=>[[1,1,()=>{counter(k,1.2,.9,3,.8,'#6a4a2a','#d9a96a')}],[4,4,()=>DRAW.sofa(k,4,4.6,0)],[1,4,()=>DRAW.sofa(k,.8,4.6,0)],[5,2,()=>{box(k,5.3,2,0,.6,.4,36,'#8a5a34');box(k,5.4,2.7,0,.5,.3,28,'#b85a3a')}],[6,5,()=>DRAW.plant(k,6.2,3.5)]],npc:[2.6,2.5]},
cho:{w:'#fff0d6',f:['#e8d8b8','#dccaa4'],wall:(k)=>{wtext(k,'R',3.5,130,'市场',44,'#c0392b');wemoji(k,'L',3.5,120,'🧺',60)},
 obj:(k)=>[[0,0,()=>{counter(k,.6,.6,1.8,.9,'#c98f55');fruit(k,.6,.6,1.8);awning(k,.6,.6,1.8)}],[0,0,()=>{counter(k,2.6,.6,1.8,.9,'#c98f55');fruit(k,2.6,.6,1.8);awning(k,2.6,.6,1.8)}],[0,0,()=>{counter(k,4.6,.6,1.8,.9,'#c98f55');fruit(k,4.6,.6,1.8);awning(k,4.6,.6,1.8)}],[1,4,()=>{box(k,1,4.2,0,.9,.9,24,'#c98f55');ball(k,1.45,4.65,32,9,'#e8483f')}],[3,5,()=>{box(k,3.2,4.6,0,.9,.9,24,'#c98f55');ball(k,3.65,5.05,32,9,'#f2c14e')}],[5,4,()=>{box(k,5.2,4.2,0,.9,.9,24,'#c98f55');ball(k,5.65,4.65,32,9,'#7bc47f')}]],npc:[3.3,3]},
quan:{w:'#ffe9d6',f:['#c99a66','#b98a56'],wall:(k)=>{wemoji(k,'L',2.5,120,'🏮',54);wemoji(k,'L',4.8,120,'🏮',54);wtext(k,'R',3.5,125,'餐厅',44,'#c0392b')},
 obj:(k)=>[[1,1,()=>counter(k,1,.9,4.2,.9,'#8a5a34','#e9d1a8')],[1,3,()=>{table(k,1,3,1.4,1);stool(k,.8,4.1);stool(k,2,4.1);bowl(k,1.5,3.5)}],[4,3,()=>{table(k,4,3,1.4,1);stool(k,3.8,4.1);stool(k,5,4.1);bowl(k,4.5,3.5)}],[2,5,()=>{table(k,2.5,5,1.4,1);stool(k,2.3,6.1);stool(k,3.5,6.1);bowl(k,3,5.5)}],[6,5,()=>lamp(k,6.3,5.6)]],npc:[5.5,1.9]},
cuahang:{w:'#fde4ee',f:['#f3d9e4','#ead0dc'],wall:(k)=>{wrect(k,'R',1,3.2,40,140,'#cfe9f5');wemoji(k,'R',2.1,100,'🪞',60);wtext(k,'L',3.5,125,'商店',44,'#c2457f')},
 obj:(k)=>[[1,1,()=>rack(k,3.8,.4,1.4)],[1,1,()=>rack(k,5.2,.4,1.4)],[0,3,()=>rack(k,.3,2,1.4)],[2,3,()=>{box(k,2.2,2.8,0,1.4,1,30,'#f1c0d4');box(k,2.3,2.9,30,.4,.4,20,'#e8548c');ball(k,3.3,3.3,40,9,'#ffd34d')}],[4,4,()=>counter(k,3.8,4.6,2,.9,'#e8548c','#fff')]],npc:[2.2,4.8]},
ga:{w:'#e8e3f8',f:['#cfd0dc','#c2c3d0'],wall:(k)=>{wemoji(k,'R',3.5,130,'🕰️',70);wtext(k,'L',3.5,125,'火车站',40,'#4b3fa8');wemoji(k,'R',5.4,100,'🚆',50)},
 obj:(k)=>[[1,3,()=>bench(k,1,3,2.4,'#6a5fd6')],[4,3,()=>bench(k,4,3,2.4,'#6a5fd6')],[1,5,()=>bench(k,1,5.2,2.4,'#6a5fd6')],[1,1,()=>counter(k,1.4,.7,2.6,.8,'#7b6fd6','#f1ecff')],[6,5,()=>{box(k,5.8,5.6,0,.8,.5,30,'#555');box(k,5.9,5.62,30,.6,.4,22,'#7b6fd6')}]],npc:[2.7,2.2]},
sanbay:{w:'#dff2f8',f:['#d0e2ea','#c4d8e2'],wall:(k)=>{wrect(k,'R',.8,6.2,45,160,'#bfe9f5');wemoji(k,'R',3.5,110,'✈️',70);wtext(k,'L',3.5,125,'机场',40,'#2c8aa0')},
 obj:(k)=>[[1,3,()=>bench(k,1,3.2,2.4,'#35a7a0')],[4,3,()=>bench(k,4,3.2,2.4,'#35a7a0')],[1,1,()=>counter(k,1,1.1,2.4,.8,'#35a7a0','#eafaf8')],[4,1,()=>counter(k,3.9,1.1,2.4,.8,'#35a7a0','#eafaf8')],[5,5,()=>{box(k,5.2,5,0,.8,.5,40,'#d9534f');box(k,6,5.2,0,.7,.5,30,'#4a8fd0')}]],npc:[2.6,2.6]},
home:{w:'#fdeccf',f:['#e7cfae','#dcbf98'],wall:(k)=>{wemoji(k,'L',3,115,'🖼️',56);wemoji(k,'R',3,120,'🪟',60)},
 obj:(k)=>[[0,0,()=>DRAW.bed(k,.2,3.8,0)],[4,0,()=>DRAW.sofa(k,4,.4,0)],[4,2,()=>DRAW.tv(k,4,2.2)],[1,0,()=>DRAW.plant(k,.3,.6)],[3,4,()=>table(k,3,3.6,1.2,.9,'#d9a96a')]],npc:[3,4.6]}};
const BLK={"truong": [[1, 2, 1, 3], [3, 2, 3, 3], [5, 2, 5, 3], [1, 4, 1, 5], [3, 4, 3, 5], [5, 4, 5, 5], [2, 0, 3, 0]], "thuvien": [[0, 0, 5, 0], [0, 1, 0, 3], [3, 3, 4, 4], [5, 5, 5, 5]], "rap": [[1, 2, 5, 5], [5, 5, 6, 5]], "congvien": [[1, 1, 1, 1], [5, 1, 5, 1], [1, 5, 1, 5], [3, 3, 3, 4], [4, 4, 5, 4]], "nganhang": [[1, 1, 5, 2], [4, 4, 6, 5], [1, 5, 1, 5], [2, 4, 3, 5]], "benhvien": [[0, 0, 3, 1], [0, 2, 3, 3], [4, 0, 6, 0], [4, 3, 5, 4], [5, 5, 5, 5]], "khachsan": [[1, 0, 4, 1], [4, 4, 5, 5], [0, 4, 2, 5], [5, 2, 5, 2], [6, 3, 6, 3]], "cho": [[0, 0, 2, 1], [2, 0, 4, 1], [4, 0, 6, 1], [1, 4, 1, 4], [3, 4, 3, 4], [5, 4, 5, 4]], "quan": [[1, 0, 5, 1], [0, 3, 2, 4], [3, 3, 5, 4], [2, 5, 4, 6], [6, 5, 6, 5]], "cuahang": [[3, 0, 6, 0], [0, 2, 1, 2], [2, 2, 3, 3], [3, 4, 5, 5]], "ga": [[1, 3, 3, 3], [4, 3, 6, 3], [1, 5, 3, 5], [1, 0, 3, 1], [5, 5, 6, 6]], "sanbay": [[1, 3, 3, 3], [4, 3, 6, 3], [1, 1, 3, 1], [3, 1, 6, 1], [5, 5, 6, 5]], "home": [[0, 3, 3, 5], [4, 0, 5, 1], [4, 2, 5, 2], [0, 0, 0, 0], [3, 3, 4, 4]]};
window.enterRoom=function(p){const spec=ROOMS[p.id]||ROOMS.home,id=p.id,named=window.PLACES&&PLACES.find(x=>x.id===id);
 const npcName=(window.roomNames&&roomNames[id==='home'?(String(p.name).includes('林')?9:10):(window.staff?staff[id]:10)])||'';
 modal(`<h2>${esc(p.name)} · ${p.zh||'欢迎'}</h2><canvas id="room3" width="${CW}" height="${CH-60}" style="display:block;margin:0 auto;width:min(100%,calc(52vh*${CW/(CH-60)}));border-radius:18px;background:#fff0dc"></canvas><p style="margin:4px 0"><b>${esc(npcName)}</b></p><p class="sub">${p.words?'Nhiệm vụ: '+esc(modeTitle()):'Mời bạn nghỉ chân và trò chuyện. 你好！Nǐ hǎo — Xin chào!'}</p><div class="row">${p.words?'<button class="btn gold" id="learn">📘 Bắt đầu nhiệm vụ</button>':''}${p.words?'<button class="btn" id="talk2">💬 Trò chuyện</button>':''}${id==='cuahang'?'<button class="btn" id="shopb">🛍️ Mua đồ trang trí</button>':''}<button class="btn" id="leave">Ra phố</button></div>`);
 $('pm').classList.add('wide');$('leave').onclick=closeM;if($('shopb'))$('shopb').onclick=()=>openHome('shop');if(p.words)$('learn').onclick=()=>{closeM();openBoard(p)};if($('talk2'))$('talk2').onclick=()=>{closeM();openNpc(p)};
 const c=$('room3'),k=c.getContext('2d');const blocked=new Set();for(const r of (BLK[id]||BLK.home))for(let a=r[0];a<=r[2];a++)for(let b=r[1];b<=r[3];b++)blocked.add(a+','+b);blocked.add(Math.floor(spec.npc[0])+','+Math.floor(spec.npc[1]));
 let st0=[5,5],bd=99;for(let a=0;a<N;a++)for(let b=0;b<N;b++){if(blocked.has(a+','+b))continue;const d=Math.hypot(a-5,b-5);if(d<bd){bd=d;st0=[a,b]}}
 const H={gx:st0[0]+.5,gy:st0[1]+.5,view:2,path:[],moving:false},PT={gx:H.gx-.8,gy:H.gy+.4};let last=0;
 const bfs=(sx,sy,tx,ty)=>{const key=(x,y)=>x+','+y,q=[[sx,sy]],pv={[key(sx,sy)]:null};while(q.length){const[x,y]=q.shift();if(x===tx&&y===ty)break;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=N||ny>=N||pv[key(nx,ny)]!==undefined||blocked.has(key(nx,ny)))continue;pv[key(nx,ny)]=[x,y];q.push([nx,ny])}}if(pv[key(tx,ty)]===undefined)return null;const pa=[];let cc=[tx,ty];while(cc){pa.unshift(cc);cc=pv[key(cc[0],cc[1])]}pa.shift();return pa};
 c.onclick=e=>{const r=c.getBoundingClientRect(),sx=(e.clientX-r.left)*CW/r.width,sy=(e.clientY-r.top)*(CH-60)/r.height+50;const nq=P(spec.npc[0],spec.npc[1],0);
  if(Math.abs(sx-nq[0])<42&&sy>nq[1]-110&&sy<nq[1]+10){closeM();if(p.words)openNpc(p);else toast('你好！Nǐ hǎo!');return}
  const a=(sx-OX)/(TW/2),b=(sy-OY)/(TH/2),gx=Math.floor((a+b)/2),gy=Math.floor((b-a)/2);if(gx<0||gy<0||gx>=N||gy>=N)return;
  const pa=bfs(Math.floor(H.gx),Math.floor(H.gy),gx,gy);if(!pa)return;H.path=pa};
 const draw=t=>{const dt=Math.min(.05,(t-(last||t))/1000);last=t;H.moving=false;
  if(H.path.length){const tx=H.path[0][0]+.5,ty=H.path[0][1]+.5,dx=tx-H.gx,dy=ty-H.gy,d=Math.hypot(dx,dy),sp=2.6*dt;if(d<=sp){H.gx=tx;H.gy=ty;H.path.shift()}else{H.gx+=dx/d*sp;H.gy+=dy/d*sp;H.moving=true;const sx2=(dx-dy)*TW/2,sy2=(dx+dy)*TH/2;H.view=Math.abs(sx2)>Math.abs(sy2)*1.3?(sx2>0?1:3):(sy2<0?2:0)}}
  const tg=[H.gx-.85,H.gy+.35];PT.gx+=(tg[0]-PT.gx)*Math.min(1,dt*3);PT.gy+=(tg[1]-PT.gy)*Math.min(1,dt*3);
  if(!$('room3')||!$('ovm').classList.contains('on'))return;k.clearRect(0,0,CW,CH);k.save();k.translate(0,-50);
  const Wc=spec.w,F=spec.f,top=P(0,0,0),r=P(N,0,0),l=P(0,N,0),b=P(N,N,0);
  poly(k,[l,top,[top[0],top[1]-WH],[l[0],l[1]-WH]],mix(Wc,'#000',.1),false);poly(k,[top,r,[r[0],r[1]-WH],[top[0],top[1]-WH]],Wc,false);
  k.strokeStyle='rgba(60,40,20,.35)';k.lineWidth=2;k.beginPath();k.moveTo(l[0],l[1]-WH);k.lineTo(top[0],top[1]-WH);k.lineTo(r[0],r[1]-WH);k.moveTo(top[0],top[1]);k.lineTo(top[0],top[1]-WH);k.stroke();
  poly(k,[l,top,[top[0],top[1]-12],[l[0],l[1]-12]],mix(Wc,'#000',.28),false);poly(k,[top,r,[r[0],r[1]-12],[top[0],top[1]-12]],mix(Wc,'#000',.22),false);
  for(let i=0;i<N;i++)for(let j=0;j<N;j++)poly(k,[P(i,j,0),P(i+1,j,0),P(i+1,j+1,0),P(i,j+1,0)],(i+j)%2?F[0]:F[1],false);
  poly(k,[l,b,[b[0],b[1]+14],[l[0],l[1]+14]],mix(F[1],'#000',.35),false);poly(k,[b,r,[r[0],r[1]+14],[b[0],b[1]+14]],mix(F[1],'#000',.5),false);
  spec.wall(k);
  const list=spec.obj(k).map(o=>({d:o[0]+o[1],f:o[2]}));
  const nx=spec.npc[0],ny=spec.npc[1];list.push({d:nx+ny+.3,f:()=>{const q=P(nx,ny,0);drawPerson(k,q[0],q[1],{variant:window.npcVar?npcVar(p):0,scale:1.2,view:0,time:t,moving:false})}});
  list.push({d:H.gx+H.gy+.35,f:()=>{const q=P(H.gx,H.gy,0);drawPerson(k,q[0],q[1],{hero:true,time:t,scale:1.2,view:H.view,moving:H.moving})}});list.push({d:PT.gx+PT.gy+.5,f:()=>{const w=P(PT.gx,PT.gy,0);if(window.drawPetAt)drawPetAt(k,w[0],w[1]-Math.abs(Math.sin(t/380))*4,1,64)}});
  list.sort((a,b)=>a.d-b.d);for(const o of list)o.f();k.restore();requestAnimationFrame(draw)};requestAnimationFrame(draw)};
})();
