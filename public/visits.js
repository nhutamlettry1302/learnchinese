/* Ghi 1 lượt truy cập mỗi trình duyệt mỗi ngày cho mỗi trang (ẩn danh). Cần config.js nạp trước. */
(function(){try{if(/[?&]mock=1/.test(location.search))return;const RW=window.RW;if(!RW||!RW.url||!RW.key)return;const d=new Date(),day=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
const page=(location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'')||'trang-chu').slice(0,60),k='rw_visit:'+page;
if(localStorage.getItem(k)===day)return;let id=localStorage.getItem('rw_vid');if(!id){id=(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)+Date.now());localStorage.setItem('rw_vid',id)}
fetch(RW.url+'/rest/v1/rpc/log_visit',{method:'POST',headers:{apikey:RW.key,Authorization:'Bearer '+RW.key,'Content-Type':'application/json'},body:JSON.stringify({p_visitor:id,p_page:page}),keepalive:true}).then(r=>{if(r.ok)localStorage.setItem(k,day)}).catch(()=>{})}catch(e){}})();
