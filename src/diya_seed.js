/* ================= DIYA LOBBY BAR — SEED DATA (from the Diya InDesign files) ================= */
const DFOOT_EN='All produce is prepared in an area where allergens are present. For those with allergies, intolerances, and special dietary requirements who may wish to know about the ingredients used please ask a member of the Management Team. All prices are in UAE Dirham and are inclusive of all applicable service charges and taxes.';
const DFOOT_AR='يُرجى الملاحظة أن جميع الأصناف قد تُحضَّر في بيئة تحتوي على مسبّبات للحساسيّة. للذين لديهم حساسيّات أو متطلّبات غذائية خاصة، يُرجى استشارة فريق الإدارة.\nجميع الأسعار بالدرهم الإماراتي وتشمل الضرائب والرسوم المطبّقة.';
const DPRICE_EN='All prices are in UAE Dirham and are inclusive of all applicable service charges and taxes.';
const DPRICE_AR='جميع الأسعار بالدرهم الإماراتي وتشمل الضرائب والرسوم المطبّقة.';
const F=(name,desc,name_ar,desc_ar,price,extra)=>Object.assign({type:'item',name,desc:desc||'',name_ar:name_ar||'',desc_ar:desc_ar||'',price:price||''},extra||{});
const L=(name,price,extra)=>Object.assign({type:'item',name,desc:'',price:price||''},extra||{});
const DS=(name,name_ar,extra)=>Object.assign({type:'sub',name,name_ar:name_ar||''},extra||{});
const AT_TEAS=__AT_TEAS__;
const DR_TEAS=__DR_TEAS__;
const atTea=(i,extra)=>Object.assign({type:'item'},AT_TEAS[i],extra||{});
const drTea=(i,price,extra)=>Object.assign({type:'item',name:DR_TEAS[i].name,desc:DR_TEAS[i].desc,price},extra||{});

Object.assign(SEED_MENUS,{
/* ---------------------------------------------------------------- DIYA FOOD */
'diya-food':{template:'diyaFood',outlet:'diya',name:'Food',
  settings:{intro:true,blankAfterIntro:true,showCut:false,
    intro_en:'Beyond our windows, the Mangroves present a unique treasure, hidden away from the shiny buildings and golden sands. Diya honours the richness, rhythms, and beauty of these landscapes.\n\nFrom day to night, the experience is re-imagined. Each dish is crafted with generosity, blending fresh, local ingredients with subtle regional flavours. Textures, aromas, and colours are allowed to shine, bringing the essence of our landscape to the plate.\n\nAs the experience unfolds, the sense of place becomes a forever memory. Each one of our flavours, carries the gentle depth of this landscape; faceted, serene and luminous like the emerald.',
    intro_ar:'أضف الترجمة العربية هنا - Add Arabic translation here',
    footer_en:DFOOT_EN,footer_ar:DFOOT_AR},
  sections:[
    {pageTitle:'Breakfast',pageSub:'Until 12 noon',pageTitle_ar:'الإفطار',pageSub_ar:'حتى الساعة ١٢ ظهرًا',title:'',title_ar:'',newPage:true,items:[
      F('Croissant','/ plain / almond','كرواسون','/ سادة / لوز','20 / 25'),
      F('Pain Suisse','za’atar, gruyere','بان سويس','زعتر، غرويير','35'),
      F('Croast','crispy flat croissant, pure harvest tomatoes, basil, mozzarella','كرواست','كرواسون مسطح مقرمش، مع طماطم طازجة، ريحان، موزاريلا','55'),
      F('Halloumi pain galettes','muhmmara, olives','جاليت بالحلومي','محمّرة، زيتون','65'),
      F('Exotic chia pudding','coconut milk, passion fruit, mango, dragon fruit','بودنغ شيا استوائي','حليب جوز الهند، باشن فروت، مانجو، دراجون فروت','60'),
      F('Hazelnut granola','Greek yoghurt, berries, mangroves honey','جرانولا بالبندق','زبادي يوناني، توت، عسل المانغروف','65'),
      F('Mediterranean hummus bowl','hummus, boiled egg, cherry tomato, red onion, pomegranate','حمص على الطريقة المتوسطيّة','حمص، بيض مسلوق، طماطم كرزية، بصل أحمر، رمان','75'),
      F('Labneh','red pepper piperade, za’atar pitta bread','لبنة','فلفل أحمر حار، خبز البيتا بالزعتر','55'),
      F('Avocado & smoked salmon croast','sour cream, chives, black pepper','كرواست بالأفوكادو والسلمون المدخّن','ساور كريم مع ثوم معمر، الفلفل أسود','85')]},
    {pageTitle:'LUNCH / DINNER',pageSub:'12:00 to 23:00 (last order 22:30)',pageTitle_ar:'الغداء / العشاء',pageSub_ar:'١٢ ظهرًا إلى ١١ ليلاً (آخر طلب ١٠:٣٠)',title:'SMALL PLATES',title_ar:'الاطباق الصغيرة',newPage:true,items:[
      F('Falafel','black truffle tahini','فلافل','طحينة الكمأة السوداء','65'),
      F('Hummus','spicy chickpeas, za’atar leaves','حمص','حمص حار، أوراق الزعتر','55'),
      F('Baba ghanouj','pomegranate seeds, crisp flatbread','بابا غنوج','بذور الرمان، خبز رقيق مقرمش','55'),
      F('Local burrata','heritage tomatoes, black olive crumb','بوراتا محلية','طماطم تقليدية، فتات زيتون أسود','80'),
      F('Pastrami','spiced wagyu sirloin, pickled vegetables','بسترمة','شريحة لحم واغيو متبلة، خضار مخللة','110'),
      F('Kunafa tiger prawns','homemade green siracha','كنافة روبيان','صلصة سيراشا الخضراء على الطريقة المنزلية','95'),
      F('Lamb kibbeh tartare','walnuts, mint, chilli','كبة ترتار','جوز، نعناع، فلفل حار','75'),
      F('Porcini mushroom','bone marrow, toasted brioche','فطر بورسيني','نخاع العظم، خبز بريوش محمص','85'),
      F('Wagyu beef sliders','smoked cheese, chipotle mayo','سلايدر واجيو','جبن مدخن، مايونيز شيبوتلي','90'),
      F('Lobster arancini','saffron aioli','أرانشيني لوبستر','أيولي زعفران','80'),
      F('Triple cooked chips','za’atar hollandaise','بطاطا ثلاثية القرمشة','صلصة هولنديز بالزعتر','60')]},
    {title:'SALADS',title_ar:'السلطات',newPage:true,items:[
      F('Freekeh salad Greek style','oregano, feta','سلطة فريكة على الطريقة اليونانية','أوريجانو، جبنة فيتا','85'),
      F('Grilled chicken & quinoa salad','pickled cucumber, tomato, avocado, pomegranate molasses','سلطة دجاج مشوي مع الكينوا','خيار مخلل، طماطم، أفوكادو، دبس الرمان','90'),
      F('Heritage beetroot salad','pickled walnut, rocket, goat cheese','سلطة شمندر هيريتيج','جوز مخلل، جرجير، جبنة الماعز','80'),
      F('King prawn salad','hydroponic leaves, mango, chili, citrus dressing','سلطة روبيان ملكي','أوراق نباتية، مانجو، فلفل حار، صلصة الحميضات','145')]},
    {title:'GOURMET SANDWICHES',title_ar:'السندويشات الفاخرة',newPage:true,items:[
      F('Tartine of figs','burrata, caramelized walnuts','تارتين التين','جبنة بوراتا وجوز مكرمل','85'),
      F('Grilled veg','pesto, flamed peppers, halloumi, foccacia','خضار مشوية','بيستو، فلفل مشوي، حلومي، خبز فوكاتشيا','65'),
      F('Saffron & citrus chicken','raisins, almonds, herb wrap','دجاج متبل بالزعفران والحمضيات','زبيب، لوز، لفائف أعشاب','80'),
      F('Tuna sourdough','avocado, rocket, coriander pesto, siracha mayo','تونة سوردو (خبز العجين المخمّر)','أفوكادو، جرجير، بيستو الكزبرة، مايونيز سيراشا','75'),
      F('Lamb kofta','apricot, foie gras, grilled pitta','كفتة غنم','مشمش، فوا جرا، خبز بيتا مشوي','165'),
      F('Shish taouk','garlic sauce, grilled pita','شيش طاووق','صلصة ثوم، خبز بيتا مشوي','125')]},
    {title:'FLAT BREADS',title_ar:'الخبز المسطح',items:[
      F('Heritage tomato','zhoug, bresaola','طماطم هيريتدج','زعوق، بريزاولا','90'),
      F('Wild mushrooms','ricotta, black truffle','فطر برّي','ريكوتا، كمأة سوداء','95'),
      F('Arayes','– meat or cheese & zaatar','عرايس','- لحم أو جبن وزعتر','65 / 60')]},
    {title:'DESSERTS',title_ar:'الحلويات',newPage:true,items:[
      F('Baklava','pistachio, mangrove honey','بقلاوة','فستق، عسل مانجروف','45'),
      F('Layali Lubnan','orange blossom, hazelnut','ليالي لبنان','زهر البرتقال، بندق','50'),
      F('Labneh cheesecake','fig compote, carob crumb','تشيز كيك لبنة','كومبوت تين، فتات خروب','55'),
      F('Fresh fruit','– served on ice','فواكه طازجة','- تُقدّم مع الثلج','55')]}
  ]},
/* ---------------------------------------------------------------- DIYA AFTERNOON TEA */
'diya-tea':{template:'diyaTea',outlet:'diya',name:'Afternoon Tea',
  settings:{intro:true,blankAfterIntro:true,showCut:false,experience:true,illustration:true,
    intro_en:'Inspired by the mangroves of Abu Dhabi, a local hidden gem, The Jewel Box is Diya’s signature Afternoon Tea experience.\n\nNow a universal expression, Afternoon Tea was first embraced as a symbol of refinement, it turned into a formal ritual, offering a moment to gather, connect and spend time with others. In Emirati culture, open-hearted hospitality is a quiet art, where generosity is instinctive. Rooted in the grace and tradition of a classic tea service and softened by regional touches, this ritual offers a moment of refinement and pause within the rhythm of the day.\n\nOur Afternoon Tea is a moment of connection shaped by our surroundings; a pause for sharing, letting the afternoon unfold naturally.',
    intro_ar:'Add Arabic translation here - أضف الترجمة العربية هنا',
    expTitle:'AFTERNOON TEA EXPERIENCE',expSub:'“A moment by the mangroves”',expTitle_ar:'تجربة شاي ما بعد الظهيرة',expSub_ar:'لحظة عند القرم',
    price:'145',perPerson:'per person',perPerson_ar:'للشخص',
    exp_en:'Step into a sanctuary shaped by nature. At LXR Mangrove Abu Dhabi, the tranquil presence of the mangroves sets a gentle rhythm for the afternoon. The signature Jewel Box arrives—tiers of fine pastries, delicate sandwiches, and luminous sweets presented like contemporary treasures, crafted with precision and deeply connected to the place.\n\nHere, elegance is something you feel, not something declared: Emirati hospitality expressed through quiet balance, softness, and time allowed to breathe. Conversations ease, the moment deepens, and the ritual reveals itself, layer by layer.\n\nLight traces the edges of the table, gliding over porcelain, glass, and sugared surfaces—small gestures of beauty shaped by the shimmer of the water around you.\n\nAnd as you leave, a gentle afterglow remains… a touch of Abu Dhabi’s emerald calm carried beyond the final sip.',
    exp_ar:'ادخل إلى ملاذ تحدده الطبيعة. ففي LXR «مانغروف أبوظبي» ، يمنح هدوء أشجار القرم وقت ما بعد الظهيرة إيقاعه الخاص. تصل «علبة الجواهر» — طبقات من المعجّنات الدقيقة، والسندويشات الرفيعة، واللقيمات المضيئة — تُقدَّم ككنوز صغيرة معاصرة، مُتقنة الصنع ومرتبطة بروح المكان.\n\nالأناقة هنا تُلمَس ولا تُعلَن: ضيافة إماراتية تنساب في شكل هدوء وتوازن ومساحة يتنفّس فيها الوقت. تتقاطع الأحاديث، ويهدأ الإيقاع، ويظهر الطقس شيئًا فشيئًا مع كل طبقة جديدة.\n\nيلامس الضوء حواف الطاولة، ينساب على الخزف والزجاج وحبات السكر — لحظات جمال يولّدها بريق الماء من حولك.\n\nوعند الرحيل، يرافقك أثر هادئ… لمحة من سكينة أبوظبي الزمردي، تبقى بعد آخر رشفة.',
    footer_en:DFOOT_EN,footer_ar:DFOOT_AR,bevFooter_en:DPRICE_EN,bevFooter_ar:DPRICE_AR},
  sections:[
    {kind:'list',pageTitle:'COLD BEVERAGES',pageTitle_ar:'المشروبات الباردة',newPage:true,items:[
      DS('JUICES','العصائر'),F('Orange, grapefruit, pineapple, watermelon, apple','','برتقال، جريب فروت، أناناس، بطيخ، تفاح','','35'),
      DS('SOFT DRINKS','المشروبات الغازية'),F('Coca-Cola, Sprite, Fanta, Ginger Ale, Tonic','','كوكا كولا، سبرايت، فانتا، الزنجبيل الغازي، تونيك','','35'),F('Soda water','','مياه غازيّة','','35'),F('Red Bull','','ريد بول','','55'),
      DS('WATER','ماء'),F('Acqua Panna','Small\nLarge','أكوا بانا','صغير\nكبير','38\n48'),F('San Pellegrino','Small\nLarge','سان بيليجرينو','صغير\nكبير','38\n48')]},
    {kind:'list',pageTitle:'HOT BEVERAGES',pageTitle_ar:'المشروبات الساخنة',newPage:true,items:[
      DS('CLASSIC COFFEE','القهوة الكلاسيكية'),
      F('Espresso Single','','إسبريسو فردي','','28'),F('Espresso Double','','إسبريسو مزدوج','','35'),F('Caffe Americano','','قهوة أمريكانو','','38'),F('Caffe Latte','','قهوة لاتيه','','42'),
      F('Cappuccino','','كابتشينو','','40'),F('Turkish Coffee','','قهوة تركية','','35'),F('Flat White','','فلات وايت','','42'),F('Macchiato','','ماكياتو','','35')]},
    {kind:'list',pageTitle:'HOT BEVERAGES',pageTitle_ar:'المشروبات الساخنة',newPage:true,items:[
      DS('CLASSIC TEA','الشاي الكلاسيكي'),
      F('Assam English Breakfast Tea','','شاي آسّام – الإفطار الإنجليزي','','50'),F('Majestic Earl Grey','','إيرل جراي ماجيستيك','','50'),F('Tropical Green','','تروبيكال جرين','','50'),
      F('Organic Moroccan Mint','','نعناع مغربي عضوي','','50'),F('Chamomile Blossoms','','أزهار البابونج','','50'),F('Oriental Moments','','لحظات شرقية','','50'),F('Organic Darjeeling 2nd Flush','','دارجيلنغ عضوي، الدفعة الثانية','','50')]},
    {kind:'list',pageTitle:'HOT BEVERAGES',pageTitle_ar:'المشروبات الساخنة',newPage:true,items:[
      DS('SPECIALTY COFFEE','القهوة المتخصصة'),
      F('Brazil:','chocolate, nutty, smooth body','البرازيل:','شوكولاتة، جوز، قوام ناعم','65'),F('Colombia:','balanced, fruity sweetness, medium body','كولومبيا:','متوازن، حلاوة فاكهية، قوام متوسط','65'),
      F('Ethiopia:','floral, chocolatey, medium body','إثيوبيا:','زهري، شوكولاتة، قوام متوسط','65'),F('Peru:','floral, citrusy, clean finish','بيرو:','رائحة زهرية، حمضية، ونهاية نقية','65'),
      DS('SPECIALTY HOT BEVERAGES','المشروبات الساخنة المتخصصة'),
      F('Hot Chocolate','','شوكولاتة ساخنة','','35'),F('Mocha','','موكا','','40'),F('Spanish Latte','','لاتيه إسباني','','45'),F('Matcha Latte','','لاتيه ماتشا','','40')]},
    {kind:'feature',pageTitle:'SPECIALTY TEAS',pageTitle_ar:'شاي مميز',newPage:true,onePerPage:true,items:[atTea(0),atTea(1),atTea(2),atTea(3),atTea(4)]},
    {kind:'feature',pageTitle:'EXCLUSIVE TEAS',pageTitle_ar:'الشاي الحصري',newPage:true,onePerPage:true,items:[atTea(5),atTea(6),atTea(7)]}
  ]},
/* ---------------------------------------------------------------- DIYA DRINKS */
'diya-lobby-drinks':{template:'diyaDrinks',outlet:'diya',name:'Lobby Drinks',contentVersion:'2026-11-25',
  settings:{intro:true,blankAfterIntro:true,showCut:false,
    intro_en:'Where light touches water, brilliance awakens.\n\nEach drink is shaped with measured clarity: crisp, refined, and quietly expressive.\nA sip that reflects the calm beauty of Abu Dhabi’s mangroves...',
    footer_en:DPRICE_EN},
  sections:__DIYA_LOBBY_DRINKS__},
'diya-drinks':{template:'diyaDrinks',outlet:'diya',name:'Mezzanine Drinks',contentVersion:'2026-11-25',
  settings:{intro:true,blankAfterIntro:true,showCut:false,
    intro_en:'Where light touches water, brilliance awakens.\n\nEach drink is shaped with measured clarity: crisp, refined, and quietly expressive.\nA sip that reflects the calm beauty of Abu Dhabi’s mangroves...',
    footer_en:DPRICE_EN},
  sections:__DIYA_DRINKS__}
});
OUTLETS.push({id:'diya',name:'Diya',sub:'Lobby Bar',logoImg:'__DIYA_LOGO__',color:'#2B2B2A',menus:['diya-food','diya-drinks','diya-lobby-drinks','diya-tea']});
