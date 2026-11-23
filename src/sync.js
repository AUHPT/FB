/* ================= SHARED SAVING (Google Apps Script + Google Sheet) =================
   Every change is saved in this browser at once, and — when a shared-saving link is set in
   config.json — also to the team's Google Sheet, so everyone continues from the latest
   saved menu. Each save is kept as a version that can be restored. */
const SKEY='mangroves-menu-studio-sync',UKEY='mangroves-menu-studio-user';
const CLOUD={url:'',ready:false,online:true,busy:false,timer:null,poll:null};
let SYNC={};try{SYNC=JSON.parse(localStorage.getItem(SKEY))||{};}catch(e){}
let USER={};try{USER=JSON.parse(localStorage.getItem(UKEY))||{};}catch(e){}
const saveSync=()=>{try{localStorage.setItem(SKEY,JSON.stringify(SYNC));}catch(e){}};
function hashStr(s){let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677);}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return (h2>>>0).toString(36)+(h1>>>0).toString(36);}
const menuHash=id=>hashStr(JSON.stringify(DB.menus[id]));
/* a menu needs uploading when it differs from the last version this browser saved/loaded */
const isDirty=id=>{const s=SYNC[id];return s?s.hash!==menuHash(id):!!DB.menus[id].updatedAt;};

async function cloudInit(){
  try{const r=await fetch('config.json',{cache:'no-store'});if(r.ok){const c=await r.json();CLOUD.url=(c.sharedSaveUrl||'').trim();}}catch(e){}
  if(!CLOUD.url){setSave('ok');return;}
  CLOUD.ready=true;await cloudPull(true);
  CLOUD.poll=setInterval(()=>{if(!document.hidden)cloudPull();},45000);
  window.addEventListener('focus',()=>cloudPull());
  window.addEventListener('online',()=>{CLOUD.online=true;cloudPush();});}

async function api(params,body){
  const url=CLOUD.url+(params?'?'+new URLSearchParams(params):'');
  const r=body?await fetch(url,{method:'POST',body:JSON.stringify(body),headers:{'Content-Type':'text/plain;charset=utf-8'}}):await fetch(url,{cache:'no-store'});
  if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}

/* bring in the team's latest saves */
async function cloudPull(first){
  if(!CLOUD.ready||CLOUD.busy)return;CLOUD.busy=true;let changed=[],conflicts=[];
  try{const res=await api({action:'list'});if(!res.ok)throw new Error(res.error);CLOUD.online=true;
    for(const c of res.menus){if(!DB.menus[c.id]&&!SEED_MENUS[c.id])continue;
      const mine=SYNC[c.id];if(mine&&mine.rev>=c.rev)continue;
      if(DB.menus[c.id]&&isDirty(c.id)&&(!mine||mine.rev<c.rev))conflicts.push(c);
      else{adopt(c);changed.push(c);}}
  }catch(e){CLOUD.online=false;}
  finally{CLOUD.busy=false;}
  saveSync();
  if(conflicts.length)for(const c of conflicts)await resolveConflict(c);
  if(changed.length||conflicts.length){try{localStorage.setItem(KEY,JSON.stringify(DB));}catch(e){}
    const cur=changed.find(c=>c.id===MID);
    if(!first&&cur)toast('Updated with the latest version saved by '+(cur.by||'a colleague'),3200);
    if(first||cur||!MID)render();}
  cloudPush();}

function adopt(c){DB.menus[c.id]=withIds(c.data);SYNC[c.id]={rev:c.rev,at:c.at,by:c.by,hash:menuHash(c.id)};}

/* upload every menu that changed on this computer */
async function cloudPush(){
  clearTimeout(CLOUD.timer);if(!CLOUD.ready||CLOUD.busy)return cloudStatus();
  const ids=Object.keys(DB.menus).filter(isDirty);if(!ids.length)return cloudStatus();
  if(!USER.key||!USER.name){if(CLOUD.declined)return cloudStatus();const ok=await askUser();if(!ok){CLOUD.declined=true;return cloudStatus();}}
  CLOUD.busy=true;setSave('dirty');
  try{for(const id of ids){const res=await api(null,{action:'save',id,base:(SYNC[id]||{}).rev||0,data:DB.menus[id],by:USER.name,key:USER.key});
      if(res.ok){SYNC[id]={rev:res.rev,at:res.at,by:res.by,hash:menuHash(id)};saveSync();}
      else if(res.error==='passcode'){USER.key='';localStorage.setItem(UKEY,JSON.stringify(USER));CLOUD.busy=false;toast('The team passcode is not correct');return cloudPush();}
      else if(res.error==='conflict'){CLOUD.busy=false;await resolveConflict(res.current);CLOUD.busy=true;}
      else throw new Error(res.error);}
    CLOUD.online=true;
  }catch(e){CLOUD.online=false;CLOUD.timer=setTimeout(cloudPush,20000);}
  finally{CLOUD.busy=false;}
  cloudStatus();}
const cloudSoon=()=>{clearTimeout(CLOUD.timer);CLOUD.timer=setTimeout(cloudPush,1500);};

function cloudStatus(){if(!CLOUD.ready)return setSave('ok');
  const pending=Object.keys(DB.menus).some(isDirty);
  setSave(!pending?'shared':(!USER.key&&CLOUD.declined)?'unshared':CLOUD.online?'dirty':'offline');
  const el=$('#saveState');if(el&&!el._c){el._c=1;el.style.cursor='pointer';el.onclick=()=>{if(CLOUD.ready){CLOUD.declined=false;cloudPush();}};}}

/* someone else saved the same menu since this browser last loaded it */
function resolveConflict(c){return new Promise(res=>{if(!c)return res();
  const m=DB.menus[c.id]||{},when=c.at?new Date(c.at).toLocaleString([],{dateStyle:'medium',timeStyle:'short'}):'';
  const bg=h('div',{class:'modal-bg'});
  const done=async mine=>{bg.remove();
    if(mine){SYNC[c.id]={rev:c.rev,at:c.at,by:c.by,hash:'-'};saveSync();cloudSoon();}
    else{adopt(c);saveSync();try{localStorage.setItem(KEY,JSON.stringify(DB));}catch(e){}if(MID===c.id)render();}
    res();};
  bg.append(h('div',{class:'modal'},h('h2',{},'“'+(m.name||c.id)+'” was changed by someone else'),
    h('p',{},`${c.by||'A colleague'} saved a newer version${when?' on '+when:''} while this computer also had changes. Which version should be kept? The other one stays in Version history.`),
    h('div',{style:'display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap'},
      h('button',{class:'btn',onclick:()=>done(true)},'Keep the changes on this computer'),
      h('button',{class:'btn pri',onclick:()=>done(false)},h('span',{class:'lbl'},'Use '+(c.by?c.by+'’s':'the newer')+' version')))));
  document.body.append(bg);});}

/* name + team passcode, asked once per browser */
function askUser(){return new Promise(res=>{const bg=h('div',{class:'modal-bg'});
  const n=h('input',{class:'inp',placeholder:'e.g. Rana — Tayō',value:USER.name||''}),k=h('input',{class:'inp',type:'password',placeholder:'Team passcode'});
  const err=h('p',{style:'color:var(--danger);margin:6px 0 0;display:none'},'');
  const go=h('button',{class:'btn pri',onclick:async()=>{if(!n.value.trim()||!k.value.trim()){err.textContent='Please fill in both.';err.style.display='';return;}
      go.classList.add('loading');
      try{const r=await api(null,{action:'check',key:k.value.trim()});
        if(!r.ok){err.textContent='That passcode is not correct.';err.style.display='';go.classList.remove('loading');return;}}
      catch(e){err.textContent='Could not reach the shared folder. Check the internet connection.';err.style.display='';go.classList.remove('loading');return;}
      USER={name:n.value.trim(),key:k.value.trim()};localStorage.setItem(UKEY,JSON.stringify(USER));bg.remove();res(true);}},
    h('span',{class:'spin'}),h('span',{class:'lbl'},'Save for the team'));
  bg.append(h('div',{class:'modal'},h('h2',{},'Save your changes for the team'),
    h('p',{},'Menus are saved in a shared folder, so everyone continues from the latest version. Enter your name (shown in Version history) and the team passcode. You only need to do this once on this computer.'),
    h('div',{style:'display:grid;gap:10px'},n,k),err,
    h('div',{style:'display:flex;gap:8px;justify-content:flex-end;margin-top:16px'},h('button',{class:'btn',onclick:()=>{bg.remove();res(false);}},'Not now'),go)));
  document.body.append(bg);setTimeout(()=>n.focus(),50);});}

/* version history of the open menu */
async function historyModal(){
  if(!CLOUD.ready){alert('Version history needs shared saving. Add the shared-saving link to config.json (see shared-saving/SETUP.md).');return;}
  const id=MID,bg=h('div',{class:'modal-bg'}),list=h('div',{class:'vlist'},h('p',{},'Loading…'));
  bg.addEventListener('click',e=>{if(e.target===bg)bg.remove();});
  bg.append(h('div',{class:'modal'},h('h2',{},'Version history · '+M.name),h('p',{},'Every save is kept. Restoring a version makes it the latest version for everyone; nothing is deleted.'),list,
    h('div',{style:'display:flex;justify-content:flex-end;margin-top:14px'},h('button',{class:'btn',onclick:()=>bg.remove()},'Close'))));
  document.body.append(bg);
  try{const r=await api({action:'history',id});if(!r.ok)throw new Error(r.error);list.innerHTML='';
    if(!r.versions.length)list.append(h('p',{},'No saved versions yet.'));
    const cur=(SYNC[id]||{}).rev;
    r.versions.forEach(v=>list.append(h('div',{class:'vrow'},
      h('div',{},h('b',{},'Version '+v.rev+(v.rev===cur?' · current':'')),h('small',{},(v.by||'—')+' · '+new Date(v.at).toLocaleString([],{dateStyle:'medium',timeStyle:'short'}))),
      v.rev===cur?null:h('button',{class:'btn sm',onclick:async e=>{const b=e.currentTarget;b.disabled=true;b.textContent='Restoring…';
        try{const x=await api({action:'version',id,rev:v.rev});if(!x.ok||!x.version)throw new Error();
          DB.menus[id]=withIds(x.version.data);DB.menus[id].updatedAt=Date.now();persist();bg.remove();render();toast('Version '+v.rev+' restored');}
        catch(err){b.disabled=false;b.textContent='Restore';toast('Could not restore — try again');}}},'Restore'))));
  }catch(e){list.innerHTML='';list.append(h('p',{},'Could not load the history. Check the internet connection.'));}}
