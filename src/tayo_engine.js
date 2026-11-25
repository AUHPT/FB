/* ================= TAYŌ LAYOUTS (geometry from the Tayo IDML files, pt) ================= */
const TY={amber:'#D76833'};
const tyArt=(W,H,frag,dx)=>frag?`<svg class="a" style="left:0;top:0" width="${W}pt" height="${H}pt" viewBox="0 0 ${W} ${H}">${dx?`<g transform="translate(${dx} 0)">${frag}</g>`:frag}</svg>`:'';
const tyRules=(x,w,ys)=>ys.map(y=>rule(x,y,w,.5)).join('');
/* heading: EN (Alverata Bold 14, tracked caps) + optional small note, Arabic (Greycliff 13) underneath, left-aligned; rule underneath */
function tyHead(sec,o){const note=filled(sec.note)?` <span class="al b caps" style="font-size:9pt;letter-spacing:.025em">${esc(sec.note)}</span>`:'';
  return `<div style="min-height:${o.min}pt;max-width:${o.tw||330}pt">`+
    (filled(sec.title)?`<div class="al b t100 caps" style="font-size:14pt;line-height:${o.lh||16.8}pt">${esc(sec.title)}${note}</div>`:'')+
    (filled(sec.title_ar)?`<div class="gc rtl l" style="font-size:13pt;line-height:15.6pt">${esc(sec.title_ar)}</div>`:'')+`</div>`+
    `<div style="border-top:.5pt solid currentColor;width:${o.rw}pt;height:${Math.max(0,o.after-.5)}pt"></div>`;}
/* dish: EN (Alverata Medium 11/13) + AR (Greycliff 11/13) left-aligned, price (Greycliff Bold 11) right; optional option lines (Tuna / Salmon …) */
function tyDish(it,tw){const t=`<div class="al m" style="font-size:11pt;line-height:13pt">${txt(it.name)}</div>`+
    (filled(it.name_ar)?`<div class="gc rtl l" style="font-size:11pt;line-height:13pt">${txt(it.name_ar)}</div>`:'');
  let h=priced(t,tw,esc(it.price),{lh:13,pcls:'gc b',pstyle:'font-size:11pt'});
  if(filled(it.opts_en)||filled(it.opts_ar)){const en=String(it.opts_en||'').split('\n'),ar=String(it.opts_ar||'').split('\n'),pr=String(it.opts_price||'').split('\n');
    h+='<div style="height:26pt"></div>'+en.map((e,i)=>priced(`<div class="al m" style="font-size:11pt;line-height:13pt">${esc(e)} <span class="gc">${esc(ar[i]||'')}</span></div>`,tw,esc(pr[i]||''),{lh:13,pcls:'gc b',pstyle:'font-size:11pt'})).join('');}
  return h;}
/* flow with a "lead" (rule + space above a heading) that is dropped at the top of a page */
function tyFlow(blocks,start){measureAll(blocks.filter(b=>b.h==null));const pages=[];let pg=null;
  const open=b=>{pg=start(pages.length,b);pg.fresh=true;pg.rules=[];pages.push(pg);};
  for(let i=0;i<blocks.length;i++){const b=blocks[i];
    if(!pg||(b.brk&&!pg.fresh))open(b);
    let gap=pg.fresh?0:(b.gap||0),lead=pg.fresh?0:(b.lead||0),need=b.h;
    if(b.keep&&i+1<blocks.length&&!blocks[i+1].brk)need+=(blocks[i+1].gap||0)+blocks[i+1].h;
    if(!pg.fresh&&pg.y+gap+lead+need>pg.bottom+.01){open(b);gap=0;lead=0;}
    if(lead)pg.rules.push(pg.y+gap);
    const y=pg.y+gap+lead;b.over=y+b.h>pg.bottom+1;pg.placed.push({b,y});pg.y=y+b.h;pg.fresh=false;}
  return pages;}
/* sections → blocks (food, kids, sunbeds share the dish style) */
function tyBlocks(secs,g){const out=[];
  secs.forEach(sec=>{if(sec.kind&&sec.kind!=='menu')return;let first=true;const brk=!!sec.newPage;
    if(filled(sec.title)||filled(sec.title_ar)){out.push({id:sec.id,sec,kind:'h',w:g.w,gap:g.secGap,lead:g.lead,keep:true,brk,html:tyHead(sec,g.head)});first=false;}
    (sec.items||[]).forEach((it,k)=>{out.push({id:it.id,sec,w:g.w,gap:first?g.secGap:(k?13:0),lead:first?g.lead:0,brk:(first&&brk)||!!it.breakBefore,html:tyDish(it,g.tw)});first=false;});});
  return out;}
const tyRulesAt=(pg,x,w)=>pg.rules.map(y=>rule(x,y,w,.5)).join('');

/* ------------------------------------------------------------------ TAYŌ FOOD (A4, facing pages) */
T.tayoFood={size:[595.28,841.89],color:TY.amber,thumb:'#F1C3A3',label:'A4 · 210 × 297 mm · facing pages',
 render(m){const S=m.settings,W=595.28,H=841.89,C=this.color,out=[];
  const side=()=>(out.length+1)%2===1;
  const blank=label=>out.push({label:label||'Blank page',blank:true,keep:true,html:pageWrap(W,H,C,'')});
  if(S.intro){const enH=measureAll([{w:400.4,html:`<div class="al c" style="font-size:11pt;line-height:14pt">${txt(S.intro_en)}</div>`}])[0].h;
    out.push({label:'Introduction',html:pageWrap(W,H,C,tyArt(W,H,TAYO_ART.foodIntro)+
      A(111.6,185.2,400.4,'al c','font-size:11pt;line-height:14pt',txt(S.intro_en))+
      A(111.6,Math.max(438.5,185.2+enH+28),400.4,'gc rtl c','font-size:13pt;line-height:15.6pt',txt(S.intro_ar)))});
    if(S.blankAfterIntro)blank('Blank (inside cover)');}
  const g={w:400.4,tw:365,secGap:13,lead:13.4,head:{min:41.3,after:14.1,rw:400.4}};
  const flush=secs=>{if(!secs.length)return;
    const pages=tyFlow(tyBlocks(secs,g),()=>({y:102.5,bottom:700,placed:[]}));
    pages.forEach(pg=>{const R=side(),x=R?93.3:101.6;pg.placed.forEach(p=>p.b.x=x);
      const t=pg.placed[0]&&pg.placed[0].b.sec;
      out.push({label:(t?t.title:'Menu')+(R?' · right':' · left'),html:pageWrap(W,H,C,tyArt(W,H,R?TAYO_ART.foodMasterR:TAYO_ART.foodMasterL)+
        tyRulesAt(pg,x,400.4)+placeHtml(pg)+footer2(R?100.4:108.7,707.8,386.2,S.footer_en,S.footer_ar,10))});});};
  let run=[];
  m.sections.forEach(sec=>{if(sec.kind==='blank'||sec.kind==='divider'){flush(run);run=[];}
    if(sec.kind==='blank')blank();
    else if(sec.kind==='divider'){const R=side(),x=R?93.3:101.6;
      out.push({label:'Divider · '+(sec.title||''),html:pageWrap(W,H,C,tyRules(x,400.4,[86.5,89,785.2])+
        `<div class="blk hl" data-id="${sec.id}" style="left:${x}pt;top:102.5pt;width:330pt">`+tyHead(sec,{min:30,after:0,rw:0})+'</div>'+
        tyArt(W,H,TAYO_ART['div_'+sec.art]))});}
    else run.push(sec);});
  flush(run);
  return out;}
};

/* ------------------------------------------------------------------ TAYŌ KIDS (A4, single page) */
T.tayoKids={size:[595.28,841.89],color:TY.amber,thumb:'#F1C3A3',label:'A4 · 210 × 297 mm',
 render(m){const S=m.settings,W=595.28,H=841.89,C=this.color,x=93.9;
  const g={w:400.4,tw:330,secGap:30,lead:13.3,head:{min:42.4,after:13.8,rw:400.4}};
  const pages=tyFlow(tyBlocks(m.sections,g),()=>({y:102.9,bottom:690,placed:[]}));
  return pages.map((pg,i)=>{pg.placed.forEach(p=>p.b.x=x);
    return {label:i?'Kids · continued':'Kids menu',html:pageWrap(W,H,C,
      A(x,37.9,245.4,'','',`<div class="al b t100 caps" style="font-size:14pt;line-height:16.8pt">${esc(S.title)}</div><div class="gc rtl l" style="font-size:13pt;line-height:15.6pt">${esc(S.title_ar)}</div>`)+
      tyArt(W,H,TAYO_ART.kidsSun)+tyRules(x,400.4,[86.5,89,772.7,775.2])+tyRulesAt(pg,x,400.4)+placeHtml(pg)+footer2(x,701,400.4,S.footer_en,S.footer_ar,10))};});}
};

/* ------------------------------------------------------------------ TAYŌ DRINKS (150 × 297 mm, facing pages, EN only) */
T.tayoDrinks={size:[425.2,841.89],color:TY.amber,thumb:'#F1C3A3',label:'150 × 297 mm · facing pages',
 gh(sec){const lab=sec.label?`<div class="gc b caps r" style="font-size:7pt;line-height:8pt;letter-spacing:.025em;height:26.1pt;padding-top:4.8pt;box-sizing:border-box">${esc(sec.labelText||'glass / Bottle')}</div>`:'';
   const sub=filled(sec.subtitle)?`<div class="al i" style="font-size:11pt;line-height:13.2pt">${esc(sec.subtitle)}</div>`:'',
     intro=filled(sec.intro)?`<div class="al" style="font-size:10pt;line-height:13pt;margin-top:4pt">${txt(sec.intro)}</div>`:'',extra=sub||intro;
   const hasItems=(sec.items||[]).length>0;
   return {id:sec.id,sec,kind:'h',w:265.7,gap:8.6,lead:12.4,keep:true,html:
   `<div style="min-height:23.4pt;max-width:265pt${extra?';padding-bottom:9pt':''}"><div class="al b t100 caps" style="font-size:14pt;line-height:16.8pt">${esc(sec.title)}</div>${sub}${intro}</div>`+
   (hasItems?`<div style="border-top:.5pt solid currentColor;height:11.9pt"></div>`+lab:'')};},
 item(sec,it){if(it.type==='sub')return `<div class="gc b caps" style="font-size:11pt;line-height:13.2pt;letter-spacing:.05em">${esc(it.name)}</div>`;
  const P=t=>`<div class="gc b r pre" style="font-size:11pt;line-height:13.2pt">${esc(t)}</div>`;
  if(sec.style==='desc')return priced(`<div class="gc b caps" style="font-size:11pt;line-height:13.2pt;letter-spacing:.05em">${esc(it.name)}</div>`,214.4,P(it.price),{lh:13.2,pcls:'gc b'})+
    (filled(it.desc)?`<div class="al" style="font-size:11pt;line-height:13.2pt;max-width:214.4pt">${txt(it.desc)}</div>`:'');
  return priced(`<div class="al" style="font-size:11pt;line-height:13.2pt">${txt(it.name)}${filled(it.desc)?'<br>'+txt(it.desc):''}</div>`,228.5,P(it.price),{lh:13.2,pcls:'gc b'});},
 render(m){const S=m.settings,W=425.2,H=841.89,C=this.color,out=[],self=this;
  const side=()=>(out.length+1)%2===1;
  if(S.intro)out.push({label:'Introduction',html:pageWrap(W,H,C,tyArt(W,H,TAYO_ART.drinksIntro)+A(93.9,345.2,265.7,'al c','font-size:11pt;line-height:14pt',txt(S.intro_en)))});
  const blocks=[];let prev=null;
  m.sections.forEach(sec=>{const brk=!!sec.newPage||(prev&&prev.pageTitle!==sec.pageTitle);let first=true;
    if(filled(sec.title)){const g=this.gh(sec);g.brk=brk;blocks.push(g);first=false;}
    (sec.items||[]).forEach((it,k)=>{blocks.push({id:it.id,sec,w:265.7,gap:first?8.6:(k?13.2:0),lead:first?12.4:0,keep:it.type==='sub',brk:(first&&brk)||!!it.breakBefore,html:this.item(sec,it)});first=false;});
    prev=sec;});
  const pages=tyFlow(blocks,(i,b)=>{const pg={y:101.1,bottom:740,placed:[],title:b.sec.pageTitle};
    if(b.kind!=='h'&&filled(b.sec.title)){const g=self.gh(b.sec);g.id=null;measureAll([g]);pg.placed.push({b:g,y:pg.y});pg.y+=g.h;}return pg;});
  pages.forEach(pg=>{const R=side(),x=R?93.9:65.6;pg.placed.forEach(p=>p.b.x=x);
    out.push({label:(pg.title||'')+(R?' · right':' · left'),html:pageWrap(W,H,C,tyArt(W,H,R?TAYO_ART.drinksMasterR:TAYO_ART.drinksMasterL)+
      A(x,62.5,265.7,'al b t100 caps','font-size:14pt;line-height:11.2pt',esc(pg.title))+tyRulesAt(pg,x,265.7)+placeHtml(pg)+
      (filled(S.footer_en)?A(x,752.7,265.7,'pa c','',txt(S.footer_en)):''))});});
  for(let i=0;i<(+S.blankEnd||0);i++)out.push({label:'Blank page',blank:true,keep:true,html:pageWrap(W,H,C,'')});
  return out;}
};

/* ------------------------------------------------------------------ TAYŌ SUNBEDS (6-panel fold-out, 540 × 240 mm sheet) */
T.tayoSunbeds={size:[1530.71,680.31],color:TY.amber,thumb:'#F1C3A3',label:'6-panel fold-out · 540 × 240 mm sheet (inside + outside)',
 render(m){const S=m.settings,W=1530.71,H=680.31,P=255.12,C=this.color,out=[];
  const g={w:209.8,tw:172,secGap:11,lead:16.6,head:{min:40.8,after:12.7,rw:209.8,tw:205}};
  const panels=tyFlow(tyBlocks(m.sections,g),()=>({y:78.3,bottom:657,placed:[]}));
  const fold=`<svg class="a fold" style="left:0;top:0" width="${W}pt" height="${H}pt" viewBox="0 0 ${W} ${H}">`+[1,2,3,4,5].map(i=>`<path d="M${(i*P).toFixed(2)} 0V${H}" stroke="#9aa" stroke-width=".5" stroke-dasharray="3 3"/>`).join('')+'</svg>';
  const sheet=(list,withLogo)=>{let html='';
    if(withLogo)html+=tyArt(W,H,TAYO_ART.sunLogo)+rule(22.7,657.4,209.8,.5)+footer2(22.7,549.4,209.8,S.footer_en,S.footer_ar,10);
    list.forEach((pg,k)=>{const px=(k+1)*P,x=px+22.7;pg.placed.forEach(p=>p.b.x=x);
      html+=tyArt(W,H,k===4?TAYO_ART.sunB:TAYO_ART.sunA,px)+rule(x,657.4,209.8,.5)+tyRulesAt(pg,x,209.8)+placeHtml(pg);});
    return pageWrap(W,H,C,html+fold);};
  out.push({label:'Inside · 6 panels',html:sheet(panels.slice(0,5),true)});
  if(panels.length>5){const extra=panels.slice(5);extra.forEach(pg=>pg.placed.forEach(p=>p.b.over=true));
    out.push({label:'Overflow — does not fit the fold-out',html:sheet(extra,false)});}
  if(S.outside)out.push({label:'Outside',html:pageWrap(W,H,C,tyArt(W,H,TAYO_ART.sunOutside)+fold)});
  return out;}
};
