/* Đọc file Word (.docx) của giáo viên thành bộ câu hỏi cho phòng chơi. Chạy hoàn toàn trên trình duyệt, không gửi file đi đâu.
   Nhận dạng:
   - Từ vựng: dòng bảng hoặc dòng chữ có dạng  Chữ Hán | pinyin | nghĩa tiếng Việt  (ngăn bằng ô bảng, Tab, | hoặc dấu cách rộng).
   - Ngữ pháp, kiểu 1: câu có chỗ trống ____ (hoặc （ ）), các đáp án A. B. C. D. và dòng "Đáp án: B".
   - Ngữ pháp, kiểu 2: câu hoàn chỉnh, từ cần hỏi đặt trong 【】, ví dụ  我【想】去学校。 */
(function(){
const HAN=/[㐀-鿿]/,BLANK=/_{2,}|＿{2,}|（\s*）|\(\s*\)|【\s*】/;
async function inflate(u8){const ds=new DecompressionStream('deflate-raw');return new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer()}
async function readXml(buf){const u=new Uint8Array(buf),dv=new DataView(buf);let e=u.length-22;while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error('Không phải file Word (.docx). Hãy lưu lại dạng .docx rồi thử lại.');
 const cnt=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const td=new TextDecoder();
 for(let i=0;i<cnt;i++){if(dv.getUint32(p,true)!==0x02014b50)break;const method=dv.getUint16(p+10,true),cs=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lho=dv.getUint32(p+42,true),name=td.decode(u.subarray(p+46,p+46+nl));
  if(name==='word/document.xml'){const ln=dv.getUint16(lho+26,true),le=dv.getUint16(lho+28,true),data=u.subarray(lho+30+ln+le,lho+30+ln+le+cs);return td.decode(method===0?data:await inflate(data))}
  p+=46+nl+el+cl}
 throw new Error('Không tìm thấy nội dung trong file Word.')}
function ptext(p){let s='';const w=n=>{for(const c of n.childNodes){if(c.nodeType!==1)continue;const t=c.localName;if(t==='t')s+=c.textContent;else if(t==='tab')s+='\t';else if(t==='br'||t==='cr')s+='\n';else if(t==='del'||t==='delText'||t==='instrText')continue;else w(c)}};w(p);return s}
function blocks(xml){const doc=new DOMParser().parseFromString(xml,'application/xml'),body=doc.getElementsByTagName('w:body')[0];if(!body)throw new Error('File Word trống hoặc hỏng.');const out=[];
 const walk=n=>{for(const c of n.children){const t=c.localName;if(t==='p')ptext(c).split('\n').forEach(x=>{if(x.trim())out.push({p:x.trim()})});
  else if(t==='tbl'){for(const tr of c.getElementsByTagName('w:tr')){const cells=[];for(const tc of tr.children){if(tc.localName!=='tc')continue;const ps=[...tc.getElementsByTagName('w:p')].map(ptext).join(' ').replace(/\s+/g,' ').trim();cells.push(ps)}if(cells.some(x=>x))out.push({row:cells})}}
  else if(t!=='sectPr')walk(c)}};
 walk(body);return out}
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
function vocabFromCells(cells){cells=cells.map(clean).filter(x=>x&&!/^\d+[\.\)]?$/.test(x));if(cells.length<2)return null;const zi=cells.findIndex(x=>HAN.test(x)&&x.length<=16&&!BLANK.test(x));if(zi<0)return null;
 const rest=cells.filter((_,i)=>i!==zi);if(rest.some(x=>HAN.test(x)&&x.length>6))return null;const py=rest.length>=2?rest[0]:'',vn=rest.length>=2?rest.slice(1).join('; '):rest[0];if(!vn||HAN.test(vn)&&!/[a-zA-Zà-ỹ]/.test(vn))return null;if(rest.length>=2&&HAN.test(py))return null;return[cells[zi],py,vn]}
function vocabFromLine(s){if(BLANK.test(s)||/【.+】/.test(s))return null;let parts=s.split(/\t+|\s*[|｜]\s*|\s{3,}/).filter(Boolean);if(parts.length<2){const m=s.match(/^([㐀-鿿·\s]{1,16})\s*[（(]\s*([^)）]+)[)）]\s*[:：\-–—]?\s*(.+)$/);if(m)parts=[m[1],m[2],m[3]];else{const m2=s.match(/^([㐀-鿿]{1,10})\s+([^㐀-鿿]+?)\s*[:：\-–—]\s*(.+)$/);if(m2)parts=[m2[1],m2[2],m2[3]]}}
 return parts.length>=2?vocabFromCells(parts):null}
function opts(s){const re=/(?:^|\s)([A-D])\s*[\.\、．:：\)）]\s*/g,hit=[];let m;while((m=re.exec(s)))hit.push({l:m[1],i:m.index,e:re.lastIndex});if(hit.length<2)return null;const o={};hit.forEach((h,k)=>{o[h.l]=clean(s.slice(h.e,k+1<hit.length?hit[k+1].i:s.length))});return{o,head:s.slice(0,hit[0].i)}}
const ANS=/(?:答案|đáp\s*án|dap\s*an|đ\/a|ĐA)\s*[:：]?\s*([A-D]\b|[^\s].*)/i;
function quizFrom(lines){const qs=[];let cur=null;const flush=()=>{if(cur&&cur.s&&cur.ans){const L=cur.o?Object.keys(cur.o):[];let a=null,list=null;if(L.length>=2){list=L.map(k=>cur.o[k]);a=/^[A-D]$/i.test(cur.ans)?cur.o[cur.ans.toUpperCase()]:list.find(x=>x===cur.ans)||null}else a=cur.ans;if(a&&!/^[A-D]$/.test(a)){const q={s:cur.s,a,zh:cur.s.replace('____',a)};if(list&&list.length>=2)q.o=list;qs.push(q)}}cur=null};
 for(let raw of lines){const s=clean(raw);if(!s)continue;
  const br=[...s.matchAll(/【([^】]+)】/g)].filter(x=>x[1].trim());if(br.length&&!/^\s*【\s*】/.test(s)&&!BLANK.test(s.replace(/【[^】]+】/g,''))){flush();br.forEach((m,i)=>{const full=s.replace(/【([^】]+)】/g,(x,y,off)=>off===m.index?'\u0000':y);const sent=full.replace('\u0000','____').replace(/[【】]/g,'');qs.push({s:sent,a:m[1].trim(),zh:full.replace('\u0000',m[1].trim())})});continue}
  if(BLANK.test(s)&&HAN.test(s)){flush();let stem=s,o=opts(s);if(o){stem=o.head;cur={s:'',o:o.o}}else cur={s:'',o:null};cur.s=clean(stem.replace(/_{2,}|＿{2,}|（\s*）|\(\s*\)|【\s*】/,'____').replace(/^\s*\d+\s*[\.\、．\)）]\s*/,''));const am=s.match(ANS);if(am&&!o)cur.ans=clean(am[1]).replace(/[）)]$/,'');else if(am)cur.ans=clean(am[1]).slice(0,1);
   if(am&&!o)cur.s=cur.s.replace(/[（(]\s*(?:答案|đáp\s*án)[^）)]*[）)]/i,'').trim();continue}
  if(cur){const o=opts(s);if(o&&!cur.o){cur.o=o.o}else if(o&&cur.o)Object.assign(cur.o,o.o);const am=s.match(ANS);if(am){cur.ans=clean(am[1]).replace(/[）)]$/,'');if(/^[A-D]\b/i.test(cur.ans)&&cur.o)cur.ans=cur.ans[0].toUpperCase();flush()}}}
 flush();return qs}
async function parse(buf){const bl=blocks(await readXml(buf)),vocab=[],seen=new Set(),lines=[];
 for(const b of bl){if(b.row){const v=vocabFromCells(b.row);if(v&&!BLANK.test(b.row.join(' '))&&!/【.+】/.test(b.row.join(' '))){if(!seen.has(v[0])){seen.add(v[0]);vocab.push(v)}}else lines.push(b.row.join(' '))}
  else{const v=vocabFromLine(b.p);if(v){if(!seen.has(v[0])){seen.add(v[0]);vocab.push(v)}}else lines.push(b.p)}}
 const quiz=quizFrom(lines);return{vocab,quiz}}
window.DocxImport={parse};
})();
