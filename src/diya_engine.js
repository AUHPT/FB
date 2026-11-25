/* ================= DIYA LAYOUTS (geometry from the Diya IDML files, pt) ================= */
const DY={ink:'#2B2B2A',pebble:'#E9D1C0'};
const dyPath=p=>'M'+p.map(q=>q[0].toFixed(2)+' '+q[1].toFixed(2)).join('L')+'Z';
const dyMirror=(pts,W,m)=>m?pts.map(([x,y])=>[W-x,y]):pts;
/* page frame: pebble border (die-cut emerald shape) + die-cut preview shading; mirrored on left-hand pages */
function dyFrame(W,H,R,border,cut,showCut){const b=border?dyMirror(border,W,!R):null,c=dyMirror(cut,W,!R);
  return `<svg class="a" style="left:0;top:0" width="${W}pt" height="${H}pt" viewBox="0 0 ${W} ${H}">`+
    `<path class="diecut-fill" d="M0 0H${W}V${H}H0Z${dyPath(c)}" fill-rule="evenodd"/>`+
    (showCut?`<path d="${dyPath(c)}" fill="none" stroke="#EC008C" stroke-width=".25"/>`:'')+
    (border?`<path d="${dyPath(b)}" fill="none" stroke="${DY.pebble}" stroke-width=".75"/>`:'')+`</svg>`;}
function dyCutOnly(W,H,R,cut,showCut){return dyFrame(W,H,R,null,cut,showCut);}
/* three-diamond ornament */
function dyOrn(W,H,x,y){let p='';for(let i=0;i<3;i++){const X=x+i*5.665;p+=`M${(X+2.2).toFixed(2)} ${y}L${(X+4.53).toFixed(2)} ${y+8.5}L${(X+2.33).toFixed(2)} ${y+17}L${X.toFixed(2)} ${y+8.5}Z`;}
  return `<svg class="a" style="left:0;top:0" width="${W}pt" height="${H}pt" viewBox="0 0 ${W} ${H}"><path d="${p}" fill="currentColor"/></svg>`;}
/* name (semibold) + description, joined the way the menus do it */
function dyJoin(name,desc,ar,boldAlways){const n=String(name??'').trim(),d=String(desc??'').trim();
  if(!d)return boldAlways?`<span class="b">${esc(n)}</span>`:esc(n);
  if(!n)return txt(d);
  const sep=/^[\/–\-,:،]/.test(d)||/[:،,]$/.test(n)?' ':(ar?'، ':', ');
  return `<span class="b">${esc(n)}</span>${sep}${txt(d)}`;}
/* option lines: desc lines + price lines of the same count (e.g. Small / Large) */
const dyOpts=it=>{const d=String(it.desc||'').split('\n'),p=String(it.price||'').split('\n');return p.length>1&&d.length===p.length;};
function dyFoot(x,y,w,en,ar,o){o=o||{};return A(x,y,w,'','',
  (filled(en)?`<div class="gr c" style="font-size:8pt;line-height:${o.lh||10}pt">${txt(en)}</div>`:'')+
  (filled(en)&&filled(ar)?`<div style="height:${o.lh||10}pt"></div>`:'')+
  (filled(ar)?`<div class="aa rtl c" style="font-size:${o.ar||11}pt;line-height:${o.lha||o.lh||10}pt">${txt(ar)}</div>`:''));}

/* ------------------------------------------------------------------ DIYA FOOD (230 × 297 mm incl. flap, die-cut) */
T.diyaFood={size:[651.97,841.89],color:DY.ink,thumb:'#C9B29C',label:'230 × 297 mm incl. 20 mm flap · die-cut · facing pages',
 border:[[545.6,28.7],[623.2,106.4],[623.2,813.2],[85.4,813.2],[85.4,106.4],[163.1,28.7]],
 cut:[[557.5,0.1],[151.1,0.1],[56.8,94.5],[0.1,94.5],[0.1,841.8],[651.8,841.8],[651.8,94.5]],
 cols:'198.4pt 19.8pt 34.5pt 44.4pt 170pt',
 head(sec){return {id:sec.id,kind:'h',sec,w:467.1,h:32.5,keep:true,gap:18,html:
   `<div style="position:relative;min-height:15pt"><div class="gr b t200 caps" style="font-size:12pt;line-height:15pt;max-width:250pt">${txt(sec.title)}</div>`+
   `<div class="a aa b rtl r" style="right:0;top:-1pt;width:210pt;font-size:16pt;line-height:15pt">${esc(sec.title_ar)}</div></div>`};},
 item(it){return `<div style="display:grid;grid-template-columns:${this.cols};align-items:start">`+
   `<div class="gr" style="font-size:12pt;line-height:15pt">${dyJoin(it.name,it.desc,false,true)}</div><div></div>`+
   `<div class="gr c pre" style="font-size:12pt;line-height:15pt">${esc(it.price)}</div><div></div>`+
   `<div class="aa rtl r" style="font-size:16pt;line-height:14.8pt">${dyJoin(it.name_ar,it.desc_ar,true,true)}</div></div>`;},
 render(m){const S=m.settings,W=651.97,H=841.89,C=this.color,out=[],self=this;
  const side=()=>(out.length+1)%2===1;
  if(S.intro){const enH=measureAll([{w:373.8,html:`<div class="gr c" style="font-size:12pt;line-height:15pt">${txt(S.intro_en)}</div>`}])[0].h;
    out.push({label:'Introduction',html:pageWrap(W,H,C,dyFrame(W,H,true,this.border,this.cut,S.showCut)+
      A(166.9,198.4,373.8,'gr c','font-size:12pt;line-height:15pt',txt(S.intro_en))+
      A(166.9,Math.max(430.7,198.4+enH+30),373.8,'aa rtl c','font-size:15pt;line-height:14.8pt',txt(S.intro_ar))+dyOrn(W,H,346.4,785.1))});
    if(S.blankAfterIntro)out.push({label:'Blank (inside cover)',blank:true,html:pageWrap(W,H,C,dyCutOnly(W,H,side(),this.cut,S.showCut))});}
  const blocks=[];
  m.sections.forEach(sec=>{const hasHead=filled(sec.title)||filled(sec.title_ar);let first=true;
    const brk=!!sec.newPage||filled(sec.pageTitle);
    if(hasHead){blocks.push(Object.assign(this.head(sec),{brk,first:true}));first=false;}
    sec.items.forEach((it,k)=>{blocks.push({id:it.id,sec,w:467.1,first,gap:k?15:(hasHead?0:18),brk:(first&&brk)||!!it.breakBefore,html:this.item(it)});first=false;});});
  const pages=flow(blocks,(i,b)=>{const pg={y:198.4,bottom:715,placed:[],head:b.first&&b.sec&&filled(b.sec.pageTitle)?b.sec:null};
    if(!b.first&&b.kind!=='h'&&b.sec&&(filled(b.sec.title)||filled(b.sec.title_ar))){const hb=self.head(b.sec);pg.placed.push({b:hb,y:pg.y});pg.y+=hb.h;}return pg;});
  pages.forEach(pg=>{const R=side(),x=R?119.1:62.6,tx=R?85:28.8;pg.placed.forEach(p=>p.b.x=x);const h=pg.head;
    const head=h?A(tx,82.2,538.6,'gr m t200 caps c','font-size:18pt;line-height:18pt',txt(h.pageTitle))+
      (filled(h.pageSub)?A(tx,102,538.6,'gr i c','font-size:14pt;line-height:14pt;letter-spacing:.05em',txt(h.pageSub)):'')+
      (filled(h.pageTitle_ar)?A(tx,126,538.6,'aa b rtl c','font-size:24pt;line-height:22pt',esc(h.pageTitle_ar)):'')+
      (filled(h.pageSub_ar)?A(tx,147,538.6,'aa i rtl c','font-size:20pt;line-height:20pt',esc(h.pageSub_ar)):''):'';
    out.push({label:(h?h.pageTitle:'Menu')+(R?' · right':' · left'),html:pageWrap(W,H,C,dyFrame(W,H,R,this.border,this.cut,S.showCut)+head+placeHtml(pg)+
      dyFoot(R?166.4:110,736.6,376.3,S.footer_en,S.footer_ar))});});
  return out;}
};

/* ------------------------------------------------------------------ DIYA AFTERNOON TEA (155 × 210 mm incl. flap, die-cut) */
T.diyaTea={size:[439.37,595.28],color:DY.ink,thumb:'#C9B29C',label:'155 × 210 mm incl. 20 mm flap · die-cut · facing pages',
 border:[[333.1,28.7],[410.6,106.4],[410.6,566.5],[85.4,566.5],[85.4,106.4],[163.0,28.7]],
 cut:[[345.0,0.2],[151.1,0.2],[56.8,94.6],[0.1,94.6],[0.1,595.3],[439.2,595.3],[439.2,94.6]],
 cols:'110pt 6.8pt 34.5pt 11pt 105.8pt',
 listItem(it,k,prevSub){const o=dyOpts(it);
   const en=o?`<span class="b">${esc(it.name)}</span><br>${txt(it.desc)}`:dyJoin(it.name,it.desc,false,false);
   const ar=o?`<span class="b">${esc(it.name_ar)}</span><br>${txt(it.desc_ar)}`:dyJoin(it.name_ar,it.desc_ar,true,false);
   return `<div style="display:grid;grid-template-columns:${this.cols};align-items:start"><div class="gr" style="font-size:11pt;line-height:14pt;letter-spacing:.01em">${en}</div><div></div>`+
    `<div class="gr c pre" style="font-size:11pt;line-height:14pt">${o?'\n':''}${esc(it.price)}</div><div></div><div class="aa rtl r" style="font-size:13pt;line-height:13.9pt">${ar}</div></div>`;},
 sub(it){return `<div style="display:grid;grid-template-columns:${this.cols};align-items:start"><div class="gr b t200 caps" style="font-size:11pt;line-height:14pt;grid-column:1/4">${txt(it.name)}</div><div></div>`+
   `<div class="aa b rtl r" style="font-size:13pt;line-height:13.9pt">${esc(it.name_ar)}</div></div>`;},
 feature(it){const bl='<div style="height:14pt"></div>';
   return `<div class="c"><div class="gr b t200 caps" style="font-size:11pt;line-height:14pt">${txt(it.name)}</div>`+
   (filled(it.desc)?bl+`<div class="gr" style="font-size:11pt;line-height:14pt">${txt(it.desc)}</div>`:'')+
   (filled(it.price)?bl+`<div class="gr" style="font-size:11pt;line-height:14pt">${esc(it.price)}</div>`:'')+
   (filled(it.name_ar)?bl+`<div class="aa b rtl" style="font-size:13pt;line-height:14pt">${esc(it.name_ar)}</div>`:'')+
   (filled(it.desc_ar)?bl+`<div class="aa rtl" style="font-size:13pt;line-height:14pt">${txt(it.desc_ar)}</div>`:'')+`</div>`;},
 render(m){const S=m.settings,W=439.37,H=595.28,C=this.color,out=[];
  const side=()=>(out.length+1)%2===1,fr=R=>dyFrame(W,H,R,this.border,this.cut,S.showCut);
  if(S.intro){const enH=measureAll([{w:260.8,html:`<div class="gr c" style="font-size:11pt;line-height:14pt">${txt(S.intro_en)}</div>`}])[0].h;
    const R=side();out.push({label:'Introduction',html:pageWrap(W,H,C,fr(R)+A(R?117.4:60.9,146.8,260.8,'gr c','font-size:11pt;line-height:14pt',txt(S.intro_en))+
      A(R?117.3:60.8,Math.max(360,146.8+enH+14),260.8,'aa rtl c','font-size:14pt;line-height:16pt;letter-spacing:-.01em',txt(S.intro_ar))+dyOrn(W,H,R?239.8:183.3,533.3))});
    if(S.blankAfterIntro)out.push({label:'Blank (inside cover)',blank:true,html:pageWrap(W,H,C,dyCutOnly(W,H,side(),this.cut,S.showCut))});}
  if(S.experience){const tt=(R)=>A(R?84.8:28.3,68,326.2,'gr b t150 caps c','font-size:14pt;line-height:15pt',txt(S.expTitle))+A(R?84.8:28.3,98.3,326.2,'gr i c','font-size:13pt;line-height:13pt;letter-spacing:.02em',txt(S.expSub));
    let R=side();out.push({label:'Afternoon tea · illustration',html:pageWrap(W,H,C,fr(R)+tt(R)+
      (S.illustration?`<img class="a" src="${DIYA_ILLUS}" style="left:${R?153.7:97.2}pt;top:178.8pt;width:189pt;height:283.5pt" alt="">`:'')+dyOrn(W,H,R?239.8:183.3,533.3))});
    R=side();out.push({label:'Afternoon tea · English',html:pageWrap(W,H,C,fr(R)+tt(R)+
      A(R?117.6:61.1,147.4,260.8,'gr c','font-size:11pt;line-height:14pt',`${esc(S.price)}  <span class="t100 caps">${esc(S.perPerson)}</span><br>${txt(S.exp_en)}`)+
      dyFoot(R?111.8:55.4,479.1,272.1,S.footer_en,S.footer_ar,{ar:10,lha:9}))});
    R=side();out.push({label:'Afternoon tea · Arabic',html:pageWrap(W,H,C,fr(R)+
      A(R?84.8:28.3,63.5,326.2,'aa b rtl c','font-size:18pt;line-height:18pt',esc(S.expTitle_ar))+A(R?84.8:28.3,96.9,326.2,'aa i rtl c','font-size:16pt;line-height:16pt',esc(S.expSub_ar))+
      A(R?117.5:61,147.4,260.8,'gr c','font-size:11pt;line-height:14pt',esc(S.price))+
      A(R?117.5:61,161.4,260.8,'aa rtl c','font-size:13pt;line-height:14pt',`${esc(S.perPerson_ar)}<br><br>${txt(S.exp_ar)}`)+
      dyFoot(R?111.8:55.4,479.1,272.1,S.footer_en,S.footer_ar,{ar:10,lha:9}))});}
  const blocks=[];let prev=null;
  m.sections.forEach(sec=>{const brk=!!sec.newPage||(prev&&prev.pageTitle!==sec.pageTitle);let first=true;
    (sec.items||[]).forEach((it,k)=>{let b;
      if(sec.kind==='feature'){b={id:it.id,sec,kind:'f',w:260.8,gap:28,brk:(first&&brk)||!!it.breakBefore||(!!sec.onePerPage&&k>0),html:this.feature(it)};}
      else if(it.type==='sub')b={id:it.id,sec,kind:'s',w:268.1,gap:k?28:0,keep:true,brk:(first&&brk)||!!it.breakBefore,html:this.sub(it),after:14};
      else b={id:it.id,sec,kind:'i',w:268.1,gap:k?(sec.items[k-1].type==='sub'?14:14):0,brk:(first&&brk)||!!it.breakBefore,html:this.listItem(it,k)};
      blocks.push(b);first=false;});prev=sec;});
  const pages=flow(blocks,(i,b)=>({y:133.2,bottom:525,placed:[],sec:b.sec}));
  pages.forEach(pg=>{const R=side(),s=pg.sec;pg.placed.forEach(p=>p.b.x=p.b.kind==='f'?(R?117.5:60.9):(R?113.8:57.4));
    out.push({label:(s.pageTitle||'')+(R?' · right':' · left'),html:pageWrap(W,H,C,fr(R)+
      A(R?84.8:28.3,68,326.2,'gr b t200 caps c','font-size:14pt;line-height:14pt',txt(s.pageTitle))+
      (filled(s.pageTitle_ar)?A(R?84.8:28.3,84,326.2,'aa b rtl c','font-size:18pt;line-height:17pt',esc(s.pageTitle_ar)):'')+
      placeHtml(pg)+dyFoot(R?101.4:45,534,292.7,S.bevFooter_en,S.bevFooter_ar,{lh:8,ar:10,lha:8}))});});
  return out;}
};

/* ------------------------------------------------------------------ DIYA DRINKS (155 × 260 mm incl. flap, die-cut, EN only) */
T.diyaDrinks={size:[439.37,737.01],color:DY.ink,thumb:'#C9B29C',label:'155 × 260 mm incl. 20 mm flap · die-cut · facing pages',
 border:[[333.1,28.7],[410.6,106.4],[410.6,708.3],[85.4,708.3],[85.4,106.4],[163.0,28.7]],
 cut:[[345.0,0.1],[151.0,0.1],[56.8,94.4],[0.1,94.4],[0.1,736.9],[439.2,736.9],[439.2,94.4]],
 gh(sec,cont){const ar=filled(sec.title_ar)?` <span style="opacity:.6">|</span> <span class="aa b" style="font-size:15pt">${esc(sec.title_ar)}</span>`:'';
   const sub=!cont&&filled(sec.subtitle)?`<div class="gr i c" style="font-size:11pt;line-height:14pt;margin-top:3pt">${txt(sec.subtitle)}</div>`:'',
     intro=!cont&&filled(sec.intro)?`<div class="gr c" style="font-size:10pt;line-height:13pt;margin-top:6pt">${txt(sec.intro)}</div>`:'',
     lab=filled(sec.labelText)?`<div class="gr b t200 caps r" style="font-size:7pt;line-height:10pt">${esc(sec.labelText)}</div>`:'';
   const head=`<div class="gr b t200 caps c" style="font-size:11pt;line-height:14pt">${txt(sec.title)}${ar}</div>`;
   if(!sub&&!intro&&!lab)return {id:sec.id,kind:'gh',sec,w:257.9,h:42,keep:true,html:head};
   return {id:sec.id,kind:'gh',sec,w:257.9,keep:true,html:head+sub+intro+`<div style="height:${lab?14:28}pt"></div>`+(lab?lab+'<div style="height:4pt"></div>':'')};},
 render(m){const S=m.settings,W=439.37,H=737.01,C=this.color,out=[],self=this;
  const side=()=>(out.length+1)%2===1,fr=R=>dyFrame(W,H,R,this.border,this.cut,S.showCut);
  if(S.intro){const R=side();out.push({label:'Introduction',html:pageWrap(W,H,C,fr(R)+A(R?119.1:62.4,321.2,258,'gr c','font-size:11pt;line-height:14pt',txt(S.intro_en))+dyOrn(W,H,R?240.1:183.6,675.2))});
    if(S.blankAfterIntro)out.push({label:'Blank (inside cover)',blank:true,html:pageWrap(W,H,C,dyCutOnly(W,H,side(),this.cut,S.showCut))});}
  const blocks=[];let prev=null;
  m.sections.forEach(sec=>{const brk=!!sec.newPage||(prev&&prev.pageTitle!==sec.pageTitle);
    const g=this.gh(sec);g.brk=brk;g.gap=28;blocks.push(g);
    const items=sec.items||[];
    items.forEach((it,k)=>{let html,gap=k?14:0;
      if(it.type==='sub'){blocks.push({id:it.id,sec,w:257.9,gap:k?14:0,keep:true,brk:!!it.breakBefore,after:1,html:`<div class="gr b t200 caps" style="font-size:9pt;line-height:14pt">${txt(it.name)}</div>`});return;}
      if(k&&items[k-1].type==='sub')gap=0;
      if(sec.style==='list'){const o=dyOpts(it);
        html=priced(`<div class="gr" style="font-size:11pt;line-height:14pt">${o?`<span class="b">${esc(it.name)}</span><br>${txt(it.desc)}`:dyJoin(it.name,it.desc,false,false)}</div>`,215,(o?'\n':'')+esc(it.price),{lh:14,pcls:'gr',pstyle:'font-size:11pt;white-space:pre'});}
      else if(sec.style==='feature'){gap=k?42:0;
        html=priced(`<div class="gr b caps" style="font-size:11pt;line-height:14pt;letter-spacing:.02em">${txt(it.name)}</div>`,215,esc(it.price),{lh:14,pcls:'gr',pstyle:'font-size:11pt'})+
          (filled(it.desc)?`<div class="gr" style="font-size:11pt;line-height:14pt;margin-top:14pt;max-width:245pt">${txt(it.desc)}</div>`:'');}
      else{html=priced(`<div class="gr b ${sec.caps?'caps':''}" style="font-size:11pt;line-height:14pt;letter-spacing:.02em">${txt(it.name)}</div>`,215,esc(it.price),{lh:14,pcls:'gr',pstyle:'font-size:11pt;white-space:pre'})+
          (filled(it.desc)?`<div class="gr" style="font-size:11pt;line-height:14pt;max-width:230pt${sec.caps?';letter-spacing:-.01em':''}">${txt(it.desc)}</div>`:'');}
      blocks.push({id:it.id,sec,w:257.9,gap,brk:!!it.breakBefore,keep:items.length<=10&&k<items.length-1,html});});  /* short groups are kept on one page */
    prev=sec;});
  const pages=flow(blocks,(i,b,cont)=>{const pg={y:170.1,bottom:672,placed:[],title:b.sec.pageTitle};
    if(b.kind!=='gh'){const g=self.gh(b.sec,true);g.id=null;if(g.h==null)measureAll([g]);pg.placed.push({b:g,y:pg.y});pg.y+=g.h;}return pg;});
  pages.forEach(pg=>{const R=side(),x=R?119.1:62.4;pg.placed.forEach(p=>p.b.x=x);
    out.push({label:(pg.title||'')+(R?' · right':' · left'),html:pageWrap(W,H,C,fr(R)+
      A(R?84.8:28.3,100.6,326.2,'gr b t200 caps c','font-size:14pt;line-height:14pt',txt(pg.title))+placeHtml(pg)+
      (filled(S.footer_en)?A(R?101.7:45,689.6,292.7,'gr c','font-size:8pt;line-height:9pt',txt(S.footer_en)):''))});});
  return out;}
};
