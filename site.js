const tabButtons=[...document.querySelectorAll('.week-tab')];const tabPanels=[...document.querySelectorAll('.tab-panel')];
tabButtons.forEach(btn=>btn.addEventListener('click',()=>{
  tabButtons.forEach(b=>b.classList.toggle('active',b===btn));
  tabPanels.forEach(p=>p.classList.toggle('active',p.id===btn.dataset.tab));
  window.scrollTo({top:0,behavior:'instant'});
}));

const content=document.querySelector('#content');
// Convierte las subsecciones descriptivas en acordeones, sin alterar su texto.
for(const heading of [...content.querySelectorAll('h4')].reverse()){
  const details=document.createElement('details'); details.className='accordion';
  const summary=document.createElement('summary'); summary.textContent=heading.textContent;
  const body=document.createElement('div'); body.className='accordion-body';
  let node=heading.nextElementSibling;
  while(node&&!['H2','H3','H4'].includes(node.tagName)){const next=node.nextElementSibling;body.append(node);node=next;}
  details.append(summary,body); heading.replaceWith(details);
}
for(const table of content.querySelectorAll('table')){const wrap=document.createElement('div');wrap.className='table-wrap';table.before(wrap);wrap.append(table)}
const toc=document.querySelector('#toc');const headings=[...content.querySelectorAll('h2,h3')];
headings.forEach((h,i)=>{h.id=`section-${i+1}`;const a=document.createElement('a');a.href=`#${h.id}`;a.textContent=h.textContent.replace(/^\d+\.\s*/,'');toc.append(a)});
const links=[...toc.querySelectorAll('a')];const observe=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(hit){links.forEach(a=>a.classList.toggle('active',a.hash===`#${hit.target.id}`))}},{rootMargin:'-15% 0px -70% 0px'});headings.forEach(h=>observe.observe(h));
const bar=document.querySelector('.progress span');addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=`${max?scrollY/max*100:0}%`},{passive:true});
