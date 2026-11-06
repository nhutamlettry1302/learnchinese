/* Nhà ăn Cá Voi 餐厅 — màn hình riêng 2D giống trang chủ thành phố, nhiều khu */
(function(){
const WW=1400,WH=1000,CELL=25;

const QB={"order": {"t": "Gọi món · 点菜", "w": [["菜单", "càidān", "thực đơn"], ["点菜", "diǎncài", "gọi món"], ["米饭", "mǐfàn", "cơm"], ["面条", "miàntiáo", "mì sợi"], ["饺子", "jiǎozi", "sủi cảo"], ["服务员", "fúwùyuán", "nhân viên phục vụ"]]}, "bill": {"t": "Thanh toán · 买单", "w": [["买单", "mǎidān", "thanh toán"], ["多少钱", "duōshao qián", "bao nhiêu tiền"], ["现金", "xiànjīn", "tiền mặt"], ["银行卡", "yínhángkǎ", "thẻ ngân hàng"], ["一共", "yígòng", "tổng cộng"], ["找钱", "zhǎo qián", "trả tiền thừa"]]}, "dining": {"t": "Đồ dùng bàn ăn · 餐具", "w": [["碗", "wǎn", "bát"], ["筷子", "kuàizi", "đũa"], ["勺子", "sháozi", "thìa"], ["盘子", "pánzi", "đĩa"], ["桌子", "zhuōzi", "bàn"], ["椅子", "yǐzi", "ghế"]]}, "cook": {"t": "Bếp mở · 厨房", "w": [["厨师", "chúshī", "đầu bếp"], ["厨房", "chúfáng", "nhà bếp"], ["洗菜", "xǐ cài", "rửa rau"], ["切菜", "qiē cài", "thái rau"], ["煮", "zhǔ", "luộc, nấu"], ["蒸", "zhēng", "hấp"]]}, "drink": {"t": "Đồ uống và món ngọt · 饮料和甜点", "w": [["茶", "chá", "trà"], ["水", "shuǐ", "nước"], ["牛奶", "niúnǎi", "sữa"], ["果汁", "guǒzhī", "nước ép trái cây"], ["蛋糕", "dàngāo", "bánh ngọt"], ["冰淇淋", "bīngqílín", "kem"]]}, "polite": {"t": "Lời nói lịch sự · 礼貌用语", "w": [["请坐", "qǐng zuò", "mời ngồi"], ["请稍等", "qǐng shāo děng", "xin đợi một chút"], ["谢谢", "xièxie", "cảm ơn"], ["不客气", "bú kèqi", "không có gì"], ["两位", "liǎng wèi", "hai người (lịch sự)"], ["好吃", "hǎochī", "ngon"]]}, "chat": {"t": "Góc sân vườn · 庭院", "w": [["花", "huā", "hoa"], ["树", "shù", "cây"], ["安静", "ānjìng", "yên tĩnh"], ["休息", "xiūxi", "nghỉ ngơi"], ["一起", "yìqǐ", "cùng nhau"], ["聊天", "liáotiān", "trò chuyện"]]}};
const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
function quiz(act){const b=QB[act];const qs=sh(b.w).slice(0,5);let i=0,ok=0;
 const back=()=>{closeM()};
 const show=()=>{if(i>=qs.length)return end();const q=qs[i],zh2vi=i%2===0,opts=sh([q,...sh(b.w.filter(x=>x!==q)).slice(0,2)]);
  modal(`<h2>${b.t}</h2><p class="sub">Câu ${i+1}/${qs.length}</p><div style="text-align:center;margin:10px 0"><div style="font-size:34px;font-weight:800">${zh2vi?q[0]:esc(q[2])}</div><div class="sub">${zh2vi?q[1]:''}</div><button class="btn" id="spk">🔊 Nghe</button></div><div class="row" style="flex-direction:column;gap:8px">${opts.map((o,j)=>`<button class="btn" data-j="${j}">${zh2vi?esc(o[2]):o[0]+'  '+o[1]}</button>`).join('')}</div><div class="row"><button class="btn" id="bk">← Về nhà ăn</button></div>`);
  $('pm').classList.remove('wide');
  $('spk').onclick=()=>{try{rwSay(q[0])}catch(e){}};try{rwSay(q[0])}catch(e){}
  $('bk').onclick=back;
  document.querySelectorAll('[data-j]').forEach(bt=>bt.onclick=()=>{const good=opts[+bt.dataset.j]===q;if(good){ok++;bt.style.background='#bff0c8'}else{bt.style.background='#ffc9c9'}document.querySelectorAll('[data-j]').forEach(x=>x.disabled=true);setTimeout(()=>{i++;show()},700)})};
 const end=()=>{const day=new Date().toISOString().slice(0,10);ST.restaurant=ST.restaurant&&ST.restaurant.d===day?ST.restaurant:{d:day,a:{}};let msg='';
  if(!ST.restaurant.a[act]){ST.restaurant.a[act]=1;const gc=ok*4,gx=ok*3;ST.coins+=gc;ST.exp+=gx;msg=`Nhận +${gc} 🪙 và +${gx} EXP (lần đầu hôm nay)`;
   if(Object.keys(ST.restaurant.a).length>=7&&!ST.restaurant.bonus){ST.restaurant.bonus=1;ST.tickets=(ST.tickets||0)+1;msg+='<br>🎟️ Hoàn thành cả 7 hoạt động nhà ăn hôm nay: +1 vé quay!'}}
  else msg='Hôm nay bạn đã nhận thưởng hoạt động này rồi, vẫn luyện tập thoải mái nhé!';
  saveState();if(window.__restaurantCoin)window.__restaurantCoin();const done=Object.keys(ST.restaurant.a).length;
  modal(`<h2>${b.t}</h2><div style="text-align:center;margin:12px 0"><div style="font-size:38px">${ok>=4?'🌟':ok>=2?'👍':'💪'}</div><p><b>Đúng ${ok}/${qs.length}</b></p><p class="sub">${msg}</p><p class="sub">Hoạt động nhà ăn hôm nay: ${done}/7 🌳</p></div><div class="row"><button class="btn gold" id="bk">← Về nhà ăn</button></div>`);$('bk').onclick=back}
 show()}

const ZONES=[{"k": "A", "ic": "🧾", "vi": "Quầy gọi món", "zh": "点餐台", "py": "diǎncān tái", "cx": 300, "cy": 300, "acts": ["order", "bill"], "ds": "Gọi món, xem thực đơn và luyện tính tiền."}, {"k": "B", "ic": "🍜", "vi": "Khu bàn ăn", "zh": "用餐区", "py": "yòngcān qū", "cx": 700, "cy": 300, "acts": ["dining"], "ds": "Bàn tròn, ghế gỗ và từ vựng đồ dùng bàn ăn."}, {"k": "C", "ic": "👨‍🍳", "vi": "Bếp mở", "zh": "开放式厨房", "py": "kāifàngshì chúfáng", "cx": 1100, "cy": 300, "acts": ["cook"], "ds": "Gặp đầu bếp, học tên dụng cụ và cách chế biến."}, {"k": "D", "ic": "🫖", "vi": "Trà & tráng miệng", "zh": "茶饮与甜点", "py": "cháyǐn yǔ tiándiǎn", "cx": 300, "cy": 620, "acts": ["drink"], "ds": "Trà, nước ép và món ngọt sau bữa ăn."}, {"k": "E", "ic": "🏮", "vi": "Phòng riêng", "zh": "包间", "py": "bāojiān", "cx": 700, "cy": 620, "acts": ["polite"], "ds": "Bàn lớn để cùng dùng bữa và luyện câu nói lịch sự."}, {"k": "F", "ic": "🌿", "vi": "Sân vườn", "zh": "庭院", "py": "tíngyuàn", "cx": 1100, "cy": 620, "acts": ["chat"], "ds": "Góc bàn ăn ngoài trời, nghỉ chân và trò chuyện."}];
ZONES.forEach(z=>{z.x=z.cx-160;z.y=z.cy-135;z.w=320;z.h=210;z.ey=z.cy<400?410:730});
const ACTN=Object.fromEntries(Object.entries(QB).map(([id,q])=>[id,'📘 '+q.t]));
/* đường đi (hình chữ nhật đi được) */
const PATHS=[[85,85,1315,135],[85,385,1315,435],[85,705,1315,755],[75,85,125,900],[475,85,525,900],[875,85,925,900],[1275,85,1325,900],[675,705,725,905]];
const cols=WW/CELL,rows=WH/CELL;const walk=[];for(let r=0;r<rows;r++){walk.push([]);for(let c=0;c<cols;c++){const x=c*CELL+CELL/2,y=r*CELL+CELL/2;walk[r].push(PATHS.some(p=>x>=p[0]&&x<=p[2]&&y>=p[1]&&y<=p[3]))}}
const free=(c,r)=>r>=0&&c>=0&&r<rows&&c<cols&&walk[r][c];
function bfs(sx,sy,tx,ty){const sc=Math.floor(sx/CELL),sr=Math.floor(sy/CELL),tc=Math.floor(tx/CELL),tr=Math.floor(ty/CELL);const key=(c,r)=>r*cols+c;const pv=new Map([[key(sc,sr),null]]);const q=[[sc,sr]];let h=0;while(h<q.length){const[c,r]=q[h++];if(c===tc&&r===tr)break;for(const[dc,dr]of[[1,0],[-1,0],[0,1],[0,-1]]){const nc=c+dc,nr=r+dr;if(!free(nc,nr)||pv.has(key(nc,nr)))continue;pv.set(key(nc,nr),[c,r]);q.push([nc,nr])}}if(!pv.has(key(tc,tr)))return null;const pa=[];let cur=[tc,tr];while(cur){pa.unshift([cur[0]*CELL+CELL/2,cur[1]*CELL+CELL/2]);cur=pv.get(key(cur[0],cur[1]))}pa.shift();return pa}
function snap(x,y){const c0=Math.floor(x/CELL),r0=Math.floor(y/CELL);let best=null,bd=1e9;for(let dr=-4;dr<=4;dr++)for(let dc=-4;dc<=4;dc++){if(!free(c0+dc,r0+dr))continue;const d=dc*dc+dr*dr;if(d<bd){bd=d;best=[(c0+dc)*CELL+CELL/2,(r0+dr)*CELL+CELL/2]}}return best}
const hash=(a,b)=>{let h=(a*73856093)^(b*19349663);h=(h^(h>>>13))*1274126177;return((h^(h>>>16))>>>0)/4294967295};
function seasonC(){let s='xuan';try{s=window.curSeason?curSeason():'xuan'}catch(e){}return({xuan:{g:'#9fd88a',g2:'#8fcb7a',tr:'#5cb85c',ch:'#ffb3cf',sn:0},ha:{g:'#8fd070',g2:'#82c464',tr:'#3f9a4a',ch:'#4fae5e',sn:0},thu:{g:'#d6c27a',g2:'#cbb46a',tr:'#c9a23a',ch:'#f08a3c',sn:0},dong:{g:'#e8f2ee',g2:'#dce9e3',tr:'#7fb494',ch:'#ffffff',sn:1}})[s]||{}}
const pill=(k,x,y,t,fs)=>{k.font=`700 ${fs||14}px "Noto Sans","Segoe UI",sans-serif`;const w=k.measureText(t).width+22,h=(fs||14)+12;rr(k,x-w/2,y-h/2,w,h,h/2);k.fillStyle='#fff';k.fill();k.lineWidth=3;k.strokeStyle='#1d4a3a';k.stroke();k.textAlign='center';k.textBaseline='middle';k.fillStyle='#1d3a2f';k.fillText(t,x,y+1)};
const emo=(k,s,x,y,sz)=>{k.font=`${sz}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;k.textAlign='center';k.textBaseline='middle';k.fillStyle='#000';k.fillText(s,x,y)};
const ell=(k,x,y,rx,ry,c)=>{k.fillStyle=c;k.beginPath();k.ellipse(x,y,rx,ry,0,0,7);k.fill()};
const blob=(k,x,y,r,c,sn)=>{k.fillStyle='rgba(0,0,0,.14)';k.beginPath();k.ellipse(x,y+r*.9,r*1.1,r*.35,0,0,7);k.fill();k.fillStyle='#7a5636';k.fillRect(x-3,y+r*.3,6,r*.7);for(const[a,b,c2]of[[0,-r*.15,r],[-r*.7,r*.2,r*.7],[r*.7,r*.2,r*.7]]){k.fillStyle=c;k.beginPath();k.arc(x+a,y+b,c2,0,7);k.fill()}if(sn){k.fillStyle='rgba(255,255,255,.9)';k.beginPath();k.arc(x,y-r*.55,r*.55,Math.PI,0);k.fill()}};
const roomArt=new Image();roomArt.src='img/restaurant-zones.png';
const staffArt=new Image();staffArt.src='img/restaurant-staff.png';
const landmarkRects={"A": [33, 28, 445, 460], "B": [538, 86, 456, 372], "C": [1041, 82, 475, 399], "D": [23, 577, 469, 428], "E": [530, 567, 476, 421], "F": [1043, 568, 472, 419]};
function drawBlock(k,z,sc,t,st){
 const crop=landmarkRects[z.k];
 ell(k,z.cx,z.cy+51,140,30,'rgba(128,80,45,.10)');
 if(roomArt.complete&&roomArt.naturalWidth){const r=Math.min(318/crop[2],195/crop[3]);k.drawImage(roomArt,...crop,z.cx-crop[2]*r/2,z.cy+70-crop[3]*r,crop[2]*r,crop[3]*r)}
 else{rr(k,z.x,z.y,320,210,20);k.fillStyle='#f1d7ab';k.fill()}
 if(z.k==='C')for(let i=0;i<5;i++){const u=(t/1900+i/5)%1;k.globalAlpha=(1-u)*.3;ell(k,z.cx-14+u*17,z.cy-28-u*42,5+u*7,4+u*6,'#fff');k.globalAlpha=1}
 const state=st.restaurant,done=state&&state.d===new Date().toISOString().slice(0,10)&&z.acts.every(id=>state.a[id]);
 ell(k,z.cx,z.cy-143,12,12,done?'#9ecf9b':'#f2cf73');k.fillStyle='#655344';k.font='bold 17px sans-serif';k.textAlign='center';k.textBaseline='middle';k.fillText(done?'✓':'!',z.cx,z.cy-142);
 pill(k,z.cx,z.cy+87,z.k+' · '+z.vi,13);
}
function drawStaff(k,n,t){
 if(!staffArt.complete||!staffArt.naturalWidth)return;
 const phase=n.mv?[0,1,2,1][Math.floor((n.distance||0)/11)%4]:1,row=n.role*3+phase,view=n.view||0,size=82*256/224;
 k.save();k.translate(n.x,n.y);ell(k,0,2,14,3,'rgba(80,48,27,.15)');k.drawImage(staffArt,view*256,row*256,256,256,-size/2,-size*252/256,size,size);k.restore();
}
const NPCS=[
{id:'cashier',role:1,main:1,x:300,y:412.5,n:'小宝',vi:'Tiểu Bảo · Thu ngân',lines:[['欢迎！想吃什么？','Huānyíng! Xiǎng chī shénme?','Xin chào! Bạn muốn ăn gì?']]},
{id:'chef',role:0,fixed:1,x:1100,y:412.5,n:'大厨',vi:'Đầu bếp',lines:[['今天的饺子很好吃！','Jīntiān de jiǎozi hěn hǎochī!','Sủi cảo hôm nay rất ngon!'],['请稍等，面条马上就好。','Qǐng shāo děng, miàntiáo mǎshàng jiù hǎo.','Xin đợi chút, mì sắp xong rồi.']]},
{id:'server',role:1,n:'小林',vi:'Tiểu Lâm · Phục vụ',lines:[['请坐这里。','Qǐng zuò zhèlǐ.','Mời bạn ngồi ở đây.'],['您想喝什么？','Nín xiǎng hē shénme?','Bạn muốn uống gì?']]}
];
const WORDS=Object.fromEntries(ZONES.map(z=>[z.k,z.acts[0]]));
function enterRestaurant(p){
 const old0=document.getElementById('restaurantov');if(old0)old0.remove();const tok=window.__restaurantTok={};
 const sc=seasonC(),host=$('ovm').parentNode,ovp=document.createElement('div');ovp.id='restaurantov';
 ovp.style.cssText='position:absolute;inset:0;z-index:8;overflow:hidden;background:'+sc.g2+';touch-action:manipulation';
 ovp.innerHTML=`<canvas id="restaurant3" style="position:absolute;inset:0;width:100%;height:100%;display:block"></canvas><canvas id="rmm" width="280" height="200" style="position:absolute;right:10px;top:96px;width:140px;height:100px;border:3px solid #1d4a3a;border-radius:14px;background:rgba(255,255,255,.8)"></canvas>
 <div style="position:absolute;left:0;right:0;top:0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px"><button class="btn" id="leave">← Ra phố</button><b style="font-size:18px;color:#744d36;background:rgba(255,255,255,.85);border-radius:14px;padding:3px 12px">🍜 餐厅 · Nhà ăn Cá Voi</b><span style="flex:1"></span><span class="pill" id="restaurantCoin">🪙 0</span>${p.words?'<button class="btn gold" id="learn">📘 Nhiệm vụ</button><button class="btn" id="talk2">💬</button>':''}</div>
 <div style="position:absolute;right:12px;bottom:70px;display:flex;flex-direction:column;gap:8px"><button class="btn" id="zin" style="width:46px;height:46px;font-size:24px;border-radius:50%">+</button><button class="btn" id="zout" style="width:46px;height:46px;font-size:24px;border-radius:50%">−</button></div>
 <div style="position:absolute;left:0;right:0;bottom:8px;text-align:center;pointer-events:none"><span style="display:inline-block;background:rgba(255,255,255,.92);border-radius:14px;padding:6px 14px;font-size:13px;font-weight:700;color:#2a4a6a">Chạm vào một khu hoặc con đường để đi · ❗ khu có bài tập thưởng 🪙 · bảng Lối ra phía dưới để về phố</span></div>`;
 host.appendChild(ovp);
 const exitPark=()=>{window.__restaurantTok=null;ovp.remove()};
 $('leave').onclick=exitPark;if(p.words)$('learn').onclick=()=>{exitPark();openBoard(p)};if($('talk2'))$('talk2').onclick=()=>{exitPark();openNpc(p)};
 const coinEl=()=>{const e=$('restaurantCoin');if(e)e.textContent='🪙 '+(ST.coins||0)};coinEl();window.__restaurantCoin=coinEl;
 const c=$('restaurant3'),k=c.getContext('2d'),mm=$('rmm'),mk=mm.getContext('2d');let VW=800,VH=600,DPR=1,Z=1,zUser=null;
 const fit=()=>{const r=ovp.getBoundingClientRect();DPR=window.devicePixelRatio||1;VW=r.width;VH=r.height;c.width=Math.round(VW*DPR);c.height=Math.round(VH*DPR);if(zUser==null)Z=Math.max(.5,Math.min(1,VW/1450))};fit();window.addEventListener('resize',fit);
 $('zin').onclick=()=>{zUser=Math.min(1.8,(zUser||Z)*1.2);Z=zUser};$('zout').onclick=()=>{zUser=Math.max(.45,(zUser||Z)/1.2);Z=zUser};
 c.addEventListener('wheel',e=>{e.preventDefault();zUser=Math.max(.45,Math.min(1.8,(zUser||Z)*(e.deltaY<0?1.1:.9)));Z=zUser},{passive:false});
 const hero={x:700,y:790,path:[],view:0,face:1,after:null},pet={x:670,y:800};let cam=[700,790];
 const say=(zh,py,vi)=>{toast(`${zh}  ${py}\n${vi}`);if(window.rwSay)try{rwSay(zh)}catch(e){}};
 /* người đi bộ */
 const cellsAll=[];for(let r=0;r<rows;r++)for(let q=0;q<cols;q++)if(walk[r][q]&&r*CELL<860)cellsAll.push([q*CELL+CELL/2,r*CELL+CELL/2]);
 const npcs=NPCS.map((n,i)=>{const s=n.main||n.fixed?[n.x,n.y]:cellsAll[Math.floor(hash(i,7)*cellsAll.length)];return{...n,x:s[0],y:s[1],path:[],pause:Math.random()*2,li:0,view:0,face:1,ph:i*1.7}});
 const openZone=z=>{const wl=QB[WORDS[z.k]].w;const acts=z.acts.map(a=>`<button class="btn gold" data-act="${a}">${ACTN[a]}</button>`).join('');
  modal(`<h2>${z.ic} ${z.vi}</h2><p class="sub">${z.zh} · ${z.py}</p><p class="sub">${z.ds}</p><div class="row" style="flex-wrap:wrap;gap:6px;margin:8px 0">${wl.map((w,i)=>`<button class="btn" data-w="${i}" style="font-size:15px">${w[0]}<br><small>${w[1]} · ${w[2]}</small></button>`).join('')}</div><div class="row" style="flex-wrap:wrap;gap:8px">${false?'<button class="btn" id="fs">💦 Đổi trạng thái đài phun</button>':''}${z.k==='A'?'<button class="btn" id="practice-order">🧾 Luyện gọi món theo yêu cầu</button>':''}${acts}<button class="btn" id="cl">Đóng</button></div>`);
  document.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const w=wl[+b.dataset.w];say(w[0],w[1],w[2])});
  document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>quiz(b.dataset.act));
  if($('practice-order'))$('practice-order').onclick=openOrder;
  $('cl').onclick=closeM};
 const fire=a=>{if(!a)return;if(a.npc){const n=a.npc;if(n.main){exitPark();if(p.words)openNpc(p);else say('欢迎来餐厅！','Huānyíng lái cāntīng!','Chào mừng đến nhà ăn!');return}n.pause=2;n.mv=false;const l=n.lines[n.li++%n.lines.length];say(l[0],l[1],`${n.n} (${n.vi}): ${l[2]}`)}else if(a.zone)openZone(a.zone)};
 const goTo=(x,y,after)=>{const s=snap(x,y);if(!s)return;const pa=bfs(hero.x,hero.y,s[0],s[1]);if(pa){hero.path=pa;hero.after=after||null}else if(Math.hypot(hero.x-s[0],hero.y-s[1])<30){hero.path=[];hero.after=after||null;if(after)fire(after)}};
 const toW=(ex,ey)=>{const r=c.getBoundingClientRect();return[(ex-r.left-VW/2)/Z+cam[0],(ey-r.top-VH/2)/Z+cam[1]]};
 c.onclick=e=>{const[wx,wy]=toW(e.clientX,e.clientY);
  for(const n of npcs)if(Math.abs(wx-n.x)<30&&wy>n.y-92&&wy<n.y+14){goTo(n.x,n.y+8,{npc:n});return}
  for(const z of ZONES)if(wx>z.x-14&&wx<z.x+z.w+14&&wy>z.y-40&&wy<z.y+z.h+30){goTo(z.cx,z.ey,{zone:z});return}
  goTo(wx,wy,null)};
 let last=0;
 const draw=t=>{const dt=Math.min(.05,(t-(last||t))/1000);last=t;
  if(window.__restaurantTok!==tok||!document.body.contains(ovp)){window.removeEventListener('resize',fit);return}
  /* cập nhật */
  const sp=210*dt;if(hero.path.length){const[tx,ty]=hero.path[0],dx=tx-hero.x,dy=ty-hero.y,d=Math.hypot(dx,dy);if(d<=sp){hero.x=tx;hero.y=ty;hero.path.shift()}else{hero.x+=dx/d*sp;hero.y+=dy/d*sp;hero.face=dx>=0?1:-1;hero.view=Math.abs(dx)>Math.abs(dy)*1.2?(dx>0?1:3):(dy<0?2:0)}}else if(hero.after){const a=hero.after;hero.after=null;fire(a)}
  if(hero.y>=885&&!hero.path.length){exitPark();return}
  pet.x+=(hero.x-34-pet.x)*Math.min(1,dt*3);pet.y+=(hero.y-6-pet.y)*Math.min(1,dt*3);
  for(const n of npcs){n.mv=false;const ox=n.x,oy=n.y;if(n.main||n.fixed){const dx=hero.x-n.x,dy=hero.y-n.y;if(Math.hypot(dx,dy)<170)n.view=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy<0?2:0);continue}
   if(n.pause>0){n.pause-=dt;continue}if(!n.path.length){const tg=cellsAll[Math.floor(Math.random()*cellsAll.length)];n.path=bfs(n.x,n.y,tg[0],tg[1])||[];if(!n.path.length)n.pause=1;continue}
   const [tx,ty]=n.path[0],dx=tx-n.x,dy=ty-n.y,d=Math.hypot(dx,dy),step=72*dt;if(d>.001)n.view=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy<0?2:0);
   if(d<=step){n.x=tx;n.y=ty;n.path.shift();if(!n.path.length)n.pause=1+Math.random()*2}else{n.x+=dx/d*step;n.y+=dy/d*step}
   const distance=Math.hypot(n.x-ox,n.y-oy);n.distance=(n.distance||0)+distance;n.mv=distance>.001;
  }
  /* camera */
  const hw=VW/2/Z,hh=VH/2/Z;cam[0]+=(hero.x-cam[0])*Math.min(1,dt*4);cam[1]+=(hero.y-60-cam[1])*Math.min(1,dt*4);
  cam[0]=hw*2>=WW?WW/2:Math.max(hw,Math.min(WW-hw,cam[0]));cam[1]=hh*2>=WH?WH/2:Math.max(hh,Math.min(WH-hh,cam[1]));
  k.setTransform(DPR*Z,0,0,DPR*Z,DPR*(VW/2-cam[0]*Z),DPR*(VH/2-cam[1]*Z));
  /* Restaurant floor, perimeter and high windows. Walk lanes stay unobstructed. */
  k.fillStyle='#dbc2a3';k.fillRect(-400,-400,WW+800,WH+800);
  rr(k,32,36,1336,856,28);k.fillStyle='#fcf0d9';k.fill();k.strokeStyle='#ad7956';k.lineWidth=8;k.stroke();
  k.save();rr(k,38,40,1324,846,22);k.clip();k.strokeStyle='rgba(172,124,79,.14)';k.lineWidth=1;for(let x=40;x<1370;x+=50){k.beginPath();k.moveTo(x,40);k.lineTo(x,886);k.stroke()}for(let y=40;y<900;y+=50){k.beginPath();k.moveTo(38,y);k.lineTo(1362,y);k.stroke()}k.restore();
  k.fillStyle='#f3d9b1';k.fillRect(40,40,1320,48);k.fillStyle='#d29c6a';k.fillRect(40,82,1320,8);
  for(const x of[185,585,985]){rr(k,x,35,230,50,10);k.fillStyle='#d6e9e5';k.fill();k.strokeStyle='#bc956e';k.lineWidth=5;k.stroke();k.beginPath();k.moveTo(x+115,35);k.lineTo(x+115,85);k.stroke()}
  const cobble='#f0dfc1';for(const p of PATHS){rr(k,p[0],p[1],p[2]-p[0],p[3]-p[1],10);k.fillStyle=cobble;k.fill()}
  for(const z of ZONES)drawBlock(k,z,sc,t,ST);
  /* vật thể xếp theo y */
  const L=[];
  for(const x of[100,500,900,1300])for(const y of[165,475,800])L.push({y,f:()=>{ell(k,x+33,y-32,8,11,'#df8271');k.strokeStyle='#ad6b4c';k.lineWidth=2;k.beginPath();k.moveTo(x+33,y-53);k.lineTo(x+33,y-44);k.moveTo(x+33,y-20);k.lineTo(x+33,y-12);k.stroke()}});
  for(const x of[80,440,840,1330])L.push({y:855,f:()=>{rr(k,x-12,835,24,24,5);k.fillStyle='#bb825c';k.fill();ell(k,x,826,20,16,'#91ad72');ell(k,x-10,831,12,11,'#a6be82')}});
  L.push({y:870,f:()=>{rr(k,618,808,164,32,10);k.fillStyle='#906440';k.fill();k.strokeStyle='#ecc47d';k.lineWidth=3;k.stroke();k.fillStyle='#fff2c9';k.font='bold 20px sans-serif';k.textAlign='center';k.fillText('餐厅 · Cá Voi',700,830);pill(k,700,882,'Lối ra ↓',12)}});
  for(const n of npcs)L.push({y:n.y,f:()=>{drawStaff(k,n,t);emo(k,n.main?'🧾':'💬',n.x,n.y-(n.sc?62:84)+Math.sin(t/300+n.ph)*2,16)}});
  L.push({y:hero.y,f:()=>drawPerson(k,hero.x,hero.y,{variant:0,face:hero.face,scale:1.25,moving:hero.path.length>0,time:t,hero:true,view:hero.view})});
  L.push({y:pet.y,f:()=>{if(window.drawPetC)drawPetC(k,pet.x,pet.y+Math.sin(t/420)*4+10,hero.face)}});
  L.sort((a,b)=>a.y-b.y);for(const o of L)o.f();
  /* minimap */
  mk.clearRect(0,0,280,200);const ms=280/WW;mk.fillStyle=sc.g;mk.fillRect(0,0,280,200);mk.fillStyle=cobble;for(const pr of PATHS)mk.fillRect(pr[0]*ms,pr[1]*ms,(pr[2]-pr[0])*ms,(pr[3]-pr[1])*ms);const zc={B:'#e6a23c',C:'#d9534f',E:'#ff8aa8',D:'#4aa0c0',A:'#8fd8f0',F:'#e8a0c0'};for(const z of ZONES){mk.fillStyle=zc[z.k];mk.fillRect(z.x*ms,z.y*ms,z.w*ms,z.h*ms)}mk.fillStyle='#c00';mk.beginPath();mk.arc(hero.x*ms,hero.y*ms,5,0,7);mk.fill();mk.strokeStyle='#fff';mk.lineWidth=2;mk.stroke();
  requestAnimationFrame(draw)};
 requestAnimationFrame(draw);window.__restaurant={hero,npcs,ZONES,walk,bfs,openZone,cam,drawStaff,roomArt,staffArt,quiz,openOrder}}

const ORDER_MENU=[{zh:'米饭',py:'mǐfàn',vi:'Cơm',unit:'碗',price:8},{zh:'面条',py:'miàntiáo',vi:'Mì sợi',unit:'碗',price:12},{zh:'饺子',py:'jiǎozi',vi:'Sủi cảo',unit:'份',price:15},{zh:'茶',py:'chá',vi:'Trà',unit:'杯',price:6},{zh:'果汁',py:'guǒzhī',vi:'Nước ép',unit:'杯',price:10},{zh:'蛋糕',py:'dàngāo',vi:'Bánh ngọt',unit:'份',price:9}];
function openOrder(){
 const want=[0,2,1,1,0,0],counts=Array(6).fill(0);
 const render=()=>{const total=counts.reduce((sum,n,i)=>sum+n*ORDER_MENU[i].price,0);
 modal(`<h2>🧾 Bàn số 3 muốn gọi món</h2><p class="sub">2 bát mì · 1 phần sủi cảo · 1 cốc trà</p><p class="sub">Thực đơn luyện tập, giá bằng nhân dân tệ. Không trừ xu trong game.</p><div style="display:grid;gap:8px">${ORDER_MENU.map((m,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--panel2);border-radius:12px"><span style="flex:1;text-align:left"><b>${m.zh}</b> · ${m.vi}<br><small>${m.py} · ¥${m.price}</small></span><button class="btn" data-minus="${i}" aria-label="Bớt ${m.vi}">−</button><b>${counts[i]}</b><button class="btn" data-plus="${i}" aria-label="Thêm ${m.vi}">+</button></div>`).join('')}</div><p style="margin:12px"><b>Tổng: ¥${total}</b></p><div class="err" id="orderFeedback"></div><div class="row"><button class="btn gold" id="orderCheck">Xác nhận gọi món</button><button class="btn" id="orderBack">Về nhà ăn</button></div>`);
 document.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>{counts[+b.dataset.plus]=Math.min(9,counts[+b.dataset.plus]+1);render()});document.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>{counts[+b.dataset.minus]=Math.max(0,counts[+b.dataset.minus]-1);render()});
 $('orderBack').onclick=closeM;$('orderCheck').onclick=()=>{if(!counts.every((n,i)=>n===want[i])){$('orderFeedback').textContent='Bạn kiểm tra lại món và số lượng bàn số 3 cần nhé!';return}
 const sentence='我要两碗面条、一份饺子和一杯茶。';if(window.rwSay)rwSay(sentence);
 modal(`<h2>Gọi món đúng rồi! 🎉</h2><div class="sen">${sentence}</div><p class="sub">Wǒ yào liǎng wǎn miàntiáo, yí fèn jiǎozi hé yì bēi chá.</p><p>2 bát mì + 1 phần sủi cảo + 1 cốc trà = <b>¥45</b></p><p class="sub">一共四十五元。Yígòng sìshíwǔ yuán.</p><div class="row"><button class="btn gold" id="orderBack">Về nhà ăn</button></div>`);$('orderBack').onclick=closeM};
 };render();
}

const old=window.enterRoom;
window.enterRoom=function(p){if(p&&p.id==='quan')return enterRestaurant(p);return old.apply(this,arguments)};
})();
