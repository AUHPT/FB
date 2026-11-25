/* ================= BUFFET TAGS =================
   Lilia buffet card (Lilia_Buffet_Card.ai): 85 × 55 mm, Fig rounded frame inset 2.6 mm,
   EN Fraunces Light 22/24 pt, AR Parastoo 30/30 pt, centred. Printed 9 per A4 (landscape)
   with cut marks, or one card per page for card printers. */
const MM=72/25.4;
const BT={W:85*MM,H:55*MM,inset:7.5,radius:18.7,stroke:.75,padX:14,
  sheet:{W:841.89,H:595.28,cols:3,rows:3},markGap:2*MM,markLen:6*MM};
/* shrink-to-fit: largest size (≤ start) at which the text fits in maxLines lines */
const BT_FIT={},BT_OPSZ="font-variation-settings:'opsz' 22;";  /* 'Optical' sizing in the AI file = optical size of 22 pt */
function btMeasureBox(){let m=document.getElementById('btMeasure');
  if(!m){m=document.createElement('div');m.id='btMeasure';m.className='pg';m.style.cssText='position:absolute;left:-99999px;top:0;width:auto;height:auto;visibility:hidden';document.body.append(m);}
  return m;}
function btFit(text,cls,start,min,lhRatio,maxW,maxLines){
  const key=[text,cls,start,maxW,maxLines].join('|');if(BT_FIT[key])return BT_FIT[key];
  const box=btMeasureBox();box.innerHTML=`<div class="${cls}" style="width:${maxW}pt;text-align:center;${cls==='fr'?BT_OPSZ:''}">${esc(text)}</div>`;const el=box.firstChild;
  let pt=start;
  for(;pt>min;pt-=.5){el.style.fontSize=pt+'pt';el.style.lineHeight=(pt*lhRatio)+'pt';
    if(el.getBoundingClientRect().height<=pt*lhRatio*maxLines*PX+1)break;}
  return BT_FIT[key]={pt,lh:pt*lhRatio};}
function btTag(it,S){const ink='currentColor',w=BT.W-2*BT.inset-2*BT.padX;
  const en=filled(it.name)?btFit(it.name,'fr',22,13,24/22,w,2):null,ar=filled(it.name_ar)?btFit(it.name_ar,'ar rtl',30,17,1,w,2):null;
  const al=S.allergens&&filled(it.allergens)?String(it.allergens).split(/[,;|]+/).map(s=>s.trim()).filter(Boolean).join('  ·  '):'';
  return (S.frame!==false?`<div class="a" style="left:${BT.inset}pt;top:${BT.inset}pt;width:${BT.W-2*BT.inset}pt;height:${BT.H-2*BT.inset}pt;border:${BT.stroke}pt solid ${ink};border-radius:${BT.radius}pt;box-sizing:border-box"></div>`:'')+
    `<div class="a" style="left:${BT.inset+BT.padX}pt;top:${BT.inset}pt;width:${w}pt;height:${BT.H-2*BT.inset-(al?14:0)}pt;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">`+
      (en?`<div class="fr" style="font-size:${en.pt}pt;line-height:${en.lh}pt;width:100%;${BT_OPSZ}">${esc(S.upper?it.name.toUpperCase():it.name)}</div>`:'')+
      (ar?`<div class="ar rtl" style="font-size:${ar.pt}pt;line-height:${ar.lh}pt;width:100%">${esc(it.name_ar)}</div>`:'')+`</div>`+
    (al?`<div class="a fr c" style="left:${BT.inset+BT.padX}pt;top:${BT.H-BT.inset-19}pt;width:${w}pt;font-size:7pt;line-height:9pt;letter-spacing:.02em;font-variation-settings:'opsz' 9">${esc(al)}</div>`:'');}
/* list of tags, repeated by quantity; optionally each section starts a new sheet */
function btList(m){const out=[];
  m.sections.forEach(sec=>{let first=true;(sec.items||[]).forEach(it=>{if(!filled(it.name)&&!filled(it.name_ar))return;
    const n=Math.max(1,Math.min(99,parseInt(it.qty,10)||1));
    for(let k=0;k<n;k++){out.push({it,brk:first&&m.settings.sectionSheets,sec});first=false;}});});
  return out;}
T.buffetTags={color:'#6C202A',thumb:'#C9A2A6',
  get size(){return (typeof M!=='undefined'&&M&&M.template==='buffetTags'&&M.settings.layout==='single')?[BT.W,BT.H]:[BT.sheet.W,BT.sheet.H];},
  get label(){return (typeof M!=='undefined'&&M&&M.template==='buffetTags'&&M.settings.layout==='single')?'85 × 55 mm · one card per page':'85 × 55 mm cards · 9 per A4 · cut marks';},
  render(m){const S=m.settings,C=S.color||this.color,list=btList(m),out=[];
    const tagDiv=(x,y,t)=>`<div class="blk hl" data-id="${t.it.id}" style="left:${x}pt;top:${y}pt;width:${BT.W}pt;height:${BT.H}pt">${btTag(t.it,S)}</div>`;
    if(!list.length)return [{label:'No tags yet',html:pageWrap(...this.size,C,`<div class="a fr c" style="left:0;top:45%;width:100%;font-size:14pt;opacity:.5">Add dishes on the left</div>`)}];
    if(S.layout==='single')return list.map(t=>({label:(t.it.name||t.it.name_ar)+(t.sec.title?' · '+t.sec.title:''),html:pageWrap(BT.W,BT.H,C,tagDiv(0,0,t))}));
    const {W,H,cols,rows}=BT.sheet,per=cols*rows,MX=(W-cols*BT.W)/2,MY=(H-rows*BT.H)/2;
    const sheets=[];let cur=null;
    list.forEach(t=>{if(!cur||cur.length===per||(t.brk&&cur.length)){cur=[];sheets.push(cur);}cur.push(t);});
    const g=BT.markGap,L=BT.markLen,x1=MX+cols*BT.W,y1=MY+rows*BT.H;let marks='';
    for(let i=0;i<=cols;i++){const v=MX+i*BT.W;marks+=`M${v} ${MY-g-L}V${MY-g}M${v} ${y1+g}V${y1+g+L}`;}
    for(let i=0;i<=rows;i++){const v=MY+i*BT.H;marks+=`M${MX-g-L} ${v}H${MX-g}M${x1+g} ${v}H${x1+g+L}`;}
    const markSvg=S.marks===false?'':`<svg class="a" style="left:0;top:0" width="${W}pt" height="${H}pt" viewBox="0 0 ${W} ${H}"><path d="${marks}" stroke="#000" stroke-width=".25" fill="none"/></svg>`;
    sheets.forEach((sh,si)=>{const secs=[...new Set(sh.map(t=>t.sec.title).filter(Boolean))];
      out.push({label:`Sheet ${si+1} · ${sh.length} card${sh.length>1?'s':''}${secs.length?' · '+secs.join(', '):''}`,
        html:pageWrap(W,H,C,markSvg+sh.map((t,k)=>tagDiv(MX+(k%cols)*BT.W,MY+Math.floor(k/cols)*BT.H,t)).join(''))});});
    return out;}
};
/* CSV in / out (same columns as the HGI tag printer: Arabic, English, Allergens, Qty — plus optional Section) */
function btParseCSV(text){text=text.replace(/^﻿/,'');const rows=[];let row=[],f='',q=false;
  for(let i=0;i<text.length;i++){const c=text[i];
    if(q){if(c==='"'){if(text[i+1]==='"'){f+='"';i++;}else q=false;}else f+=c;}
    else if(c==='"')q=true;else if(c===','){row.push(f);f='';}
    else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(f);rows.push(row);row=[];f='';}else f+=c;}
  if(f!==''||row.length){row.push(f);rows.push(row);}
  return rows.filter(r=>r.some(v=>v.trim()!==''));}
function btFromCSV(text){const rows=btParseCSV(text);if(!rows.length)return [];
  const hd=rows[0].map(v=>v.trim().toLowerCase()),find=keys=>hd.findIndex(x=>keys.some(k=>x.includes(k)));
  let iAr=find(['arabic','عربي']),iEn=find(['english','name','dish']),iAl=find(['allergen','حساسية']),iQ=find(['qty','quantity','copies','count']),iS=find(['section','category','station']),start=1;
  if(iAr<0&&iEn<0){iAr=0;iEn=1;iAl=2;iQ=3;iS=-1;start=0;}
  const secs=[],by={};
  for(let r=start;r<rows.length;r++){const g=i=>i>-1&&rows[r][i]!=null?String(rows[r][i]).trim():'';
    const it={id:uid(),type:'item',name:g(iEn),name_ar:g(iAr),allergens:g(iAl),qty:String(parseInt(g(iQ),10)>0?parseInt(g(iQ),10):1)};
    if(!it.name&&!it.name_ar)continue;const s=g(iS)||'Dishes';
    if(!by[s]){by[s]={id:uid(),title:s,items:[]};secs.push(by[s]);}by[s].items.push(it);}
  return secs;}
function btToCSV(m){const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';
  return '﻿Section,English,Arabic,Allergens,Qty\n'+m.sections.flatMap(s=>(s.items||[]).map(it=>[s.title||'',it.name,it.name_ar,it.allergens||'',it.qty||1].map(q).join(','))).join('\n');}
