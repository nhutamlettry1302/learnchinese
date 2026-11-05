/* Công viên 公园 — không gian ngoài trời riêng, đi dạo tự do */
(function(){
const{mix}=__iso;
const TW=64,TH=32,M=16,W=800,H=520;
const P2=(x,y,z)=>[(x-y)*TW/2,(x+y)*TH/2-(z||0)];
let k,cam=[0,0],TT=0;
const pt=(x,y,z)=>{const q=P2(x,y,z);return[q[0]+cam[0],q[1]+cam[1]]};
function poly(pts,fill,line){k.beginPath();pts.forEach((q,i)=>i?k.lineTo(q[0],q[1]):k.moveTo(q[0],q[1]));k.closePath();k.fillStyle=fill;k.fill();if(line){k.lineWidth=1;k.strokeStyle=line;k.stroke()}}
const box=(x,y,z,dx,dy,dz,c)=>{poly([pt(x,y+dy,z),pt(x+dx,y+dy,z),pt(x+dx,y+dy,z+dz),pt(x,y+dy,z+dz)],mix(c,'#000000',.15));poly([pt(x+dx,y,z),pt(x+dx,y+dy,z),pt(x+dx,y+dy,z+dz),pt(x+dx,y,z+dz)],mix(c,'#000000',.3));poly([pt(x,y,z+dz),pt(x+dx,y,z+dz),pt(x+dx,y+dy,z+dz),pt(x,y+dy,z+dz)],c)};
const ball=(x,y,z,r,c)=>{const[p,q]=pt(x,y,z);const g=k.createRadialGradient(p-r*.35,q-r*.4,r*.1,p,q,r);g.addColorStop(0,mix(c,'#ffffff',.4));g.addColorStop(1,mix(c,'#000000',.2));k.beginPath();k.arc(p,q,r,0,7);k.fillStyle=g;k.fill()};
const cyl=(x,y,z,r,h,c)=>{const[p,q]=pt(x,y,z),rx=r*TW*.7,ry=r*TH*.7;const g=k.createLinearGradient(p-rx,0,p+rx,0);g.addColorStop(0,mix(c,'#ffffff',.18));g.addColorStop(1,mix(c,'#000000',.28));k.fillStyle=g;k.fillRect(p-rx,q-h,2*rx,h);k.beginPath();k.ellipse(p,q,rx,ry,0,0,Math.PI);k.fill();k.beginPath();k.ellipse(p,q-h,rx,ry,0,0,7);k.fillStyle=mix(c,'#ffffff',.22);k.fill()};
const txt=(s,x,y,size,col,w)=>{k.font=`${w||700} ${size}px "Noto Sans","Segoe UI",sans-serif`;k.textAlign='center';k.textBaseline='middle';k.fillStyle=col;k.fillText(s,x,y)};
const emo=(s,x,y,size)=>{k.font=`${size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;k.textAlign='center';k.textBaseline='middle';k.fillStyle='#000';k.fillText(s,x,y)};
/* mùa */
function seasonCols(){let s='xuan';try{s=window.curSeason?curSeason():'xuan'}catch(e){}
 return({xuan:{ch:'#ffb3cf',gr:'#5cb85c',g1:'#9fd88a',g2:'#92cf7c',sky:['#bfe6ff','#eaf8ff']},ha:{ch:'#4fae5e',gr:'#3f9a4a',g1:'#8fd070',g2:'#82c464',sky:['#9fd8ff','#e6f6ff']},thu:{ch:'#f08a3c',gr:'#c9a23a',g1:'#d9c27a',g2:'#cdb46a',sky:['#ffe0c0','#fff3e0']},dong:{ch:'#f6eef2',gr:'#9cc9b0',g1:'#e4efe9',g2:'#d6e6de',sky:['#d6e4f2','#f4f8fc']}})[s]||{}}
/* bản đồ */
function build(){
 const T=[];for(let y=0;y<M;y++){T.push([]);for(let x=0;x<M;x++)T[y].push('g')}
 const set=(x,y,c)=>{if(x>=0&&y>=0&&x<M&&y<M)T[y][x]=c};
 const line=(ax,ay,bx,by,wd)=>{for(let t=0;t<=1;t+=.015){const cx=Math.floor(ax+(bx-ax)*t),cy=Math.floor(ay+(by-ay)*t);if(T[cy]&&T[cy][cx]==='g')set(cx,cy,'p');if(wd&&T[cy]&&T[cy][cx+1]==='g')set(cx+1,cy,'p')}};
 for(let y=0;y<M;y++)for(let x=0;x<M;x++){if(Math.hypot(x+.5-8,y+.5-8)<3.3)T[y][x]='P';const ex=(x+.5-3.5)/2.7,ey=(y+.5-11.5)/2.1;if(ex*ex+ey*ey<1)T[y][x]='w'}
 line(8,8,15.5,15.5,1);line(8,8,4,6.5,0);line(8,8,6.8,2.5,0);line(8,8,12.5,4.5,0);line(8,8,12.5,11.5,0);line(8,8,7,11.5,0);
 for(let x=1;x<=6;x++)T[11][x]='b';
 const bl=new Set();const add=(x,y)=>bl.add(x+','+y);
 for(let y=0;y<M;y++)for(let x=0;x<M;x++){if(T[y][x]==='w')add(x,y);if(Math.hypot(x+.5-8,y+.5-8)<1.8)add(x,y)}
 return{T,bl,add}}
const ZONES=[
 ['A','⛲','Quảng trường trung tâm','中心广场 zhōngxīn guǎngchǎng',(x,y)=>Math.hypot(x-8,y-8)<3.6],
 ['B','🛝','Khu vui chơi trẻ em','儿童乐园 értóng lèyuán',(x,y)=>x<5.2&&y>3.2&&y<8.5],
 ['C','🏮','Chòi nghỉ','凉亭 liángtíng',(x,y)=>x>4.2&&x<9&&y<4.2],
 ['D','🪷','Hồ sen & cầu đỏ','荷花池 héhuā chí',(x,y)=>x<7&&y>9.3],
 ['E','☂️','Khu ghế & bàn ngoài trời','露天座椅 lùtiān zuòyǐ',(x,y)=>x>=9.5&&y<7],
 ['F','🎪','Bãi cỏ & sự kiện','草坪活动区 cǎopíng huódòng qū',(x,y)=>x>=9&&y>=8.5]];
const NPCS=[
 {id:'mgr',x:12.5,y:12.5,v:9,n:'林先生',vi:'Quản lý công viên',main:1,lines:[['欢迎来公园！','Huānyíng lái gōngyuán!','Chào mừng đến công viên!']]},
 {id:'gar',x:4.5,y:9.2,v:2,n:'园丁',vi:'Nhân viên chăm cây',lines:[['这些花开得真漂亮。','Zhèxiē huā kāi de zhēn piàoliang.','Những bông hoa này nở đẹp quá.'],['我每天给花浇水。','Wǒ měitiān gěi huā jiāo shuǐ.','Ngày nào tôi cũng tưới hoa.']]},
 {id:'gd',x:9.4,y:10.2,v:5,n:'导游',vi:'Hướng dẫn viên',lines:[['请跟我来，这边走。','Qǐng gēn wǒ lái, zhè biān zǒu.','Xin đi theo tôi, lối này.'],['前面是喷泉广场。','Qiánmiàn shì pēnquán guǎngchǎng.','Phía trước là quảng trường đài phun nước.']]},
 {id:'bk',x:10.6,y:5.6,v:3,n:'街头艺人',vi:'Nghệ sĩ đường phố',lines:[['我给大家唱一首歌。','Wǒ gěi dàjiā chàng yī shǒu gē.','Tôi hát tặng mọi người một bài.'],['谢谢你听我唱歌！','Xièxie nǐ tīng wǒ chànggē!','Cảm ơn bạn đã nghe tôi hát!']]},
 {id:'fa',x:9.4,y:12.4,v:8,n:'爸爸',vi:'Gia đình đi chơi',lines:[['今天我们来野餐。','Jīntiān wǒmen lái yěcān.','Hôm nay cả nhà đi dã ngoại.'],['孩子很喜欢这里。','Háizi hěn xǐhuan zhèlǐ.','Bé rất thích ở đây.']]},
 {id:'kid',x:10.1,y:12.8,v:10,sc:.7,n:'小朋友',vi:'Bé đi chơi',lines:[['我想吃冰淇淋！','Wǒ xiǎng chī bīngqílín!','Con muốn ăn kem!']]},
 {id:'jog',x:8,y:4.5,v:4,n:'跑步的人',vi:'Người tập thể dục',jog:1,lines:[['早上跑步对身体好。','Zǎoshang pǎobù duì shēntǐ hǎo.','Chạy bộ buổi sáng tốt cho sức khỏe.']]}];
const SPOTS=[
 [8,8,38,'喷泉','pēnquán','đài phun cá voi',46,'fount'],[3.5,5.4,30,'滑梯','huátī','cầu trượt',40],[2.5,7.5,14,'摇摇乐','yáoyáolè','thú nhún',28],[6.5,2.5,24,'凉亭','liángtíng','chòi nghỉ',44],[3.8,11.5,22,'桥','qiáo','cầu',40],[1.8,9.4,4,'荷花','héhuā','hoa sen',26],
 [5.5,9.6,10,'长椅','chángyǐ','ghế dài',24],[10.5,6.6,10,'长椅','chángyǐ','ghế dài',24],[11.6,3.5,50,'遮阳伞','zhēyángsǎn','dù che nắng',36],[13.6,5,50,'遮阳伞','zhēyángsǎn','dù che nắng',36],[12.5,11.5,20,'舞台','wǔtái','sân khấu mini',46],[9.75,12.6,3,'野餐垫','yěcāndiàn','thảm picnic',34],
 [9.8,4,30,'冰淇淋车','bīngqílín chē','quầy kem',40],[13.2,7.5,50,'气球','qìqiú','bóng bay',34],[9.6,7.6,30,'路灯','lùdēng','đèn đường',20],[1.6,3.4,50,'樱花树','yīnghuā shù','cây anh đào',40]]
 .map(s=>({x:s[0],y:s[1],z:s[2],zh:s[3],py:s[4],vi:s[5],pr:s[6],fo:s[7]==='fount'}));
function enterPark(p){
 const sc=seasonCols(),{T,bl,add}=build();
 const tree=(x,y,s,c,blk)=>{if(blk!==false)add(Math.floor(x),Math.floor(y));return{d:x+y+.2,f:()=>{cyl(x,y,0,.1,26*s,'#8a6244');for(const[a,b,z,r]of[[0,0,58,24],[-.22,.05,46,19],[.22,-.05,48,19],[0,.12,38,16]])ball(x+a*s,y+b*s,z*s,r*s,c)}}};
 const bench=(x,y,vert)=>{add(Math.floor(x),Math.floor(y));return{d:x+y+.4,f:()=>{if(vert){box(x,y,0,.6,1.5,14,'#b9814f');box(x,y,14,.2,1.5,18,'#8a5a34')}else{box(x,y,0,1.5,.6,14,'#b9814f');box(x,y+.4,14,1.5,.2,18,'#8a5a34')}}}};
 const lamp=(x,y)=>({d:x+y+.1,f:()=>{cyl(x,y,0,.06,50,'#44403c');ball(x,y,58,8,TT%2000<1000||true?'#ffe28a':'#ffe28a')}});
 const O=[];
 /* cây viền */
 for(let i=0;i<M;i+=2){O.push(tree(i+.5,.6,1.1,i%4?sc.gr:sc.ch));O.push(tree(.6,i+1.5,1.1,i%4?sc.ch:sc.gr))}
 for(const[x,y,c]of[[1.5,3.5,1],[4,1.5,0],[10.5,1.5,1],[14,6,0],[14.5,9.5,1],[3.2,13.8,0],[1.5,14.2,1],[9.2,14.4,1],[6.2,14.6,0],[14.6,3.5,0],[7.2,5.4,1],[10.2,12.6,0]])O.push(tree(x,y,1,c?sc.ch:sc.gr));
 /* hàng rào trắng phía trước */
 const fence=(x,y,a)=>({d:x+y+.3,f:()=>{if(a)box(x,y,0,.12,.5,16,'#ffffff');else box(x,y,0,.5,.12,16,'#ffffff')}});
 for(let i=0;i<13;i++){O.push(fence(i+.3,15.8,0));O.push(fence(15.8,i+.3,1))}
 /* cổng vòm */
 O.push({d:31.4,f:()=>{const a=[15.4,14.4],b=[14.4,15.4];box(a[0]-.2,a[1]-.2,0,.4,.4,64,'#d9c79a');box(b[0]-.2,b[1]-.2,0,.4,.4,64,'#d9c79a');const A=pt(a[0],a[1],60),B=pt(b[0],b[1],60);k.strokeStyle='#c98f3a';k.lineWidth=9;k.beginPath();k.moveTo(A[0],A[1]);k.quadraticCurveTo((A[0]+B[0])/2,A[1]-34,B[0],B[1]);k.stroke();const m=pt(14.9,14.9,86);k.fillStyle='#8a5a1c';k.fillRect(m[0]-30,m[1]-13,60,26);k.strokeStyle='#e6c25a';k.lineWidth=2;k.strokeRect(m[0]-30,m[1]-13,60,26);txt('公园',m[0],m[1],17,'#ffe28a');txt('出口 ↓',m[0],m[1]+24,11,'#556')}});
 /* đài phun cá voi */
 O.push({d:16,f:()=>{const st=window.__parkFount||0;cyl(8,8,0,1.55,10,'#ece6d6');cyl(8,8,10,1.3,2,'#8fd8f0');
  ball(8,8,30,17,'#b8e0f8');ball(8.35,7.9,38,9,'#b8e0f8');ball(7.5,8.1,44,5,'#d5f0ff');const tail=pt(7.5,8.3,34);k.fillStyle='#a6d4f2';k.beginPath();k.moveTo(tail[0]-8,tail[1]);k.quadraticCurveTo(tail[0]-26,tail[1]-26,tail[0]-12,tail[1]-32);k.quadraticCurveTo(tail[0]-12,tail[1]-14,tail[0]+4,tail[1]-8);k.fill();
  const e=pt(8.55,8.1,41);k.fillStyle='#2a3a5a';k.beginPath();k.arc(e[0],e[1],2.2,0,7);k.fill();if(st===2){k.strokeStyle='#2a3a5a';k.lineWidth=1.5;k.beginPath();k.arc(e[0]+4,e[1]+6,4,.1,3);k.stroke();emo('❤️',e[0],e[1]-34-Math.sin(TT/300)*4,16)}
  if(st>=1)for(let i=0;i<9;i++){const u=((TT/1100)+i/9)%1,an=i/9*6.283,rr=u*1.1,z=52+Math.sin(u*Math.PI)*46-u*20;const q=pt(8+Math.cos(an)*rr*.9,8+Math.sin(an)*rr*.9,z);k.fillStyle='rgba(180,230,255,.9)';k.beginPath();k.arc(q[0],q[1],3,0,7);k.fill()}
  else{const q=pt(8,8,10);k.strokeStyle='rgba(255,255,255,.7)';k.lineWidth=2;const r=20+((TT/40)%20);k.beginPath();k.ellipse(q[0]+18,q[1]+14,r,r*.5,0,0,7);k.stroke()}}});
 /* chòi nghỉ */
 add(6,2);
 O.push({d:6+2+.9,f:()=>{cyl(6.5,2.5,0,.45,22,'#d9a96a');ball(5.9,3.1,10,6,'#c9653f');ball(7.1,3.1,10,6,'#c9653f');for(const[a,b]of[[5.2,1.7],[7.9,1.7],[5.2,3.4],[7.9,3.4]])box(a,b,0,.18,.18,70,'#b03a2e');
   const c1=pt(5.1,1.6,70),c2=pt(8.2,1.6,70),c3=pt(8.2,3.7,70),c4=pt(5.1,3.7,70),ap=pt(6.65,2.65,108);poly([c4,c3,ap],'#c0392b','#7a1f18');poly([c3,c2,ap],'#a52e22','#7a1f18');poly([c1,c4,ap],'#d9533f','#7a1f18');poly([c2,c1,ap],'#b03a2e','#7a1f18')}});
 /* cầu trượt */
 for(const c of[[2,5],[3,5],[4,5],[2,7]])add(c[0],c[1]);
 O.push({d:2+5+.9,f:()=>{box(2.1,5.1,0,.8,.8,46,'#4a8fd0');box(2.1,5.1,46,.8,.8,6,'#d9534f');const a=pt(2.95,5.25,40),b=pt(2.95,5.75,40),c=pt(5.2,5.75,2),d=pt(5.2,5.25,2);poly([a,b,c,d],'#f2a93b','#c9801a');cyl(2.5,7.5,0,.18,10,'#999');ball(2.5,7.5,22,10,'#8fd0f0')}});
 /* hồ: sen + cầu + đá */
 O.push({d:12,f:()=>{for(const[x,y]of[[1.4,9.7],[2.4,10.3],[4.6,10.1],[5.4,12.9],[1.6,12.7],[3.6,13.2]]){const q=pt(x,y,2);k.fillStyle='#4fae5e';k.beginPath();k.ellipse(q[0],q[1],11,5,0,0,7);k.fill()}for(const[x,y]of[[2.4,10.3],[5.4,12.9],[1.6,12.7]]){const q=pt(x,y,6);k.fillStyle='#ff9ac0';k.beginPath();k.arc(q[0],q[1],5,0,7);k.fill();k.fillStyle='#ffd34d';k.beginPath();k.arc(q[0],q[1],2,0,7);k.fill()}}});
 const bz=x=>16*Math.sin(Math.PI*Math.max(0,Math.min(1,(x-1)/6)));window.__parkBz=bz;
 for(let x=1;x<7;x++)O.push({d:x+11.5,f:()=>{const x0=x,x1=x+1,z0=bz(x0),z1=bz(x1);poly([pt(x0,11,z0),pt(x1,11,z1),pt(x1,12,z1),pt(x0,12,z0)],'#c8372d','#8a2218');poly([pt(x0,12,z0),pt(x1,12,z1),pt(x1,12,z1-5),pt(x0,12,z0-5)],'#8a2218');
   k.strokeStyle='#e0554a';k.lineWidth=3;k.beginPath();let a=pt(x0,11.9,z0+14),b=pt(x1,11.9,z1+14);k.moveTo(a[0],a[1]);k.lineTo(b[0],b[1]);k.stroke();k.beginPath();a=pt(x0,11.9,z0);b=pt(x0,11.9,z0+14);k.moveTo(a[0],a[1]);k.lineTo(b[0],b[1]);k.stroke()}});
 /* ghế dài, đèn */
 O.push(bench(5.2,9.7,0),bench(10.2,6.2,0),bench(6.4,6,1),bench(9.6,9.4,1));
 for(const[x,y]of[[7,6.2],[10,6.4],[5.2,7.6],[9.8,11],[11.4,7.8],[11,14],[6,12.8],[13,13.6],[3.2,9.2]])O.push(lamp(x,y));
 /* khu E */
 for(const[x,y,c1,c2]of[[11.4,3.2,'#ff8aa8','#fff'],[13.4,4.8,'#ffd34d','#fff']]){add(Math.floor(x),Math.floor(y));O.push({d:x+y+.5,f:()=>{cyl(x,y,0,.5,24,'#d9a96a');ball(x-.7,y+.2,10,6,'#b9814f');ball(x+.7,y-.1,10,6,'#b9814f');cyl(x,y,0,.06,66,'#8a6244');const c=pt(x,y,66);for(let i=0;i<8;i++){const a1=i/8*6.283,a2=(i+1)/8*6.283;k.fillStyle=i%2?c2:c1;k.beginPath();k.moveTo(c[0],c[1]-16);k.lineTo(c[0]+Math.cos(a1)*40,c[1]+Math.sin(a1)*16);k.lineTo(c[0]+Math.cos(a2)*40,c[1]+Math.sin(a2)*16);k.closePath();k.fill()}}})}
 add(9,4);O.push({d:9+4+1,f:()=>{box(9.1,4.1,0,1.4,.8,34,'#ff9ac0');box(9.1,4.1,34,1.4,.8,4,'#fff');for(let i=0;i<5;i++){const q=pt(9.1+i*.3,4.2,40);k.fillStyle=i%2?'#fff':'#ff6a9a';k.beginPath();k.moveTo(q[0],q[1]);k.lineTo(q[0]+9,q[1]);k.lineTo(q[0]+4.5,q[1]-12);k.fill()}emo('🍦',pt(9.8,4.9,24)[0],pt(9.8,4.9,24)[1],18)}});
 add(13,7);O.push({d:13+7+.6,f:()=>{box(13,7.2,0,.9,.6,22,'#ffd34d');for(const[a,c]of[[0,'#ff6a6a'],[.4,'#4aa8d0'],[.8,'#7ac98a'],[.2,'#ffb84d']]){const q=pt(13.4+a*.3,7.5,60+a*18);k.strokeStyle='#888';k.beginPath();const b=pt(13.4,7.5,22);k.moveTo(b[0],b[1]);k.lineTo(q[0],q[1]);k.stroke();ball(13.4+a*.3,7.5,60+a*18,10,c)}}});
 /* khu F: sân khấu, thảm picnic */
 for(const x of[11,12,13])add(x,10);
 O.push({d:12+10+1.6,f:()=>{box(10.9,10.1,0,3.2,1.3,10,'#e8a0c0');box(10.9,10.1,10,3.2,.15,56,'#f6c6dc');box(11,10,10,.12,.12,60,'#fff');box(13.9,10,10,.12,.12,60,'#fff');const q=pt(12.5,10.3,40);emo('🐋',q[0],q[1],26);for(let i=0;i<5;i++){const s=pt(11.2+i*.65,10.25,64);k.fillStyle=i%2?'#ffd34d':'#ff7a5a';k.beginPath();k.arc(s[0],s[1],3,0,7);k.fill()}}});
 O.push({d:9+12.2,f:()=>{const a=pt(9,12,0),b=pt(10.5,12,0),c=pt(10.5,13.2,0),d=pt(9,13.2,0);poly([a,b,c,d],'#f7d9d9','#e8a0a0');for(let i=0;i<3;i++)for(let j=0;j<2;j++){const q=pt(9.25+i*.5,12.25+j*.45,0);k.fillStyle=(i+j)%2?'#e0654f':'#fff';k.fillRect(q[0]-6,q[1]-3,12,6)}emo('🧺',pt(9.75,12.6,8)[0],pt(9.75,12.6,8)[1],16)}});
 O.push({d:30,f:()=>{emo('🪁',pt(13.5,8.5,100)[0]+Math.sin(TT/500)*6,pt(13.5,8.5,100)[1]+Math.cos(TT/600)*4,22)}});
 /* hoa */
 const flowers=[];for(let i=0;i<46;i++){const x=(i*37%150)/10+.3,y=(i*53%150)/10+.3;if(T[Math.floor(y)]&&T[Math.floor(y)][Math.floor(x)]==='g'&&!bl.has(Math.floor(x)+','+Math.floor(y)))flowers.push([x,y,['#ff7a9a','#ffd34d','#ffffff','#b88aff'][i%4]])}
 for(const[x,y,c]of flowers)O.push({d:x+y,f:()=>{const q=pt(x,y,0);k.fillStyle='#4fae5e';k.fillRect(q[0]-1,q[1]-5,2,5);k.fillStyle=c;k.beginPath();k.arc(q[0],q[1]-6,3.2,0,7);k.fill()}});
 /* chặn: bàn ghế phụ đã add; đảm bảo ô xuất phát & cổng trống */
 for(const c of['13,13','14,14','15,15','8,12','9,9'])bl.delete(c);
 const blocked=bl;
 /* nhân vật */
 const npcs=NPCS.map(n=>({...n,li:0,gx:n.x,gy:n.y,ang:0}));
 const hero={gx:13.5,gy:13.5,view:2,path:[],moving:false,after:null},pet={gx:12.6,gy:13.9};
 let last=0,zone='',banner=0,bannerTxt=null;
 const ph=p;
 modal(`<h2>${esc(p.name)} · ${p.zh||''}</h2><canvas id="park3" width="${W}" height="${H}" style="display:block;margin:0 auto;width:min(100%,calc(58vh*${W/H}));border-radius:18px;background:#d8f0ff"></canvas><p class="sub" style="margin:6px 0">Chạm để đi dạo · chạm vào đồ vật hoặc người để học từ 👆 · cổng 公园 ở góc dưới là lối ra</p><div class="row">${p.words?'<button class="btn gold" id="learn">📘 Bắt đầu nhiệm vụ</button>':''}${p.words?'<button class="btn" id="talk2">💬 Trò chuyện</button>':''}<button class="btn" id="leave">Ra phố</button></div>`);
 $('pm').classList.add('wide');$('leave').onclick=closeM;if(p.words)$('learn').onclick=()=>{closeM();openBoard(p)};if($('talk2'))$('talk2').onclick=()=>{closeM();openNpc(p)};
 const c=$('park3');k=c.getContext('2d');
 const tileFree=(x,y)=>x>=0&&y>=0&&x<M&&y<M&&!blocked.has(x+','+y);
 const bfs=(sx,sy,tx,ty)=>{const key=(x,y)=>x+','+y,q=[[sx,sy]],pv={[key(sx,sy)]:null};while(q.length){const[x,y]=q.shift();if(x===tx&&y===ty)break;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(!tileFree(nx,ny)||pv[key(nx,ny)]!==undefined)continue;pv[key(nx,ny)]=[x,y];q.push([nx,ny])}}if(pv[key(tx,ty)]===undefined)return null;const pa=[];let cc=[tx,ty];while(cc){pa.unshift(cc);cc=pv[key(cc[0],cc[1])]}pa.shift();return pa};
 const goNear=(x,y,after)=>{const hx=Math.floor(hero.gx),hy=Math.floor(hero.gy);const cand=[];for(let b=0;b<M;b++)for(let a=0;a<M;a++)if(tileFree(a,b))cand.push([a,b,Math.hypot(a+.5-x,b+.5-y)]);cand.sort((u,v)=>u[2]-v[2]);let bp=null;for(const t of cand.slice(0,10)){if(t[0]===hx&&t[1]===hy){hero.path=[];hero.after=after;return true}const pa=bfs(hx,hy,t[0],t[1]);if(pa&&(!bp||pa.length+t[2]*2<bp.length+bp.d*2)){bp=pa;bp.d=t[2]}}if(bp){hero.path=bp;hero.after=after;return true}return false};
 const say=(zh,py,vi)=>{toast(`${zh}  ${py}\n${vi}`);if(window.rwSay)try{rwSay(zh)}catch(e){}};
 const NPCpos=n=>({x:n.gx,y:n.gy});
 c.onclick=e=>{const r=c.getBoundingClientRect(),sx=(e.clientX-r.left)*W/r.width,sy=(e.clientY-r.top)*H/r.height;
  for(const n of npcs){const q=pt(n.gx,n.gy,0);if(Math.abs(sx-q[0])<24&&sy>q[1]-84&&sy<q[1]+10){goNear(n.gx,n.gy,{npc:n});return}}
  let best=null,bd=1e9;for(const s of SPOTS){const q=pt(s.x,s.y,s.z);const d=Math.hypot(sx-q[0],sy-q[1]);if(d<(s.pr||30)&&d<bd){bd=d;best=s}}
  if(best){goNear(best.x,best.y,{spot:best});return}
  const a=(sx-cam[0])/(TW/2),b=(sy-cam[1])/(TH/2),gx=Math.floor((a+b)/2),gy=Math.floor((b-a)/2);if(!tileFree(gx,gy))return;const pa=bfs(Math.floor(hero.gx),Math.floor(hero.gy),gx,gy);if(pa){hero.path=pa;hero.after=null}};
 const fire=a=>{if(!a)return;if(a.npc){const n=a.npc;if(n.main){closeM();if(p.words)openNpc(p);else say('欢迎来公园！','Huānyíng lái gōngyuán!','Chào mừng đến công viên!');return}const l=n.lines[n.li++%n.lines.length];say(l[0],l[1],`${n.n} (${n.vi}): ${l[2]}`)}else if(a.spot){const s=a.spot;if(s.fo){window.__parkFount=((window.__parkFount||0)+1)%3;say(s.zh,s.py,s.vi+['  · trạng thái: tĩnh','  · trạng thái: phun nước','  · trạng thái: vui vẻ ❤️'][window.__parkFount])}else say(s.zh,s.py,s.vi)}};
 const draw=t=>{const dt=Math.min(.05,(t-(last||t))/1000);last=t;TT=t;
  if(!$('park3')||!$('ovm').classList.contains('on'))return;
  /* di chuyển */
  hero.moving=false;if(hero.path.length){const tx=hero.path[0][0]+.5,ty=hero.path[0][1]+.5,dx=tx-hero.gx,dy=ty-hero.gy,d=Math.hypot(dx,dy),sp=3.2*dt;if(d<=sp){hero.gx=tx;hero.gy=ty;hero.path.shift()}else{hero.gx+=dx/d*sp;hero.gy+=dy/d*sp;hero.moving=true;const s2=(dx-dy)*TW/2,t2=(dx+dy)*TH/2;hero.view=Math.abs(s2)>Math.abs(t2)*1.3?(s2>0?1:3):(t2<0?2:0)}}
  else if(hero.after){const a=hero.after;hero.after=null;fire(a)}
  if(!hero.path.length&&Math.floor(hero.gx)>=15&&Math.floor(hero.gy)>=15){closeM();return}
  const tg=[hero.gx-.7,hero.gy+.4];pet.gx+=(tg[0]-pet.gx)*Math.min(1,dt*3);pet.gy+=(tg[1]-pet.gy)*Math.min(1,dt*3);
  for(const n of npcs)if(n.jog){n.ang+=dt*.42;n.gx=8+Math.cos(n.ang)*4.8;n.gy=8+Math.sin(n.ang)*4.8;n.mv=true;n.vw=Math.cos(n.ang)>0&&Math.sin(n.ang)>0?0:1}
  /* camera */
  const hs=P2(hero.gx,hero.gy,0);cam[0]=Math.max(W-542,Math.min(542,W/2-hs[0]));cam[1]=Math.max(-40,Math.min(130,H/2+20-hs[1]));
  /* vùng */
  let zz=null;for(const z of ZONES)if(z[4](hero.gx,hero.gy)){zz=z;break}
  if(zz&&zz[0]!==zone){zone=zz[0];banner=3;bannerTxt=zz}else if(!zz)zone='';
  banner=Math.max(0,banner-dt);
  /* vẽ */
  const g=k.createLinearGradient(0,0,0,H);g.addColorStop(0,sc.sky[0]);g.addColorStop(1,sc.sky[1]);k.fillStyle=g;k.fillRect(0,0,W,H);
  k.fillStyle='rgba(255,255,255,.8)';for(const[cx,cy,s]of[[120,60,1],[430,36,1.3],[690,80,.9]]){const x=(cx+t/60*s)%1000-100;for(const[a,b,r]of[[0,0,22],[24,6,18],[-22,8,16],[8,-10,16]]){k.beginPath();k.arc(x+a*s,cy+b*s,r*s,0,7);k.fill()}}
  k.fillStyle='rgba(150,175,205,.55)';for(let i=0;i<14;i++){const bw=34+(i*17%26),bh=50+(i*29%70);k.fillRect(i*62-10,170-bh+cam[1]*.15,bw,bh+200)}
  /* mép đảo */
  poly([pt(0,M,0),pt(M,M,0),pt(M,M,-18),pt(0,M,-18)],'#7a5a3a');poly([pt(M,0,0),pt(M,M,0),pt(M,M,-18),pt(M,0,-18)],'#5f452c');
  for(let y=0;y<M;y++)for(let x=0;x<M;x++){const ty=T[y][x];let col;if(ty==='g')col=(x+y)%2?sc.g1:sc.g2;else if(ty==='P')col=(x+y)%2?'#f3e6c8':'#ead9b6';else if(ty==='p')col='#e8d9b0';else col=null;
   if(ty==='w'||ty==='b'){const wv=Math.sin(t/500+x*.9+y*.7)*.06;col=mix('#7fd0ea','#ffffff',.1+wv)}
   poly([pt(x,y,0),pt(x+1,y,0),pt(x+1,y+1,0),pt(x,y+1,0)],col,null);k.strokeStyle=col;k.lineWidth=1;k.stroke()}
  /* vật thể + người */
  const list=O.filter(o=>o.f).map(o=>o);
  for(const n of npcs)list.push({d:n.gx+n.gy+.35,f:()=>{const q=pt(n.gx,n.gy,0);drawPerson(k,q[0],q[1],{variant:n.v,scale:n.sc||.9,view:n.jog?n.vw:0,time:t,moving:!!n.mv});if(!n.jog&&!n.sc){}if(n.main||n.lines){const f=pt(n.gx,n.gy,0);emo(n.main?'❗':'💬',f[0],f[1]-(n.sc?60:78)+Math.sin(t/300)*2,15)}}});
  const hz=(hero.gy>=11&&hero.gy<12&&hero.gx>=1&&hero.gx<7)?bz(hero.gx):0;
  list.push({d:hero.gx+hero.gy+.35,f:()=>{const q=pt(hero.gx,hero.gy,hz);drawPerson(k,q[0],q[1],{hero:true,time:t,scale:.95,view:hero.view,moving:hero.moving})}});
  list.push({d:pet.gx+pet.gy+.5,f:()=>{const q=pt(pet.gx,pet.gy,0);if(window.drawPetAt)drawPetAt(k,q[0],q[1]-58+Math.sin(t/420)*4,1,40,null,true)}});
  list.sort((a,b)=>a.d-b.d);for(const o of list)o.f();
  /* banner khu */
  if(banner>0&&bannerTxt){k.globalAlpha=Math.min(1,banner);rr2(W/2-190,12,380,50,14,'rgba(255,255,255,.92)');txt(`${bannerTxt[1]}  ${bannerTxt[0]} · ${bannerTxt[2]}`,W/2,29,15,'#2a4a6a');txt(bannerTxt[3],W/2,48,13,'#c0392b');k.globalAlpha=1}
  requestAnimationFrame(draw)};
 function rr2(x,y,w,h,r,fill){k.beginPath();k.roundRect?k.roundRect(x,y,w,h,r):k.rect(x,y,w,h);k.fillStyle=fill;k.fill();k.strokeStyle='#8ac';k.lineWidth=2;k.stroke()}
 requestAnimationFrame(draw);window.__park={hero,blocked,npcs,T,tileFree,pt,SPOTS}}
const old=window.enterRoom;
window.enterRoom=function(p){if(p&&p.id==='congvien')return enterPark(p);return old.apply(this,arguments)};
})();
