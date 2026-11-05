/* Công viên 公园 — cảnh 3D thật (three.js): đi dạo, 6 khu, NPC 3D */
(function(){
let T=null;
const loadT=()=>T?Promise.resolve(T):import('./vendor/three.module.min.js').then(m=>(T=m));

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
 {k:'B',ic:'🛝',vi:'Khu vui chơi trẻ em',zh:'儿童乐园',py:'értóng lèyuán',c:[-17,-11],acts:['play'],ds:'Cầu trượt, xích đu, thú nhún cá voi và hố cát cho các bé.'},
 {k:'C',ic:'🏮',vi:'Chòi nghỉ',zh:'凉亭',py:'liángtíng',c:[0,-19],acts:['gaz'],ds:'Chòi mái đỏ, uống trà và trò chuyện.'},
 {k:'E',ic:'☂️',vi:'Khu ghế & bàn ngoài trời',zh:'露天咖啡座',py:'lùtiān kāfēizuò',c:[17,-11],acts:['ice','bal'],ds:'Bàn dù, quầy kem và xe bóng bay.'},
 {k:'D',ic:'🪷',vi:'Hồ sen & cầu đỏ',zh:'荷花池',py:'héhuā chí',c:[-17,12],acts:['pond'],ds:'Hồ sen, lá sen và chiếc cầu đỏ.'},
 {k:'A',ic:'⛲',vi:'Quảng trường đài phun cá voi',zh:'喷泉广场',py:'pēnquán guǎngchǎng',c:[0,0],acts:['fount'],ds:'Đài phun cá voi ở giữa công viên.'},
 {k:'F',ic:'🎪',vi:'Bãi cỏ & sự kiện',zh:'草坪舞台',py:'cǎopíng wǔtái',c:[17,12],acts:['stage'],ds:'Sân khấu mini, thảm picnic, thả diều.'}];
const ACTN={play:'🛝 Bài tập khu vui chơi',gaz:'🏮 Bài tập chòi nghỉ',pond:'🪷 Bài tập hồ sen',ice:'🍦 Gọi kem',bal:'🎈 Màu bóng bay',fount:'⛲ Bài tập đài phun',stage:'🎤 Bài tập sân khấu'};
const WORDS={B:'play',C:'gaz',D:'pond',E:'ice',F:'stage',A:'fount'};
const STAND={A:[0,7.2],B:[-11.5,-7.5],C:[0,-12],D:[-9.5,8],E:[11.5,-7.5],F:[11,9]};
const NPCS=[
 {id:'mgr',n:'林先生',vi:'Quản lý công viên',main:1,pos:[3.5,24],look:{hair:'#2b2b33',skin:'#f2c9a5',top:'#27406b',bot:'#27406b',cap:'#27406b',kind:'cap'},lines:[['欢迎来公园！','Huānyíng lái gōngyuán!','Chào mừng đến công viên!']]},
 {id:'gar',n:'园丁',vi:'Nhân viên chăm cây',pos:[-6,-4],look:{hair:'#6a4a2a',skin:'#f0c4a0',top:'#4f8a3c',bot:'#3d6f30',cap:'#e8cf84',kind:'straw',item:'can'},lines:[['这些花开得真漂亮。','Zhèxiē huā kāi de zhēn piàoliang.','Những bông hoa này nở đẹp quá.'],['我每天给花浇水。','Wǒ měitiān gěi huā jiāo shuǐ.','Ngày nào tôi cũng tưới hoa.']]},
 {id:'gd',n:'导游',vi:'Hướng dẫn viên',pos:[6,5],look:{hair:'#5a3622',skin:'#f6d2b4',top:'#f08aa8',bot:'#f08aa8',kind:'long',item:'flag',dress:1},lines:[['请跟我来，这边走。','Qǐng gēn wǒ lái, zhè biān zǒu.','Xin đi theo tôi, lối này.'],['前面是喷泉广场。','Qiánmiàn shì pēnquán guǎngchǎng.','Phía trước là quảng trường đài phun nước.']]},
 {id:'bk',n:'街头艺人',vi:'Nghệ sĩ đường phố',pos:[13,-4],look:{hair:'#4a3a2a',skin:'#f0c4a0',top:'#c9783a',bot:'#4a5a8a',cap:'#8a5a3a',kind:'beret',item:'guitar'},lines:[['我给大家唱一首歌。','Wǒ gěi dàjiā chàng yī shǒu gē.','Tôi hát tặng mọi người một bài.'],['谢谢你听我唱歌！','Xièxie nǐ tīng wǒ chànggē!','Cảm ơn bạn đã nghe tôi hát!']]},
 {id:'jog',n:'跑步的人',vi:'Người tập thể dục',pos:[-4,8],jog:1,look:{hair:'#5a3a2a',skin:'#f4cfae',top:'#a77bd8',bot:'#6a4aa8',kind:'pony',band:'#e8a0c8'},lines:[['早上跑步对身体好。','Zǎoshang pǎobù duì shēntǐ hǎo.','Chạy bộ buổi sáng tốt cho sức khỏe.']]},
 {id:'fa',n:'爸爸',vi:'Gia đình đi chơi',pos:[12.5,13],look:{hair:'#2a2420',skin:'#f0c4a0',top:'#f4f4f4',bot:'#2a3550',kind:'short'},lines:[['今天我们来野餐。','Jīntiān wǒmen lái yěcān.','Hôm nay cả nhà đi dã ngoại.'],['孩子很喜欢这里。','Háizi hěn xǐhuan zhèlǐ.','Bé rất thích ở đây.']]},
 {id:'kid',n:'小朋友',vi:'Bé đi chơi',pos:[13.8,13.4],sc:.68,look:{hair:'#2a2420',skin:'#f4cfae',top:'#ffd34d',bot:'#4a6aa8',cap:'#f2d58a',kind:'straw'},lines:[['我想吃冰淇淋！','Wǒ xiǎng chī bīngqílín!','Con muốn ăn kem!']]},
 {id:'stu',n:'参观的学生',vi:'Học sinh tham quan',pos:[-12,3],look:{hair:'#1f1f26',skin:'#f0c4a0',top:'#355fa8',bot:'#27406b',cap:'#355fa8',kind:'cap',item:'bag'},lines:[['我们来公园参观。','Wǒmen lái gōngyuán cānguān.','Chúng em đến công viên tham quan.'],['这里的花真多！','Zhèlǐ de huā zhēn duō!','Ở đây nhiều hoa quá!']]}];
function season(){let s='xuan';try{s=window.curSeason?curSeason():'xuan'}catch(e){}return({xuan:{g1:'#9fd88a',g2:'#92cf7c',lf:'#5cb85c',ch:'#ffb3cf',sn:0,sky:['#a8dcff','#e8f7ff']},ha:{g1:'#8fd070',g2:'#82c464',lf:'#3f9a4a',ch:'#4fae5e',sn:0,sky:['#8fd2ff','#e4f5ff']},thu:{g1:'#d8c47c',g2:'#cdb66c',lf:'#d9a53a',ch:'#f08a3c',sn:0,sky:['#ffd9b0','#fff1de']},dong:{g1:'#eef5f1',g2:'#e0ece6',lf:'#8fbfa2',ch:'#fdfbfc',sn:1,sky:['#c9dcee','#f3f8fc']}})[s]||{}}
const hash=(a,b)=>{let h=(a*73856093)^(b*19349663);h=(h^(h>>>13))*1274126177;return((h^(h>>>16))>>>0)/4294967295};

async function enterPark(p){
 await loadT();const THREE=T;
 const old0=document.getElementById('parkov');if(old0)old0.remove();const tok=window.__parkTok={};
 const sc=season(),dark=document.documentElement.dataset.theme==='dark';
 const host=$('ovm').parentNode,ovp=document.createElement('div');ovp.id='parkov';
 ovp.style.cssText='position:absolute;inset:0;z-index:8;overflow:hidden;background:'+sc.sky[0]+';touch-action:none;user-select:none';
 ovp.innerHTML=`<canvas id="park3" style="position:absolute;inset:0;width:100%;height:100%;display:block"></canvas><canvas id="pmm" width="240" height="240" style="position:absolute;right:10px;top:96px;width:120px;height:120px;border:3px solid #1d4a3a;border-radius:14px;background:rgba(255,255,255,.8)"></canvas>
 <div style="position:absolute;left:0;right:0;top:0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px"><button class="btn" id="leave">← Ra phố</button><b style="font-size:20px;color:#1d4a3a;background:rgba(255,255,255,.85);border-radius:14px;padding:3px 12px">🌳 公园 · Công viên</b><span id="pkChips" style="display:flex;gap:6px;flex-wrap:wrap"></span><span style="flex:1"></span><span class="pill" id="pkCoin">🪙 0</span>${p.words?'<button class="btn gold" id="learn">📘 Nhiệm vụ</button><button class="btn" id="talk2">💬</button>':''}</div>
 <div style="position:absolute;right:12px;bottom:70px;display:flex;flex-direction:column;gap:8px"><button class="btn" id="zin" style="width:46px;height:46px;font-size:24px;border-radius:50%">+</button><button class="btn" id="zout" style="width:46px;height:46px;font-size:24px;border-radius:50%">−</button></div>
 <div style="position:absolute;left:0;right:0;bottom:8px;text-align:center;pointer-events:none"><span style="display:inline-block;background:rgba(255,255,255,.92);border-radius:14px;padding:6px 14px;font-size:13px;font-weight:700;color:#2a4a6a">Chạm để đi · kéo để xoay · lăn chuột/chụm để zoom · phím WASD · ❗ khu có bài tập · cổng 公园 phía dưới là lối ra</span></div>`;
 host.appendChild(ovp);
 const exitPark=()=>{window.__parkTok=null;try{R.dispose()}catch(e){}ovp.remove()};
 $('leave').onclick=exitPark;if(p.words)$('learn').onclick=()=>{exitPark();openBoard(p)};if($('talk2'))$('talk2').onclick=()=>{exitPark();openNpc(p)};
 const coinEl=()=>{const e=$('pkCoin');if(e)e.textContent='🪙 '+(ST.coins||0)};coinEl();window.__parkCoin=coinEl;
 const cv=$('park3');
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:false});R.setPixelRatio(Math.min(2,window.devicePixelRatio||1));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=dark?.75:1.05;
 const scene=new THREE.Scene();
 const skyC=document.createElement('canvas');skyC.width=4;skyC.height=256;{const g=skyC.getContext('2d'),gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,dark?'#16224a':sc.sky[0]);gr.addColorStop(1,dark?'#3a4a7a':sc.sky[1]);g.fillStyle=gr;g.fillRect(0,0,4,256)}
 const skyT=new THREE.CanvasTexture(skyC);skyT.colorSpace=THREE.SRGBColorSpace;scene.background=skyT;scene.fog=new THREE.Fog(dark?'#3a4a7a':sc.sky[1],150,330);
 const cam=new THREE.PerspectiveCamera(42,1,.5,400);
 const hemi=new THREE.HemisphereLight(dark?'#8aa0e0':'#ffffff',dark?'#3a3a5a':'#8fb08a',dark?.7:1.35);scene.add(hemi);
 const sun=new THREE.DirectionalLight(dark?'#a0b4ff':'#fff4dc',dark?.8:2.4);sun.position.set(-22,38,16);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);const sh=sun.shadow.camera;sh.left=-36;sh.right=36;sh.top=36;sh.bottom=-36;sh.near=5;sh.far=120;sun.shadow.bias=-.0006;sun.shadow.normalBias=.04;scene.add(sun);
 /* ---------- tiện ích ---------- */
 const mats={};const M=(c,o)=>{const key=c+JSON.stringify(o||{});return mats[key]||(mats[key]=new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.72,metalness:0},o||{})))};
 const add=(par,geo,mat,x,y,z,o)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=!(o&&o.ns);m.receiveShadow=!(o&&o.nr);if(o&&o.r)m.rotation.set(o.r[0]||0,o.r[1]||0,o.r[2]||0);if(o&&o.s)m.scale.set(o.s[0],o.s[1],o.s[2]);par.add(m);return m};
 const G=(x,y,z)=>{const g=new THREE.Group();g.position.set(x||0,y||0,z||0);scene.add(g);return g};
 const cyl=(a,b,h,seg)=>new THREE.CylinderGeometry(a,b,h,seg||20),box=(w,h,d)=>new THREE.BoxGeometry(w,h,d),sph=(r,ws,hs)=>new THREE.SphereGeometry(r,ws||20,hs||14);
 const blocked=new Set(),NC=60,OFF=30;const cellKey=(x,z)=>Math.floor(x+OFF)+','+Math.floor(z+OFF);
 const blockC=(x,z,r)=>{for(let i=Math.floor(x-r);i<=Math.ceil(x+r);i++)for(let j=Math.floor(z-r);j<=Math.ceil(z+r);j++)if(Math.hypot(i+.5-x,j+.5-z)<=r+.15)blocked.add((i+OFF)+','+(j+OFF))};
 const blockR=(x0,z0,x1,z1)=>{for(let i=Math.floor(x0);i<Math.ceil(x1);i++)for(let j=Math.floor(z0);j<Math.ceil(z1);j++)blocked.add((i+OFF)+','+(j+OFF))};
 const canvasTex=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t};
 const rrect=(g,x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
 const spriteTex=t=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false,depthWrite:false}));s.renderOrder=10;return s};
 const emojiSprite=(e,sz)=>{const t=canvasTex(128,128,(g)=>{g.font='96px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(e,64,70)});const s=spriteTex(t);s.scale.set(sz,sz,1);return s};
 const labelSprite=(zh,py)=>{const t=canvasTex(512,128,(g)=>{g.font='800 40px "Noto Serif CJK SC","Songti SC","Noto Sans",serif';const w1=g.measureText(zh).width;g.font='600 28px "Noto Sans",sans-serif';const w2=g.measureText(py).width;const w=Math.min(500,Math.max(w1,w2)+44);rrect(g,256-w/2,10,w,108,28);g.fillStyle='rgba(255,255,255,.95)';g.fill();g.lineWidth=5;g.strokeStyle='#1d4a3a';g.stroke();g.textAlign='center';g.textBaseline='middle';g.font='800 40px "Noto Serif CJK SC","Songti SC","Noto Sans",serif';g.fillStyle='#8a2218';g.fillText(zh,256,50);g.font='600 26px "Noto Sans",sans-serif';g.fillStyle='#1d3a2f';g.fillText(py,256,92)});const s=spriteTex(t);s.scale.set(5.2,1.3,1);return s};
 /* ---------- nền ---------- */
 const meadow=add(scene,new THREE.PlaneGeometry(600,600),M(sc.sn?'#e8f0ec':'#b9e2a0'),0,-.05,0,{r:[-Math.PI/2,0,0],ns:1});
 const grassT=canvasTex(128,128,(g)=>{g.fillStyle=sc.g1;g.fillRect(0,0,128,128);g.fillStyle=sc.g2;g.fillRect(0,0,64,64);g.fillRect(64,64,64,64)});grassT.wrapS=grassT.wrapT=THREE.RepeatWrapping;grassT.repeat.set(15,15);grassT.magFilter=THREE.NearestFilter;
 const ground=add(scene,new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({map:grassT,roughness:.9}),0,0,0,{r:[-Math.PI/2,0,0],ns:1});
 add(scene,box(61.6,.6,61.6),M('#7a5a3a'),0,-.35,0,{ns:1});
 const cobbleT=canvasTex(128,128,(g)=>{g.fillStyle=sc.sn?'#eae6dc':'#efe0bc';g.fillRect(0,0,128,128);g.strokeStyle='rgba(160,130,90,.45)';g.lineWidth=3;for(let i=0;i<=128;i+=32){g.beginPath();g.moveTo(i,0);g.lineTo(i,128);g.moveTo(0,i);g.lineTo(128,i);g.stroke()}});cobbleT.wrapS=cobbleT.wrapT=THREE.RepeatWrapping;
 const cobbleM=(w,h)=>{const t=cobbleT.clone();t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(w/4,h/4);return new THREE.MeshStandardMaterial({map:t,roughness:.9})};
 const pathSeg=(x0,z0,x1,z1,w)=>{const L=Math.hypot(x1-x0,z1-z0),m=add(scene,new THREE.PlaneGeometry(w,L),cobbleM(w,L),(x0+x1)/2,.03,(z0+z1)/2,{r:[-Math.PI/2,0,0],ns:1});m.rotation.z=Math.atan2(x1-x0,z1-z0)*-1;m.rotation.order='YXZ';m.rotation.set(-Math.PI/2,0,0);m.rotation.y=0;m.rotateOnWorldAxis(new THREE.Vector3(0,1,0),Math.atan2(x1-x0,z1-z0));return m};
 const disc=(x,z,r,mat,y)=>add(scene,new THREE.CircleGeometry(r,48),mat,x,y||.04,z,{r:[-Math.PI/2,0,0],ns:1});
 pathSeg(0,27,0,0,4.2);for(const z of ZONES)if(z.k!=='A')pathSeg(0,0,z.c[0],z.c[1],2.8);
 disc(0,0,9.2,cobbleM(18,18),.05);
 /* viền + hàng rào */
 const fenceM=M('#ffffff');
 for(let i=-29;i<=29;i+=1.4){for(const[x,z,r]of[[i,-29.6,0],[i,29.6,0],[-29.6,i,1],[29.6,i,1]]){if(z===29.6&&Math.abs(x)<3.4)continue;add(scene,box(r?.12:.9,1,r?.9:.12),fenceM,x,.5,z);}}
 for(const z of[-29.6,29.6]){if(z>0){add(scene,box(26,.12,.14),fenceM,-16.9,.75,z);add(scene,box(26,.12,.14),fenceM,16.9,.75,z)}else add(scene,box(60,.12,.14),fenceM,0,.75,z)}
 for(const x of[-29.6,29.6])add(scene,box(.14,.12,60),fenceM,x,.75,0);
 /* cổng vòm */
 const gateG=G(0,0,29.6);{const wood=M('#c98f3a'),stone=M('#e1d3ab');for(const sx of[-1,1]){add(gateG,box(1.3,5.2,1.3),stone,sx*3.4,2.6,0);add(gateG,box(1.7,.4,1.7),M('#c9b88a'),sx*3.4,5.3,0);add(gateG,sph(.45,12,10),M('#f2c14e',{emissive:'#f2c14e',emissiveIntensity:.5}),sx*3.4,5.75,0)}
  const arch=add(gateG,new THREE.TorusGeometry(3.4,.34,10,28,Math.PI),wood,0,4.7,0);
  const signT=canvasTex(512,256,(g)=>{rrect(g,8,8,496,240,44);g.fillStyle='#8a5a1c';g.fill();g.lineWidth=14;g.strokeStyle='#e6c25a';g.stroke();g.fillStyle='#ffe28a';g.font='800 150px "Noto Serif CJK SC","Songti SC",serif';g.textAlign='center';g.textBaseline='middle';g.fillText('公园',256,134)});
  add(gateG,new THREE.PlaneGeometry(3.6,1.8),new THREE.MeshStandardMaterial({map:signT,roughness:.8}),0,6.4,.05,{ns:1});
  const sg2=add(gateG,new THREE.PlaneGeometry(3.6,1.8),new THREE.MeshStandardMaterial({map:signT,roughness:.8}),0,6.4,-.05,{ns:1,r:[0,Math.PI,0]});
  for(const sx of[-1,1]){const bannerT=canvasTex(128,256,(g)=>{g.fillStyle='#4aa8d0';g.fillRect(0,0,128,256);g.strokeStyle='#fff';g.lineWidth=8;g.strokeRect(6,6,116,244);g.font='80px "Apple Color Emoji","Noto Color Emoji",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🐋',64,128)});add(gateG,new THREE.PlaneGeometry(1.2,2.4),new THREE.MeshStandardMaterial({map:bannerT,side:THREE.DoubleSide}),sx*5.6,3.4,.1,{ns:1});add(gateG,cyl(.07,.07,5.2,8),M('#44403c'),sx*5.6,2.6,.1)}}
 blockR(-4.4,28.6,-2.3,30);blockR(2.3,28.6,4.4,30);
 /* cây */
 const treeKinds=['round','cherry','round','tall','cherry','willow'];
 const leafM=M(sc.lf,{roughness:.8}),cherM=M(sc.ch,{roughness:.8}),trunkM=M('#8a6244');
 const makeTree=(x,z,s,kind)=>{const g=G(x,0,z);g.scale.setScalar(s*.72);const cm=kind==='cherry'?cherM:leafM;
  if(kind==='willow'){add(g,cyl(.28,.4,3.2,8),trunkM,0,1.6,0);for(let i=0;i<10;i++){const a=i/10*6.283;add(g,cyl(.05,.05,2.6,5),M('#9acd6a'),Math.cos(a)*1.5,2.3,Math.sin(a)*1.5,{ns:1,r:[Math.sin(a)*.2,0,-Math.cos(a)*.2]})}add(g,sph(1.8,14,10),M('#a8d878'),0,3.7,0,{s:[1,.62,1]})}
  else{add(g,cyl(.28,.42,2.4,8),trunkM,0,1.2,0);const h=kind==='tall'?4.6:3.6;add(g,sph(1.6,16,12),cm,0,h,0);add(g,sph(1.2,14,10),cm,-1.0,h-.6,.4);add(g,sph(1.2,14,10),cm,1.0,h-.5,-.3);add(g,sph(1.0,14,10),cm,.2,h+1.0,.3);if(sc.sn){add(g,sph(1.35,14,8,0,6.283,0,1.1),M('#ffffff'),0,h+.45,0,{ns:1})}}
  blockC(x,z,.55*s);return g};
 const okPos=(x,z,minZone)=>{if(Math.hypot(x,z)<10.6)return false;if(Math.abs(x)<3.4&&z>8)return false;for(const zn of ZONES){if(zn.k==='A')continue;const d=Math.hypot(x-zn.c[0],z-zn.c[1]);if(d<(zn.k==='D'?9:8.2))return false;const a=zn.c,L=Math.hypot(a[0],a[1]),t=Math.max(0,Math.min(1,(x*a[0]+z*a[1])/(L*L))),px=a[0]*t,pz=a[1]*t;if(Math.hypot(x-px,z-pz)<2.6)return false}return true};
 let tn=0;for(let i=0;i<200&&tn<46;i++){const x=(hash(i,3)-.5)*56,z=(hash(i,9)-.5)*56;if(!okPos(x,z))continue;if(Math.abs(x)>28||Math.abs(z)>28)continue;makeTree(x,z,.85+hash(i,5)*.5,treeKinds[Math.floor(hash(i,7)*6)]);tn++}
 /* hoa + bụi */
 {const fg=new THREE.SphereGeometry(.1,8,6),fm=new THREE.MeshStandardMaterial({roughness:.7}),NF=260,im=new THREE.InstancedMesh(fg,fm,NF),col=new THREE.Color(),mm=new THREE.Matrix4();let n=0;for(let i=0;i<900&&n<NF;i++){const x=(hash(i,21)-.5)*57,z=(hash(i,22)-.5)*57;if(!okPos(x,z)&&hash(i,23)>.0)continue;mm.makeTranslation(x,.1,z);im.setMatrixAt(n,mm);col.set(['#ff7a9a','#ffd34d','#ffffff','#b88aff','#ff9a5a'][i%5]);im.setColorAt(n,col);n++}im.count=n;im.castShadow=false;scene.add(im)}
 for(let i=0;i<34;i++){const x=(hash(i,31)-.5)*56,z=(hash(i,32)-.5)*56;if(!okPos(x,z))continue;const g=G(x,0,z);add(g,sph(.9,12,9),M(sc.sn?'#a8c8b4':'#4fa85a'),0,.5,0,{s:[1.3,.8,1]});if(!sc.sn)for(let j=0;j<5;j++)add(g,sph(.16,8,6),M(['#ff7a9a','#ffd34d','#fff'][j%3]),Math.cos(j*1.3)*.9,.9,Math.sin(j*1.3)*.5,{ns:1});blockC(x,z,.8)}
 /* đèn + ghế */
 const lamps=[];const makeLamp=(x,z)=>{const g=G(x,0,z);g.scale.setScalar(.82);add(g,cyl(.1,.14,3.4,8),M('#3a3835'),0,1.7,0);add(g,cyl(.3,.2,.2,8),M('#3a3835'),0,3.4,0);const bulb=add(g,sph(.34,12,10),M('#ffe9a8',{emissive:'#ffd774',emissiveIntensity:dark?2.2:.55}),0,3.75,0,{ns:1});add(g,cyl(.05,.4,.5,8),M('#3a3835'),0,4.2,0);if(dark){const L=new THREE.PointLight('#ffd98a',18,10,2);L.position.set(0,3.8,0);g.add(L)}blockC(x,z,.3);return g};
 for(const[x,z]of[[-6,-6],[6,-6],[-6,6],[6,6],[0,-9.6],[0,10],[-12,-1.4],[12,-1.4],[-12,4],[12,4],[-2.8,16],[2.8,16],[-2.8,24],[2.8,24],[-9,-12],[9,-12],[9,16],[-9,16],[-6.2,-21],[6.2,-21]])makeLamp(x,z);
 const makeBench=(x,z,ry)=>{const g=G(x,0,z);g.rotation.y=ry||0;const w=M('#c98f55'),d=M('#8a5a34');add(g,box(2.2,.16,.7),w,0,.55,0);add(g,box(2.2,.5,.12),w,0,.95,-.32,{r:[-.12,0,0]});for(const sx of[-.9,.9])add(g,box(.12,.55,.6),d,sx,.28,0);const c=Math.cos(ry||0),s=Math.sin(ry||0);blockC(x,z,1.0);return g};
 for(const[x,z,r]of[[-7.2,0,Math.PI/2],[7.2,0,-Math.PI/2],[0,-7.2,0],[-5,5.4,2.4],[5,5.4,-2.4],[-3.2,-12,0],[3.2,-12,0]])makeBench(x,z,r);
 /* ---------- NHÂN VẬT ---------- */
 const faceMat=M('#2a2a33',{roughness:.4}),white=M('#ffffff',{roughness:.3}),cheek=M('#ff9bb0',{roughness:.9,transparent:true,opacity:.7});
 function chibi(L,scale){const root=new THREE.Group();const body=new THREE.Group();root.add(body);
  const skin=M(L.skin||'#f2c9a5'),topM=M(L.top||'#ff9ab0'),botM=M(L.bot||'#555'),hairM=M(L.hair||'#3a2a20',{roughness:.55});
  /* chân */
  const legs=[];for(const sx of[-1,1]){const lg=new THREE.Group();lg.position.set(sx*.14,.52,0);body.add(lg);add(lg,cyl(.085,.08,.4,10),L.dress?skin:botM,0,-.2,0);add(lg,box(.2,.12,.3),M('#f4f1ea'),0,-.43,.05);legs.push(lg)}
  /* thân */
  add(body,cyl(.2,.27,.55,16),topM,0,.78,0);if(L.dress)add(body,cyl(.22,.4,.34,18),topM,0,.56,0);
  /* tay */
  const arms=[];for(const sx of[-1,1]){const am=new THREE.Group();am.position.set(sx*.3,.95,0);body.add(am);add(am,cyl(.07,.065,.4,8),topM,0,-.18,0);add(am,sph(.075,8,6),skin,0,-.4,0);arms.push(am)}
  /* đầu */
  const head=new THREE.Group();head.position.y=1.52;body.add(head);add(head,sph(.42,24,18),skin,0,0,0);
  for(const sx of[-1,1]){add(head,sph(.065,10,8),faceMat,sx*.15,-.02,.37,{ns:1,s:[1,1.25,.5]});add(head,sph(.022,6,5),white,sx*.15+.02,.02,.4,{ns:1});add(head,sph(.07,8,6),cheek,sx*.25,-.14,.34,{ns:1,s:[1,.6,.4]})}
  add(head,new THREE.TorusGeometry(.05,.012,6,12,Math.PI),faceMat,0,-.15,.4,{ns:1,r:[0,0,Math.PI]});
  const kind=L.kind||'short';
  if(kind==='long'){add(head,sph(.46,24,16,0,6.283,0,Math.PI*.58),hairM,0,.04,-.04,{r:[-.35,0,0]});add(head,cyl(.3,.2,.9,12),hairM,0,-.32,-.28);add(head,sph(.46,16,10,0,6.283,0,1.15),hairM,0,.02,.02,{s:[1,.5,1],ns:1,r:[.1,0,0]})}
  else if(kind==='pony'){add(head,sph(.45,24,16,0,6.283,0,Math.PI*.55),hairM,0,.05,-.03,{r:[-.3,0,0]});add(head,sph(.16,12,10),hairM,0,.12,-.48);add(head,cyl(.1,.04,.6,8),hairM,0,-.2,-.55,{r:[.3,0,0]});add(head,new THREE.TorusGeometry(.43,.03,6,24),M(L.band||'#e8a0c8'),0,.2,0,{ns:1,r:[1.35,0,0]})}
  else{add(head,sph(.445,24,16,0,6.283,0,Math.PI*.52),hairM,0,.05,-.02,{r:[-.25,0,0]})}
  if(kind==='cap'||kind==='straw'||kind==='beret'){const capM=M(L.cap||'#335');if(kind==='straw'){add(head,cyl(.7,.7,.06,24),capM,0,.3,0);add(head,cyl(.36,.4,.28,20),capM,0,.45,0);add(head,cyl(.37,.37,.05,20),M('#d9534f'),0,.36,0,{ns:1})}else if(kind==='beret'){add(head,cyl(.45,.38,.14,20),capM,0,.4,-.02,{r:[-.2,0,.15]});add(head,sph(.05,6,5),capM,0,.5,0)}else{add(head,sph(.45,20,12,0,6.283,0,Math.PI*.5),capM,0,.12,0,{r:[-.15,0,0]});add(head,cyl(.3,.3,.05,16),capM,0,.18,.36,{r:[.15,0,0],s:[1,1,.6]})}}
  if(L.glasses){for(const sx of[-1,1])add(head,new THREE.TorusGeometry(.12,.016,6,18),M('#2a2a33'),sx*.16,0,.395,{ns:1});add(head,box(.1,.014,.014),M('#2a2a33'),0,.02,.4,{ns:1})}
  if(L.clip)add(head,sph(.07,8,6),M('#6ab4ff',{emissive:'#6ab4ff',emissiveIntensity:.25}),.32,.28,.22,{ns:1});
  /* vật phẩm */
  if(L.item==='guitar'){const gt=new THREE.Group();gt.position.set(.1,.7,.32);gt.rotation.set(0,0,.5);body.add(gt);add(gt,cyl(.3,.3,.1,16),M('#b8793a'),0,0,0,{r:[Math.PI/2,0,0]});add(gt,cyl(.04,.04,.9,6),M('#5a3a22'),.45,.3,0,{r:[0,0,-.9]});arms[0].rotation.x=-.9;arms[1].rotation.x=-1.1;L._hold=1}
  if(L.item==='flag'){const f=new THREE.Group();f.position.set(.42,.6,.08);arms[1].add(f);f.position.set(0,-.4,.05);add(f,cyl(.02,.02,1.6,6),M('#8a6a3a'),0,.7,0);add(f,new THREE.PlaneGeometry(.55,.38),new THREE.MeshStandardMaterial({color:'#ffd34d',side:THREE.DoubleSide}),.28,1.3,0,{ns:1});arms[1].rotation.z=-.25}
  if(L.item==='can'){const c=new THREE.Group();arms[1].add(c);c.position.set(.02,-.42,.12);add(c,cyl(.14,.16,.22,12),M('#4aa8d0'),0,0,0);add(c,cyl(.03,.03,.3,6),M('#4aa8d0'),.2,.06,0,{r:[0,0,-.9]})}
  if(L.item==='bag')add(body,box(.4,.5,.2),M('#d9534f'),0,.82,-.28);
  body.scale.setScalar(1);root.scale.setScalar(scale||1);
  root.userData={legs,arms,body,head,L};root.traverse(o=>{if(o.isMesh)o.castShadow=true});return root}
 function animChibi(c,t,moving,speed){const u=c.userData,s=moving?Math.sin(t*(speed||9)):0;u.legs[0].rotation.x=s*.7;u.legs[1].rotation.x=-s*.7;if(!u.L._hold){u.arms[0].rotation.x=-s*.6*(moving?1:0);u.arms[1].rotation.x=s*.6*(moving?1:0);if(!moving){u.arms[0].rotation.x=0;u.arms[1].rotation.x=u.L.item==='flag'?Math.sin(t*3)*.15-.2:0}}u.body.position.y=moving?Math.abs(Math.sin(t*(speed||9)))*.07:Math.sin(t*2)*.01;u.head.rotation.z=Math.sin(t*1.7)*.03}
 /* cá voi (thú cưng + đài phun) */
 function whale(sz,col,happy){const g=new THREE.Group();const m=M(col||'#a8d8f4',{roughness:.45}),bell=M('#e8f6ff');add(g,sph(1,24,16),m,0,0,0,{s:[1.15,.95,1.5]});add(g,sph(.8,16,12),bell,0,-.28,.15,{s:[.95,.6,1.25],ns:1});
  const tail=new THREE.Group();tail.position.set(0,.25,-1.45);g.add(tail);add(tail,sph(.5,14,10),m,0,.1,-.2,{s:[.7,.7,1.2]});for(const sx of[-1,1])add(tail,sph(.5,12,8),m,sx*.55,.5,-.7,{s:[1,.25,.6],r:[0,sx*.5,sx*.3]});
  for(const sx of[-1,1]){add(g,sph(.12,8,6),faceMat,sx*.5,.25,1.2,{ns:1,s:[1,1.3,.6]});add(g,sph(.04,6,5),white,sx*.5+.03,.3,1.27,{ns:1});add(g,sph(.16,8,6),cheek,sx*.7,0,1.05,{ns:1,s:[1,.6,.4]});add(g,sph(.35,10,8),m,sx*.95,-.3,.2,{s:[.5,.2,1],r:[0,0,sx*.4]})}
  g.userData.tail=tail;g.scale.setScalar(sz||1);return g}
 /* ---------- KHU A: đài phun cá voi ---------- */
 const fountG=G(0,0,0);add(fountG,cyl(3.8,4,.9,36),M('#f4efe2'),0,.45,0);add(fountG,cyl(3.4,3.4,.12,36),M('#cfe8f4'),0,.92,0,{ns:1});
 const water=add(fountG,cyl(3.3,3.3,.05,36),new THREE.MeshStandardMaterial({color:'#6fd0f0',roughness:.1,metalness:.1,transparent:true,opacity:.92,emissive:'#2aa0d0',emissiveIntensity:.15}),0,.99,0,{ns:1});
 const ripple=add(fountG,new THREE.TorusGeometry(1.6,.05,6,40),M('#ffffff',{transparent:true,opacity:.7}),0,1.04,0,{ns:1,r:[Math.PI/2,0,0]});
 const fw=whale(1.55,'#a8d8f4');fw.position.set(0,2.5,0);fountG.add(fw);add(fountG,cyl(.9,1.2,1.3,16),M('#e8e2d2'),0,1.55,0);
 const heart=emojiSprite('❤️',1.3);heart.position.set(0,5.2,0);heart.visible=false;fountG.add(heart);
 const sprayN=36,sprayG=new THREE.SphereGeometry(.13,6,5),sprayM=new THREE.MeshStandardMaterial({color:'#bfeaff',emissive:'#7fd0ff',emissiveIntensity:.35,roughness:.2}),spray=new THREE.InstancedMesh(sprayG,sprayM,sprayN);spray.frustumCulled=false;fountG.add(spray);
 blockC(0,0,4.1);
 /* ---------- KHU B: vui chơi ---------- */
 {const [cx,cz]=ZONES[0].c,g=G(cx,0,cz);add(g,cyl(5.2,5.2,.1,32),M('#f0dca0'),0,.06,0,{nr:1});add(g,new THREE.TorusGeometry(5.2,.18,8,36),M('#d4a24a'),0,.15,0,{ns:1,r:[Math.PI/2,0,0]});
  const tw=add(g,box(2.2,2.2,2.2),M('#4a8fd0'),-1.2,1.1,-1.4);add(g,new THREE.ConeGeometry(1.9,1.3,4),M('#d9534f'),-1.2,2.85,-1.4,{r:[0,Math.PI/4,0]});for(const[sx,sz]of[[-1,-1],[1,-1],[-1,1],[1,1]])add(g,cyl(.1,.1,3,6),M('#f2c14e'),-1.2+sx*1.05,1.5,-1.4+sz*1.05);
  const slide=add(g,box(1.3,.14,4.4),M('#f2a93b'),-1.2,1.15,1.6,{r:[.52,0,0]});for(const sx of[-1,1])add(g,box(.12,.35,4.4),M('#d98a1a'),-1.2+sx*.65,1.3,1.6,{r:[.52,0,0],ns:1});
  add(g,box(1.3,.4,.6),M('#f2a93b'),-1.2,.2,3.55);
  /* xích đu */
  const sw=G(cx+2.4,0,cz+1.2);for(const sx of[-1.8,1.8]){add(sw,cyl(.1,.1,3,6),M('#7a7a80'),sx,1.5,0,{r:[0,0,sx>0?.15:-.15]})}add(sw,cyl(.09,.09,4.2,6),M('#7a7a80'),0,2.95,0,{r:[0,0,Math.PI/2]});
  const seats=[];for(const sx of[-.8,.8]){const sg=new THREE.Group();sg.position.set(sx,2.9,0);sw.add(sg);add(sg,cyl(.015,.015,1.9,4),M('#444'),-.3,-.95,0);add(sg,cyl(.015,.015,1.9,4),M('#444'),.3,-.95,0);add(sg,box(.8,.1,.34),M('#d9534f'),0,-1.9,0);seats.push(sg)}window.__swings=seats;
  for(const[x,z,c]of[[-3.6,2.4,'#8fd0f0'],[-3,3.6,'#ffb3cf']]){const wh=whale(.5,c);const sg=G(cx+x,.7,cz+z);sg.add(wh);add(sg,cyl(.06,.06,.7,6),M('#8a8a90'),0,-.35,0,{ns:1});sg.userData.sp=1;(window.__springs=window.__springs||[]).push(sg)}
  blockR(cx-2.4,cz-2.6,cx+0,cz-.2);blockR(cx-1.9,cz+.2,cx-.4,cz+3.6);blockC(cx+2.4,cz+1.2,.5);blockC(cx-3.6,cz+2.4,.5);blockC(cx-3,cz+3.6,.5);
  const lbl=labelSprite(ZONES[0].zh,ZONES[0].py);lbl.position.set(cx,6.4,cz);scene.add(lbl)}
 /* ---------- KHU C: chòi ---------- */
 {const [cx,cz]=ZONES[1].c,g=G(cx,0,cz);add(g,cyl(4,4.2,.3,8),M('#e8d9a8'),0,.15,0,{nr:1});for(const[sx,sz]of[[-1,-1],[1,-1],[-1,1],[1,1]])add(g,cyl(.18,.2,3.6,8),M('#b03a2e'),sx*3,1.95,sz*3);
  add(g,new THREE.ConeGeometry(5.2,2.6,4),M('#d9533f'),0,5.5,0,{r:[0,Math.PI/4,0]});add(g,new THREE.ConeGeometry(4.6,.9,4),M('#b03a2e'),0,4.15,0,{r:[0,Math.PI/4,0],ns:1});add(g,sph(.3,10,8),M('#f2c14e'),0,7,0);add(g,box(6.4,.2,.25),M('#8a2218'),0,3.8,3,{ns:1});add(g,box(6.4,.2,.25),M('#8a2218'),0,3.8,-3,{ns:1});add(g,box(.25,.2,6.4),M('#8a2218'),3,3.8,0,{ns:1});add(g,box(.25,.2,6.4),M('#8a2218'),-3,3.8,0,{ns:1});
  add(g,cyl(.9,.9,.12,16),M('#d9a96a'),0,.95,0);add(g,cyl(.14,.14,.7,8),M('#8a5a34'),0,.6,0);for(const a of[.4,2.0,3.6,5.2])add(g,cyl(.3,.28,.12,10),M('#c9653f'),Math.cos(a)*1.5,.62,Math.sin(a)*1.5);
  add(g,sph(.16,8,6),M('#fff'),.2,1.12,0,{ns:1});
  for(const[sx,sz]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]]){add(g,cyl(.012,.012,.7,4),M('#555'),sx,3.45,sz,{ns:1});add(g,sph(.22,10,8),M('#ffd774',{emissive:'#ffd774',emissiveIntensity:dark?2:.5}),sx,3,sz,{ns:1,s:[1,1.3,1]})}
  blockC(cx,cz,1);for(const[sx,sz]of[[-1,-1],[1,-1],[-1,1],[1,1]])blockC(cx+sx*3,cz+sz*3,.3);
  const lbl=labelSprite(ZONES[1].zh,ZONES[1].py);lbl.position.set(cx,9,cz);scene.add(lbl)}
 /* ---------- KHU E: cà phê ngoài trời ---------- */
 {const [cx,cz]=ZONES[2].c,g=G(cx,0,cz);add(g,cyl(5.6,5.6,.1,32),M('#ecdcc0'),0,.06,0,{nr:1});
  const umb=(x,z,c1)=>{const u=G(cx+x,0,cz+z);add(u,cyl(.1,.1,3.6,8),M('#8a6244'),0,1.8,0);const cm=new THREE.ConeGeometry(2.3,1.1,16,1,true);const m=new THREE.MeshStandardMaterial({color:c1,side:THREE.DoubleSide,roughness:.7});add(u,cm,m,0,3.9,0);for(let i=0;i<8;i+=2)add(u,new THREE.ConeGeometry(2.3,1.1,16,1,true,i*Math.PI/4,Math.PI/4),new THREE.MeshStandardMaterial({color:'#fff',side:THREE.DoubleSide}),0,3.91,0,{ns:1});add(u,cyl(1.0,1.0,.1,18),M('#d9a96a'),0,1.1,0);add(u,cyl(.12,.14,1.1,8),M('#8a5a34'),0,.55,0,{ns:1});for(let k=0;k<3;k++){const a=k*2.1+.4;add(u,box(.6,.1,.6),M('#b9814f'),Math.cos(a)*1.6,.62,Math.sin(a)*1.6,{r:[0,-a,0]});add(u,box(.6,.55,.1),M('#b9814f'),Math.cos(a)*1.85,.95,Math.sin(a)*1.85,{r:[0,-a+Math.PI/2,0]})}blockC(cx+x,cz+z,1.2)};
  umb(-2.6,-1.2,'#ff8aa8');umb(2.6,1.8,'#ffd34d');umb(-2.2,3.4,'#8ad0f0');
  const cart=G(cx+3.3,0,cz-2.8);cart.rotation.y=-.4;add(cart,box(2,1,1.2),M('#ff9ac0'),0,.9,0);add(cart,box(2.2,.2,1.4),M('#fff'),0,1.5,0);for(const sx of[-.7,0,.7])add(cart,sph(.28,10,8),M(['#fff3b0','#ffb3cf','#c8f0c8'][Math.round(sx+1)]),sx,1.8,0,{ns:1});for(const sx of[-.8,.8])add(cart,cyl(.3,.3,.15,12),M('#444'),sx,.3,.7,{r:[Math.PI/2,0,0],ns:1});blockC(cx+3.3,cz-2.8,1.3);
  const bal=G(cx-3.8,0,cz-3.2);add(bal,box(1.6,.9,1),M('#ffd34d'),0,.7,0);for(const sx of[-.5,0,.5])add(bal,cyl(.012,.012,2.6,4),M('#777'),sx,2.2,0,{ns:1});const bc=['#ff6a6a','#4aa8d0','#7ac98a','#ffb84d','#b88aff'];bc.forEach((c,i)=>add(bal,sph(.38,12,9),M(c,{roughness:.25}),(i-2)*.38,3.3+Math.sin(i)*.3,Math.cos(i*2)*.2));blockC(cx-3.8,cz-3.2,1);bal.userData.bal=1;(window.__bal=window.__bal||[]).push(bal);
  const lbl=labelSprite(ZONES[2].zh,ZONES[2].py);lbl.position.set(cx,6.6,cz);scene.add(lbl)}
 /* ---------- KHU D: hồ sen + cầu đỏ ---------- */
 const BR={a:null,b:null,w:2.1,h:1.5};
 {const [cx,cz]=ZONES[3].c,g=G(cx,0,cz);add(g,cyl(6.4,6.6,.25,40),M('#d8cfb4'),0,.1,0,{nr:1});const wat=add(g,cyl(5.8,5.8,.2,40),new THREE.MeshStandardMaterial({color:'#6fd0ea',roughness:.12,metalness:.1,transparent:true,opacity:.93}),0,.18,0,{ns:1});
  for(let i=0;i<9;i++){const a=i*.9+.3,r=1.5+hash(i,3)*3.4;add(g,cyl(.55,.55,.04,14),M('#4fae5e'),Math.cos(a)*r,.3,Math.sin(a)*r,{ns:1})}
  const lotus=(x,z)=>{const l=G(cx+x,.32,cz+z);for(let i=0;i<8;i++){const a=i/8*6.283;add(l,sph(.22,8,6),M('#ff9ac0'),Math.cos(a)*.22,.18,Math.sin(a)*.22,{ns:1,s:[.6,1.2,.6],r:[Math.sin(a)*.5,0,-Math.cos(a)*.5]})}add(l,sph(.12,8,6),M('#ffd34d'),0,.15,0,{ns:1})};lotus(1.6,1.2);lotus(-2.4,-1);lotus(.6,-3.2);lotus(-1.4,3);lotus(3.2,-1.6);
  /* cầu: hướng từ stand về tâm */
  const dir=new THREE.Vector2(-STAND.D[0]+ZONES[3].c[0],-STAND.D[1]+ZONES[3].c[1]).normalize();const hx=dir.x,hz=dir.y,half=6.6;BR.a=[cx-hx*half,cz-hz*half];BR.b=[cx+hx*half,cz+hz*half];
  const ang=Math.atan2(hx,hz),bg=G(cx,0,cz);bg.rotation.y=ang;const N=14;for(let i=0;i<N;i++){const t0=i/N,t1=(i+1)/N,tm=(t0+t1)/2,y=BR.h*Math.sin(Math.PI*tm),zz=(tm-.5)*2*half,sl=Math.cos(Math.PI*tm)*BR.h*Math.PI/(2*half);const pl=add(bg,box(BR.w,.18,2*half/N+.04),M('#c8372d'),0,y+.2,zz,{r:[-Math.atan(sl),0,0]});for(const sx of[-1,1]){add(bg,box(.14,.12,2*half/N+.04),M('#e0554a'),sx*BR.w/2,y+1.05,zz,{r:[-Math.atan(sl),0,0],ns:1});if(i%2===0)add(bg,cyl(.06,.06,.85,6),M('#e0554a'),sx*BR.w/2,y+.62,zz,{ns:1})}}
  for(const sz of[-1,1])for(const sx of[-1,1])add(bg,box(.4,1.2,.4),M('#8a2218'),sx*BR.w/2,.6+(Math.abs(sz)?0:0),sz*half*.97,{ns:1});
  /* chặn nước trừ hành lang cầu */
  for(let i=Math.floor(cx-7);i<=Math.ceil(cx+7);i++)for(let j=Math.floor(cz-7);j<=Math.ceil(cz+7);j++){const px=i+.5,pz=j+.5;if(Math.hypot(px-cx,pz-cz)>6.2)continue;const t=((px-BR.a[0])*hx+(pz-BR.a[1])*hz)/(2*half),perp=Math.abs((px-BR.a[0])*hz-(pz-BR.a[1])*hx);if(t>=-.02&&t<=1.02&&perp<BR.w*.6)continue;blocked.add((i+OFF)+','+(j+OFF))}
  const lbl=labelSprite(ZONES[3].zh,ZONES[3].py);lbl.position.set(cx,5.2,cz);scene.add(lbl)}
 const bridgeY=(x,z)=>{if(!BR.a)return 0;const hx=BR.b[0]-BR.a[0],hz=BR.b[1]-BR.a[1],L=Math.hypot(hx,hz),ux=hx/L,uz=hz/L,t=((x-BR.a[0])*ux+(z-BR.a[1])*uz)/L,perp=Math.abs((x-BR.a[0])*uz-(z-BR.a[1])*ux);if(t<0||t>1||perp>BR.w*.6)return 0;return BR.h*Math.sin(Math.PI*t)+.2};
 /* ---------- KHU F: sân khấu + thảm picnic ---------- */
 {const [cx,cz]=ZONES[5].c,g=G(cx,0,cz);add(g,cyl(5.8,5.8,.08,32),M(sc.sn?'#f2f8f4':'#b8e8a0'),0,.06,0,{nr:1});
  const st=G(cx,0,cz+3.6);st.rotation.y=Math.PI;add(st,box(9,.7,4.6),M('#e8a0c0'),0,.35,0);add(st,box(9.4,.12,5),M('#f6c6dc'),0,.74,0,{ns:1});add(st,box(9,5.2,.3),M('#f6c6dc'),0,3.2,-2.2);
  const bt=canvasTex(512,256,(g2)=>{rrect(g2,10,10,492,236,30);g2.fillStyle='#fdf0f6';g2.fill();g2.lineWidth=10;g2.strokeStyle='#e8a0c0';g2.stroke();g2.font='140px "Apple Color Emoji","Noto Color Emoji",sans-serif';g2.textAlign='center';g2.textBaseline='middle';g2.fillText('🐋',256,120);g2.font='700 34px "Noto Sans",sans-serif';g2.fillStyle='#c0507a';g2.fillText('欢迎！Chào mừng!',256,214)});
  add(st,new THREE.PlaneGeometry(6.4,3.2),new THREE.MeshStandardMaterial({map:bt,roughness:.8}),0,3.3,-2.03,{ns:1});
  for(const sx of[-1,1]){add(st,box(.3,5.4,.3),M('#8a5a34'),sx*4.4,2.7,-1.8);add(st,sph(.35,10,8),M('#ffd774',{emissive:'#ffd774',emissiveIntensity:dark?2.2:.6}),sx*4.4,5.5,-1.8,{ns:1});add(st,box(.5,5,.15),M('#d9456f'),sx*3.9,2.8,-1.4,{ns:1})}
  for(let i=0;i<9;i++)add(st,sph(.14,8,6),M(i%2?'#ffd34d':'#ff7a5a',{emissive:i%2?'#ffd34d':'#ff7a5a',emissiveIntensity:.5}),-3.6+i*.9,5.1,-1.9,{ns:1});
  blockR(cx-4.6,cz+1,cx+4.6,cz+6);
  const matT=canvasTex(128,128,(g2)=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++){g2.fillStyle=(i+j)%2?'#e0654f':'#fff3ee';g2.fillRect(i*32,j*32,32,32)}});const mat=add(g,box(3.2,.06,2.6),new THREE.MeshStandardMaterial({map:matT,roughness:.9}),-2.8,.1,-1.4,{nr:1});
  const bk=G(cx-2.2,.1,cz-1.6);add(bk,box(.8,.5,.6),M('#d9a96a'),0,.3,0);add(bk,new THREE.TorusGeometry(.32,.05,6,12,Math.PI),M('#8a5a34'),0,.55,0,{ns:1});
  const kite=G(cx+1,7,cz-3);const kt=add(kite,new THREE.PlaneGeometry(1.4,1.4),new THREE.MeshStandardMaterial({color:'#ff6a8a',side:THREE.DoubleSide}),0,0,0,{r:[0,0,Math.PI/4],ns:1});add(kite,new THREE.PlaneGeometry(.7,.7),new THREE.MeshStandardMaterial({color:'#ffd34d',side:THREE.DoubleSide}),0,0,.01,{r:[0,0,Math.PI/4],ns:1});add(kite,cyl(.015,.015,9,4),M('#ddd'),0,-4.5,0,{ns:1,r:[0,0,.1]});window.__kite=kite;
  const lbl=labelSprite(ZONES[5].zh,ZONES[5].py);lbl.position.set(cx,7.4,cz);scene.add(lbl)}
 /* nhãn quảng trường */
 {const lbl=labelSprite(ZONES[4].zh,ZONES[4].py);lbl.position.set(0,7.6,0);scene.add(lbl)}
 /* đường chân trời xa */
 for(let i=0;i<40;i++){const a=i/40*6.283+hash(i,1),r=95+hash(i,2)*30,h=10+hash(i,3)*26,w=7+hash(i,4)*8;const b=add(scene,box(w,h,w),M(dark?'#4a5a8a':'#c6d6ea',{roughness:1}),Math.cos(a)*r,h/2,Math.sin(a)*r,{ns:1,nr:1});b.castShadow=false}
 for(let i=0;i<6;i++){const cl=G((hash(i,5)-.5)*160,32+hash(i,6)*10,-70-hash(i,7)*30);for(let j=0;j<4;j++)add(cl,sph(4+hash(i,j)*2,10,8),M('#ffffff',{roughness:1,emissive:'#ffffff',emissiveIntensity:.3}),j*4.5-6,hash(j,i)*2,0,{ns:1,nr:1,s:[1.3,.7,.9]}).castShadow=false;cl.userData.cl=1}
 /* ---------- NHÂN VẬT ---------- */
 const heroLook={hair:'#6a3f26',skin:'#f6d2b4',top:'#f48fb1',bot:'#f48fb1',kind:'long',dress:1,glasses:1,clip:1};
 let sx_=null;try{sx_=ST&&ST.sex}catch(e){}if(sx_==='m'){Object.assign(heroLook,{kind:'short',dress:0,top:'#5aa0d8',bot:'#35508a',hair:'#2a2420',clip:0})}
 const hero=chibi(heroLook,1.5);hero.position.set(0,0,22);scene.add(hero);hero.rotation.y=Math.PI;
 const pet=whale(.55,'#9fd3f2');scene.add(pet);pet.position.set(-1.5,1.7,23);
 const walkers=[];const spots=[];for(let i=-27;i<=27;i+=1)for(let j=-27;j<=27;j+=1){if(!blocked.has((Math.floor(i)+OFF)+','+(Math.floor(j)+OFF)))spots.push([i+.5,j+.5])}
 const free=(x,z)=>x>-29&&x<29&&z>-29&&z<30.2&&!blocked.has(cellKey(x,z));
 const npcs=NPCS.map((n,i)=>{const c=chibi(n.look,(n.sc||1)*1.4);const x=n.pos[0],z=n.pos[1];c.position.set(x,0,z);scene.add(c);const ic=emojiSprite(n.main?'❗':'💬',.9);ic.position.set(0,2.35,0);c.add(ic);c.userData.ic=ic;c.userData.npc=n;return{...n,obj:c,path:[],pause:Math.random()*3,li:0,heading:0,ph:i*1.3,x,z}});
 /* tìm đường (A* 8 hướng) */
 const walkable=(i,j)=>i>=0&&j>=0&&i<NC&&j<NC&&!blocked.has(i+','+j);
 function findPath(x0,z0,x1,z1){const sx=Math.floor(x0+OFF),sz=Math.floor(z0+OFF);let tx=Math.floor(x1+OFF),tz=Math.floor(z1+OFF);if(!walkable(tx,tz)){let b=null,bd=1e9;for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++)if(walkable(tx+dx,tz+dz)){const d=dx*dx+dz*dz;if(d<bd){bd=d;b=[tx+dx,tz+dz]}}if(!b)return null;[tx,tz]=b}
  const key=(i,j)=>i*NC+j,gs=new Map([[key(sx,sz),0]]),par=new Map(),open=[[0,sx,sz]];const hh=(i,j)=>Math.hypot(i-tx,j-tz);
  while(open.length){let bi=0;for(let k=1;k<open.length;k++)if(open[k][0]<open[bi][0])bi=k;const[,ci,cj]=open.splice(bi,1)[0];if(ci===tx&&cj===tz)break;for(const[di,dj]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const ni=ci+di,nj=cj+dj;if(!walkable(ni,nj))continue;if(di&&dj&&(!walkable(ci+di,cj)||!walkable(ci,cj+dj)))continue;const g2=gs.get(key(ci,cj))+(di&&dj?1.414:1);if(gs.has(key(ni,nj))&&gs.get(key(ni,nj))<=g2)continue;gs.set(key(ni,nj),g2);par.set(key(ni,nj),[ci,cj]);open.push([g2+hh(ni,nj),ni,nj])}}
  if(!gs.has(key(tx,tz)))return null;const out=[];let c=[tx,tz];while(c&&!(c[0]===sx&&c[1]===sz)){out.unshift([c[0]-OFF+.5,c[1]-OFF+.5]);c=par.get(key(c[0],c[1]))}return out}
 /* ---------- điều khiển ---------- */
 const H={path:[],after:null,heading:Math.PI,moving:false};const keys={};
 const say=(zh,py,vi)=>{toast(`${zh}  ${py}\n${vi}`);if(window.rwSay)try{rwSay(zh)}catch(e){}};
 const openZone=z=>{const wl=QB[WORDS[z.k]].w;const acts=z.acts.map(a=>`<button class="btn gold" data-act="${a}">${ACTN[a]}</button>`).join('');
  modal(`<h2>${z.ic} ${z.vi}</h2><p class="sub">${z.zh} · ${z.py}</p><p class="sub">${z.ds}</p><div class="row" style="flex-wrap:wrap;gap:6px;margin:8px 0">${wl.map((w,i)=>`<button class="btn" data-w="${i}" style="font-size:15px">${w[0]}<br><small>${w[1]} · ${w[2]}</small></button>`).join('')}</div><div class="row" style="flex-wrap:wrap;gap:8px">${z.k==='A'?'<button class="btn" id="fs">💦 Đổi trạng thái đài phun</button>':''}${acts}<button class="btn" id="cl">Đóng</button></div>`);
  document.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const w=wl[+b.dataset.w];say(w[0],w[1],w[2])});document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>quiz(b.dataset.act));
  if($('fs'))$('fs').onclick=()=>{window.__parkFount=((window.__parkFount||0)+1)%3;toast(['Đài phun: tĩnh','Đài phun: đang phun nước 💦','Đài phun: vui vẻ ❤️'][window.__parkFount])};$('cl').onclick=closeM};
 const fire=a=>{if(!a)return;if(a.npc){const n=a.npc;if(n.main){exitPark();if(p.words)openNpc(p);else say('欢迎来公园！','Huānyíng lái gōngyuán!','Chào mừng đến công viên!');return}const l=n.lines[n.li++%n.lines.length];say(l[0],l[1],`${n.n} (${n.vi}): ${l[2]}`)}else if(a.zone)openZone(a.zone)};
 const goTo=(x,z,after)=>{const pa=findPath(hero.position.x,hero.position.z,x,z);if(pa){H.path=pa;H.after=after||null}else if(after){H.path=[];fire(after)}};
 const zoneBtn=$('pkChips');ZONES.slice().sort((a,b)=>a.k.localeCompare(b.k)).forEach(z=>{const b=document.createElement('button');b.className='btn';b.textContent=z.ic+' '+z.k;b.title=z.vi;b.onclick=()=>{const s=STAND[z.k];goTo(s[0],s[1],{zone:z})};zoneBtn.appendChild(b)});
 /* camera quỹ đạo */
 let yaw=0,pitch=.95,dist=22,tYaw=0,tPitch=.95,tDist=22;const camT=new THREE.Vector3(0,1,21);
 const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();const hot=[];
 for(const z of ZONES){const hs=new THREE.Mesh(new THREE.CylinderGeometry(z.k==='A'?4.4:6,z.k==='A'?4.4:6,z.k==='C'?6.5:5,12),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));hs.position.set(z.c[0],2.5,z.c[1]);hs.userData.zone=z;scene.add(hs);hot.push(hs)}
 const npcHit=npcs.map(n=>{const hs=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,3.6,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));hs.position.set(0,1.8/(n.sc||1)/1.4*1.0,0);hs.scale.setScalar(1/((n.sc||1)*1.4));hs.userData.npc=n;n.obj.add(hs);return hs});
 const pick=(cx,cy)=>{const r=cv.getBoundingClientRect();ndc.set((cx-r.left)/r.width*2-1,-((cy-r.top)/r.height)*2+1);ray.setFromCamera(ndc,cam);const hn=ray.intersectObjects(npcHit,false)[0];if(hn)return{npc:hn.object.userData.npc};const hz=ray.intersectObjects(hot,false)[0];const gp=ray.intersectObject(ground,false)[0];if(hz&&(!gp||hz.distance<gp.distance+8))return{zone:hz.object.userData.zone,pt:gp&&gp.point};return gp?{pt:gp.point}:null};
 const ptrs=new Map();let drag=null,pinch0=0;
 cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:0});if(ptrs.size===2){const a=[...ptrs.values()];pinch0=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)}});
 cv.addEventListener('pointermove',e=>{const p0=ptrs.get(e.pointerId);if(!p0)return;const dx=e.clientX-p0.x,dy=e.clientY-p0.y;p0.x=e.clientX;p0.y=e.clientY;p0.moved+=Math.abs(dx)+Math.abs(dy);if(ptrs.size===1&&p0.moved>8){tYaw-=dx*.006;tPitch=Math.max(.28,Math.min(1.25,tPitch+dy*.004))}else if(ptrs.size===2){const a=[...ptrs.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);tDist=Math.max(9,Math.min(42,tDist*pinch0/d));pinch0=d}});
 cv.addEventListener('pointerup',e=>{const p0=ptrs.get(e.pointerId);ptrs.delete(e.pointerId);if(p0&&p0.moved<10&&ptrs.size===0){const h=pick(e.clientX,e.clientY);if(!h)return;if(h.npc){const n=h.npc,o=n.obj.position;goTo(o.x,o.z+1.4,{npc:n})}else if(h.zone){const s=STAND[h.zone.k];goTo(s[0],s[1],{zone:h.zone})}else if(h.pt)goTo(h.pt.x,h.pt.z,null)}});
 cv.addEventListener('pointercancel',e=>ptrs.delete(e.pointerId));
 cv.addEventListener('wheel',e=>{e.preventDefault();tDist=Math.max(9,Math.min(42,tDist*(e.deltaY>0?1.1:.9)))},{passive:false});
 $('zin').onclick=()=>{tDist=Math.max(9,tDist/1.25)};$('zout').onclick=()=>{tDist=Math.min(42,tDist*1.25)};
 const kd=e=>{keys[e.key.toLowerCase()]=true};const ku=e=>{keys[e.key.toLowerCase()]=false};window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 const fit=()=>{const r=ovp.getBoundingClientRect();R.setSize(r.width,r.height,false);cam.aspect=r.width/r.height;cam.updateProjectionMatrix()};fit();window.addEventListener('resize',fit);
 const mm=$('pmm'),mk=mm.getContext('2d');
 let last=performance.now(),tt=0;const tmp=new THREE.Vector3();
 const dispose=()=>{window.removeEventListener('resize',fit);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku)};
 const loop=now=>{if(window.__parkTok!==tok||!document.body.contains(ovp)){dispose();return}
  const dt=Math.min(.05,(now-last)/1000);last=now;tt+=dt;
  /* hero */
  let moving=false;const sp=6.2*dt;
  const kx=(keys['d']||keys['arrowright']?1:0)-(keys['a']||keys['arrowleft']?1:0),kz=(keys['s']||keys['arrowdown']?1:0)-(keys['w']||keys['arrowup']?1:0);
  if(kx||kz){H.path=[];H.after=null;const l=Math.hypot(kx,kz),wx=(kx*Math.cos(yaw)+kz*Math.sin(yaw))/l,wz=(-kx*Math.sin(yaw)+kz*Math.cos(yaw))/l;const nx=hero.position.x+wx*sp,nz=hero.position.z+wz*sp;if(free(nx,hero.position.z))hero.position.x=nx;if(free(hero.position.x,nz))hero.position.z=nz;H.heading=Math.atan2(wx,wz);moving=true}
  else if(H.path.length){const[tx,tz]=H.path[0],dx=tx-hero.position.x,dz=tz-hero.position.z,d=Math.hypot(dx,dz);if(d<=sp){hero.position.x=tx;hero.position.z=tz;H.path.shift()}else{hero.position.x+=dx/d*sp;hero.position.z+=dz/d*sp;H.heading=Math.atan2(dx,dz);moving=true}}
  else if(H.after){const a=H.after;H.after=null;fire(a)}
  hero.position.y=bridgeY(hero.position.x,hero.position.z);
  let dh=H.heading-hero.rotation.y;dh=Math.atan2(Math.sin(dh),Math.cos(dh));hero.rotation.y+=dh*Math.min(1,dt*12);animChibi(hero,tt,moving,10);
  if(hero.position.z>=29.2){exitPark();return}
  /* thú cưng */
  const px=hero.position.x-Math.sin(hero.rotation.y+.9)*1.7,pz=hero.position.z-Math.cos(hero.rotation.y+.9)*1.7;pet.position.x+=(px-pet.position.x)*Math.min(1,dt*3);pet.position.z+=(pz-pet.position.z)*Math.min(1,dt*3);pet.position.y=hero.position.y+2.6+Math.sin(tt*2.2)*.18;pet.rotation.y+=(Math.atan2(hero.position.x-pet.position.x,hero.position.z-pet.position.z)-pet.rotation.y)*Math.min(1,dt*4);pet.userData.tail.rotation.x=Math.sin(tt*5)*.25;
  /* NPC */
  for(const n of npcs){const o=n.obj;let mv=false;if(!n.main){if(n.pause>0)n.pause-=dt;else if(!n.path.length){const s=spots[Math.floor(Math.random()*spots.length)];const pa=findPath(o.position.x,o.position.z,s[0],s[1]);n.path=pa||[];if(!pa)n.pause=1}else{const[tx,tz]=n.path[0],dx=tx-o.position.x,dz=tz-o.position.z,d=Math.hypot(dx,dz),s2=(n.jog?5.2:1.9)*dt;mv=true;if(d<=s2){o.position.x=tx;o.position.z=tz;n.path.shift();if(!n.path.length)n.pause=1.5+Math.random()*4}else{o.position.x+=dx/d*s2;o.position.z+=dz/d*s2;n.heading=Math.atan2(dx,dz)}}}
   else n.heading=Math.PI*1.02;let d2=n.heading-o.rotation.y;d2=Math.atan2(Math.sin(d2),Math.cos(d2));o.rotation.y+=d2*Math.min(1,dt*8);o.position.y=bridgeY(o.position.x,o.position.z);animChibi(o,tt+n.ph,mv,n.jog?13:8);o.userData.ic.position.y=(2.35+Math.sin(tt*3+n.ph)*.07)}
  /* đài phun */
  const fs=window.__parkFount||0;fw.position.y=2.5+(fs===2?Math.abs(Math.sin(tt*4))*.35:Math.sin(tt*1.6)*.06);fw.rotation.y=fs===2?Math.sin(tt*3)*.25:0;fw.userData.tail.rotation.x=Math.sin(tt*(fs===2?8:3))*.2;heart.visible=fs===2;heart.position.y=5.2+Math.sin(tt*3)*.2;water.material.emissiveIntensity=.15+Math.sin(tt*2)*.05;ripple.scale.setScalar(1+((tt*.5)%1)*1.1);ripple.material.opacity=.7*(1-((tt*.5)%1));
  const mtx=new THREE.Matrix4(),q=new THREE.Quaternion(),sc1=new THREE.Vector3(1,1,1);for(let i=0;i<sprayN;i++){if(fs===0){mtx.makeScale(0,0,0)}else{const u=((tt*.9)+i/sprayN)%1,an=i*2.399,r=u*(2.1+(i%3)*.5);const y=4.6+Math.sin(u*Math.PI)*(2.3+(i%4)*.3)-u*u*1.0;tmp.set(Math.cos(an)*r,y-(i%2?.0:.2),Math.sin(an)*r);mtx.compose(tmp,q,sc1)}spray.setMatrixAt(i,mtx)}spray.instanceMatrix.needsUpdate=true;
  if(window.__swings)window.__swings.forEach((s,i)=>s.rotation.x=Math.sin(tt*1.8+i*1.6)*.45);if(window.__springs)window.__springs.forEach((s,i)=>{s.rotation.z=Math.sin(tt*2.4+i)*.18});if(window.__bal)window.__bal.forEach((b,i)=>b.rotation.z=Math.sin(tt*1.5+i)*.04);if(window.__kite){window.__kite.position.y=7+Math.sin(tt*1.2)*.5;window.__kite.rotation.z=Math.sin(tt*1.6)*.15}
  scene.children.forEach(o=>{if(o.userData.cl)o.position.x+=dt*.6});
  /* camera */
  yaw+=(tYaw-yaw)*Math.min(1,dt*8);pitch+=(tPitch-pitch)*Math.min(1,dt*8);dist+=(tDist-dist)*Math.min(1,dt*6);
  camT.x+=(hero.position.x-camT.x)*Math.min(1,dt*5);camT.z+=(hero.position.z-camT.z)*Math.min(1,dt*5);camT.y+=(hero.position.y+1.5-camT.y)*Math.min(1,dt*5);
  cam.position.set(camT.x+Math.sin(yaw)*Math.cos(pitch)*dist,camT.y+Math.sin(pitch)*dist,camT.z+Math.cos(yaw)*Math.cos(pitch)*dist);cam.lookAt(camT);
  /* nhãn luôn hướng camera: sprite tự xử lý */
  R.render(scene,cam);
  /* minimap */
  mk.clearRect(0,0,240,240);mk.fillStyle=sc.g1;mk.fillRect(0,0,240,240);const mx=x=>(x+30)*4,mz=z=>(z+30)*4;mk.fillStyle='#efe0bc';mk.fillRect(mx(-2.1),mz(0),8.4,mz(30)-mz(0));mk.beginPath();mk.arc(mx(0),mz(0),37,0,7);mk.fill();const zc={B:'#e6a23c',C:'#d9534f',E:'#ff8aa8',D:'#4aa0c0',A:'#8fd8f0',F:'#e8a0c0'};for(const z of ZONES){mk.fillStyle=zc[z.k];mk.beginPath();mk.arc(mx(z.c[0]),mz(z.c[1]),z.k==='A'?14:22,0,7);mk.fill()}mk.fillStyle='#fff';for(const n of npcs){mk.beginPath();mk.arc(mx(n.obj.position.x),mz(n.obj.position.z),3,0,7);mk.fill()}mk.fillStyle='#c00';mk.beginPath();mk.arc(mx(hero.position.x),mz(hero.position.z),6,0,7);mk.fill();mk.strokeStyle='#fff';mk.lineWidth=2;mk.stroke();
  requestAnimationFrame(loop)};
 requestAnimationFrame(loop);window.__park={hero,npcs,ZONES,findPath,goTo,openZone,blocked,cam,scene,R,get yaw(){return yaw},set tYaw(v){tYaw=v},set tPitch(v){tPitch=v},set tDist(v){tDist=v}};
}
const old=window.enterRoom;
window.enterRoom=function(p){if(p&&p.id==='congvien'){enterPark(p).catch(e=>{console.error(e);toast('Không tải được cảnh 3D, thử lại nhé')});return}return old.apply(this,arguments)};
})();
