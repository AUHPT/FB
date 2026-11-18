/* ================= APP ================= */
const KEY='mangroves-menu-studio-v1',FKEY='mangroves-menu-studio-fonts';
const $=s=>document.querySelector(s);
const uid=()=>Math.random().toString(36).slice(2,10);
const clone=o=>JSON.parse(JSON.stringify(o));
const IC={
 chev:'<polyline points="9 6 15 12 9 18"/>',up:'<polyline points="6 15 12 9 18 15"/>',down:'<polyline points="6 9 12 15 18 9"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',grip:'<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
 undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',redo:'<path d="m15 14 5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',
 more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',pdf:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M12 18v-6M9 15l3 3 3-3"/>',
 zin:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',zout:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/>',fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 dl:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',ul:'<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',reset:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',font:'<path d="M4 20 10 4h1l6 16M6.5 14h8"/>',brk:'<path d="M4 12h4M10 12h4M16 12h4M6 4v4h12V4M6 20v-4h12v4"/>'};
const ico=(n,s)=>`<svg class="ic" viewBox="0 0 24 24" ${s?`style="width:${s}px;height:${s}px"`:''}>${IC[n]}</svg>`;
function h(tag,attrs,...kids){const e=document.createElement(tag);for(const k in attrs||{}){const v=attrs[k];if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else if(v!==false&&v!=null)e.setAttribute(k,v===true?'':v);}
  for(const c of kids.flat()){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(c));}return e;}
function toast(msg,ms){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),ms||2400);}

/* ---------- storage ---------- */
function withIds(m){(m.sections||[]).forEach(s=>{s.id=s.id||uid();(s.items||[]).forEach(i=>i.id=i.id||uid());(s.cols||[]).forEach(c=>{c.id=c.id||uid();c.items.forEach(i=>i.id=i.id||uid());});});return m;}
function seed(id){const m=withIds(clone(SEED_MENUS[id]));m.updatedAt=null;return m;}
let DB={menus:{}};
try{DB=JSON.parse(localStorage.getItem(KEY))||DB;}catch(e){}
DB.menus=DB.menus||{};
for(const id in SEED_MENUS)if(!DB.menus[id])DB.menus[id]=seed(id);else withIds(DB.menus[id]);
let FONTS={};try{FONTS=JSON.parse(localStorage.getItem(FKEY))||{};}catch(e){}
let saveT=null;
function persist(){clearTimeout(saveT);setSave('dirty');saveT=setTimeout(()=>{try{localStorage.setItem(KEY,JSON.stringify(DB));setSave('ok');}catch(e){setSave('err');toast('Could not save in this browser: '+e.message);}},450);}
function setSave(s){const el=$('#saveState');if(!el)return;el.classList.toggle('dirty',s!=='ok');el.querySelector('span').textContent=s==='ok'?'All changes saved':s==='err'?'Not saved':'Saving…';}

/* ---------- fonts ---------- */
function injectUserFonts(){let css='';for(const w of ['600','700','800'])if(FONTS[w])css+=`@font-face{font-family:'AktivUser';font-weight:${w};src:url(${FONTS[w]});}`;
  for(const [k,w,st] of [['gpp-400','400','normal'],['gpp-500','500','normal'],['gpp-600','600','normal'],['gpp-400i','400','italic']])if(FONTS[k])css+=`@font-face{font-family:'GPPUser';font-weight:${w};font-style:${st};src:url(${FONTS[k]});}`;
  for(const [k,f,w] of [['alv-400','AlvUser','400'],['alv-500','AlvUser','500'],['alv-700','AlvUser','700'],['gca-400','GCAUser','400'],['gca-700','GCAUser','700']])if(FONTS[k])css+=`@font-face{font-family:'${f}';font-weight:${w};src:url(${FONTS[k]});}`;
  for(const [k,w,st] of [['aa-400','400','normal'],['aa-700','700','normal'],['aa-400i','400','italic']])if(FONTS[k])css+=`@font-face{font-family:'AdobeArabicUser';font-weight:${w};font-style:${st};src:url(${FONTS[k]});}`;
  $('#userFontsCss').textContent=css;}
injectUserFonts();
async function fontsReady(){try{await Promise.all(['300 11pt "Fraunces V"','400 13pt "Parastoo V"','600 13pt "Parastoo V"','600 12pt "Archivo V"','800 12pt "Archivo V"','700 12pt "Archivo V"','400 12pt "EB Garamond V"','600 12pt "EB Garamond V"','500 12pt "EB Garamond V"','italic 400 12pt "EB Garamond V"','400 16pt AdobeArabicE','700 16pt AdobeArabicE','italic 400 16pt AdobeArabicE','400 11pt "Spectral T"','500 11pt "Spectral T"','700 11pt "Spectral T"','400 11pt "Readex T"','700 11pt "Readex T"'].map(f=>document.fonts.load(f,/Parastoo|Arabic/.test(f)?'بب':/Readex/.test(f)?'بب Ab 12':'Ab Ō')));if(FONTS['600'])await document.fonts.load('600 12pt AktivUser');await document.fonts.ready;}catch(e){}}

/* ---------- routing ---------- */
let route={};
function go(hash){if(location.hash!==hash)location.hash=hash;else render();}
window.addEventListener('hashchange',render);
function parse(){const p=location.hash.replace(/^#\/?/,'').split('/').filter(Boolean);return {outlet:p[0],menu:p[1]};}
function crumbs(parts){$('#crumbs').innerHTML='';parts.forEach((p,i)=>{if(i)$('#crumbs').append(h('span',{html:ico('chev',13),style:'color:#c4c4c8;display:flex'}));
  $('#crumbs').append(p.href?h('a',{href:p.href},p.t):h('span',{class:'cur'},p.t));});}
function render(){route=parse();$('#topActions').innerHTML='';
  if(!route.outlet)return outletsScreen();
  const o=OUTLETS.find(o=>o.id===route.outlet);if(!o)return go('#/');
  if(!route.menu)return menusScreen(o);
  const m=DB.menus[route.menu];if(!m)return go('#/'+o.id);
  editorScreen(o,route.menu);}

/* ---------- screen 1: outlets ---------- */
function logoMini(kind){const L=LOGOS[kind];return `<svg viewBox="0 0 ${L.w} ${L.h}"><path fill="currentColor" d="${L.d}"/></svg>`;}
function outletsScreen(){crumbs([{t:'Outlets'}]);
  const app=$('#app');app.innerHTML='';
  const w=h('div',{class:'wrap screen'},h('h1',{class:'h1'},'Choose an outlet'),h('p',{class:'sub'},'Pick the restaurant whose menu you want to update. Every menu follows its original InDesign design.'));
  const g=h('div',{class:'grid'});
  OUTLETS.forEach(o=>{const n=o.menus.length;
    g.append(h('div',{class:'card',onclick:()=>go('#/'+o.id)},h('div',{class:'logo',html:o.logoImg?`<img src="${o.logoImg}" style="height:84px;width:auto" alt="">`:logoMini(o.logo)}),h('h3',{},o.name),h('p',{},o.sub),h('span',{class:'chip'},n+' menus')));});
  g.append(h('div',{class:'card disabled'},h('div',{class:'logo',style:'color:#c4c4c8;height:96px',html:ico('plus',40)}),h('h3',{},'More outlets'),h('p',{},'Other outlets will be added here once their InDesign (IDML) files are shared.')));
  w.append(g);app.append(w);}

/* ---------- screen 2: menus ---------- */
function counts(m){let s=0,i=0;m.sections.forEach(x=>{s++;i+=(x.items||[]).filter(t=>t.type!=='sub').length;(x.cols||[]).forEach(c=>i+=c.items.length);});return {s,i};}
function menusScreen(o){crumbs([{t:'Outlets',href:'#/'},{t:o.name}]);
  const app=$('#app');app.innerHTML='';
  const w=h('div',{class:'wrap screen'},h('h1',{class:'h1'},o.name+' menus'),h('p',{class:'sub'},'Select the menu to edit. Changes save automatically in this browser.'));
  const g=h('div',{class:'grid'});
  o.menus.forEach(id=>{const m=DB.menus[id],t=T[m.template],c=counts(m);
    const thumb=h('div',{class:'mthumb',style:`--ar:${t.size[0]}/${t.size[1]};--c:${t.thumb||t.color}`});
    g.append(h('div',{class:'card',onclick:()=>go('#/'+o.id+'/'+id)},h('div',{class:'mcard'},thumb,h('div',{},h('h3',{},m.name),h('p',{},t.label),
      h('p',{style:'margin-top:6px'},`${c.s} sections · ${c.i} items`),h('div',{class:'meta'},m.updatedAt?'Edited '+new Date(m.updatedAt).toLocaleString([], {dateStyle:'medium',timeStyle:'short'}):'Original version')))));});
  w.append(g);app.append(w);}

/* ---------- screen 3: editor ---------- */
let M=null,MID=null,TAB='content',ZOOM=null,SEL=null,hist=[],fut=[],histT=null,lastSnap='';
const SECT_OPEN=new Set();
function snap(){return JSON.stringify(M);}
function pushHist(immediate){clearTimeout(histT);const f=()=>{const s=snap();if(s!==lastSnap){hist.push(lastSnap);if(hist.length>80)hist.shift();fut=[];lastSnap=s;updUndo();}};immediate?f():histT=setTimeout(f,600);}
function undo(){if(!hist.length)return;pushHist(true);if(!hist.length)return;fut.push(snap());lastSnap=hist.pop();restore(lastSnap);}
function redo(){if(!fut.length)return;hist.push(snap());lastSnap=fut.pop();restore(lastSnap);}
function restore(s){const o=JSON.parse(s);Object.keys(M).forEach(k=>delete M[k]);Object.assign(M,o);touched(false);buildLeft();updUndo();}
function updUndo(){const u=$('#bUndo'),r=$('#bRedo');if(u)u.disabled=!hist.length&&snap()===lastSnap;if(r)r.disabled=!fut.length;}
let prevT=null;
function touched(hist_){M.updatedAt=Date.now();persist();clearTimeout(prevT);prevT=setTimeout(refreshPreview,140);if(hist_!==false)pushHist(hist_==='now');}

function editorScreen(o,id){M=DB.menus[id];MID=id;hist=[];fut=[];lastSnap=snap();SEL=null;if(M.sections[0]&&!M.sections.some(s=>SECT_OPEN.has(s.id)))SECT_OPEN.add(M.sections[0].id);
  crumbs([{t:'Outlets',href:'#/'},{t:o.name,href:'#/'+o.id},{t:M.name}]);
  const ta=$('#topActions');ta.innerHTML='';
  ta.append(h('div',{class:'save-state',id:'saveState'},h('i'),h('span',{},'All changes saved')),
    h('button',{class:'btn ghost icon',id:'bUndo',title:'Undo (Ctrl/Cmd+Z)',html:ico('undo'),onclick:undo,disabled:true}),
    h('button',{class:'btn ghost icon',id:'bRedo',title:'Redo (Ctrl/Cmd+Shift+Z)',html:ico('redo'),onclick:redo,disabled:true}),
    moreMenu(),
    h('button',{class:'btn pri',id:'bPdf',onclick:e=>exportPDF(e.currentTarget),html:`<span class="spin"></span><span class="lbl" style="display:flex;gap:7px;align-items:center">${ico('pdf')}Export PDF</span>`}));
  const app=$('#app');app.innerHTML='';
  const left=h('aside',{class:'left'},
    h('div',{class:'tabbar'},h('button',{class:'tab'+(TAB==='content'?' on':''),'data-t':'content',onclick:()=>{TAB='content';buildLeft();}},'Menu items'),
      h('button',{class:'tab'+(TAB==='page'?' on':''),'data-t':'page',onclick:()=>{TAB='page';buildLeft();}},'Page settings')),
    h('div',{class:'scroll',id:'edScroll'}));
  const right=h('section',{class:'right'},
    h('div',{class:'pbar'},h('span',{class:'pi',id:'pinfo'},''),h('div',{class:'sp'}),
      h('button',{class:'btn ghost sm icon',title:'Zoom out',html:ico('zout'),onclick:()=>zoomBy(-.15)}),
      h('button',{class:'btn ghost sm',id:'zlbl',onclick:()=>{ZOOM=null;refreshPreview();}},'Fit'),
      h('button',{class:'btn ghost sm icon',title:'Zoom in',html:ico('zin'),onclick:()=>zoomBy(.15)})),
    h('div',{class:'pview',id:'pview'}));
  app.append(h('div',{class:'ed screen'},left,right));
  $('#pview').addEventListener('click',e=>{const el=e.target.closest('[data-id]');if(el)selectFromPreview(el.dataset.id);});
  buildLeft();fontsReady().then(refreshPreview);}

function moreMenu(){const wrap=h('div',{style:'position:relative'});
  const b=h('button',{class:'btn ghost icon',title:'More',html:ico('more')});wrap.append(b);
  b.onclick=e=>{e.stopPropagation();const ex=wrap.querySelector('.menu-pop');if(ex){ex.remove();return;}
    const pop=h('div',{class:'menu-pop'},
      h('button',{onclick:exportBackup,html:ico('dl')+'Download backup (.json)'}),
      h('button',{onclick:()=>importBackup(),html:ico('ul')+'Restore from backup…'}),
      h('hr'),h('button',{onclick:fontsModal,html:ico('font')+'Brand fonts…'}),
      h('hr'),h('button',{onclick:resetMenu,style:'color:var(--danger)',html:ico('reset')+'Reset this menu to original'}));
    wrap.append(pop);const close=()=>{pop.remove();document.removeEventListener('click',close);};setTimeout(()=>document.addEventListener('click',close),0);};
  return wrap;}

/* ---------- field helpers ---------- */
function field(obj,key,label,o){o=o||{};const rtl=o.rtl;
  const el=h(o.select?'select':'textarea',{class:'inp',dir:rtl?'rtl':null,rows:1,placeholder:o.ph||'',spellcheck:rtl?'false':'true'});
  if(o.select){o.select.forEach(([v,t])=>el.append(h('option',{value:v},t)));}
  el.value=obj[key]??'';
  el.addEventListener('input',()=>{obj[key]=el.value;touched();if(o.rebuild)buildLeft();});
  if(o.select)el.addEventListener('change',()=>{obj[key]=el.value;touched('now');if(o.rebuild!==false)buildLeft();});
  return h('div',{class:'f '+(o.cls||'')},label?h('label',{},label):null,el);}
function toggle(obj,key,label,o){o=o||{};const inp=h('input',{type:'checkbox'});inp.checked=!!obj[key];
  inp.onchange=()=>{obj[key]=inp.checked;touched('now');if(o.rebuild)buildLeft();};
  return h('label',{class:'tgl',title:o.title||''},inp,h('span',{class:'sw'}),label);}

/* ---------- schema per template ---------- */
function itemFields(sec,it){const tp=M.template;
  if(it.type==='sub'){if(tp==='drinks'||tp==='diyaDrinks'||tp==='tayoDrinks')return [['name','Subheading',{cls:'w3',ph:'e.g. FRANCE'}]];
    return [['name','Subheading (EN)',{ph:'e.g. From the land'}],['name_ar','Subheading (AR)',{rtl:1,cls:'w2'}]];}
  if(tp==='breakfast'&&sec.kind!=='band')return [['name','English',{cls:'w3'}],['name_ar','Arabic',{rtl:1,cls:'w3'}]];
  if(tp==='breakfast')return [['name','Name (EN)'],['name_ar','Name (AR)',{rtl:1}],['price','Price'],['sub','Extra line (optional)',{cls:'w3',ph:'e.g. Small صغير / Large كبير'}]];
  if(tp==='ld')return [['name','Dish name (EN)'],['name_ar','Dish name (AR)',{rtl:1}],['price','Price',{ph:'e.g. 95'}],['desc','Description (EN)',{cls:'w3'}],['desc_ar','Description (AR)',{rtl:1,cls:'w3'}]];
  if(tp==='kids')return [['name','English',{cls:'w2'}],['price','Price'],['name_ar','Arabic',{rtl:1,cls:'w3'}]];
  if(tp==='signature')return [['name','Dish name (EN)',{cls:'w2'}],['price','Price'],['name_ar','Dish name (AR)',{rtl:1,cls:'w3'}],['desc','Description (EN)',{cls:'w3'}],['desc_ar','Description (AR)',{rtl:1,cls:'w3'}]];
  if(tp==='diyaFood')return [['name','Dish name (EN)'],['name_ar','Dish name (AR)',{rtl:1}],['price','Price',{ph:'e.g. 65'}],['desc','Description (EN)',{cls:'w3'}],['desc_ar','Description (AR)',{rtl:1,cls:'w3'}]];
  if(tp==='diyaTea')return [['name','Name (EN)'],['name_ar','Name (AR)',{rtl:1}],['price','Price',{ph:sec.kind==='feature'?'e.g. 80':'38 or 38↵48'}],['desc','Description (EN)',{cls:'w3',ph:sec.kind==='feature'?'':'optional · sizes on separate lines, e.g. Small↵Large'}],['desc_ar','Description (AR)',{rtl:1,cls:'w3'}]];
  if(tp==='diyaDrinks'){if(sec.style==='list')return [['name','Name',{cls:'w2'}],['price','Price',{ph:'e.g. 66 / 1,320'}],['desc','Extra text (optional)',{cls:'w3',ph:'e.g. tasting notes, or Small↵Large with prices on 2 lines'}]];
    return [['name','Name',{cls:'w2'}],['price','Price',{ph:'e.g. 64 / 300'}],['desc','Description',{cls:'w3'}]];}
  if(tp==='tayoFood'||tp==='tayoKids'||tp==='tayoSunbeds'){const f=[['name','Dish (EN)',{cls:'w2'}],['price','Price',{ph:'e.g. 85'}],['name_ar','Dish (AR)',{rtl:1,cls:'w3'}]];
    if(it.opts_en!=null||it.opts_ar!=null)f.push(['opts_en','Options (EN) · one per line',{ph:'Tuna↵Salmon'}],['opts_price','Option prices · one per line',{ph:'95↵95'}],['opts_ar','Options (AR) · one per line',{rtl:1}]);return f;}
  if(tp==='tayoDrinks'){if(it.type==='sub')return [['name','Subheading',{cls:'w3',ph:'e.g. FRANCE'}]];
    if(sec.style==='desc')return [['name','Name',{cls:'w2'}],['price','Price',{ph:'e.g. 64 / 300'}],['desc','Description',{cls:'w3'}]];
    return [['name','Name (extra lines allowed)',{cls:'w2'}],['price','Price (one per line)',{ph:'e.g. 66 / 1,320'}]];}
  if(tp==='drinks'){if(sec.style==='list')return [['name','Name',{cls:'w2'}],['price','Price',{ph:sec.glassBottle?'glass / bottle':''}]];
    return [['name','Name',{cls:'w2'}],['price','Price',{ph:sec.glassBottle?'glass / bottle':''}],['desc','Description',{cls:'w3'}]];}
  return [];}
function blankItem(sec,type){const tp=M.template;const it={id:uid(),type:type||'item',name:'',name_ar:'',price:''};
  if(type==='sub')return it;if(tp==='breakfast'&&sec&&sec.kind==='band'){it.inline=true;it.sub='';}else{it.desc='';it.desc_ar='';}return it;}
function secLabel(sec){if(sec.kind==='blank')return 'Blank page';if(sec.kind==='divider')return 'Divider · '+(sec.title||'');
  if(M.template==='drinks'||M.template==='diyaDrinks'||M.template==='tayoDrinks')return [sec.pageTitle,sec.title].filter(Boolean).join(' › ')||'Untitled group';
  if(M.template==='signature')return 'Dishes';return sec.title||'Untitled section';}
function secKind(sec){if(M.template==='breakfast')return sec.kind==='band'?'Beverages':'Food';if(M.template==='drinks')return ({list:'List',na:'Name + notes',wine:'Wine list',cocktail:'Centred'})[sec.style]||'';
  if(M.template==='diyaDrinks')return ({list:'List',desc:'Name + notes',feature:'Tea feature'})[sec.style]||'';
  if(M.template==='diyaTea')return sec.kind==='feature'?'Feature':'3 columns';
  if(M.template==='tayoDrinks')return ({list:'List',desc:'Name + notes'})[sec.style]||'';
  if(M.template==='tayoFood')return ({divider:'Divider page',blank:'Blank page'})[sec.kind]||'';
  if(M.template==='diyaFood')return filled(sec.pageTitle)?'Page header':'';return '';}

/* ---------- left panel ---------- */
function buildLeft(){const sc=$('#edScroll');if(!sc)return;const st=sc.scrollTop;sc.innerHTML='';
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.t===TAB));
  if(TAB==='page')buildPage(sc);else buildContent(sc);sc.scrollTop=st;updUndo();}

function buildContent(sc){
  const tips={breakfast:'Food sections fill the “À la carte” pages; beverage blocks fill the “Beverages” page. Pages are created automatically when a page is full.',
    ld:'Each section can start on a new page. Leave the Arabic description empty to show the Arabic name on its own line (as in “Sides”).',
    drinks:'Groups with the same page title share a page. Prices for wines and spirits are written “glass / bottle”, e.g. 84 / 396.',
    kids:'Add, remove or reorder dishes; the page reflows automatically.',
    signature:'One list feeds both the English and the Arabic A5 pages. Choose which version to print under Page settings.',
    diyaFood:'A section with a page header (e.g. Breakfast, Lunch / Dinner) starts a new page with the large title. Each dish shows English, price and Arabic side by side.',
    diyaTea:'“3 columns” pages list English, price and Arabic. “Feature” pages show one tea per page, centred. The introduction and Afternoon Tea Experience pages are under Page settings.',
    tayoFood:'Sections flow onto pages automatically. Divider pages (illustration + title) and blank pages are listed in order, exactly as in the printed menu — move, add or delete them as needed.',
    tayoKids:'Add, remove or reorder dishes; the page reflows automatically.',
    tayoDrinks:'Groups with the same page title share a page. For water-style sizes write the name lines (Acqua Panna↵Small↵Large) and the prices on matching lines (↵38↵48).',
    tayoSunbeds:'Content flows across the five inside panels of the fold-out (logo panel is fixed). If it no longer fits, an extra “Overflow” sheet appears in red.',
    diyaDrinks:'Groups with the same page title share a page. For sizes with two prices (e.g. water), write Small and Large on two lines in the extra text and the two prices on two lines.'};
  sc.append(h('div',{class:'note'},tips[M.template]));
  M.sections.forEach((sec,si)=>sc.append(secCard(sec,si)));
  if(M.template!=='signature'){const row=h('div',{class:'addrow'});
    if(M.template==='breakfast'){row.append(h('button',{class:'btn',onclick:()=>addSection({kind:'food',title:'NEW SECTION',title_ar:'',items:[blankItem()]}),html:ico('plus')+'Food section'}),
      h('button',{class:'btn',onclick:()=>addSection({kind:'band',style:'flank',title:'NEW',title_ar:'',cols:[{id:uid(),head:'',head_ar:'',items:[blankItem({kind:'band'})]},{id:uid(),head:'',head_ar:'',items:[]}]}),html:ico('plus')+'Beverage block'}));}
    else if(M.template==='tayoFood')row.append(h('button',{class:'btn',onclick:()=>addSection({kind:'menu',title:'NEW SECTION',title_ar:'',note:'',newPage:true,items:[blankItem()]}),html:ico('plus')+'Add section'}),
      h('button',{class:'btn',onclick:()=>addSection({kind:'divider',title:'NEW CHAPTER',title_ar:'',art:'waves',items:[]}),html:ico('plus')+'Divider page'}),
      h('button',{class:'btn',onclick:()=>addSection({kind:'blank',items:[]}),html:ico('plus')+'Blank page'}));
    else if(M.template==='tayoDrinks')row.append(h('button',{class:'btn',onclick:()=>addSection({pageTitle:'NEW PAGE',title:'NEW GROUP',style:'list',label:false,newPage:true,items:[blankItem()]}),html:ico('plus')+'Add group'}));
    else if(M.template==='diyaDrinks')row.append(h('button',{class:'btn',onclick:()=>addSection({pageTitle:'NEW PAGE',title:'',style:'list',newPage:true,items:[blankItem()]}),html:ico('plus')+'Add group'}));
    else if(M.template==='diyaTea')row.append(h('button',{class:'btn',onclick:()=>addSection({kind:'list',pageTitle:'NEW PAGE',pageTitle_ar:'',newPage:true,items:[blankItem()]}),html:ico('plus')+'3-column page'}),
      h('button',{class:'btn',onclick:()=>addSection({kind:'feature',pageTitle:'NEW PAGE',pageTitle_ar:'',newPage:true,onePerPage:true,items:[blankItem()]}),html:ico('plus')+'Feature page'}));
    else if(M.template==='drinks')row.append(h('button',{class:'btn',onclick:()=>addSection({pageTitle:'NEW PAGE',title:'',style:'list',spacing:'compact',newPage:true,items:[blankItem()]}),html:ico('plus')+'Add group'}));
    else row.append(h('button',{class:'btn',onclick:()=>addSection({title:'NEW SECTION',title_ar:'',newPage:M.template==='ld',items:[blankItem()]}),html:ico('plus')+'Add section'}));
    sc.append(row);}}
function addSection(s){s.id=uid();(s.items||[]).forEach(i=>i.id=i.id||uid());M.sections.push(s);SECT_OPEN.add(s.id);touched('now');buildLeft();
  setTimeout(()=>{const el=document.querySelector(`[data-sec="${s.id}"]`);el&&el.scrollIntoView({behavior:'smooth',block:'start'});},50);}

function secCard(sec,si){const open=SECT_OPEN.has(sec.id)||M.template==='signature';
  const card=h('div',{class:'sec'+(open?' open':''),'data-sec':sec.id});
  const n=(sec.items||[]).filter(i=>i.type!=='sub').length+(sec.cols||[]).reduce((a,c)=>a+c.items.length,0);
  const acts=h('div',{class:'acts'},
    h('button',{class:'btn ghost sm icon',title:'Move up',html:ico('up'),disabled:si===0,onclick:e=>{e.stopPropagation();mv(M.sections,si,-1);}}),
    h('button',{class:'btn ghost sm icon',title:'Move down',html:ico('down'),disabled:si===M.sections.length-1,onclick:e=>{e.stopPropagation();mv(M.sections,si,1);}}),
    M.template!=='signature'?h('button',{class:'btn ghost sm icon',title:'Delete section',html:ico('trash'),onclick:e=>{e.stopPropagation();if(confirm('Delete “'+secLabel(sec)+'” and its items?')){M.sections.splice(si,1);touched('now');buildLeft();}}}):null);
  const k=secKind(sec);
  card.append(h('div',{class:'sec-h',onclick:()=>{if(SECT_OPEN.has(sec.id))SECT_OPEN.delete(sec.id);else SECT_OPEN.add(sec.id);card.classList.toggle('open');}},
    h('span',{class:'chev',html:ico('chev')}),h('div',{class:'t'},secLabel(sec),(sec.kind==='blank'||sec.kind==='divider')?null:h('small',{},n+' item'+(n===1?'':'s'))),k?h('span',{class:'kind'},k):null,acts));
  const b=h('div',{class:'sec-b'});
  const tp=M.template;
  if(tp==='breakfast'&&sec.kind==='band'){
    b.append(h('div',{class:'fgrid'},field(sec,'title','Block title (EN)'),field(sec,'title_ar','Block title (AR)',{rtl:1}),
      field(sec,'style','Style',{cls:'full',select:[['flank','Title between side rules + column headings'],['ruled','Full-width rules above & below title']]})));
    b.append(h('div',{class:'row'},toggle(sec,'newPage','Start on a new page')));
    sec.cols.forEach((c,ci)=>{const box=h('div',{class:'colbox'},h('h4',{},ci?'Right column':'Left column'));
      if(sec.style!=='ruled')box.append(h('div',{class:'fgrid',style:'margin-top:0'},field(c,'head','Column heading (EN)'),field(c,'head_ar','Column heading (AR)',{rtl:1})));
      box.append(itemList(sec,c.items,true));b.append(box);});
  }else{
    const g=h('div',{class:'fgrid'});
    if(tp==='breakfast'||tp==='kids')g.append(field(sec,'title','Section title (EN)'),field(sec,'title_ar','Section title (AR)',{rtl:1}));
    if(tp==='ld')g.append(field(sec,'title','Section title (EN)'),field(sec,'title_ar','Section title (AR)',{rtl:1}),field(sec,'note','Note after title (EN)',{ph:'optional, e.g. (COOKED OVER EMBERS)'}),field(sec,'note_ar','Note after title (AR)',{rtl:1,ph:'optional'}));
    if(tp==='diyaFood')g.append(field(sec,'title','Section title (EN)',{ph:'optional, e.g. SALADS'}),field(sec,'title_ar','Section title (AR)',{rtl:1}),
      field(sec,'pageTitle','Page header title (EN)',{ph:'optional, e.g. Breakfast'}),field(sec,'pageTitle_ar','Page header title (AR)',{rtl:1}),
      field(sec,'pageSub','Page header line (EN)',{ph:'e.g. Until 12 noon'}),field(sec,'pageSub_ar','Page header line (AR)',{rtl:1}));
    if(tp==='diyaTea')g.append(field(sec,'pageTitle','Page title (EN)'),field(sec,'pageTitle_ar','Page title (AR)',{rtl:1}),
      field(sec,'kind','Layout',{cls:'full',select:[['list','3 columns — English · price · Arabic'],['feature','Feature — one item centred, EN then AR']]}));
    if(tp==='diyaDrinks')g.append(field(sec,'pageTitle','Page title',{ph:'e.g. WINES'}),field(sec,'title','Group heading',{ph:'e.g. RED WINE (optional)'}),
      field(sec,'style','Layout',{cls:'full',select:[['list','Name + price list'],['desc','Name, notes & price (cocktails, wines)'],['feature','Feature (teas: name, paragraphs, price)']]}));
    if(tp==='tayoFood'&&sec.kind==='blank'){b.append(h('div',{class:'note',style:'margin:0'},'An empty page (back of a divider, or end of the booklet). Delete it if you don’t need it.'));card.append(b);return card;}
    if(tp==='tayoFood'&&sec.kind==='divider'){b.append(h('div',{class:'fgrid'},field(sec,'title','Title (EN)'),field(sec,'title_ar','Title (AR)',{rtl:1}),
      field(sec,'art','Illustration',{cls:'full',select:[['waves','Waves'],['koi','Koi'],['cranes','Cranes'],['fuji','Mount Fuji'],['','None']]})));card.append(b);return card;}
    if(tp==='tayoFood'||tp==='tayoKids'||tp==='tayoSunbeds')g.append(field(sec,'title','Section title (EN)'),field(sec,'title_ar','Section title (AR)',{rtl:1}),field(sec,'note','Small note after title',{ph:'optional, e.g. (3 pieces)'}));
    if(tp==='tayoDrinks')g.append(field(sec,'pageTitle','Page title',{ph:'e.g. WINES'}),field(sec,'title','Group heading',{ph:'e.g. RED WINE'}),
      field(sec,'style','Layout',{cls:'full',select:[['list','Name + price list'],['desc','Name, notes & price (cocktails, wines)']]}));
    if(tp==='drinks')g.append(field(sec,'pageTitle','Page title',{ph:'e.g. WINES'}),field(sec,'title','Group heading',{ph:'e.g. RED WINE (optional)'}),
      field(sec,'style','Layout',{select:[['list','Name + price list'],['na','Name, notes & price'],['wine','Wine list (name, notes, price)'],['cocktail','Centred (name, notes, price)']]}),
      sec.style==='list'?field(sec,'spacing','Line spacing',{select:[['compact','Compact (no gap)'],['airy','Airy (blank line between)']]}):h('div'));
    if(g.children.length)b.append(g);
    const r=h('div',{class:'row'});
    if(tp!=='signature')r.append(toggle(sec,'newPage','Start on a new page'));
    if(tp==='drinks')r.append(toggle(sec,'glassBottle','Show “GLASS/BOTTLE” label'));
    if(tp==='tayoDrinks')r.append(toggle(sec,'label','Show “GLASS / BOTTLE” label'));
    if(tp==='diyaDrinks'&&sec.style==='desc')r.append(toggle(sec,'caps','Names in capitals'));
    if(tp==='diyaTea'&&sec.kind==='feature')r.append(toggle(sec,'onePerPage','One item per page'));
    if(r.children.length)b.append(r);
    b.append(itemList(sec,sec.items,false));
  }
  card.append(b);return card;}
function mv(arr,i,d){const j=i+d;if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];touched('now');buildLeft();}

let DRAG=null;
function itemList(sec,arr,isBand){const list=h('div',{class:'items'});
  arr.forEach((it,ii)=>list.append(itemCard(sec,arr,it,ii,isBand)));
  const add=h('div',{class:'addrow'},h('button',{class:'btn sm',onclick:()=>{const n=blankItem(isBand?{kind:'band'}:sec);arr.push(n);touched('now');buildLeft();focusItem(n.id);},html:ico('plus')+(['drinks','diyaDrinks','diyaTea','tayoDrinks'].includes(M.template)?'Add drink':'Add dish')}));
  if(!isBand&&(['ld','drinks','diyaDrinks','tayoDrinks'].includes(M.template)||(M.template==='diyaTea'&&sec.kind!=='feature')))add.append(h('button',{class:'btn sm',onclick:()=>{const n=blankItem(sec,'sub');arr.push(n);touched('now');buildLeft();focusItem(n.id);},html:ico('plus')+'Add subheading'}));
  list.append(add);return list;}
function itemCard(sec,arr,it,ii,isBand){
  const card=h('div',{class:'it'+(it.type==='sub'?' sub':''),'data-item':it.id});
  const grip=h('div',{class:'grip',title:'Drag to reorder',html:ico('grip',14)});
  grip.onmousedown=()=>card.draggable=true;grip.ontouchstart=()=>card.draggable=true;
  card.ondragstart=e=>{DRAG={arr,ii};card.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',it.id);};
  card.ondragend=()=>{card.draggable=false;card.classList.remove('dragging');document.querySelectorAll('.dropb,.dropa').forEach(x=>x.classList.remove('dropb','dropa'));DRAG=null;};
  card.ondragover=e=>{if(!DRAG||DRAG.arr!==arr)return;e.preventDefault();const r=card.getBoundingClientRect(),after=e.clientY>r.top+r.height/2;card.classList.toggle('dropa',after);card.classList.toggle('dropb',!after);};
  card.ondragleave=()=>card.classList.remove('dropb','dropa');
  card.ondrop=e=>{if(!DRAG||DRAG.arr!==arr)return;e.preventDefault();const r=card.getBoundingClientRect();let to=ii+(e.clientY>r.top+r.height/2?1:0);const from=DRAG.ii;const [x]=arr.splice(from,1);if(from<to)to--;arr.splice(to,0,x);touched('now');buildLeft();};
  const flds=h('div',{class:'flds'});
  itemFields(sec,it).forEach(([k,l,o])=>flds.append(field(it,k,l,o)));
  const tools=h('div',{class:'tools'},
    it.type==='sub'?h('span',{class:'tag'},'Subheading'):null,
    isBand?toggle(it,'inline','Arabic on same line'):null,
    !isBand?toggle(it,'breakBefore','New page before',{title:'Force this line to start a new page'}):null,
    (['tayoFood','tayoSunbeds','tayoKids'].includes(M.template)&&it.type!=='sub')?h('button',{class:'btn ghost sm',style:'font-size:11px',onclick:()=>{if(it.opts_en!=null){delete it.opts_en;delete it.opts_ar;delete it.opts_price;}else{it.opts_en='';it.opts_ar='';it.opts_price='';}touched('now');buildLeft();}},it.opts_en!=null?'Remove options':'+ Options'):null,
    h('div',{class:'sp'}),
    h('button',{class:'btn ghost',title:'Move up',html:ico('up',13),disabled:ii===0,onclick:()=>mv(arr,ii,-1)}),
    h('button',{class:'btn ghost',title:'Move down',html:ico('down',13),disabled:ii===arr.length-1,onclick:()=>mv(arr,ii,1)}),
    h('button',{class:'btn ghost',title:'Duplicate',html:ico('copy',13),onclick:()=>{const c=clone(it);c.id=uid();arr.splice(ii+1,0,c);touched('now');buildLeft();focusItem(c.id);}}),
    h('button',{class:'btn ghost',title:'Delete',html:ico('trash',13),style:'color:var(--danger)',onclick:()=>{arr.splice(ii,1);touched('now');buildLeft();toast('Deleted — press Undo to bring it back');}}));
  card.append(grip,flds,tools);
  card.addEventListener('focusin',()=>setSel(it.id,false));
  return card;}
function focusItem(id){setTimeout(()=>{const c=document.querySelector(`[data-item="${id}"]`);if(!c)return;c.scrollIntoView({behavior:'smooth',block:'center'});const i=c.querySelector('.inp');i&&i.focus({preventScroll:true});},60);}

function buildPage(sc){const S=M.settings,tp=M.template;const G=(t,...k)=>h('div',{class:'grp'},h('h3',{},t),...k);
  const fg=(...k)=>h('div',{class:'fgrid'},...k);
  const footer=()=>G('Footer (allergen & price note)',fg(field(S,'footer_en','English',{cls:'full'})),tp!=='drinks'?fg(field(S,'footer_ar','Arabic',{rtl:1,cls:'full'})):null);
  if(tp==='breakfast'){sc.append(G('Cover page',h('div',{class:'row'},toggle(S,'cover','Include cover page')),fg(field(S,'coverTitle','Title (EN)'),field(S,'coverTitle_ar','Title (AR)',{rtl:1}))),
    G('“À la carte” pages',fg(field(S,'foodTitle','Page title (EN)'),field(S,'foodTitle_ar','Page title (AR)',{rtl:1}),field(S,'foodNote','Set price line',{cls:'full',ph:'e.g. 130 AED — leave empty to hide'}))),
    G('Beverages page',fg(field(S,'bevTitle','Page title (EN)'),field(S,'bevTitle_ar','Page title (AR)',{rtl:1}))),footer(),
    G('Printing',h('div',{class:'row'},toggle(S,'blankBacks','Add a blank back after every page (double-sided printing)'))));}
  if(tp==='ld'){sc.append(G('Introduction page',h('div',{class:'row'},toggle(S,'intro','Include introduction page'),toggle(S,'blankAfterIntro','Blank page after it (as in the original)')),
      fg(field(S,'title','Title (EN)'),field(S,'title_ar','Title (AR)',{rtl:1}),field(S,'intro_en','Introduction (EN)',{cls:'full'}),field(S,'intro_ar','Introduction (AR)',{rtl:1,cls:'full'}))),
    G('Content pages',fg(field(S,'currency','Currency label above prices',{ph:'AED'}))),footer());}
  if(tp==='drinks'){sc.append(G('Cover page',h('div',{class:'row'},toggle(S,'cover','Include cover page')),fg(field(S,'title','Title'),h('div'),field(S,'intro','Introduction text',{cls:'full'}))),footer());}
  if(tp==='kids'){sc.append(G('Page header',fg(field(S,'title','Title (EN)'),field(S,'title_ar','Title (AR)',{rtl:1}),field(S,'currency','Currency label',{ph:'AED'}))),footer());}
  if(tp==='signature'){sc.append(G('Versions',fg(field(S,'version','Pages to produce',{cls:'full',select:[['both','English + Arabic (2 pages)'],['en','English only'],['ar','Arabic only']]}))),
    G('Titles',fg(field(S,'title','Title (EN)'),field(S,'title_ar','Title (AR)',{rtl:1}))),footer());}
  const cut=()=>G('Printing',h('div',{class:'row'},toggle(S,'showCut','Print the die-cut line (magenta, for the printer)')),h('div',{class:'note',style:'margin:0'},'The grey area in the preview is cut away by the die-cutter; it never prints.'));
  if(tp==='diyaFood')sc.append(G('Introduction page',h('div',{class:'row'},toggle(S,'intro','Include introduction page'),toggle(S,'blankAfterIntro','Blank page after it (as in the original)')),
      fg(field(S,'intro_en','Introduction (EN)',{cls:'full'}),field(S,'intro_ar','Introduction (AR)',{rtl:1,cls:'full'}))),footer(),cut());
  if(tp==='diyaTea')sc.append(G('Introduction page',h('div',{class:'row'},toggle(S,'intro','Include introduction page'),toggle(S,'blankAfterIntro','Blank page after it')),
      fg(field(S,'intro_en','Introduction (EN)',{cls:'full'}),field(S,'intro_ar','Introduction (AR)',{rtl:1,cls:'full'}))),
    G('Afternoon Tea Experience pages',h('div',{class:'row'},toggle(S,'experience','Include these 3 pages'),toggle(S,'illustration','Show the emerald illustration')),
      fg(field(S,'expTitle','Title (EN)'),field(S,'expTitle_ar','Title (AR)',{rtl:1}),field(S,'expSub','Subtitle (EN)'),field(S,'expSub_ar','Subtitle (AR)',{rtl:1}),
        field(S,'price','Price'),field(S,'perPerson','“per person” (EN)'),h('div'),field(S,'perPerson_ar','“per person” (AR)',{rtl:1}),
        field(S,'exp_en','Description (EN)',{cls:'full'}),field(S,'exp_ar','Description (AR)',{rtl:1,cls:'full'}))),
    G('Footer on the Experience pages',fg(field(S,'footer_en','English',{cls:'full'}),field(S,'footer_ar','Arabic',{rtl:1,cls:'full'}))),
    G('Footer on the beverage pages',fg(field(S,'bevFooter_en','English',{cls:'full'}),field(S,'bevFooter_ar','Arabic',{rtl:1,cls:'full'}))),cut());
  if(tp==='diyaDrinks')sc.append(G('Introduction page',h('div',{class:'row'},toggle(S,'intro','Include introduction page'),toggle(S,'blankAfterIntro','Blank page after it')),
      fg(field(S,'intro_en','Introduction',{cls:'full'}))),G('Footer',fg(field(S,'footer_en','Price note',{cls:'full'}))),cut());
  if(tp==='tayoFood')sc.append(G('Introduction page',h('div',{class:'row'},toggle(S,'intro','Include introduction page'),toggle(S,'blankAfterIntro','Blank page after it (as in the original)')),
      fg(field(S,'intro_en','Introduction (EN)',{cls:'full'}),field(S,'intro_ar','Introduction (AR)',{rtl:1,cls:'full'}))),footer());
  if(tp==='tayoKids')sc.append(G('Page header',fg(field(S,'title','Title (EN)'),field(S,'title_ar','Title (AR)',{rtl:1}))),footer());
  if(tp==='tayoDrinks')sc.append(G('Introduction page',h('div',{class:'row'},toggle(S,'intro','Include introduction page')),fg(field(S,'intro_en','Introduction',{cls:'full'}))),
    G('Footer',fg(field(S,'footer_en','Price note',{cls:'full'}))),G('Printing',fg(field(S,'blankEnd','Blank pages at the end',{select:[['0','None'],['1','1'],['2','2 (as in the original)'],['3','3']]}))));
  if(tp==='tayoSunbeds')sc.append(G('Sheets',h('div',{class:'row'},toggle(S,'outside','Include the outside (illustration) sheet'))),footer(),
    h('div',{class:'note'},'Prints as full flat sheets (540 × 240 mm): inside + outside. The dashed fold lines show in the preview only.'));
  if(M.outlet==='tayo'){sc.append(h('div',{class:'note'},'Fonts: the original uses Alverata and Greycliff Arabic CF. If they aren’t installed on this computer, close stand-ins are used (Spectral and Readex Pro). Add the real font files under ⋯ › Brand fonts. Footers use Parastoo (built in).'));return;}
  if(M.outlet==='diya'){sc.append(h('div',{class:'note'},'Fonts: Diya uses Adobe Arabic and Garamond Premier Pro. If they aren’t installed on this computer, close stand-ins are used (Noto Naskh Arabic, EB Garamond). Add the real font files under ⋯ › Brand fonts.'));return;}
  sc.append(h('div',{class:'note'},'Fonts: Fraunces Light and Parastoo are built in. Headings use Aktiv Grotesk Ex — if it isn’t installed on this computer, a close stand-in (Archivo Expanded) is used. Add the real font files under ⋯ › Brand fonts.'));}

/* ---------- preview ---------- */
let LAST_PAGES=[];
function zoomBy(d){ZOOM=Math.max(.3,Math.min(2.5,(ZOOM||curFit())+d));refreshPreview();}
function curFit(){const pv=$('#pview');const W=T[M.template].size[0]*PX;return Math.max(.3,Math.min(1.1,(pv.clientWidth-56)/W));}
function refreshPreview(){const pv=$('#pview');if(!pv||!M)return;
  let pages;try{pages=renderMenu(M);}catch(e){console.error(e);pv.innerHTML=`<div class="warn">Preview error: ${esc(e.message)}</div>`;return;}
  LAST_PAGES=pages;const z=ZOOM||curFit();$('#zlbl').textContent=ZOOM?Math.round(z*100)+'%':'Fit';
  const over=pages.some(p=>p.html.includes(' ovf'));
  const st=pv.scrollTop;
  pv.innerHTML=(over?`<div class="warn">Some text is taller than the space on its page (shown with red stripes). Shorten it or split it into separate items.</div>`:'')+
    pages.map((p,i)=>`<div class="pwrap"><div class="pshadow" style="zoom:${z}">${p.html}</div><div class="plabel">Page ${i+1} · ${esc(p.label)}</div></div>`).join('');
  pv.scrollTop=st;
  const t=T[M.template];$('#pinfo').textContent=`${pages.length} page${pages.length>1?'s':''} · ${t.label}`;
  if(SEL)markSel(SEL,false);}
function markSel(id,scroll){document.querySelectorAll('.pview .sel').forEach(x=>x.classList.remove('sel'));
  const el=document.querySelector(`.pview [data-id="${id}"]`);if(!el)return;el.classList.add('sel');
  if(scroll){const pv=$('#pview'),r=el.getBoundingClientRect(),pr=pv.getBoundingClientRect();if(r.top<pr.top+40||r.bottom>pr.bottom-40)pv.scrollTo({top:pv.scrollTop+r.top-pr.top-pr.height/3,behavior:'smooth'});}}
function setSel(id,fromPreview){SEL=id;markSel(id,!fromPreview);}
function selectFromPreview(id){SEL=id;markSel(id,false);
  if(TAB!=='content'){TAB='content';buildLeft();}
  let secId=null;M.sections.forEach(s=>{if(s.id===id)secId=s.id;(s.items||[]).forEach(i=>{if(i.id===id)secId=s.id;});(s.cols||[]).forEach(c=>c.items.forEach(i=>{if(i.id===id)secId=s.id;}));});
  if(secId&&!SECT_OPEN.has(secId)){SECT_OPEN.add(secId);buildLeft();}
  setTimeout(()=>{const c=document.querySelector(`[data-item="${id}"]`)||document.querySelector(`[data-sec="${id}"]`);if(!c)return;
    c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash');
    const i=c.querySelector('.inp');i&&setTimeout(()=>i.focus({preventScroll:true}),350);},40);}
window.addEventListener('resize',()=>{if(M&&!ZOOM&&$('#pview')){clearTimeout(prevT);prevT=setTimeout(refreshPreview,150);}});

/* ---------- export ---------- */
function fileName(){const o=OUTLETS.find(o=>o.id===M.outlet);const d=new Date();const ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  return `${o?o.name:''} ${M.name} Menu ${ds}`.replace(/[&/\\:*?"<>|]/g,'and').replace(/\s+/g,' ').trim();}
async function exportPDF(btn){
  if(!localStorage.getItem('ms-print-tip')){const ok=await printTip();if(!ok)return;}
  btn.classList.add('loading');await fontsReady();
  try{const pages=renderMenu(M).filter(p=>!p.blank||p.keep||M.settings.blankBacks||M.settings.blankAfterIntro);
    const [W,H]=T[M.template].size;
    $('#printRoot').innerHTML=pages.map(p=>p.html).join('');
    $('#pageSizeCss').textContent=`@page{size:${W}pt ${H}pt;margin:0}`;
    const old=document.title;document.title=fileName();
    await new Promise(r=>setTimeout(r,350));
    window.print();
    setTimeout(()=>{document.title=old;$('#printRoot').innerHTML='';},800);
  }finally{setTimeout(()=>btn.classList.remove('loading'),600);}}
function printTip(){return new Promise(res=>{const bg=h('div',{class:'modal-bg'});
  const m=h('div',{class:'modal'},h('h2',{},'Saving your PDF'),h('p',{},'The print window opens with the pages already at the correct menu size. To save the file:'),
    h('ol',{},h('li',{},'Destination: ',h('b',{},'Save as PDF')),h('li',{},'Margins: ',h('b',{},'None'),' · Scale: ',h('b',{},'100% / Default')),h('li',{},'Turn off ',h('b',{},'Headers and footers')),h('li',{},'Click ',h('b',{},'Save'),' — the file name is filled in for you')),
    h('p',{style:'font-size:12.5px'},'Works best in Google Chrome or Microsoft Edge.'),
    h('div',{style:'display:flex;gap:8px;justify-content:flex-end'},h('button',{class:'btn',onclick:()=>{bg.remove();res(false);}},'Cancel'),
      h('button',{class:'btn pri',onclick:()=>{localStorage.setItem('ms-print-tip','1');bg.remove();res(true);}},h('span',{class:'lbl'},'Got it, continue'))));
  bg.append(m);document.body.append(bg);});}
function download(name,text,type){const a=h('a',{href:URL.createObjectURL(new Blob([text],{type})),download:name});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);}
function exportBackup(){download('Menu Studio backup '+new Date().toISOString().slice(0,10)+'.json',JSON.stringify({app:'menu-studio',version:1,saved:new Date().toISOString(),menus:DB.menus},null,1),'application/json');toast('Backup downloaded');}
function importBackup(){const inp=h('input',{type:'file',accept:'.json,application/json'});inp.onchange=async()=>{try{const d=JSON.parse(await inp.files[0].text());if(!d.menus)throw new Error('Not a Menu Studio backup');
  if(!confirm('Replace the menus in this browser with the ones in the backup?'))return;for(const id in d.menus)DB.menus[id]=withIds(d.menus[id]);persist();toast('Backup restored');render();}catch(e){alert('Could not restore: '+e.message);}};inp.click();}
function resetMenu(){if(!confirm('Reset “'+M.name+'” to the original InDesign content? Your edits to this menu will be lost.'))return;DB.menus[MID]=seed(MID);persist();toast('Menu reset to original');render();}
function fontsModal(){const bg=h('div',{class:'modal-bg',onclick:e=>{if(e.target===bg)bg.remove();}});
  const diya=M&&M.outlet==='diya',tayo=M&&M.outlet==='tayo';
  const slots=tayo?[['alv-500','Alverata Medium','dish names'],['alv-700','Alverata Bold','headings'],['alv-400','Alverata Regular','drinks, introductions'],['gca-400','Greycliff Arabic CF Regular','Arabic text'],['gca-700','Greycliff Arabic CF Bold','prices, drink names']]:diya?[['gpp-400','Garamond Premier Pro Regular','descriptions, prices'],['gpp-500','Garamond Premier Pro Medium','page titles'],['gpp-600','Garamond Premier Pro Semibold','dish names, headings'],['gpp-400i','Garamond Premier Pro Italic','page sub-lines'],['aa-400','Adobe Arabic Regular','Arabic text'],['aa-700','Adobe Arabic Bold','Arabic dish names & titles'],['aa-400i','Adobe Arabic Italic','Arabic sub-lines']]
    :[['600','Aktiv Grotesk Ex SemiBold','headings, dish names'],['700','Aktiv Grotesk Ex Bold','“GLASS/BOTTLE” label'],['800','Aktiv Grotesk Ex XBold','wine & spirit group headings']];
  const m=h('div',{class:'modal'},h('h2',{},'Brand fonts · '+(tayo?'Tayō':diya?'Diya':'Lilia')),h('p',{},tayo?'Parastoo is built into this file. Upload Alverata and Greycliff Arabic CF (.otf, .ttf or .woff2) from your licensed copies; until then Spectral and Readex Pro are used. Files are stored in this browser only.':diya?'If Adobe Arabic and Garamond Premier Pro are not installed on this computer, close stand-ins are used. Upload the font files (.otf, .ttf or .woff2) from your licensed copy. They are stored in this browser only.':'Fraunces and Parastoo are built into this file. For headings, upload the Aktiv Grotesk Ex font files (.otf, .ttf or .woff2) from your licensed copy. They are stored in this browser only.'));
  slots.forEach(([w,n,use])=>{const st=h('span',{class:'st'},FONTS[w]?'Added ✓':'Using stand-in');
    const inp=h('input',{type:'file',accept:'.otf,.ttf,.woff,.woff2',class:'hidden'});
    inp.onchange=()=>{const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{FONTS[w]=r.result;try{localStorage.setItem(FKEY,JSON.stringify(FONTS));}catch(e){alert('Font file is too large to store in this browser.');delete FONTS[w];return;}injectUserFonts();st.textContent='Added ✓';fontsReady().then(refreshPreview);};r.readAsDataURL(f);};
    m.append(h('div',{class:'fontslot'},h('div',{style:'flex:1'},h('b',{},n),h('div',{class:'st'},'Used for '+use)),st,inp,
      h('button',{class:'btn sm',onclick:()=>inp.click()},'Upload'),FONTS[w]?h('button',{class:'btn sm ghost',onclick:()=>{delete FONTS[w];localStorage.setItem(FKEY,JSON.stringify(FONTS));injectUserFonts();bg.remove();fontsReady().then(refreshPreview);}},'Remove'):null));});
  m.append(h('div',{style:'display:flex;justify-content:flex-end;margin-top:14px'},h('button',{class:'btn pri',onclick:()=>bg.remove()},h('span',{class:'lbl'},'Done'))));
  bg.append(m);document.body.append(bg);}

document.addEventListener('keydown',e=>{if(!M||!$('#pview'))return;const k=e.key.toLowerCase();
  if((e.metaKey||e.ctrlKey)&&k==='z'){e.preventDefault();e.shiftKey?redo():undo();}
  if((e.metaKey||e.ctrlKey)&&k==='y'){e.preventDefault();redo();}
  if((e.metaKey||e.ctrlKey)&&k==='p'){e.preventDefault();exportPDF($('#bPdf'));}});
window.addEventListener('beforeprint',()=>{if(!$('#printRoot').innerHTML&&M){const [W,H]=T[M.template].size;$('#printRoot').innerHTML=renderMenu(M).map(p=>p.html).join('');$('#pageSizeCss').textContent=`@page{size:${W}pt ${H}pt;margin:0}`;}});
window.addEventListener('afterprint',()=>{setTimeout(()=>$('#printRoot').innerHTML='',300);});
render();
