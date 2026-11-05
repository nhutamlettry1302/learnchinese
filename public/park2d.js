/* Công viên 公园 — màn hình riêng 2D giống trang chủ thành phố, nhiều khu */
(function(){
const WW=1400,WH=1000,CELL=25;

const QB={
 ice:{t:'🍦 Quầy kem · 冰淇淋',w:[['草莓','cǎoméi','dâu tây'],['巧克力','qiǎokèlì','sô-cô-la'],['香草','xiāngcǎo','vani'],['芒果','mángguǒ','xoài'],['抹茶','mǎchá','matcha'],['牛奶','niúnǎi','sữa']]},
 bal:{t:'🎈 Bóng bay · 气球',w:[['红色','hóngsè','màu đỏ'],['蓝色','lánsè','màu xanh dương'],['黄色','huángsè','màu vàng'],['绿色','lǜsè','màu xanh lá'],['粉色','fěnsè','màu hồng'],['紫色','zǐsè','màu tím']]},
 stage:{t:'🎤 Sân khấu mini · 舞台',w:[['我喜欢唱歌','Wǒ xǐhuan chànggē','Tôi thích hát'],['谢谢大家','Xièxie dàjiā','Cảm ơn mọi người'],['欢迎来公园','Huānyíng lái gōngyuán','Chào mừng đến công viên'],['请坐这里','Qǐng zuò zhèlǐ','Mời ngồi ở đây'],['今天很开心','Jīntiān hěn kāixīn','Hôm nay rất vui'],['再唱一首','Zài chàng yī shǒu','Hát thêm một bài nữa']]},
 play:{t:'🛝 Khu vui chơi · 儿童乐园',w:[['滑梯','huátī','cầu trượt'],['秋千','qiūqiān','xích đu'],['跷跷板','qiāoqiāobǎn','bập bênh'],['沙坑','shākēng','hố cát'],['孩子','háizi','trẻ em'],['玩','wán','chơi']]},
 pond:{t:'🪷 Hồ sen · 荷花池',w:[['荷花','héhuā','hoa sen'],['鱼','yú','cá'],['桥','qiáo','cái cầu'],['水','shuǐ','nước'],['青蛙','qīngwā','con ếch'],['红色的桥','hóngsè de qiáo','cây cầu màu đỏ']]},
 fount:{t:'⛲ Đài phun cá voi · 喷泉',w:[['喷泉','pēnquán','đài phun nước'],['广场','guǎngchǎng','quảng trường'],['鲸鱼','jīngyú','cá voi'],['散步','sànbù','đi dạo'],['长椅','chángyǐ','ghế dài'],['路灯','lùdēng','đèn đường']]},
 gaz:{t:'🏮 Chòi nghỉ · 凉亭',w:[['茶','chá','trà'],['桌子','zhuōzi','cái bàn'],['椅子','yǐzi','cái ghế'],['休息','xiūxi','nghỉ ngơi'],['聊天','liáotiān','trò chuyện'],['喝茶','hē chá','uống trà']]}};
const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
function quiz(act){const b=QB[act];const qs=sh(b.w).slice(0,5);let i=0,ok=0;
 const back=()=>{closeM()};
 const show=()=>{if(i>=qs.length)return end();const q=qs[i],zh2vi=i%2===0,opts=sh([q,...sh(b.w.filter(x=>x!==q)).slice(0,2)]);
  modal(`<h2>${b.t}</h2><p class="sub">Câu ${i+1}/${qs.length}</p><div style="text-align:center;margin:10px 0"><div style="font-size:34px;font-weight:800">${zh2vi?q[0]:esc(q[2])}</div><div class="sub">${zh2vi?q[1]:''}</div><button class="btn" id="spk">🔊 Nghe</button></div><div class="row" style="flex-direction:column;gap:8px">${opts.map((o,j)=>`<button class="btn" data-j="${j}">${zh2vi?esc(o[2]):o[0]+'  '+o[1]}</button>`).join('')}</div><div class="row"><button class="btn" id="bk">← Về công viên</button></div>`);
  $('pm').classList.remove('wide');
  $('spk').onclick=()=>{try{rwSay(q[0])}catch(e){}};try{rwSay(q[0])}catch(e){}
  $('bk').onclick=back;
  document.querySelectorAll('[data-j]').forEach(bt=>bt.onclick=()=>{const good=opts[+bt.dataset.j]===q;if(good){ok++;bt.style.background='#bff0c8'}else{bt.style.background='#ffc9c9'}document.querySelectorAll('[data-j]').forEach(x=>x.disabled=true);setTimeout(()=>{i++;show()},700)})};
 const end=()=>{const day=new Date().toISOString().slice(0,10);ST.pk=ST.pk&&ST.pk.d===day?ST.pk:{d:day,a:{}};let msg='';
  if(!ST.pk.a[act]){ST.pk.a[act]=1;const gc=ok*4,gx=ok*3;ST.coins+=gc;ST.exp+=gx;msg=`Nhận +${gc} 🪙 và +${gx} EXP (lần đầu hôm nay)`;
   if(Object.keys(ST.pk.a).length>=7&&!ST.pk.bonus){ST.pk.bonus=1;ST.tickets=(ST.tickets||0)+1;msg+='<br>🎟️ Hoàn thành cả 7 hoạt động công viên hôm nay: +1 vé quay!'}}
  else msg='Hôm nay bạn đã nhận thưởng hoạt động này rồi, vẫn luyện tập thoải mái nhé!';
  saveState();if(window.__parkCoin)window.__parkCoin();const done=Object.keys(ST.pk.a).length;
  modal(`<h2>${b.t}</h2><div style="text-align:center;margin:12px 0"><div style="font-size:38px">${ok>=4?'🌟':ok>=2?'👍':'💪'}</div><p><b>Đúng ${ok}/${qs.length}</b></p><p class="sub">${msg}</p><p class="sub">Hoạt động công viên hôm nay: ${done}/7 🌳</p></div><div class="row"><button class="btn gold" id="bk">← Về công viên</button></div>`);$('bk').onclick=back}
 show()}

const ZONES=[
 {k:'B',ic:'🛝',vi:'Khu vui chơi trẻ em',zh:'儿童乐园',py:'értóng lèyuán',cx:300,cy:300,acts:['play'],ds:'Cầu trượt, thú nhún cá voi và hố cát cho các bé.'},
 {k:'C',ic:'🏮',vi:'Chòi nghỉ',zh:'凉亭',py:'liángtíng',cx:700,cy:300,acts:['gaz'],ds:'Chòi mái đỏ, uống trà và trò chuyện.'},
 {k:'E',ic:'☂️',vi:'Khu ghế & bàn ngoài trời',zh:'露天咖啡座',py:'lùtiān kāfēizuò',cx:1100,cy:300,acts:['ice','bal'],ds:'Bàn dù, quầy kem và xe bóng bay.'},
 {k:'D',ic:'🪷',vi:'Hồ sen & cầu đỏ',zh:'荷花池',py:'héhuā chí',cx:300,cy:620,acts:['pond'],ds:'Hồ sen, lá sen và chiếc cầu đỏ.'},
 {k:'A',ic:'⛲',vi:'Quảng trường đài phun cá voi',zh:'喷泉广场',py:'pēnquán guǎngchǎng',cx:700,cy:620,acts:['fount'],ds:'Đài phun cá voi ở giữa công viên.'},
 {k:'F',ic:'🎪',vi:'Bãi cỏ & sự kiện',zh:'草坪舞台',py:'cǎopíng wǔtái',cx:1100,cy:620,acts:['stage'],ds:'Sân khấu mini, thảm picnic, thả diều.'}];
ZONES.forEach(z=>{z.x=z.cx-120;z.y=z.cy-70;z.w=240;z.h=140;z.ey=z.cy<400?410:730});
const ACTN={play:'🛝 Bài tập khu vui chơi',gaz:'🏮 Bài tập chòi nghỉ',pond:'🪷 Bài tập hồ sen',ice:'🍦 Gọi kem',bal:'🎈 Màu bóng bay',fount:'⛲ Bài tập đài phun',stage:'🎤 Bài tập sân khấu'};
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
function drawBlock(k,z,sc,t,st){const{x,y,w,h,cx,cy}=z;
 rr(k,x-8,y-8,w+16,h+16,26);k.fillStyle=sc.sn?'#f4f1e8':'#f3e7c4';k.fill();k.lineWidth=3;k.strokeStyle='#cdb98a';k.stroke();
 rr(k,x,y,w,h,20);k.fillStyle=sc.g;k.fill();
 if(z.k==='B'){ell(k,x+55,y+98,34,16,'#f0dca0');k.strokeStyle='#d4bd7a';k.lineWidth=2;k.beginPath();k.ellipse(x+55,y+98,34,16,0,0,7);k.stroke();
  k.fillStyle='#4a8fd0';k.fillRect(x+130,y+24,26,50);k.fillStyle='#d9534f';k.beginPath();k.moveTo(x+124,y+24);k.lineTo(x+143,y+6);k.lineTo(x+162,y+24);k.fill();
  k.fillStyle='#f2a93b';k.beginPath();k.moveTo(x+156,y+40);k.lineTo(x+170,y+40);k.lineTo(x+214,y+112);k.lineTo(x+192,y+112);k.closePath();k.fill();
  k.strokeStyle='#666';k.lineWidth=4;k.beginPath();k.moveTo(x+20,y+30);k.lineTo(x+20,y+10);k.lineTo(x+86,y+10);k.lineTo(x+86,y+30);k.moveTo(x+40,y+10);k.lineTo(x+40,y+50);k.moveTo(x+66,y+10);k.lineTo(x+66,y+50);k.stroke();k.fillStyle='#d9534f';k.fillRect(x+34,y+50,12,5);k.fillRect(x+60,y+50,12,5);
  emo(k,'🐋',x+110,y+108,26)}
 else if(z.k==='C'){ell(k,cx,cy+36,86,24,'#e8d9a8');for(const dx of[-64,-22,22,64]){k.fillStyle='#b03a2e';k.fillRect(cx+dx-3,cy-16,6,56)}
  ell(k,cx,cy+22,22,10,'#d9a96a');k.fillStyle='#c9653f';k.beginPath();k.arc(cx-34,cy+26,8,0,7);k.arc(cx+34,cy+26,8,0,7);k.fill();roofCN(k,cx,y-8,170,58,'#d9533f');emo(k,'🍵',cx,cy+14,16)}
 else if(z.k==='D'){ell(k,cx,cy+10,98,48,'#7fd0ea');k.strokeStyle='#4aa0c0';k.lineWidth=3;k.beginPath();k.ellipse(cx,cy+10,98,48,0,0,7);k.stroke();
  for(let i=0;i<6;i++){const a=i*1.05+.4;ell(k,cx+Math.cos(a)*56,cy+14+Math.sin(a)*24,13,6,'#4fae5e')}
  for(const[a,b]of[[-50,24],[60,8],[20,34]]){k.fillStyle='#ff9ac0';k.beginPath();k.arc(cx+a,cy+b,6,0,7);k.fill();k.fillStyle='#ffd34d';k.beginPath();k.arc(cx+a,cy+b,2.5,0,7);k.fill()}
  k.strokeStyle='#c8372d';k.lineWidth=14;k.lineCap='round';k.beginPath();k.moveTo(cx-86,cy+14);k.quadraticCurveTo(cx,cy-48,cx+86,cy+14);k.stroke();k.strokeStyle='#8a2218';k.lineWidth=3;k.beginPath();k.moveTo(cx-84,cy+6);k.quadraticCurveTo(cx,cy-58,cx+84,cy+6);k.stroke();k.lineCap='butt'}
 else if(z.k==='A'){ell(k,cx,cy+6,106,58,'#f0dfc0');ell(k,cx,cy+14,66,32,'#fff');ell(k,cx,cy+14,58,27,'#8fd8f0');
  k.fillStyle='#b8e0f8';k.beginPath();k.ellipse(cx-4,cy-2,30,22,0,0,7);k.fill();k.beginPath();k.moveTo(cx+22,cy-6);k.quadraticCurveTo(cx+46,cy-34,cx+52,cy-18);k.quadraticCurveTo(cx+40,cy-12,cx+32,cy+4);k.fill();k.fillStyle='#2a3a5a';k.beginPath();k.arc(cx-16,cy-6,3,0,7);k.fill();
  const fs=window.__parkFount||0;if(fs===2){k.strokeStyle='#2a3a5a';k.lineWidth=2;k.beginPath();k.arc(cx-12,cy+2,5,.1,3);k.stroke();emo(k,'❤️',cx-4,cy-34-Math.sin(t/300)*4,18)}
  if(fs>=1)for(let i=0;i<10;i++){const u=((t/1200)+i/10)%1,an=i/10*6.283;k.fillStyle='rgba(170,225,255,.9)';k.beginPath();k.arc(cx+Math.cos(an)*u*46,cy-14+Math.sin(an)*u*16-Math.sin(u*Math.PI)*40,3.2,0,7);k.fill()}
  else{k.strokeStyle='rgba(255,255,255,.8)';k.lineWidth=2;const r=10+((t/50)%36);k.beginPath();k.ellipse(cx,cy+14,r*1.4,r*.65,0,0,7);k.stroke()}
  for(const sx of[-1,1]){k.fillStyle='#b9814f';k.fillRect(cx+sx*96-14,cy+44,28,8);k.fillStyle='#8a5a34';k.fillRect(cx+sx*96-12,cy+52,4,6);k.fillRect(cx+sx*96+8,cy+52,4,6)}}
 else if(z.k==='E'){for(const[dx,c1]of[[-62,'#ff8aa8'],[58,'#ffd34d']]){const ux=cx+dx,uy=cy-4;ell(k,ux,uy+34,24,9,'rgba(0,0,0,.14)');k.fillStyle='#d9a96a';k.beginPath();k.arc(ux,uy+28,17,0,7);k.fill();k.fillStyle='#8a6244';k.fillRect(ux-2,uy-14,4,44);for(let i=0;i<8;i++){k.fillStyle=i%2?'#fff':c1;k.beginPath();k.moveTo(ux,uy-34);k.arc(ux,uy-8,40,Math.PI+i*Math.PI/8,Math.PI+(i+1)*Math.PI/8);k.closePath();k.fill()}}
  rr(k,cx-24,cy-10,48,40,6);k.fillStyle='#ff9ac0';k.fill();k.lineWidth=2;k.strokeStyle='#c0507a';k.stroke();k.fillStyle='#fff';k.fillRect(cx-28,cy-14,56,8);emo(k,'🍦',cx,cy+10,20);emo(k,'🎈',cx+104,cy+30,22);emo(k,'🎈',cx+112,cy+8,18)}
 else if(z.k==='F'){rr(k,x+18,y+16,150,52,6);k.fillStyle='#e8a0c0';k.fill();k.strokeStyle='#b0688c';k.lineWidth=3;k.stroke();rr(k,x+26,y+4,134,40,6);k.fillStyle='#f6c6dc';k.fill();k.stroke();emo(k,'🐋',x+93,y+26,26);for(let i=0;i<7;i++){k.fillStyle=i%2?'#ffd34d':'#ff7a5a';k.beginPath();k.arc(x+30+i*20,y+8,3.5,0,7);k.fill()}
  const mx=x+132,my=y+88;k.fillStyle='#f7d9d9';k.fillRect(mx,my,76,40);k.strokeStyle='#e8a0a0';k.lineWidth=2;k.strokeRect(mx,my,76,40);for(let i=0;i<4;i++)for(let j=0;j<2;j++){k.fillStyle=(i+j)%2?'#e0654f':'#fff';k.fillRect(mx+6+i*17,my+6+j*16,12,10)}emo(k,'🧺',mx+38,my+20,16);emo(k,'🪁',x+200+Math.sin(t/500)*6,y+16+Math.cos(t/600)*4,22)}
 /* tên */
 pill(k,cx,y+h+12,`${z.zh} ${z.py}`,13);
 const done=st&&st.pk&&st.pk.d===new Date().toISOString().slice(0,10)?z.acts.every(a=>st.pk.a[a]):false;
 emo(k,done?'✅':'❗',cx,y-30+Math.sin(t/300+cx)*3,done?20:24)}
const NPCS=[{id:'mgr',x:760,y:845,v:9,n:'林先生',vi:'Quản lý công viên',main:1,lines:[['欢迎来公园！','Huānyíng lái gōngyuán!','Chào mừng đến công viên!']]},
 {id:'gar',v:2,n:'园丁',vi:'Nhân viên chăm cây',lines:[['这些花开得真漂亮。','Zhèxiē huā kāi de zhēn piàoliang.','Những bông hoa này nở đẹp quá.'],['我每天给花浇水。','Wǒ měitiān gěi huā jiāo shuǐ.','Ngày nào tôi cũng tưới hoa.']]},
 {id:'gd',v:5,n:'导游',vi:'Hướng dẫn viên',lines:[['请跟我来，这边走。','Qǐng gēn wǒ lái, zhè biān zǒu.','Xin đi theo tôi, lối này.'],['前面是喷泉广场。','Qiánmiàn shì pēnquán guǎngchǎng.','Phía trước là quảng trường đài phun nước.']]},
 {id:'bk',v:3,n:'街头艺人',vi:'Nghệ sĩ đường phố',lines:[['我给大家唱一首歌。','Wǒ gěi dàjiā chàng yī shǒu gē.','Tôi hát tặng mọi người một bài.'],['谢谢你听我唱歌！','Xièxie nǐ tīng wǒ chànggē!','Cảm ơn bạn đã nghe tôi hát!']]},
 {id:'fa',v:8,n:'爸爸',vi:'Gia đình đi chơi',lines:[['今天我们来野餐。','Jīntiān wǒmen lái yěcān.','Hôm nay cả nhà đi dã ngoại.'],['孩子很喜欢这里。','Háizi hěn xǐhuan zhèlǐ.','Bé rất thích ở đây.']]},
 {id:'kid',v:10,sc:.7,n:'小朋友',vi:'Bé đi chơi',lines:[['我想吃冰淇淋！','Wǒ xiǎng chī bīngqílín!','Con muốn ăn kem!']]},
 {id:'jog',v:4,n:'跑步的人',vi:'Người tập thể dục',lines:[['早上跑步对身体好。','Zǎoshang pǎobù duì shēntǐ hǎo.','Chạy bộ buổi sáng tốt cho sức khỏe.']]}];
const WORDS={B:'play',C:'gaz',D:'pond',E:'ice',F:'stage',A:'fount'};
function enterPark(p){
 const old0=document.getElementById('parkov');if(old0)old0.remove();const tok=window.__parkTok={};
 const sc=seasonC(),host=$('ovm').parentNode,ovp=document.createElement('div');ovp.id='parkov';
 ovp.style.cssText='position:absolute;inset:0;z-index:8;overflow:hidden;background:'+sc.g2+';touch-action:manipulation';
 ovp.innerHTML=`<canvas id="park3" style="position:absolute;inset:0;width:100%;height:100%;display:block"></canvas><canvas id="pmm" width="280" height="200" style="position:absolute;right:10px;top:96px;width:140px;height:100px;border:3px solid #1d4a3a;border-radius:14px;background:rgba(255,255,255,.8)"></canvas>
 <div style="position:absolute;left:0;right:0;top:0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px"><button class="btn" id="leave">← Ra phố</button><b style="font-size:20px;color:#1d4a3a;background:rgba(255,255,255,.85);border-radius:14px;padding:3px 12px">🌳 公园 · Công viên</b><span style="flex:1"></span><span class="pill" id="pkCoin">🪙 0</span>${p.words?'<button class="btn gold" id="learn">📘 Nhiệm vụ</button><button class="btn" id="talk2">💬</button>':''}</div>
 <div style="position:absolute;right:12px;bottom:70px;display:flex;flex-direction:column;gap:8px"><button class="btn" id="zin" style="width:46px;height:46px;font-size:24px;border-radius:50%">+</button><button class="btn" id="zout" style="width:46px;height:46px;font-size:24px;border-radius:50%">−</button></div>
 <div style="position:absolute;left:0;right:0;bottom:8px;text-align:center;pointer-events:none"><span style="display:inline-block;background:rgba(255,255,255,.92);border-radius:14px;padding:6px 14px;font-size:13px;font-weight:700;color:#2a4a6a">Chạm vào một khu hoặc con đường để đi · ❗ khu có bài tập thưởng 🪙 · cổng 公园 phía dưới là lối ra</span></div>`;
 host.appendChild(ovp);
 const exitPark=()=>{window.__parkTok=null;ovp.remove()};
 $('leave').onclick=exitPark;if(p.words)$('learn').onclick=()=>{exitPark();openBoard(p)};if($('talk2'))$('talk2').onclick=()=>{exitPark();openNpc(p)};
 const coinEl=()=>{const e=$('pkCoin');if(e)e.textContent='🪙 '+(ST.coins||0)};coinEl();window.__parkCoin=coinEl;
 const c=$('park3'),k=c.getContext('2d'),mm=$('pmm'),mk=mm.getContext('2d');let VW=800,VH=600,DPR=1,Z=1,zUser=null;
 const fit=()=>{const r=ovp.getBoundingClientRect();DPR=window.devicePixelRatio||1;VW=r.width;VH=r.height;c.width=Math.round(VW*DPR);c.height=Math.round(VH*DPR);if(zUser==null)Z=Math.max(.5,Math.min(1,VW/1450))};fit();window.addEventListener('resize',fit);
 $('zin').onclick=()=>{zUser=Math.min(1.8,(zUser||Z)*1.2);Z=zUser};$('zout').onclick=()=>{zUser=Math.max(.45,(zUser||Z)/1.2);Z=zUser};
 c.addEventListener('wheel',e=>{e.preventDefault();zUser=Math.max(.45,Math.min(1.8,(zUser||Z)*(e.deltaY<0?1.1:.9)));Z=zUser},{passive:false});
 const hero={x:700,y:790,path:[],view:0,face:1,after:null},pet={x:670,y:800};let cam=[700,790];
 const say=(zh,py,vi)=>{toast(`${zh}  ${py}\n${vi}`);if(window.rwSay)try{rwSay(zh)}catch(e){}};
 /* người đi bộ */
 const cellsAll=[];for(let r=0;r<rows;r++)for(let q=0;q<cols;q++)if(walk[r][q]&&r*CELL<860)cellsAll.push([q*CELL+CELL/2,r*CELL+CELL/2]);
 const npcs=NPCS.map((n,i)=>{const s=n.main?[n.x,n.y]:cellsAll[Math.floor(hash(i,7)*cellsAll.length)];return{...n,x:s[0],y:s[1],path:[],pause:Math.random()*2,li:0,view:0,face:1,ph:i*1.7}});
 const openZone=z=>{const wl=QB[WORDS[z.k]].w;const acts=z.acts.map(a=>`<button class="btn gold" data-act="${a}">${ACTN[a]}</button>`).join('');
  modal(`<h2>${z.ic} ${z.vi}</h2><p class="sub">${z.zh} · ${z.py}</p><p class="sub">${z.ds}</p><div class="row" style="flex-wrap:wrap;gap:6px;margin:8px 0">${wl.map((w,i)=>`<button class="btn" data-w="${i}" style="font-size:15px">${w[0]}<br><small>${w[1]} · ${w[2]}</small></button>`).join('')}</div><div class="row" style="flex-wrap:wrap;gap:8px">${z.k==='A'?'<button class="btn" id="fs">💦 Đổi trạng thái đài phun</button>':''}${acts}<button class="btn" id="cl">Đóng</button></div>`);
  document.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const w=wl[+b.dataset.w];say(w[0],w[1],w[2])});
  document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>quiz(b.dataset.act));
  if($('fs'))$('fs').onclick=()=>{window.__parkFount=((window.__parkFount||0)+1)%3;toast(['Đài phun: tĩnh','Đài phun: đang phun nước 💦','Đài phun: vui vẻ ❤️'][window.__parkFount])};
  $('cl').onclick=closeM};
 const fire=a=>{if(!a)return;if(a.npc){const n=a.npc;if(n.main){exitPark();if(p.words)openNpc(p);else say('欢迎来公园！','Huānyíng lái gōngyuán!','Chào mừng đến công viên!');return}const l=n.lines[n.li++%n.lines.length];say(l[0],l[1],`${n.n} (${n.vi}): ${l[2]}`)}else if(a.zone)openZone(a.zone)};
 const goTo=(x,y,after)=>{const s=snap(x,y);if(!s)return;const pa=bfs(hero.x,hero.y,s[0],s[1]);if(pa){hero.path=pa;hero.after=after||null}else if(Math.hypot(hero.x-s[0],hero.y-s[1])<30){hero.path=[];hero.after=after||null;if(after)fire(after)}};
 const toW=(ex,ey)=>{const r=c.getBoundingClientRect();return[(ex-r.left-VW/2)/Z+cam[0],(ey-r.top-VH/2)/Z+cam[1]]};
 c.onclick=e=>{const[wx,wy]=toW(e.clientX,e.clientY);
  for(const n of npcs)if(Math.abs(wx-n.x)<30&&wy>n.y-92&&wy<n.y+14){goTo(n.x,n.y+8,{npc:n});return}
  for(const z of ZONES)if(wx>z.x-14&&wx<z.x+z.w+14&&wy>z.y-40&&wy<z.y+z.h+30){goTo(z.cx,z.ey,{zone:z});return}
  goTo(wx,wy,null)};
 let last=0;
 const draw=t=>{const dt=Math.min(.05,(t-(last||t))/1000);last=t;
  if(window.__parkTok!==tok||!document.body.contains(ovp)){window.removeEventListener('resize',fit);return}
  /* cập nhật */
  const sp=210*dt;if(hero.path.length){const[tx,ty]=hero.path[0],dx=tx-hero.x,dy=ty-hero.y,d=Math.hypot(dx,dy);if(d<=sp){hero.x=tx;hero.y=ty;hero.path.shift()}else{hero.x+=dx/d*sp;hero.y+=dy/d*sp;hero.face=dx>=0?1:-1;hero.view=Math.abs(dx)>Math.abs(dy)*1.2?(dx>0?1:3):(dy<0?2:0)}}else if(hero.after){const a=hero.after;hero.after=null;fire(a)}
  if(hero.y>=885&&!hero.path.length){exitPark();return}
  pet.x+=(hero.x-34-pet.x)*Math.min(1,dt*3);pet.y+=(hero.y-6-pet.y)*Math.min(1,dt*3);
  for(const n of npcs){if(n.main)continue;n.mv=false;if(n.pause>0){n.pause-=dt;continue}if(!n.path.length){const tg=cellsAll[Math.floor(Math.random()*cellsAll.length)];n.path=bfs(n.x,n.y,tg[0],tg[1])||[];if(!n.path.length)n.pause=1;continue}const[tx,ty]=n.path[0],dx=tx-n.x,dy=ty-n.y,d=Math.hypot(dx,dy),s2=(n.id==='jog'?120:62)*dt;n.mv=true;if(d<=s2){n.x=tx;n.y=ty;n.path.shift();if(!n.path.length)n.pause=1+Math.random()*3}else{n.x+=dx/d*s2;n.y+=dy/d*s2;n.face=dx>=0?1:-1;n.view=Math.abs(dx)>Math.abs(dy)*1.2?(dx>0?1:3):(dy<0?2:0)}}
  /* camera */
  const hw=VW/2/Z,hh=VH/2/Z;cam[0]+=(hero.x-cam[0])*Math.min(1,dt*4);cam[1]+=(hero.y-60-cam[1])*Math.min(1,dt*4);
  cam[0]=hw*2>=WW?WW/2:Math.max(hw,Math.min(WW-hw,cam[0]));cam[1]=hh*2>=WH?WH/2:Math.max(hh,Math.min(WH-hh,cam[1]));
  k.setTransform(DPR*Z,0,0,DPR*Z,DPR*(VW/2-cam[0]*Z),DPR*(VH/2-cam[1]*Z));
  /* nền */
  k.fillStyle=sc.g2;k.fillRect(-400,-400,WW+800,WH+800);
  for(let y=0;y<WH;y+=100)for(let x=0;x<WW;x+=100)if((x/100+y/100)%2===0){k.fillStyle=sc.g;k.globalAlpha=.5;k.fillRect(x,y,100,100);k.globalAlpha=1}
  /* viền cây phía trên + dưới */
  const cobble=sc.sn?'#ece7da':'#efe2bf';
  for(const pr of PATHS){rr(k,pr[0],pr[1],pr[2]-pr[0],pr[3]-pr[1],10);k.fillStyle=cobble;k.fill()}
  k.strokeStyle='rgba(180,150,100,.45)';k.lineWidth=2;k.setLineDash([14,14]);for(const y of[110,410,730]){k.beginPath();k.moveTo(90,y);k.lineTo(1310,y);k.stroke()}for(const x of[100,500,900,1300]){k.beginPath();k.moveTo(x,90);k.lineTo(x,890);k.stroke()}k.setLineDash([]);
  for(const z of ZONES)drawBlock(k,z,sc,t,ST);
  /* hàng rào + cổng */
  k.fillStyle='#fff';for(let x=90;x<1320;x+=26){if(x>640&&x<760)continue;k.fillRect(x,858,10,22)}k.fillRect(90,866,550,4);k.fillRect(760,866,560,4);
  /* vật thể xếp theo y */
  const L=[];
  for(let y=40;y<WH;y+=70)for(let x=30;x<WW;x+=80){const jx=x+hash(x,y)*40,jy=y+hash(y,x)*30;if(jy>840)continue;if(PATHS.some(p=>jx>p[0]-26&&jx<p[2]+26&&jy>p[1]-22&&jy<p[3]+30))continue;if(ZONES.some(z=>jx>z.x-34&&jx<z.x+z.w+34&&jy>z.y-40&&jy<z.y+z.h+44))continue;if(hash(x,y*3)<.35)continue;const ch=hash(y,x*7)<.4;L.push({y:jy,f:()=>blob(k,jx,jy,15+hash(x,x)*8,ch?sc.ch:sc.tr,sc.sn)})}
  for(const lx of[100,500,900,1300])for(const ly of[160,400,560,730]){L.push({y:ly,f:()=>{k.fillStyle='#44403c';k.fillRect(lx+34,ly-44,4,44);k.fillStyle='#f2c14e';k.beginPath();k.arc(lx+36,ly-48,7,0,7);k.fill()}})}
  L.push({y:870,f:()=>{k.fillStyle='#d9c79a';k.fillRect(640,800,22,80);k.fillRect(738,800,22,80);k.strokeStyle='#a8895a';k.lineWidth=2;k.strokeRect(640,800,22,80);k.strokeRect(738,800,22,80);k.strokeStyle='#c98f3a';k.lineWidth=10;k.beginPath();k.moveTo(650,806);k.quadraticCurveTo(700,764,750,806);k.stroke();rr(k,670,774,60,26,6);k.fillStyle='#8a5a1c';k.fill();k.strokeStyle='#e6c25a';k.lineWidth=2;k.stroke();k.font='700 18px "Songti SC","Noto Serif CJK SC",serif';k.textAlign='center';k.textBaseline='middle';k.fillStyle='#ffe28a';k.fillText('公园',700,788);k.font='700 12px sans-serif';k.fillStyle='#456';k.fillText('出口 ↓',700,898)}});
  for(const n of npcs)L.push({y:n.y,f:()=>{drawPerson(k,n.x,n.y,{variant:n.v,face:n.face,scale:(n.sc||.9),moving:!!n.mv,view:n.view,time:t,phase:n.ph});emo(k,n.main?'❗':'💬',n.x,n.y-(n.sc?62:84)+Math.sin(t/300+n.ph)*2,16)}});
  L.push({y:hero.y,f:()=>drawPerson(k,hero.x,hero.y,{variant:0,face:hero.face,scale:1.25,moving:hero.path.length>0,time:t,hero:true,view:hero.view})});
  L.push({y:pet.y,f:()=>{if(window.drawPetC)drawPetC(k,pet.x,pet.y+Math.sin(t/420)*4+10,hero.face)}});
  L.sort((a,b)=>a.y-b.y);for(const o of L)o.f();
  /* minimap */
  mk.clearRect(0,0,280,200);const ms=280/WW;mk.fillStyle=sc.g;mk.fillRect(0,0,280,200);mk.fillStyle=cobble;for(const pr of PATHS)mk.fillRect(pr[0]*ms,pr[1]*ms,(pr[2]-pr[0])*ms,(pr[3]-pr[1])*ms);const zc={B:'#e6a23c',C:'#d9534f',E:'#ff8aa8',D:'#4aa0c0',A:'#8fd8f0',F:'#e8a0c0'};for(const z of ZONES){mk.fillStyle=zc[z.k];mk.fillRect(z.x*ms,z.y*ms,z.w*ms,z.h*ms)}mk.fillStyle='#c00';mk.beginPath();mk.arc(hero.x*ms,hero.y*ms,5,0,7);mk.fill();mk.strokeStyle='#fff';mk.lineWidth=2;mk.stroke();
  requestAnimationFrame(draw)};
 requestAnimationFrame(draw);window.__park={hero,npcs,ZONES,walk,bfs,openZone,cam}}
const old=window.enterRoom;
window.enterRoom=function(p){if(p&&p.id==='congvien')return enterPark(p);return old.apply(this,arguments)};
})();
