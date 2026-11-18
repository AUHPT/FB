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
'diya-drinks':{template:'diyaDrinks',outlet:'diya',name:'Drinks',
  settings:{intro:true,blankAfterIntro:true,showCut:false,
    intro_en:'Where light touches water, brilliance awakens.\n\nEach drink is shaped with measured clarity: crisp, refined, and quietly expressive.\nA sip that reflects the calm beauty of Abu Dhabi’s mangroves...',
    footer_en:DPRICE_EN},
  sections:[
    {pageTitle:'COLD BEVERAGES',title:'JUICES',style:'list',newPage:true,items:[L('Orange, grapefruit, pineapple, watermelon, apple','35')]},
    {pageTitle:'COLD BEVERAGES',title:'SOFT DRINKS',style:'list',items:[L('Coca-Cola, Sprite, Fanta, Ginger Ale, Tonic','35'),L('Soda water','35'),L('Red Bull','55')]},
    {pageTitle:'COLD BEVERAGES',title:'WATER',style:'list',items:[L('Acqua Panna','38\n48',{desc:'Small\nLarge'}),L('San Pellegrino','38\n48',{desc:'Small\nLarge'})]},
    {pageTitle:'HOT BEVERAGES',title:'SPECIALTY COFFEE',style:'list',newPage:true,items:[L('Brazil:','65',{desc:'chocolate, nutty, smooth body'}),L('Colombia:','65',{desc:'balanced, fruity sweetness, medium body'}),L('Ethiopia:','65',{desc:'floral, chocolatey, medium body'}),L('Peru:','65',{desc:'floral, citrusy & clean finish'})]},
    {pageTitle:'HOT BEVERAGES',title:'CLASSIC COFFEE',style:'list',items:[L('Espresso Single','28'),L('Espresso Double','35'),L('Caffe Americano','38'),L('Caffe Latte','42'),L('Cappuccino','40'),L('Turkish Coffee','35'),L('Flat White','42'),L('Macchiato','35')]},
    {pageTitle:'HOT BEVERAGES',title:'SPECIALTY BEVERAGES',style:'list',newPage:true,items:[L('Hot Chocolate','35'),L('Mocha','40'),L('Spanish Latte','45'),L('Matcha Latte','40')]},
    {pageTitle:'HOT BEVERAGES',title:'CLASSIC TEA',style:'list',items:['Assam English Breakfast Tea','Majestic Earl Grey','Tropical Green','Organic Moroccan Mint','Chamomile Blossoms','Oriental Moments','Organic Darjeeling 2nd Flush'].map(n=>L(n,'50'))},
    {pageTitle:'SPECIALTY TEAS',title:'',style:'feature',newPage:true,items:[drTea(0,'70'),drTea(1,'70'),drTea(2,'80',{breakBefore:true}),drTea(3,'80'),drTea(4,'80',{breakBefore:true})]},
    {pageTitle:'EXCLUSIVE TEAS',title:'',style:'feature',newPage:true,items:[drTea(5,'80'),drTea(6,'90'),drTea(7,'90',{breakBefore:true})]},
    {pageTitle:'NON ALCOHOLIC',title:'COCKTAIL 0%',style:'desc',caps:true,newPage:true,items:[
      L('GINGER','40',{desc:'Lyer’s London Dry, hibiscus, lemon, ginger, ginger ale, fresh mint, lemongrass'}),
      L('LXR SPRITZ','40',{desc:'Lyer’s Italian Orange, strawberry-chamomile homemade infusion, ginger, Martini Dolce 0%, sparkling water'}),
      L('SPICY MANGO MOJITO','40',{desc:'Mango puree, brown sugar, lime, mint, red chili, soda sater'}),
      L('BLACKBERRY DELIGHT','40',{desc:'Blackberry, pineapple, lemon, vanilla, rosemary'})]},
    {pageTitle:'NON ALCOHOLIC',title:'NON-ALCOHOLIC WINE',style:'desc',items:[
      L('Wild Idol White, Muller-Thurgau','540',{desc:'Germany (lychee, elderflower, fresh)'}),
      L('Wild Idol Rose, Muller-Thurgau & Merlot','570',{desc:'Germany (berry, delicate, fresh)'})]},
    {pageTitle:'NON ALCOHOLIC',title:'BEER 0%',style:'list',items:[L('Heineken','50')]},
    {pageTitle:'BEERS',title:'',style:'list',newPage:true,items:['Heineken','Stella Artois','Asahi','Corona','Peroni','Brew Dog IPA','Magners Original'].map(n=>L(n,'55'))},
    {pageTitle:'COCKTAILS',title:'SIGNATURE COCKTAILS',style:'desc',caps:true,newPage:true,items:[
      L('MANGROVE MIST','80',{desc:'Vodka, lime juice, pandan syrup, pineapple juice, coconut water'}),
      L('COFFEE NEGRONI','80',{desc:'Campari, cold brew coffee, sweet red vermouth'})]},
    {pageTitle:'COCKTAILS',title:'CLASSIC COCKTAILS',style:'desc',caps:true,items:[
      L('NEGRONI','70',{desc:'Campari, gin, sweet red vermouth'}),L('OLD FASHIONED','70',{desc:'Bourbon whiskey, sugar syrup, bitters'}),
      L('DAIQUIRI','70',{desc:'Rum, lime juice, sugar syrup'}),L('MARGARITA','70',{desc:'Tequila, triple sec, lime juice'}),
      L('WHISKEY SOUR','70',{desc:'Bourbon whiskey, lemon juice, sugar syrup'}),L('ESPRESSO MARTINI','75',{desc:'Vodka, Kahlua, espresso, sugar syrup'}),
      L('MANHATTAN','75',{desc:'Rye whiskey, red vermouth, Angostura bitters'}),
      L('MOJITO','75',{desc:'White rum, rime juice, mint, sugar syrup',breakBefore:true}),
      L('BLOODY MARY','75',{desc:'Vodka, tomato juice, lemon juice, Worcestershire sauce, tabasco sauce, celery, salt, black pepper'}),
      L('MOSCOW MULE','75',{desc:'Vodka, lime juice, ginger beer'}),
      L('AMARETTO SOUR','80',{desc:'Cask-proof bourbon, amaretto liqueur, lemon juice, sugar syrup, egg white'}),
      L('PEACH BELLINI','80',{desc:'Prosecco, white pulp peach puree'})]},
    {pageTitle:'WINES',title:'CHAMPAGNE BRUT',style:'list',newPage:true,items:[
      L('Moët & Chandon Imperial Brut','179 / 840'),L('Billecart-Salmon Brut Réserve','930'),L('Veuve Clicquot Brut Yellow Label','1,020'),L('Billecart-Salmon Brut Réserve','1,031'),
      L('Dom Pérignon','5,156'),L('Louis Roederer Cristal','7,613'),L('Dom Pérignon Magnum','10,791'),L('Louis Roederer Cristal Magnum','11,450')]},
    {pageTitle:'WINES',title:'CHAMPAGNE ROSÉ',style:'list',items:[
      L('Moët & Chandon Rosé Impérial','1,080'),L('Billecart-Salmon Brut Rosé','1,200'),L('Dom Pérignon Rosé','8,393'),L('Louis Roederer Cristal Rosé','11,330'),L('Louis Roederer Cristal Rosé Magnum','17,865'),L('Dom Pérignon Rosé Magnum','18,854')]},
    {pageTitle:'WINES',title:'PROSECCO',style:'list',newPage:true,items:[L('Zonin 1821 Prosecco Brut DOC','70 / 330'),L('Prosecco DOC, Valdo Millesimato','480')]},
    {pageTitle:'WINES',title:'ROSÉ WINE',style:'desc',newPage:true,items:[
      DS('FRANCE'),
      L('M de Minuty, Côtes de Provence','396',{desc:'Red-berry notes dominate the wine’s bouquet. The crisp, juicy fruits are round and appetizing on the palate.'}),
      L('Château D’Esclans “Whispering Angel”, Côtes de Provence','552',{desc:'Fresh peach and strawberry notes. Pale salmon in colour, this is delicate and fresh with plenty of crisp strawberry fruit.'}),
      L('Château D’Esclans “Rock Angel”, Côtes de Provence','732',{desc:'A burst of refreshing aromas, where ripe strawberries and peach subtly blend with exotic hints such as mango.'}),
      DS('USA'),
      L('Barefoot Pink Moscato','46 / 216',{desc:'Mandarin orange and sweet jasmine. It has subtle flavors of cherry, raspberry, and pomegranate.'})]},
    {pageTitle:'WINES',title:'WHITE WINE',style:'desc',newPage:true,items:[
      DS('ITALY'),
      L('Emotivo Pinot Grigio, IGT','51 / 240',{desc:'A delicate pinot grigio with notes of white peach and citrus, offering a refreshing and elegant taste.'}),
      L('Gavi, La Luciana, Araldica','74 / 348',{desc:'Medium bodied wine with balanced flavors of citrus and green fruit with a hint of minerality.'}),
      L('St Michael-Eppan Chardonnay DOC','432',{desc:'Wonderfully juicy and inviting, with long-lasting persistence.'}),
      L('Cervaro della Sala, Antinori','1,919',{desc:'A lovely golden chardonnay. Notes of yeast, butter, yellow apple, vanilla, pastry, cream.'}),
      DS('FRANCE','',{breakBefore:true}),
      L('Plaisir de Vigne Muscadet AOC, Sauvion Et Fils','66 / 312',{desc:'Bright straw pale colour. Fresh aroma of apricots, lemons, hints of pear and spices.'}),
      L('Pascal Jolivet “Attitude”, Sauvignon Blanc','110 / 516',{desc:'Nice freshness on the palate, a clean attack, delicate lime, citrus, green apple and kiwi.'}),
      L('Petit Chablis, Laroche','660',{desc:'Clear lemon colour. Fruity, fragrant nose. Lively and mineral accent on layers of white fruit. Fresh finish.'}),
      L('Chablis, Laroche','756',{desc:'Pale-lemon, medium pronounced notes of unripe stone fruit, lemon and wet stone on the nose.'}),
      L('Pouilly-Fuissé, Louis Latour','1,283',{desc:'Bright and pale yellow color, with a floral nose of acacia and honeysuckle.'}),
      L('Puligny Montrachet, Domaine Joseph Drouhin','2,662',{desc:'Delicate and aromatic with fresh flowers and al dente apples.'}),
      DS('GERMANY','',{breakBefore:true}),
      L('Riesling ‘Dr L’ QbA, Dr. Loosen','432',{desc:'Aromas of plush red peach, cherry and white currant flavors that are supported by zesty acidity. Long and creamy on the finish.'}),
      DS('LEBANON'),
      L('Château Ksara, “Blanc de l’Observatoire”','372',{desc:'Elegant character of citrus, stone fruit and wildflowers.'}),
      L('Château Ksara, Blanc de Blancs','504',{desc:'Balanced, with crisp acidity, lush fruit and a rounded body.'}),
      DS('NEW ZEALAND'),
      L('Oyster Bay, Chardonnay','402',{desc:'Elegant fragrant white peach, vibrant citrus and a delightful creamy texture.'}),
      L('Sauvignon Blanc, Matua','89 / 420',{desc:'The lively nose shows tropical and citrus fruits with subtle herbaceous characters.'}),
      DS('SOUTH AFRICA','',{breakBefore:true}),
      L('Ken Forrester Petit Chenin Blanc','64 / 300',{desc:'Pear drop flavours. Earlier picked freshness shows on palate with crunchy green apple and grapefruit flavours.'}),
      L('Chardonnay, Meerlust','863',{desc:'Nose with citrus fruit, green apple and cream flavours, becoming creamy & nutty with a bouquet of marzipan, halva and oatmeal.'}),
      DS('USA'),
      L('Château St Michelle, Riesling','372',{desc:'Semi sweet with raisin and blackberry notes.'}),
      L('Riesling Kung Fu Girl, Charles Smith','539',{desc:'White stone fruit, white peach, apricot, cool and delicious.'}),
      L('Chardonnay, Vintner’s Reserve, Kendall Jackson','677',{desc:'Tropical flavors such as mango and pineapple dance with aromas of peach, apple and pear.'})]},
    {pageTitle:'WINES',title:'RED WINE',style:'desc',newPage:true,items:[
      DS('ITALY'),
      L('Nero d’Avola, Ca’ di Ponti','64 / 300',{desc:'Medium-bodied, spicy red with aromas of ripe plum and black cherry.'}),
      L('Barbera d’Asti Vigna Vecchia, Cossetti','79 / 372',{desc:'Black Cherry, pepper, chocolate and liquorice.'}),
      L('Castello di Albola Chianti Classico DOCG','444',{desc:'Elegant, with delicate scents of violets, Well-balanced and dry, with good structure and a velvety texture.'}),
      L('Le Difese 3rd Wine of Sassicaia - Tenuta San Guido','624',{desc:'Juicy red wine with aromas of red fruits, currants, blueberries and cherries, accompanied by spicy notes and tobacco.'}),
      L('Le Volte Dell Ornellaia, Toscana IGT','839',{desc:'Displays lively red fruit aromas alongside light spiciness.'}),
      L('Amarone Valpolicella Classico, Luigi Righetti','935',{desc:'Dried fruit, bark, dried mushrooms and sweet spices on the nose.'}),
      DS('ITALY','',{breakBefore:true}),
      L('Brunello di Montalcino ‘Poggio alle Mura’, Banfi','2,158',{desc:'The red color is very intense. The bouquet is sweet and complex, with notes of blackberry jam, tobacco and vanilla.'}),
      L('Barbaresco DOP, Gaja','5,395',{desc:'Complex aroma with racy violet, rose, black cherry, and dark licorice complemented by notes of white pepper, cloves, and soft leather.'}),
      L('Tignanello, Antinori','9,951',{desc:'Aromas of ripe cherry, plum, and blackberry, intertwined with notes of violet, spice, and subtle hints of tobacco and oak.'}),
      L('Sassicaia, Tenuta San Guido','10,431',{desc:'Red currant, blackberry, and cedar, with hints of iron and dried herbs.'}),
      L('Masseto, Toscana IGT','17,745',{desc:'Intense ruby in colour. Fully ripe fruitiness with great freshness and complexity, delicate notes of vanilla and cocoa.'}),
      DS('FRANCE','',{breakBefore:true}),
      L('Michel Chapoutier “Bila-Haut” Rouge, Côtes de Roussillon Villages','65 / 306',{desc:'Aromas of black cherry. This wine is well-structured with the warm and savage of soils of the Roussillon area.'}),
      L('Baron Philippe de Rothschild Bordeaux','396',{desc:'Plum, mulberry, black cherry and blueberry, rounded off by other fruity nuances.'}),
      L('Pascal Jolivet “Attitude”, Pinot Noir','109 / 514',{desc:'Crushed red berries—strawberry and raspberry—lead to a vibrant finish with a hint of white pepper spice.'}),
      L('Côtes du Rhône Rouge, E.Guigal','588',{desc:'Fresh fruits with red berries and spices. Full, round and racy. Rounded and smooth tannins.'}),
      L('Frank Phélan (Second Vin)','1,198',{desc:'Elegant wine with the right extraction. It unfurls aroma of mocha, spices and dark fruit.'}),
      L('Alter Ego de Palmer (Second Vin), Château Palmer','2,877',{desc:'Intense aromas of blackcurrants, cedar and ripe tobacco with hints of violets, following through to a full-bodied palate with extremely refined tannins.'}),
      DS('FRANCE','',{breakBefore:true}),
      L('Château Rauzan-Ségla, 2ème Grand Cru Classé','4,077'),
      DS('LEBANON'),
      L('Prieuré, Château Ksara','396',{desc:'Bright and intense ruby-red wine, with an exotic, fruity aroma with notes of liquorice and spice.'}),
      L('Cabernet Sauvignon, Château Ksara','743',{desc:'Raspberries, blackcurrant and a suggestion vanilla, spice and leather.'}),
      DS('SPAIN'),
      L('Viña Palomeras Tempranillo, Rioja Vega','59 / 279',{desc:'Red currant fresh fruit, touch of vanilla, oak.'}),
      L('Marqués de Riscal “Reserva”, Rioja DOC','570',{desc:'Expressive aromas on the nose with notes of liquorice, cinnamon, black pepper and fruit.'}),
      DS('AUSTRALIA','',{breakBefore:true}),
      L('Penfolds, Koonunga Hill Shiraz / Cabernet','94 / 444',{desc:'Dark sour-cherry, blackberry, rhubarb fruits abound. aromas of malt/oats/wheat germ with a green olive and pomegranate.'}),
      L('Shiraz, Y Series, Yalumba','468',{desc:'Intense aromas of ripe blackberry, blood plum, chocolate and licorice.'}),
      L('Bush Vine Grenache, Samuel’s Collection, Yalumba','600',{desc:'Complexly spiced with a wild cherry spin. It radiates red fruit purity.'}),
      L('Penfolds, Bin 407 Cabernet Sauvignon','1,858',{desc:'Cassis, black cherry, and mulberry, complemented by notes of cedar, graphite, and subtle mint.'}),
      DS('ARGENTINA','',{breakBefore:true}),
      L('Santa Julia, Cabernet Sauvignon','59 / 276',{desc:'Black cherries, prunes, gooseberries, blackberries and spices.'}),
      L('Santa Julia, Malbec','59 / 276',{desc:'Varietal notes of ripe fruits, figs, prunes, jam and raisins.'}),
      L('Malbec, La Linda, Bodega Luigi Bosca','372',{desc:'Red fruits, like cherries and blackberries, layered with spicy and delicate floral notes.'}),
      L('Zuccardi Poligonos Altamira Cabernet Franc','839',{desc:'Fresh notes of herbs, flowers and red fruits. Soft on the palate, with stable acidity, fine tannin structure and a long aftertaste.'}),
      L('Clos de Los Siete','839',{desc:'Dense, dark-berry fruits, and notes of chocolate and spice make this iconic Malbec, Cabernet Sauvignon, Merlot and Syrah blend an intriguing and exceptional wine.'}),
      DS('SOUTH AFRICA','',{breakBefore:true}),
      L('Ken Forrester Petit Cabernet-Merlot','276',{desc:'An elegant example of a fruit forward, unwooded Merlot that show’s character of raspberry, black cherry and plums.'}),
      L('Ken Forrester Renegade Shiraz-Grenache','504',{desc:'Hint of Grenache’s earthy rusticity and Shiraz’s noble spice with hints of nutmeg and salty black olive on the finish.'}),
      L('Waterkloof Circumstance Cabernet Sauvignon','623',{desc:'Notes of red fruit and pencil shavings. The palate shows great focus with refined tannins.'}),
      L('Boekenhoutskloof “Chocolate Block”','791',{desc:'It shows massive floral perfume with underlying redcurrant, cedar, black pepper, coriander spice and hints of Turkish Delight.'}),
      L('Pinot Noir, Meerlust','971',{desc:'Perfume on the nose with red berry fruit, musk, wild mushrooms and hints of savoury richness and spice and a clean vibrant minerality.'}),
      L('Paul Sauer, Kanonkop','1,559',{desc:'Aromas of blackcurrant, ripe cherry, and plum, complemented by delicate floral notes and hints of cedar, spice, and fine vanilla.'}),
      DS('USA','',{breakBefore:true}),
      L('Dark Horse, Cabernet Sauvignon','59 / 276',{desc:'Dark fruit aromas with notes of toasted oak and a smooth finish.'}),
      L('Kenwood Pinot Noir','599',{desc:'Fruit aromas of blackcurrant and raspberry join with fragrant notes of nutmeg, thyme and lavender.'}),
      L('Merlot, Murphy Goode','659',{desc:'Dark fruit aromas and flavors with barbecue, burgers and roasted veggies in a jam session not soon forgotten.'}),
      L('Pinot Noir, La Crema','983',{desc:'Aromas of red fruit and mocha in this silky red wine open to flavors of red cherry, blood orange, dark berry fruit and spice.'}),
      L('Opus One','10,791',{desc:'Black plum, blueberry, and black currant, enhanced by floral hints of dried rose petals and mineral undertones.'})]},
    {pageTitle:'WINES',title:'DESSERT WINE',style:'desc',newPage:true,items:[
      DS('FRANCE'),
      L('Château Armajan des Ormes, Sauterne','576',{desc:'Caramel apple, honeyed ripe pear, crème brûlée are woven through the heady palate, with the sweetness tempered by steady streaming acidity, finishing with a cool stoniness and lingering honeysuckle.'}),
      L('Muscat de Beaumes-de-Venise, Domaine de Coyeux','659',{desc:'Notes of candied citrus and acacia honey, accompanied by a subtle oxidative touch of fresh walnuts.'}),
      DS('ITALY'),
      L('Kabir, Donnafugata','779',{desc:'Aromas of citrus fruit, lemon blossom, and honey, this wine is a true pleasure for the sense.'})]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'BRANDY, COGNAC & ARMAGNAC',style:'list',newPage:true,items:[
      L('Hennessy V.S','66 / 1,320'),L('Hennessy V.S.O.P','99 / 2,310'),L('Hennessy X.O','285 / 6,500'),L('Hennessy Paradis','1,125 / 24,000'),L('Remy Martin V.S.O.P','127 / 2,800'),L('Remy Martin X.O','255 / 5,250')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'SINGLE MALT SCOTCH WHISKY',style:'list',newPage:true,items:[
      L('Macallan 12 Years','99 / 2,200'),L('Macallan 12 Years Sherry Cask','125 / 2,750'),L('Macallan 15 Years','230 / 4,700'),L('Macallan 18 Years','395 / 7,950'),L('Macallan Rare Cask','336 / 6,370'),
      L('Glenfiddich 12 Years','88 / 1,950'),L('Glenfiddich 15 Years','99 / 2,200'),L('Glenfiddich 18 Years','149 / 3,250'),L('Glenfiddich 21 Years','182 / 4,200'),L('Glenfiddich Grand Cru 23 Years','395 / 8,850'),
      L('Glenfiddich Grande Couronne 26 Years','680 / 15,000'),L('Glenmorangie Original','88 / 2,000'),L('Glenmorangie 18 Years','198 / 4,600'),
      L('Oban 14 Years','158 / 3,650',{breakBefore:true}),L('Ardberg 10 Years',''),L('Bowmore 12 Years','83 / 1,705'),L('Talisker 10 Years','105 / 2,530'),L('Glenlivet 12 Years','72 / 1,540'),
      L('Laphroaig Quarter Cask','88 / 1,900'),L('Lagavulin 16 Years','185 / 3,850'),L('Dalmore 12 Years','83 / 1,705'),L('Dalmore Cigar Malt','120 / 2,640'),L('Auchentoshan 12 Years','83 / 1,705')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'BLENDED SCOTCH WHISKY',style:'list',newPage:true,items:[
      L('Ballantine’s','55 / 1,250'),L('Chivas Regal 12 Years','66 / 1,320'),L('Chivas Extra','77 / 1,650'),L('Chivas Regal 18 Years','122 / 2,750'),L('Chivas Regal Royal Salute','215 / 4,950'),L('Chivas Regal Ultis','325 / 7,700'),
      L('Monkey Shoulder','77 / 1,760'),L('Johnnie Walker Black Label','77 / 1,760'),L('Johnnie Walker Double Black Label','83 / 1,800'),L('Johnnie Walker Gold Label','116 / 2,860'),L('Johnnie Walker 18 Years','138 / 3,410'),L('Johnnie Walker Blue Label','335 / 7,750')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'IRISH WHISKEY',style:'list',newPage:true,items:[L('Jameson Irish Whiskey','55 / 1,100'),L('Jameson Irish Caskmates','72 / 1,430'),L('Bushmills Original','55 / 1,100'),L('Redbreast 12 Years','115 / 2,400')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'AMERICAN WHISKEY',style:'list',items:[
      L('Jack Daniel’s Old No.7','72 / 1,760'),L('Gentleman Jack','80 / 1,870'),L('Jack Daniel’s Single Barrel','116 / 2,860'),L('Jack Daniel’s Sinatra Select','132 / 4,400'),
      L('Bulleit Woodford Reserve','60 / 1,485'),L('Maker’s Mark','77 / 1,870'),L('Maker’s Mark 46','94 / 1,900'),L('Four Roses Single Barrel','66 / 1,320')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'VODKA',style:'list',newPage:true,items:[
      L('Belvedere','88 / 2,200'),L('Grey Goose','88 / 2,200'),L('Ketel One','60 / 1,300'),L('42 Below','66 / 1,500'),L('Absolut','55 / 1,250'),L('Beluga Gold','182 / 3,740'),L('Beluga Noble','110 / 2,550'),L('Elit Stolichnaya','83 / 1,760'),L('Russian Standard Imperial','94 / 2,090')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'GIN',style:'list',newPage:true,items:[
      L('Tanqueray','60 / 1,300'),L('Tanqueray 10','77 / 1,870'),L('The Botanist','83 / 1,900'),L('Gin Mare','77 / 1,650'),L('Hendrick’s','77 / 1,650'),L('Monkey 47','105 / 1,700'),L('Monkey 47 Barrel Cut','110 / 1,800'),
      L('London Dry No.3','77 / 1,650'),L('Plymouth','72 / 1,650'),L('Bombay Sapphire','55 / 1,250'),L('Bulldog','60 / 1,400'),L('Malfy Limone','66 / 1,540'),L('Malfy Arancia','66 / 1,540'),L('Malfy Originale','66 / 1,540'),L('Sipsmith London Dry','65 / 1,485')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'RUM & CACHACA',style:'list',newPage:true,items:[
      L('Bacardi Superior','55 / 1,250'),L('Bacardi Gold','60 / 1,400'),L('Bacardi Black','60 / 1,400'),L('Bacardi 4 Years','65 / 1,480'),L('Bacardi 8 Years','72 / 1,650'),L('Zacapa 23 Years','110 / 2,750'),
      L('Gosling Black Seal','60 / 1,500'),L('Diplomatico Reserva Exclusiva','95 / 1,990'),L('Havana 3 Years','55 / 1,250'),L('Havana 7 Years','72 / 1,788'),L('Cachaca 51','55 / 1,250')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'TEQUILA & MEZCAL',style:'list',newPage:true,items:[
      L('El Jimador Blanco','60 / 1,300'),L('El Jimador Reposado','60 / 1,300'),L('Patron Silver','77 / 1,600'),L('Patron Reposado','105 / 1,200'),L('Patron Anejo','120 / 2,700'),L('Gran Patron Platinum','174 / 4,000'),
      L('Don Julio Blanco','94 / 2,310'),L('Don Julio Reposado','105 / 2,530'),L('Don Julio Anejo','116 / 2,860'),L('Don Julio 1942','340 / 8,150'),L('Jose Cuervo Reserva De La Familia','160 / 3,300'),L('Clase Azul Reposado','259 / 5,720'),L('Clase Azul Mezcal','405 / 8,995')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'APERITIF & DIGESTIF',style:'list',newPage:true,items:[
      L('Carpano Antica Formula','83 / 1,870'),L('Martini Bianco','50 / 1,905'),L('Lillet Blanc','50 / 1,905'),L('Campari','50 / 1,905'),L('Fernet Branca','46 / 1,045'),L('Jagermeister','55 / 1,210'),L('Cynar','50 / 1,905'),
      L('Pernod','50 / 1,905'),L('Ricard','50 / 1,905'),L('Sambuca Molinari','50 / 1,905'),L('Amaretto Disaronno','44 / 990'),L('Limoncello','72 / 1,320'),L('Cointreau','55 / 1,210'),L('St Germain','60 / 1,380')]}
  ]}
});
OUTLETS.push({id:'diya',name:'Diya',sub:'Lobby Bar',logoImg:'__DIYA_LOGO__',color:'#2B2B2A',menus:['diya-food','diya-drinks','diya-tea']});
