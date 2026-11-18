/* ================= LAYOUT ENGINE (geometry in pt, taken from the IDML frames) ================= */
const PX=96/72;
const COL={olive:'#736922',fig:'#6C202A'};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const AR_CH='\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const AR_RUN=new RegExp('['+AR_CH+'](?:['+AR_CH+'\\s\\d\\u0660-\\u0669.,\\u060C\\u061B:\\-\\u2013/()]*['+AR_CH+'])?','g');
const HAS_AR=new RegExp('['+AR_CH+']');
/* escape + wrap Arabic runs (Parastoo) + newline → <br> */
function mix(s,cls){cls=cls||'ar';return String(s??'').split('\n').map(line=>{let o='',last=0;line.replace(AR_RUN,(m,off)=>{o+=esc(line.slice(last,off))+'<span class="'+cls+' rtl">'+esc(m)+'</span>';last=off+m.length;return m;});return o+esc(line.slice(last));}).join('<br>');}
const txt=s=>esc(s).replace(/\n/g,'<br>');
/* price: words & (bracketed notes) set at 9pt, figures at 11pt */
function price(p){return String(p??'').split('\n').map(l=>{let o='',last=0;l.replace(/\([^)]*\)|[A-Za-z][A-Za-z ]*[A-Za-z]/g,(m,off)=>{o+=esc(l.slice(last,off))+'<span class="psm">'+esc(m)+'</span>';last=off+m.length;return m;});return o+esc(l.slice(last));}).join('<br>');}
const filled=v=>String(v??'').trim().length>0;

function borderSVG(W,H,o,i,r,sw){sw=sw||1.5;const[x,y,w,h]=i;
  const d=`M${x+r} ${y}H${x+w-r}A${r} ${r} 0 0 0 ${x+w} ${y+r}V${y+h-r}A${r} ${r} 0 0 0 ${x+w-r} ${y+h}H${x+r}A${r} ${r} 0 0 0 ${x} ${y+h-r}V${y+r}A${r} ${r} 0 0 0 ${x+r} ${y}Z`;
  return `<svg class="a" style="left:0;top:0" width="${W}pt" height="${H}pt" viewBox="0 0 ${W} ${H}"><rect x="${o[0]}" y="${o[1]}" width="${o[2]}" height="${o[3]}" fill="none" stroke="currentColor" stroke-width="${sw}"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="${sw}"/></svg>`;}
function logoSVG(kind,x,y){const L=LOGOS[kind];return `<svg class="a" style="left:${x}pt;top:${y}pt" width="${L.w}pt" height="${L.h}pt" viewBox="0 0 ${L.w} ${L.h}"><path fill="currentColor" d="${L.d}"/></svg>`;}
const A=(x,y,w,cls,style,html)=>`<div class="a ${cls||''}" style="left:${x}pt;top:${y}pt;${w!=null?'width:'+w+'pt;':''}${style||''}">${html}</div>`;
const rule=(x,y,w,sw)=>`<div class="rule" style="left:${x}pt;top:${(y-sw/2).toFixed(2)}pt;width:${w}pt;border-top-width:${sw}pt"></div>`;
/* item grid: text + price share one cell, price right (or left for RTL) — height = max of both */
function priced(textHtml,tw,priceHtml,opt){opt=opt||{};const rtl=opt.rtl,hasP=filled(priceHtml);
  const tcell=`<div style="min-width:0;max-width:${tw}pt;${rtl?'justify-self:end;':''}">${textHtml}</div>`;
  const pcell=hasP?`<div class="${opt.pcls||'fr'} nw ${rtl?'l':'r'}" style="line-height:${opt.lh||12}pt;${opt.pstyle||''}">${priceHtml}</div>`:'';
  if(!hasP)return tcell;
  return `<div style="display:grid;grid-template-columns:${rtl?'auto minmax(0,1fr)':'minmax(0,1fr) auto'};column-gap:10pt;align-items:start">${rtl?pcell+tcell:tcell+pcell}</div>`;}
/* measure many blocks in one layout pass; returns heights in pt */
function measureAll(blocks){
  const M=document.getElementById('measure');
  M.innerHTML=blocks.map(b=>`<div style="position:relative;width:${b.w}pt;color:#000">${b.html}</div>`).join('');
  const hs=[];for(const el of M.children)hs.push(el.getBoundingClientRect().height/PX);
  M.innerHTML='';blocks.forEach((b,i)=>{if(b.h==null)b.h=hs[i];});return blocks;}

/* flow blocks into pages. block: {html,w,h?,gap,brk,keep,id}  startPage(idx,firstBlock,isContinuation) → {y,bottom,placed:[]} */
function flow(blocks,startPage){
  measureAll(blocks.filter(b=>b.h==null));
  const pages=[];let pg=null;
  const open=(b,cont)=>{pg=startPage(pages.length,b,cont,pg);pg.fresh=true;pages.push(pg);};
  for(let i=0;i<blocks.length;i++){const b=blocks[i];
    if(!pg||(b.brk&&!pg.fresh))open(b,false);
    let gap=pg.fresh?0:(b.gap||0);
    let need=b.h;
    if(b.keep){let j=i;while(blocks[j].keep&&j+1<blocks.length&&!blocks[j+1].brk){j++;need+=(blocks[j].gap||0)+blocks[j].h;}}
    if(!pg.fresh&&pg.y+gap+need>pg.bottom+0.01){open(b,true);gap=0;}
    const y=pg.y+gap;b.over=(y+b.h>pg.bottom+1);
    pg.placed.push({b,y});pg.y=y+b.h;pg.fresh=false;}
  return pages;}

function placeHtml(pg){return pg.placed.map(({b,y})=>`<div class="blk ${b.id?'hl':''} ${b.over?'ovf':''}" ${b.id?`data-id="${b.id}"`:''} style="left:${b.x}pt;top:${y.toFixed(2)}pt;width:${b.w}pt">${b.html}</div>`).join('');}
const pageWrap=(W,H,color,inner)=>`<div class="pg" style="width:${W}pt;height:${H}pt;--ink:${color};color:${color}">${inner}</div>`;
function footer2(x,y,w,en,ar,arSize){return A(x,y,w,'','',
  (filled(en)?`<div class="pa c">${txt(en)}</div>`:'')+(filled(en)&&filled(ar)?'<div style="height:9pt"></div>':'')+
  (filled(ar)?`<div class="ar rtl c" style="font-size:${arSize||9}pt;line-height:9pt">${txt(ar)}</div>`:''));}
const blankPage=(W,H,c,label)=>({html:pageWrap(W,H,c,''),label:label||'Blank (back of previous page)',blank:true});

const T={};

/* ------------------------------------------------------------------ BREAKFAST (A4, single-sided) */
T.breakfast={size:[595.28,841.89],color:COL.olive,label:'A4 · 210 × 297 mm',
 render(m){const S=m.settings,W=595.28,H=841.89,C=this.color,out=[];
  if(S.cover){out.push({label:'Cover',html:pageWrap(W,H,C,logoSVG('ar',231.5,55)+
    A(47.7,761.3,482.6,'ak r','line-height:14.4pt',`<span class="t200">${txt(S.coverTitle)}</span><br><span class="ar rtl">${esc(S.coverTitle_ar)}</span>`))});
    if(S.blankBacks)out.push(blankPage(W,H,C));}
  const blocks=[];let prevGroup=null;
  m.sections.forEach(sec=>{
    const grp=sec.kind==='band'?'bev':'food';
    const brk=(prevGroup&&grp!==prevGroup)||!!sec.newPage;prevGroup=grp;
    if(sec.kind==='band'){blocks.push({id:sec.id,grp,x:100,w:423.2,html:this.band(sec),gap:8,brk});return;}
    blocks.push(Object.assign(this.head(sec),{brk}));
    sec.items.forEach((it,k)=>blocks.push({id:it.id,sec,grp,x:100.4,w:427.2,gap:k?11:0,brk:!!it.breakBefore,
      html:`<div class="fr" style="line-height:11pt">${mix(it.name)}</div>`+(filled(it.name_ar)?`<div class="ar rtl l" style="font-size:13pt;line-height:11pt">${txt(it.name_ar)}</div>`:'')}));
  });
  const pages=flow(blocks,(i,b)=>{const pg={y:b.grp==='bev'?105.7:119.6,bottom:712,placed:[],grp:b.grp};
    if(b.grp==='food'&&b.kind!=='h'&&b.sec){const hb=this.head(b.sec);pg.placed.push({b:hb,y:pg.y});pg.y+=hb.h;}return pg;});
  pages.forEach(pg=>{const food=pg.grp==='food';
    const head=A(70.1,56.7,482.6,'ak c','line-height:14.4pt',`<span class="t200">${txt(food?S.foodTitle:S.bevTitle)}</span><br><span class="ar rtl">${esc(food?S.foodTitle_ar:S.bevTitle_ar)}</span>`)+
      (food&&filled(S.foodNote)?A(69.9,85.9,482.9,'fr fr9 c','line-height:9pt',esc(S.foodNote)):'');
    out.push({label:food?'À la carte':'Beverages',html:pageWrap(W,H,C,
      borderSVG(W,H,[57.2,28.8,509.2,784.2],[70.6,43,481.6,756.2],10.3)+head+placeHtml(pg)+footer2(117.9,722.8,387.4,S.footer_en,S.footer_ar))});
    if(S.blankBacks)out.push(blankPage(W,H,C));});
  return out;},
 head(sec){return {id:sec.id,kind:'h',grp:'food',x:100.4,w:427.2,h:24.2,keep:true,gap:22,
   html:`<div class="ak t200 nw" style="line-height:12pt">${txt(sec.title)}${filled(sec.title_ar)?` <span class="ar rtl">${esc(sec.title_ar)}</span>`:''}</div>`};},
 bevItem(it,k){const inl=it.inline;
  const t=`<div class="fr" style="line-height:11pt">${esc(it.name)}${inl&&filled(it.name_ar)?` <span class="ar rtl">${esc(it.name_ar)}</span>`:''}</div>`+
    (!inl&&filled(it.name_ar)?`<div class="ar rtl l" style="font-size:13pt;line-height:11pt">${esc(it.name_ar)}</div>`:'')+
    (filled(it.sub)?`<div class="fr" style="line-height:11pt">${mix(it.sub)}</div>`:'');
  return `<div class="hl" data-id="${it.id}" style="margin-top:${k?11:0}pt">${priced(t,160,price(it.price),{lh:11})}</div>`;},
 band(sec){const flank=sec.style!=='ruled';let h='',top;
  const col=(c,w,ml)=>`<div style="width:${w}pt;margin-left:${ml}pt">${(c.items||[]).map((it,k)=>this.bevItem(it,k)).join('')}</div>`;
  const two=(a,b)=>`<span class="t200">${txt(a)}</span>${filled(b)?`<br><span class="ar rtl">${esc(b)}</span>`:''}`;
  if(flank){top=54.1;
    h+=rule(0,4.6,168,1.5)+rule(255.5,4.6,167.7,1.5)+A(131.4,0,160.7,'ak c','line-height:14pt',two(sec.title,sec.title_ar));
    h+=A(0,13.9,168.1,'ak c','line-height:14.4pt',two(sec.cols[0].head,sec.cols[0].head_ar))+A(255.5,13.9,168.6,'ak c','line-height:14.4pt',two(sec.cols[1].head,sec.cols[1].head_ar));
    h+=rule(0,45.9,204.7,.5)+rule(218.9,45.9,204.3,.5);
  }else{top=49.6;h+=rule(0,0,423.2,.5)+A(0,8.5,423.2,'ak c','line-height:14pt',two(sec.title,sec.title_ar))+rule(0,41.4,423.2,.5);}
  return `<div style="position:relative">${h}<div style="display:flex;padding-top:${top}pt">${col(sec.cols[0],185.2,0)}${col(sec.cols[1],182.9,33.7)}</div></div>`;}
};

/* ------------------------------------------------------------------ LUNCH & DINNER (A4, facing pages) */
T.ld={size:[595.28,841.89],color:COL.olive,label:'A4 · 210 × 297 mm · facing pages',
 head(sec){return {id:sec.id,kind:'h',w:363.8,h:52.3,keep:true,gap:40,html:
      `<div class="ak" style="line-height:14.4pt"><span class="t200">${txt(sec.title)}</span>${filled(sec.note)?` <span class="t200" style="font-size:8pt">${esc(sec.note)}</span>`:''}</div>`+
      (filled(sec.title_ar)||filled(sec.note_ar)?`<div class="ak rtl l" style="line-height:14.4pt"><span class="ar">${esc(sec.title_ar)}</span>${filled(sec.note_ar)?` <span class="ar" style="font-size:10pt">${esc(sec.note_ar)}</span>`:''}</div>`:'')};},
 render(m){const S=m.settings,W=595.28,H=841.89,C=this.color,out=[];
  if(S.intro){const enH=measureAll([{w:363.8,html:`<div class="fr c" style="line-height:13pt">${txt(S.intro_en)}</div>`}])[0].h;
    const arY=Math.max(492.4,267.9+enH+13);
    out.push({label:'Introduction',html:pageWrap(W,H,C,logoSVG('ar',231.5,55)+
      A(130.1,267.9,363.8,'fr c','line-height:13pt',txt(S.intro_en))+
      A(130.1,arY,363.8,'ar rtl c','font-size:13pt;line-height:13pt',txt(S.intro_ar))+
      A(341.3,761.3,189,'ak r','line-height:14.4pt',`<span class="t200">${txt(S.title)}</span><br><span class="ar rtl">${esc(S.title_ar)}</span>`))});
    if(S.blankAfterIntro)out.push(blankPage(W,H,C,'Blank (inside cover)'));}
  const blocks=[];
  m.sections.forEach(sec=>{
    blocks.push(Object.assign(this.head(sec),{brk:!!sec.newPage}));
    sec.items.forEach((it,k)=>{
      const nm=`<span class="t200 caps">${txt(it.name)}</span>`;
      const arN=`<span class="ar rtl">${esc(it.name_ar)}</span>`;
      if(it.type==='sub'){blocks.push({id:it.id,sec,w:363.8,gap:k?24:0,brk:!!it.breakBefore,html:`<div class="ak" style="font-size:9pt;line-height:12pt">${nm}${filled(it.name_ar)?' '+arN:''}</div>`});return;}
      const hasD=filled(it.desc)||filled(it.desc_ar);
      const t=`<div class="ak" style="font-size:9pt;line-height:12pt">${nm}${hasD&&filled(it.name_ar)?' '+arN:''}</div>`+
        (!hasD&&filled(it.name_ar)?`<div class="ar sb rtl l" style="font-size:10.4pt;line-height:12pt">${esc(it.name_ar)}</div>`:'')+
        (filled(it.desc)?`<div class="fr" style="line-height:12pt">${mix(it.desc)}</div>`:'')+
        (filled(it.desc_ar)?`<div class="ar rtl l" style="font-size:13pt;line-height:12pt">${txt(it.desc_ar)}</div>`:'');
      blocks.push({id:it.id,sec,w:363.8,gap:k?12:0,brk:!!it.breakBefore,html:priced(t,318,price(it.price),{lh:12})});
      });
  });
  const first=out.length;
  const pages=flow(blocks,(i,b)=>{const pg={y:89.6,bottom:712,placed:[]};
    if(b.kind!=='h'&&b.sec){const hb=this.head(b.sec);pg.placed.push({b:hb,y:pg.y});pg.y+=hb.h;}return pg;});
  pages.forEach((pg,i)=>{const no=first+i+1,R=no%2===1,x=R?129.9:101.6;
    pg.placed.forEach(p=>p.b.x=x);
    out.push({label:R?'Right-hand page':'Left-hand page',html:pageWrap(W,H,C,
      (R?borderSVG(W,H,[56.8,28.8,509.6,784.2],[70.8,43,481.6,756.2],10.3):borderSVG(W,H,[28.8,28.8,509.2,784.2],[42.3,43,481.6,756.2],10.3))+
      (filled(S.currency)?A(x,90.4,363.8,'fr fr8 r','line-height:8pt',esc(S.currency)):'')+
      placeHtml(pg)+footer2(R?120.8:101.6,722.8,382,S.footer_en,S.footer_ar))});});
  return out;}
};

/* ------------------------------------------------------------------ DRINKS (160 × 250 mm, facing pages) */
T.drinks={size:[453.54,708.66],color:COL.fig,label:'160 × 250 mm · facing pages',
 gh(sec){return {id:sec.id,kind:'gh',sec,w:269.2,h:28.7,keep:true,html:`<div class="ak t200 caps c ${sec.glassBottle?'xb':''}" style="font-size:9pt;line-height:9pt">${txt(sec.title)}</div>`};},
 gbBlock(sec,overlay){return {kind:'gb',sec,w:269.2,h:overlay?0:25.9,keep:true,gap:0,html:`<div class="ak bd t150 caps r" style="font-size:6pt;line-height:6pt;padding-top:2pt;margin-right:-.9pt">GLASS/BOTTLE</div>`};},
 render(m){const S=m.settings,W=453.54,H=708.66,C=this.color,out=[];
  if(S.cover)out.push({label:'Cover',html:pageWrap(W,H,C,logoSVG('ar',153.4,35.2)+
    A(90,286.5,269.3,'fr c','line-height:15pt',txt(S.intro))+A(211.4,641.5,189,'ak t200 r','line-height:12pt',txt(S.title)))});
  const blocks=[];let prev=null;
  m.sections.forEach(sec=>{
    const brk=!!sec.newPage||(prev&&prev.pageTitle!==sec.pageTitle);
    const g=this.gh(sec);g.brk=brk;g.gap=!prev?0:(prev.style==='list'&&prev.spacing==='airy')?32:(prev.style==='na'||prev.style==='wine')?22:18;blocks.push(g);
    const items=sec.items||[];
    if(sec.glassBottle)blocks.push(this.gbBlock(sec,items[0]&&items[0].type==='sub'));
    const airy=sec.style!=='list'||sec.spacing==='airy';
    items.forEach((it,k)=>{let html,gap=k?(airy?15:0):0;
      if(it.type==='sub'){html=`<div class="ak t200 caps" style="font-size:9pt;line-height:15pt">${txt(it.name)}</div>`;gap=k?15:0;
        blocks.push({id:it.id,sec,w:269.2,gap,brk:!!it.breakBefore,keep:true,html,after:15});return;}
      if(k&&items[k-1].type==='sub')gap=15;
      if(sec.style==='cocktail'){html=`<div class="c" style="padding:0 14pt"><div class="ak t100 caps" style="font-size:9pt;line-height:15pt">${txt(it.name)}</div>`+
          (filled(it.desc)?`<div class="fr" style="line-height:15pt">${txt(it.desc)}</div>`:'')+(filled(it.price)?`<div class="fr" style="line-height:15pt">${price(it.price)}</div>`:'')+`</div>`;}
      else if(sec.style==='list'){html=priced(`<div class="fr" style="line-height:15pt">${txt(it.name)}</div>`,190,price(it.price),{lh:15});}
      else{html=priced(`<div class="ak t100 caps" style="font-size:9pt;line-height:15pt">${txt(it.name)}</div>`,245,price(it.price),{lh:15})+
          (filled(it.desc)?`<div class="fr" style="line-height:15pt;max-width:245pt">${txt(it.desc)}</div>`:'');}
      blocks.push({id:it.id,sec,w:269.2,gap,brk:!!it.breakBefore,html});});
    prev=sec;});
  const self=this;
  const pages=flow(blocks,(i,b,cont)=>{const pg={y:118.3,bottom:636,placed:[],title:b.sec.pageTitle};
    if(b.kind!=='gh'){const g=self.gh(b.sec);g.id=null;pg.placed.push({b:g,y:pg.y});pg.y+=g.h;
      if(b.sec.glassBottle&&b.kind!=='gb'){const l=self.gbBlock(b.sec,!!b.after);pg.placed.push({b:l,y:pg.y});pg.y+=l.h;}}
    return pg;});
  const first=out.length;
  pages.forEach((pg,i)=>{const no=first+i+1,R=no%2===1,x=R?106.3:78;
    pg.placed.forEach(p=>p.b.x=x);
    out.push({label:(pg.title||'')+(R?' · right':' · left'),html:pageWrap(W,H,C,
      (R?borderSVG(W,H,[57.4,29.1,367.6,650.5],[69,40.9,344.4,627.2],8.5):borderSVG(W,H,[28.7,29.1,367.6,650.5],[40.3,40.9,344.4,627.2],8.5))+
      A(x,76.5,269.2,'ak t200 c','line-height:12pt',txt(pg.title))+placeHtml(pg)+
      (filled(S.footer_en)?A(x-49.5,645.7,368.5,'pa c','',txt(S.footer_en)):''))});});
  return out;}
};

/* ------------------------------------------------------------------ KIDS (A4) */
T.kids={size:[595.28,841.89],color:COL.olive,label:'A4 · 210 × 297 mm',
 head(sec){return {id:sec.id,kind:'h',w:237.4,h:34.2,keep:true,gap:38.5,html:`<div class="ak t200 nw" style="line-height:12pt">${txt(sec.title)}${filled(sec.title_ar)?` <span class="ar rtl">${esc(sec.title_ar)}</span>`:''}</div>`};},
 render(m){const S=m.settings,W=595.28,H=841.89,C=this.color,out=[];const blocks=[];
  m.sections.forEach(sec=>{
    blocks.push(Object.assign(this.head(sec),{brk:!!sec.newPage}));
    sec.items.forEach((it,k)=>blocks.push({id:it.id,sec,w:237.4,gap:k?12:0,brk:!!it.breakBefore,html:priced(
      `<div class="fr" style="line-height:12pt">${mix(it.name)}</div>`+(filled(it.name_ar)?`<div class="ar rtl l" style="font-size:13pt;line-height:12pt">${txt(it.name_ar)}</div>`:''),184.3,price(it.price),{lh:12})}));});
  const pages=flow(blocks,(i,b)=>{const pg={y:i?119.8:176.3,bottom:740,placed:[]};
    if(b.kind!=='h'&&b.sec){const hb=this.head(b.sec);pg.placed.push({b:hb,y:pg.y});pg.y+=hb.h;}return pg;});
  pages.forEach((pg,i)=>{pg.placed.forEach(p=>p.b.x=67.3);
    const fh=pg.placed.find(p=>p.b.kind==='h');
    out.push({label:i?'Continued':'Kids menu',html:pageWrap(W,H,C,
      (i?'':logoSVG('en',234.2,29.0)+A(67.3,119.8,null,'ak t200 nw','line-height:12pt',`${txt(S.title)}${filled(S.title_ar)?` <span class="ar rtl">${esc(S.title_ar)}</span>`:''}`))+
      (fh&&filled(S.currency)?A(67.3,fh.y+0.8,237.4,'fr fr8 r','line-height:8pt',esc(S.currency)):'')+
      placeHtml(pg)+footer2(97.1,750.7,401.1,S.footer_en,S.footer_ar,10))});});
  return out;}
};

/* ------------------------------------------------------------------ SIGNATURE (A5, EN + AR versions) */
T.signature={size:[419.53,595.28],color:COL.olive,label:'A5 · 148 × 210 mm · EN + AR versions',
 render(m){const S=m.settings,W=419.53,H=595.28,C=this.color,out=[];const items=(m.sections[0]||{items:[]}).items;
  if(S.version!=='ar'){
    const blocks=items.map((it,k)=>({id:it.id,x:59.2,w:301.1,gap:k?25:0,brk:!!it.breakBefore,html:priced(
      `<div class="ak t200 caps" style="font-size:9pt;line-height:12.5pt">${txt(it.name)}</div>`+(filled(it.desc)?`<div class="fr fr10" style="line-height:12.5pt;margin-top:12.5pt">${txt(it.desc)}</div>`:''),
      271,price(it.price),{lh:12.5,pstyle:'margin-top:-3pt'})}));
    flow(blocks,()=>({y:75.6,bottom:522,placed:[]})).forEach(pg=>out.push({label:'English version',html:pageWrap(W,H,C,
      A(93.3,36.4,233,'ak t200 c','line-height:12pt',txt(S.title))+placeHtml(pg)+(filled(S.footer_en)?A(59,531,301.6,'pa c','',txt(S.footer_en)):''))}));}
  if(S.version!=='en'){
    const blocks=items.map((it,k)=>({id:it.id,x:59.2,w:301.4,gap:k?28:0,brk:!!it.breakBefore,html:priced(
      `<div class="ar sb rtl r" style="font-size:11.5pt;line-height:14pt">${txt(it.name_ar)}</div>`+(filled(it.desc_ar)?`<div class="ar rtl r" style="font-size:13pt;line-height:14pt;margin-top:14pt">${txt(it.desc_ar)}</div>`:''),
      256.9,price(it.price),{lh:14,rtl:true,pstyle:'margin-top:-2.9pt'})}));
    flow(blocks,()=>({y:72.6,bottom:525,placed:[]})).forEach(pg=>out.push({label:'Arabic version',html:pageWrap(W,H,C,
      A(179.1,36.4,181.4,'r','line-height:15pt',`<span class="ar sb rtl" style="font-size:15pt">${esc(S.title_ar)}</span>`)+placeHtml(pg)+
      (filled(S.footer_ar)?A(59,538.9,301.6,'ar rtl c','font-size:10pt;line-height:9pt',txt(S.footer_ar)):''))}));}
  return out;}
};

function renderMenu(m){return T[m.template].render(m);}
