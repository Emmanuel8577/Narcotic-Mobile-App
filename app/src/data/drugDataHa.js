export const drugData = [
  {
    id: '1',
    name: 'Cocaine',
    type: 'Mai ƙarfafawa',
    riskLevel: 'high',
    shortDescription: 'Maganin ƙarfafawa mai saukin kamuwa wanda ke shafar kwakwalwa.',
    longDescription: 'Cocaine maganin ƙarfafawa ne mai saukin kamuwa da aka yi daga ganyen shukar coca da ke asalin Kudancin Amurka. Yana haifar da farin ciki na ɗan lokaci, kuzari, da yawan magana. Duk da haka, yana iya haifar da tsoro kuma yana da saukin kamuwa tare da alamun janyewar da suka shafi.',
    effects: [
      'Ƙaruwar kuzari da fahimi',
      'Farin ciki da kwarin gwiwa',
      'Ƙaruwar bugun zuciya da hawan jini',
      'Tashin hankali da tsoro',
      'Rage cin abinci'
    ],
    risks: [
      'Harbin zuciya da bugun jini',
      'Gazawar numfashi',
      'Mummunan jaraba',
      'Lalacewar septum na hanci',
      'Halakar kuɗi'
    ],
    image: require('../../../assets/images/cocaine.png'),
  },
  {
    id: '2',
    name: 'Heroin',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Maganin opioid mai saukin kamuwa wanda ke haifar da tsananin farin ciki.',
    longDescription: 'Heroin maganin opioid ne ba bisa ka\'ida ba, mai saukin kamuwa wanda aka haɗa daga morphine. Yana haifar da tsananin farin ciki amma yana ɗauke da hatsarori masu tsanani ciki har da yawan shan magani. Yin amfani da heroin ya kai matakin annoba a ƙasashe da yawa.',
    effects: [
      'Tsananin farin ciki',
      'Barci da kwantar da hankali',
      'Tashin zuciya da amai',
      'Rudani da dusar ƙura tunani'
    ],
    risks: [
      'Yawan shan magani na mutuwa',
      'Cututtuka masu yaduwa daga raba allura',
      'Jijiyoyin jini sun ruguje',
      'Cutar hanta da koda'
    ],
    image: require('../../../assets/images/heroin.png'),
  },
  {
    id: '3',
    name: 'Marijuana (Cannabis)',
    type: 'Cannabis',
    riskLevel: 'medium',
    shortDescription: 'Maganin da ke shafar hankali daga shukar Cannabis.',
    longDescription: 'Marijuana magani ne mai shafar hankali daga shukar Cannabis da ake amfani dashi don dalilai na likita da nishaɗi. Duk da cewa ana ɗaukarsa mara haɗari fiye da sauran magunguna da yawa, har yanzu yana iya haifar da dogaro da matsalolin lafiyar hankali, musamman a cikin matasa masu amfani.',
    effects: [
      'Canza hankali da fahimta',
      'Canjin yanayi da shakatawa',
      'Rashin ƙwaƙwalwar ajiya da daidaitawa',
      'Ƙaruwar ci'
    ],
    risks: [
      'Rashin ci gaban kwakwalwa a cikin samari',
      'Matsalolin numfashi daga shan taba',
      'Matsalolin lafiyar hankali a cikin mutanen da suka riga sun kamu',
      'Jaraba tare da amfani mai yawa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '4',
    name: 'MDMA (Ecstasy)',
    type: 'Mai ƙarfafawa/Mai ruɗi',
    riskLevel: 'high',
    shortDescription: 'Maganin roba wanda ke canza yanayi da fahimta.',
    longDescription: 'MDMA, wanda aka fi sani da Ecstasy, maganin roba ne wanda ke canza yanayi da fahimta. Ya shahara a wuraren bukukuwa amma yana iya haifar da hauhawar yanayin jiki mai haɗari da matsalolin zuciya.',
    effects: [
      'Ƙaruwar kuzari da tausayawa',
      'Dumin zuciya da kusanci',
      'Karkataccen fahimtar lokaci',
      'Ingantaccen fahimtar hankali'
    ],
    risks: [
      'Mummunan rashin ruwa',
      'Bugun zafi da zafi',
      'Gazawar zuciya',
      'Matsalolin ƙwaƙwalwar ajiya na dogon lokaci'
    ],
    image: require('../../../assets/images/mdma.png'),
  },
  {
    id: '5',
    name: 'Methamphetamine',
    type: 'Mai ƙarfafawa',
    riskLevel: 'high',
    shortDescription: 'Maganin ƙarfafawa mai saukin kamuwa wanda ke lalata kwakwalwa sosai.',
    longDescription: 'Methamphetamine maganin ƙarfafawa ne mai matuƙar saukin kamuwa wanda ke shafar tsakiyar tsarin juyayi. Yana haifar da matsalolin haƙori masu tsanani ("bakin meth"), raunukan fata, da mummunar lalacewar kwakwalwa tare da amfani mai tsayi.',
    effects: [
      'Tsananin farin ciki',
      'Ƙaruwar kuzari da fahimi',
      'Rage cin abinci',
      'Halin tashin hankali ko tashin hankali'
    ],
    risks: [
      'Mummunar lalacewar haƙori',
      'Ciwon hauka da tsoro',
      'Lalacewar zuciya da bugun jini',
      'Rashin nauyi mai tsanani'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '6',
    name: 'Fentanyl',
    type: 'Opioid',
    riskLevel: 'high',
    shortDescription: 'Opioid na roba mai ƙarfi sosai.',
    longDescription: 'Fentanyl opioid ne na roba mai ƙarfi sau 50-100 fiye da morphine. Ana amfani dashi bisa doka don magance ciwo mai tsanani amma ya zama babban abin da ke haifar da mutuwar yawan shan maganin opioid lokacin da aka yi amfani da shi ba bisa ka\'ida ba.',
    effects: [
      'Matsananin farin ciki',
      'Magance ciwo',
      'Barci da kwantar da hankali',
      'Rashin numfashi'
    ],
    risks: [
      'Yawan shan magani na mutuwa cikin sauri',
      'Dakatarwar numfashi',
      'Yuwuwar jaraba mai tsanani',
      'Ƙarfin da ba a iya faɗi ba a cikin magungunan titi'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '7',
    name: 'LSD (Acid)',
    type: 'Mai ruɗi',
    riskLevel: 'medium',
    shortDescription: 'Maganin ruɗi mai ƙarfi wanda ke canza fahimta.',
    longDescription: 'LSD maganin ruɗi ne mai ƙarfi wanda ke haifar da canje-canje masu mahimmanci a cikin fahimta, yanayi, da tunani. Duk da cewa ba a ɗauke shi mai saukin kamuwa ba, yana iya haifar da abubuwan ban tsoro da matsalolin tunani na dogon lokaci.',
    effects: [
      'Hankali na gani da na ji',
      'Canjin fahimtar lokaci',
      'Abubuwan ruhaniya',
      'Canjin yanayi'
    ],
    risks: [
      "'Tafiye-tafiye mara kyau' yana haifar da firgici",
      'Rashin fahimta na dindindin',
      'Raunin da ba da gangan ba yayin amfani',
      'Tada cutar hauka mai ɓoye'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '8',
    name: 'Psilocybin (Magic Mushrooms)',
    type: 'Mai ruɗi',
    riskLevel: 'medium',
    shortDescription: 'Abun ruɗi na halitta da ke cikin naman kaza.',
    longDescription: 'Psilocybin wani abu ne na ruɗi na halitta da ake samu a cikin wasu nau\'in naman kaza. Yana haifar da tasiri irin na LSD amma gabaɗaya ana ɗaukar yana da ɗan gajeren lokaci da yanayin tasiri daban-daban.',
    effects: [
      'Karkataccen gani da hangen nesa',
      'Farin ciki da abubuwan ruhaniya',
      'Canje-canjen tunani',
      'Karkataccen lokaci'
    ],
    risks: [
      'Guba daga naman kaza da ba a gane su ba',
      'Tashin hankali da firgici',
      'Hali mai haɗari yayin rashin lafiya',
      'Mummunan yanayin lafiyar hankali'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '9',
    name: 'Barasa',
    type: 'Mai kashe kuzari',
    riskLevel: 'medium',
    shortDescription: 'Mai kashe kuzari na doka wanda ke shafar tsakiyar tsarin juyayi.',
    longDescription: 'Barasa mai kashe kuzari ne na doka wanda ke rage ayyukan muhimman ayyuka da rashin daidaitawar haɗin kai, hukunci, da lokacin amsawa. Duk da cewa an yarda da shi a cikin al\'umma, yana ɗauke da manyan haɗarin kiwon lafiya da yuwuwar jaraba.',
    effects: [
      'Shakatawa da rage hanawa',
      'Rashin daidaitawa da hukunci',
      'Magana mara kyau',
      'Rashin ƙwaƙwalwar ajiya'
    ],
    risks: [
      'Ciwo na hanta da cuta',
      'Jarabar barasa (shaye-shaye)',
      'Ƙaruwar haɗarin ciwon daji',
      'Lalacewar kwakwalwa da asarar ƙwaƙwalwar ajiya'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '10',
    name: 'Nicotine (Taba)',
    type: 'Mai ƙarfafawa',
    riskLevel: 'medium',
    shortDescription: 'Maganin ƙarfafawa mai saukin kamuwa da ake samu a cikin kayayyakin taba.',
    longDescription: 'Nicotine shine farkon abin da ke saukin kamuwa a cikin kayayyakin taba. Duk da cewa tasirin nan take yana da laushi idan aka kwatanta da sauran magunguna, nicotine yana da matuƙar saukin kamuwa kuma amfani da taba shine babban abin da ke haifar da mutuwar da za a iya karewa a duniya.',
    effects: [
      'Ƙarfafawa da fahimi',
      'Rage cin abinci',
      'Ƙaruwar bugun zuciya',
      'Shakatawa a cikin masu amfani na yau da kullun'
    ],
    risks: [
      'Ciwon daji na huhu da cututtukan numfashi',
      'Cutar zuciya da bugun jini',
      'Yuwuwar jaraba mai tsanani',
      'Tsufa da lalacewar fata'
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
      'Magance ciwo',
      'Farin ciki da shakatawa',
      'Barci da kwantar da hankali',
      'Rashin numfashi'
    ],
    risks: [
      'Mummunan jaraba da dogaro',
      'Gazawar numfashi a cikin yawan shan magani',
      'Alamun janyewa',
      'Hanyar zuwa amfani da heroin'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '12',
    name: 'Benzodiazepines',
    type: 'Mai kashe kuzari',
    riskLevel: 'medium',
    shortDescription: 'Magungunan kwantar da hankali na magani don tashin hankali da barci.',
    longDescription: 'Benzodiazepines magungunan magani ne da ake amfani da su don magance tashin hankali, rashin barci, da kamewa. Suna da inganci lokacin da aka yi amfani da su kamar yadda aka tsara amma suna ɗauke da haɗarin dogaro da alamun janyewar haɗari.',
    effects: [
      'Rage tashin hankali da tashin hankali',
      'Kwantar da hankali da barci',
      'Shakatawar tsoka',
      'Rashin ƙwaƙwalwar ajiya'
    ],
    risks: [
      'Dogaro na jiki da jaraba',
      'Hatsarin janyewa masu haɗari',
      'Matsalolin ƙwaƙwalwar ajiya tare da amfani na dogon lokaci',
      'Haɗarin yawan shan magani lokacin da aka haɗa shi da barasa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '13',
    name: 'Adderall (Amphetamines)',
    type: 'Mai ƙarfafawa',
    riskLevel: 'medium',
    shortDescription: 'Maganin ƙarfafawa na magani don ADHD sau da yawa ana amfani da shi mara kyau.',
    longDescription: 'Adderall da sauran magungunan ƙarfafawa na magani ana amfani da su don magance ADHD amma sau da yawa ana amfani da su mara kyau don haɓaka fahimi ko dalilai na nishaɗi. Yin amfani da shi mara kyau na iya haifar da matsalolin zuciya da na hankali masu mahimmanci.',
    effects: [
      'Ƙaruwar mayar da hankali da maida hankali',
      'Hawan yanayi da kuzari',
      'Rage cin abinci',
      'Rashin barci'
    ],
    risks: [
      'Matsalolin zuciya da hawan jini',
      'Tashin hankali da tsoro',
      'Jaraba da dogaro',
      'Ciwon hauka tare da manyan allurai'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '14',
    name: 'Ketamine',
    type: 'Maganin sa barci mai rarraba',
    riskLevel: 'high',
    shortDescription: 'Maganin sa barci na likita da ake amfani dashi don nishaɗi don tasirin rarrabuwa.',
    longDescription: 'Ketamine maganin sa barci ne na likita wanda ke haifar da tasirin rarrabuwa a ƙananan allurai. Yana da ingantaccen amfani na likita amma yana ɗauke da haɗari lokacin da aka yi amfani da shi don nishaɗi, gami da lalacewar mafitsara da matsalolin hankali.',
    effects: [
      'Rarrabuwa daga jiki da muhalli',
      'Karkataccen gani da ji',
      'Rashin aikin mota',
      'Magance ciwo'
    ],
    risks: [
      'Lalacewar fili na mafitsara da mafitsara',
      'Matsalolin ƙwaƙwalwar ajiya da hankali',
      'Raunin da ba da gangan ba yayin rashin lafiya',
      'Dogaro na hankali'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '15',
    name: 'GHB',
    type: 'Mai kashe kuzari',
    riskLevel: 'high',
    shortDescription: 'Mai kashe kuzari na tsakiyar tsarin juyayi sau da yawa ana amfani dashi azaman maganin lalatar kwanan wata.',
    longDescription: 'GHB mai kashe kuzari ne na tsakiyar tsarin juyayi wanda aka yi amfani da shi a likita amma an fi haɗa shi da amfani na nishaɗi da lalatar jima\'i ta hanyar magani. Yana da matuƙar haɗari lokacin da aka haɗa shi da barasa.',
    effects: [
      'Farin ciki da shakatawa',
      'Ƙaruwar zamantakewa',
      'Barci da kwantar da hankali',
      'Asarar ƙwaƙwalwar ajiya'
    ],
    risks: [
      'Rashin numfashi da koma',
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
      'Asarar haɗin kai'
    ],
    risks: [
      'Ciwon shan iska na kwatsam',
      'Lalacewar kwakwalwa ta dindindin',
      'Lalacewar hanta da koda',
      'Gazawar zuciya'
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
      'Shakatawa da canjin fahimta',
      'Hawan yanayi',
      'Canjin fahimtar gaskiya',
      'Alamun hauka'
    ],
    risks: [
      'Matsananin tashin hankali da tsoro',
      'Hauka da hangen nesa',
      'Bugun zuciya da harbin zuciya',
      'Lalacewar koda da kamewa'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '18',
    name: 'Gishirin Wanka',
    type: 'Mai ƙarfafawa',
    riskLevel: 'high',
    shortDescription: 'Cathinones na roba tare da tasirin ƙarfafawa mai tsanani.',
    longDescription: '"Gishirin wanka" cathinones ne na roba waɗanda ke haifar da tasirin ƙarfafawa mai tsanani kama da amphetamines da cocaine. Suna da matuƙar haɗari kuma an haɗa su da halayen tashin hankali da matsalolin likita masu tsanani.',
    effects: [
      'Tsananin farin ciki da kuzari',
      'Ƙaruwar zamantakewa da sha\'awar jima\'i',
      'Tsoro da tashin hankali',
      'Hankali'
    ],
    risks: [
      'Matsananin tsoro da tashin hankali',
      'Harbin zuciya da bugun jini',
      'Mummunan rashin ruwa',
      'Tunanin kashe kansa da hali'
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
      'Jin rabuwa da gaskiya',
      'Hankali da ruɗi',
      'Rashin jin zafi da rashin ciwo',
      'Halin tashin hankali ko m'
    ],
    risks: [
      'Hauka da cutar hauka na dogon lokaci',
      'Cutar kai ko kashe kansa',
      'Halin tashin hankali ga wasu',
      'Kamewa da koma'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '20',
    name: 'DMT',
    type: 'Mai ruɗi',
    riskLevel: 'medium',
    shortDescription: 'Abun ruɗi mai ƙarfi, ɗan gajeren aiki.',
    longDescription: 'DMT wani abu ne mai ƙarfi na ruɗi wanda ke faruwa a zahiri a cikin shuke-shuke da dabbobi da yawa. Yana haifar da hangen nesa na gani da na ji masu tsanani amma gajerun rayuwa, galibi ana kwatanta su azaman abubuwan ruhaniya ko na wannan duniya.',
    effects: [
      'Hangen nesa na gani da na ji masu tsanani',
      'Canjin fahimtar lokaci da gaskiya',
      'Abubuwan ruhaniya ko na asiri',
      'Saurin farawa da ɗan gajeren lokaci'
    ],
    risks: [
      'Damuwar hankali yayin gwaninta',
      'Raunin da ba da gangan ba yayin rashin lafiya',
      'Mummunan yanayin lafiyar hankali',
      'Sakamakon doka'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '21',
    name: 'Codeine',
    type: 'Opioid',
    riskLevel: 'medium',
    shortDescription: 'Maganin kai hari na opioid sau da yawa ana amfani da shi mara kyau a cikin sirup ɗin tari.',
    longDescription: 'Codeine maganin ciwo ne na opioid sau da yawa ana amfani dashi a cikin maganin tari na magani. Yana da ingantaccen amfani na likita amma ana yin amfani da shi akai-akai, musamman a cikin nau\'in "lean" ko "purple drank" lokacin da aka haɗa shi da soda.',
    effects: [
      'Magance ciwo mai laushi zuwa matsakaici',
      'Farin ciki da shakatawa',
      'Barci da kwantar da hankali',
      'Danne tari'
    ],
    risks: [
      'Rashin numfashi',
      'Jaraba da dogaro',
      'Lalacewar hanta daga acetaminophen a cikin tsari',
      'Haɗuwa masu haɗari tare da sauran masu kashe kuzari'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '22',
    name: 'Tramadol',
    type: 'Opioid',
    riskLevel: 'medium',
    shortDescription: 'Maganin kai hari na roba na opioid tare da tasirin serotonin.',
    longDescription: 'Tramadol maganin kai hari ne na roba na opioid wanda kuma yana shafar matakan serotonin. Ana ɗaukar yana da ƙaramin yuwuwar cin zarafi fiye da sauran opioids amma har yanzu yana ɗauke da haɗarin jaraba da illolin gefe masu haɗari.',
    effects: [
      'Magance ciwo',
      'M farin ciki',
      'Tasirin yanayi na serotonin',
      'Barci'
    ],
    risks: [
      'Kamewa, musamman a cikin manyan allurai',
      'Ciwon serotonin lokacin da aka haɗa shi da sauran magunguna',
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
    longDescription: 'Kratom bishiya ce mai zafi ta asalin Kudancin Asiya wadda ganyenta ke ɗauke da mahaɗan da zasu iya samun tasirin hankali. Ana amfani da shi a al\'ada don magance ciwo da kuzari amma yana ɗauke da haɗarin jaraba da mara tabbataccen bayanin aminci.',
    effects: [
      'Magance ciwo a manyan allurai',
      'Tasirin ƙarfafawa a ƙananan allurai',
      'M farin ciki',
      'Magance tashin hankali'
    ],
    risks: [
      'Alamun jaraba da janyewa',
      'Guba na hanta',
      'Ingancin samfur mara tsari',
      'Mai haɗari lokacin da aka haɗa shi da sauran magunguna'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '24',
    name: 'Salvia',
    type: 'Mai ruɗi',
    riskLevel: 'medium',
    shortDescription: 'Shuka na halitta yana samar da hangen nesa mai tsanani, gajeriyar rayuwa.',
    longDescription: 'Salvia divinorum shuka ce ta asalin Mexico wacce ke haifar da tasirin ruɗi mai tsanani amma gajeriyar rayuwa lokacin cinyewa. Yana da doka a wasu wurare amma yana iya haifar da abubuwan ban tsoro da halayen haɗari.',
    effects: [
      'Hangen nesa mai tsanani, gajeriyar rayuwa',
      'Canjin fahimtar gaskiya',
      'Dariya mara iyaka',
      'Abubuwan da suka wuce jiki'
    ],
    risks: [
      'Raunin da ba da gangan ba yayin yanayin rashin lafiya',
      'Damuwar hankali',
      'Tasirin da ba a iya faɗi ba',
      'Matsalolin doka a wasu yankuna'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '25',
    name: 'Ayahuasca',
    type: 'Mai ruɗi',
    riskLevel: 'medium',
    shortDescription: 'Gargajiyar Amazonian brew tare da shuke-shuke masu ɗauke da DMT.',
    longDescription: 'Ayahuasca wani abu ne na gargajiya na Amazonian mai shafar hankali da ake amfani dashi don dalilai na ruhaniya da warkarwa. Ya ƙunshi DMT da masu hana MAO, yana samar da gwaninta mai tsanani na hangen nesa wanda zai iya ɗaukar sa\'o\'i da yawa.',
    effects: [
      'Gwaninta na gani da na ruhaniya masu tsanani',
      'Sakin tunani da bincike',
      'Tashin zuciya da amai (wani ɓangare na amfani na gargajiya)',
      'Canjin fahimtar lokaci da kai'
    ],
    risks: [
      'Haɗuwar magunguna masu haɗari (musamman tare da magungunan rage damuwa)',
      'Raunin hankali daga gwaninta mai tsanani',
      'Haɗarin jiki daga shirye-shiryen da ba a tsara su ba',
      'Yin amfani da su a cikin bukukuwan kasuwanci'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '26',
    name: 'Mescaline',
    type: 'Mai ruɗi',
    riskLevel: 'medium',
    shortDescription: 'Ruɗi na halitta daga peyote da sauran cacti.',
    longDescription: 'Mescaline wani alkaloid ne na ruɗi na halitta da ake samu a cikin wasu nau\'in cactus, mafi yawanci peyote. An yi amfani da shi a al\'ada a cikin bukukuwan addinin \'yan asalin Amurka kuma yana haifar da tasiri irin na LSD.',
    effects: [
      'Hangen nesa na gani da ingantattun launuka',
      'Canjin tunani da fahimta',
      'Abubuwan ruhaniya',
      'Tashin zuciya yayin farawa'
    ],
    risks: [
      'Damuwar hankali yayin gwaninta',
      'Hali mai haɗari yayin rashin lafiya',
      'Matsalolin doka tare da mallaka',
      'Abubuwan kiyayewa tare da peyote na daji'
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
      'Canjin fahimtar gaskiya',
      'Haɓakar gani da ji',
      'Rashin aikin mota'
    ],
    risks: [
      'Haɗuwa masu haɗari tare da sauran magunguna',
      'Ciwon serotonin',
      'Lalacewar hanta daga sauran sinadaran a cikin tsari',
      'Tasirin da ba a iya faɗi ba a allurai daban-daban'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '28',
    name: 'Nitrous Oxide',
    type: 'Mai kashe kuzari',
    riskLevel: 'medium',
    shortDescription: 'Gas da ake shawa yana haifar da ɗan gajeren farin ciki da rarrabuwa.',
    longDescription: 'Nitrous oxide, wanda aka fi sani da "gas mai dariya," maganin sa barci ne na likita wanda ke haifar da tasirin farin ciki da rarrabuwa na ɗan lokaci lokacin shan iska don nishaɗi. Duk da yake tasirin yana da ɗan gajeren lokaci, yana ɗauke da haɗarin rasa iskar oxygen da lalacewar jijiyoyi.',
    effects: [
      'Gajeren farin ciki da dariya',
      'Jiri da jiri',
      'Karkataccen sauti',
      'Hangen nesa na gani'
    ],
    risks: [
      'Rashin iskar oxygen wanda ke haifar da lalacewar kwakwalwa',
      'Rashin bitamin B12 tare da amfani na yau da kullun',
      'Sanyi daga matsanancin gas',
      'Suma da rauni na bazata'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '29',
    name: 'Steroids',
    type: 'Haɓaka Aiki',
    riskLevel: 'medium',
    shortDescription: 'Abubuwa na roba kama da hormones ɗin jima\'i na maza.',
    longDescription: 'Steroids na anabolic abubuwa ne na roba kama da hormone ɗin jima\'i na maza testosterone. Ana amfani da su a likita don wasu yanayi amma sau da yawa ana amfani da su mara kyau don haɓaka girma da ƙwararren gwaninta, suna ɗauke da manyan haɗarin kiwon lafiya.',
    effects: [
      'Ƙaruwar ƙwayar tsoka da ƙarfi',
      'Ingantaccen aikin wasan motsa jiki',
      'Ƙaruwar tashin hankali ("fushin roid")',
      'Kuraje da ƙwanƙwasa namiji'
    ],
    risks: [
      'Harbin zuciya da bugun jini',
      'Lalacewar hanta da ciwon daji',
      'Rashin haihuwa da rashin aikin jima\'i',
      'Matsalolin yanayi masu tsanani'
    ],
    image: require('../../../assets/images/marijuana.png'),
  },
  {
    id: '30',
    name: 'Caffeine',
    type: 'Mai ƙarfafawa',
    riskLevel: 'low',
    shortDescription: 'Maganin ƙarfafawa mai laushi da ake samu a cikin kofi, shayi, da abubuwan sha na kuzari.',
    longDescription: 'Caffeine shine mafi yawan abin da ake amfani da shi a duniya mai shafar hankali. Duk da yake gabaɗaya lafiya cikin daidaito, yawan amfani yana iya haifar da matsalolin kiwon lafiya, kuma wasu mutane suna haɓaka dogaro tare da alamun janyewa.',
    effects: [
      'Ƙaruwar fahimi da kuzari',
      'Ingantaccen maida hankali',
      'Taimakon wucin gadi daga gajiya',
      'Ƙaruwar bugun zuciya da hawan jini'
    ],
    risks: [
      'Tashin hankali da rashin barci tare da manyan allurai',
      'Dogaro na jiki da janyewa',
      'Bugun zuciya a cikin mutane masu kula',
      'Matsalolin narkewar abinci'
    ],
    image: require('../../../assets/images/marijuana.png'),
  }
];