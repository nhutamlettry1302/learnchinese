/* NPC đứng trước cửa: trò chuyện + nhiệm vụ mỗi ngày */
(function(){
const CV={
truong:[['你好！你是新同学吗？','Nǐ hǎo! Nǐ shì xīn tóngxué ma?','Xin chào! Bạn là bạn học mới à?'],[['是的，我是新同学。','Shì de, wǒ shì xīn tóngxué.','Vâng, mình là bạn học mới.'],['我是老师。','Wǒ shì lǎoshī.','Mình là giáo viên.'],['我不去学校。','Wǒ bú qù xuéxiào.','Mình không đến trường.']],
 ['你叫什么名字？','Nǐ jiào shénme míngzi?','Bạn tên là gì?'],[['我叫小明。','Wǒ jiào Xiǎo Míng.','Mình tên là Tiểu Minh.'],['我很好。','Wǒ hěn hǎo.','Mình rất khỏe.'],['我有一本书。','Wǒ yǒu yì běn shū.','Mình có một quyển sách.']],
 ['你想学什么？','Nǐ xiǎng xué shénme?','Bạn muốn học gì?'],[['我想学汉语。','Wǒ xiǎng xué Hànyǔ.','Mình muốn học tiếng Trung.'],['我想去医院。','Wǒ xiǎng qù yīyuàn.','Mình muốn đến bệnh viện.'],['我不是学生。','Wǒ bú shì xuésheng.','Mình không phải học sinh.']]],
thuvien:[['欢迎来到图书馆！你想做什么？','Huānyíng lái dào túshūguǎn! Nǐ xiǎng zuò shénme?','Chào mừng đến thư viện! Bạn muốn làm gì?'],[['我想借一本书。','Wǒ xiǎng jiè yì běn shū.','Mình muốn mượn một quyển sách.'],['我想喝咖啡。','Wǒ xiǎng hē kāfēi.','Mình muốn uống cà phê.'],['我想买衣服。','Wǒ xiǎng mǎi yīfu.','Mình muốn mua quần áo.']],
 ['你要借什么书？','Nǐ yào jiè shénme shū?','Bạn muốn mượn sách gì?'],[['我要借汉语书。','Wǒ yào jiè Hànyǔ shū.','Mình muốn mượn sách tiếng Trung.'],['我要一杯水。','Wǒ yào yì bēi shuǐ.','Mình muốn một cốc nước.'],['我在公园。','Wǒ zài gōngyuán.','Mình đang ở công viên.']],
 ['这里要安静。','Zhèlǐ yào ānjìng.','Ở đây cần giữ yên lặng.'],[['好的，对不起。','Hǎo de, duìbuqǐ.','Vâng, xin lỗi bạn.'],['我不知道。','Wǒ bù zhīdào.','Mình không biết.'],['再见！','Zàijiàn!','Tạm biệt!']]],
rap:[['你好！你想看什么电影？','Nǐ hǎo! Nǐ xiǎng kàn shénme diànyǐng?','Xin chào! Bạn muốn xem phim gì?'],[['我想看中国电影。','Wǒ xiǎng kàn Zhōngguó diànyǐng.','Mình muốn xem phim Trung Quốc.'],['我想看书。','Wǒ xiǎng kàn shū.','Mình muốn đọc sách.'],['我想睡觉。','Wǒ xiǎng shuìjiào.','Mình muốn đi ngủ.']],
 ['你要几张票？','Nǐ yào jǐ zhāng piào?','Bạn cần mấy vé?'],[['我要两张。','Wǒ yào liǎng zhāng.','Mình cần hai vé.'],['我是学生。','Wǒ shì xuésheng.','Mình là học sinh.'],['我很高兴。','Wǒ hěn gāoxìng.','Mình rất vui.']],
 ['一共五十块。','Yígòng wǔshí kuài.','Tổng cộng 50 tệ.'],[['给你钱，谢谢。','Gěi nǐ qián, xièxie.','Gửi bạn tiền, cảm ơn.'],['我不喝茶。','Wǒ bù hē chá.','Mình không uống trà.'],['电影很好看。','Diànyǐng hěn hǎokàn.','Phim rất hay.']]],
congvien:[['今天天气真好！','Jīntiān tiānqì zhēn hǎo!','Hôm nay thời tiết thật đẹp!'],[['是啊，我们去散步吧。','Shì a, wǒmen qù sànbù ba.','Đúng vậy, chúng ta đi dạo nhé.'],['我要看病。','Wǒ yào kànbìng.','Mình cần đi khám bệnh.'],['我没有钱。','Wǒ méiyǒu qián.','Mình không có tiền.']],
 ['你喜欢什么花？','Nǐ xǐhuan shénme huā?','Bạn thích hoa gì?'],[['我喜欢红色的花。','Wǒ xǐhuan hóngsè de huā.','Mình thích hoa màu đỏ.'],['我喜欢看电影。','Wǒ xǐhuan kàn diànyǐng.','Mình thích xem phim.'],['我在银行。','Wǒ zài yínháng.','Mình đang ở ngân hàng.']],
 ['这里的花很漂亮，对吗？','Zhèlǐ de huā hěn piàoliang, duì ma?','Hoa ở đây rất đẹp, đúng không?'],[['对，非常漂亮！','Duì, fēicháng piàoliang!','Đúng, rất đẹp!'],['不，我很累。','Bù, wǒ hěn lèi.','Không, mình rất mệt.'],['我想坐飞机。','Wǒ xiǎng zuò fēijī.','Mình muốn đi máy bay.']]],
nganhang:[['你好！请问有什么可以帮您？','Nǐ hǎo! Qǐngwèn yǒu shénme kěyǐ bāng nín?','Xin chào! Tôi có thể giúp gì cho bạn?'],[['我想换钱。','Wǒ xiǎng huàn qián.','Mình muốn đổi tiền.'],['我想看电影。','Wǒ xiǎng kàn diànyǐng.','Mình muốn xem phim.'],['我想睡觉。','Wǒ xiǎng shuìjiào.','Mình muốn ngủ.']],
 ['您要换多少钱？','Nín yào huàn duōshao qián?','Bạn muốn đổi bao nhiêu tiền?'],[['我要换一百块。','Wǒ yào huàn yì bǎi kuài.','Mình muốn đổi 100 tệ.'],['我有两个朋友。','Wǒ yǒu liǎng ge péngyou.','Mình có hai người bạn.'],['我在家。','Wǒ zài jiā.','Mình ở nhà.']],
 ['请给我您的护照。','Qǐng gěi wǒ nín de hùzhào.','Xin đưa tôi hộ chiếu của bạn.'],[['好的，在这儿。','Hǎo de, zài zhèr.','Vâng, đây ạ.'],['我不喜欢。','Wǒ bù xǐhuan.','Mình không thích.'],['明天见。','Míngtiān jiàn.','Mai gặp.']]],
benhvien:[['你哪儿不舒服？','Nǐ nǎr bù shūfu?','Bạn khó chịu ở đâu?'],[['我头疼。','Wǒ tóu téng.','Mình bị đau đầu.'],['我喜欢苹果。','Wǒ xǐhuan píngguǒ.','Mình thích táo.'],['我去学校。','Wǒ qù xuéxiào.','Mình đến trường.']],
 ['你发烧了吗？','Nǐ fāshāo le ma?','Bạn có bị sốt không?'],[['有一点儿发烧。','Yǒu yìdiǎnr fāshāo.','Hơi sốt một chút.'],['我不会说汉语。','Wǒ bú huì shuō Hànyǔ.','Mình không biết nói tiếng Trung.'],['我在医院外面。','Wǒ zài yīyuàn wàimiàn.','Mình ở ngoài bệnh viện.']],
 ['多喝水，好好休息。','Duō hē shuǐ, hǎohāo xiūxi.','Uống nhiều nước, nghỉ ngơi cho tốt.'],[['谢谢医生！','Xièxie yīshēng!','Cảm ơn bác sĩ!'],['我想去买衣服。','Wǒ xiǎng qù mǎi yīfu.','Mình muốn đi mua quần áo.'],['我没有书。','Wǒ méiyǒu shū.','Mình không có sách.']]],
khachsan:[['欢迎光临！请问您订房间了吗？','Huānyíng guānglín! Qǐngwèn nín dìng fángjiān le ma?','Xin chào quý khách! Bạn đã đặt phòng chưa?'],[['订了，我姓王。','Dìng le, wǒ xìng Wáng.','Đã đặt rồi, mình họ Vương.'],['我要吃米饭。','Wǒ yào chī mǐfàn.','Mình muốn ăn cơm.'],['我是老师。','Wǒ shì lǎoshī.','Mình là giáo viên.']],
 ['您住几天？','Nín zhù jǐ tiān?','Bạn ở mấy ngày?'],[['我住三天。','Wǒ zhù sān tiān.','Mình ở ba ngày.'],['我三岁。','Wǒ sān suì.','Mình ba tuổi.'],['我很高。','Wǒ hěn gāo.','Mình rất cao.']],
 ['这是您的房卡，房间在五楼。','Zhè shì nín de fángkǎ, fángjiān zài wǔ lóu.','Đây là thẻ phòng, phòng ở tầng 5.'],[['谢谢，再见！','Xièxie, zàijiàn!','Cảm ơn, tạm biệt!'],['我不要。','Wǒ bú yào.','Mình không cần.'],['我去哪儿？','Wǒ qù nǎr?','Mình đi đâu?']]],
cho:[['新鲜的水果！你要买什么？','Xīnxiān de shuǐguǒ! Nǐ yào mǎi shénme?','Trái cây tươi đây! Bạn muốn mua gì?'],[['我要买苹果。','Wǒ yào mǎi píngguǒ.','Mình muốn mua táo.'],['我要看病。','Wǒ yào kànbìng.','Mình muốn khám bệnh.'],['我要坐火车。','Wǒ yào zuò huǒchē.','Mình muốn đi tàu hỏa.']],
 ['苹果五块钱一斤。','Píngguǒ wǔ kuài qián yì jīn.','Táo 5 tệ một cân.'],[['太贵了，便宜一点儿吧。','Tài guì le, piányi yìdiǎnr ba.','Đắt quá, rẻ hơn một chút nhé.'],['我不认识你。','Wǒ bú rènshi nǐ.','Mình không quen bạn.'],['今天星期三。','Jīntiān xīngqī sān.','Hôm nay thứ tư.']],
 ['好吧，你要几斤？','Hǎo ba, nǐ yào jǐ jīn?','Được thôi, bạn lấy mấy cân?'],[['我要两斤。','Wǒ yào liǎng jīn.','Mình lấy hai cân.'],['我有两只猫。','Wǒ yǒu liǎng zhī māo.','Mình có hai con mèo.'],['我在市场。','Wǒ zài shìchǎng.','Mình ở chợ.']]],
quan:[['欢迎！几位？','Huānyíng! Jǐ wèi?','Xin chào! Mấy người ạ?'],[['两位。','Liǎng wèi.','Hai người.'],['两岁。','Liǎng suì.','Hai tuổi.'],['两点。','Liǎng diǎn.','Hai giờ.']],
 ['你们想吃什么？','Nǐmen xiǎng chī shénme?','Các bạn muốn ăn gì?'],[['我们要两碗面条。','Wǒmen yào liǎng wǎn miàntiáo.','Chúng mình gọi hai bát mì.'],['我们去图书馆。','Wǒmen qù túshūguǎn.','Chúng mình đến thư viện.'],['我们是学生。','Wǒmen shì xuésheng.','Chúng mình là học sinh.']],
 ['还要别的吗？','Hái yào bié de ma?','Còn gọi gì nữa không?'],[['不要了，买单。','Bú yào le, mǎidān.','Không cần nữa, tính tiền.'],['我很忙。','Wǒ hěn máng.','Mình rất bận.'],['我是越南人。','Wǒ shì Yuènán rén.','Mình là người Việt Nam.']]],
cuahang:[['欢迎光临！你想买什么？','Huānyíng guānglín! Nǐ xiǎng mǎi shénme?','Chào mừng! Bạn muốn mua gì?'],[['我想买一件衣服。','Wǒ xiǎng mǎi yí jiàn yīfu.','Mình muốn mua một chiếc áo.'],['我想看医生。','Wǒ xiǎng kàn yīshēng.','Mình muốn gặp bác sĩ.'],['我想喝水。','Wǒ xiǎng hē shuǐ.','Mình muốn uống nước.']],
 ['你喜欢什么颜色？','Nǐ xǐhuan shénme yánsè?','Bạn thích màu gì?'],[['我喜欢蓝色。','Wǒ xǐhuan lánsè.','Mình thích màu xanh dương.'],['我喜欢星期五。','Wǒ xǐhuan xīngqī wǔ.','Mình thích thứ sáu.'],['我不在这儿。','Wǒ bú zài zhèr.','Mình không ở đây.']],
 ['这件一百二十块。','Zhè jiàn yì bǎi èrshí kuài.','Chiếc này 120 tệ.'],[['好，我买这件。','Hǎo, wǒ mǎi zhè jiàn.','Được, mình mua chiếc này.'],['我不是老师。','Wǒ bú shì lǎoshī.','Mình không phải giáo viên.'],['我很饿。','Wǒ hěn è.','Mình rất đói.']]],
ga:[['你好！你要去哪儿？','Nǐ hǎo! Nǐ yào qù nǎr?','Xin chào! Bạn muốn đi đâu?'],[['我要去北京。','Wǒ yào qù Běijīng.','Mình muốn đi Bắc Kinh.'],['我在北京。','Wǒ zài Běijīng.','Mình đang ở Bắc Kinh.'],['我喜欢北京。','Wǒ xǐhuan Běijīng.','Mình thích Bắc Kinh.']],
 ['火车八点出发。','Huǒchē bā diǎn chūfā.','Tàu khởi hành lúc 8 giờ.'],[['我要买一张票。','Wǒ yào mǎi yì zhāng piào.','Mình muốn mua một vé.'],['我八岁。','Wǒ bā suì.','Mình tám tuổi.'],['我不吃饭。','Wǒ bù chī fàn.','Mình không ăn cơm.']],
 ['请在三号站台上车。','Qǐng zài sān hào zhàntái shàng chē.','Mời lên tàu ở sân ga số 3.'],[['谢谢，一路平安！','Xièxie, yílù píng\'ān!','Cảm ơn, thượng lộ bình an!'],['我是医生。','Wǒ shì yīshēng.','Mình là bác sĩ.'],['我没有票。','Wǒ méiyǒu piào.','Mình không có vé.']]],
sanbay:[['您好！请出示您的机票。','Nín hǎo! Qǐng chūshì nín de jīpiào.','Xin chào! Xin xuất trình vé máy bay.'],[['好的，给您。','Hǎo de, gěi nín.','Vâng, đây ạ.'],['我不会游泳。','Wǒ bú huì yóuyǒng.','Mình không biết bơi.'],['我很喜欢猫。','Wǒ hěn xǐhuan māo.','Mình rất thích mèo.']],
 ['您要托运行李吗？','Nín yào tuōyùn xíngli ma?','Bạn có ký gửi hành lý không?'],[['要，一个箱子。','Yào, yí ge xiāngzi.','Có, một chiếc vali.'],['我在上海。','Wǒ zài Shànghǎi.','Mình ở Thượng Hải.'],['我吃过了。','Wǒ chī guo le.','Mình ăn rồi.']],
 ['飞机九点起飞，请去三号登机口。','Fēijī jiǔ diǎn qǐfēi, qǐng qù sān hào dēngjīkǒu.','Máy bay cất cánh lúc 9 giờ, mời đến cửa số 3.'],[['谢谢，我这就去。','Xièxie, wǒ zhè jiù qù.','Cảm ơn, mình đi ngay.'],['我很累，再见。','Wǒ hěn lèi, zàijiàn.','Mình mệt, tạm biệt.'],['我没有手机。','Wǒ méiyǒu shǒujī.','Mình không có điện thoại.']]]};
const DAILY={listen:'Nghe',speak:'Nói',type:'Gõ chữ',write:'Viết chữ Hán',pic:'Nhìn hình đặt câu',qa:'Trả lời câu hỏi',read:'Đọc hiểu',order:'Sắp xếp câu',mix:'Tổng hợp'};
const IC={listen:'🎧',speak:'🗣️',type:'⌨️',write:'✍️',pic:'🖼️',qa:'❓',read:'📖',order:'🧩',mix:'🎯'};
const day=()=>{const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()};
const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
const VAR={truong:0,thuvien:1,rap:11,congvien:9,nganhang:8,benhvien:6,khachsan:7,cho:2,quan:3,cuahang:5,ga:5,sanbay:4};
const NAME={truong:'小明',thuvien:'图书管理员',rap:'小安',congvien:'林先生',nganhang:'小银',benhvien:'安医生',khachsan:'小玲',cho:'小梅',quan:'小宝',cuahang:'小梅',ga:'阿明',sanbay:'小云'};
function qst(p){ST.qs=ST.qs||{};let q=ST.qs[p.id];const d=day();if(!q||q.d!==d){const T=(ST.lv==='HSK1'||ST.lv==='city')?['listen','speak','type','write','pic','qa']:['listen','speak','type','write','pic','qa','read','order','mix'];const h=hash(p.id+d);q=ST.qs[p.id]={d,tag:T[h%T.length],need:1+(h>>3)%2,got:0,claimed:false,talk:false,coin:30+(h%3)*10,exp:40+(h%3)*10,tk:h%4===0};}
 return q}
const avail=p=>{const q=qst(p);return!q.talk||!q.claimed};
/* vẽ NPC đứng cửa */
window.drawGate=function(cx,t){for(const p of PLACES){const x=p.x+48,y=p.road-12;
  drawPerson(cx,x,y,{variant:VAR[p.id]??0,scale:.95,moving:false,view:0,time:t,phase:0});
  if(avail(p)){const by=y-78-Math.abs(Math.sin(t/260+p.x))*5;cx.font='22px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('💬',x,by)}
  else{cx.font='18px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('✅',x,y-78)}}};
window.npcAt=function(x,y){for(const p of PLACES)if(Math.abs(x-(p.x+48))<28&&y>p.road-86&&y<p.road+6)return p;return null};
/* hộp thoại */
function face(p){const c=document.createElement('canvas');c.width=90;c.height=110;c.style.cssText='width:70px;height:86px;flex:none';const k=c.getContext('2d');drawPerson(k,45,104,{variant:VAR[p.id]??0,scale:1.45,moving:false,view:0,time:0});return c}
function say2(p,html,extra){$('pm').className='panel';$('pm').innerHTML=`<div style="display:flex;gap:10px;align-items:flex-end;text-align:left"><div id="fc"></div><div style="flex:1"><div class="sub" style="margin:0"><b>${NAME[p.id]||'NPC'}</b> · ${p.zh} ${esc(p.name)}</div><div class="bub">${html}</div></div></div>${extra||''}`;$('ovm').classList.add('on');$('fc').appendChild(face(p))}
function line(l){return`<div class="zl">${esc(l[0])}</div><div class="pl2">${esc(l[1])}</div><div class="vl">${esc(l[2])}</div>`}
window.openNpc=function(p){const q=qst(p);ST.qs[p.id]=q;saveState();const g=CV[p.id];
 const tagN=DAILY[q.tag];
 const dq=q.claimed?`<button class="btn" disabled>✅ Đã nhận thưởng hôm nay</button>`:q.got>=q.need?`<button class="btn gold" id="claim">🎁 Nhận thưởng nhiệm vụ</button>`:`<div class="qcard">${IC[q.tag]} <b>Nhiệm vụ hôm nay:</b> hoàn thành thẻ <b>${tagN}</b> ở đây ${q.need} lần (${q.got}/${q.need})<br><small>Thưởng: +${q.exp} EXP, +${q.coin} 🪙${q.tk?', +1 vé quay 🎡':''}</small></div><button class="btn" id="goq">${IC[q.tag]} Đi làm nhiệm vụ</button>`;
 say2(p,line(g[0]),`<div class="row" style="flex-direction:column;align-items:stretch">${q.talk?`<button class="btn" disabled>💬 Đã trò chuyện hôm nay</button>`:`<button class="btn gold" id="talk">💬 Trò chuyện (có thưởng)</button>`}${dq}<button class="btn" id="board">📘 Bảng nhiệm vụ học</button><button class="btn" id="enter">🚪 Vào trong</button><button class="btn" id="lv">Tạm biệt</button></div>`);
 say(g[0][0]);
 $('talk')&&($('talk').onclick=()=>talk(p,0,0));$('goq')&&($('goq').onclick=()=>{closeM();openTag(p,q.tag==='mix'&&false?'mix':q.tag)});$('claim')&&($('claim').onclick=()=>claim(p));
 $('board').onclick=()=>{closeM();openBoard(p)};$('enter').onclick=()=>{closeM();enterRoom(p)};$('lv').onclick=closeM};
function talk(p,i,ok){const g=CV[p.id],t=i;if(i>=3){const good=ok>=2,gx=good?25+(ok===3?10:0):8,gc=good?10:3;ST.exp+=gx;ST.coins+=gc;const q=qst(p);q.talk=true;saveState();
  say2(p,`<div class="zl">${good?'你说得很好！':'没关系，再练习！'}</div><div class="pl2">${good?'Nǐ shuō de hěn hǎo!':'Méi guānxi, zài liànxí!'}</div><div class="vl">${good?'Bạn nói rất tốt!':'Không sao, luyện thêm nhé!'}</div><p class="reward">${ok}/3 đúng · +${gx} EXP +${gc} 🪙</p>`,`<div class="row"><button class="btn gold" id="bk">Tiếp tục</button></div>`);$('bk').onclick=()=>openNpc(p);return}
 const npcL=g[i*2],opts=g[i*2+1].map((o,k)=>({o,right:k===0})).sort(()=>Math.random()-.5);
 say2(p,line(npcL)+`<div class="sub" style="margin-top:6px">Bạn trả lời thế nào?</div>`,`<div class="opts one">${opts.map((x,k)=>`<button class="opt" data-k="${k}" style="text-align:left"><span class="zhi">${esc(x.o[0])}</span><small style="display:block;font:600 12px var(--f-b);color:inherit;opacity:.8">${esc(x.o[1])} · ${esc(x.o[2])}</small></button>`).join('')}</div>`);
 say(npcL[0]);
 $('pm').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const x=opts[+b.dataset.k],bs=[...$('pm').querySelectorAll('.opt')];bs.forEach(y=>y.disabled=true);b.classList.add(x.right?'ok':'no');if(!x.right)bs[opts.findIndex(o=>o.right)].classList.add('ok');say(opts.find(o=>o.right).o[0]);setTimeout(()=>talk(p,i+1,ok+(x.right?1:0)),x.right?900:1800)})}
function claim(p){const q=qst(p);if(q.claimed||q.got<q.need)return;q.claimed=true;const L0=plvl();ST.exp+=q.exp;ST.coins+=q.coin;if(q.tk)ST.tickets=(ST.tickets||0)+1;const L1=plvl();if(L1>L0){ST.tickets=(ST.tickets||0)+(L1-L0);syncUnlocks()}saveState();toast('Nhận +'+q.exp+' EXP, +'+q.coin+' xu'+(q.tk?', +1 vé quay':''));openNpc(p)}
/* ghi nhận tiến độ nhiệm vụ ngày khi hoàn thành thẻ */
const _end=window.endQ;window.endQ=function(){const p=Q&&Q.p,tag=Q&&Q.tag,ok=Q&&Q.ok/Q.items.length>=.6;_end();if(p&&tag&&ok){const q=qst(p);if(q.tag===tag&&!q.claimed&&q.got<q.need){q.got++;saveState();if(q.got>=q.need)toast('Nhiệm vụ hôm nay xong! Gặp NPC để nhận thưởng')}}};
const st=document.createElement('style');st.textContent=`.bub{background:var(--panel2);border:var(--st) solid var(--outline);border-radius:16px;padding:8px 12px;margin-top:4px}.zl{font:700 21px/1.35 var(--f-z)}.pl2{color:var(--accent);font-weight:700;font-size:14px}.vl{color:var(--muted);font-size:14px}.qcard{background:#fff6d6;color:#3a2a00;border:2px dashed #d9a62e;border-radius:14px;padding:8px 10px;margin:4px 0;text-align:left;font-size:14px;line-height:1.5}.panel .opt.ok{background:var(--good)}`;document.head.appendChild(st);
})();
