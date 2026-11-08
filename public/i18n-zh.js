/* Giao diện tiếng Trung cho Thành phố / Công viên: chỉ HSK1 giữ tiếng Việt, các cấp còn lại hiện tiếng Trung. */
(function(){
const on=()=>{try{return !(typeof ST!=='undefined'&&ST&&ST.lv==='HSK1')}catch(e){return true}};
const X={ // nguyên cả đoạn chữ
'Thành Phố Cá Voi':'鲸鱼城市','Cấp/Bài':'等级/课','Nhà':'家','Tủ skin':'衣橱','Quay':'转盘','Địa điểm':'地点','👘 Tủ skin':'👘 衣橱',
'Bấm vào một tòa nhà hoặc con đường để đi':'点击建筑或道路前往','Bấm vào tòa nhà để vào làm nhiệm vụ':'点击建筑进入做任务','Bấm vào một tòa nhà để đi tiếp':'点击一栋建筑继续','Bấm vào tòa nhà có dấu ! để bắt đầu':'点击带“!”的建筑开始',
'Chủ đề thành phố':'城市主题','Tất cả các bài':'全部课程',
'← Ra phố':'← 回街上','Đổi khu':'换区域','Gặp NPC':'见NPC','📘 Nhiệm vụ':'📘 任务','Đóng':'关闭','Nghe câu này':'听这句','Luyện tập cùng mình':'和我一起练习','Vào khám phá':'进去探索','Bảng nhiệm vụ':'任务板',
'Thành phố mở rộng':'扩展城市','16 khu với 64 NPC, gồm 4 hồn ma thật trong nhà ma · Công viên được giữ nguyên':'16个区域、64位NPC，包括鬼屋里的4只鬼 · 公园保持不变',
'Chạm vào một khu hoặc con đường để đi · ❗ khu có bài tập thưởng 🪙 · bảng Lối ra phía dưới để về phố':'点击区域或道路前往 · ❗ 有练习可得 🪙 · 下方出口牌可回街上',
'Hiệu ứng nhà ma: bật':'鬼屋特效：开','Hiệu ứng nhà ma: tắt':'鬼屋特效：关','Âm nhà ma: tắt':'鬼屋声音：关','Âm nhà ma: bật':'鬼屋声音：开',
'Tủ trang phục thế giới':'世界服装柜','36 skin nam/nữ · 12 quốc gia · Có dáng ngồi và nằm':'36套男女皮肤 · 12个国家 · 有坐姿和躺姿','Nhân vật nữ':'女角色','Nhân vật nam':'男角色',
'Trước':'前','Phải':'右','Sau':'后','Trái':'左','Ngồi nghiêng':'侧坐','Ngồi thẳng':'正坐','Nằm':'躺','Tất cả':'全部','Phong cách':'风格','Quốc gia':'国家',
'Hằng ngày':'日常','Thủy thủ':'水手','Học bá':'学霸','Mùa đông':'冬季','Nông trại':'农场','Ngôi sao':'明星','Bộ sưu tập phong cách':'风格系列','Bộ sưu tập quốc gia':'国家系列','Mặc trang phục':'穿上','Hủy':'取消',
'Trung Quốc':'中国','Việt Nam':'越南','Nhật Bản':'日本','Hàn Quốc':'韩国','Thái Lan':'泰国','Pháp':'法国','Mỹ':'美国',
'Đi':'去','Bấm "Đi" để tự đi đến đó.':'点击“去”自动前往。','Chào mừng bạn ghé thăm!':'欢迎光临！','📘 Bắt đầu nhiệm vụ':'📘 开始任务','🛍️ Mua đồ trang trí':'🛍️ 购买装饰',
'Mời bạn nghỉ chân và trò chuyện. 你好！Nǐ hǎo — Xin chào!':'请休息一下，聊聊天吧。你好！Nǐ hǎo','Vòng quay may mắn 🎡':'幸运转盘 🎡','Mỗi lần lên cấp bạn nhận 1 vé. Có thể trúng xu, EXP, đồ trang trí hoặc skin mới.':'每次升级获得1张券。可能抽到金币、经验、装饰或新皮肤。',
'Đăng xuất?':'退出登录？','Thành tích đã được lưu. Đăng nhập lại bằng email để chơi tiếp.':'成绩已保存。用邮箱重新登录即可继续。','Đăng xuất':'退出登录','Ở lại':'留下','Đang đăng nhập:':'当前登录：',
'Xếp hạng người chơi':'玩家排行榜','Đang tải…':'加载中…','Xếp theo tổng EXP':'按总经验排序','Chưa có ai trong bảng, bạn có thể là người đầu tiên!':'榜上还没有人，你可以成为第一个！','Bảng xếp hạng chưa được bật':'排行榜还没有开启',
'Menu':'菜单','🧑 Hồ sơ và skin':'🧑 档案和皮肤','🐋 Chọn thú cưng':'🐋 选择宠物','📚 Chọn cấp và bài':'📚 选择等级和课','🏆 Xếp hạng lớp':'🏆 班级排行','🚪 Đăng nhập':'🚪 登录','🌙 Ngày / đêm':'🌙 白天 / 夜晚','❓ Cách chơi':'❓ 玩法','🌲 Về Rừng Cá Voi':'🌲 回鲸鱼森林',
'Cách chơi':'玩法','Đi dạo thôi!':'去逛逛吧！','Bấm đường để đi bộ, bấm tòa nhà để vào và chọn':'点击道路步行，点击建筑进入并选择','Bắt đầu nhiệm vụ':'开始任务','(6 câu từ vựng của cấp và bài bạn chọn).':'（6道你所选等级和课的词汇题）。',
'Trả lời đúng được':'答对可获得','EXP':'经验','xu 🪙':'金币 🪙','. Lên cấp được 1 vé':'。升级得1张','vòng quay 🎡':'转盘券 🎡','và mở':'并解锁','skin mới':'新皮肤','. Dùng xu mua đồ ở':'。用金币在','Cửa hàng':'商店','để trang trí':'购买家具，装饰','nhà của bạn':'你的家','(ngôi nhà có biển "Nhà của bạn" trong thành phố).':'（街上挂着“你的家”牌子的房子）。',
'Bạn đang học cấp nào?':'你在学哪个等级？','Nhiệm vụ trong thành phố sẽ dùng từ vựng của đúng cấp và bài bạn chọn.':'城市任务会使用你所选等级和课的词汇。','Áp dụng':'应用',
'Hồ sơ của bạn':'你的档案','Nhập tên và chọn nhân vật.':'输入名字并选择角色。','Bạn nam':'男生','Bạn nữ':'女生','Lưu':'保存','Làm lại':'重来',
'Máy chưa phát được âm thanh. Hãy bật loa, tắt chế độ im lặng hoặc thử trình duyệt Chrome.':'无法播放声音。请打开喇叭、关闭静音模式，或试试Chrome浏览器。',
'Chưa lưu được lên máy chủ, tạm lưu trên máy này':'暂时无法保存到服务器，先保存在本机','Bạn đã đi hết 16 nơi. Giỏi lắm!':'你已经逛遍16个地方了。真棒！','Bạn được thêm 1 vé quay!':'你多了1张转盘券！','Bạn hết vé. Làm nhiệm vụ để lên cấp và nhận thêm vé nhé!':'没有券了。做任务升级就能获得更多券！','Hoàn thành nhiệm vụ!':'任务完成！',
'🏠 Nhà của tôi':'🏠 我的家','Singapore':'新加坡','Ấn Độ':'印度','Anh':'英国','Đức':'德国','Úc':'澳大利亚','Cấp và bài':'等级和课',
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
const MODE=a=>a.replace(/Tất cả các bài/,'全部课程').replace(/Chủ đề thành phố/,'城市主题').replace(/Bài (\d+)/,'第$1课');
const SEAS=a=>a.replace('Xuân','春').replace('Hạ','夏').replace('Thu','秋').replace('Đông','冬');
const R=[ // mẫu 2
[/^Tất cả các bài của cấp \((\d+) từ\)$/,'本级全部课程（$1 个词）'],[/^Bài (\d+) · (.*) \((\d+) từ\)$/,'第$1课 · $2（$3 个词）'],[/^HSK 4 \(chuẩn 3\.0\)$/,'HSK 4（3.0标准）'],
[/^🎡 Vòng quay \((\d+)\)$/,'🎡 转盘 ($1)'],[/^Quay \(còn (\d+) vé\)$/,'转一转（还有 $1 张券）'],[/^🚪 Đăng xuất \((.*)\)$/,'🚪 退出登录 ($1)'],[/^Nhiệm vụ: (.*)$/,(m,a)=>'任务：'+MODE(a)],
[/^Mùa: tự động theo tháng \((.*)\)$/,(m,a)=>'季节：按月份自动（'+SEAS(a)+'）'],[/^Mùa: (.*)$/,(m,a)=>'季节：'+SEAS(a)],[/^Skin này mở ở cấp (\d+) hoặc trúng ở vòng quay$/,'这套皮肤在 $1 级解锁，或从转盘抽到'],
[/^Chào mừng (.*) trở lại! Cấp (\d+)$/,'欢迎回来，$1！等级 $2'],[/^Chào (.*)! Bấm vào tòa nhà có dấu ! để bắt đầu$/,'你好，$1！点击带“!”的建筑开始'],[/^Đang đi đến (.*)$/,'正在前往 $1'],[/^Đang đến gặp (.*)$/,'正在去见 $1'],];
const R1=[
[/^Những người bạn ở (.*)$/,'这里的朋友们'],[/^(\d+) skin nam\/nữ · (\d+) quốc gia/,'$1套男女皮肤 · $2个国家'],
[/^Khám phá (\d+) khu$/,'探索 $1 个区域'],[/^Đang học: (.*)$/,(m,a)=>'正在学习：'+MODE(a)],
[/^Nhà của (.*) 🏠$/,'$1的家 🏠'],[/^Bấm vào phòng để đặt (.*)$/,'点击房间来摆放 $1'],[/^Bấm vào sàn hoặc tường để đặt (.*)$/,'点击地板或墙壁来摆放 $1'],[/^Bấm vào chỗ mới để đặt (.*)$/,'点击新位置来摆放 $1'],
[/^Bấm vào chỗ mới$/,'点击新位置'],
[/^(\s*)hoàn thành thẻ\s*$/,'$1在这里完成'],[/^\s*ở đây (\d+) lần \((\d+)\/(\d+)\)\s*$/,' 卡 $1 次（$2/$3）'],
[/^Thưởng: \+(\d+) EXP, \+(\d+) 🪙(, \+1 vé quay 🎡)?$/,(m,a,b,c)=>'奖励：+'+a+' 经验，+'+b+' 🪙'+(c?'，+1 转盘券 🎡':'')],
[/^(\d+)\/3 đúng · \+(\d+) EXP \+(\d+) 🪙$/,'$1/3 正确 · +$2 经验 +$3 🪙'],
[/^Nhận \+(\d+) EXP, \+(\d+) xu(, \+1 vé quay)?$/,(m,a,b,c)=>'获得 +'+a+' 经验，+'+b+' 金币'+(c?'，+1 转盘券':'')],
[/^Đã mua (.*)$/,'已购买 $1'],[/^Đã cất (.*)$/,'已收起 $1'],[/^👁 Đang xem thử: $/,'👁 正在试看：'],
[/^Bạn có $/,'你有 '],[/^\. Làm nhiệm vụ để kiếm thêm xu\.$/,'。做任务可以赚更多金币。']];
const DAILYZ={listen:'听力',speak:'口语',type:'打字',write:'写汉字',pic:'看图造句',qa:'回答问题',read:'阅读理解',order:'排列句子',mix:'综合'};
const tr=s=>{if(!s||!on())return s;const t=s.trim();if(X[t])return s.replace(t,X[t]);for(const[a,b]of R.concat(R1)){if(a.test(s))return s.replace(a,b)}return s};
const ORIG=new WeakMap();
function walk(n){if(n.nodeType===3){const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(p.nodeName))return;const o=ORIG.has(n)?ORIG.get(n):n.data;if(!ORIG.has(n))ORIG.set(n,o);const v=on()?tr(o):o;if(n.data!==v){busy=1;n.data=v;busy=0}else if(!ORIG.has(n)){}return}
 if(n.nodeType===1&&!/^(SCRIPT|STYLE)$/.test(n.nodeName))n.childNodes.forEach(walk)}
let busy=0;
function run(){['pm','toast','hint','districtLauncher','restaurantov'].forEach(id=>{const e=document.getElementById(id);if(e){walk(e);if(!e.__zo){e.__zo=1;mo.observe(e,{childList:true,subtree:true,characterData:true})}}});const tp=document.querySelector('.top');if(tp)walk(tp)}
// ghi lại bản gốc khi nội dung bị trang ghi đè
const mo=new MutationObserver(ms=>{if(busy)return;for(const m of ms){m.addedNodes&&m.addedNodes.forEach(n=>walk(n));if(m.type==='characterData'){ORIG.delete(m.target);walk(m.target)}}});
function start(){['pm','toast','hint'].forEach(id=>{const e=document.getElementById(id);if(e)mo.observe(e,{childList:true,subtree:true,characterData:true})});const tp=document.querySelector('.top');if(tp)mo.observe(tp,{childList:true,subtree:true,characterData:true});run()}
// canvas: các dòng hướng dẫn vẽ trong nhà
const P=CanvasRenderingContext2D.prototype;['fillText','strokeText'].forEach(f=>{const o=P[f];P[f]=function(t,...a){return o.call(this,typeof t==='string'?tr(t):t,...a)}});
window.ZH={on,tr,DAILYZ};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
setInterval(run,1500);
})();
