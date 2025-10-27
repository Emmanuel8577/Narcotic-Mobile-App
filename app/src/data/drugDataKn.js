export const drugData = [
  {
    id: '1',
    name: 'Cocaine',
    type: 'Kandəɲa korta',
    riskLevel: 'high',
    shortDescription: 'Kandəɲa beə ba korta woyin da kəlɲa ga kuwua.',
    longDescription: 'Cocaine korta kəlɲa ba woyin da ga kuwua, a she korta Coca korta ga shin South America. A korta farɲa, kəlɲa, nda ciyi ga tultə. Amma a she korta fəɲa nda woyin da ga kuwua nda fəɲa ga ciyi.',
    effects: [
      'Kəlɲa nda fahinta ga zəwa',
      'Farɲa nda kwarin gwiwa',
      'Zuciya nda jini ga zəwa',
      'Fəɲa nda tsoro',
      'Shi ga ragu'
    ],
    risks: [
      'Zuciya nda jini fəɲa',
      'Numfashi gazawa',
      'Woyin da mai yawa',
      'Hanci lalacewa',
      'Kuɗi halaka'
    ],
    image: require('../../../assets/images/cocaine.png'),
  },
  {
    id: '2',
    name: 'Heroin',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Opioid kəlɲa ba woyin da ga kuwua woyin da farɲa mai yawa.',
    longDescription: 'Heroin kəlɲa ba haram, woyin da ga kuwua opioid kəlɲa da aka yi daga morphine. A she korta farɲa mai yawa amma a ɗauke da hatsari mai yawa ciki har da mutuwa. Amfani da heroin ya kai matakin annoba a ƙasashe da yawa.',
    effects: [
      'Farɲa mai yawa',
      'Barci nda kwantar da hankali',
      'Tashin zuciya nda amai',
      'Rudani nda tunani'
    ],
    risks: [
      'Mutuwa saboda yawan shan magani',
      'Cututtuka daga raba allura',
      'Jijiyoyin jini sun ruguje',
      'Hanta nda koda cuta'
    ],
    image: require('../../../assets/images/heroin.png'),
  },
  {
    id: '3',
    name: 'Marijuana (Cannabis)',
    type: 'Cannabis',
    riskLevel: 'medium',
    shortDescription: 'Kəlɲa da ke shafar hankali daga shukar Cannabis.',
    longDescription: 'Marijuana kəlɲa ne mai shafar hankali daga shukar Cannabis da ake amfani dashi don dalilai na likita da nishaɗi. Duk da cewa ana ɗaukarsa mara haɗari fiye da sauran magunguna da yawa, har yanzu yana iya haifar da dogaro da matsalolin lafiyar hankali, musamman a cikin matasa masu amfani.',
    effects: [
      'Hankali nda fahimta canzawa',
      'Yanayi nda shakatawa canzawa',
      'Ƙwaƙwalwar ajiya nda daidaitawa rashin',
      'Shi ga zəwa'
    ],
    risks: [
      'Kwakwalwa ci gaba rashin a cikin samari',
      'Numfashi matsaloli daga shan taba',
      'Lafiyar hankali matsaloli a cikin mutanen da suka riga sun kamu',
      'Woyin da tare da amfani mai yawa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '4',
    name: 'MDMA (Ecstasy)',
    type: 'Kandəɲa korta/Hankali',
    riskLevel: 'high',
    shortDescription: 'Kəlɲa roba wanda ke canza yanayi da fahimta.',
    longDescription: 'MDMA, wanda aka fi sani da Ecstasy, kəlɲa roba ne wanda ke canza yanayi da fahimta. Ya shahara a wuraren bukukuwa amma yana iya haifar da hauhawar yanayin jiki mai haɗari da matsalolin zuciya.',
    effects: [
      'Kəlɲa nda tausayawa ga zəwa',
      'Zuciya dumi nda kusanci',
      'Lokaci fahimta karkatacce',
      'Hankali fahimta ingantacce'
    ],
    risks: [
      'Rashin ruwa mai yawa',
      'Zafi bugun nda zafi',
      'Zuciya gazawa',
      'Ƙwaƙwalwar ajiya matsaloli na dogon lokaci'
    ],
    image: require('../../../assets/images/mdma.png'),
  },
  {
    id: '5',
    name: 'Methamphetamine',
    type: 'Kandəɲa korta',
    riskLevel: 'high',
    shortDescription: 'Kandəɲa korta mai saukin kamuwa wanda ke lalata kwakwalwa sosai.',
    longDescription: 'Methamphetamine korta kəlɲa ne mai matuƙar saukin kamuwa wanda ke shafar tsakiyar tsarin juyayi. Yana haifar da matsalolin haƙori masu tsanani ("bakin meth"), raunukan fata, da mummunar lalacewar kwakwalwa tare da amfani mai tsayi.',
    effects: [
      'Farɲa mai yawa',
      'Kəlɲa nda fahimi ga zəwa',
      'Shi ga ragu',
      'Tashin hankali ko tashin hankali hali'
    ],
    risks: [
      'Haƙori lalacewa mai yawa',
      'Hauka nda tsoro',
      'Zuciya lalacewa nda bugun jini',
      'Nauyi raguwa mai yawa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '6',
    name: 'Fentanyl',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Opioid roba mai ƙarfi sosai.',
    longDescription: 'Fentanyl opioid ne na roba mai ƙarfi sau 50-100 fiye da morphine. Ana amfani dashi bisa doka don magance ciwo mai tsanani amma ya zama babban abin da ke haifar da mutuwar yawan shan maganin opioid lokacin da aka yi amfani da shi ba bisa ka\'ida ba.',
    effects: [
      'Matsananin farin ciki',
      'Ciwo magance',
      'Barci nda kwantar da hankali',
      'Numfashi rashin'
    ],
    risks: [
      'Yawan shan magani na mutuwa cikin sauri',
      'Numfashi dakatarwa',
      'Yuwuwar jaraba mai tsanani',
      'Ƙarfin da ba a iya faɗi ba a cikin magungunan titi'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '7',
    name: 'LSD (Acid)',
    type: 'Hankali',
    riskLevel: 'medium',
    shortDescription: 'Hankali kəlɲa mai ƙarfi wanda ke canza fahimta.',
    longDescription: 'LSD kəlɲa ne mai ƙarfi na hankali wanda ke haifar da canje-canje masu mahimmanci a cikin fahimta, yanayi, da tunani. Duk da cewa ba a ɗauke shi mai saukin kamuwa ba, yana iya haifar da abubuwan ban tsoro da matsalolin tunani na dogon lokaci.',
    effects: [
      'Gani nda ji hankali',
      'Lokaci fahimta canjin',
      'Ruhaniya abubuwan',
      'Yanayi canjin'
    ],
    risks: [
      "'Tafiye-tafiye mara kyau' yana haifar da firgici",
      'Hankali fahimta rashin na dindindin',
      'Raunin da ba da gangan ba yayin amfani',
      'Cutar hauka mai ɓoye tada'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '8',
    name: 'Psilocybin (Magic Mushrooms)',
    type: 'Hankali',
    riskLevel: 'medium',
    shortDescription: 'Hankali abun na halitta da ke cikin naman kaza.',
    longDescription: 'Psilocybin wani abu ne na hankali na halitta da ake samu a cikin wasu nau\'in naman kaza. Yana haifar da tasiri irin na LSD amma gabaɗaya ana ɗaukar yana da ɗan gajeren lokaci da yanayin tasiri daban-daban.',
    effects: [
      'Gani karkatacce nda hangen nesa',
      'Farin ciki nda abubuwan ruhaniya',
      'Tunani canje-canjen',
      'Lokaci karkatacce'
    ],
    risks: [
      'Guba daga naman kaza da ba a gane su ba',
      'Tashin hankali nda firgici',
      'Hali mai haɗari yayin rashin lafiya',
      'Mummunan yanayin lafiyar hankali'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '9',
    name: 'Barasa',
    type: 'Kandəɲa kashe kəlɲa',
    riskLevel: 'medium',
    shortDescription: 'Kandəɲa kashe kəlɲa na doka wanda ke shafar tsakiyar tsarin juyayi.',
    longDescription: 'Barasa kandəɲa kashe kəlɲa ne na doka wanda ke rage ayyukan muhimman ayyuka da rashin daidaitawar haɗin kai, hukunci, da lokacin amsawa. Duk da cewa an yarda da shi a cikin al\'umma, yana ɗauke da manyan haɗarin kiwon lafiya da yuwuwar jaraba.',
    effects: [
      'Shakatawa da rage hanawa',
      'Rashin daidaitawa da hukunci',
      'Magana mara kyau',
      'Ƙwaƙwalwar ajiya rashin'
    ],
    risks: [
      'Hanta ciwo nda cuta',
      'Barasa jaraba (shaye-shaye)',
      'Ciwon daji haɗarin ƙaruwar',
      'Kwakwalwa lalacewa da ƙwaƙwalwar ajiya asarar'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '10',
    name: 'Nicotine (Taba)',
    type: 'Kandəɲa korta',
    riskLevel: 'medium',
    shortDescription: 'Kandəɲa korta mai saukin kamuwa da ake samu a cikin kayayyakin taba.',
    longDescription: 'Nicotine shine farkon abin da ke saukin kamuwa a cikin kayayyakin taba. Duk da cewa tasirin nan take yana da laushi idan aka kwatanta da sauran magunguna, nicotine yana da matuƙar saukin kamuwa kuma amfani da taba shine babban abin da ke haifar da mutuwar da za a iya karewa a duniya.',
    effects: [
      'Kandəɲa korta da fahimi',
      'Shi rage',
      'Zuciya bugun ƙaruwar',
      'Shakatawa a cikin masu amfani na yau da kullun'
    ],
    risks: [
      'Huhu ciwon daji da cututtukan numfashi',
      'Zuciya cutar da bugun jini',
      'Yuwuwar jaraba mai tsanani',
      'Tsufa da fata lalacewa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '11',
    name: 'Magungunan Opioid na Magani',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Magungunan kawar da ciwo tare da babban yuwuwar jaraba.',
    longDescription: 'Magungunan opioid na magani kamar oxycodone, hydrocodone, da morphine masu kawar da ciwo ne masu ƙarfi waɗanda ke ɗauke da manyan haɗarin jaraba. Suna da mahimmanci don amfanin likita amma sun ba da gudummawa sosai ga rikicin opioid.',
    effects: [
      'Ciwo magance',
      'Farin ciki nda shakatawa',
      'Barci nda kwantar da hankali',
      'Numfashi rashin'
    ],
    risks: [
      'Jaraba mai yawa da dogaro',
      'Numfashi gazawa a cikin yawan shan magani',
      'Janyewa alamun',
      'Heroin amfani zuwa hanyar'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '12',
    name: 'Benzodiazepines',
    type: 'Kandəɲa kashe kəlɲa',
    riskLevel: 'medium',
    shortDescription: 'Magungunan kwantar da hankali na magani don tashin hankali da barci.',
    longDescription: 'Benzodiazepines magungunan magani ne da ake amfani da su don magance tashin hankali, rashin barci, da kamewa. Suna da inganci lokacin da aka yi amfani da su kamar yadda aka tsara amma suna ɗauke da haɗarin dogaro da alamun janyewar haɗari.',
    effects: [
      'Tashin hankali nda tashin hankali rage',
      'Kwantar da hankali da barci',
      'Tsoka shakatawar',
      'Ƙwaƙwalwar ajiya rashin'
    ],
    risks: [
      'Jiki dogaro da jaraba',
      'Janyewa hatsarin masu haɗari',
      'Ƙwaƙwalwar ajiya matsaloli tare da amfani na dogon lokaci',
      'Yawan shan magani haɗari lokacin da aka haɗa shi da barasa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '13',
    name: 'Adderall (Amphetamines)',
    type: 'Kandəɲa korta',
    riskLevel: 'medium',
    shortDescription: 'Kandəɲa korta na magani don ADHD sau da yawa ana amfani da shi mara kyau.',
    longDescription: 'Adderall da sauran magungunan ƙarfafawa na magani ana amfani da su don magance ADHD amma sau da yawa ana amfani da su mara kyau don haɓaka fahimi ko dalilai na nishaɗi. Yin amfani da shi mara kyau na iya haifar da matsalolin zuciya da na hankali masu mahimmanci.',
    effects: [
      'Maida hankali nda maida hankali ƙaruwar',
      'Yanayi hawawan da kəlɲa',
      'Shi rage',
      'Barci rashin'
    ],
    risks: [
      'Zuciya matsaloli da jini hawan',
      'Tashin hankali nda tsoro',
      'Jaraba da dogaro',
      'Hauka tare da manyan allurai'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '14',
    name: 'Ketamine',
    type: 'Maganin sa barci mai rarrabuwa',
    riskLevel: 'high',
    shortDescription: 'Maganin sa barci na likita da ake amfani dashi don nishaɗi don tasirin rarrabuwa.',
    longDescription: 'Ketamine maganin sa barci ne na likita wanda ke haifar da tasirin rarrabuwa a ƙananan allurai. Yana da ingantaccen amfani na likita amma yana ɗauke da haɗari lokacin da aka yi amfani da shi don nishaɗi, gami da lalacewar mafitsara da matsalolin hankali.',
    effects: [
      'Rarrabuwa daga jiki da muhalli',
      'Gani nda ji karkatacce',
      'Mota aiki rashin',
      'Ciwo magance'
    ],
    risks: [
      'Mafitsara fili na nda mafitsara lalacewar',
      'Ƙwaƙwalwar ajiya da hankali matsalolin',
      'Raunin da ba da gangan ba yayin rashin lafiya',
      'Hankali dogaro'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '15',
    name: 'GHB',
    type: 'Kandəɲa kashe kəlɲa',
    riskLevel: 'high',
    shortDescription: 'Kandəɲa kashe kəlɲa na tsakiyar tsarin juyayi sau da yawa ana amfani dashi azaman maganin lalatar kwanan wata.',
    longDescription: 'GHB kandəɲa kashe kəlɲa ne na tsakiyar tsarin juyayi wanda aka yi amfani da shi a likita amma an fi haɗa shi da amfani na nishaɗi da lalatar jima\'i ta hanyar magani. Yana da matuƙar haɗari lokacin da aka haɗa shi da barasa.',
    effects: [
      'Farin ciki nda shakatawa',
      'Zamantakewa ƙaruwar',
      'Barci nda kwantar da hankali',
      'Ƙwaƙwalwar ajiya asarar'
    ],
    risks: [
      'Numfashi rashin da koma',
      'Matsananin haɗari lokacin da aka haɗa shi da barasa',
      'Ana amfani dashi a cikin hare-haren jima\'i na magani',
      'Jaraba da janyewa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '16',
    name: 'Abubuwan Shan iska',
    type: 'Iri-iri',
    riskLevel: 'high',
    shortDescription: 'Sinadarai na gida da ake shan iska don tasirin maye.',
    longDescription: 'Abubuwan shan iska sun haɗa da sinadarai daban-daban na gida da masana\'antu waɗanda ke haifar da tasirin hankali lokacin shan iska. Suna da haɗari musamman saboda suna iya haifar da mutuwa kwatsam da lalacewar gabobi na dindindin.',
    effects: [
      'Gajeren farin ciki da jiri',
      'Magana mara kyau da rudani',
      'Hankali',
      'Hadin kai asarar'
    ],
    risks: [
      'Shan iska ciwon na kwatsam',
      'Kwakwalwa lalacewa ta dindindin',
      'Hanta nda koda lalacewar',
      'Zuciya gazawa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '17',
    name: 'Cannabinoids na Roba',
    type: 'Roba',
    riskLevel: 'high',
    shortDescription: 'Sinadarai da aka yi a dakin gwaje-gwaje kama da THC.',
    longDescription: 'Cannabinoids na roba sinadarai ne na ɗan adam masu canza hankali waɗanda ake fesa akan busassun kayan shuka. Sau da yawa ana sayar da su azaman madadin amintaccen marijuana amma a haƙiƙa sun fi haɗari kuma ba za a iya faɗi ba.',
    effects: [
      'Shakatawa da fahimta canjin',
      'Yanayi hawawan',
      'Gaskiya fahimtar canjin',
      'Hauka alamun'
    ],
    risks: [
      'Matsananin tashin hankali da tsoro',
      'Hauka da hangen nesa',
      'Zuciya bugun da harbin zuciya',
      'Koda lalacewar da kamewa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '18',
    name: 'Gishirin Wanka',
    type: 'Kandəɲa korta',
    riskLevel: 'high',
    shortDescription: 'Cathinones na roba tare da tasirin ƙarfafawa mai tsanani.',
    longDescription: '"Gishirin wanka" cathinones ne na roba waɗanda ke haifar da tasirin ƙarfafawa mai tsanani kama da amphetamines da cocaine. Suna da matuƙar haɗari kuma an haɗa su da halayen tashin hankali da matsalolin likita masu tsanani.',
    effects: [
      'Farɲa mai yawa da kəlɲa',
      'Zamantakewa ƙaruwar da jima\'i sha\'awar',
      'Tsoro da tashin hankali',
      'Hankali'
    ],
    risks: [
      'Matsananin tsoro da tashin hankali',
      'Zuciya harbin da bugun jini',
      'Rashin ruwa mai yawa',
      'Kasan kansa tunanin da hali'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '19',
    name: 'PCP (Kurar Mala\'ika)',
    type: 'Mai rarrabuwa',
    riskLevel: 'high',
    shortDescription: 'Maganin rarrabuwa mai ƙarfi yana haifar da abubuwan da suka wuce jiki.',
    longDescription: 'PCP maganin rarrabuwa ne wanda aka fara haɓaka shi azaman maganin sa barci amma an daina shi saboda mummunan illolin gefe. Yana iya sa masu amfani su ji sun rabu da gaskiya kuma su nuna ƙarfi na allahntaka da halayen tashin hankali.',
    effects: [
      'Gaskiya daga rabuwa jin',
      'Hankali da ruɗi',
      'Zafi rashin jin da zafi rashin',
      'Tashin hankali ko m hali'
    ],
    risks: [
      'Hauka da cutar hauka na dogon lokaci',
      'Kai cutar ko kasan kansa',
      'Tashin hankali hali ga wasu',
      'Kamewa da koma'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '20',
    name: 'DMT',
    type: 'Hankali',
    riskLevel: 'medium',
    shortDescription: 'Hankali abun mai ƙarfi, ɗan gajeren aiki.',
    longDescription: 'DMT wani abu ne mai ƙarfi na hankali wanda ke faruwa a zahiri a cikin shuke-shuke da dabbobi da yawa. Yana haifar da hangen nesa na gani da na ji masu tsanani amma gajerun rayuwa, galibi ana kwatanta su azaman abubuwan ruhaniya ko na wannan duniya.',
    effects: [
      'Gani nda ji hangen nesa masu tsanani',
      'Lokaci da gaskiya fahimtar canjin',
      'Ruhaniya ko asiri abubuwan',
      'Saurin farawa da ɗan gajeren lokaci'
    ],
    risks: [
      'Hankali damuwar yayin gwaninta',
      'Raunin da ba da gangan ba yayin rashin lafiya',
      'Mummunan yanayin lafiyar hankali',
      'Doka sakamakon'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '21',
    name: 'Codeine',
    type: 'Opioid',
    riskLevel: 'medium',
    shortDescription: 'Opioid ciwo magance sau da yawa ana amfani da shi mara kyau a cikin sirup ɗin tari.',
    longDescription: 'Codeine maganin ciwo ne na opioid sau da yawa ana amfani dashi a cikin maganin tari na magani. Yana da ingantaccen amfani na likita amma ana yin amfani da shi akai-akai, musamman a cikin nau\'in "lean" ko "purple drank" lokacin da aka haɗa shi da soda.',
    effects: [
      'Ciwo magance mai laushi zuwa matsakaici',
      'Farin ciki nda shakatawa',
      'Barci nda kwantar da hankali',
      'Tari danne'
    ],
    risks: [
      'Numfashi rashin',
      'Jaraba da dogaro',
      'Hanta lalacewar daga acetaminophen a cikin tsari',
      'Haɗuwa masu haɗari tare da sauran masu kashe kəlɲa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '22',
    name: 'Tramadol',
    type: 'Opioid',
    riskLevel: 'medium',
    shortDescription: 'Opioid roba na ciwo magance tare da tasirin serotonin.',
    longDescription: 'Tramadol maganin ciwo ne na roba na opioid wanda kuma yana shafar matakan serotonin. Ana ɗaukar yana da ƙaramin yuwuwar cin zarafi fiye da sauran opioids amma har yanzu yana ɗauke da haɗarin jaraba da illolin gefe masu haɗari.',
    effects: [
      'Ciwo magance',
      'M farin ciki',
      'Yanayi tasirin serotonin',
      'Barci'
    ],
    risks: [
      'Kamewa, musamman a cikin manyan allurai',
      'Serotonin ciwon lokacin da aka haɗa shi da sauran magunguna',
      'Jaraba da janyewa',
      'Haɗuwa masu haɗari tare da magungunan rage damuwa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '23',
    name: 'Kratom',
    type: 'Kamar Opioid',
    riskLevel: 'medium',
    shortDescription: 'Shuka na halitta tare da tasirin kamar opioid da ƙarfafawa.',
    longDescription: 'Kratom bishiya ce mai zafi ta asalin Kudancin Asiya wadda ganyenta ke ɗauke da mahaɗan da zasu iya samun tasirin hankali. Ana amfani da shi a al\'ada don magance ciwo da kəlɲa amma yana ɗauke da haɗarin jaraba da mara tabbataccen bayanin aminci.',
    effects: [
      'Ciwo magance a manyan allurai',
      'Kandəɲa korta tasirin a ƙananan allurai',
      'M farin ciki',
      'Tashin hankali magance'
    ],
    risks: [
      'Jaraba alamun da janyewa',
      'Hanta guba',
      'Samfurin ingancin mara tsari',
      'Mai haɗari lokacin da aka haɗa shi da sauran magunguna'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '24',
    name: 'Salvia',
    type: 'Hankali',
    riskLevel: 'medium',
    shortDescription: 'Shuka na halitta yana samar da hangen nesa mai tsanani, gajeriyar rayuwa.',
    longDescription: 'Salvia divinorum shuka ce ta asalin Mexico wacce ke haifar da tasirin hankali mai tsanani amma gajeriyar rayuwa lokacin cinyewa. Yana da doka a wasu wurare amma yana iya haifar da abubuwan ban tsoro da halayen haɗari.',
    effects: [
      'Hangen nesa mai tsanani, gajeriyar rayuwa',
      'Gaskiya fahimtar canjin',
      'Dariya mara iyaka',
      'Jiki wuce abubuwan'
    ],
    risks: [
      'Raunin da ba da gangan ba yayin yanayin rashin lafiya',
      'Hankali damuwar',
      'Tasirin da ba a iya faɗi ba',
      'Doka matsalolin a wasu yankuna'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '25',
    name: 'Ayahuasca',
    type: 'Hankali',
    riskLevel: 'medium',
    shortDescription: 'Gargajiyar Amazonian brew tare da shuke-shuke masu ɗauke da DMT.',
    longDescription: 'Ayahuasca wani abu ne na gargajiya na Amazonian mai shafar hankali da ake amfani dashi don dalilai na ruhaniya da warkarwa. Ya ƙunshi DMT da masu hana MAO, yana samar da gwaninta mai tsanani na hangen nesa wanda zai iya ɗaukar sa\'o\'i da yawa.',
    effects: [
      'Gani nda ruhaniya gwaninta masu tsanani',
      'Tunani sakin da bincike',
      'Tashin zuciya nda amai (wani ɓangare na amfani na gargajiya)',
      'Lokaci da kai fahimtar canjin'
    ],
    risks: [
      'Haɗuwar magunguna masu haɗari (musamman tare da magungunan rage damuwa)',
      'Hankali raunin daga gwaninta mai tsanani',
      'Jiki haɗarin daga shirye-shiryen da ba a tsara su ba',
      'Yin amfani da su a cikin bukukuwan kasuwanci'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '26',
    name: 'Mescaline',
    type: 'Hankali',
    riskLevel: 'medium',
    shortDescription: 'Hankali na halitta daga peyote da sauran cacti.',
    longDescription: 'Mescaline wani alkaloid ne na hankali na halitta da ake samu a cikin wasu nau\'in cactus, mafi yawanci peyote. An yi amfani da shi a al\'ada a cikin bukukuwan addinin \'yan asalin Amurka kuma yana haifar da tasiri irin na LSD.',
    effects: [
      'Gani hangen nesa da launuka ingantattun',
      'Tunani da fahimta canjin',
      'Ruhaniya abubuwan',
      'Tashin zuciya yayin farawa'
    ],
    risks: [
      'Hankali damuwar yayin gwaninta',
      'Hali mai haɗari yayin rashin lafiya',
      'Doka matsalolin tare da mallaka',
      'Peyote na daji tare da kiyayewa abubuwan'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '27',
    name: 'DXM (Dextromethorphan)',
    type: 'Mai rarrabuwa',
    riskLevel: 'medium',
    shortDescription: 'Maganin danniya na tari tare da tasirin rarrabuwa a cikin manyan allurai.',
    longDescription: 'DXM wani sinadari ne na gama-gari a cikin magungunan tari na kan titi wanda ke haifar da tasirin rarrabuwa kama da ketamine ko PCP lokacin da aka ɗauka a cikin manyan allurai. Yana da sauƙin isa amma yana ɗauke da manyan haɗari.',
    effects: [
      'Farin ciki da rarrabuwa',
      'Gaskiya fahimtar canjin',
      'Gani da ji haɓakar',
      'Mota aiki rashin'
    ],
    risks: [
      'Haɗuwa masu haɗari tare da sauran magunguna',
      'Serotonin ciwon',
      'Hanta lalacewar daga sauran sinadaran a cikin tsari',
      'Tasirin da ba a iya faɗi ba a allurai daban-daban'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '28',
    name: 'Nitrous Oxide',
    type: 'Kandəɲa kashe kəlɲa',
    riskLevel: 'medium',
    shortDescription: 'Gas da ake shawa yana haifar da ɗan gajeren farin ciki da rarrabuwa.',
    longDescription: 'Nitrous oxide, wanda aka fi sani da "gas mai dariya," maganin sa barci ne na likita wanda ke haifar da tasirin farin ciki da rarrabuwa na ɗan lokaci lokacin shan iska don nishaɗi. Duk da yake tasirin yana da ɗan gajeren lokaci, yana ɗauke da haɗarin rasa iskar oxygen da lalacewar jijiyoyi.',
    effects: [
      'Gajeren farin ciki da dariya',
      'Jiri da jiri',
      'Sauti karkatacce',
      'Gani hangen nesa'
    ],
    risks: [
      'Oxygen rashin wanda ke haifar da kwakwalwa lalacewar',
      'Bitamin B12 rashin tare da amfani na yau da kullun',
      'Sanyi daga matsanancin gas',
      'Suma da rauni na bazata'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '29',
    name: 'Steroids',
    type: 'Aiki Haɓaka',
    riskLevel: 'medium',
    shortDescription: 'Abubuwa na roba kama da hormones ɗin jima\'i na maza.',
    longDescription: 'Steroids na anabolic abubuwa ne na roba kama da hormone ɗin jima\'i na maza testosterone. Ana amfani da su a likita don wasu yanayi amma sau da yawa ana amfani da su mara kyau don haɓaka girma da ƙwararren gwaninta, suna ɗauke da manyan haɗarin kiwon lafiya.',
    effects: [
      'Tsoka ƙwayar nda ƙarfi ƙaruwar',
      'Motsa jiki aikin ingantaccen',
      'Tashin hankali ƙaruwar ("roid fushin")',
      'Kuraje da namiji ƙwanƙwasa'
    ],
    risks: [
      'Zuciya harbin da bugun jini',
      'Hanta lalacewa da ciwon daji',
      'Haihuwa rashin da jima\'i aikin rashin',
      'Yanayi matsalolin masu tsanani'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '30',
    name: 'Caffeine',
    type: 'Kandəɲa korta',
    riskLevel: 'low',
    shortDescription: 'Kandəɲa korta mai laushi da ake samu a cikin kofi, shayi, da abubuwan sha na kəlɲa.',
    longDescription: 'Caffeine shine mafi yawan abin da ake amfani da shi a duniya mai shafar hankali. Duk da yake gabaɗaya lafiya cikin daidaito, yawan amfani yana iya haifar da matsalolin kiwon lafiya, kuma wasu mutane suna haɓaka dogaro tare da alamun janyewa.',
    effects: [
      'Fahimi nda kəlɲa ga zəwa',
      'Maida hankali ingantacce',
      'Gajiya taimako na wucin gadi',
      'Zuciya nda jini ga zəwa'
    ],
    risks: [
      'Fəɲa nda rashin barci tare da manyan allurai',
      'Jiki dogaro nda janyewa',
      'Zuciya bugun a cikin mutane masu kula',
      'Narkewar abinci matsaloli'
    ],
    image: require('../../../assets/images/marijuana.png'),
  }
];