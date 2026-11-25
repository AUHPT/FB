/* ================= TAYŌ — SEED DATA (from the Tayo InDesign files) ================= */
const TAYO_DATA=__TAYO_DATA__;
const TFOOT_EN='All produce is prepared in an area where allergens are present. For those with allergies, intolerances, and special dietary requirements who may wish to know about the ingredients used please ask a member of the Management Team.\nAll prices are in UAE Dirham and are inclusive of all applicable service charges and taxes.';
const TFOOT_AR='يُرجى الملاحظة أن جميع الأصناف قد تُحضَّر في بيئة تحتوي على مسبّبات للحساسيّة. للذين لديهم حساسيّات أو متطلّبات غذائية خاصة، يُرجى استشارة فريق الإدارة.\nجميع الأسعار بالدرهم الإماراتي وتشمل الضرائب والرسوم المطبّقة.';
Object.assign(SEED_MENUS,{
'tayo-food':{template:'tayoFood',outlet:'tayo',name:'Food',
  settings:{intro:true,blankAfterIntro:true,
    intro_en:'TAYŌ is born from the sun.\n\nIts story begins where first light touches the water; golden, boundless, and shared across coastlines. Here, cultures meet as naturally as the horizon meets the sea. The menu reflects this union: Japanese precision shaped by Mediterranean warmth. Clean techniques, open flavours, and dishes that hold both clarity and generosity in the same breath.\n\nWe draw from what the sun nourishes: coastal harvests, vibrant produce, and ingredients chosen for their purity and brightness, including small, sun-fed yields from our own micro-farm. Every dish carries the energy of light, the rhythm of the tide, and the spirit of a cuisine shaped by two worlds yet guided by one sun.\n\nTAYŌ is more than a place to dine; it is a map of stories, each plate a moment of connection, crafted under the same golden sky.',
    intro_ar:'تايُو وُلد من الشمس.\n\nتبدأ حكايته عند أوّل ضوء يلًمس الماء: ذهبيّ، واسع، ومشترك بين السواحل. هنا تلتقي الثقافات كما يلتقي الأفق بالبحر، ببساطة وانسجام . تعكس القائمة هذا اللقاء: دقّة يابانية تصوغها دفاءة المتوسّط . تقنيات نقية، نكهات منفتحة، وأطباق تجمع بين الصفاء والسخاء في لحظة واحدة. \n\nنستلهم ممّا تغذّيه الشمس: عطايا الساحل، ونضارة المكوّنات المختارة لنقائها وسطوعها، إضافة إلى محاصيل صغيرة تغذيها الشمس من مزرعتنا المصغّرة. يحمل كل طبق طاقة الضوء، وإيقاع الموج، وروح مطبخ تنسجه عالمان وتوحده شمس واحدة.\n\nتايُو ليس وجهة للطعام فحسب، بل خريطة قصص؛ كل طبق فيها لحظة اتصال، صيغت تحت سماء ذهبية واحدة.',
    footer_en:TFOOT_EN,footer_ar:TFOOT_AR},
  sections:TAYO_DATA.F},
'tayo-drinks':{template:'tayoDrinks',outlet:'tayo',name:'Drinks',contentVersion:'2026-11-25',
  settings:{intro:true,blankEnd:1,
    intro_en:'TAYŌ lives in the sun.\n\nDrinks are bright, refreshing, and clean-lined, created for warm days, long horizons, and an ease that feels coastal and free. Each sip offers a cool lift, a touch of clarity, and the brightness of light on water.\n\nLook toward the sun’s golden thread where coastlines meet, and cultures find their common glow.',
    footer_en:'All prices are in UAE Dirham and are inclusive of all applicable\nservice charges and taxes.'},
  sections:TAYO_DATA.D},
'tayo-kids':{template:'tayoKids',outlet:'tayo',name:'Kids',
  settings:{title:'TAYŌ KIDS',title_ar:'قائمة طعام الأطفال من تايو',footer_en:TFOOT_EN.replace(/\.$/,''),footer_ar:TFOOT_AR},
  sections:TAYO_DATA.K},
'tayo-sunbeds':{template:'tayoSunbeds',outlet:'tayo',name:'Sunbeds',
  settings:{outside:true,footer_en:TFOOT_EN,footer_ar:TFOOT_AR},
  sections:TAYO_DATA.S}
});
OUTLETS.push({id:'tayo',name:'Tayō',sub:'Restaurant',logoImg:'__TAYO_LOGO__',color:'#D76833',menus:['tayo-food','tayo-drinks','tayo-kids','tayo-sunbeds']});
