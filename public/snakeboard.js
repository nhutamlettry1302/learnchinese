/* Bàn cờ Thang và Rắn dùng chung cho phòng học trực tiếp (giáo viên + học sinh) */
(function(){
const L={3:11,8:17,14:23,20:27},Sn={16:6,24:13,29:19,26:10},SP={5:'star',12:'star',22:'star',9:'rock',18:'rock',28:'rock',15:'whirl',25:'whirl',7:'pearl',21:'pearl'};
const EF={star:{ic:'star-fish',t:'Sao biển! Tiến thêm 3 ô',tag:'+3'},rock:{ic:'rock',t:'Đá ngầm! Lùi 2 ô',tag:'−2'},whirl:{ic:'whirlpool',t:'Xoáy nước! Chờ 2 giây',tag:'Lỡ lượt'},pearl:{ic:'pearl',t:'Ngọc trai! Đổ thêm một lần',tag:'Đổ thêm'}};
const GOAL=30,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rc=n=>{const r=Math.floor((n-1)/6),c=(n-1)%6;return[r,r%2?5-c:c]};
/* Một lần di chuyển: trả về vị trí mới, các thông báo, thời gian chờ (ms) */
function move(pos,roll){const ev=[];let p=pos,lock=0,g=0,d=roll;while(g++<3){const from=p;p=Math.min(GOAL,p+d);ev.push('🎲 Xúc xắc '+d+' → ô '+p);if(p>=GOAL)break;
  if(L[p]){ev.push('Thang lên ô '+L[p]);p=L[p];break}
  if(Sn[p]){ev.push('Lươn kéo xuống ô '+Sn[p]);p=Sn[p];break}
  const k=SP[p];if(k==='star'){p=Math.min(GOAL,p+3);ev.push(EF.star.t)}else if(k==='rock'){p=Math.max(0,p-2);ev.push(EF.rock.t)}else if(k==='whirl'){lock=2000;ev.push(EF.whirl.t)}else if(k==='pearl'&&g<3){ev.push(EF.pearl.t);d=1+Math.floor(Math.random()*6);continue}
  break}
 return{pos:p,ev,lock}}
const PM={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
const dice=n=>`<div class="dice3" aria-label="Xúc xắc ${n}">${Array.from({length:9},(_,i)=>`<i class="${(PM[n]||[]).includes(i)?'on':''}"></i>`).join('')}</div>`;
const IC=(n,w)=>window.RWL?RWL.IC(n,w):'';
const cellIc=n=>L[n]?IC('ladder',46)+'<strong>↑ '+L[n]+'</strong>':Sn[n]?IC('eel',46)+'<strong>↓ '+Sn[n]+'</strong>':SP[n]?IC(EF[SP[n]].ic,46)+'<strong>'+EF[SP[n]].tag+'</strong>':'';
/* players: [{id,name,steps,pet}] ; opts.me = id của người xem (học sinh), opts.size = cỡ nhân vật */
function scene(players,opts){opts=opts||{};const sz=opts.size||34,by={};players.forEach(p=>{const s=Math.max(0,Math.min(GOAL,p.steps|0));(by[s]=by[s]||[]).push(p)});
 const tok=(a,max,big)=>{if(!a)return'';const shown=a.slice(0,max),z=big?sz:Math.round(sz*(a.length>=3?.62:a.length===2?.78:1));return shown.map(p=>`<span class="stk${p.id===opts.me?' me':''}" title="${esc(p.name)}">${AV.character(p.pet,z)}</span>`).join('')+(a.length>max?`<span class="smore">+${a.length-max}</span>`:'')};
 const cells=[];for(let n=1;n<=GOAL;n++){const[r,c]=rc(n);cells.push({n,r:4-r,c})}cells.sort((a,b)=>a.r-b.r||a.c-b.c);
 const nm=a=>a?a.slice(0,3).map(p=>esc(p.name)).join(', ')+(a.length>3?'…':''):'';
 return`<div class="sbw"><div class="sbd">${cells.map(x=>{const a=by[x.n];return`<div class="sc ${L[x.n]?'l':Sn[x.n]?'s':SP[x.n]?'p '+(SP[x.n]==='rock'||SP[x.n]==='whirl'?'bad':'good'):''}${x.n===GOAL?' goal':''}"><span class="sn">${x.n===GOAL?'🏁 30':x.n}</span><em>${cellIc(x.n)}</em><span class="stks">${tok(a,3)}</span></div>`}).join('')}</div><div class="sstart"><b>Xuất phát</b><span class="stks">${tok(by[0],12,1)||'<small>Chưa có bạn nào xuất phát</small>'}</span></div></div>`}
function legend(){return`<div class="slg">${IC('ladder',24)} thang lên · ${IC('eel',24)} lươn xuống · ${IC('star-fish',24)} +3 · ${IC('rock',24)} lùi 2 · ${IC('whirlpool',24)} chờ 2 giây · ${IC('pearl',24)} đổ thêm</div>`}
window.SNK={GOAL,move,scene,legend,dice,L,Sn,SP};
})();
