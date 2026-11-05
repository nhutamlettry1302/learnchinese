/* Nhiệm vụ nhiều dạng: nghe, nói, gõ chữ, viết chữ Hán, nhìn hình đặt câu, hỏi đáp, đọc, sắp xếp câu */
(function(){
const TAGS={
 listen:{ic:'🎧',n:'Nghe',d:'Nghe và chọn từ đúng'},
 speak:{ic:'🗣️',n:'Nói',d:'Đọc to, máy nghe và chấm'},
 type:{ic:'⌨️',n:'Gõ chữ',d:'Gõ chữ Hán hoặc pinyin'},
 write:{ic:'✍️',n:'Viết chữ Hán',d:'Dùng ngón tay viết chữ'},
 pic:{ic:'🖼️',n:'Nhìn hình đặt câu',d:'Viết một câu tiếng Trung'},
 qa:{ic:'❓',n:'Trả lời câu hỏi',d:'Chọn câu trả lời đúng'},
 read:{ic:'📖',n:'Đọc hiểu',d:'Nghĩa, từ, điền chỗ trống'},
 order:{ic:'🧩',n:'Sắp xếp câu',d:'Xếp các từ thành câu'},
 mix:{ic:'🎯',n:'Tổng hợp',d:'Trộn nhiều dạng'}};
const SET1=['listen','speak','type','write','pic','qa'],SETALL=['listen','speak','type','write','pic','qa','read','order','mix'];
const tagsFor=()=>(ST.lv==='HSK1'||ST.lv==='city')?SET1:SETALL;
const R=a=>a[Math.random()*a.length|0];
/* ---- ngân hàng nội dung ---- */
const PICS=[
['🍎','苹果','我喜欢吃苹果。','Wǒ xǐhuan chī píngguǒ.','Tôi thích ăn táo.'],['📚','书','我有很多书。','Wǒ yǒu hěn duō shū.','Tôi có rất nhiều sách.'],
['🐱','猫','我家有一只猫。','Wǒ jiā yǒu yì zhī māo.','Nhà tôi có một con mèo.'],['🐶','狗','那是我的狗。','Nà shì wǒ de gǒu.','Đó là con chó của tôi.'],
['🍵','茶','我想喝茶。','Wǒ xiǎng hē chá.','Tôi muốn uống trà.'],['🍚','米饭','我想吃米饭。','Wǒ xiǎng chī mǐfàn.','Tôi muốn ăn cơm.'],
['💧','水','我喝水。','Wǒ hē shuǐ.','Tôi uống nước.'],['🚗','车','他开车去学校。','Tā kāi chē qù xuéxiào.','Anh ấy lái xe đến trường.'],
['🏫','学校','我在学校学习汉语。','Wǒ zài xuéxiào xuéxí Hànyǔ.','Tôi học tiếng Trung ở trường.'],['🌧️','下雨','今天下雨。','Jīntiān xià yǔ.','Hôm nay trời mưa.'],
['👩‍🏫','老师','她是我的老师。','Tā shì wǒ de lǎoshī.','Cô ấy là giáo viên của tôi.'],['👨‍👩‍👧','家','我家有四口人。','Wǒ jiā yǒu sì kǒu rén.','Nhà tôi có bốn người.'],
['📱','手机','我有一个手机。','Wǒ yǒu yí ge shǒujī.','Tôi có một chiếc điện thoại.'],['🎬','电影','我们去看电影。','Wǒmen qù kàn diànyǐng.','Chúng ta đi xem phim.'],
['✈️','飞机','他坐飞机去北京。','Tā zuò fēijī qù Běijīng.','Anh ấy đi máy bay đến Bắc Kinh.'],['🏥','医院','医生在医院工作。','Yīshēng zài yīyuàn gōngzuò.','Bác sĩ làm việc ở bệnh viện.'],
['☀️','天气','今天天气很好。','Jīntiān tiānqì hěn hǎo.','Hôm nay thời tiết rất đẹp.'],['👕','衣服','这件衣服很漂亮。','Zhè jiàn yīfu hěn piàoliang.','Chiếc áo này rất đẹp.'],
['🛒','商店','我去商店买东西。','Wǒ qù shāngdiàn mǎi dōngxi.','Tôi đến cửa hàng mua đồ.'],['🐟','鱼','我喜欢吃鱼。','Wǒ xǐhuan chī yú.','Tôi thích ăn cá.'],
['🚆','火车','火车很快。','Huǒchē hěn kuài.','Tàu hỏa rất nhanh.'],['🍉','西瓜','西瓜很好吃。','Xīguā hěn hǎo chī.','Dưa hấu rất ngon.']];
const QAS=[
['你叫什么名字？','Nǐ jiào shénme míngzi?','我叫小明。','Wǒ jiào Xiǎo Míng.'],['你好吗？','Nǐ hǎo ma?','我很好，谢谢。','Wǒ hěn hǎo, xièxie.'],
['你是哪国人？','Nǐ shì nǎ guó rén?','我是越南人。','Wǒ shì Yuènán rén.'],['你几岁？','Nǐ jǐ suì?','我十岁。','Wǒ shí suì.'],
['你家有几口人？','Nǐ jiā yǒu jǐ kǒu rén?','我家有四口人。','Wǒ jiā yǒu sì kǒu rén.'],['现在几点？','Xiànzài jǐ diǎn?','现在八点。','Xiànzài bā diǎn.'],
['今天星期几？','Jīntiān xīngqī jǐ?','今天星期三。','Jīntiān xīngqī sān.'],['你想吃什么？','Nǐ xiǎng chī shénme?','我想吃苹果。','Wǒ xiǎng chī píngguǒ.'],
['你想喝什么？','Nǐ xiǎng hē shénme?','我想喝茶。','Wǒ xiǎng hē chá.'],['这是什么？','Zhè shì shénme?','这是书。','Zhè shì shū.'],
['你在哪儿？','Nǐ zài nǎr?','我在学校。','Wǒ zài xuéxiào.'],['你去哪儿？','Nǐ qù nǎr?','我去商店。','Wǒ qù shāngdiàn.'],
['你会说汉语吗？','Nǐ huì shuō Hànyǔ ma?','我会说一点儿。','Wǒ huì shuō yìdiǎnr.'],['这个多少钱？','Zhège duōshao qián?','十块钱。','Shí kuài qián.'],
['你住在哪儿？','Nǐ zhù zài nǎr?','我住在河内。','Wǒ zhù zài Hénèi.'],['今天天气怎么样？','Jīntiān tiānqì zěnmeyàng?','今天很热。','Jīntiān hěn rè.'],
['你做什么工作？','Nǐ zuò shénme gōngzuò?','我是老师。','Wǒ shì lǎoshī.'],['谢谢你！','Xièxie nǐ!','不客气。','Bú kèqi.'],
['再见！','Zàijiàn!','明天见。','Míngtiān jiàn.'],['你有几个朋友？','Nǐ yǒu jǐ ge péngyou?','我有三个朋友。','Wǒ yǒu sān ge péngyou.'],
['你喜欢什么颜色？','Nǐ xǐhuan shénme yánsè?','我喜欢蓝色。','Wǒ xǐhuan lánsè.'],['你什么时候回家？','Nǐ shénme shíhou huí jiā?','我六点回家。','Wǒ liù diǎn huí jiā.']];
const ORD=[['我/喜欢/吃/苹果/。','Tôi thích ăn táo'],['他/在/学校/学习/汉语/。','Anh ấy học tiếng Trung ở trường'],['今天/天气/很/好/。','Hôm nay thời tiết rất đẹp'],['我们/一起/去/看/电影/。','Chúng ta cùng đi xem phim'],['她/是/我的/老师/。','Cô ấy là giáo viên của tôi'],['我/想/喝/一杯/茶/。','Tôi muốn uống một tách trà'],['你/想/去/哪儿/？','Bạn muốn đi đâu'],['我/家/有/四/口/人/。','Nhà tôi có bốn người'],['他/坐/火车/去/北京/。','Anh ấy đi tàu hỏa đến Bắc Kinh'],['这/件/衣服/很/漂亮/。','Chiếc áo này rất đẹp']];
/* ---- tiện ích ---- */
const norm=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ü/g,'v').replace(/[\s\d'’·。，,.!?！？]/g,'').toLowerCase();
const hz=s=>String(s).replace(/[^一-鿿]/g,'');
function pool(p){let a;if(ST.lv==='city'||!levelObj())a=(p.words||[]);else{const les=lessonObj(),L=levelObj();a=(les?les.w:L.ls.flatMap(x=>x.w)).map(w=>[w[0],w[1],w[2],'','']);}
 const sc=w=>{const s=ST.ws[w[0]]||{c:0,x:0};return(s.c+s.x===0?2:s.x>s.c?1.5:.3)+Math.random()};
 return a.slice().sort((x,y)=>sc(y)-sc(x))}
function distract(w,from,n,key){const out=[],seen=new Set([w[key]]);for(const x of shuffle(from)){if(out.length>=n)break;if(seen.has(x[key]))continue;seen.add(x[key]);out.push(x)}return out}
function mcItems(p,kinds,n){const src=pool(p),all=(ST.lv==='city'||!levelObj())?ALL:levelObj().ls.flatMap(x=>x.w).map(w=>[w[0],w[1],w[2],'','']);
 return src.slice(0,n).map((w,i)=>{const type=kinds[i%kinds.length];let t=type;if(t==='cloze'&&!(w[3]&&w[3].includes(w[0])))t='hanzi';
  const pl=t==='mean'?all:src.length>=4?src:all;return{w,type:t,opts:shuffle([w,...distract(w,pl,3,t==='mean'?2:0)])}})}
/* ---- tạo đề theo thẻ ---- */
function build(p,tag){const src=pool(p);
 if(tag==='listen')return mcItems(p,['listen'],6);
 if(tag==='read')return mcItems(p,shuffle(['mean','hanzi','cloze','mean','hanzi','cloze']),6);
 if(tag==='mix')return buildMix(p);
 if(tag==='type')return src.slice(0,5).map(w=>({type:'type',w}));
 if(tag==='speak')return src.filter(w=>hz(w[0]).length<=6).slice(0,5).map(w=>({type:'speak',w}));
 if(tag==='write'){const s=src.filter(w=>hz(w[0]).length<=2);return(s.length>=4?s:src).slice(0,4).map(w=>({type:'write',w:[hz(w[0]).slice(0,2)||w[0],w[1],w[2]]}))}
 if(tag==='pic'){if(ST.lv==='HSK1'||ST.lv==='city')return shuffle(PICS).slice(0,5).map(x=>({type:'pic',emoji:x[0],need:x[1],model:x[2],py:x[3],vn:x[4]}));
  return src.slice(0,5).map(w=>({type:'sent',w,need:hz(w[0])}))}
 if(tag==='qa')return shuffle(QAS).slice(0,6).map(x=>{const wr=shuffle(QAS.filter(y=>y[2]!==x[2])).slice(0,3);return{type:'qa',q:x[0],qpy:x[1],a:x[2],apy:x[3],opts:shuffle([[x[2],x[3]],...wr.map(y=>[y[2],y[3]])])}});
 if(tag==='order')return shuffle(ORD).slice(0,5).map(x=>({type:'order',parts:x[0].split('/'),vn:x[1]}));
 return[]}
function buildMix(p){const t=shuffle(['listen','type','read','qa','speak','order']).slice(0,6),out=[];for(const g of t){const b=build(p,g);if(b.length)out.push(b[0])}return out}
/* ---- bảng nhiệm vụ ---- */
window.openBoard=function(p){const T=tagsFor(),pk=k=>(prog[p.id+'|'+k]||{}).stars||0;
 const npc=roomNames[p.id==='home'?9:(staff[p.id]??10)];
 $('pq').innerHTML=`<h2>${p.zh} · ${esc(p.name)}</h2><div class="sub">${esc(modeTitle())}</div><p style="margin:2px 0 8px"><b>${esc(npc)}</b>：${esc(greet(p))}</p><div class="board">${T.map(k=>`<button class="bd2" data-t="${k}"><span>${TAGS[k].ic}</span><b>${TAGS[k].n}</b><small>${TAGS[k].d}</small><i>${'⭐'.repeat(pk(k))||'—'}</i></button>`).join('')}</div><div class="row"><button class="btn" id="bx">Ra phố</button></div>`;
 $('ovq').classList.add('on');$('bx').onclick=()=>$('ovq').classList.remove('on');
 $('pq').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>openTag(p,b.dataset.t))};
const GREET=['你好！欢迎光临！','你好！今天学什么？','欢迎！想做哪个任务？','你好，朋友！'];
const greet=p=>R(GREET)+' · Chào bạn! Chọn một nhiệm vụ nhé.';
window.openTag=function(p,tag){const items=build(p,tag);if(!items.length){toast('Chưa có đề cho dạng này');return}
 Q={p,tag,i:0,ok:0,items,pts:0,coin:0};$('ovq').classList.add('on');showQ()};
window.openQ=function(p){openBoard(p)};
/* ---- hiển thị câu hỏi ---- */
const MC=['mean','hanzi','cloze','listen'];
const chip=q=>`<span class="tg">${TAGS[Q.tag]?TAGS[Q.tag].ic+' '+TAGS[Q.tag].n:''}</span>`;
function frame(inner){const p=Q.p;$('pq').innerHTML=`<h2>${p.zh} · ${esc(p.name)} ${chip()}</h2><div class="sub" style="margin-bottom:6px">${esc(modeTitle())}</div><div class="prog">${Q.items.map((_,i)=>`<i class="${i<Q.i?'d':''}"></i>`).join('')}</div>${inner}<button class="btn" id="exitLesson" style="margin:4px">Ra phố</button>`;
 $('exitLesson').onclick=()=>{Q=null;$('ovq').classList.remove('on')}}
function done(right,pts,coin,w){if(!Q)return;if(right)Q.ok++;Q.pts+=right?(pts||10):0;Q.coin+=right?(coin||4):0;if(w){const s=ST.ws[w[0]]||(ST.ws[w[0]]={c:0,x:0});right?s.c++:s.x++}
 const a=Q;setTimeout(()=>{if(Q!==a)return;Q.i++;Q.i<Q.items.length?showQ():endQ()},right?800:1800)}
function fb(t,ok){const e=$('fb');if(e){e.className='fbk '+(ok?'ok':'no');e.innerHTML=t}}
window.showQ=function(){const q=Q.items[Q.i];
 if(MC.includes(q.type))return showMC(q);
 ({type:rType,speak:rSpeak,write:rWrite,pic:rPic,sent:rSent,qa:rQa,order:rOrder})[q.type](q)};
function showMC(q){let head='',zhOpts=true;
 if(q.type==='mean'){zhOpts=false;head=`<div class="zh">${esc(q.w[0])}</div><div class="py">${esc(q.w[1])} <button class="say" style="width:40px;height:40px;font-size:18px" id="sy" aria-label="Nghe">🔊</button></div><div class="sub">Chọn nghĩa đúng</div>`}
 else if(q.type==='hanzi')head=`<div class="vn">${esc(q.w[2])}</div><div class="sub">Chọn từ tiếng Trung đúng</div>`;
 else if(q.type==='cloze'){head=`<div class="sen">${q.w[3].replace(q.w[0],'<u>&nbsp;</u>')}</div><div class="sub">${esc(q.w[4])}<br>Chọn từ điền vào chỗ trống</div>`}
 else head=`<button class="say" id="sy" aria-label="Nghe">🔊</button><div class="sub" style="margin-top:8px">Nghe và chọn từ bạn nghe được</div>`;
 const long=q.opts.some(o=>!zhOpts&&o[2].length>26);
 frame(`${head}<div class="opts${long?' one':''}">${q.opts.map((o,i)=>`<button class="opt${zhOpts?' zhb':''}" data-i="${i}">${zhOpts?esc(o[0]):esc(o[2])}</button>`).join('')}</div>`);
 const sy=$('sy');if(sy){sy.onclick=()=>say(q.w[0]);if(q.type==='listen')setTimeout(()=>say(q.w[0]),250)}
 $('pq').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const o=q.opts[+b.dataset.i],right=o[0]===q.w[0],bs=[...$('pq').querySelectorAll('.opt')];bs.forEach(x=>x.disabled=true);b.classList.add(right?'ok':'no');if(!right)bs.find(x=>q.opts[+x.dataset.i][0]===q.w[0]).classList.add('ok');if(q.type!=='mean')say(q.w[0]);done(right,10,4,q.w)})}
/* gõ chữ */
function rType(q){const w=q.w;frame(`<div class="vn">${esc(w[2])}</div><div class="sub">Gõ chữ Hán hoặc pinyin của từ này <button class="say" style="width:36px;height:36px;font-size:16px" id="sy">🔊</button></div><input id="ti" autocomplete="off" autocapitalize="off" placeholder="Gõ chữ Hán hoặc pinyin…"><div id="fb"></div><div class="row"><button class="btn gold" id="ck">Kiểm tra</button><button class="btn" id="sk">Xem đáp án</button></div>`);
 $('sy').onclick=()=>say(w[0]);const ti=$('ti');ti.focus();let fin=false;
 const check=()=>{if(fin)return;const v=ti.value.trim();if(!v)return;fin=true;const right=v===w[0]||hz(v)===hz(w[0])&&hz(v)||norm(v)===norm(w[1]);fb(right?`✅ Đúng! <b>${esc(w[0])}</b> ${esc(w[1])}`:`❌ Đáp án: <b>${esc(w[0])}</b> ${esc(w[1])}`,right);say(w[0]);done(right,12,5,w)};
 $('ck').onclick=check;ti.onkeydown=e=>{if(e.key==='Enter')check()};$('sk').onclick=()=>{if(fin)return;fin=true;fb(`Đáp án: <b>${esc(w[0])}</b> ${esc(w[1])}`,false);say(w[0]);done(false,0,0,w)}}
/* nói */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function sim(a,b){a=hz(a);b=hz(b);if(!b)return 0;let m=0,j=0;for(const c of b){const k=a.indexOf(c,j);if(k>=0){m++;j=k+1}}return m/Math.max(a.length,b.length)}
function rSpeak(q){const w=q.w;frame(`<div class="zh">${esc(w[0])}</div><div class="py">${esc(w[1])}</div><div class="sub">${esc(w[2])}</div><div id="fb"></div><div class="row"><button class="btn" id="sy">🔊 Nghe mẫu</button><button class="btn gold" id="mic">🎤 ${SR?'Bấm và đọc':'Mình đã đọc xong'}</button></div>`);
 $('sy').onclick=()=>say(w[0]);let fin=false;
 $('mic').onclick=()=>{if(fin)return;
  if(!SR){fin=true;fb('Trình duyệt này chưa nhận diện được giọng nói. Hãy dùng Chrome để được chấm. Lần này tính là đã luyện.',true);done(true,6,2,w);return}
  const r=new SR();r.lang='zh-CN';r.maxAlternatives=5;fb('🎤 Đang nghe… hãy đọc to',true);
  r.onresult=e=>{if(fin)return;fin=true;const alts=[...e.results[0]].map(x=>x.transcript),best=Math.max(...alts.map(a=>sim(a,w[0]))),right=best>=.75;fb(right?`✅ Tốt lắm! Máy nghe được: ${esc(alts[0])}`:`❌ Máy nghe được: ${esc(alts[0])||'(không rõ)'}<br>Mẫu: <b>${esc(w[0])}</b> ${esc(w[1])}`,right);done(right,15,6,w)};
  r.onerror=e=>{if(fin)return;fb(e.error==='not-allowed'?'Hãy cho phép dùng micro rồi bấm lại.':'Chưa nghe rõ, bấm lại nhé.',false)};
  r.onend=()=>{if(!fin)fb('Chưa nghe thấy gì, bấm lại và đọc to nhé.',false)};try{r.start()}catch(e){}}}
/* viết chữ Hán */
function loadHW(cb){if(window.HanziWriter)return cb(true);if(loadHW.s)return cb(false);loadHW.s=1;const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';s.onload=()=>cb(true);s.onerror=()=>cb(false);document.head.appendChild(s)}
function rWrite(q){const w=q.w,n=Math.min(2,hz(w[0]).length||1);frame(`<div class="vn">${esc(w[2])}</div><div class="py">${esc(w[1])} <button class="say" style="width:36px;height:36px;font-size:16px" id="sy">🔊</button></div><div class="sub">Dùng ngón tay hoặc chuột viết chữ Hán vào khung</div><canvas id="wc" width="${n*240}" height="240" style="touch-action:none;width:${n*150}px;max-width:100%;border-radius:14px;background:#fffdf6;border:3px solid var(--outline)"></canvas><div id="mdl"></div><div id="fb"></div><div class="row"><button class="btn" id="clr">🧽 Xóa</button><button class="btn gold" id="shw">👀 Xem chữ mẫu</button></div>`);
 $('sy').onclick=()=>say(w[0]);const c=$('wc'),g=c.getContext('2d');
 const grid=()=>{g.clearRect(0,0,c.width,c.height);g.strokeStyle='#e6d6b8';g.lineWidth=2;g.setLineDash([6,6]);for(let i=0;i<n;i++){const x=i*240;g.strokeRect(x+3,3,234,234);g.beginPath();g.moveTo(x+120,3);g.lineTo(x+120,237);g.moveTo(x+3,120);g.lineTo(x+237,120);g.stroke()}g.setLineDash([])};grid();
 g.lineWidth=9;g.lineCap=g.lineJoin='round';g.strokeStyle='#17352f';let dr=false;
 const pt=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 c.onpointerdown=e=>{dr=true;c.setPointerCapture(e.pointerId);const[x,y]=pt(e);g.beginPath();g.moveTo(x,y);g.lineTo(x+.1,y+.1);g.stroke()};
 c.onpointermove=e=>{if(!dr)return;const[x,y]=pt(e);g.lineTo(x,y);g.stroke()};c.onpointerup=c.onpointercancel=()=>{dr=false};
 $('clr').onclick=grid;let fin=false;
 $('shw').onclick=()=>{if(fin)return;fin=true;say(w[0]);const ch=hz(w[0]).split('');$('mdl').innerHTML=`<div class="zh" style="margin:6px 0 0">${esc(w[0])}</div><div id="hwb" style="display:flex;gap:6px;justify-content:center"></div>`;
  loadHW(ok=>{if(!ok)return;const box=$('hwb');if(!box)return;ch.forEach(cc=>{const d=document.createElement('div');d.style.cssText='width:110px;height:110px;background:#fffdf6;border-radius:12px;border:2px solid var(--outline)';box.appendChild(d);try{HanziWriter.create(d,cc,{width:106,height:106,padding:6,strokeAnimationSpeed:1.4,delayBetweenStrokes:150}).animateCharacter()}catch(e){}})});
  $('shw').outerHTML='';$('clr').outerHTML=`<button class="btn gold" id="yes">✅ Mình viết đúng</button><button class="btn" id="no">❌ Chưa đúng</button>`;
  $('yes').onclick=()=>{$('yes').disabled=$('no').disabled=true;done(true,12,5,w)};$('no').onclick=()=>{$('yes').disabled=$('no').disabled=true;done(false,0,0,w)}}}
/* chấm câu bằng luật (AI sẽ thay sau) */
function ruleCheck(v,need){const h=hz(v),out={ok:false,msg:''};
 if(h.length<4){out.msg='Câu hơi ngắn, hãy viết ít nhất 4 chữ Hán.';return out}
 if(h.length/Math.max(1,v.replace(/\s/g,'').length)<.6){out.msg='Hãy viết bằng chữ Hán nhé.';return out}
 if(need&&!h.includes(hz(need))){out.msg='Câu chưa có từ <b>'+esc(need)+'</b>.';return out}
 out.ok=true;out.msg=/[。！？]$/.test(v.trim())?'Câu đủ ý, có từ khóa và dấu câu.':'Câu có từ khóa. Nhớ thêm dấu câu “。” cuối câu nhé.';return out}
function sentUI(q,top,need,model,py,vn){frame(`${top}<textarea id="ta" rows="2" placeholder="Viết một câu tiếng Trung…" style="width:100%;font:700 20px var(--f-z);padding:10px;border-radius:14px;border:var(--st) solid var(--outline);background:var(--panel2);color:var(--ink)"></textarea><div id="fb"></div><div class="row"><button class="btn gold" id="ck">Nộp câu</button><button class="btn" id="sk">Xem câu mẫu</button></div>`);
 let fin=false;$('ta').focus();
 $('ck').onclick=()=>{if(fin)return;const v=$('ta').value.trim();if(!v)return;fin=true;const r=ruleCheck(v,need);fb(`${r.ok?'✅':'❌'} ${r.msg}${model?`<br>Câu mẫu: <b>${esc(model)}</b>${py?'<br>'+esc(py):''}${vn?'<br><i>'+esc(vn)+'</i>':''}`:''}`,r.ok);if(model)say(model);done(r.ok,18,7,q.w)};
 $('sk').onclick=()=>{if(fin)return;fin=true;fb(`Câu mẫu: <b>${esc(model||'')}</b><br>${esc(py||'')}<br><i>${esc(vn||'')}</i>`,false);if(model)say(model);done(false,0,0,q.w)}}
function rPic(q){sentUI(q,`<div style="font-size:84px;line-height:1.1;margin:4px 0">${q.emoji}</div><div class="sub">Nhìn hình và viết một câu có từ <b class="zhi">${esc(q.need)}</b></div>`,q.need,q.model,q.py,q.vn)}
function rSent(q){sentUI(q,`<div class="zh">${esc(q.w[0])}</div><div class="py">${esc(q.w[1])}</div><div class="sub">${esc(q.w[2])}<br>Đặt một câu có từ này</div>`,q.need,'','','')}
/* hỏi đáp */
function rQa(q){frame(`<div class="sen">${esc(q.q)}</div><div class="py">${esc(q.qpy)} <button class="say" style="width:36px;height:36px;font-size:16px" id="sy">🔊</button></div><div class="sub">Chọn câu trả lời phù hợp</div><div class="opts one">${q.opts.map((o,i)=>`<button class="opt zhb" style="font-size:22px" data-i="${i}">${esc(o[0])}<small style="display:block;font:600 13px var(--f-b)">${esc(o[1])}</small></button>`).join('')}</div>`);
 $('sy').onclick=()=>say(q.q);setTimeout(()=>say(q.q),250);
 $('pq').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const o=q.opts[+b.dataset.i],right=o[0]===q.a,bs=[...$('pq').querySelectorAll('.opt')];bs.forEach(x=>x.disabled=true);b.classList.add(right?'ok':'no');if(!right)bs.find(x=>q.opts[+x.dataset.i][0]===q.a).classList.add('ok');say(q.a);done(right,10,4)})}
/* sắp xếp câu */
function rOrder(q){const tgt=q.parts.join('');let pick=[],bank=shuffle(q.parts.map((t,i)=>({t,i})));
 const draw=()=>{frame(`<div class="vn" style="font-size:20px">${esc(q.vn)}</div><div class="sub">Bấm các từ theo đúng thứ tự</div><div class="ans">${pick.map(x=>`<b class="ch">${esc(x.t)}</b>`).join('')||'<span class="sub">…</span>'}</div><div class="bank">${bank.map(x=>`<button class="ch" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div><div id="fb"></div><div class="row"><button class="btn" id="rs">↩️ Làm lại</button></div>`);
  $('rs').onclick=()=>{bank=shuffle(q.parts.map((t,i)=>({t,i})));pick=[];draw()};
  $('pq').querySelectorAll('.bank .ch').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,x=bank.find(y=>y.i===i);bank=bank.filter(y=>y!==x);pick.push(x);
   if(!bank.length){const right=pick.map(y=>y.t).join('')===tgt;draw();fb(right?'✅ Đúng rồi!':'❌ Đáp án: <b>'+esc(tgt)+'</b>',right);say(tgt);done(right,12,5)}else draw()})};draw()}
/* ---- kết thúc: tính sao theo tỉ lệ đúng ---- */
window.endQ=function(){happyUntil=performance.now()+4500;const p=Q.p,tag=Q.tag,N=Q.items.length,n=Q.ok,ratio=n/N,st=ratio>=1?3:ratio>=.8?2:ratio>=.6?1:0,key=p.id+'|'+tag,old=prog[key]||{best:0,stars:0},score=Math.round(ratio*100);
 const first=!old.stars&&st>0,gx=Q.pts+(st===3?30:0)+(first?20:0),gc=Q.coin+(st===3?15:0);
 if(score>old.best||st>old.stars)prog[key]={best:Math.max(score,old.best),stars:Math.max(st,old.stars)};
 const ps=Math.max(0,...Object.keys(prog).filter(k=>k===p.id||k.startsWith(p.id+'|')).map(k=>prog[k].stars||0));prog[p.id]={best:Math.max((prog[p.id]||{}).best||0,score),stars:ps};
 const L0=plvl();ST.exp+=gx;ST.coins+=gc;const L1=plvl();let lvTxt='';
 if(L1>L0){ST.tickets=(ST.tickets||0)+(L1-L0);const ns=syncUnlocks();lvTxt=`<p class="sub"><b>Lên cấp ${L1}!</b> Bạn nhận 1 vé vòng quay 🎡${ns.length?' và mở skin mới: <b>'+ns.map(i=>SKINS[i]).join(', ')+'</b> 👗':''}</p>`}
 saveState();
 const rev=Q.items.filter(i=>i.w).map(i=>`<div><b>${esc(i.w[0])}</b> ${esc(i.w[1])} · ${esc(i.w[2])}</div>`).join('');
 $('pq').innerHTML=`<h2>${st?'Hoàn thành nhiệm vụ!':'Thử lại nhé'}</h2><div class="sub">${esc(p.name)} ${p.zh} · ${TAGS[tag].ic} ${TAGS[tag].n} · đúng ${n}/${N}</div><div class="stars">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div><p class="reward">+${gx} EXP &nbsp; +${gc} 🪙</p>${lvTxt}${rev?'<div class="rev">'+rev+'</div>':''}
 <div class="row"><button class="btn gold" id="again">Làm lại</button><button class="btn" id="more">Nhiệm vụ khác</button>${ST.tickets?'<button class="btn" id="spin2">🎡 Quay ('+ST.tickets+')</button>':''}<button class="btn" id="back">Về thành phố</button></div>`;
 $('again').onclick=()=>openTag(p,tag);$('more').onclick=()=>openBoard(p);const s2=$('spin2');if(s2)s2.onclick=()=>{$('ovq').classList.remove('on');openWheel()};$('back').onclick=()=>{$('ovq').classList.remove('on');$('hint').textContent='Bấm vào một tòa nhà để đi tiếp'};postScore()};
/* ---- kiểu dáng ---- */
const st=document.createElement('style');st.textContent=`.board{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:6px 0}.bd2{position:relative;display:grid;gap:2px;justify-items:center;padding:12px 8px;border-radius:18px;border:var(--st) solid var(--outline);background:var(--panel2);color:var(--ink);cursor:pointer;box-shadow:0 4px 0 var(--outline);font-family:var(--f-b)}.bd2 span{font-size:30px}.bd2 b{font:800 16px var(--f-d)}.bd2 small{color:var(--muted);font-size:12px;line-height:1.25}.bd2 i{font-style:normal;font-size:13px}.bd2:active{transform:translateY(3px);box-shadow:none}.tg{display:inline-block;font:700 12px var(--f-b);padding:2px 9px;border-radius:99px;background:var(--gold);color:#2b1f00;vertical-align:middle;margin-left:4px}.fbk{margin:8px 0;padding:8px 10px;border-radius:12px;font-weight:700;line-height:1.5}.fbk.ok{background:var(--good);color:#04210f}.fbk.no{background:var(--bad);color:#2a0a08}.ans{min-height:54px;border-bottom:3px dashed var(--outline);margin:8px 0;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:6px}.bank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:6px 0}.ch{font:700 24px var(--f-z);padding:8px 12px;border-radius:14px;border:var(--st) solid var(--outline);background:var(--panel2);color:var(--ink);cursor:pointer}.ans .ch{background:var(--gold);color:#2b1f00}.zhi{font:700 22px var(--f-z)}`;document.head.appendChild(st);
})();
