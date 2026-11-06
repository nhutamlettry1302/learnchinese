'use strict';
const root=document.documentElement,theme=document.getElementById('th');
function syncTheme(){const dark=root.dataset.theme==='dark';theme.textContent=dark?'☀':'☾';theme.setAttribute('aria-label',dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối')}
syncTheme();theme.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('rw_theme',root.dataset.theme)}catch(e){}syncTheme()});
const menu=document.getElementById('menu'),links=document.getElementById('nl');
function closeMenu(){links.classList.remove('open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});links.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(!e.target.closest('nav'))closeMenu()});
const filters=[...document.querySelectorAll('[data-filter]')],courses=[...document.querySelectorAll('[data-level]')];
filters.forEach(button=>button.addEventListener('click',()=>{const group=button.dataset.filter;filters.forEach(b=>{const active=b===button;b.classList.toggle('on',active);b.setAttribute('aria-pressed',String(active))});let count=0;courses.forEach(card=>{card.hidden=group!=='all'&&card.dataset.level!==group;if(!card.hidden)count++});document.getElementById('filter-status').textContent=count+' khóa học'}));
const contact=window.ROXIE_CONTACT||{},host=document.getElementById('contact-links');let configured=false;
function addContact(label,url){try{const parsed=new URL(url);if(!['https:','mailto:'].includes(parsed.protocol))return;const a=document.createElement('a');a.className='btn';a.textContent=label;a.href=parsed.href;if(parsed.protocol==='https:'){a.target='_blank';a.rel='noopener noreferrer'}host.appendChild(a);configured=true}catch(e){}}
if(contact.zalo)addContact('Nhắn cô qua Zalo ↗',contact.zalo);if(contact.facebook)addContact('Facebook ↗',contact.facebook);if(contact.email)addContact('Gửi email ↗','mailto:'+contact.email);
if(configured){document.getElementById('contact-note').hidden=true;document.getElementById('contact-fallback').hidden=true}
