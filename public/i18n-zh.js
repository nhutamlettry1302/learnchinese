/* Giao diện tiếng Trung cho Thành phố / Công viên: chỉ HSK1 giữ tiếng Việt, các cấp còn lại hiện tiếng Trung. */
(function(){
const on=()=>{try{return !(typeof ST!=='undefined'&&ST&&ST.lv==='HSK1')}catch(e){return true}};
const X={ // nguyên cả đoạn chữ
'Tiếp tục':'继续','Tạm biệt':'再见','Ra phố':'回街上','Mặc định':'默认','Tường:':'墙壁：','Sàn:':'地板：','Bỏ thử':'取消试看','👁 Thử':'👁 试看',
'🚶 Đi lại, ngồi, nằm':'🚶 走动、坐、躺','🚶 Đi, ngồi, nằm':'🚶 走动、坐、躺','✋ Dời đồ':'✋ 移动家具','🧹 Cất đồ':'🧹 收起家具','🎒 Đồ của tôi':'🎒 我的物品','🛍️ Cửa hàng':'🛍️ 商店',
'💬 Đã trò chuyện hôm nay':'💬 今天已聊过','💬 Trò chuyện (có thưởng)':'💬 聊天（有奖励）','✅ Đã nhận thưởng hôm nay':'✅ 今天已领奖','🎁 Nhận thưởng nhiệm vụ':'🎁 领取任务奖励',
'📘 Bảng nhiệm vụ học':'📘 学习任务板','🚪 Vào trong':'🚪 进去','Bạn trả lời thế nào?':'你怎么回答？','Nhiệm vụ hôm nay:':'今日任务：',
'Đã mua':'已购买','Trang trí':'装饰','Treo tường':'挂墙','Đặt sàn':'摆地上','Đã có':'已有',
'Chưa có đồ nào. Ghé Cửa hàng để mua nhé!':'还没有物品，去商店买吧！',
'Chọn một món rồi bấm vào phòng để đặt. Muốn cất lại thì chọn "Cất đồ".':'选一件物品，再点击房间摆放。想收起来，请选“收起家具”。',
'Bạn trả lời thế nào?':'你怎么回答？','Bạn nói rất tốt!':'你说得很好！','Không sao, luyện thêm nhé!':'没关系，再练习吧！',
'Chưa đủ xu, làm thêm nhiệm vụ nhé!':'金币不够，多做几个任务吧！','Chỗ này có đồ rồi':'这里已经有家具了','Chỗ này không đặt được':'这里不能摆放','Hãy bấm lên tường để treo':'请点击墙壁来悬挂','Không có đường đi tới đó':'没有路可以走到那里','Phòng đã đầy':'房间已经满了',
'Nhiệm vụ hôm nay xong! Gặp NPC để nhận thưởng':'今日任务完成！去找NPC领奖吧',
'Bấm vào sàn hoặc tường để đặt':'点击地板或墙壁来摆放','Bấm một món rồi bấm chỗ mới':'先点一件家具，再点新位置','Bấm vào món đồ để cất lại':'点击家具把它收起来','Bấm vào sàn để đứng dậy':'点击地板站起来','Bấm ghế/giường để ngồi/nằm, bấm sàn để đi':'点击椅子/床来坐/躺，点击地板来走动',
'Cô tặng bạn giường, sofa, ghế và chậu cây cho căn nhà 3D!':'老师送你床、沙发、椅子和盆栽，布置你的3D小屋！','Giáo viên tặng bạn giường, sofa và ghế để thử ngồi, nằm!':'老师送你床、沙发和椅子，试试坐一坐、躺一躺！'};
const R=[ // mẫu có số / tên
[/^Nhà của (.*) 🏠$/,'$1的家 🏠'],[/^Bấm vào phòng để đặt (.*)$/,'点击房间来摆放 $1'],[/^Bấm vào sàn hoặc tường để đặt (.*)$/,'点击地板或墙壁来摆放 $1'],[/^Bấm vào chỗ mới để đặt (.*)$/,'点击新位置来摆放 $1'],
[/^Bấm vào chỗ mới$/,'点击新位置'],
[/^(\s*)hoàn thành thẻ\s*$/,'$1在这里完成'],[/^\s*ở đây (\d+) lần \((\d+)\/(\d+)\)\s*$/,' 卡 $1 次（$2/$3）'],
[/^Thưởng: \+(\d+) EXP, \+(\d+) 🪙(, \+1 vé quay 🎡)?$/,(m,a,b,c)=>'奖励：+'+a+' 经验，+'+b+' 🪙'+(c?'，+1 转盘券 🎡':'')],
[/^(\d+)\/3 đúng · \+(\d+) EXP \+(\d+) 🪙$/,'$1/3 正确 · +$2 经验 +$3 🪙'],
[/^Nhận \+(\d+) EXP, \+(\d+) xu(, \+1 vé quay)?$/,(m,a,b,c)=>'获得 +'+a+' 经验，+'+b+' 金币'+(c?'，+1 转盘券':'')],
[/^Đã mua (.*)$/,'已购买 $1'],[/^Đã cất (.*)$/,'已收起 $1'],[/^👁 Đang xem thử: $/,'👁 正在试看：'],
[/^Bạn có $/,'你有 '],[/^\. Làm nhiệm vụ để kiếm thêm xu\.$/,'。做任务可以赚更多金币。']];
const DAILYZ={listen:'听力',speak:'口语',type:'打字',write:'写汉字',pic:'看图造句',qa:'回答问题',read:'阅读理解',order:'排列句子',mix:'综合'};
const tr=s=>{if(!s||!on())return s;const t=s.trim();if(X[t])return s.replace(t,X[t]);for(const[a,b]of R){if(a.test(s))return s.replace(a,b)}return s};
const ORIG=new WeakMap();
function walk(n){if(n.nodeType===3){const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(p.nodeName))return;const o=ORIG.has(n)?ORIG.get(n):n.data;if(!ORIG.has(n))ORIG.set(n,o);const v=on()?tr(o):o;if(n.data!==v){busy=1;n.data=v;busy=0}else if(!ORIG.has(n)){}return}
 if(n.nodeType===1&&!/^(SCRIPT|STYLE)$/.test(n.nodeName))n.childNodes.forEach(walk)}
let busy=0;
function run(){['pm','toast','hint'].forEach(id=>{const e=document.getElementById(id);if(e)walk(e)})}
// ghi lại bản gốc khi nội dung bị trang ghi đè
const mo=new MutationObserver(ms=>{if(busy)return;for(const m of ms){m.addedNodes&&m.addedNodes.forEach(n=>walk(n));if(m.type==='characterData'){ORIG.delete(m.target);walk(m.target)}}});
function start(){['pm','toast'].forEach(id=>{const e=document.getElementById(id);if(e)mo.observe(e,{childList:true,subtree:true,characterData:true})});run()}
// canvas: các dòng hướng dẫn vẽ trong nhà
const P=CanvasRenderingContext2D.prototype;['fillText','strokeText'].forEach(f=>{const o=P[f];P[f]=function(t,...a){return o.call(this,typeof t==='string'?tr(t):t,...a)}});
window.ZH={on,tr,DAILYZ};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
setInterval(run,1500);
})();
