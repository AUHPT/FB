/* ================= SEED DATA (transcribed from the Lilia InDesign files) ================= */
const FOOT_EN='All produce is prepared in an area where allergens are present. For those with allergies, intolerances, and special dietary requirements who may wish to know about the ingredients used please ask a member of the Management Team.  All prices are in UAE Dirham and are inclusive of all applicable service charges and taxes.';
const FOOT_AR='يُرجى الملاحظة أن جميع الأصناف قد تُحضَّر في بيئة تحتوي على مسبّبات للحساسيّة.  للذين لديهم حساسيّات أو متطلّبات غذائية خاصة، يُرجى استشارة فريق الإدارة.\nجميع الأسعار بالدرهم الإماراتي وتشمل الضرائب والرسوم المطبّقة.';

function I(name,name_ar,desc,desc_ar,price,extra){return Object.assign({type:'item',name:name||'',name_ar:name_ar||'',desc:desc||'',desc_ar:desc_ar||'',price:price||''},extra||{});}
function SH(name,name_ar,extra){return Object.assign({type:'sub',name:name||'',name_ar:name_ar||''},extra||{});}
function BI(name,name_ar,price,inline,sub){return {type:'item',name,name_ar,price:price||'',inline:!!inline,sub:sub||''};}
function D(name,price,desc,extra){return Object.assign({type:'item',name,desc:desc||'',price:price||''},extra||{});}

const SEED_MENUS={
/* ---------------------------------------------------------------- BREAKFAST */
'lilia-breakfast':{
  template:'breakfast', outlet:'lilia', name:'Breakfast', name_ar:'الإفطار',
  settings:{cover:true,coverTitle:'BREAKFAST',coverTitle_ar:'الإفطار',
    foodTitle:'À LA CARTE',foodTitle_ar:'قائمة الطعام',foodNote:'130 AED',
    bevTitle:'BEVERAGES',bevTitle_ar:'مشروبات',
    footer_en:FOOT_EN,footer_ar:FOOT_AR,blankBacks:false},
  sections:[
    {kind:'food',title:'LIGHT & HEALTHY',title_ar:'خفيف وصحي',items:[
      I('Acai bowl, granola, banana, berrries, peanut butter, cocoa nibs','وعاء أساي، جرانولا، موز، توت، زبدة فول سوداني، حبيبات كاكاو'),
      I('Bircher muesli Greek yoghurt, chia seeds, apples, dates, pecan nuts','موسلي بيرشر، زبادي يوناني، بذور الشيا، تفاح، تمر، جوز البقان'),
      I('Toast, chilli, feta, pomegranate, coriander','توست، فلفل حار، جبنة فيتا، رمان، كزبرة'),
      I('Tartine of figs, burrata, caramelized walnuts','تارتين تين، جبنة بوراتا، جوز مكرمل')]},
    {kind:'food',title:'EGGS',title_ar:'بيض',items:[
      I('2 eggs cooked your way – scrambled, poached, fried, boiled','بيضتان حسب رغبتك - مخفوقتان، مسلوقتان من غير قشر، مقليتان، مسلوقتان'),
      I('Omelette with your choice of fillings: tomato, onion, turkey ham, emmental cheese, spinach','أومليت مع اختيارك من الإضافات: طماطم، بصل، ديك رومي مدخّن، جبنة إمنتال، سبانخ'),
      I('Shakshouka, tomatoes, bell peppers, paprika','شكشوكة، طماطم، فلفل رومي، بابريكا'),
      I('Baked eggs Florentine, cream cheese, spinach, parsley','بيض فلورنتين فخبوز، جبنة الكريما، سبانخ، بقدونس'),
      I('Benedict, turkey ham, hollandaise','بينيديكت، ديك رومي، صلصة هولنديز'),
      I('Royale, smoked salmon, hollandaise','رويال، سلمون مدخن، صلصة هولنديز'),
      I('Turkish eggs, labneh, garlic, dill, cayenne','بيض تركي، لبنة، ثوم، شبت، فلفل كايين')]},
    {kind:'food',title:'SWEET',title_ar:'الحلويات',items:[
      I('Porridge, medjool dates, banana, pistachio','عصيدة، تمر مجدول، موز، فستق'),
      I('Babka french toast, vanilla mascarpone, local berries','بابكا فرنش توست، جبنة ماسكاربوني فانيليا، توت محلي'),
      I('American style pancakes, Nutella or maple syrup','فطائر على الطريقة الأمريكية، نوتيلا أو شراب القيقب')]},
    {kind:'band',style:'flank',title:'COLD',title_ar:'مشروبات باردة',newPage:true,cols:[
      {head:'JUICE',head_ar:'عصير',items:[BI('Orange, Grapefruit, Pineapple, Watermelon, Apple','برتقال، جريب فروت، أناناس، بطيخ، تفاح','35')]},
      {head:'WATER',head_ar:'ماء',items:[BI('Acqua Panna','أكوا بانا','38 / 48',true,'Small صغير / Large كبير'),BI('San Pellegrino','سان بيليجرينو','38 / 48',true,'Small صغير / Large كبير')]}]},
    {kind:'band',style:'flank',title:'HOT',title_ar:'ساخن',cols:[
      {head:'COFFEE',head_ar:'قهوة',items:[BI('Espresso Single','إسبريسو فردي','28',true),BI('Espresso Double','إسبريسو مزدوج','35',true),BI('Caffe Americano','قهوة أمريكانو','38',true),BI('Caffe Latte','قهوة لاتيه','42',true),BI('Cappuccino','كابتشينو','40',true),BI('Turkish Coffee','قهوة تركية','35',true),BI('Flat White','فلات وايت','42',true),BI('Macchiato','ماكياتو','35',true)]},
      {head:'TEA',head_ar:'شاي',items:[BI('Assam English Breakfast Tea','شاي أسّام الفطور الإنجليزي','50'),BI('Majestic Earl Grey','إيرل جراي ماجيستيك','50'),BI('Jasmine Mao Jian','ياسمين ماو جيان','50'),BI('Organic Mint Duo','ثنائي النعناع العضوي','50'),BI('Rose White','روز وايت','50',true),BI('Chamomile','بابونج','50',true),BI('Masala Spice Chai','شاي ماسالا سبايس','50'),BI('Organic Spring Mao Fen','ماو فين الربيعي العضوي','50')]}]},
    {kind:'band',style:'ruled',title:'SPECIAL BEVERAGES',title_ar:'مشروب ساخن مميز',cols:[
      {head:'',head_ar:'',items:[BI('Hot Chocolate','شوكولاتة ساخنة','35',true),BI('Mocha','موكا','40',true)]},
      {head:'',head_ar:'',items:[BI('Spanish Latte','لاتيه إسباني','45',true),BI('Matcha Latte','لاتيه ماتشا','40',true)]}]}
  ]},
/* ---------------------------------------------------------------- LUNCH & DINNER */
'lilia-ld':{
  template:'ld', outlet:'lilia', name:'Lunch & Dinner', name_ar:'الغداء والعشاء',
  settings:{intro:true,blankAfterIntro:true,title:'LUNCH & DINNER',title_ar:'الغداء والعشاء',currency:'AED',
    intro_en:'Lilia draws from a quiet sense of place, guided by a deep connection to the land, its people, and the art of generous hospitality. Rooted in this setting, the all-day dining experience unfolds with natural ease, offering a welcoming rhythm from morning through evening. Each ingredient is treated as a familiar presence, grounded yet open to new expression.\n\nOur cooking reflects what grows around us, guided by seasonality and thoughtful sourcing. Ingredients are selected at their peak and drawn from trusted local partners, handled with care to honour both the land and the hands that tend it. Comfort and memory shape the way taste comes together.\n\nFrom morning until night, our table is open, welcoming guests with flavours that come from our garden to our kitchen. Each dish is served with effortless ease, warmth and generosity, crafted to feel a true sense of belonging.',
    intro_ar:'أضف الترجمة العربية هنا - Add Arabic translation here.',
    footer_en:FOOT_EN,footer_ar:FOOT_AR},
  sections:[
    {title:'COLD MEZZE',title_ar:'المقبلات الباردة',newPage:true,items:[
      I('Rotisserie beetroot','شمندر مشوي','Labneh, pistachio','لبنة، فستق','65'),
      I('Wagyu beef pastrami','بسترمة من لحم واجيو','Pickled onions, Dijon mustard','بصل مخلل، خردل ديجون','110'),
      I('Burrata','بوراتا','Smoked butternut squash, pomegranate, fresh herbs','قرع عسلي مُدخَّن، رمان، أعشاب طازجة','80'),
      I('Basil hummus','حمص بالريحان','Lemon, chilli oil, fried chickpeas','ليمون، زيت فلفل حار، حمص مقلي','55'),
      I('Baba ghanoush','بابا غنوج','Grilled eggplant, dukkah','باذنجان مشوي، دقة','50'),
      I('Dibba bay oysters','محار دبا باي','Mignonette','مينيونيت','30')]},
    {title:'SALADS',title_ar:'السلطات',items:[
      I('Taboulleh','تبولة','Bulgar, tomatoes, fresh herbs, lemon','برغل، طماطم، أعشاب طازجة، ليمون','55'),
      I('Levantine fattoush','فتوش ليفانتي','Flatbread croutons, romaine lettuce, red chicory, radish, sumac, citrus, pomegranate molasses','خبز محمص، خس روماني، هندباء حمراء، فجل، سماق، حمضيات، دبس رمان','60'),
      I('Ponzu Lobster','لوبستر بونزو','Mango, avocado, spinach, ponzu dressing','مانجو، أفوكادو، سبانخ، صلصة البونزو','285'),
      I('Greek Salad','سلطة يونانية','Barrel aged feta, extra virgin olive oil','فيتا مُعتّقة، زيت زيتون بكر ممتاز','95')]},
    {title:'HOT MEZZE',title_ar:'المقبلات الساخنة',newPage:true,items:[
      I('Calamari','كالاماري','Rose harrisa, coriander emulsion','هريسة الورد، مستحلب الكزبرة','80'),
      I('Chicken wings','أجنحة دجاج','Aleppo pepper, garlic sauce','فلفل حلبي، صلصة الثوم','90'),
      I('Grilled Octopus','أخطبوط مشوي','Romesco sauce, toasted pine nuts, basil oil','صلصة روميسكو، صنوبر محمص، زيت الريحان','135'),
      I('Asparagus','هليون','Hazelnut crust, saffron yoghurt','بندق مقرمش، زبادي بالزعفران','65'),
      I('Lamb Kofta','كفتة غنم','Pickles, green tomato chutney','مخلل، صلصة طماطم خضراء','95'),
      I('Grilled halloumi','حلومي مشوي','Hot za’atar honey','عسل زعتر حار','75')]},
    {title:'GRILL',title_ar:'مشاوي',note:'(COOKED OVER EMBERS)',note_ar:'(مطبوخة على الجمر)',newPage:true,items:[
      SH('From the land','من الأرض'),
      I('Wagyu tenderloin','شريحة لحم واغيو','Peppercorn sauce','صلصة الفلفل','352'),
      I('Prime angus ribeye','ريب آي أنغوس برايم','Za’atar hollandaise','زعتر هولنديز','275'),
      I('Chicken taouk','شيش طاووق','Grilled vegetables, chimmichuri','خضار مشوية، صلصة تشيميتشوري','155'),
      I('Lamb kebab','كباب غنم','Homemade harrisa','هريسة منزلية','175'),
      I('Stockyard Tomahawk','توماهوك ستوك يارد','Peppercorn sauce & za’atar hollandaise','صلصة الفلفل و الهولنديز هولنديز بالزعتر','950'),
      SH('From the sea','من البحر'),
      I('Canadian lobster','لوبستر كندي','Garlic & herb butter','زبدة الثوم والأعشاب','(½) 265   (whole) 475'),
      I('Fish of the day','سمك اليوم','Lemon & caper butter sauce','صوص زبدة بالليمون والكيبر','Market Price'),
      I('Grand seafood platter','طبق مأكولات بحرية فاخر','Lobster, prawns, king crab, seabass','لوبستر، روبيان، كينغ كراب، قاروس','495\n(per person)')]},
    {title:'MAINS',title_ar:'الأطباق الرئيسية',newPage:true,items:[
      I('Manti, king crab','مانتي، كينغ كراب','Preserved lemon, saffron & chili butter','ليمون محفوظ، زعفران وزبدة فلفل حار','280'),
      I('Jumbo tiger prawns','روبيان جامبو (تايغر)','Pil pil','بيل بيل','225'),
      I('Truffle freekah','فريكة الكمأة','Wild mushrooms, parsley, asparagus – truffle shaved table side','فطر بري، بقدونس، هليون - برش الترافل مباشرة على الطاولة','125'),
      I('Lamb shank machboos','مجبوس لحم غنم','Raisins, almonds, coriander','زبيب، لوز، كزبرة','165'),
      I('Smoked angus short rib','شورت ريب أنغوس مُدخَّن','Carrots cooked in beef fat','جزر مطهو بدهن اللحم','185'),
      I('Imam bayildi','إمام بايلدي','Cauliflower couscous, oregano','كسكس القرنبيط، زعتر','95')]},
    {title:'FLAT BREADS',title_ar:'الخبز المسطح',items:[
      I('Buffalo mozzarella','موزاريلا بافالو','Heritage tomato, zhoug, bresaola','طماطم تقليدية، صلصة زعوق، بريزاولا','85'),
      I('Wild mushrooms','فطر بري','Ricotta, black truffle','ريكوتا، كمأة سوداء','95'),
      I('Arayes','عرايس','Minced meat or cheese & za’atar','لحم مفروم أو جبن وزعتر','65')]},
    {title:'SIDES',title_ar:'الاطباق الجانبية',newPage:true,items:[
      I('Baby potatoes, truffle butter','بطاطا صغيرة، زبدة الكمأة','','','45'),
      I('Grilled Mediterranean vegetables','خضار مشوية على الطريقة المتوسطية','','','40'),
      I('Cinnamon rice, mint, pine nuts','أرز بالقرفة، نعناع، صنوبر','','','35'),
      I('Triple cooked chips, bernaise','بطاطا ثلاثية الطهي، صوص بيرنيز','','','50'),
      I('Broccolini cooked over coals, lemon, chilli','بروكوليني على الفحم، ليمون، فلفل حار','','','45'),
      I('Creamed wild mushrooms, za’atar leaves','فطر بري بالكريمة، أوراق الزعتر','','','45'),
      I('Carrots cooked in beef fat','جزر مطهوّ بدهن اللحم','','','40'),
      I('Pearl cous cous, apricots, almonds, sumac','مغربية، مشمش، لوز، سماق','','','35')]},
    {title:'DESSERTS',title_ar:'الحلويات',newPage:true,items:[
      I('Mahalabiya','مهلبية','Pistachio cake, strawberry, wild flower honey','كيك فستق حلبي، فراولة، وعسل الزهور البرية','50'),
      I('Apple tartin','تارتان التفاح','Fig leaf ice cream – to share','آيس كريم بورق التين - للمشاركة','80'),
      I('Rose baba','روز بابا','Turkish delight, matcha cream, raspberry','راحة الحلقوم، كريمة الماتشا، توت العليق','50'),
      I('Valrhona chocolate rocher','روشيه شوكولاتة ڤالرهونا','Hazelnut, salted caramel','بندق، كراميل مملح','65'),
      I('Sticky toffee date pudding','بودينغ التمر بالتوفي الساخن','Vanilla ice cream, hot toffee sauce','آيس كريم فانيليا مع صوص التوفي الساخن','50'),
      I('Baked Labneh cheesecake basque style','تشيزكيك اللبنة المخبوزة على الطريقة الباسكية','','','50'),
      I('Fresh fruits – served over ice','فواكه طازجة - تُقدم مع الثلج','','','55')]}
  ]},
/* ---------------------------------------------------------------- DRINKS */
'lilia-drinks':{
  template:'drinks', outlet:'lilia', name:'Drinks', name_ar:'المشروبات',
  settings:{cover:true,title:'DRINKS',
    intro:'In Lilia’s world, comfort comes first.\n\nDrinks are crafted with the same warmth as the kitchen, rounded in flavour, aromatic, and effortlessly pleasant. Each sip carries a quiet familiarity, like a memory returning in gentle form.\n\nA tribute to the soft spirit of the UAE, and to the stories that season every moment.',
    footer_en:'All prices are in UAE Dirham and are inclusive of all applicable service charges and taxes.'},
  sections:[
    {pageTitle:'COLD BEVERAGES',title:'JUICE',style:'list',spacing:'compact',newPage:true,items:[D('Orange, Apple, Grapefruit,\nPineapple, Watermelon','35')]},
    {pageTitle:'COLD BEVERAGES',title:'SOFT DRINKS',style:'list',spacing:'compact',items:[D('Coca- Cola, Sprite, Fanta, Ginger Ale, Tonic','35'),D('Soda Water','35'),D('Red Bull','55')]},
    {pageTitle:'COLD BEVERAGES',title:'WATER',style:'list',spacing:'compact',items:[D('Acqua Panna (Small / Large)','38 / 48'),D('San Pellegrino (Small / Large)','38 / 48')]},
    {pageTitle:'HOT BEVERAGES',title:'CLASSIC COFFEE',style:'list',spacing:'compact',newPage:true,items:[D('Espresso Single','28'),D('Espresso Double','35'),D('Caffe’ Americano','38'),D('Caffe’ Latte','42'),D('Cappuccino','40'),D('Turkish Coffee','35'),D('Flat White','42'),D('Macchiato','35')]},
    {pageTitle:'HOT BEVERAGES',title:'SPECIALTY BEVERAGES',style:'list',spacing:'compact',items:[D('Hot Chocolate','35'),D('Mocha','40'),D('Spanish Latte','45'),D('Matcha Latte','40')]},
    {pageTitle:'HOT BEVERAGES',title:'CLASSIC TEA',style:'list',spacing:'compact',items:['Assam English Breakfast Tea','Majestic Earl Grey','Jasmine Mao Jian','Organic Mint Duo','Chamomile','Masala Spice Chai','Organic Spring Mao Fen'].map(n=>D(n,'50'))},
    {pageTitle:'BEERS',title:'',style:'list',spacing:'airy',newPage:true,items:['Heineken','Stella Artois','Asahi','Corona','Peroni','Brew Dog IPA','Magners Original'].map(n=>D(n,'55'))},
    {pageTitle:'NON-ALCOHOLIC',title:'COCKTAIL 0%',style:'na',newPage:true,items:[
      D('GIN-GER','40','Lyer’s London Dry, Hibiscus, Lemon, Ginger, Ginger Ale, Fresh Mint, Lemongrass'),
      D('LXR SPRITZ','40','Lyer’s Italian Orange, Strawberry-Chamomille Homemade Infusion, Ginger, Martini Dolce 0%, Sparkling Water'),
      D('SPICY MANGO MOJITO','40','Mango Puree, Brown Sugar, Lime, Mint,\nRed Chili, Soda Water'),
      D('BLACKBERRY DELIGHT','40','Blackberry, Pineapple, Lemon,\nVanilla, Rosemary')]},
    {pageTitle:'NON-ALCOHOLIC',title:'WINE 0%',style:'na',items:[
      D('Wild Idol White\nMuller-Thurgau','540','Germany (Lychee, Elderflower, Fresh)'),
      D('Wild Idol Rose\nMuller-Thurgau & Merlot','570','Germany (Berry, Delicate, Fresh)')]},
    {pageTitle:'COCKTAILS',title:'',style:'cocktail',newPage:true,items:[
      D('NEGRONI','70','Gin, Sweet Red Vermouth, Bitter Campari'),
      D('OLD FASHIONED','70','Bitters, Bourbon Whiskey, Sugar Syrup'),
      D('DAIQUIRI','70','Rum, Lime juice, Sugar Syrup'),
      D('MARGARITA','70','Tequila, Triple Sec, Lime Juice'),
      D('WHISKEY SOUR','70','Bourbon Whiskey, Lemon Juice, Sugar Syrup'),
      D('ESPRESSO MARTINI','75','Rye Whiskey, Red Vermouth, Angostura Bitter'),
      D('MANHATTAN','75','Rye Whiskey, Red Vermouth, Angostura Bitter'),
      D('MOJITO','75','White Rum, Lime Juice, Mint, Sugar Syrup',{breakBefore:true}),
      D('BLOODY MARY','75','Vodka, Tomato Juice, Lemon Juice, Worcestershire Sauce, Tabasco Sauce, Celery, Salt, Black Pepper'),
      D('MOSCOW MULE','75','Vodka, Lime Juice, Ginger Beer'),
      D('AMARETTO SOUR','80','Amaretto Liqueur, Cask-Proof Bourbon,\nLemon Juice, Sugar Syrup, Egg White'),
      D('PEACH BELLINI','80','White Pulp Peach Puree, Prosecco')]},
    {pageTitle:'WINES',title:'CHAMPAGNE',style:'list',spacing:'airy',glassBottle:true,newPage:true,items:[
      SH('CHAMPAGNE BRUT'),D('Moët & Chandon Imperial Brut','179 / 840'),D('Billecart-Salmon Brut Réserve','1,031'),D('Dom Pérignon','5,156'),D('Dom Pérignon MAGNUM','10,791'),
      SH('CHAMPAGNE ROSÉ'),D('Moët & Chandon Rosé Impérial','1,080'),D('Billecart-Salmon Brut Rose’','1,199'),D('Dom Pérignon Rosé MAGNUM','18,854'),
      SH('PROSECCO'),D('Zonin 1821 Prosecco Brut DOC','70 / 330')]},
    {pageTitle:'WINES',title:'ROSÉ WINE',style:'wine',glassBottle:true,newPage:true,items:[
      SH('FRANCE'),
      D('M de Minuty, Côtes de Provence','84 / 396','Red-berry notes dominate the wine’s bouquet. The crisp, juicy fruits are round and appetizing on the palate.'),
      D('Château D’Esclans “Whispering Angel”, Côtes de Provence','552','Fresh peach and strawberry notes. Pale salmon in colour, this is delicate and fresh with plenty of crisp strawberry fruit.'),
      SH('USA'),
      D('Barefoot Pink Moscato','46 / 216','Mandarin orange and sweet jasmine. It has subtle flavors of cherry, raspberry and pomegranate.')]},
    {pageTitle:'WINES',title:'WHITE WINE',style:'wine',glassBottle:true,newPage:true,items:[
      SH('ITALY'),
      D('Emotivo Pinot Grigio, IGT','51 / 240','A Delicate Pinot Grigio with notes of white peach and citrus, offering a refreshing and elegant taste'),
      D('St Michael-Eppan Chardonnay DOC','432','Wonderfully juicy and inviting, with long-lasting persistence.'),
      SH('FRANCE'),
      D('Plaisir de Vigne Muscadet AOC, Sauvion Et Fils Mandari','66 / 312','Bright straw pale colour. Fresh aroma of apricots, lemons, hints of pear and spices.'),
      D('Pascal Jolivet “Attitude”,\nSauvignon Blanc','516','Nice freshness on the palate, a clean attack, delicate lime, citrus, green apple and kiwi.'),
      D('Chablis, Laroche','756','Pale-lemon, medium pronounced notes of unripe stone fruit, lemon and wet stone on the nose.'),
      SH('GERMANY'),
      D('Riesling ‘Dr L’ QbA, Dr. Loosen','432','Aromas of plush red peach, cherry and white currant flavors that are supported by zesty acidity. Long and creamy on the finish.'),
      SH('LEBANON','',{breakBefore:true}),
      D('Château Ksara,\n“Blanc de l’Observatoire','372','Elegant character of citrus, stone fruit and wildflowers.'),
      SH('NEW ZEALAND'),
      D('Sauvignon Blanc, Matua','89 / 420','The lively nose shows tropical and citrus fruits with subtle herbaceous characters.'),
      SH('SOUTH AFRICA'),
      D('Ken Forrester Petit\nChenin Blanc','64 / 300','Pear drop flavours. Earlier picked freshness shows on palate with crunchy green apple and grapefruit flavours.'),
      SH('USA'),
      D('Château St Michelle, Riesling','372','Semi sweet with raisin and blackberry notes'),
      D('Chardonnay, Vintner’s Reserve, Kendall Jackson','677','Tropical flavors such as mango and pineapple dance with aromas of peach, apple and pear.')]},
    {pageTitle:'WINES',title:'RED WINE',style:'wine',glassBottle:true,newPage:true,items:[
      SH('ITALY'),
      D('Nero d’Avola, Ca’ di Ponti','64 / 300','Medium-bodied, spicy red with aromas of ripe plum and black cherry'),
      D('Barbera d’Asti Vigna Vecchia, Cossetti','79 / 372','Black Cherry, pepper, chocolate and liquorice'),
      D('Castello di Albola Chianti Classico DOCG','444','Elegant, with delicate scents of violets, Well-balanced and dry, with good structure and a velvety texture.'),
      D('Le Volte Dell Ornellaia,\nToscana IGT','839','Displays lively red fruit aromas alongside light spiciness.'),
      D('Amarone Valpolicella Classico, Luigi Righetti','935','Dried fruit, bark, dried mushrooms and sweet spices on the nose.'),
      SH('FRANCE','',{breakBefore:true}),
      D('Michel Chapoutier\n“Bila-Haut” Rouge,\nCôtes de Roussillon Villages','65 / 306','Aromas of black cherry. This wine is well-structured with the warm and savage of soils of the Roussillon area'),
      D('Pascal Jolivet “Attitude”,\nPinot Noir','109 / 514','Crushed red berries—strawberry and raspberry—lead to a vibrant finish with a hint of white pepper spice.'),
      D('Frank Phélan (Second Vin)','1,198','Elegant, with delicate scents of violets, Well-balanced and dry, with good structure and a velvety texture.'),
      D('Alter Ego de Palmer (Second Vin), Château Palmer','2,877','Displays lively red fruit aromas alongside light spiciness.'),
      SH('LEBANON','',{breakBefore:true}),
      D('Prieuré, Château Ksara','396','Bright and intense ruby-red wine, with an exotic, fruity aroma with notes of liquorice and spice.'),
      SH('ARGENTINA'),
      D('Santa Julia,\nCabernet Sauvignon','59 / 276','Black cherries, prunes, gooseberries, blackberries and spices.'),
      D('Santa Julia, Malbec','59 / 276','Varietal notes of ripe fruits, figs, prunes, jam and raisins.'),
      D('Clos de Los Siete','839','Dense, dark-berry fruits, and notes of chocolate and spice make this iconic Malbec, Cabernet Sauvignon, Merlot and Syrah blend an intriguing and exceptional wine.')]},
    {pageTitle:'WINES',title:'DESSERT WINE',style:'wine',glassBottle:true,newPage:true,items:[
      SH('FRANCE'),
      D('Muscat de Beaumes-de-Venise,\nDomaine de Coyeux','659','Notes of candied citrus and acacia honey, accompanied by a subtle oxidative touch of fresh walnuts.'),
      SH('ITALY'),
      D('Kabir, Donnafugata','779','Aromas of citrus fruit, lemon blossom, and honey, this wine is a true pleasure for the sense.')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'BLENDED SCOTCH WHISKEY',style:'list',spacing:'airy',glassBottle:true,newPage:true,items:[
      D('Ballantine’s','55 / 1,250'),D('Chivas Regal 12 Years','66 / 1,320'),D('Chivas Extra','77 / 1,650'),D('Chivas Regal 18 Years','122 / 2,750'),D('Chivas Regal Royal Salute','215 / 4,950'),D('Chivas Regal Ultis','325 / 7,700'),D('Monkey Shoulder','77 / 1,760'),D('Johnnie Walker Black Label','77 / 1,760'),D('Johnnie Walker Double Black Label','83 / 1,800'),D('Johnnie Walker Gold Label','116 / 2,860'),D('Johnnie Walker 18 Year','138 / 3,410'),D('Johnnie Walker Blue Labe','335 / 7,750')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'AMERICAN WHISKEY',style:'list',spacing:'airy',glassBottle:true,newPage:true,items:[
      D('Jack Daniel’s Old No.7','72 / 1,760'),D('Gentleman Jack','80 / 1,870'),D('Jack Daniel’s Single Barrel','116 / 2,860'),D('Jack Daniel’s Sinatra Select','132 / 4,400'),D('Bulleit Woodford Reserve','60 / 1,485'),D('Maker’s Mark','77 / 1,870'),D('Maker’s Mark 46','94 / 1,900'),D('Four Roses Single Barrel','66 / 1,320')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'VODKA',style:'list',spacing:'airy',glassBottle:true,newPage:true,items:[
      D('Belvedere','88 / 2,200'),D('Grey Goose','88 / 2,200'),D('Absolut','55 / 1,250'),D('Beluga Gold','182 / 3,740')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'GIN',style:'list',spacing:'airy',glassBottle:true,items:[
      D('Tanqueray','60 / 1,300'),D('Tanqueray 10','77 / 1,870'),D('Gin Mare','77 / 1,650'),D('Hendrick’s','77 / 1,650'),D('Monkey 47','105 / 1,700'),D('London Dry No.3','77 / 1,650'),D('Bombay Sapphire','55 / 1,250'),D('Bulldog','60 / 1,400')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'RUM',style:'list',spacing:'airy',glassBottle:true,newPage:true,items:[
      D('Bacardi Superior','55 / 1,250'),D('Bacardi Gold','60 / 1,400'),D('Bacardi Black','60 / 1,400'),D('Bacardi 4 Years','65 / 1,480'),D('Bacardi 8 Years','72 / 1,650'),D('Zacapa 23 Years','110 / 2,750'),D('Havana 3 Years','55 / 1,250'),D('Havana 7 Years','72 / 1,788')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'TEQUILA & MEZCAL',style:'list',spacing:'airy',glassBottle:true,items:[
      D('El Jimador Blanco','60 / 1,300'),D('El Jimador Reposado','60 / 1,300'),D('Patron Silver','77 / 1,600'),D('Patron Reposado','105 / 1,200'),D('Patron Anejo','120 / 2,700')]},
    {pageTitle:'SPIRITS & LIQUEURS',title:'APERITIF & DIGESTIF',style:'list',spacing:'airy',glassBottle:true,newPage:true,items:[
      D('Martini Bianco','50 / 1,905'),D('Campari','50 / 1,905'),D('Fernet Branca','46 / 1,045'),D('Jagermeister','55 / 1,210'),D('Cynar','50 / 1,905'),D('Pernod','50 / 1,905'),D('Ricard','50 / 1,905'),D('Sambuca Molinari','50 / 1,905'),D('Amaretto Disaronno','44 / 990'),D('Limoncello','72 / 1,320'),D('Cointreau','55 / 1,210'),D('St Germain','60 / 1,380')]}
  ]},
/* ---------------------------------------------------------------- KIDS */
'lilia-kids':{
  template:'kids', outlet:'lilia', name:'Kids', name_ar:'الأطفال',
  settings:{title:'KIDS',title_ar:'الاطفال',currency:'AED',footer_en:FOOT_EN,footer_ar:'يُرجى الملاحظة أن جميع الأصناف قد تُحضَّر في بيئة تحتوي على مسبّبات للحساسيّة. للذين لديهم حساسيّات أو متطلّبات غذائية خاصة، يُرجى استشارة فريق الإدارة.\nجميع الأسعار بالدرهم الإماراتي وتشمل الضرائب والرسوم المطبّقة.'},
  sections:[
    {title:'STARTERS',title_ar:'المقبلات',items:[
      I('Hummus, warm pita bread','حمص، خبز بيتا دافئ','','','35'),
      I('Cherry tomatoes, basil, mozzarella','طماطم كرزية، ريحان، موزاريلا','','','35'),
      I('Halloumi fingers, tomato dip','أصابع حلومي، صلصة طماطم','','','40'),
      I('Cheese manakish, za’atar, olive oil','مناقيش جبنة، زعتر وزيت زيتون','','','35')]},
    {title:'MAINS',title_ar:'الأطباق الرئيسية',items:[
      I('Penne pasta, tomato sauce, Parmesan','معكرونة بيني، صلصة طماطم، بارميزان','','','45'),
      I('Grilled salmon, broccolini, potatoes','سلمون مشوي، بروكوليني، بطاطا','','','60'),
      I('Crispy chicken taouk, grilled veggies, raita','دجاج طاووق مقرمش، خضار مشوية، رايتا','','','55'),
      I('Mini lamb kofta, garlic sauce, pita bread','ميني كفتة غنم، صلصة ثوم، خبز بيتا','','','60')]},
    {title:'DESSERTS',title_ar:'الحلويات',items:[
      I('Chocolate & peanut butter brownie','براوني بالشوكولاتة وزبدة الفول السوداني','','','30'),
      I('Date cookies & vanilla ice cream','كوكيز التمر وآيس كريم الفانيليا','','','30'),
      I('Frozen yoghurt & berries','زبادي مثلج مع التوت','','','30')]}
  ]},
/* ---------------------------------------------------------------- SIGNATURE */
'lilia-signature':{
  template:'signature', outlet:'lilia', name:'Signature Breakfast', name_ar:'فطور مميز',
  settings:{version:'both',title:'SIGNATURE BREAKFAST',title_ar:'فطور مميز',
    footer_en:FOOT_EN,
    footer_ar:'يُرجى الملاحظة أن جميع الأصناف قد تُحضَّر في بيئة تحتوي على مسبّبات للحساسيّة. للذين لديهم حساسيّات أو متطلّبات غذائية خاصة، يُرجى استشارة فريق الإدارة.\nجميع الأسعار بالدرهم الإماراتي وتشمل الضرائب والرسوم المطبّقة.'},
  sections:[{title:'',items:[
    I('Lobster Benedict,\nasparagus & hollandaise','لوبيستر بينيديكت مع هليون وصوص هولنديز',
      'Succulent lobster tail meat, lightly sautéed in butter for tenderness and flavor. Perfectly poached eggs with a soft, runny yolk that complements the richness of the lobster. Velvety hollandaise sauce, enhanced with a hint of lemon or cayenne to balance the sweetness of the lobster.',
      'لحم ذيل اللوبستر يُطهى برفق في الزبدة ليحافظ على طراوته ونكهته البحرية الراقية. يُقدّم مع بيض مسلوق بإتقان بصفار طري يكمّل غنى اللوبستر.\nتُغطّى الطبقات بصوص هولنديز مخملية، تُعزَّز أحيانًا بلمسة من الليمون أو رشة فلفل حار خفيف، لموازنة الحلاوة الطبيعية للّوبستر وإضافة لمسة منعشة وأنيقة.','50'),
    I('Steak & eggs, black truffle','ستيك أند إيغز مع كمأة سوداء',
      'A refined twist on a classic pairing. Succulent, perfectly seared premium steak served alongside soft, creamy sunny-side-up egg. Finished with a delicate shaving of aromatic Umbrian Black Truffle, adding earthy depth and luxurious complexity to every bite.',
      'شريحة لحم أنغوس مشوية بإتقان، تقدَّم مع بيضة عيون بصفار طري وكريمي. يُختتم الطبق ببرش كمأة سوداء عطرية تُضيف عمقاً ترابياً ونفحة ترف في كل قضمة.','60'),
    I('Japanese Soufflé omelette','أومليت سوفليه ياباني',
      'A delicate, cloud-like Japanese soufflé omelette, celebrated for its airy texture and buttery richness. Paired with earthy porcini mushrooms that bring deep, umami complexity, and finished with a generous shaving of 60-month aged Parmesan for a nutty, savory depth.',
      'بيض سوفليه ياباني هشّ يشبه السحاب، بقوام خفيف ونكهة زبدية غنيّة. يُقدَّم مع فطر بورسيني بلمسته الترابية ونكهة الأومامي العميقة، ويُنهى برَشّة سخية من جبن بارميزان معتّق لمدة ٦٠ شهراً تمنح الطبق طعماً جوزيّاً فاخر.','40'),
    I('15g Oscietra Caviar, scrambled eggs, sourdough toast','غرام من كافيار أوسيترا، بيض مخفوق، خبز ساوردو محمّص',
      'Silky scrambled eggs served atop crisp, artisanal sourdough toast. Crowned with 15 grams of exquisite Oscietra caviar, celebrated for its delicate brininess and nutty complexity.',
      'يض مخفوق بقوام كريمي ناعم يُقدَّم فوق خبز ساوردو محمّص يدويًا لقرمشة متوازنة، ويُتوَّج بـ ١٥ غرامًا من كافيار أوسيترا الفاخر، المعروف بملوحته الرقيقة ونكهته الجوزية العميقة.','80')]}]}
};

/* ---- Lilia buffet tags (Lilia_Buffet_Card.ai) ---- */
SEED_MENUS['lilia-buffet']={template:'buffetTags',outlet:'lilia',name:'Buffet tags',
  settings:{layout:'sheet',marks:true,frame:true,allergens:false,upper:false,sectionSheets:false},
  sections:[{title:'Breakfast · Bakery',items:[
    {name:'Croissant',name_ar:'كرواسون',allergens:'Gluten, Dairy, Eggs',qty:'1'},
    {name:'Pain au chocolat',name_ar:'بان أو شوكولا',allergens:'Gluten, Dairy, Eggs',qty:'1'},
    {name:'Almond croissant',name_ar:'كرواسون باللوز',allergens:'Gluten, Dairy, Eggs, Nuts',qty:'1'}]},
   {title:'Breakfast · Cold station',items:[
    {name:'Smoked salmon',name_ar:'سلمون مدخن',allergens:'Fish',qty:'1'},
    {name:'Greek yoghurt',name_ar:'زبادي يوناني',allergens:'Dairy',qty:'1'},
    {name:'Labneh',name_ar:'لبنة',allergens:'Dairy',qty:'1'},
    {name:'Seasonal fruit',name_ar:'فواكه موسمية',allergens:'',qty:'1'}]},
   {title:'Breakfast · Hot station',items:[
    {name:'Scrambled eggs',name_ar:'بيض مخفوق',allergens:'Eggs, Dairy',qty:'1'}]}]};
const OUTLETS=[
  {id:'lilia',name:'Lilia',sub:'Brasserie · All-day dining',logo:'ar',color:'#736922',
   menus:['lilia-breakfast','lilia-ld','lilia-drinks','lilia-kids','lilia-signature','lilia-buffet']}
];
