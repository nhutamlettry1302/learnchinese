/* Thú cưng cá voi: 7 màu, chọn tự do */
(function(){
const PETS=[['Cá voi xanh dương','蓝鲸','lánjīng'],['Cá voi hồng','粉鲸','fěnjīng'],['Cá voi tím','紫鲸','zǐjīng'],['Cá voi vàng','黄鲸','huángjīng'],['Cá voi xanh lá','绿鲸','lǜjīng'],['Cá voi trắng','白鲸','báijīng'],['Cá voi đen','黑鲸','hēijīng']];
const img=new Image();img.src='img/pets.webp';const CW=190,CH=112;
window.PETS=PETS;
window.drawPetAt=function(k,x,y,face,size,idx,fly){if(!img.complete||!img.naturalWidth)return;idx=idx==null?(ST.pet|0):idx;const w=size*CW/CH*.78,h=size*.78;k.save();k.translate(x,y);if(!fly){k.fillStyle='rgba(0,0,0,.16)';k.beginPath();k.ellipse(0,0,w*.32,h*.1,0,0,7);k.fill()}k.scale(face||1,1);k.drawImage(img,idx*CW,0,CW,CH,-w/2,-h,w,h);k.restore()};
window.drawPetC=function(cx,x,y,face){drawPetAt(cx,x,y,face,50,null,true)};
window.openPets=function(){const cur=ST.pet|0;
 modal(`<h2>Chọn thú cưng 🐋</h2><p class="sub">Bé cá voi sẽ đi theo bạn khắp thành phố và vào cả nhà.</p><div class="pets">${PETS.map((p,i)=>`<button class="pet${i===cur?' on':''}" data-p="${i}"><canvas width="190" height="112"></canvas><b>${p[1]} ${p[2]}</b><small>${p[0]}</small></button>`).join('')}</div><div class="row"><button class="btn gold" id="cl">Xong</button></div>`);
 $('pm').querySelectorAll('.pet').forEach((b,i)=>{const c=b.querySelector('canvas');const go=()=>{const k=c.getContext('2d');k.clearRect(0,0,190,112);k.drawImage(img,i*CW,0,CW,CH,0,0,CW,CH)};if(img.complete)go();else img.addEventListener('load',go);
  b.onclick=()=>{ST.pet=i;saveState();toast('Đã chọn '+PETS[i][0]);openPets()}});$('cl').onclick=closeM};
const st=document.createElement('style');st.textContent='.pets{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}.pet{display:grid;justify-items:center;gap:2px;padding:6px 4px;border-radius:16px;border:var(--st) solid var(--outline);background:var(--panel2);color:var(--ink);cursor:pointer;font-family:var(--f-b)}.pet.on{background:var(--gold);color:#2b1f00}.pet canvas{width:100%;max-width:110px;height:auto}.pet b{font:700 14px var(--f-z)}.pet small{font-size:11px}@media(max-width:480px){.pets{grid-template-columns:repeat(2,1fr)}}';document.head.appendChild(st);
})();
