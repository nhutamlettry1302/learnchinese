/* Bản đồ 12 nước cho Khu nước ngoài (国外) */
(function(){
const C=[
{id:'cn',fl:'🇨🇳',zh:'中国',py:'Zhōngguó',vi:'Trung Quốc',lon:100,lat:36,cap:['北京','Běijīng','Bắc Kinh'],food:['饺子','jiǎozi','sủi cảo'],lm:['长城','Chángchéng','Vạn Lý Trường Thành'],hi:['你好','nǐ hǎo','xin chào'],s:['我是中国人。','Wǒ shì Zhōngguórén.','Tôi là người Trung Quốc.']},
{id:'vn',fl:'🇻🇳',zh:'越南',py:'Yuènán',vi:'Việt Nam',lon:108,lat:17,cap:['河内','Hénèi','Hà Nội'],food:['河粉','héfěn','phở'],lm:['下龙湾','Xiàlóngwān','vịnh Hạ Long'],hi:['你好','nǐ hǎo','xin chào'],s:['我是越南人。','Wǒ shì Yuènánrén.','Tôi là người Việt Nam.']},
{id:'jp',fl:'🇯🇵',zh:'日本',py:'Rìběn',vi:'Nhật Bản',lon:140,lat:37,cap:['东京','Dōngjīng','Tokyo'],food:['寿司','shòusī','sushi'],lm:['富士山','Fùshìshān','núi Phú Sĩ'],hi:['你好','nǐ hǎo','xin chào'],s:['他去日本旅行。','Tā qù Rìběn lǚxíng.','Anh ấy đi du lịch Nhật Bản.']},
{id:'kr',fl:'🇰🇷',zh:'韩国',py:'Hánguó',vi:'Hàn Quốc',lon:127,lat:39,cap:['首尔','Shǒu’ěr','Seoul'],food:['泡菜','pàocài','kim chi'],lm:['景福宫','Jǐngfúgōng','cung Gyeongbok'],hi:['你好','nǐ hǎo','xin chào'],s:['我喜欢韩国菜。','Wǒ xǐhuan Hánguó cài.','Tôi thích món Hàn.']},
{id:'th',fl:'🇹🇭',zh:'泰国',py:'Tàiguó',vi:'Thái Lan',lon:97,lat:15,cap:['曼谷','Màngǔ','Bangkok'],food:['冬阴功汤','dōngyīngōng tāng','canh tom yum'],lm:['大皇宫','Dà huánggōng','Cung điện Hoàng gia'],hi:['你好','nǐ hǎo','xin chào'],s:['泰国的大象很大。','Tàiguó de dàxiàng hěn dà.','Voi ở Thái Lan rất to.']},
{id:'sg',fl:'🇸🇬',zh:'新加坡',py:'Xīnjiāpō',vi:'Singapore',lon:106,lat:-2,cap:['新加坡','Xīnjiāpō','Singapore'],food:['海南鸡饭','Hǎinán jīfàn','cơm gà Hải Nam'],lm:['鱼尾狮','Yúwěishī','tượng sư tử biển'],hi:['你好','nǐ hǎo','xin chào'],s:['新加坡很干净。','Xīnjiāpō hěn gānjìng.','Singapore rất sạch sẽ.']},
{id:'in',fl:'🇮🇳',zh:'印度',py:'Yìndù',vi:'Ấn Độ',lon:78,lat:22,cap:['新德里','Xīndélǐ','New Delhi'],food:['咖喱','gālí','cà ri'],lm:['泰姬陵','Tàijīlíng','Taj Mahal'],hi:['你好','nǐ hǎo','xin chào'],s:['印度的咖喱很香。','Yìndù de gālí hěn xiāng.','Cà ri Ấn Độ rất thơm.']},
{id:'uk',fl:'🇬🇧',zh:'英国',py:'Yīngguó',vi:'Anh',lon:-14,lat:60,cap:['伦敦','Lúndūn','London'],food:['炸鱼薯条','zháyú shǔtiáo','cá chiên khoai tây'],lm:['大本钟','Dàběnzhōng','tháp Big Ben'],hi:['你好','nǐ hǎo','xin chào'],s:['英国常常下雨。','Yīngguó chángcháng xiàyǔ.','Nước Anh hay mưa.']},
{id:'fr',fl:'🇫🇷',zh:'法国',py:'Fǎguó',vi:'Pháp',lon:-4,lat:42,cap:['巴黎','Bālí','Paris'],food:['面包','miànbāo','bánh mì'],lm:['埃菲尔铁塔','Āifēi’ěr tiětǎ','tháp Eiffel'],hi:['你好','nǐ hǎo','xin chào'],s:['法国的面包很好吃。','Fǎguó de miànbāo hěn hǎochī.','Bánh mì Pháp rất ngon.']},
{id:'de',fl:'🇩🇪',zh:'德国',py:'Déguó',vi:'Đức',lon:16,lat:52,cap:['柏林','Bólín','Berlin'],food:['香肠','xiāngcháng','xúc xích'],lm:['勃兰登堡门','Bólándēngbǎo mén','cổng Brandenburg'],hi:['你好','nǐ hǎo','xin chào'],s:['他在德国学习。','Tā zài Déguó xuéxí.','Anh ấy học ở Đức.']},
{id:'us',fl:'🇺🇸',zh:'美国',py:'Měiguó',vi:'Mỹ',lon:-98,lat:39,cap:['华盛顿','Huáshèngdùn','Washington'],food:['汉堡包','hànbǎobāo','hamburger'],lm:['自由女神像','Zìyóu nǚshén xiàng','tượng Nữ thần Tự do'],hi:['你好','nǐ hǎo','xin chào'],s:['我想去美国。','Wǒ xiǎng qù Měiguó.','Tôi muốn đi Mỹ.']},
{id:'au',fl:'🇦🇺',zh:'澳大利亚',py:'Àodàlìyà',vi:'Úc',lon:134,lat:-25,cap:['堪培拉','Kānpéilā','Canberra'],food:['袋鼠肉派','dàishǔ ròupài','bánh thịt'],lm:['悉尼歌剧院','Xīní gējùyuàn','nhà hát Opera Sydney'],hi:['你好','nǐ hǎo','xin chào'],s:['澳大利亚有袋鼠。','Àodàlìyà yǒu dàishǔ.','Nước Úc có chuột túi.']}
];
C.find(c=>c.id==='au').food=['咖啡','kāfēi','cà phê'];
C.find(c=>c.id==='au').food=['肉派','ròupài','bánh nhân thịt'];
const POLY={na:[[-168,66],[-140,70],[-95,72],[-80,62],[-60,50],[-67,44],[-80,25],[-97,18],[-105,22],[-118,32],[-125,48],[-140,60]],
sa:[[-80,10],[-60,10],[-35,-6],[-40,-22],[-55,-35],[-68,-55],[-75,-45],[-71,-18],[-81,-5]],
eu:[[-10,36],[-9,43],[0,50],[5,60],[20,70],[60,72],[110,76],[180,68],[170,60],[140,52],[130,40],[122,30],[120,22],[108,10],[105,2],[100,8],[98,16],[90,22],[80,8],[72,20],[58,25],[50,30],[35,30],[28,38],[10,38]],
af:[[-17,21],[-5,36],[10,37],[32,31],[43,12],[51,11],[40,-15],[33,-27],[18,-34],[12,-15],[9,4],[-8,5],[-17,14]],
au:[[114,-22],[130,-12],[142,-11],[153,-26],[148,-38],[130,-32],[115,-34]],
jp:[[130,32],[135,34],[141,38],[142,44],[139,38]],uk:[[-6,50],[2,52],[-2,58],[-6,56]]};
const X=l=>(l+180)/360*1000,Y=l=>(80-l)/150*500;
const pts=a=>a.map(p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join(' ');
const K='tp_world';let prog={};try{prog=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(prog))}catch(e){}};
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const say=t=>{try{rwSay(t)}catch(e){}};
function css(){if(document.getElementById('worldcss'))return;const s=document.createElement('style');s.id='worldcss';s.textContent=`
#worldov{position:fixed;inset:0;z-index:30;background:linear-gradient(#bfe6f5,#e8f6fb);display:flex;flex-direction:column;font-family:inherit;color:#355147}
#worldov .wh{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#fff;box-shadow:0 2px 8px #0002}
#worldov .wh b{font-size:19px;flex:1}#worldov button{font:inherit;border:0;border-radius:14px;padding:9px 14px;background:#fff4d3;color:#355147;cursor:pointer;font-weight:700;min-height:42px}
#worldov .wm{flex:1;position:relative;min-height:0;display:flex;align-items:center;justify-content:center}
#worldov svg{width:100%;max-height:100%}
#worldov .pin{cursor:pointer}#worldov .pin:hover circle,#worldov .pin:focus circle{fill:#ffe59b}
#worldov .wp{position:absolute;left:0;right:0;bottom:0;max-height:72%;overflow:auto;background:#fff;border-radius:22px 22px 0 0;padding:16px;box-shadow:0 -6px 22px #0003}
#worldov .g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:10px 0}
#worldov .g div{background:#f2f8f4;border-radius:12px;padding:8px 10px}#worldov .g small{display:block;color:#7a8f86}
#worldov .z{font-size:26px;font-weight:800}#worldov .op{display:block;width:100%;margin:6px 0;text-align:left;background:#eef6f2;font-size:18px}
#worldov .op.ok{background:#bfe8c9}#worldov .op.no{background:#f6c6c0}
#worldov .st{display:flex;gap:6px;flex-wrap:wrap;padding:8px 14px;background:#fff9}#worldov .st span{background:#fff;border-radius:99px;padding:3px 10px;font-size:14px}
`;document.head.appendChild(s)}
function open(){
css();if(document.getElementById('worldov'))return;
const ov=document.createElement('div');ov.id='worldov';document.body.appendChild(ov);
const done=()=>C.filter(c=>prog[c.id]).length;
function home(){
 ov.innerHTML=`<div class="wh"><b>🌏 国外 · Bản đồ 12 nước</b><span>Hộ chiếu ${done()}/12</span><button id="wx">Đóng</button></div>
 <div class="wm"><svg viewBox="0 0 1000 500" role="img" aria-label="Bản đồ thế giới"><defs><linearGradient id="oc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ee"/><stop offset="1" stop-color="#6cbfe0"/></linearGradient></defs>
 <rect width="1000" height="500" fill="url(#oc)"/>${Object.values(POLY).map(p=>`<polygon points="${pts(p)}" fill="#cfe8b8" stroke="#8fbf86" stroke-width="3" stroke-linejoin="round"/>`).join('')}
 ${C.map((c,i)=>{const x=X(c.lon),y=Y(c.lat);return `<g class="pin" tabindex="0" data-i="${i}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle r="17" fill="${prog[c.id]?'#bfe8c9':'#fff'}" stroke="#355147" stroke-width="2.5"/><text y="6" text-anchor="middle" font-size="19">${c.fl}</text><text y="33" text-anchor="middle" font-size="14" font-weight="800" fill="#27403a" stroke="#fff" stroke-width="3" paint-order="stroke">${c.zh}</text>${prog[c.id]?'<text x="12" y="-12" font-size="14">⭐</text>':''}</g>`}).join('')}</svg></div>
 <div class="st">${C.map(c=>`<span>${c.fl} ${c.zh}${prog[c.id]?' ✓':''}</span>`).join('')}</div>`;
 ov.querySelector('#wx').onclick=close;
 ov.querySelectorAll('.pin').forEach(g=>{const go=()=>country(+g.dataset.i);g.onclick=go;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')go()}});
}
function close(){ov.remove();const l=document.getElementById('districtLauncher');if(l)l.style.display=''}
function country(i){
 const c=C[i];home();const p=document.createElement('div');p.className='wp';
 const row=(t,a)=>`<div><small>${t}</small><b>${a[0]}</b> ${a[1]}<br>${a[2]}</div>`;
 p.innerHTML=`<div style="display:flex;align-items:center;gap:10px"><span style="font-size:40px">${c.fl}</span><div style="flex:1"><div class="z">${c.zh}</div><div>${c.py} · ${c.vi}</div></div><button id="wsay">🔊</button><button id="wback">✕</button></div>
 <div class="g">${row('Thủ đô',c.cap)}${row('Món ăn',c.food)}${row('Địa danh',c.lm)}${row('Chào hỏi',c.hi)}</div>
 <div style="background:#fff4d3;border-radius:12px;padding:10px"><b>${c.s[0]}</b><br>${c.s[1]}<br>${c.s[2]}</div>
 <button id="wq" style="margin-top:12px;width:100%;background:#ffd36b">🎯 Thử thách 3 câu để đóng dấu hộ chiếu</button>`;
 ov.querySelector('.wm').appendChild(p);
 p.querySelector('#wback').onclick=home;p.querySelector('#wsay').onclick=()=>say(c.zh+'。'+c.cap[0]+'。'+c.s[0]);
 p.querySelector('#wq').onclick=()=>quiz(i,p);
}
function quiz(i,p){
 const c=C[i],kinds=[['cap','Thủ đô của '+c.vi+' là gì?'],['food','Món “'+'{x}'+'” nói thế nào?'],['lm','Địa danh “{x}” nói thế nào?'],['name','“'+c.vi+'” viết thế nào?']];
 const Q=shuf(['cap','food','lm']).concat(['name']).slice(0,3).map(k=>{
  let ask,right,pool;
  if(k==='cap'){ask='Thủ đô của '+c.vi+' là gì (tiếng Trung)?';right=c.cap[0]+' '+c.cap[1];pool=C.filter(o=>o!==c).map(o=>o.cap[0]+' '+o.cap[1])}
  else if(k==='food'){ask='“'+c.food[2]+'” nói thế nào?';right=c.food[0]+' '+c.food[1];pool=C.filter(o=>o!==c).map(o=>o.food[0]+' '+o.food[1])}
  else if(k==='lm'){ask='“'+c.lm[2]+'” nói thế nào?';right=c.lm[0]+' '+c.lm[1];pool=C.filter(o=>o!==c).map(o=>o.lm[0]+' '+o.lm[1])}
  else{ask='“'+c.vi+'” nói thế nào?';right=c.zh+' '+c.py;pool=C.filter(o=>o!==c).map(o=>o.zh+' '+o.py)}
  pool=[...new Set(pool)].filter(x=>x!==right);return{ask,right,opts:shuf([right,...shuf(pool).slice(0,3)])}});
 let n=0,ok=0;
 const show=()=>{if(n>=Q.length){if(ok>=2){prog[c.id]=Math.max(prog[c.id]||0,ok);save()}
   p.innerHTML=`<div class="z">${ok>=2?'🎉 Đã đóng dấu '+c.zh+'!':'Thử lại nhé'}</div><p>Đúng ${ok}/${Q.length} câu.${done()===12?' <b>Bạn đã đủ hộ chiếu 12 nước!</b>':''}</p><button id="wb">Về bản đồ</button>`;p.querySelector('#wb').onclick=home;return}
  const q=Q[n];p.innerHTML=`<div>Câu ${n+1}/${Q.length}</div><div class="z" style="font-size:20px;margin:6px 0">${q.ask}</div>${q.opts.map((o,j)=>`<button class="op" data-j="${j}">${o}</button>`).join('')}`;
  p.querySelectorAll('.op').forEach(b=>b.onclick=()=>{const good=q.opts[+b.dataset.j]===q.right;b.classList.add(good?'ok':'no');if(good){ok++;say(q.right.split(' ')[0])}else p.querySelectorAll('.op').forEach(x=>{if(q.opts[+x.dataset.j]===q.right)x.classList.add('ok')});p.querySelectorAll('.op').forEach(x=>x.onclick=null);setTimeout(()=>{n++;show()},900)})};
 show()}
const l0=document.getElementById('districtLauncher');if(l0)l0.style.display='none';
home()}
window.openWorldMap=open;
const old=window.enterRoom;window.enterRoom=function(p){if(p&&p.id==='nuocngoai')return open();return old.apply(this,arguments)};
})();
