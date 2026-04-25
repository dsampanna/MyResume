/* HimalTrek Nepal v3 — Complete App */

// ── 24 Treks ──────────────────────────────────
const TREKS = [
  {id:'ebc',name:'Everest Base Camp',region:'Khumbu',difficulty:'strenuous',days:14,alt:5364,price:980,rating:4.9,reviews:842,color:'#2d4055',short:'The world\'s most iconic trek to the foot of Everest.',best:'Mar–May, Sep–Nov',start:'Lukla',maxGroup:12},
  {id:'ann',name:'Annapurna Circuit',region:'Gandaki',difficulty:'moderate',days:18,alt:5416,price:850,rating:4.8,reviews:621,color:'#2d4535',short:'Classic circuit crossing the dramatic Thorong La pass at 5,416m.',best:'Oct–Nov, Mar–Apr',start:'Besisahar',maxGroup:14},
  {id:'lang',name:'Langtang Valley',region:'Bagmati',difficulty:'easy',days:10,alt:3870,price:550,rating:4.7,reviews:398,color:'#3a2d4a',short:'Nepal\'s closest major trek to Kathmandu. Rich Tamang culture.',best:'Mar–May, Oct–Dec',start:'Syabrubesi',maxGroup:16},
  {id:'man',name:'Manaslu Circuit',region:'Gorkha',difficulty:'strenuous',days:16,alt:5106,price:1100,rating:4.8,reviews:211,color:'#4a3520',short:'Remote circuit around the 8th highest mountain in the world.',best:'Mar–May, Sep–Nov',start:'Soti Khola',maxGroup:10},
  {id:'mera',name:'Mera Peak Climb',region:'Khumbu',difficulty:'strenuous',days:20,alt:6476,price:1800,rating:4.9,reviews:144,color:'#1e3a4a',short:'Nepal\'s highest trekking peak — no technical skills needed.',best:'Apr–May, Oct–Nov',start:'Lukla',maxGroup:8},
  {id:'gok',name:'Gokyo Lakes & Ri',region:'Khumbu',difficulty:'moderate',days:12,alt:5357,price:780,rating:4.8,reviews:307,color:'#3a4520',short:'Turquoise glacial lakes and stunning Gokyo Ri panoramas.',best:'Mar–May, Oct–Nov',start:'Lukla',maxGroup:12},
  {id:'abc',name:'Annapurna Base Camp',region:'Gandaki',difficulty:'moderate',days:12,alt:4130,price:720,rating:4.8,reviews:512,color:'#2d3a4a',short:'Trek through terraced villages into the Annapurna Sanctuary.',best:'Mar–May, Oct–Dec',start:'Nayapul',maxGroup:14},
  {id:'mustang',name:'Upper Mustang',region:'Gandaki',difficulty:'moderate',days:14,alt:3840,price:1600,rating:4.9,reviews:98,color:'#4a3a20',short:'The ancient Forbidden Kingdom hidden behind the Himalayas.',best:'May–Oct',start:'Jomsom',maxGroup:10},
  {id:'kanchenjunga',name:'Kanchenjunga Circuit',region:'Taplejung',difficulty:'strenuous',days:24,alt:5140,price:1400,rating:4.9,reviews:67,color:'#1e2d3a',short:'Remote circuit around the world\'s 3rd highest peak.',best:'Apr–May, Oct–Nov',start:'Taplejung',maxGroup:8},
  {id:'dhaulagiri',name:'Dhaulagiri Circuit',region:'Myagdi',difficulty:'strenuous',days:20,alt:5360,price:1300,rating:4.8,reviews:54,color:'#3a2d1e',short:'Wild circuit around the 7th highest mountain. Rarely visited.',best:'Mar–May, Oct–Nov',start:'Beni',maxGroup:8},
  {id:'dolpo',name:'Dolpo Hidden Valley',region:'Dolpa',difficulty:'strenuous',days:22,alt:5360,price:2200,rating:5.0,reviews:38,color:'#2d1e3a',short:'Most remote trek in Nepal. Inner Dolpo restricted area.',best:'Jun–Sep',start:'Juphal',maxGroup:6},
  {id:'helambu',name:'Helambu Circuit',region:'Bagmati',difficulty:'easy',days:7,alt:3640,price:350,rating:4.6,reviews:289,color:'#2d3a20',short:'Easy circuit near Kathmandu with monasteries and Sherpa villages.',best:'Year-round',start:'Sundarijal',maxGroup:16},
  {id:'rolwaling',name:'Rolwaling Valley',region:'Ramechhap',difficulty:'strenuous',days:18,alt:5755,price:1350,rating:4.8,reviews:72,color:'#3a1e2d',short:'Seldom-visited valley connecting Khumbu and Kathmandu.',best:'Apr–May, Oct–Nov',start:'Simigaon',maxGroup:8},
  {id:'tsum',name:'Tsum Valley',region:'Gorkha',difficulty:'moderate',days:16,alt:3700,price:980,rating:4.9,reviews:86,color:'#1e3a2d',short:'Sacred hidden valley with ancient Buddhist culture near Manaslu.',best:'Mar–May, Sep–Nov',start:'Soti Khola',maxGroup:10},
  {id:'narphu',name:'Nar Phu Valley',region:'Manang',difficulty:'moderate',days:14,alt:5190,price:1150,rating:4.9,reviews:63,color:'#2d2d1e',short:'Two secret valleys off the Annapurna Circuit. Restricted.',best:'Mar–May, Oct–Nov',start:'Koto',maxGroup:10},
  {id:'poonhill',name:'Poon Hill Trek',region:'Gandaki',difficulty:'easy',days:5,alt:3210,price:280,rating:4.7,reviews:1240,color:'#2d4a3a',short:'Short classic with the most stunning Himalayan sunrise views.',best:'Oct–May',start:'Nayapul',maxGroup:20},
  {id:'gosaikunda',name:'Gosaikunda Lake',region:'Bagmati',difficulty:'moderate',days:9,alt:4380,price:480,rating:4.6,reviews:198,color:'#1e2d4a',short:'Sacred alpine lake revered by Hindus and Buddhists alike.',best:'Apr–Jun, Sep–Nov',start:'Dhunche',maxGroup:14},
  {id:'khopra',name:'Khopra Danda Ridge',region:'Gandaki',difficulty:'moderate',days:10,alt:3660,price:550,rating:4.7,reviews:145,color:'#3a4a2d',short:'Off-the-beaten-path ridge with views rivalling Poon Hill.',best:'Oct–May',start:'Nayapul',maxGroup:12},
  {id:'pikey',name:'Pikey Peak Trek',region:'Solukhumbu',difficulty:'easy',days:7,alt:4065,price:380,rating:4.6,reviews:112,color:'#2d1e4a',short:'Best view of Everest accessible from Kathmandu in a week.',best:'Mar–May, Oct–Dec',start:'Dhap',maxGroup:14},
  {id:'island',name:'Island Peak Climb',region:'Khumbu',difficulty:'strenuous',days:18,alt:6189,price:2100,rating:4.9,reviews:167,color:'#1e4a3a',short:'Technical peak climb with crampons — true mountaineering.',best:'Apr–May, Oct–Nov',start:'Lukla',maxGroup:8},
  {id:'makalu',name:'Makalu Base Camp',region:'Sankhuwasabha',difficulty:'strenuous',days:20,alt:4870,price:1200,rating:4.8,reviews:45,color:'#3a2d4a',short:'Remote trail to base of the world\'s 5th highest mountain.',best:'Mar–May, Oct–Nov',start:'Num',maxGroup:8},
  {id:'rara',name:'Rara Lake Trek',region:'Karnali',difficulty:'moderate',days:11,alt:2990,price:750,rating:4.7,reviews:89,color:'#2a3a1e',short:'Nepal\'s largest lake — jewel of the remote far-west Himalayas.',best:'Mar–May, Oct–Nov',start:'Jumla',maxGroup:12},
  {id:'phoksundo',name:'Phoksundo Lake Trek',region:'Dolpa',difficulty:'strenuous',days:14,alt:3611,price:1050,rating:4.8,reviews:76,color:'#1e2a3a',short:'Stunning turquoise lake in the remote Dolpa district.',best:'Jun–Sep',start:'Juphal',maxGroup:10},
  {id:'threepasses',name:'Three High Passes',region:'Khumbu',difficulty:'strenuous',days:20,alt:5535,price:1250,rating:4.9,reviews:203,color:'#3a1e2d',short:'Cross Renjo La, Cho La and Kongma La — the ultimate Everest challenge.',best:'Apr–May, Oct–Nov',start:'Lukla',maxGroup:10},
];

// ── Per-trek itineraries (all 24) ─────────────
const ITINERARIES = {
  ebc:[
    {day:1,title:'Fly Kathmandu → Lukla, trek to Phakding',sub:'2,610m · ~3 hrs · Acclimatisation begins',pct:48},
    {day:2,title:'Phakding → Namche Bazaar',sub:'3,440m · ~5–6 hrs · Gateway to Everest',pct:63},
    {day:3,title:'Namche Bazaar acclimatisation day',sub:'3,440–3,800m · Hike to Hotel Everest View',pct:63},
    {day:4,title:'Namche → Tengboche Monastery',sub:'3,860m · ~5 hrs · Iconic monastery views',pct:71},
    {day:5,title:'Tengboche → Dingboche',sub:'4,410m · ~5 hrs · Enter high altitude zone',pct:81},
    {day:6,title:'Dingboche acclimatisation day',sub:'4,410–5,000m · Hike to Nagarjun Hill',pct:81},
    {day:7,title:'Dingboche → Lobuche',sub:'4,940m · ~5 hrs · Glacial moraines',pct:91},
    {day:8,title:'Lobuche → Gorak Shep → Everest Base Camp',sub:'5,164m → 5,364m · Reach EBC!',pct:100,highlight:true},
    {day:9,title:'Kala Patthar sunrise → Pheriche',sub:'5,545m → 4,371m · Best Everest panorama',pct:80},
    {day:10,title:'Pheriche → Namche Bazaar',sub:'3,440m · Long rewarding descent',pct:63},
    {day:11,title:'Namche Bazaar → Lukla',sub:'2,860m · Final trail day',pct:52},
    {day:12,title:'Fly Lukla → Kathmandu',sub:'Celebration dinner in Thamel',pct:20},
    {day:13,title:'Kathmandu free day',sub:'Pashupatinath, Boudhanath, shopping',pct:10},
    {day:14,title:'Departure from Kathmandu',sub:'Airport transfer included',pct:0},
  ],
  ann:[
    {day:1,title:'Drive Kathmandu → Besisahar',sub:'800m · ~6 hrs bus · Trek start town',pct:15},
    {day:2,title:'Besisahar → Bahundanda',sub:'1,310m · ~5 hrs · River gorge walking',pct:24},
    {day:3,title:'Bahundanda → Chamje',sub:'1,430m · ~4 hrs · Waterfalls and suspension bridges',pct:26},
    {day:4,title:'Chamje → Bagarchhap',sub:'2,160m · ~5 hrs · Pine forests begin',pct:40},
    {day:5,title:'Bagarchhap → Chame',sub:'2,710m · ~5 hrs · First Annapurna views',pct:50},
    {day:6,title:'Chame → Pisang',sub:'3,200m · ~5 hrs · Dramatic rock walls',pct:59},
    {day:7,title:'Pisang → Manang',sub:'3,519m · ~4 hrs · Acclimatisation village',pct:65},
    {day:8,title:'Manang acclimatisation day',sub:'3,519–4,000m · Hike to Ice Lake',pct:65},
    {day:9,title:'Manang → Yak Kharka',sub:'4,050m · ~3 hrs · High pastureland',pct:75},
    {day:10,title:'Yak Kharka → Thorung Phedi',sub:'4,450m · ~3 hrs · Base of Thorong La',pct:82},
    {day:11,title:'Cross Thorong La Pass → Muktinath',sub:'5,416m → 3,800m · The iconic crossing!',pct:100,highlight:true},
    {day:12,title:'Muktinath → Marpha',sub:'2,670m · ~5 hrs · Apple orchards and brandy',pct:49},
    {day:13,title:'Marpha → Kalopani',sub:'2,530m · ~5 hrs · Dhaulagiri views',pct:46},
    {day:14,title:'Kalopani → Tatopani',sub:'1,190m · ~6 hrs · Famous hot springs',pct:22},
    {day:15,title:'Tatopani → Ghorepani',sub:'2,860m · ~6 hrs · Strenuous climb',pct:52},
    {day:16,title:'Poon Hill sunrise → Nayapul',sub:'3,210m · Spectacular 360° view at dawn',pct:59},
    {day:17,title:'Drive Nayapul → Pokhara',sub:'~1.5 hrs · Lakeside celebration dinner',pct:10},
    {day:18,title:'Fly Pokhara → Kathmandu / Departure',sub:'30-min mountain flight',pct:5},
  ],
  lang:[
    {day:1,title:'Drive Kathmandu → Syabrubesi',sub:'1,460m · ~7 hrs · Trek start village',pct:27},
    {day:2,title:'Syabrubesi → Lama Hotel',sub:'2,380m · ~5 hrs · Dense rhododendron forest',pct:44},
    {day:3,title:'Lama Hotel → Langtang Village',sub:'3,430m · ~5 hrs · First glacial views',pct:63},
    {day:4,title:'Langtang → Kyanjin Gompa',sub:'3,870m · ~3 hrs · Sacred monastery',pct:71},
    {day:5,title:'Kyanjin Gompa acclimatisation',sub:'3,870–4,500m · Hike Kyanjin Ri for panoramas',pct:83},
    {day:6,title:'Kyanjin Gompa → Lama Hotel',sub:'2,380m · Long descent day',pct:44},
    {day:7,title:'Lama Hotel → Syabrubesi',sub:'1,460m · ~5 hrs · Return through forest',pct:27},
    {day:8,title:'Drive Syabrubesi → Dunche',sub:'1,950m · ~2 hrs · Village with teahouses',pct:36},
    {day:9,title:'Dunche → Thulo Syabru',sub:'2,230m · ~4 hrs · Tamang village life',pct:41},
    {day:10,title:'Drive to Kathmandu',sub:'~5–6 hrs road · Return journey',pct:10},
  ],
  man:[
    {day:1,title:'Drive Kathmandu → Soti Khola',sub:'700m · ~8 hrs · Trek starting point',pct:13},
    {day:2,title:'Soti Khola → Machha Khola',sub:'930m · ~5 hrs · Narrow gorge walking',pct:17},
    {day:3,title:'Machha Khola → Doban',sub:'1,070m · ~5 hrs · Suspension bridges',pct:20},
    {day:4,title:'Doban → Jagat',sub:'1,410m · ~5 hrs · Restricted area entry',pct:26},
    {day:5,title:'Jagat → Deng',sub:'1,860m · ~5 hrs · River valley narrows',pct:34},
    {day:6,title:'Deng → Namrung',sub:'2,630m · ~5 hrs · First Manaslu views',pct:49},
    {day:7,title:'Namrung → Samagaon',sub:'3,530m · ~5 hrs · Tibetan culture village',pct:65},
    {day:8,title:'Samagaon acclimatisation day',sub:'3,530m · Hike to Manaslu Base Camp',pct:72},
    {day:9,title:'Samagaon → Samdo',sub:'3,690m · ~3 hrs · Near Tibetan border',pct:68},
    {day:10,title:'Samdo → Dharmasala',sub:'4,460m · ~4 hrs · Larkya La base camp',pct:82},
    {day:11,title:'Cross Larkya La Pass → Bimthang',sub:'5,106m → 3,590m · Epic crossing!',pct:100,highlight:true},
    {day:12,title:'Bimthang → Tilije',sub:'2,300m · ~6 hrs · Long descent',pct:42},
    {day:13,title:'Tilije → Tal',sub:'1,700m · ~5 hrs · Waterfalls and views',pct:31},
    {day:14,title:'Tal → Dharapani',sub:'1,860m · ~4 hrs · Annapurna Circuit junction',pct:34},
    {day:15,title:'Drive Dharapani → Besisahar',sub:'~2 hrs road',pct:15},
    {day:16,title:'Drive Besisahar → Kathmandu',sub:'~6 hrs road · Trip concludes',pct:10},
  ],
  mera:[
    {day:1,title:'Fly Kathmandu → Lukla, trek to Paiya',sub:'2,730m · Altitude gain begins',pct:42},
    {day:2,title:'Paiya → Panggom',sub:'2,850m · ~5 hrs · Rhododendron forests',pct:44},
    {day:3,title:'Panggom → Ningsow',sub:'3,000m · ~5 hrs · Remote trail',pct:46},
    {day:4,title:'Ningsow → Chhatra Khola',sub:'2,800m · ~5 hrs · Valley camp',pct:43},
    {day:5,title:'Chhatra Khola → Kothe',sub:'3,580m · ~6 hrs · Mera La approach',pct:55},
    {day:6,title:'Kothe → Thagnag',sub:'4,356m · ~5 hrs · High camp',pct:67},
    {day:7,title:'Thagnag → Mera High Camp',sub:'5,780m · ~5 hrs · Pre-summit camp',pct:89},
    {day:8,title:'Summit Mera Peak 6,476m → descend',sub:'6,476m · Summit day!',pct:100,highlight:true},
    {day:9,title:'Mera High Camp → Kothe',sub:'3,580m · Long descent',pct:55},
    {day:10,title:'Kothe → Khare',sub:'5,045m · Alternate route',pct:78},
    {day:11,title:'Khare → Lukla via Zatr La',sub:'~5 hrs · Valley crossing',pct:44},
    {day:12,title:'Rest day Lukla',sub:'2,860m · Await flight weather',pct:44},
    {day:13,title:'Fly Lukla → Kathmandu',sub:'Celebration dinner',pct:10},
    {day:14,title:'Kathmandu — rest day',sub:'Optional sightseeing',pct:10},
    {day:15,title:'Kathmandu → Lukla buffer day',sub:'Weather contingency',pct:10},
    {day:16,title:'Kathmandu free day',sub:'Shopping, Boudhanath',pct:5},
    {day:17,title:'Kathmandu free day',sub:'Optional day tours',pct:5},
    {day:18,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
    {day:19,title:'Buffer / departure',sub:'Flight contingency',pct:0},
    {day:20,title:'Final departure',sub:'All transfers included',pct:0},
  ],
  gok:[
    {day:1,title:'Fly Kathmandu → Lukla, trek to Phakding',sub:'2,610m · ~3 hrs',pct:48},
    {day:2,title:'Phakding → Namche Bazaar',sub:'3,440m · ~5–6 hrs',pct:63},
    {day:3,title:'Namche acclimatisation day',sub:'3,440–3,800m · Hike to Everest View Hotel',pct:63},
    {day:4,title:'Namche → Dole',sub:'4,038m · ~5 hrs · Diverge from EBC route',pct:74},
    {day:5,title:'Dole → Machhermo',sub:'4,470m · ~4 hrs · High pastures',pct:82},
    {day:6,title:'Machhermo → Gokyo Village',sub:'4,790m · ~4 hrs · First lake views',pct:88},
    {day:7,title:'Gokyo Ri summit day',sub:'5,357m · Sunrise over Everest, Lhotse, Cho Oyu',pct:100,highlight:true},
    {day:8,title:'Explore Gokyo Lakes',sub:'4,700–5,100m · 5 glacial lakes',pct:90},
    {day:9,title:'Gokyo → Namche Bazaar',sub:'3,440m · Long descent',pct:63},
    {day:10,title:'Namche → Lukla',sub:'2,860m · Final trail day',pct:52},
    {day:11,title:'Fly Lukla → Kathmandu',sub:'Return flight',pct:10},
    {day:12,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  abc:[
    {day:1,title:'Drive Kathmandu → Nayapul, trek to Tikhedhunga',sub:'1,540m · ~3 hrs walk',pct:28},
    {day:2,title:'Tikhedhunga → Ghorepani',sub:'2,860m · ~5 hrs · 3,600+ stone steps',pct:52},
    {day:3,title:'Poon Hill sunrise → Tadapani',sub:'3,210m views · ~5 hrs',pct:59},
    {day:4,title:'Tadapani → Chhomrong',sub:'2,170m · ~5 hrs · Annapurna views',pct:40},
    {day:5,title:'Chhomrong → Dovan',sub:'2,520m · ~5 hrs · Sanctuary entrance',pct:46},
    {day:6,title:'Dovan → Himalaya Hotel',sub:'2,920m · ~4 hrs · Snow zone begins',pct:54},
    {day:7,title:'Himalaya Hotel → Machhapuchhre Base Camp',sub:'3,700m · ~4 hrs · Fishtail peak',pct:68},
    {day:8,title:'MBC → Annapurna Base Camp 4,130m',sub:'Surrounded by 7,000m peaks!',pct:100,highlight:true},
    {day:9,title:'ABC → Bamboo',sub:'2,310m · Long descent',pct:42},
    {day:10,title:'Bamboo → Jhinu Danda',sub:'1,760m · Hot springs!',pct:32},
    {day:11,title:'Jhinu Danda → Nayapul → Pokhara',sub:'Drive to lakeside city',pct:10},
    {day:12,title:'Fly/drive Pokhara → Kathmandu · Departure',sub:'30-min mountain flight',pct:5},
  ],
  mustang:[
    {day:1,title:'Fly Kathmandu → Pokhara → Jomsom',sub:'2,720m · Twin Otter mountain flight',pct:50},
    {day:2,title:'Jomsom → Kagbeni',sub:'2,810m · ~3 hrs · Gateway to Upper Mustang',pct:52},
    {day:3,title:'Kagbeni → Chele',sub:'3,050m · ~5 hrs · Wind-sculpted canyons',pct:56},
    {day:4,title:'Chele → Syangboche',sub:'3,800m · ~5 hrs · Cave monasteries',pct:70},
    {day:5,title:'Syangboche → Ghami',sub:'3,520m · ~4 hrs · Ancient walled villages',pct:65},
    {day:6,title:'Ghami → Tsarang',sub:'3,670m · ~4 hrs · 14th-century castle',pct:67},
    {day:7,title:'Tsarang → Lo Manthang',sub:'3,840m · ~4 hrs · Forbidden capital!',pct:71,highlight:true},
    {day:8,title:'Lo Manthang exploration',sub:'3,840m · Palaces, monasteries, caves',pct:71},
    {day:9,title:'Lo Manthang → Lo Gekar',sub:'~4 hrs · Oldest monastery in Nepal',pct:68},
    {day:10,title:'Lo Gekar → Ghami via Nyi La',sub:'4,010m pass · Ancient salt route',pct:74},
    {day:11,title:'Ghami → Chhuksang',sub:'2,980m · River valley walking',pct:55},
    {day:12,title:'Chhuksang → Jomsom',sub:'2,720m · Wind-swept final day',pct:50},
    {day:13,title:'Fly Jomsom → Pokhara → Kathmandu',sub:'Return mountain flight',pct:10},
    {day:14,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  kanchenjunga:[
    {day:1,title:'Fly Kathmandu → Taplejung',sub:'1,820m · Small airstrip flight',pct:34},
    {day:2,title:'Taplejung → Chirwa',sub:'1,270m · ~5 hrs · River valley descent',pct:23},
    {day:3,title:'Chirwa → Sekathum',sub:'1,660m · ~5 hrs · Tambur River',pct:30},
    {day:4,title:'Sekathum → Amjilosa',sub:'2,490m · ~5 hrs · Forest steepens',pct:46},
    {day:5,title:'Amjilosa → Gyabla',sub:'2,730m · ~4 hrs · Yak pastures',pct:50},
    {day:6,title:'Gyabla → Ghunsa',sub:'3,595m · ~4 hrs · Tibetan-style village',pct:66},
    {day:7,title:'Ghunsa acclimatisation day',sub:'3,595m · Explore village, yaks and cheese',pct:66},
    {day:8,title:'Ghunsa → Khambachen',sub:'4,050m · ~5 hrs · Kanchenjunga visible',pct:74},
    {day:9,title:'Khambachen → Lhonak',sub:'4,790m · ~4 hrs · Glacial moraine',pct:88},
    {day:10,title:'Lhonak → Pangpema (North Base Camp)',sub:'5,140m · Kanchenjunga close-up!',pct:100,highlight:true},
    {day:11,title:'Pangpema → Ghunsa',sub:'3,595m · Long retreat',pct:66},
    {day:12,title:'Ghunsa → Sele La High Camp',sub:'4,290m · South circuit begins',pct:79},
    {day:13,title:'Cross Sele La → Tseram',sub:'4,910m pass · Remote crossing',pct:90},
    {day:14,title:'Tseram → Ramche (South Base Camp)',sub:'4,580m · South Kanchenjunga glacier',pct:84},
    {day:15,title:'Ramche → Tortong',sub:'2,995m · Forest descent',pct:55},
    {day:16,title:'Tortong → Yamphudin',sub:'2,080m · Tea house village',pct:38},
    {day:17,title:'Yamphudin → Khebang',sub:'1,960m · ~5 hrs',pct:36},
    {day:18,title:'Khebang → Taplejung',sub:'1,820m · Trek concludes',pct:34},
    {day:19,title:'Fly Taplejung → Kathmandu',sub:'Mountain flight return',pct:10},
    {day:20,title:'Kathmandu free day',sub:'Rest and debrief',pct:5},
    {day:21,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:22,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:23,title:'Kathmandu free day',sub:'Optional tours',pct:5},
    {day:24,title:'Departure from Kathmandu',sub:'Airport transfer included',pct:0},
  ],
  dhaulagiri:[
    {day:1,title:'Drive Kathmandu → Beni',sub:'820m · ~7 hrs road',pct:15},
    {day:2,title:'Beni → Babiachaur',sub:'1,620m · ~5 hrs · Gandaki River',pct:30},
    {day:3,title:'Babiachaur → Muri',sub:'1,840m · ~5 hrs · Gorge narrows',pct:34},
    {day:4,title:'Muri → Darbang',sub:'1,100m · ~4 hrs · Village life',pct:20},
    {day:5,title:'Darbang → Italian Base Camp',sub:'2,850m · ~6 hrs · Old climbers camp',pct:52},
    {day:6,title:'Italian BC → Glacier Camp',sub:'3,700m · ~4 hrs · Dhaulagiri visible',pct:68},
    {day:7,title:'Glacier Camp → Dhaulagiri Base Camp',sub:'4,750m · ~4 hrs · 8,167m giant looms',pct:87},
    {day:8,title:'Base Camp exploration day',sub:'4,750m · Rest and acclimatise',pct:87},
    {day:9,title:'Cross French Pass 5,360m',sub:'Highest point — phenomenal views',pct:100,highlight:true},
    {day:10,title:'Dhampus Pass → Hidden Valley',sub:'5,050m · Alpine valley camp',pct:93},
    {day:11,title:'Hidden Valley → Marpha',sub:'2,670m · Long descent to Kali Gandaki',pct:49},
    {day:12,title:'Marpha → Tukuche',sub:'2,590m · ~3 hrs · Apple orchards',pct:48},
    {day:13,title:'Tukuche → Jomsom',sub:'2,720m · Wind valley walking',pct:50},
    {day:14,title:'Fly Jomsom → Pokhara → Kathmandu',sub:'Mountain flight',pct:10},
    {day:15,title:'Kathmandu free day',sub:'Rest and optional sightseeing',pct:5},
    {day:16,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:17,title:'Kathmandu free day',sub:'Optional Bhaktapur or Patan tour',pct:5},
    {day:18,title:'Kathmandu buffer day',sub:'',pct:5},
    {day:19,title:'Kathmandu free day',sub:'',pct:5},
    {day:20,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  dolpo:[
    {day:1,title:'Fly Kathmandu → Nepalgunj → Juphal',sub:'2,475m · Two small flights',pct:45},
    {day:2,title:'Juphal → Dunai',sub:'2,145m · ~4 hrs · District headquarters',pct:39},
    {day:3,title:'Dunai → Tarakot',sub:'2,540m · ~5 hrs · Remote valley',pct:46},
    {day:4,title:'Tarakot → Laisicap',sub:'3,100m · ~5 hrs · Entering deep Dolpo',pct:57},
    {day:5,title:'Laisicap → Chhepka',sub:'3,250m · ~5 hrs · Bon monasteries',pct:59},
    {day:6,title:'Chhepka → Ringmo (Phoksundo Lake)',sub:'3,611m · Sacred turquoise lake!',pct:66,highlight:true},
    {day:7,title:'Phoksundo Lake exploration',sub:'3,611m · Swim, meditate, explore',pct:66},
    {day:8,title:'Ringmo → Phoksundo La High Camp',sub:'4,800m · Pre-pass camp',pct:88},
    {day:9,title:'Cross Phoksundo La 5,100m',sub:'Enter Inner Dolpo — most remote Nepal',pct:93},
    {day:10,title:'Shey Gompa arrival',sub:'4,200m · 13th-century crystal mountain monastery',pct:77},
    {day:11,title:'Shey Gompa exploration',sub:'4,200m · Spiritual heart of Dolpo',pct:77},
    {day:12,title:'Shey → Saldang',sub:'3,770m · Tibetan-culture village',pct:69},
    {day:13,title:'Saldang → Namgung',sub:'4,100m · ~5 hrs',pct:75},
    {day:14,title:'Namgung → Dho Tarap',sub:'4,080m · ~5 hrs · Huge village',pct:75},
    {day:15,title:'Dho Tarap → Tarap valley rest',sub:'4,080m · Acclimatise',pct:75},
    {day:16,title:'Tarap → Laisicap',sub:'3,100m · Begin return',pct:57},
    {day:17,title:'Laisicap → Dunai',sub:'2,145m · Long return day',pct:39},
    {day:18,title:'Dunai → Juphal',sub:'2,475m · Final trail day',pct:45},
    {day:19,title:'Fly Juphal → Nepalgunj → Kathmandu',sub:'Two-flight return',pct:10},
    {day:20,title:'Kathmandu free day',sub:'Debrief and rest',pct:5},
    {day:21,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:22,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  helambu:[
    {day:1,title:'Drive Kathmandu → Sundarijal, trek to Pati Bhanjyang',sub:'1,770m · ~4 hrs',pct:32},
    {day:2,title:'Pati Bhanjyang → Chisapani',sub:'2,215m · ~5 hrs · Panoramic Himalaya ridge',pct:41},
    {day:3,title:'Chisapani → Gul Bhanjyang',sub:'2,130m · ~5 hrs · Forest trail',pct:39},
    {day:4,title:'Gul Bhanjyang → Tharepati',sub:'3,640m · ~6 hrs · Summit meadow',pct:67},
    {day:5,title:'Tharepati → Nakote',sub:'2,340m · ~5 hrs · Helambu valley descent',pct:43},
    {day:6,title:'Nakote → Tarkeghyang',sub:'2,560m · ~3 hrs · Sherpa village and gompa',pct:47},
    {day:7,title:'Tarkeghyang → Melamchi Pul Bazaar → Kathmandu',sub:'Drive back ~2 hrs',pct:10},
  ],
  rolwaling:[
    {day:1,title:'Drive Kathmandu → Simigaon',sub:'2,020m · ~8 hrs road',pct:37},
    {day:2,title:'Simigaon → Gongar',sub:'2,400m · ~5 hrs · Rolwaling valley entry',pct:44},
    {day:3,title:'Gongar → Beding',sub:'3,680m · ~6 hrs · Sacred Sherpa village',pct:67},
    {day:4,title:'Beding acclimatisation day',sub:'3,680m · Monastery exploration',pct:67},
    {day:5,title:'Beding → Na',sub:'4,180m · ~4 hrs · Yak herders camp',pct:76},
    {day:6,title:'Na → Tsho Rolpa Lake',sub:'4,580m · Glacial lake at foot of peaks',pct:84},
    {day:7,title:'Tsho Rolpa → Tashi Lapcha Base Camp',sub:'4,800m · Pre-pass camp',pct:88},
    {day:8,title:'Cross Tashi Lapcha Pass 5,755m',sub:'Highest point — glacier crossing!',pct:100,highlight:true},
    {day:9,title:'Descent to Thame',sub:'3,820m · Enter Khumbu region',pct:70},
    {day:10,title:'Thame → Namche Bazaar',sub:'3,440m · ~4 hrs',pct:63},
    {day:11,title:'Namche → Phakding',sub:'2,610m · ~4 hrs',pct:48},
    {day:12,title:'Phakding → Lukla',sub:'2,860m · ~3 hrs',pct:52},
    {day:13,title:'Fly Lukla → Kathmandu',sub:'Return flight',pct:10},
    {day:14,title:'Kathmandu free day',sub:'Rest and sightseeing',pct:5},
    {day:15,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:16,title:'Kathmandu free day',sub:'Optional Bhaktapur tour',pct:5},
    {day:17,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
    {day:18,title:'Final departure buffer',sub:'',pct:0},
  ],
  tsum:[
    {day:1,title:'Drive Kathmandu → Soti Khola',sub:'700m · ~8 hrs · Tsum trailhead',pct:13},
    {day:2,title:'Soti Khola → Machha Khola',sub:'930m · ~5 hrs · River gorge',pct:17},
    {day:3,title:'Machha Khola → Lokpa (Tsum junction)',sub:'1,100m · ~5 hrs',pct:20},
    {day:4,title:'Lokpa → Chhekampar',sub:'3,050m · ~6 hrs · Enter sacred Tsum Valley',pct:56},
    {day:5,title:'Chhekampar → Nile',sub:'3,361m · ~4 hrs · Ancient mani walls',pct:62},
    {day:6,title:'Nile → Mu Gompa',sub:'3,700m · ~4 hrs · Oldest gompa in valley',pct:68,highlight:true},
    {day:7,title:'Mu Gompa exploration day',sub:'3,700m · Nuns, monks, sacred caves',pct:68},
    {day:8,title:'Mu Gompa → Rachen Gompa',sub:'3,800m · ~3 hrs · Nunnery visit',pct:70},
    {day:9,title:'Rachen → Chhekampar',sub:'3,050m · Begin return',pct:56},
    {day:10,title:'Chhekampar → Lokpa',sub:'1,100m · ~6 hrs · Descend valley',pct:20},
    {day:11,title:'Lokpa → Jagat (Manaslu route)',sub:'1,410m · ~5 hrs',pct:26},
    {day:12,title:'Jagat → Deng',sub:'1,860m · ~5 hrs',pct:34},
    {day:13,title:'Deng → Namrung',sub:'2,630m · ~5 hrs',pct:48},
    {day:14,title:'Namrung → Samagaon',sub:'3,530m · Manaslu views',pct:65},
    {day:15,title:'Samagaon → Soti Khola (drive)',sub:'Return journey',pct:13},
    {day:16,title:'Drive Soti Khola → Kathmandu',sub:'~8 hrs road',pct:10},
  ],
  narphu:[
    {day:1,title:'Drive Kathmandu → Besisahar',sub:'800m · ~6 hrs · Annapurna trailhead',pct:15},
    {day:2,title:'Besisahar → Koto (via Chame)',sub:'2,600m · Drive and trek · Permit checkpoint',pct:48},
    {day:3,title:'Koto → Meta',sub:'3,560m · ~5 hrs · Enter Nar Phu restricted area',pct:65},
    {day:4,title:'Meta → Kyang',sub:'3,840m · ~4 hrs · Tibetan-influenced terrain',pct:70},
    {day:5,title:'Kyang → Phu Village',sub:'4,080m · ~5 hrs · Remote Phu ancient village',pct:75},
    {day:6,title:'Phu exploration and acclimatisation',sub:'4,080m · Tashi Lhakhang monastery',pct:75},
    {day:7,title:'Phu → Himlung Base Camp',sub:'4,950m · ~5 hrs · Glacial plateau',pct:91},
    {day:8,title:'Base Camp → Kyang via Phu La 5,190m',sub:'High point of the trek!',pct:100,highlight:true},
    {day:9,title:'Kyang → Nar Village',sub:'4,110m · ~4 hrs · Second hidden valley',pct:75},
    {day:10,title:'Nar exploration day',sub:'4,110m · Traditional Tibetan village life',pct:75},
    {day:11,title:'Nar → Ngwal via Kangla Pass 5,320m',sub:'Remote high pass crossing',pct:98},
    {day:12,title:'Ngwal → Manang',sub:'3,519m · Rejoin Annapurna Circuit',pct:65},
    {day:13,title:'Manang → Chame',sub:'2,710m · Descent',pct:50},
    {day:14,title:'Chame → Besisahar → Kathmandu',sub:'Drive back ~6 hrs',pct:10},
  ],
  poonhill:[
    {day:1,title:'Drive Kathmandu → Pokhara · Drive Pokhara → Nayapul',sub:'1,070m · Begin trek',pct:20},
    {day:2,title:'Nayapul → Ghorepani',sub:'2,860m · ~6 hrs · Steep forested climb',pct:52},
    {day:3,title:'Poon Hill sunrise (3,210m) → Tadapani',sub:'Dawn panorama: Dhaulagiri, Annapurna, Machapuchare!',pct:59,highlight:true},
    {day:4,title:'Tadapani → Ghandruk',sub:'1,940m · ~4 hrs · Large Gurung village',pct:36},
    {day:5,title:'Ghandruk → Nayapul → drive Pokhara',sub:'~4 hrs walk · Lakeside dinner',pct:20},
  ],
  gosaikunda:[
    {day:1,title:'Drive Kathmandu → Dhunche',sub:'1,950m · ~5 hrs road · Trek start',pct:36},
    {day:2,title:'Dhunche → Sing Gompa',sub:'3,330m · ~5 hrs · Cheese factory stop',pct:61},
    {day:3,title:'Sing Gompa → Gosaikunda Lake',sub:'4,380m · ~4 hrs · Sacred Hindu/Buddhist lake',pct:80,highlight:true},
    {day:4,title:'Gosaikunda exploration day',sub:'4,380m · Three lakes, ancient shrines',pct:80},
    {day:5,title:'Gosaikunda → Ghopte via Lauribina La 4,610m',sub:'Highest pass of trek · sweeping views',pct:85},
    {day:6,title:'Ghopte → Tharepati',sub:'3,640m · ~4 hrs',pct:67},
    {day:7,title:'Tharepati → Melamchi Pul Bazaar',sub:'870m · Long descent',pct:16},
    {day:8,title:'Drive Melamchi → Kathmandu',sub:'~2 hrs road',pct:10},
    {day:9,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  khopra:[
    {day:1,title:'Drive Kathmandu → Pokhara',sub:'~6 hrs road · Lakeside hotel',pct:15},
    {day:2,title:'Drive Pokhara → Nayapul, trek to Tikhedhunga',sub:'1,540m · ~3 hrs walk',pct:28},
    {day:3,title:'Tikhedhunga → Ghorepani',sub:'2,860m · ~5 hrs',pct:52},
    {day:4,title:'Ghorepani → Khopra Danda',sub:'3,660m · ~4 hrs · Off main circuit',pct:67},
    {day:5,title:'Khopra Danda exploration',sub:'3,660m · Panoramic sunrise views',pct:67,highlight:true},
    {day:6,title:'Khopra → Swanta',sub:'1,800m · ~5 hrs · Village descent',pct:33},
    {day:7,title:'Swanta → Tatopani',sub:'1,190m · Hot spring soak!',pct:22},
    {day:8,title:'Tatopani → Beni → drive Pokhara',sub:'~3 hrs walk + drive',pct:10},
    {day:9,title:'Pokhara rest day',sub:'Lake Phewa, paragliding option',pct:10},
    {day:10,title:'Drive/fly Pokhara → Kathmandu · Departure',sub:'Journey concludes',pct:5},
  ],
  pikey:[
    {day:1,title:'Drive Kathmandu → Dhap',sub:'2,630m · ~5 hrs road',pct:48},
    {day:2,title:'Dhap → Pikey village',sub:'3,640m · ~5 hrs · Forest trail',pct:67},
    {day:3,title:'Summit Pikey Peak 4,065m',sub:'Best sunrise Everest view outside Khumbu!',pct:100,highlight:true},
    {day:4,title:'Pikey Peak → Junbesi',sub:'2,675m · ~6 hrs · Sherpa monastery',pct:49},
    {day:5,title:'Junbesi → Salleri',sub:'2,375m · ~4 hrs',pct:44},
    {day:6,title:'Fly Salleri → Kathmandu',sub:'Small aircraft flight',pct:10},
    {day:7,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  island:[
    {day:1,title:'Fly Kathmandu → Lukla, trek to Phakding',sub:'2,610m · ~3 hrs',pct:40},
    {day:2,title:'Phakding → Namche Bazaar',sub:'3,440m · ~5 hrs',pct:53},
    {day:3,title:'Namche acclimatisation day',sub:'3,440m · Hike to Everest View Hotel',pct:53},
    {day:4,title:'Namche → Tengboche',sub:'3,860m · ~5 hrs',pct:59},
    {day:5,title:'Tengboche → Dingboche',sub:'4,410m · ~5 hrs',pct:67},
    {day:6,title:'Dingboche acclimatisation',sub:'4,410m · Hike to Nagarjun Hill',pct:67},
    {day:7,title:'Dingboche → Chhukung',sub:'4,730m · ~3 hrs · Island Peak base area',pct:72},
    {day:8,title:'Chhukung → Island Peak Base Camp',sub:'5,100m · ~3 hrs · Acclimatise',pct:78},
    {day:9,title:'Base Camp → High Camp',sub:'5,600m · Technical preparation day',pct:85},
    {day:10,title:'Summit Island Peak 6,189m!',sub:'Alpine start · crampons · fixed ropes · summit!',pct:100,highlight:true},
    {day:11,title:'High Camp → Chhukung',sub:'4,730m · Descent after summit',pct:72},
    {day:12,title:'Chhukung → Namche',sub:'3,440m · Long descent',pct:53},
    {day:13,title:'Namche → Lukla',sub:'2,860m · Final trail day',pct:44},
    {day:14,title:'Fly Lukla → Kathmandu',sub:'Return flight',pct:10},
    {day:15,title:'Kathmandu — rest day',sub:'Debrief and celebration',pct:5},
    {day:16,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:17,title:'Kathmandu free day',sub:'Sightseeing optional',pct:5},
    {day:18,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  makalu:[
    {day:1,title:'Fly Kathmandu → Tumlingtar',sub:'400m · Small aircraft · Trek trailhead',pct:7},
    {day:2,title:'Tumlingtar → Chichila',sub:'1,980m · ~5 hrs · Arun valley',pct:37},
    {day:3,title:'Chichila → Num',sub:'1,560m · ~4 hrs · Trail village',pct:29},
    {day:4,title:'Num → Seduwa',sub:'1,500m · ~4 hrs · River crossing',pct:28},
    {day:5,title:'Seduwa → Tashigaon',sub:'2,100m · ~4 hrs · Last village',pct:39},
    {day:6,title:'Tashigaon → Khongma La',sub:'4,173m · ~7 hrs · Steep high-pass day',pct:77},
    {day:7,title:'Khongma La → Dobate',sub:'3,630m · ~4 hrs · Alpine descent',pct:67},
    {day:8,title:'Dobate → Yangri Kharka',sub:'3,570m · ~3 hrs · Meadow camp',pct:66},
    {day:9,title:'Yangri Kharka → Makalu Base Camp 4,870m',sub:'Makalu 8,481m towers above you!',pct:90,highlight:true},
    {day:10,title:'Base Camp exploration day',sub:'4,870m · Glacial scenery and acclimatise',pct:90},
    {day:11,title:'Base Camp → Yangri Kharka',sub:'3,570m · Begin return',pct:66},
    {day:12,title:'Yangri Kharka → Dobate',sub:'3,630m',pct:67},
    {day:13,title:'Dobate → Tashigaon',sub:'2,100m · Long descent',pct:39},
    {day:14,title:'Tashigaon → Num',sub:'1,560m',pct:29},
    {day:15,title:'Num → Tumlingtar',sub:'400m · Final trail day',pct:7},
    {day:16,title:'Fly Tumlingtar → Kathmandu',sub:'Return flight',pct:5},
    {day:17,title:'Kathmandu free day',sub:'Rest',pct:5},
    {day:18,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:19,title:'Kathmandu free day',sub:'',pct:5},
    {day:20,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  rara:[
    {day:1,title:'Fly Kathmandu → Nepalgunj',sub:'150m · Domestic flight',pct:3},
    {day:2,title:'Fly Nepalgunj → Jumla',sub:'2,370m · Mountain airstrip arrival',pct:44},
    {day:3,title:'Jumla → Padmara',sub:'2,837m · ~5 hrs · Pine forest trail',pct:52},
    {day:4,title:'Padmara → Bumra',sub:'2,770m · ~4 hrs · Remote Mugu district',pct:51},
    {day:5,title:'Bumra → Rara Lake arrival',sub:'2,990m · First view of Nepal\'s largest lake!',pct:55,highlight:true},
    {day:6,title:'Rara Lake full exploration day',sub:'2,990m · Boating, birdwatching, Murma Top hike',pct:55},
    {day:7,title:'Rara Lake → Pina',sub:'2,397m · ~4 hrs · Return route',pct:44},
    {day:8,title:'Pina → Gum Gadi',sub:'2,110m · ~5 hrs · Mugu district capital',pct:39},
    {day:9,title:'Gum Gadi → Jumla',sub:'2,370m · ~5 hrs · Karnali River valley',pct:44},
    {day:10,title:'Fly Jumla → Nepalgunj → Kathmandu',sub:'Two flights return',pct:5},
    {day:11,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  phoksundo:[
    {day:1,title:'Fly Kathmandu → Nepalgunj → Juphal',sub:'2,475m · Two small flights',pct:45},
    {day:2,title:'Juphal → Dunai',sub:'2,145m · ~4 hrs · District HQ',pct:39},
    {day:3,title:'Dunai → Ankhe',sub:'2,700m · ~5 hrs · Bheri River',pct:50},
    {day:4,title:'Ankhe → Raha Phaedi',sub:'3,100m · ~5 hrs · Canyon narrows',pct:57},
    {day:5,title:'Raha Phaedi → Phoksundo Lake (Ringmo)',sub:'3,611m · First view of the turquoise gem!',pct:66,highlight:true},
    {day:6,title:'Phoksundo Lake exploration',sub:'3,611m · Deepest lake in Nepal · waterfalls',pct:66},
    {day:7,title:'Ringmo → Palam',sub:'3,500m · ~4 hrs · Above the lake',pct:64},
    {day:8,title:'Palam → Phoksundo La High Camp',sub:'4,800m · Pre-pass camp',pct:88},
    {day:9,title:'Cross Phoksundo La 5,100m',sub:'Inner Dolpo gateway · remote views',pct:93},
    {day:10,title:'Descent to Shey area',sub:'4,200m · Return to Ringmo via alternate',pct:77},
    {day:11,title:'Ringmo → Dunai',sub:'2,145m · Long return',pct:39},
    {day:12,title:'Dunai → Juphal',sub:'2,475m · Final trail day',pct:45},
    {day:13,title:'Fly Juphal → Nepalgunj → Kathmandu',sub:'Two-flight return',pct:10},
    {day:14,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
  threepasses:[
    {day:1,title:'Fly Kathmandu → Lukla, trek to Phakding',sub:'2,610m · ~3 hrs',pct:40},
    {day:2,title:'Phakding → Namche Bazaar',sub:'3,440m · ~5 hrs',pct:53},
    {day:3,title:'Namche acclimatisation day',sub:'3,440m · Explore market, Sherpa museum',pct:53},
    {day:4,title:'Namche → Thame',sub:'3,820m · ~3 hrs · Renjo La approach valley',pct:58},
    {day:5,title:'Thame → Lungden',sub:'4,380m · ~5 hrs · High pasture',pct:67},
    {day:6,title:'Lungden → Cross Renjo La 5,360m → Gokyo',sub:'1st pass! · Everest panorama from summit',pct:82,highlight:true},
    {day:7,title:'Gokyo Ri summit day (5,357m)',sub:'Stunning views of all high peaks',pct:82},
    {day:8,title:'Gokyo → Cross Cho La 5,420m → Dzongla',sub:'2nd pass! · Technical glacier crossing',pct:83,highlight:true},
    {day:9,title:'Dzongla → Lobuche',sub:'4,940m · Rest before final push',pct:76},
    {day:10,title:'Lobuche → Gorak Shep → EBC',sub:'5,364m · Reach Everest Base Camp!',pct:82},
    {day:11,title:'Kala Patthar sunrise → Chhukung via Kongma La 5,535m',sub:'3rd and highest pass!',pct:100,highlight:true},
    {day:12,title:'Chhukung → Dingboche',sub:'4,410m · Recovery day',pct:68},
    {day:13,title:'Dingboche → Tengboche',sub:'3,860m · Long descent',pct:59},
    {day:14,title:'Tengboche → Namche',sub:'3,440m',pct:53},
    {day:15,title:'Namche → Lukla',sub:'2,860m · Final trail day',pct:44},
    {day:16,title:'Fly Lukla → Kathmandu',sub:'Return flight',pct:10},
    {day:17,title:'Kathmandu free day',sub:'Rest and celebration',pct:5},
    {day:18,title:'Kathmandu buffer day',sub:'Flight contingency',pct:5},
    {day:19,title:'Kathmandu free day',sub:'',pct:5},
    {day:20,title:'Departure from Kathmandu',sub:'Airport transfer',pct:0},
  ],
};

// Fallback: get itinerary for current trek
function getItinerary(id){ return ITINERARIES[id] || ITINERARIES['ebc']; }

const GUIDES = [
  {name:'Pemba Rai',role:'Senior Guide · 12 yrs',routes:'EBC, Manaslu, Gokyo, Three Passes',rating:5.0,trips:180,initials:'PR',bg:'#B5D4F4',color:'#0C447C',taan:'TAAN-4821',lang:'English, Nepali, Hindi'},
  {name:'Mingma Sherpa',role:'Lead Guide · 9 yrs',routes:'Annapurna Circuit, Langtang',rating:4.9,trips:134,initials:'MS',bg:'#C0DD97',color:'#27500A',taan:'TAAN-3912',lang:'English, Nepali'},
  {name:'Dawa Dorje',role:'Senior Guide · 7 yrs',routes:'EBC, Mera Peak, Island Peak',rating:4.9,trips:98,initials:'DD',bg:'#FAC775',color:'#412402',taan:'TAAN-5201',lang:'English, Nepali, German'},
  {name:'Nima Lama',role:'Guide · 5 yrs',routes:'Langtang, Helambu, Gosaikunda',rating:4.8,trips:62,initials:'NL',bg:'#F4C0D1',color:'#72243E',taan:'TAAN-6103',lang:'English, Nepali'},
  {name:'Tshering Wangdi',role:'Lead Guide · 10 yrs',routes:'Manaslu, Dolpo, Upper Mustang',rating:5.0,trips:145,initials:'TW',bg:'#AFA9EC',color:'#3C3489',taan:'TAAN-2847',lang:'English, Nepali, Tibetan'},
  {name:'Kami Dorji',role:'Guide · 6 yrs',routes:'Annapurna Circuit, ABC, Poon Hill',rating:4.8,trips:77,initials:'KD',bg:'#9FE1CB',color:'#085041',taan:'TAAN-7392',lang:'English, Nepali'},
  {name:'Pasang Tamang',role:'Senior Guide · 11 yrs',routes:'Three Passes, Island Peak, EBC',rating:4.9,trips:158,initials:'PT',bg:'#F5C4B3',color:'#712B13',taan:'TAAN-1923',lang:'English, Nepali, French'},
  {name:'Ang Rita Sherpa',role:'Lead Guide · 14 yrs',routes:'Kanchenjunga, Makalu, Rolwaling',rating:5.0,trips:210,initials:'AR',bg:'#D3D1C7',color:'#444441',taan:'TAAN-0814',lang:'English, Nepali'},
];

const BLOG_POSTS = [
  {title:'10 things nobody tells you about EBC',date:'Apr 15, 2026',read:'8 min',tag:'Tips',color:'#2d4055',author:'Pemba Rai'},
  {title:'Best teahouses on Annapurna Circuit 2026',date:'Mar 28, 2026',read:'6 min',tag:'Lodges',color:'#2d4535',author:'Mingma Sherpa'},
  {title:'How to prevent AMS in Nepal — complete guide',date:'Mar 10, 2026',read:'10 min',tag:'Safety',color:'#4a3520',author:'Dr. Sara Lindqvist'},
  {title:'Upper Mustang: the last forbidden kingdom',date:'Feb 20, 2026',read:'12 min',tag:'Destinations',color:'#3a2d4a',author:'Tshering Wangdi'},
  {title:'Gear checklist: what to actually pack for Nepal',date:'Feb 5, 2026',read:'9 min',tag:'Gear',color:'#1e3a4a',author:'Dawa Dorje'},
  {title:'Nepal trekking permits explained (2026)',date:'Jan 18, 2026',read:'7 min',tag:'Permits',color:'#3a4520',author:'HimalTrek Team'},
  {title:'Trekking solo in Nepal: is it safe?',date:'Jan 5, 2026',read:'8 min',tag:'Safety',color:'#4a3a20',author:'Nima Lama'},
  {title:'Poon Hill vs Ghorepani — which is better?',date:'Dec 20, 2025',read:'5 min',tag:'Comparisons',color:'#2d3a1e',author:'Kami Dorji'},
  {title:'Monsoon trekking in Nepal: the hidden gems',date:'Dec 8, 2025',read:'7 min',tag:'Seasonal',color:'#1e2d4a',author:'HimalTrek Team'},
];

const REVIEWS = [
  {name:'James Mitchell',country:'Australia',trek:'EBC',rating:5,text:'"Permit system made everything stress-free. TIMS and park entries sorted before we landed."',initials:'JM',bg:'#B5D4F4',color:'#0C447C'},
  {name:'Sara Lindqvist',country:'Sweden',trek:'Annapurna',rating:5,text:'"Altitude checker flagged my symptoms on day 3. Rested in Namche and had zero AMS issues."',initials:'SL',bg:'#C0DD97',color:'#27500A'},
  {name:'Ravi Kumar',country:'India',trek:'Langtang',rating:5,text:'"Teahouse booking was seamless. Confirmed beds the entire Langtang route in peak season."',initials:'RK',bg:'#FAC775',color:'#412402'},
  {name:'Elena Muñoz',country:'Spain',trek:'EBC',rating:5,text:'"Guide Mingma spotted early altitude symptoms and we adjusted our pace. Superb service."',initials:'EM',bg:'#F4C0D1',color:'#72243E'},
  {name:'Thomas Weber',country:'Germany',trek:'Manaslu',rating:5,text:'"Offline maps saved us when we lost signal for 3 days. Works flawlessly at 5,000m."',initials:'TW',bg:'#AFA9EC',color:'#3C3489'},
  {name:'Yuki Tanaka',country:'Japan',trek:'Three Passes',rating:5,text:'"Three high passes in 20 days was incredibly rewarding. Guide Pasang was superb."',initials:'YT',bg:'#9FE1CB',color:'#085041'},
];

const permitData = {
  tims:{name:'TIMS Card',fee:'NPR 2,000 (~$15)',amount:2000,desc:'Required for ALL trekking routes in Nepal.'},
  sagarmatha:{name:'Sagarmatha National Park',fee:'NPR 3,000 (~$22)',amount:3000,desc:'Required for EBC, Gokyo, Three Passes, Island Peak.'},
  annapurna:{name:'ACAP Permit',fee:'NPR 3,000 (~$22)',amount:3000,desc:'Required for all Annapurna Conservation Area routes.'},
  manaslu:{name:'Manaslu Restricted Area',fee:'$70/week',amount:9240,desc:'Required for Manaslu Circuit and Tsum Valley.'},
  mustang:{name:'Upper Mustang Permit',fee:'$500/10 days',amount:66000,desc:'Required for Upper Mustang restricted area.'},
  restricted:{name:'Other Restricted Area',fee:'$50–500/week',amount:6600,desc:'Dolpo, Nar-Phu, Humla, Kanchenjunga.'},
};

// ── State ─────────────────────────────────────
let currentPage = 'home';
let currentTrek = TREKS[0];
let wishlist = JSON.parse(localStorage.getItem('ht_wishlist') || '[]');
let trekkerCount = 1;
let daysExpanded = false;
let activeTab = 'itinerary';
let currentStep = 1;
let selectedPermits = ['tims'];
let selectedPayment = 'esewa';
let calYear = 2026, calMonth = 3;
let selectedStart = null, selectedEnd = null;
let searchDest = null, searchDiff = null;
let openDD = null;
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WDS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

// ── MTN paths for cards ───────────────────────
const MTN_PATHS = [
  'M0 160 L70 48 L130 90 L185 14 L245 62 L300 28 L300 160Z',
  'M0 160 L55 58 L115 94 L190 20 L250 66 L300 38 L300 160Z',
  'M0 160 L65 72 L140 100 L210 32 L300 64 L300 160Z',
  'M0 160 L80 46 L155 84 L220 16 L300 54 L300 160Z',
  'M0 160 L42 88 L105 112 L178 28 L240 72 L300 48 L300 160Z',
  'M0 160 L60 64 L136 96 L200 24 L268 60 L300 42 L300 160Z',
  'M0 160 L74 52 L148 88 L212 18 L280 58 L300 32 L300 160Z',
  'M0 160 L50 80 L120 108 L195 26 L255 70 L300 44 L300 160Z',
];
const MTN_FILLS = ['#1e2d3d','#1e3020','#28203a','#2e2010','#102030','#222a10','#1a2535','#241810'];
function mkMtn(i){ return MTN_PATHS[i % MTN_PATHS.length]; }
function mkFill(i){ return MTN_FILLS[i % MTN_FILLS.length]; }

// ── Router ────────────────────────────────────
const ALL_PAGES = ['home','detail','permits','guides','blog','about','plan','signin','privacy','terms','contact','careers','wishlist'];
function showPage(id, trekId) {
  ALL_PAGES.forEach(p => { const el = document.getElementById('page-'+p); if(el) el.style.display='none'; });
  closeDD();
  const t = document.getElementById('page-'+id);
  if(t) t.style.display = 'block';
  window.scrollTo({top:0,behavior:'smooth'});
  currentPage = id;
  document.querySelectorAll('.nav__link').forEach(l=>l.classList.remove('active'));
  const m = {home:'nl-home',permits:'nl-permits',guides:'nl-guides',blog:'nl-blog',about:'nl-about',wishlist:'nl-wishlist'};
  if(m[id]){ const el=document.getElementById(m[id]); if(el) el.classList.add('active'); }
  if(id==='detail'){ if(trekId) currentTrek=TREKS.find(t=>t.id===trekId)||TREKS[0]; renderDetail(); }
  if(id==='permits'){ currentStep=1; renderStep(1); }
  if(id==='guides') renderGuides();
  if(id==='blog') renderBlog();
  if(id==='wishlist') renderWishlist();
  if(id==='home') renderTrekGrid(TREKS);
}

// ── Toast ─────────────────────────────────────
function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ── Modal ─────────────────────────────────────
function openModal(type) {
  const c = document.getElementById('modal-root');
  let h = '';
  if(type==='book-confirm'){
    const sub=currentTrek.price*trekkerCount, total=sub+Math.round(sub*.05);
    h=`<div class="modal-overlay"><div class="modal" style="text-align:center;">
      <div style="width:56px;height:56px;border-radius:50%;background:var(--green-lt);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13L10 18L21 7" stroke="#3B6D11" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="modal__title">Booking confirmed!</div>
      <div class="modal__sub" style="margin-bottom:16px;">Confirmation sent to your email.</div>
      <div style="background:var(--cream);border-radius:10px;padding:14px;margin-bottom:18px;text-align:left;">
        <div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;"><span style="color:var(--muted);">Booking ref</span><span style="font-weight:500;">HTK-2026-${Math.floor(10000+Math.random()*90000)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;"><span style="color:var(--muted);">Trek</span><span>${currentTrek.name}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;"><span style="color:var(--muted);">Trekkers</span><span>${trekkerCount}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0;font-weight:500;"><span style="color:var(--muted);">Total paid</span><span>$${total.toLocaleString()}</span></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button class="btn btn--dark" onclick="showPage('permits');closeModal()">Apply for permits</button>
        <button class="btn btn--ghost" onclick="closeModal()">Done</button>
      </div>
    </div></div>`;
  } else if(type==='write-review'){
    h=`<div class="modal-overlay" onclick="if(event.target===this)closeModal()"><div class="modal">
      <button class="modal__close" onclick="closeModal()">×</button>
      <div class="modal__title">Write a review</div><div class="modal__sub">Help other trekkers with your experience.</div>
      <div style="margin-bottom:14px;"><div class="form-label" style="margin-bottom:7px;">Rating</div>
        <div style="display:flex;gap:6px;" id="star-row">${[1,2,3,4,5].map(i=>`<span style="font-size:26px;cursor:pointer;color:var(--gold);" onclick="rateReview(${i})">★</span>`).join('')}</div></div>
      <div class="form-group" style="margin-bottom:12px;"><label class="form-label">Trek completed</label><select class="form-select">${TREKS.map(t=>`<option>${t.name}</option>`).join('')}</select></div>
      <div class="form-group" style="margin-bottom:12px;"><label class="form-label">Your review</label><textarea class="form-textarea" rows="4" placeholder="How was your experience?"></textarea></div>
      <div class="form-group" style="margin-bottom:18px;"><label class="form-label">Your name</label><input class="form-input" placeholder="James M."/></div>
      <button class="btn btn--dark btn--full" onclick="closeModal();toast('Review submitted — thank you!')">Submit review</button>
    </div></div>`;
  } else if(type==='contact-guide'){
    h=`<div class="modal-overlay" onclick="if(event.target===this)closeModal()"><div class="modal">
      <button class="modal__close" onclick="closeModal()">×</button>
      <div class="modal__title">Talk to a guide</div><div class="modal__sub">We'll connect you within 2 hours.</div>
      <div class="form-grid" style="margin-bottom:12px;">
        <div class="form-group"><label class="form-label">Name</label><input class="form-input" placeholder="Your name"/></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" placeholder="you@email.com"/></div>
      </div>
      <div class="form-group" style="margin-bottom:12px;"><label class="form-label">Trek of interest</label><select class="form-select">${TREKS.map(t=>`<option>${t.name}</option>`).join('')}<option>Not sure yet</option></select></div>
      <div class="form-group" style="margin-bottom:18px;"><label class="form-label">Your question</label><textarea class="form-textarea" rows="3" placeholder="Experience level, dates, group size..."></textarea></div>
      <button class="btn btn--dark btn--full" onclick="closeModal();toast('Message sent! A guide will reply within 2 hours.')">Send message</button>
    </div></div>`;
  } else if(type==='app-download'){
    h=`<div class="modal-overlay" onclick="if(event.target===this)closeModal()"><div class="modal" style="text-align:center;">
      <button class="modal__close" onclick="closeModal()">×</button>
      <div style="width:54px;height:54px;background:var(--navy);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L22 22H2L12 2Z" fill="#E9B84A"/></svg></div>
      <div class="modal__title">Get HimalTrek app</div><div class="modal__sub">Offline maps, SOS, permits — all on your phone.</div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
        <button class="btn btn--dark" onclick="toast('Opening App Store…');closeModal()">App Store</button>
        <button class="btn btn--dark" onclick="toast('Opening Google Play…');closeModal()">Google Play</button>
      </div>
    </div></div>`;
  }
  c.innerHTML = h;
}
function closeModal(){ document.getElementById('modal-root').innerHTML=''; }
function rateReview(n){ document.querySelectorAll('#star-row span').forEach((s,i)=>s.style.color=i<n?'var(--gold)':'#ddd'); }

// ── Search Bar ────────────────────────────────
function closeDD() {
  document.querySelectorAll('.sf-dropdown').forEach(d=>d.remove());
  openDD = null;
}

function toggleDD(type, el) {
  if(openDD===type){ closeDD(); return; }
  closeDD();
  openDD = type;

  const dd = document.createElement('div');
  dd.className = 'sf-dropdown' + (type==='diff'?' sf-dropdown--right':'');
  dd.id = 'dd-'+type;

  if(type==='dest'){
    dd.innerHTML = `
      <input class="dd-search-input" id="dest-input" placeholder="Search any trek…" autocomplete="off" oninput="filterDestList(this.value)"/>
      <div class="dd-list" id="dest-list">
        <div class="dd-section-label">All 24 routes</div>
        ${TREKS.map(t=>`<div class="dd-item${searchDest===t.id?' selected':''}" onclick="pickDest('${t.id}')">
          <div class="dd-item__name">${t.name}</div>
          <div class="dd-item__sub">${t.region} · ${t.days} days · $${t.price} · ${t.difficulty}</div>
        </div>`).join('')}
      </div>`;
  } else if(type==='dates'){
    dd.innerHTML = buildCalHTML();
  } else if(type==='diff'){
    dd.innerHTML = `
      <div class="diff-option${searchDiff===null?' selected':''}" onclick="pickDiff(null)">
        <div class="diff-option__icon" style="background:#F1EFE8;">🏔</div>
        <div><div class="diff-option__name">All levels</div><div class="diff-option__desc">Show all 24 treks regardless of difficulty</div></div>
      </div>
      <div class="diff-option${searchDiff==='easy'?' selected':''}" onclick="pickDiff('easy')">
        <div class="diff-option__icon" style="background:var(--green-lt);">🌿</div>
        <div><div class="diff-option__name">Easy – Moderate</div><div class="diff-option__desc">Suitable for beginners with basic fitness. Up to 4,000m.</div></div>
      </div>
      <div class="diff-option${searchDiff==='moderate'?' selected':''}" onclick="pickDiff('moderate')">
        <div class="diff-option__icon" style="background:var(--amber-lt);">⛰️</div>
        <div><div class="diff-option__name">Moderate</div><div class="diff-option__desc">Good fitness required. Passes up to 5,400m.</div></div>
      </div>
      <div class="diff-option${searchDiff==='strenuous'?' selected':''}" onclick="pickDiff('strenuous')">
        <div class="diff-option__icon" style="background:var(--red-lt);">🏔</div>
        <div><div class="diff-option__name">Strenuous</div><div class="diff-option__desc">Experienced trekkers only. High passes and remote terrain.</div></div>
      </div>`;
  }

  el.style.position = 'relative';
  el.appendChild(dd);
  if(type==='dest') setTimeout(()=>document.getElementById('dest-input')?.focus(),50);
}

function filterDestList(val){
  const list = document.getElementById('dest-list');
  if(!list) return;
  const filtered = TREKS.filter(t=>
    t.name.toLowerCase().includes(val.toLowerCase()) ||
    t.region.toLowerCase().includes(val.toLowerCase()) ||
    t.difficulty.toLowerCase().includes(val.toLowerCase())
  );
  list.innerHTML = (val?'':'<div class="dd-section-label">All 24 routes</div>') +
    filtered.map(t=>`<div class="dd-item${searchDest===t.id?' selected':''}" onclick="pickDest('${t.id}')">
      <div class="dd-item__name">${t.name}</div>
      <div class="dd-item__sub">${t.region} · ${t.days} days · $${t.price} · ${t.difficulty}</div>
    </div>`).join('') +
    (filtered.length===0?`<div style="padding:12px;font-size:13px;color:var(--muted);text-align:center;">No treks found for "${val}"</div>`:'');
}

function pickDest(id){
  searchDest = id;
  const t = TREKS.find(x=>x.id===id);
  const el = document.getElementById('sf-dest-val');
  if(el && t){ el.textContent=t.name; el.classList.remove('ph'); }
  closeDD();
}

function pickDiff(val){
  searchDiff = val;
  const el = document.getElementById('sf-diff-val');
  const labels = {null:'All levels',easy:'Easy – Moderate',moderate:'Moderate',strenuous:'Strenuous'};
  if(el){ el.textContent=labels[val]; el.classList.remove('ph'); }
  closeDD();
}

// ── Calendar ──────────────────────────────────
function buildCalHTML(){
  const firstDay = new Date(calYear,calMonth,1).getDay();
  const daysInMonth = new Date(calYear,calMonth+1,0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  let cells = WDS.map(d=>`<div class="cal-wd">${d}</div>`).join('');
  let dayCells = '';
  for(let i=0;i<firstDay;i++) dayCells+=`<div class="cal-day cal-day--empty"></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const ds=`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isPast = ds < todayStr;
    const isSel = ds===selectedStart||ds===selectedEnd;
    const isRange = selectedStart&&selectedEnd&&ds>selectedStart&&ds<selectedEnd;
    const isToday = ds===todayStr;
    const cls = ['cal-day',isPast?'cal-day--disabled':'',isSel?'cal-day--selected':'',isRange?'cal-day--range':'',isToday&&!isSel?'cal-day--today':''].filter(Boolean).join(' ');
    dayCells+=`<div class="${cls}"${!isPast?` onclick="pickDate('${ds}')"`:''}>${d}</div>`;
  }

  const startLabel = selectedStart || '–';
  const endLabel = selectedEnd || '–';

  return `<div class="cal-popup">
    <div class="cal-nav-row">
      <button class="cal-nav-btn" onclick="calNav(-1)">‹</button>
      <span class="cal-month-label">${MONTHS[calMonth]} ${calYear}</span>
      <button class="cal-nav-btn" onclick="calNav(1)">›</button>
    </div>
    <div class="cal-weekdays">${cells}</div>
    <div class="cal-days">${dayCells}</div>
    <div class="cal-date-display">
      <div class="cal-date-box"><div class="cal-date-box__label">Start date</div><div class="cal-date-box__val">${startLabel}</div></div>
      <div class="cal-date-box"><div class="cal-date-box__label">End date</div><div class="cal-date-box__val">${endLabel}</div></div>
    </div>
    <button class="cal-clear-btn" onclick="clearDates()">Clear dates</button>
  </div>`;
}

function calNav(dir){
  calMonth+=dir;
  if(calMonth>11){calMonth=0;calYear++;}
  if(calMonth<0){calMonth=11;calYear--;}
  const dd=document.getElementById('dd-dates');
  if(dd) dd.innerHTML=buildCalHTML();
}

function pickDate(ds){
  if(!selectedStart||(selectedStart&&selectedEnd)){
    selectedStart=ds; selectedEnd=null;
  } else if(ds>selectedStart){
    selectedEnd=ds;
    const el=document.getElementById('sf-dates-val');
    if(el){ el.textContent=selectedStart+' → '+selectedEnd; el.classList.remove('ph'); }
    setTimeout(closeDD,500);
  } else { selectedStart=ds; selectedEnd=null; }
  const dd=document.getElementById('dd-dates');
  if(dd) dd.innerHTML=buildCalHTML();
}

function clearDates(){
  selectedStart=null; selectedEnd=null;
  const el=document.getElementById('sf-dates-val');
  if(el){ el.textContent='Select dates'; el.classList.add('ph'); }
  const dd=document.getElementById('dd-dates');
  if(dd) dd.innerHTML=buildCalHTML();
}

function runSearch(){
  closeDD();
  let list = TREKS;
  if(searchDest) list=list.filter(t=>t.id===searchDest);
  if(searchDiff) list=list.filter(t=>t.difficulty===searchDiff);
  renderTrekGrid(list);
  const s=document.getElementById('routes-section');
  if(s) s.scrollIntoView({behavior:'smooth'});
  toast(`Found ${list.length} trek${list.length!==1?'s':''}`);
}

// ── Trek Grid ─────────────────────────────────
function renderTrekGrid(list){
  const g=document.getElementById('trek-grid');
  if(!g) return;
  g.innerHTML=list.map((t,i)=>`
    <div class="trek-card" onclick="showPage('detail','${t.id}')">
      <div class="trek-card__img" style="background:${t.color};">
        <svg class="mtn" style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 300 160" preserveAspectRatio="none">
          <path d="${mkMtn(i)}" fill="${mkFill(i)}" opacity="0.6"/>
        </svg>
        <span class="trek-card__diff" style="${t.difficulty==='easy'?'background:rgba(59,109,17,0.7);':t.difficulty==='moderate'?'background:rgba(90,70,10,0.5);':''}">${t.difficulty==='easy'?'Easy–Mod':t.difficulty==='moderate'?'Moderate':'Strenuous'}</span>
        <button class="trek-card__heart ${wishlist.includes(t.id)?'liked':''}" onclick="event.stopPropagation();toggleWishlist('${t.id}',this)" title="Save to wishlist">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 14s-6-4.35-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 3.65-6 8-6 8z" stroke="white" stroke-width="1.4" fill="${wishlist.includes(t.id)?'#E24B4A':'none'}"/></svg>
        </button>
      </div>
      <div class="trek-card__body">
        <div class="trek-card__region">${t.region}</div>
        <div class="trek-card__name">${t.name}</div>
        <div class="trek-card__meta"><span>${t.days} days</span><span>·</span><span>${t.alt}m</span><span>·</span><span>From $${t.price}</span></div>
        <div class="trek-card__short">${t.short}</div>
        <div class="trek-card__foot">
          <div><div class="trek-card__from">Best: ${t.best}</div></div>
          <div class="trek-card__rating">★ ${t.rating} (${t.reviews})</div>
        </div>
      </div>
    </div>`).join('');
}

// ── Trek Detail ───────────────────────────────
function renderDetail(){
  const t=currentTrek;
  trekkerCount=1; daysExpanded=false; activeTab='itinerary';

  // Hero background
  const hero=document.getElementById('detail-hero');
  if(hero) hero.style.background=t.color;

  // Text fields
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('detail-badge', t.region+' Region · '+t.difficulty.charAt(0).toUpperCase()+t.difficulty.slice(1));
  set('detail-title', t.name);
  set('detail-meta',  '★ '+t.rating+' ('+t.reviews+' reviews) · '+t.difficulty.charAt(0).toUpperCase()+t.difficulty.slice(1)+' · '+t.days+' days · '+t.alt+'m max altitude');
  set('d-days',  t.days);
  set('d-alt',   t.alt+'m');
  set('d-price', '$'+t.price);
  set('d-dur',   t.days+' days');
  set('d-best',  t.best);
  set('d-start', t.start);

  // Update booking price per person display
  const ppe = document.getElementById('d-price-each');
  if(ppe) ppe.textContent = t.price;

  // Wishlist heart
  const dh=document.getElementById('detail-heart');
  if(dh) dh.className='trek-card__heart'+(wishlist.includes(t.id)?' liked':'');

  updateBookingCalc();
  renderItinerary();
  renderDetailReviews();

  // Reset tabs
  document.querySelectorAll('.trek-tab').forEach(tb=>tb.classList.remove('active'));
  const first=document.querySelector('.trek-tab'); if(first) first.classList.add('active');
  const tc=document.getElementById('tab-content-area'); if(tc) tc.innerHTML='';
  const tdb=document.getElementById('toggle-days-btn');
  if(tdb){ tdb.style.display=''; tdb.textContent='Show all '+t.days+' days ↓'; }
}

function renderItinerary(){
  const c=document.getElementById('itinerary-container'); if(!c) return;
  const days = getItinerary(currentTrek.id);
  c.innerHTML=days.map((d,i)=>`
    <div class="day-item${i>=5?' day-extra':''}">
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div class="day-num">${d.day}</div>
        ${i<days.length-1?'<div class="day-line"></div>':''}
      </div>
      <div class="day-info">
        <div class="day-title" style="${d.highlight?'color:var(--amber);font-weight:500;':''}">${d.title}</div>
        <div class="day-sub">${d.sub}</div>
        <div class="alt-bar"><div class="alt-fill" style="width:${d.pct}%;${d.highlight?'background:var(--gold);':''}"></div></div>
      </div>
    </div>`).join('');
}

function toggleDays(){
  daysExpanded=!daysExpanded;
  document.querySelectorAll('.day-extra').forEach(d=>d.style.display=daysExpanded?'flex':'none');
  const b=document.getElementById('toggle-days-btn');
  if(b) b.textContent=daysExpanded?'Show fewer ↑':'Show all '+getItinerary(currentTrek.id).length+' days ↓';
}

function selectTab(el,tabId){
  document.querySelectorAll('.trek-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active'); activeTab=tabId;
  const ic=document.getElementById('itinerary-container');
  const tdb=document.getElementById('toggle-days-btn');
  const tc=document.getElementById('tab-content-area');
  if(tabId==='itinerary'){
    if(ic) ic.innerHTML=''; renderItinerary();
    if(tdb) tdb.style.display='';
    if(tc) tc.innerHTML='';
    return;
  }
  if(ic) ic.innerHTML='';
  if(tdb) tdb.style.display='none';
  if(!tc) return;
  if(tabId==='gear'){
    tc.innerHTML=`<h3 style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;margin-bottom:14px;">Essential gear list</h3>
    ${[['Clothing & layers','Down jacket (800-fill), thermal base layers ×3, fleece mid-layer, waterproof shell jacket, trekking trousers, warm hat, sun hat, gloves ×2'],
       ['Footwear','Waterproof trekking boots (broken-in), gaiters, microspikes, camp sandals, trekking socks ×4'],
       ['Safety & navigation','GPS device with offline maps, personal locator beacon, headlamp + spare batteries, first aid kit with Diamox'],
       ['Hydration & nutrition','2L water bottles, water purification tablets or filter, electrolyte sachets, high-energy snacks'],
       ['Documents','Passport (original), TIMS card, national park permits, travel insurance with helicopter evacuation cover']
    ].map(([cat,items])=>`<div style="margin-bottom:14px;"><div style="font-size:12px;font-weight:500;margin-bottom:5px;">${cat}</div><div style="font-size:12px;color:var(--muted);line-height:1.8;">${items}</div></div>`).join('')}`;
  } else if(tabId==='reviews'){
    tc.innerHTML=REVIEWS.slice(0,4).map(r=>`
      <div style="border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:7px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:30px;height:30px;border-radius:50%;background:${r.bg};color:${r.color};font-size:10px;font-weight:500;display:flex;align-items:center;justify-content:center;">${r.initials}</div>
            <div><div style="font-size:12px;font-weight:500;">${r.name}</div><div style="font-size:10px;color:var(--muted);">${r.country} · ${r.trek}</div></div>
          </div>
          <div style="color:var(--gold);font-size:12px;">${'★'.repeat(r.rating)}</div>
        </div>
        <p style="font-size:12px;color:#4a4035;line-height:1.65;font-style:italic;">${r.text}</p>
      </div>`).join('')+`<button class="btn btn--ghost btn--sm" onclick="openModal('write-review')">Write a review</button>`;
  } else if(tabId==='map'){
    tc.innerHTML=`<div style="background:var(--cream);border-radius:10px;height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px solid var(--border);">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 3C11.37 3 6 8.37 6 15c0 9.45 12 21 12 21s12-11.55 12-21c0-6.63-5.37-12-12-12zm0 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" fill="#E9B84A"/></svg>
      <div style="font-size:13px;font-weight:500;">Interactive trail map</div>
      <div style="font-size:11px;color:var(--muted);text-align:center;max-width:200px;">Available in the HimalTrek mobile app with offline support</div>
      <button class="btn btn--dark btn--sm" onclick="openModal('app-download')">Download app</button>
    </div>`;
  } else if(tabId==='faq'){
    tc.innerHTML=[
      ['Do I need prior trekking experience?','Moderate fitness is sufficient for most treks. Strenuous routes require prior high-altitude trekking experience.'],
      ['What permits do I need?','TIMS card (NPR 2,000) plus the relevant national park entry. We handle all applications.'],
      ['Is travel insurance mandatory?','Yes, and it must include helicopter evacuation cover to at least $100,000.'],
      ['What is the best time to trek?','April–May and October–November offer the clearest skies and most stable weather.'],
      ['Can I customise the itinerary?','Yes — all itineraries are flexible. Discuss with your guide before departure.'],
    ].map(([q,a])=>`<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border);">
      <div style="font-size:13px;font-weight:500;margin-bottom:5px;">${q}</div>
      <div style="font-size:12px;color:var(--muted);line-height:1.7;">${a}</div>
    </div>`).join('');
  }
}

function renderDetailReviews(){
  const c=document.getElementById('sidebar-reviews'); if(!c) return;
  c.innerHTML=`<h3 style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;margin-bottom:12px;">Recent reviews</h3>`+
  REVIEWS.slice(0,2).map(r=>`<div style="border-bottom:1px solid var(--border);padding-bottom:9px;margin-bottom:9px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-size:11px;font-weight:500;">${r.name}</span><span style="color:var(--gold);font-size:10px;">${'★'.repeat(r.rating)}</span></div>
    <p style="font-size:11px;color:#4a4035;font-style:italic;line-height:1.5;">${r.text.slice(0,90)}…</p>
  </div>`).join('');
}

function changeTrekkers(d){
  trekkerCount=Math.max(1,Math.min(currentTrek.maxGroup||12,trekkerCount+d));
  document.getElementById('trekker-count').textContent=trekkerCount;
  document.getElementById('tc-display').textContent=trekkerCount;
  updateBookingCalc();
}

function updateBookingCalc(){
  const p=currentTrek.price,sub=p*trekkerCount,fee=Math.round(sub*.05);
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('booking-subtotal','$'+sub.toLocaleString());
  set('booking-fee','$'+fee.toLocaleString());
  set('booking-total','$'+(sub+fee).toLocaleString());
}

function bookTrek(){
  const date=document.getElementById('booking-date')?.value;
  if(!date){toast('Please select a start date');return;}
  const btn=event.target;
  btn.innerHTML='<span class="spinner"></span>Processing…'; btn.disabled=true;
  setTimeout(()=>{btn.innerHTML='Book this trek';btn.disabled=false;openModal('book-confirm');},1800);
}

// ── Wishlist ──────────────────────────────────
function toggleWishlist(id,btn){
  const idx=wishlist.indexOf(id);
  if(idx>-1){wishlist.splice(idx,1);toast('Removed from wishlist');}
  else{wishlist.push(id);toast('Saved to wishlist ♥');}
  localStorage.setItem('ht_wishlist',JSON.stringify(wishlist));
  updateWishlistBadge();
  if(btn){
    btn.className='trek-card__heart'+(wishlist.includes(id)?' liked':'');
    const p=btn.querySelector('path');
    if(p) p.setAttribute('fill',wishlist.includes(id)?'#E24B4A':'none');
  }
  const dh=document.getElementById('detail-heart');
  if(dh) dh.className='trek-card__heart'+(wishlist.includes(currentTrek.id)?' liked':'');
}
function updateWishlistBadge(){
  const b=document.getElementById('wishlist-badge');
  if(!b) return;
  b.style.display=wishlist.length?'inline-flex':'none';
  b.textContent=wishlist.length;
}
function renderWishlist(){
  const g=document.getElementById('wishlist-grid'),e=document.getElementById('wishlist-empty');
  if(!g) return;
  const saved=TREKS.filter(t=>wishlist.includes(t.id));
  if(!saved.length){g.innerHTML='';e.style.display='block';return;}
  e.style.display='none';
  g.innerHTML=saved.map((t,i)=>`
    <div class="trek-card" onclick="showPage('detail','${t.id}')">
      <div class="trek-card__img" style="background:${t.color};">
        <svg class="mtn" style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 300 160" preserveAspectRatio="none"><path d="${mkMtn(i)}" fill="${mkFill(i)}" opacity="0.6"/></svg>
        <span class="trek-card__diff">${t.difficulty}</span>
        <button class="trek-card__heart liked" onclick="event.stopPropagation();toggleWishlist('${t.id}',this);renderWishlist();">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 14s-6-4.35-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 3.65-6 8-6 8z" stroke="white" stroke-width="1.4" fill="#E24B4A"/></svg>
        </button>
      </div>
      <div class="trek-card__body">
        <div class="trek-card__region">${t.region}</div>
        <div class="trek-card__name">${t.name}</div>
        <div class="trek-card__meta"><span>${t.days} days</span><span>·</span><span>${t.alt}m</span></div>
        <div class="trek-card__foot"><div><div class="trek-card__from">from</div><div class="trek-card__price">$${t.price}</div></div><div class="trek-card__rating">★ ${t.rating}</div></div>
      </div>
    </div>`).join('');
}

// ── Guides ────────────────────────────────────
function renderGuides(){
  const g=document.getElementById('guides-grid'); if(!g) return;
  g.innerHTML=GUIDES.map(gu=>`
    <div class="guide-card">
      <div class="guide-avatar" style="background:${gu.bg};color:${gu.color};">${gu.initials}</div>
      <div class="guide-card__name">${gu.name}</div>
      <div class="guide-card__role">${gu.role}</div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">${gu.routes}</div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:10px;">🗣 ${gu.lang}</div>
      <div class="guide-card__stat-row">
        <div style="text-align:center;"><div class="guide-stat-val">★ ${gu.rating}</div><div class="guide-stat-lbl">Rating</div></div>
        <div style="text-align:center;"><div class="guide-stat-val">${gu.trips}</div><div class="guide-stat-lbl">Trips led</div></div>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:12px;">${gu.taan}</div>
      <button class="btn btn--dark btn--full btn--sm" onclick="openModal('contact-guide')">Book this guide</button>
    </div>`).join('');
}

// ── Blog ──────────────────────────────────────
function renderBlog(){
  const g=document.getElementById('blog-grid'); if(!g) return;
  const colors=['#2d4055','#2d4535','#4a3520','#3a2d4a','#1e3a4a','#3a4520','#4a3a20','#2d3a1e','#1e2d4a'];
  g.innerHTML=BLOG_POSTS.map((p,i)=>`
    <div class="blog-card" onclick="toast('Opening: ${p.title.replace(/'/g,"\\'")}')">
      <div class="blog-card__img" style="background:${colors[i%colors.length]};">
        <svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 300 130" preserveAspectRatio="none"><path d="${mkMtn(i)}" fill="rgba(0,0,0,0.28)"/></svg>
        <span class="blog-card__tag">${p.tag}</span>
      </div>
      <div class="blog-card__body">
        <div class="blog-card__title">${p.title}</div>
        <div class="blog-card__meta">${p.date} · ${p.read} read · ${p.author}</div>
      </div>
    </div>`).join('');
}

// ── Permit flow ───────────────────────────────
function togglePermit(id){
  const idx=selectedPermits.indexOf(id);
  if(idx>-1) selectedPermits.splice(idx,1); else selectedPermits.push(id);
  renderStep(currentStep);
}
function pickPayment(id){
  selectedPayment=id;
  document.querySelectorAll('.pmethod').forEach(p=>p.classList.remove('selected'));
  const el=document.getElementById('pm-'+id); if(el) el.classList.add('selected');
}
function calcTotal(){
  const base=selectedPermits.reduce((s,id)=>s+(permitData[id]?.amount||0),0);
  const fee=Math.round(base*.02); return {base,fee,total:base+fee};
}
function goStep(n){ if(n<=currentStep) renderStep(n); }
function renderStep(step){
  currentStep=step; updateStepBar(step);
  const c=document.getElementById('step-content'); if(!c) return;
  if(step===1){
    c.innerHTML=`<div class="card" style="margin-bottom:18px;"><h3 style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;margin-bottom:16px;">Select permits required</h3>
      <div class="permit-type-grid">${Object.entries(permitData).map(([id,p])=>`
        <div class="permit-type ${selectedPermits.includes(id)?'selected':''}" onclick="togglePermit('${id}')">
          <div class="permit-type__name">${p.name}</div><div class="permit-type__fee">${p.fee}</div><div class="permit-type__desc">${p.desc}</div>
        </div>`).join('')}</div></div>
      <div style="display:flex;justify-content:flex-end;"><button class="btn btn--dark" onclick="if(!selectedPermits.length){toast('Select at least one permit')}else{renderStep(2)}">Next: Your details →</button></div>`;
  } else if(step===2){
    c.innerHTML=`<div class="card" style="margin-bottom:18px;"><h3 style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;margin-bottom:16px;">Personal details</h3>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">First name</label><input class="form-input" placeholder="James"/></div>
        <div class="form-group"><label class="form-label">Last name</label><input class="form-input" placeholder="Mitchell"/></div>
        <div class="form-group"><label class="form-label">Nationality</label><input class="form-input" placeholder="Australian"/></div>
        <div class="form-group"><label class="form-label">Passport number</label><input class="form-input" placeholder="PA1234567"/></div>
        <div class="form-group"><label class="form-label">Date of birth</label><input class="form-input" type="date"/></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="you@email.com"/></div>
        <div class="form-group form-group--full"><label class="form-label">Emergency contact (name &amp; phone)</label><input class="form-input" placeholder="Sarah Mitchell · +61 412 000 000"/></div>
      </div></div>
      <div style="display:flex;justify-content:flex-end;gap:10px;"><button class="btn btn--ghost" onclick="renderStep(1)">← Back</button><button class="btn btn--dark" onclick="renderStep(3)">Next: Trek details →</button></div>`;
  } else if(step===3){
    const {fee,total}=calcTotal();
    c.innerHTML=`<div class="card" style="margin-bottom:16px;"><h3 style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;margin-bottom:16px;">Trek details</h3>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Trek route</label><select class="form-select">${TREKS.map(t=>`<option>${t.name}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Trekking agency</label><input class="form-input" value="HimalTrek Nepal Pvt. Ltd."/></div>
        <div class="form-group"><label class="form-label">Trek start date</label><input class="form-input" type="date" min="2026-04-20"/></div>
        <div class="form-group"><label class="form-label">Trek end date</label><input class="form-input" type="date" min="2026-04-21"/></div>
        <div class="form-group"><label class="form-label">Entry point</label><input class="form-input" placeholder="e.g. Lukla, Nayapul, Besisahar"/></div>
        <div class="form-group"><label class="form-label">Guide name &amp; TAAN no.</label><input class="form-input" placeholder="Pemba Rai · TAAN-4821"/></div>
      </div></div>
      <div class="card" style="margin-bottom:18px;"><h3 style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;margin-bottom:12px;">Fee summary</h3>
        <div class="fee-summary">${selectedPermits.map(id=>`<div class="fee-row"><span>${permitData[id].name}</span><span>NPR ${permitData[id].amount.toLocaleString()}</span></div>`).join('')}
          <div class="fee-row"><span>Processing fee (2%)</span><span>NPR ${fee.toLocaleString()}</span></div>
          <div class="fee-total"><span>Total</span><span>NPR ${total.toLocaleString()} (~$${Math.round(total/132)})</span></div>
        </div></div>
      <div style="display:flex;justify-content:flex-end;gap:10px;"><button class="btn btn--ghost" onclick="renderStep(2)">← Back</button><button class="btn btn--dark" onclick="renderStep(4)">Next: Payment →</button></div>`;
  } else if(step===4){
    const {total}=calcTotal();
    c.innerHTML=`<div class="card" style="margin-bottom:18px;"><h3 style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;margin-bottom:16px;">Payment method</h3>
      <div class="payment-grid">
        <div class="pmethod ${selectedPayment==='esewa'?'selected':''}" id="pm-esewa" onclick="pickPayment('esewa')"><div style="width:52px;height:34px;background:#60BB46;border-radius:7px;display:flex;align-items:center;justify-content:center;margin:0 auto;"><svg width="40" height="14" viewBox="0 0 40 14"><text x="3" y="10" font-size="8" fill="white" font-weight="bold" font-family="sans-serif">eSewa</text></svg></div><div class="pmethod__name">eSewa</div></div>
        <div class="pmethod ${selectedPayment==='khalti'?'selected':''}" id="pm-khalti" onclick="pickPayment('khalti')"><div style="width:52px;height:34px;background:#5C2D91;border-radius:7px;display:flex;align-items:center;justify-content:center;margin:0 auto;"><svg width="40" height="14" viewBox="0 0 40 14"><text x="2" y="10" font-size="7" fill="white" font-weight="bold" font-family="sans-serif">Khalti</text></svg></div><div class="pmethod__name">Khalti</div></div>
        <div class="pmethod ${selectedPayment==='card'?'selected':''}" id="pm-card" onclick="pickPayment('card')"><div style="width:52px;height:34px;background:#1a2332;border-radius:7px;margin:0 auto;position:relative;overflow:hidden;"><div style="position:absolute;top:9px;left:0;right:0;height:8px;background:#E9B84A;"></div></div><div class="pmethod__name">Credit card</div></div>
      </div>
      <div class="fee-summary" style="margin-top:4px;"><div class="fee-total"><span>Total due</span><span>NPR ${total.toLocaleString()}</span></div></div>
      <div style="background:var(--green-lt);border-radius:8px;padding:12px 14px;margin-top:14px;font-size:12px;color:#27500A;">Your permits will be issued digitally within 2 hours and emailed to you.</div></div>
      <div style="display:flex;justify-content:flex-end;gap:10px;"><button class="btn btn--ghost" onclick="renderStep(3)">← Back</button><button class="btn btn--green" id="pay-btn" onclick="processPayment(${total})">Confirm &amp; Pay NPR ${total.toLocaleString()}</button></div>`;
  } else if(step===5){
    c.innerHTML=`<div class="card"><div class="success-box">
      <div class="success-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14L11 19L22 8" stroke="#3B6D11" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h2 style="font-family:'DM Serif Display',serif;margin-bottom:8px;">Permits issued!</h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">Emailed to you and saved to your HimalTrek profile.</p>
      <div class="permit-badge-card">
        ${selectedPermits.map((id,i)=>`<div ${i?'style="border-top:1px solid var(--border);margin-top:10px;padding-top:10px;"':''}>
          <div class="permit-badge-card__title">${permitData[id].name} — <span class="pill pill--green">Active</span></div>
          <div class="permit-badge-card__row"><span>Permit no.</span><span>${id.toUpperCase().slice(0,4)}-2026-${Math.floor(10000+Math.random()*90000)}</span></div>
          <div class="permit-badge-card__row"><span>Valid until</span><span>30 Jun 2026</span></div>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:18px;">
        <button class="btn btn--dark" onclick="showPage('detail')">View trek</button>
        <button class="btn btn--ghost" onclick="showPage('home')">Back to home</button>
      </div>
    </div></div>`;
  }
}
function processPayment(total){
  const b=document.getElementById('pay-btn');
  b.innerHTML='<span class="spinner"></span>Processing…'; b.disabled=true;
  setTimeout(()=>renderStep(5),2000);
}
function updateStepBar(step){
  for(let i=1;i<=5;i++){
    const d=document.getElementById('sd'+i),l=document.getElementById('sl'+i),co=document.getElementById('sc'+i);
    if(!d) continue;
    const s=i<step?'done':i===step?'active':'idle';
    d.className='step-dot step-dot--'+s;
    if(l) l.className='step-lbl step-lbl--'+s;
    if(co) co.className='step-connector'+(i<step?' step-connector--done':'');
    d.innerHTML=i<step?`<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`:i;
  }
}

// ── Scroll & Keys ─────────────────────────────
window.addEventListener('scroll',()=>{
  const b=document.getElementById('scroll-top');
  if(b) b.classList.toggle('visible',window.scrollY>400);
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){closeModal();closeDD();} });
document.addEventListener('click',e=>{
  if(!e.target.closest('.search-field')&&!e.target.closest('.sf-dropdown')) closeDD();
});

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  showPage('home');
  renderTrekGrid(TREKS);
  updateWishlistBadge();
  renderItinerary();
  renderDetailReviews();
  updateBookingCalc();
});

function submitPlan(){
  const b=event.target; b.innerHTML='<span class="spinner"></span>Building your plan…'; b.disabled=true;
  setTimeout(()=>{ b.innerHTML='Get my personalised trek plan →'; b.disabled=false; toast('Plan sent! Check your email for personalised recommendations.'); },2000);
}
