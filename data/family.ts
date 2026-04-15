import type { Person } from "@/types/person";

export const familyData: Person[] = [
  // ─── Generation 4: Grandchildren ─────────────────────────────────────────
  {
    id: "jan-linnea-lindoff",
    firstName: "Linnéa",
    lastName: "Lindoff",
    fullName: "Linnéa Lindoff",
    gender: "female",
    side: "Jans sida",
    role: "Barnbarn",
    generation: 4,
    birthDate: "2012-12-12",
    birthYear: 2012,
    parents: ["jan-andreas-lindoff", "jan-nina-lindoff"],
    bioShort: "Linnéa Lindoff, född 12 december 2012, dotter till Andreas och Nina Lindoff.",
  },
  {
    id: "jan-lukas-lindoff",
    firstName: "Lukas",
    lastName: "Lindoff",
    fullName: "Lukas Lindoff",
    gender: "male",
    side: "Jans sida",
    role: "Barnbarn",
    generation: 4,
    birthDate: "2015-03-02",
    birthYear: 2015,
    parents: ["jan-andreas-lindoff", "jan-nina-lindoff"],
    bioShort: "Lukas Lindoff, född 2 mars 2015, son till Andreas och Nina Lindoff.",
  },
  {
    id: "jan-louica-lindoff",
    firstName: "Louica",
    lastName: "Lindoff",
    fullName: "Louica Lindoff",
    gender: "female",
    side: "Jans sida",
    role: "Barnbarn",
    generation: 4,
    birthDate: "2019-12-02",
    birthYear: 2019,
    parents: ["jan-andreas-lindoff", "jan-nina-lindoff"],
    bioShort: "Louica Lindoff, född 2 december 2019, dotter till Andreas och Nina Lindoff.",
  },
  {
    id: "jan-ossian-lindoff-wiman",
    firstName: "Ossian",
    lastName: "Lindoff Wiman",
    fullName: "Ossian Lindoff Wiman",
    gender: "male",
    side: "Jans sida",
    role: "Barnbarn",
    generation: 4,
    birthDate: "2025-08-08",
    birthYear: 2025,
    parents: ["jan-mattias-lindoff", "jan-elina-wiman"],
    bioShort: "Ossian Lindoff Wiman, född 8 augusti 2025, son till Mattias Lindoff och Elina Wiman.",
  },

  // ─── Generation 3: Present ───────────────────────────────────────────────
  {
    id: "jan-andreas-lindoff",
    firstName: "Andreas",
    lastName: "Lindoff",
    fullName: "Andreas Lindoff",
    gender: "male",
    side: "Jans sida",
    role: "Son",
    generation: 3,
    birthDate: "1981-09-02",
    birthYear: 1981,
    parents: ["jan", "karin"],
    partner: ["jan-nina-lindoff"],
    children: ["jan-linnea-lindoff", "jan-lukas-lindoff", "jan-louica-lindoff"],
    bioShort: "Andreas Lindoff, född 2 september 1981, son till Jan och Karin Lindoff. Tog studenten 2000. Bor på Nöbbelövsgården sedan 2008. Tillsammans med Nina, tre barn.",
    bioLong: "Andreas Lindoff föddes den 2 september 1981 som förste sonen till Jan och Karin Lindoff. Han tog studenten den 8 juni 2000. År 2003 flyttade han till morfar Lennarts gamla lägenhet på Lagerbrings väg i Lund. 2008 flyttade han till Nöbbelövsgården. År 2010 träffade han Nina. Tillsammans har de barnen Linnéa (2012), Lukas (2015) och Louica (2019).",
    storySections: [
      {
        title: "Uppväxt och studier",
        text: "Andreas Lindoff är den äldste sonen till Jan och Karin. Han tog studenten 2000 och har starka band till Nöbbelövsgården, dit han flyttade 2008.",
      },
    ],
    timeline: [
      { year: "1981", title: "Född", description: "Andreas Lindoff föds den 2 september 1981.", type: "birth" },
      { year: "2000", title: "Studenten", description: "Tar studenten den 8 juni 2000.", type: "other" },
      { year: "2008", title: "Flyttar till Nöbbelöv", description: "Bosätter sig på Nöbbelövsgården.", type: "move" },
      { year: "2010", title: "Träffar Nina", description: "Andreas träffar Nina.", type: "other" },
    ],
  },
  {
    id: "jan-nina-lindoff",
    firstName: "Nina",
    lastName: "Lindoff",
    fullName: "Nina Lindoff",
    gender: "female",
    side: "Jans sida",
    role: "Svärdotter",
    generation: 3,
    partner: ["jan-andreas-lindoff"],
    children: ["jan-linnea-lindoff", "jan-lukas-lindoff", "jan-louica-lindoff"],
    bioShort: "Nina Lindoff, sambo med Andreas Lindoff. Tillsammans med Andreas tre barn: Linnéa (2012), Lukas (2015) och Louica (2019).",
  },
  {
    id: "jan-mattias-lindoff",
    firstName: "Mattias",
    lastName: "Lindoff",
    fullName: "Mattias Lindoff",
    gender: "male",
    side: "Jans sida",
    role: "Son",
    generation: 3,
    birthDate: "1984-05-24",
    birthYear: 1984,
    parents: ["jan", "karin"],
    partner: ["jan-elina-wiman"],
    children: ["jan-ossian-lindoff-wiman"],
    bioShort: "Mattias Lindoff, född 24 maj 1984, son till Jan och Karin Lindoff. Tog studenten 2003. Bor på Nöbbelövsgården sedan 2015. Tillsammans med Elina Wiman, sonen Ossian (2025).",
    bioLong: "Mattias Lindoff föddes den 24 maj 1984 som andresonen till Jan och Karin Lindoff. Han tog studenten den 3 juni 2003. År 2009 flyttade han till Lagerbrings väg i Lund. 2015 flyttade han in på Nöbbelövsgården. Han är tillsammans med Elina Wiman och de fick sonen Ossian den 8 augusti 2025.",
    storySections: [
      {
        title: "Uppväxt och familj",
        text: "Mattias Lindoff är den yngre sonen till Jan och Karin. Han tog studenten 2003, bodde på Lagerbrings väg och flyttade sedan till Nöbbelövsgården 2015. Med Elina Wiman fick han sonen Ossian 2025.",
      },
    ],
    timeline: [
      { year: "1984", title: "Född", description: "Mattias Lindoff föds den 24 maj 1984.", type: "birth" },
      { year: "2003", title: "Studenten", description: "Tar studenten den 3 juni 2003.", type: "other" },
      { year: "2015", title: "Flyttar till Nöbbelöv", description: "Bosätter sig på Nöbbelövsgården.", type: "move" },
      { year: "2025", title: "Ossian föds", description: "Sonen Ossian Lindoff Wiman föds den 8 augusti 2025.", type: "other" },
    ],
  },
  {
    id: "jan-elina-wiman",
    firstName: "Elina",
    lastName: "Wiman",
    fullName: "Elina Wiman",
    gender: "female",
    side: "Jans sida",
    role: "Partner",
    generation: 3,
    partner: ["jan-mattias-lindoff"],
    children: ["jan-ossian-lindoff-wiman"],
    bioShort: "Elina Wiman, tillsammans med Mattias Lindoff. Mamma till Ossian Lindoff Wiman (2025).",
  },
  // ─── Generation 2: Parents ───────────────────────────────────────────────
  {
    id: "jan",
    firstName: "Jan",
    lastName: "Lindoff",
    fullName: "Jan Lindoff",
    gender: "male",
    side: "Jans sida",
    role: "Pappa",
    generation: 2,
    birthDate: "1956-11-01",
    birthYear: 1956,
    birthPlace: "Norra Nöbbelöv",
    occupation: "Lantbrukare / Maskinreparatör / Företagare",
    children: ["jan-andreas-lindoff", "jan-mattias-lindoff"],
    partner: ["karin"],
    parents: ["jan-kjell-jonsson", "jan-siv-jonsson-lindoff"],
    bioShort:
      "Jan Lindoff, född 1956 på Nöbbelövsgården. Maskinreparatör, grundade Traktor Syd 1991. Medförfattare till LINDOFFS FAMILJESAGA. Bor sedan 2017 på Nöbbelövsgården.",
    bioLong:
      "Jan Lindoff föddes den 1 november 1956 på Norra Nöbbelöv, som andra barnet och enda sonen till Kjell och Siv Jönsson. Han växte upp på gårdens marker och gick i Stångby och Vallkärra skola. I tonåren hade han ett stort intresse för mopeder och mekanik. Den 29 januari 1974 var han med om en svår olycka på arbetsplatsen — en traktordäcksexplosion som gav honom allvarliga ansiktsskador, ett brutet arm och en bruten halskota. Han kom tillbaka och byggde upp sin karriär som maskinreparatör. 1987 startade han eget företag och 1991 grundade han Traktor Syd AB med familjen — med Ford-labradoren som kundmottagare. 1997 övertog han Nöbbelövsgården. 2017 flyttade han och Karin in efter en total renovering. Han är stor ishockeyfan (MIF Redhawks) och spelar bowling. Medförfattare till LINDOFFS FAMILJESAGA.",
    storySections: [
      {
        title: "Uppväxt på Nöbbelövsgården",
        text: "Jan Lindoff växte upp på bondgården i Norra Nöbbelöv. Gården med sin historia av hästar, kor och grisar formade hans uppväxt. Han gick i Stångby och Vallkärra skola, och hade i tonåren ett stort intresse för mekanik och mopeder.",
      },
      {
        title: "Olyckan 1974",
        text: "Den 29 januari 1974 var Jan med om en svår arbetsplatsolycka — ett traktorhjul exploderade och han fick allvarliga ansiktsskador, bröt höger arm på tre ställen och knäckte en halskota. Han fördes till Lunds Lasarett och bedömdes initialt som kritisk. Tack vare skickliga läkare och stark vilja övervann han krisen.",
      },
      {
        title: "Traktor Syd",
        text: "Jan startade eget 1987 och reparerade lantbruksmaskiner. 1991 grundade han Traktor Syd AB med familjen och fick agenturen för Ford/New Holland. Med sex anställda och en labrador som kundmottagare blev det ett välkänt företag. Han sålde bolaget 2001.",
      },
      {
        title: "Nöbbelövsgården",
        text: "1997 övertog Jan gården efter föräldrarna. 2017 flyttade han och Karin in i det totalrenoverade boningshuset. Gården med sin 5000 kvm stora tomt knyter an till generationer av Lindoff-arv — ända tillbaka till dragon Jöns som köpte huset i Kyrkheddinge 1936.",
      },
    ],
    timeline: [
      {
        year: "1956",
        title: "Född i Nöbbelöv",
        description: "Jan Lindoff föds den 1 november 1956 på Norra Nöbbelöv.",
        type: "birth",
      },
      {
        year: "1972",
        title: "Första anställning",
        description: "Börjar som lärling på Ana-Maskin i Staffanstorp den 17 juni 1972.",
        type: "other",
      },
      {
        year: "1974",
        title: "Svår olycka",
        description: "Traktorolycka den 29 januari 1974 — allvarliga skador men Jan överlever.",
        type: "other",
      },
      {
        year: "1977",
        title: "Köper Kyrkheddinge 8:36",
        description: "Jan köper Jöns Andersson Lindoffs gamla fastighet och låter uppföra ett nytt hus.",
        type: "move",
      },
      {
        year: "1991",
        title: "Grundar Traktor Syd",
        description: "Startar Traktor Syd AB med familjen, agenturen för Ford/New Holland.",
        type: "other",
      },
      {
        year: "1997",
        title: "Tar över Nöbbelöv",
        description: "Gården i Nöbbelöv överläts till Jan Lindoff.",
        type: "other",
      },
      {
        year: "2017",
        title: "Flyttar till Nöbbelöv",
        description: "Jan och Karin Lindoff flyttar till Nöbbelövsgården efter en total renovering.",
        type: "move",
      },
    ],
  },
  {
    id: "karin",
    firstName: "Karin",
    lastName: "Lindoff",
    fullName: "Karin Lindoff",
    gender: "female",
    side: "Karins sida",
    role: "Mamma",
    generation: 2,
    birthDate: "1956-11-01",
    birthYear: 1956,
    birthPlace: "Lund",
    occupation: "Ekonom / Revisor",
    bioShort:
      "Karin Lindoff f. Olsson, född 1 november 1956 i Lund. Dotter till Maj-Britt och Lennart Olsson. Uppvuxen med morföräldrarna Knut och Hilma. Ekonom, musiker och medförfattare till LINDOFFS FAMILJESAGA.",
    bioLong:
      "Karin Lindoff, född Olsson, föddes den 1 november 1956 i Lund. Hon är Lennart och Maj-Britts yngsta dotter — bara två månader gammal när Maj-Britt avled. Karins första år tillbringade hon på ett barnhem. Sedan trädde morföräldrarna Knut och Hilma Hansson in som fosterföräldrar, med Lennart boende i trappuppgången bredvid. Karin gick på Tunaskolan i Lund. Hon var blyg under låg- och mellanstadiet men fick en stark vänskap med Gunilla och ett intresse för musik, teater och detektivhistorier. I tonåren hade Karin ett stort intresse för musik och var aktiv i olika blåsorkestrar (flöjt, oboe och altsaxofon). Yrkeslivet förde henne till Öhrlings, sedan Unipath (Clearblue-märket), Nisses Herrmode och E-Invasion. Hon och Jan Lindoff träffades 1993 — 'cirkeln slöts' som familjesagan uttrycker det. Sedan 2017 bor de på Nöbbelövsgården. Karin är medförfattare till LINDOFFS FAMILJESAGA.",
    children: ["jan-andreas-lindoff", "jan-mattias-lindoff"],
    partner: ["jan"],
    parents: ["karin-maj-britt-hansson", "karin-lennart-olsson"],
    siblings: ["karin-ingrid-olsson"],
    storySections: [
      {
        title: "En annorlunda start",
        text: "Karin Lindoff föddes den 1 november 1956 i Lund. Hennes mor Maj-Britt avled bara två månader senare. Karins första år tillbringades på ett barnhem. Det var morföräldrarna Knut och Hilma Hansson som trädde in och gav henne och systern Ingrid ett tryggt hem på Lagerbrings väg i Lund, med pappan Lennart boende i trapphuset bredvid.",
      },
      {
        title: "Skoltiden i Lund",
        text: "Karin började skolan 1962 på Tunaskolan i Lund. Hon var blyg under låg- och mellanstadiet men hade en nära vänskap med Gunilla Kihlstedt. Tillsammans skrev de pjäser och sånger och löste sina egna detektivmysterier — en vänskap som varade hela mellanstadiet.",
      },
      {
        title: "Musik och yrkesliv",
        text: "Musik har alltid spelat en stor roll för Karin. Hon har spelat flöjt, oboe och altsaxofon i blåsorkestrar. Yrkeslivet förde henne till ekonomi — Öhrlings, sedan Unipath där hon jobbade med självtestet Clearblue och reste till England och USA, sedan Nisses Herrmode och E-Invasion.",
      },
      {
        title: "Nöbbelövsgården",
        text: "Karin och Jan Lindoff träffades 1993 och 'cirkeln slöts'. 2017 flyttade de in på den totalrenoverade Nöbbelövsgården — en plats med djupa anknytningar till Jans familjehistoria. Karin är medförfattare till familjearkivet LINDOFFS FAMILJESAGA, skrivet i Lund i september 2025.",
      },
    ],
    timeline: [
      {
        year: "1956",
        title: "Född i Lund",
        description: "Karin Olsson föds den 1 november 1956 i Lund.",
        type: "birth",
      },
      {
        year: "1962",
        title: "Börjar på Tunaskolan",
        description: "Karin börjar skolan på Tunaskolan i Lund.",
        type: "other",
      },
      {
        year: "1993",
        title: "Träffar Jan",
        description: "Karin träffar Jan Lindoff — 'cirkeln slöts'.",
        type: "other",
      },
      {
        year: "2017",
        title: "Flyttar till Nöbbelöv",
        description: "Karin och Jan flyttar till Nöbbelövsgården.",
        type: "move",
      },
    ],
  },

  // ─── Generation 1: Grandparents / Karin's side ────────────────────────────
  {
    id: "karin-maj-britt-hansson",
    firstName: "Maj-Britt",
    lastName: "Hansson",
    fullName: "Maj-Britt Hansson",
    gender: "female",
    side: "Karins sida",
    role: "Mormor",
    generation: 1,
    birthDate: "1930-10-20",
    birthYear: 1930,
    deathDate: "1957-01-07",
    deathYear: 1957,
    birthPlace: "Lund",
    occupation: "Boktryckerianställd",
    children: ["karin", "karin-ingrid-olsson"],
    partner: ["karin-lennart-olsson"],
    parents: ["karin-knut-hansson", "karin-hilma-larsson"],
    bioShort:
      "Maj-Britt Hansson, född 20 oktober 1930 i Lund, gift med Lennart Olsson 1950. Dog alltför ung den 7 januari 1957, 26 år gammal, till följd av en hjärntumör.",
    bioLong:
      "Maj-Britt Hansson föddes den 20 oktober 1930 i Lund. Hon var andra barnet i en syskonskara på tre — äldre syster Gullan (1927) och yngre bror Bertil (1938). Hon växte upp i centrala Lund på Drottensgatan. Efter skolan arbetade hon på Håkan Ohlssons Boktryckeri. Maj-Britt träffade sin blivande make Lennart Olsson på Södran i Lund, ett populärt dansställe. De förlovade sig den 31 december 1948 och gifte sig den 14 oktober 1950. Paret fick dottern Ingrid 1951 och Karin 1956. Maj-Britt var svårt sjuk när hon väntade Karin — tumören slutade upp att växa under graviditeten, men hon var svårt synskadad. Hon avled den 7 januari 1957, bara 26 år gammal.",
    storySections: [
      {
        title: "Barndom i Lund",
        text: "Maj-Britt Hansson föddes den 20 oktober 1930 i Lund som dotter till Knut Hansson och Hilma Larsson. Familjen bodde på Drottensgatan i centrala Lund. Barndomens Lund var ett pulserande centrum med dansbandstider, arbete och gemenskap.",
      },
      {
        title: "Kärleken på Södran",
        text: "Maj-Britt träffade Lennart Olsson på dansstället Södran i Lund. Den 31 december 1948 förlovade de sig och de gifte sig den 14 oktober 1950. Bosätter sig på Lagerbrings väg, ett då nybyggt område i östra Lund.",
      },
      {
        title: "En tragisk bortgång",
        text: "Maj-Britt var svårt sjuk under graviditeten med Karin 1956. Tumören slutade upp att växa under graviditeten, men hon var svårt synskadad. Efter förlossningen gick det snabbt utför. Maj-Britt avled den 7 januari 1957, blott 26 år gammal, och lämnade bakom sig Lennart och de unga döttrarna Ingrid och Karin. Föräldrarna Knut och Hilma trädde in som fosterföräldrar.",
      },
    ],
    timeline: [
      {
        year: "1930",
        title: "Född i Lund",
        description: "Maj-Britt föds den 20 oktober 1930 i Lund som dotter till Knut och Hilma Hansson.",
        type: "birth",
      },
      {
        year: "1948",
        title: "Förlovning",
        description: "Maj-Britt och Lennart Olsson förlovar sig på nyårsafton.",
        type: "other",
      },
      {
        year: "1950",
        title: "Gift med Lennart Olsson",
        description: "Vigsel den 14 oktober 1950.",
        type: "marriage",
      },
      {
        year: "1951",
        title: "Dotter Ingrid Marianne föds",
        description: "Paret välkomnar sin första dotter.",
        type: "other",
      },
      {
        year: "1957",
        title: "Bortgång",
        description: "Maj-Britt avlider den 7 januari 1957, 26 år gammal, till följd av en hjärntumör.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-lennart-olsson",
    firstName: "Lennart",
    lastName: "Olsson",
    fullName: "Lennart Olsson",
    gender: "male",
    side: "Karins sida",
    role: "Morfar",
    generation: 1,
    birthDate: "1922-09-06",
    birthYear: 1922,
    deathDate: "2000-01-12",
    deathYear: 2000,
    birthPlace: "Östra Grevie",
    occupation: "Svetsare / Vaktmästare",
    parents: ["karin-sven-elof-olsson", "karin-elida-petersdotter-alin"],
    children: ["karin", "karin-ingrid-olsson"],
    partner: ["karin-maj-britt-hansson"],
    bioShort:
      "Lennart Olsson (1922–2000), Karins far. Svetsare på Nordiska Armaturfabriken, sedan vaktmästare på Polhemskolan. Gift med Maj-Britt Hansson 1950.",
    bioLong:
      "Lennart Olsson föddes den 6 september 1922 i Östra Grevie som son till en statare. Han var det åttonde barnet i en syskonskara på tio. Som son till en lantarbetare bodde familjen på många ställen under uppväxten. I slutet av 40-talet flyttade han till Lund och fick anställning som svetsare på Nordiska Armaturfabriken. Han träffade Maj-Britt Hansson på dansstället Södran i Lund och de gifte sig den 14 oktober 1950. De bosatte sig på Lagerbrings väg. Maj-Britt avled 1957 och lämnade de unga döttrarna Ingrid och Karin. Lennart ordnade lägenhet åt Britts föräldrar Knut och Hilma i samma hus så att han kunde ha daglig kontakt med barnen. I slutet av 60-talet tog han anställning som vaktmästare på Polhemskolan i Lund — en tjänst han innehade till pensionen. Han var mycket populär bland elever och kollegor. Han var en hängiven cyklist och passionerad läsare. Lennart drabbades av lungcancer och avled den 12 januari 2000.",
    storySections: [
      {
        title: "Uppväxt som statarbarn",
        text: "Lennart Olsson föddes den 6 september 1922 i Östra Grevie som son till lantarbetaren Sven Elof Olsson och Elida Petersdotter Alin. Som statarbarn kom familjen att bo på många ställen i Skåne under uppväxten — Törringe, Klörup, Gässie, Hököpinge och Görslöv bland annat.",
      },
      {
        title: "Mötet med Maj-Britt",
        text: "Lennart träffade Maj-Britt Hansson på dansstället Södran i Lund — ett av stadens mest populära nöjesställen. De förlovade sig på nyårsafton 1948 och gifte sig den 14 oktober 1950. De bosatte sig på Lagerbrings väg, ett då nybyggt område i östra Lund.",
      },
      {
        title: "Ensam far",
        text: "Maj-Britt avled i januari 1957 och Lennart stod ensam med döttrarna Ingrid och Karin. Vid den tidens seder var det omöjligt för en ensamstående man att ta hand om ett spädbarn. Lennart ordnade lägenhet åt Maj-Britts föräldrar Knut och Hilma i samma hus, så att han ändå kunde ha daglig kontakt med barnen.",
      },
      {
        title: "Polhemsskolan och pensionen",
        text: "I slutet av 60-talet fick Lennart anställning som vaktmästare på Polhemskolan — ett jobb han trivdes med och behöll till pensionen. Han var populär bland elever och kollegor, ordningsam och lyhörd. Han cyklade året runt och besökte flitigt biblioteket. 1999 insjuknade han i lungcancer och avled den 12 januari 2000.",
      },
    ],
    timeline: [
      {
        year: "1922",
        title: "Född i Östra Grevie",
        description: "Lennart Olsson föds den 6 september 1922 i Östra Grevie.",
        type: "birth",
      },
      {
        year: "1950",
        title: "Gift med Maj-Britt Hansson",
        description: "Vigsel den 14 oktober 1950. Bosätter sig på Lagerbrings väg i Lund.",
        type: "marriage",
      },
      {
        year: "1957",
        title: "Förlorar Maj-Britt",
        description: "Maj-Britt avled den 7 januari 1957. Lennart ordnar fosterföräldrar för barnen.",
        type: "other",
      },
      {
        year: "2000",
        title: "Bortgång",
        description: "Lennart Olsson avlider den 12 januari 2000 till följd av lungcancer.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-ingrid-olsson",
    firstName: "Ingrid",
    lastName: "Olsson",
    fullName: "Ingrid Marianne Olsson",
    gender: "female",
    side: "Karins sida",
    role: "Moster",
    generation: 2,
    birthYear: 1951,
    parents: ["karin-maj-britt-hansson", "karin-lennart-olsson"],
    siblings: ["karin"],
    bioShort: "Ingrid Marianne Olsson, född 1951, är Karins äldre syster. Livslångt intresse för hundar och Brukshundsklubben — och det var tack vare henne som Karin och Jan möttes 1975.",
    bioLong: "Ingrid Marianne Olsson föddes 1951 som det första barnet till Maj-Britt Hansson och Lennart Olsson. Efter moderns bortgång 1957 växte hon upp hos morföräldrarna Knut och Hilma på Lagerbrings väg i Lund, med pappan Lennart i trappuppgången bredvid. Ingrid har i hela sitt liv sysslat med hundar och var aktiv i Brukshundsklubben i Lund, där hon bland annat tävlade i lydnad. Den 20 september 1975 firade klubben 30-årsjubileum med uppvisning. Karin följde med Ingrid dit — och det var den kvällen hon fick syn på Jan Lindoff. Det var alltså tack vare Ingrids hundintresse som syskonen Lindoff bildades.",
    storySections: [
      {
        title: "Barndom på Lagerbrings väg",
        text: "Ingrid Marianne Olsson är Karins äldre syster, fem år äldre. Som det första barnet till Maj-Britt och Lennart förlorade hon sin mor redan som sexåring. Morföräldrarna Knut och Hilma på Lagerbrings väg gav henne och Karin ett tryggt hem.",
      },
      {
        title: "Hundar och den magiska kvällen 1975",
        text: "Ingrid har alltid älskat hundar och var aktiv i Brukshundsklubben i Lund. Den 20 september 1975 hade klubben uppvisning för sitt 30-årsjubileum. Karin följde med Ingrid dit — och fick där syn på Jan Lindoff. Utan Ingrid och hennes hundar hade Karin och Jan kanske aldrig mötts.",
      },
    ],
    timeline: [
      {
        year: "1951",
        title: "Född",
        description: "Ingrid Marianne Olsson föds som första barnet till Maj-Britt och Lennart.",
        type: "birth",
      },
      {
        year: "1975",
        title: "Brukshundsklubben",
        description: "Ingrid tar med Karin till klubbens 30-årsjubileum den 20 sept — Karin träffar Jan för första gången.",
        type: "other",
      },
    ],
  },
  {
    id: "jan-siv-jonsson-lindoff",
    firstName: "Siv",
    lastName: "Jönsson",
    fullName: "Siv Jönsson f. Lindoff",
    gender: "female",
    side: "Jans sida",
    role: "Farmor",
    generation: 1,
    birthDate: "1930-08-02",
    birthYear: 1930,
    deathDate: "2022-06-10",
    deathYear: 2022,
    birthPlace: "Gullåkra, Staffanstorp",
    occupation: "Kontorist",
    parents: ["jan-anders-henning-lindoff", "jan-olga-siversson"],
    children: ["jan"],
    partner: ["jan-kjell-jonsson"],
    bioShort:
      "Siv Jönsson f. Lindoff (1930–2022), Jans mor. Uppvuxen på Gullåkra gård utanför Staffanstorp. Träffade Kjell på dansstället Bökeberg 1951. Gift i Köpenhamn 1954.",
    bioLong:
      "Siv Gunhild Marianne Lindoff föddes den 2 augusti 1930 på Gullåkra 7 i Brågarp (Staffanstorp) som enda barnet till Anders Henning Lindoff och Olga Siversson. Hon växte upp på gårdens marker, gick i Brågarps Skola och cyklade de 8 kilometrarna till Lunds kommunala mellanskola. Under krigsåren sydde hon kläder till finska krigsbarn. Hon tog realexamen 1947 och gick sedan en termin på Hermods Handelsinstitut i Malmö. Sina första år i arbetslivet var hon kontorist i Lund och Staffanstorp. Den 3 maj 1951, Kristi Himmelfärdsdag, träffade hon Kjell Jönsson på dansstället Bökeberg — 'det sa klick'. De förlovade sig 1952 och gifte sig i Svenska Kyrkan i Köpenhamn 1954. I december 1955 köpte de en liten gård i Norra Nöbbelöv och flyttade in den 10 mars 1956 — från toppmodern villa till en nergången gård utan rinnande vatten. Sonen Jan föddes 1956. Siv avled den 10 juni 2022.",
    storySections: [
      {
        title: "Bondgårdsflickan från Gullåkra",
        text: "Siv Lindoff föddes den 2 augusti 1930 som enda barnet på Gullåkra 7 i Brågarp. Gården arrenderades av Brågarps Kyrka och hade arrenderas i generationer av släkten Lindoff. Siv växte upp med gårdens rytm — sådde, harvade och körde in hö med hästar från unga år. 'Jag såg det som en naturlig företeelse i familjens arbetsliv.'",
      },
      {
        title: "Skolåren och kriget",
        text: "Siv gick i Brågarps Skola och cyklade sedan 8 km till Lunds kommunala mellanskola. Under krigsåren sydde hon raggsockor och vantar till finska krigsbarn. En natt 1943 såg hon och modern ett eldsken över Lund — ett engelskt bombplan hade fällt sin last över en handelsträdgård på Kävlingevägen. Konfirmationen hölls i Nevishögs Kyrka 1945.",
      },
      {
        title: "Mötet med Kjell på Bökeberg",
        text: "Den 3 maj 1951, Kristi Himmelfärdsdag, for Siv och en väninna till dansstället Bökeberg — 'det blev första dagen av resten av mitt liv'. En charmerande herre bjöd upp och det sa klick. Han var Kjell Jönsson. De förlovade sig 1952 och gifte sig i Svenska Kyrkan i Köpenhamn 1954.",
      },
      {
        title: "Nöbbelövs gård",
        text: "I december 1955 köpte Siv och Kjell en liten bondgård i Norra Nöbbelöv, helt på skuld. Den 10 mars 1956 flyttade de från en toppmodern villa till en gård med tegelstengolv i köket, järnvask och handpump. Sonen Jan föddes 1956. Trots prövningarna — däribland mul- och klövsjukan 1966 — älskade Siv livet på gården.",
      },
    ],
    timeline: [
      {
        year: "1930",
        title: "Född på Gullåkra",
        description: "Siv Lindoff föds den 2 augusti på Gullåkra 7, Brågarp.",
        type: "birth",
      },
      {
        year: "1947",
        title: "Realexamen",
        description: "Siv tar realexamen och börjar sin yrkeskarriär som kontorist.",
        type: "other",
      },
      {
        year: "1951",
        title: "Möter Kjell",
        description: "Träffar Kjell Jönsson på dansstället Bökeberg, Kristi Himmelfärdsdag.",
        type: "other",
      },
      {
        year: "1954",
        title: "Gift med Kjell Jönsson",
        description: "Vigsel i Svenska Kyrkan i Köpenhamn.",
        type: "marriage",
      },
      {
        year: "1956",
        title: "Köper Nöbbelövsgården",
        description: "Familjen köper och flyttar in i bondgård i Norra Nöbbelöv.",
        type: "move",
      },
      {
        year: "2022",
        title: "Bortgång",
        description: "Siv Jönsson f. Lindoff avlider den 10 juni 2022.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-kjell-jonsson",
    firstName: "Kjell",
    lastName: "Jönsson",
    fullName: "Kjell Jönsson",
    gender: "male",
    side: "Jans sida",
    role: "Farfar",
    generation: 1,
    birthDate: "1928",
    birthYear: 1928,
    deathDate: "2021-10-20",
    deathYear: 2021,
    birthPlace: "Norra Nöbbelöv",
    occupation: "Lantbrukare",
    parents: ["jan-nils-jonsson", "jan-anna-hansson"],
    children: ["jan"],
    partner: ["jan-siv-jonsson-lindoff"],
    bioShort:
      "Kjell Jönsson (1928–2021), Jans far. Uppvuxen på Nöbbelöv, lantbrukare. Gift med Siv Lindoff 1954. Köpte Nöbbelövsgård 1956. Drabbades av mul- och klövsjukan 1966.",
    bioLong:
      "Kjell Jönsson föddes 1928 på Norra Nöbbelöv nr 5 som son till Nils Jönsson och Anna Hansson. Han var andra barnet med äldre bror Sixten (1925) och yngre syster Lilian (1938). Kjell växte upp på gården, tog del i jordbruksarbetet och gick i Nöbbelövs skola. Han utförde militärtjänst vid 17:e infanteriet i Revinge 1949–1950. I maj 1951 träffade han Siv Lindoff på dansstället Bökeberg och de gifte sig i Köpenhamn 1954. I december 1955 köpte de en liten gård i Norra Nöbbelöv helt på skuld, och byggde upp en fin nötkreatursbesättning. Den 6 mars 1966 drabbades gården av mul- och klövsjukan — det enda fallet i Sverige det året. Alla djur slaktades på platsen. Kjell och Siv bodde kvar på gården fram till 2016 då de överlät den till sonen Jan. Kjell avled den 20 oktober 2021.",
    storySections: [
      {
        title: "Uppväxt på Nöbbelöv",
        text: "Kjell Jönsson föddes 1928 på Norra Nöbbelöv nr 5, en gård vars historia sträckte sig generationer tillbaka. Han var nummer 2 i en syskonskara. Från unga år hjälpte han till med gårdsarbetet — plöjde, sådde och deltog i skördearbetet. Han gick i Nöbbelövs skola och fortsättningsskola i Stångby.",
      },
      {
        title: "Mötet med Siv",
        text: "På dansstället Bökeberg den 3 maj 1951 träffade Kjell Siv Lindoff — 'det sa klick'. De förlovade sig 1952 och gifte sig 1954 i Svenska Kyrkan i Köpenhamn. Kjell hade arbetat på Bältinge Gård i Skarhult och siktat på att bli egen bonde.",
      },
      {
        title: "Nöbbelövsgårdens prövningar",
        text: "Familjen köpte en liten gård i Nöbbelöv 1955 och flyttade in mars 1956. Kjell byggde upp en fin nötkreatursbesättning. Men den 6 mars 1966 drabbades gården av mul- och klövsjukan — det enda fallet i Sverige det året. Alla kor och grisar slaktades och begrovs i en massgrav. Kjell och Siv var isolerade i en månad.",
      },
    ],
    timeline: [
      {
        year: "1928",
        title: "Född i Nöbbelöv",
        description: "Kjell Jönsson föds på Norra Nöbbelöv nr 5.",
        type: "birth",
      },
      {
        year: "1949",
        title: "Militärtjänst",
        description: "Militärtjänst vid 17:e infanteriet i Revinge.",
        type: "military",
      },
      {
        year: "1954",
        title: "Gift med Siv Lindoff",
        description: "Vigsel i Svenska Kyrkan i Köpenhamn.",
        type: "marriage",
      },
      {
        year: "1956",
        title: "Köper Nöbbelövsgården",
        description: "Köper Norra Nöbbelöv 9 norra. Sonen Jan föds.",
        type: "move",
      },
      {
        year: "1966",
        title: "Mul- och klövsjukan",
        description: "Gårdens hela djurbestånd slaktas på platsen efter utbrott.",
        type: "other",
      },
      {
        year: "2021",
        title: "Bortgång",
        description: "Kjell Jönsson avlider den 20 oktober 2021.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-hilma-larsson",
    firstName: "Hilma",
    lastName: "Larsson",
    fullName: "Hilma Larsson",
    gender: "female",
    side: "Karins sida",
    role: "Mormor",
    generation: 0,
    birthDate: "1906-12-01",
    birthYear: 1906,
    deathDate: "1975-12-10",
    deathYear: 1975,
    birthPlace: "Fosie",
    occupation: "Hushållerska",
    parents: ["karin-hans-larsson", "karin-vilhelmina-nilsson"],
    partner: ["karin-knut-hansson"],
    children: ["karin-maj-britt-hansson"],
    bioShort:
      "Hilma Larsson (1906–1975), Karins mormor. Uppvuxen som statardotter. Gift med Knut Hansson 1930. Blev fosterförälder åt Karins och Ingrids barn efter Maj-Britts bortgång 1957.",
    bioLong:
      "Hilma Larsson föddes den 1 december 1906 i Fosie som dotter till Hans Larsson och Vilhelmina Nilsson. Som barn till en statare flöt hon och familjen från gård till gård i Skåne. Åren 1922–1924 bodde hon hos sin faster i Malmö, sedan tog hon anställning i Lund — bl.a. på gården Östra Torn nr 2, ägd av Jans morfars äldre syster Anna. 1930 gifte hon sig med Knut Hansson och fick dottern Maj-Britt. Familjen bodde på Drottensgatan i centrala Lund. När Maj-Britt avled 1957 trädde Hilma och Knut in som fosterföräldrar åt barnbarnen Ingrid och Karin. De flyttade till Lagerbrings väg för att bo nära Lennart. Hilma avled den 10 december 1975.",
    storySections: [
      {
        title: "Statardottern",
        text: "Hilma Larsson föddes 1906 i Fosie som dotter till stataren Hans Larsson och Vilhelmina Nilsson. Familjen levde ett kringflyttande statarliv. Som 20-åring kom hon till Lund och stannade livet ut. 'En stad som hon var trogen livet ut', skriver familjesagan.",
      },
      {
        title: "Familjeliv på Drottensgatan",
        text: "Hilma gifte sig med Knut Hansson 1930 och de bosatte sig på Drottensgatan i centrala Lund (numera parkeringsplatsen Färgaren). De fick dottern Maj-Britt 1930 och sonen Bertil 1938. Familjen hade även kolonin Öster II som sin oas.",
      },
      {
        title: "Fosterförälder",
        text: "När dottern Maj-Britt avled i januari 1957 trädde Hilma och Knut in som fosterföräldrar åt barnbarnen Ingrid och Karin. De bodde i lägenheten Lagerbrings väg och Lennart Olsson bodde i samma hus. Hilma avled den 10 december 1975.",
      },
    ],
    timeline: [
      {
        year: "1906",
        title: "Född i Fosie",
        description: "Hilma Larsson föds den 1 december 1906 i Fosie.",
        type: "birth",
      },
      {
        year: "1930",
        title: "Gift med Knut Hansson",
        description: "Vigsel den 11 oktober 1930.",
        type: "marriage",
      },
      {
        year: "1957",
        title: "Fosterförälder",
        description: "Hilma och Knut blir fosterföräldrar åt barnbarnen Ingrid och Karin.",
        type: "other",
      },
      {
        year: "1975",
        title: "Bortgång",
        description: "Hilma Larsson avlider den 10 december 1975.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-knut-hansson",
    firstName: "Knut",
    lastName: "Hansson",
    fullName: "Knut Hansson",
    gender: "male",
    side: "Karins sida",
    role: "Morfar",
    generation: 0,
    birthDate: "1902-01-06",
    birthYear: 1902,
    deathDate: "1984-09-26",
    deathYear: 1984,
    birthPlace: "Lund",
    occupation: "Grovarbetare / Gatuanläggare",
    parents: ["karin-anna-andersson", "karin-hans-hansson"],
    partner: ["karin-hilma-larsson"],
    children: ["karin-maj-britt-hansson"],
    bioShort:
      "Knut Hansson (1902–1984), Karins morfar. Son till Hans Waldemar Hansson och Anna Andersson. Gift med Hilma Larsson 1930. Fosterförälder åt Karin och Ingrid.",
    bioLong:
      "Knut Waldemar Hansson föddes den 6 januari 1902 i Lund som son till stilgjutaren Hans Waldemar Hansson och Anna Andersson. Han arbetade som grovarbetare och var med vid gatuanläggningar i Lund. År 1930 gifte han sig med Hilma Larsson och familjen bosatte sig på Drottensgatan. De fick tre barn: Gullan (1927), Maj-Britt (1930) och Bertil (1938). Familjen övergjorde sedan till Lagerbrings väg. Knut och Hilma hade också kolonin Öster II som överts av Knuts föräldrar. När dottern Maj-Britt avled 1957 trädde Knut och Hilma in som fosterföräldrar åt barnbarnen. Knut avled den 26 september 1984.",
    storySections: [
      {
        title: "Grovarbetaren från Lund",
        text: "Knut Hansson var son till stilgjutaren Hans Waldemar Hansson och Anna Andersson, och växte upp i Lund. Han arbetade som grovarbetare vid gatuanläggningar — ett fysiskt krävande arbete som formade hans karaktär.",
      },
      {
        title: "Familj och fosterföräldrar",
        text: "Knut gifte sig med Hilma Larsson 1930 och de fick tre barn. När dottern Maj-Britt avled 1957 tog Knut och Hilma på sig rollen som fosterföräldrar åt barnbarnen Ingrid och Karin — ett åtagande de bar med kärlek.",
      },
    ],
    timeline: [
      {
        year: "1902",
        title: "Född i Lund",
        description: "Knut Waldemar Hansson föds den 6 januari 1902 i Lund.",
        type: "birth",
      },
      {
        year: "1930",
        title: "Gift med Hilma Larsson",
        description: "Vigsel den 11 oktober 1930.",
        type: "marriage",
      },
      {
        year: "1957",
        title: "Fosterförälder",
        description: "Knut och Hilma blir fosterföräldrar åt barnbarnen Ingrid och Karin.",
        type: "other",
      },
      {
        year: "1984",
        title: "Bortgång",
        description: "Knut Hansson avlider den 26 september 1984.",
        type: "death",
      },
    ],
  },

  // ─── Generation 1: Grandparents — Jan's side ────────────────────────────
  {
    id: "jan-anders-henning-lindoff",
    firstName: "Anders",
    lastName: "Henning Lindoff",
    fullName: "Anders Henning Lindoff",
    gender: "male",
    side: "Jans sida",
    role: "Äldre generation",
    generation: 0,
    birthDate: "1896-03-29",
    birthYear: 1896,
    deathDate: "1970-01-28",
    deathYear: 1970,
    birthPlace: "Lund",
    occupation: "Lantbrukare / Arrendator",
    parents: ["jan-jons-andersson-lindoff", "jan-johanna-henriksson"],
    children: ["jan-siv-jonsson-lindoff"],
    partner: ["jan-olga-siversson"],
    bioShort:
      "Anders Henning Lindoff (1896–1970), born i Lund som son till dragon Jöns Andersson Lindoff. Övertog arrendet på Gullåkra 7 i Brågarp 1925. Gift med Olga Siversson 1927.",
    bioLong:
      "Anders Henning Lindoff, kallad Henning, föddes den 29 mars 1896 på Lunds barnbördshus som son till dragonen Jöns Andersson Lindoff och Johanna Persdotter Henriksson. Han växte upp i familjer som levde i Limhamn (1897–1910), Stora Bjällerup (1910–1936) och Kyrkheddinge. År 1925 övertog Henning arrendet av Gullåkra 7 i Brågarp (Staffanstorp) efter sin morbror August Henriksson — en gård kyrkan ägt i generationer. Den 8 april 1927 gifte han sig med Olga Siversson från Uppåkra. Deras enda barn Siv Gunhild Marianne föddes den 2 augusti 1930. Henning och Olga bodde på Gullåkra 7 i nästan ett halvt sekel. 1969 köpte de en villa på Rydbergs väg 17 i Staffanstorp. Henning avled den 28 januari 1970.",
    storySections: [
      {
        title: "Dragonsonen och arrendatorn",
        text: "Henning Lindoff bar vidare det soldatnamn som hans far Jöns Andersson Lindoff antagit vid Skånska Dragonregementet 1883. Han ärvde inte bara namnet utan också jordbruksmännens hållning: 1925 tog han över arrendet av Gullåkra 7 i Brågarp, en gård kyrkan ägt och familjen brukat i generationer.",
      },
      {
        title: "Gården i Gullåkra",
        text: "Gullåkra 7 låg utflyttad från byn och hade 18 hektar åker. Gården ägs av Brågarps Kyrka och arrenderats i det närmaste ett sekel av Hennings släkt. Det var här dottern Siv växte upp och det var härifrån hon cyklade till Lund för sin skolgång.",
      },
    ],
    timeline: [
      {
        year: "1896",
        title: "Född i Lund",
        description: "Anders Henning Lindoff föds den 29 mars 1896 på Lunds barnbördshus.",
        type: "birth",
      },
      {
        year: "1925",
        title: "Arrenderar Gullåkra 7",
        description: "Henning tar över arrendet av Gullåkra 7 i Brågarp efter morbror August Henriksson.",
        type: "other",
      },
      {
        year: "1927",
        title: "Gift med Olga Siversson",
        description: "Vigsel den 8 april 1927 i Uppåkra kyrka.",
        type: "marriage",
      },
      {
        year: "1970",
        title: "Bortgång",
        description: "Anders Henning Lindoff avlider den 28 januari 1970.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-olga-siversson",
    firstName: "Olga",
    lastName: "Siversson",
    fullName: "Olga Siversson",
    gender: "female",
    side: "Jans sida",
    role: "Äldre generation",
    generation: 0,
    birthDate: "1899-04-18",
    birthYear: 1899,
    deathDate: "1994-01-02",
    deathYear: 1994,
    birthPlace: "Stora Uppåkra nr 3",
    occupation: "Hemmafru / Lantbrukare",
    parents: ["jan-nils-siversson", "jan-anna-nilsson"],
    children: ["jan-siv-jonsson-lindoff"],
    partner: ["jan-anders-henning-lindoff"],
    bioShort:
      "Olga Siversson (1899–1994), born i Stora Uppåkra, dotter till Nils Siversson och Anna Nilsson. Gift med Henning Lindoff 1927. Bodde på Gullåkra 7 i nära 50 år. Blev 95 år.",
    bioLong:
      "Olga Siversson föddes den 18 april 1899 på Stora Uppåkra nr 3 som dotter till Nils Siversson och Anna Nilsson. Hon gifte sig med Henning Lindoff den 8 april 1927. Deras enda barn Siv Gunhild Marianne föddes den 2 augusti 1930. Familjen bodde på Gullåkra 7 i Brågarp (Staffanstorp) ända till 1969, då de köpte en villa på Rydbergs väg 17 i Staffanstorp. Henning avled 1970. Olga bodde kvar i villan till 1990 då barnbarnet Eva med familj flyttade in. De sista åren bodde Olga på äldreboende. Hon avled den 2 januari 1994, 95 år gammal.",
    storySections: [
      {
        title: "Uppåkraflickan",
        text: "Olga Siversson växte upp på Stora Uppåkra nr 3, den gård som hennes far Nils Siversson och morfar Per Siversson brukat i generationer. Gården var ett av de fasta ankaren i familjens historia. Olgas mor Anna Nilsson drev gården vidare efter mannens bortgång 1903.",
      },
      {
        title: "Livet på Gullåkra",
        text: "Olga gifte sig med Henning Lindoff 1927 och följde med honom till arrendegården Gullåkra 7 i Brågarp. Det var här dottern Siv vätte upp och det var härifrån hon cyklade till sina skolor. Familjen bodde på Gullåkra i nära 50 år — hela Sivs uppväxt och in i vuxenlivet.",
      },
    ],
    timeline: [
      {
        year: "1899",
        title: "Född i Stora Uppåkra",
        description: "Olga Siversson föds den 18 april 1899 på Stora Uppåkra nr 3.",
        type: "birth",
      },
      {
        year: "1927",
        title: "Gift med Henning Lindoff",
        description: "Vigsel den 8 april 1927. Familjen bosätter sig på Gullåkra 7.",
        type: "marriage",
      },
      {
        year: "1969",
        title: "Lämnar Gullåkra",
        description: "Henning och Olga köper villa på Rydbergs väg 17 i Staffanstorp.",
        type: "move",
      },
      {
        year: "1994",
        title: "Bortgång",
        description: "Olga Siversson avlider den 2 januari 1994, 95 år gammal.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-nils-jonsson",
    firstName: "Nils",
    lastName: "Jönsson",
    fullName: "Nils Jönsson",
    gender: "male",
    side: "Jans sida",
    role: "Äldre generation",
    generation: 0,
    birthDate: "1896-07-09",
    birthYear: 1896,
    deathDate: "1962-08-10",
    deathYear: 1962,
    birthPlace: "Norra Nöbbelöv nr 5",
    occupation: "Lantbrukare / Bonde",
    parents: ["jan-jons-bengtsson", "jan-hanna-andersdotter"],
    children: ["jan-kjell-jonsson"],
    partner: ["jan-anna-hansson"],
    bioShort:
      "Nils Jönsson (1896–1962), born på Norra Nöbbelöv nr 5. Gift med Anna Hansson 1924. Köpte egen gård N. Nöbbelöv nr 4 när äldre brodern ärvde nr 5. Livslång schism med brodern Bengt.",
    bioLong:
      "Nils Jönsson föddes den 9 juli 1896 på Norra Nöbbelöv nr 5 som son till Jöns Bengtsson och Hanna Andersdotter. Han gifte sig med Anna Hansson 1924-06-07 och de övertog gården N. Nöbbelöv nr 5 efter Nils far. När Nils mor avled 1934 ärvde äldste brodern Bengt gården, och Nils och Anna tvingades flytta. De köpte då den egna gården N. Nöbbelöv nr 4 med 36 hektar åker. Familjen bodde kvar till 1960 då sonen Sixten tog över. Nils och Anna flyttade sedan till en lägenhet på Fredsgatan 5 i centrala Lund. Nils avled den 10 augusti 1962.",
    storySections: [
      {
        title: "Nöbbelövs bonde",
        text: "Nils Jönsson hade sina rötter djupt i Norra Nöbbelöv — han var uppvuxen på nr 5 och tog sedan över gården. Hans son Kjell beskriver i sina minnen hur han i unga år hjälpte till med plöjning, sådd och skörd, och hur gårdens djur var en del av vardagen.",
      },
      {
        title: "Schismen med brodern",
        text: "När Nils mor avled 1934 ärvde äldste brodern Bengt gården — trots att Nils drivit den i tio år. Nils och Anna tvingades flytta. De köpte då gården N. Nöbbelöv nr 4. Schismen med brodern Bengt var livslång; de sades aldrig ha talats vid efter händelsen.",
      },
    ],
    timeline: [
      {
        year: "1896",
        title: "Född i Nöbbelöv",
        description: "Nils Jönsson föds den 9 juli 1896 på N. Nöbbelöv nr 5.",
        type: "birth",
      },
      {
        year: "1924",
        title: "Gift med Anna Hansson",
        description: "Vigsel den 7 juni 1924. Tar över N. Nöbbelöv nr 5.",
        type: "marriage",
      },
      {
        year: "1934",
        title: "Köper N. Nöbbelöv nr 4",
        description: "Tvingas lämna nr 5. Köper en ny gård om 36 hektar.",
        type: "move",
      },
      {
        year: "1962",
        title: "Bortgång",
        description: "Nils Jönsson avlider den 10 augusti 1962.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-anna-hansson",
    firstName: "Anna",
    lastName: "Hansson",
    fullName: "Anna Hansson",
    gender: "female",
    side: "Jans sida",
    role: "Äldre generation",
    generation: 0,
    birthDate: "1900-11-19",
    birthYear: 1900,
    deathDate: "1986-09-04",
    deathYear: 1986,
    birthPlace: "Norra Nöbbelöv",
    occupation: "Hemmafru / Lantbrukare",
    parents: ["jan-hans-mansson", "jan-christina-jonsdotter"],
    children: ["jan-kjell-jonsson"],
    partner: ["jan-nils-jonsson"],
    bioShort:
      "Anna Hansson (1900–1986), född i Norra Nöbbelöv. Dotter till Hans Månsson och Christina Jönsdotter. Gift med Nils Jönsson 1924, bosatt på N. Nöbbelöv nr 5 och sedan nr 4. Siste sonen Sixten tog över gården 1960.",
    bioLong:
      "Anna Hansson föddes den 19 november 1900 i Norra Nöbbelöv som dotter till Hans Månsson och Christina Jönsdotter. I samband med hennes födelse flyttade familjen till Vallkärratorn nr 1 där de drev ett småbruk. Under åren 1915–1917 var Anna tjänsteflicka i Lund, varefter hon återvände hem. År 1920 flyttade familjen till Bjärred där modern byggde ett hus kallat Havsbo. Den 7 juni 1924 gifte sig Anna med Nils Jönsson och de bosatte sig på N. Nöbbelöv nr 5, som de övertog efter Nils fars bortgång. När även Nils mor avled 1934 tvingades de bort från gården, då äldste sonen Bengt var arvtagare. De köpte då en egen gård, N. Nöbbelöv nr 4, och bodde kvar till 1960 då äldste sonen Sixten tog över. Gården drivs idag av Sixtens son Ulf. Anna och Nils flyttade till en lägenhet på Fredsgatan 5 i centrala Lund. Nils avled den 10 augusti 1962 och Anna bodde kvar i lägenheten fram till sin bortgång den 4 september 1986. De är begravda på N. Nöbbelövs kyrkogård, gravplats 0026/D-F.",
    storySections: [
      {
        title: "Uppväxt i Vallkärratorn och Bjärred",
        text: "Anna Hansson växte upp på Vallkärratorn nr 1 där familjen drev ett småbruk. Som ung tjänstgjorde hon som tjänsteflicka i Lund 1915–1917. År 1920 flyttade familjen till Bjärred där modern byggde ett hus döpt till Havsbo.",
      },
      {
        title: "Lantbrukarliv i Nöbbelöv",
        text: "Gift 1924 med Nils Jönsson tog Anna och Nils över gården N. Nöbbelöv nr 5 – men 1934 tvingades de lämna den när Nils äldre bror Bengt ärvde. De köpte istället N. Nöbbelöv nr 4, som familjen brukade till 1960 då sonen Sixten tog över. Gården är idag i tredje generationens händer.",
      },
      {
        title: "Sista åren i Lund",
        text: "År 1960 lämnade Anna och Nils gårdslivet och flyttade till en lägenhet på Fredsgatan 5 i centrala Lund. Nils avled 1962 och Anna bodde kvar i lägenheten till sin bortgång 1986. De vilar på N. Nöbbelövs kyrkogård, gravplats 0026/D-F.",
      },
    ],
    timeline: [
      {
        year: "1900",
        title: "Född i Norra Nöbbelöv",
        description: "Anna Hansson föds den 19 november. Familjen bosätter sig på Vallkärratorn nr 1.",
        type: "birth",
      },
      {
        year: "1915",
        title: "Tjänsteflicka i Lund",
        description: "Arbetar som tjänsteflicka i Lund 1915–1917, sedan tillbaka hem.",
        type: "other",
      },
      {
        year: "1920",
        title: "Flytt till Bjärred",
        description: "Familjen flyttar till Bjärred där modern Christina bygger huset Havsbo.",
        type: "move",
      },
      {
        year: "1924",
        title: "Gift med Nils Jönsson",
        description: "Vigsel den 7 juni 1924. Bosätter sig på N. Nöbbelöv nr 5.",
        type: "marriage",
      },
      {
        year: "1934",
        title: "Köper N. Nöbbelöv nr 4",
        description: "Tvingas lämna nr 5 vid arvsskiftet. Köper en egen gård, N. Nöbbelöv nr 4.",
        type: "other",
      },
      {
        year: "1960",
        title: "Lämnar gården",
        description: "Sonen Sixten tar över N. Nöbbelöv nr 4. Anna och Nils flyttar till Fredsgatan 5, Lund.",
        type: "move",
      },
      {
        year: "1986",
        title: "Bortgång",
        description: "Anna Hansson avlider den 4 september. Gravsatt på N. Nöbbelövs kyrkogård, gravplats 0026/D-F.",
        type: "death",
      },
    ],
  },

  // ─── Generation 0: Great-grandparents — Jan's side ───────────────────────
  {
    id: "jan-anna-nilsson",
    firstName: "Anna",
    lastName: "Nilsson",
    fullName: "Anna Nilsson",
    gender: "female",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1866-10-01",
    birthYear: 1866,
    deathDate: "1942-03-02",
    deathYear: 1942,
    birthPlace: "Lilla Uppåkra nr 2",
    occupation: "Jordbrukare / Hemmansägare",
    partner: ["jan-nils-siversson"],
    children: ["jan-olga-siversson"],
    bioShort:
      "Anna Nilsson (1866–1942), född i Lilla Uppåkra nr 2. Gift med Nils Siversson 1894 och bosatt på Stora Uppåkra nr 3. Drev gården ensam med sina fem barn i 23 år efter mannens bortgång 1903.",
    bioLong:
      "Anna Nilsson föddes den 1 oktober 1866 i Lilla Uppåkra nr 2. År 1894 gifte hon sig med Nils Siversson och paret bosatte sig på Stora Uppåkra nr 3. Tillsammans fick de fem barn, däribland ett tvillingpar. När Nils oväntat avled den 16 april 1903 stod Anna ensam med fem barn i åldrarna 2–8 år. Trots denna prövning valde hon att stanna och driva gården vidare – ensam och med stor uthållighet. Hon fortsatte som hemmansägare på Stora Uppåkra nr 3 enda fram till 1926 då sonen Nils Hilding övertog gården. Gården hade dessförinnan varit i släkten Siverssons ägo sedan 1779. Anna flyttade då till Stora Uppåkra nr 2 och tillbringade sina sista år där. I slutet av livet var hon rullstolsburen efter en stroke och vårdades i hemmet av sin ogifta yngstadotter Dagny. Anna Nilsson avled den 2 mars 1942.",
    storySections: [
      {
        title: "Uppväxt i Lilla Uppåkra",
        text: "Anna Nilsson föddes den 1 oktober 1866 i Lilla Uppåkra nr 2, där hon bodde kvar tills hon gifte sig 1894.",
      },
      {
        title: "Ensam med fem barn",
        text: "När maken Nils Siversson avled 1903, bara 41 år gammal, stod Anna ensam med fem barn i åldrarna 2–8 år. Trots förlusten drev hon gården Stora Uppåkra nr 3 vidare – i 23 år, tills sonen Nils Hilding kunde ta över 1926. Gården hade tillhört familjen Siversson sedan 1779.",
      },
      {
        title: "Livets slutår",
        text: "Från 1926 bodde Anna på Stora Uppåkra nr 2. I slutet av livet var hon rullstolsburen efter en stroke och vårdades hemma av sin yngsta dotter Dagny, som förblev ogift för att ta hand om sin mor. Anna avled den 2 mars 1942.",
      },
    ],
    timeline: [
      {
        year: "1866",
        title: "Född i Lilla Uppåkra",
        description: "Anna Nilsson föds den 1 oktober på Lilla Uppåkra nr 2.",
        type: "birth",
      },
      {
        year: "1894",
        title: "Gift med Nils Siversson",
        description: "Vigsel den 2 maj 1894. Paret bosätter sig på Stora Uppåkra nr 3.",
        type: "marriage",
      },
      {
        year: "1903",
        title: "Fortsätter driva gården",
        description: "Nils Siversson avlider den 16 april. Anna tar över och driver Stora Uppåkra nr 3 ensam med fem barn.",
        type: "other",
      },
      {
        year: "1926",
        title: "Lämnar gården",
        description: "Sonen Nils Hilding övertar gården. Anna flyttar till Stora Uppåkra nr 2.",
        type: "move",
      },
      {
        year: "1942",
        title: "Bortgång",
        description: "Anna Nilsson avlider den 2 mars, 75 år gammal.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-nils-siversson",
    firstName: "Nils",
    lastName: "Siversson",
    fullName: "Nils Siversson",
    gender: "male",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1862-02-23",
    birthYear: 1862,
    deathDate: "1903-04-16",
    deathYear: 1903,
    birthPlace: "Stora Uppåkra nr 3",
    occupation: "Hemmansägare / Bonde",
    partner: ["jan-anna-nilsson"],
    children: ["jan-olga-siversson"],
    bioShort: "Nils Siversson (1862–1903), hemmansägare, född i Stora Uppåkra nr 3. Övertog gården 1891 och gifte sig med Anna Nilsson 1894. Avled 41 år gammal och lämnade Anna ensam med fem barn.",
    bioLong:
      "Nils Siversson föddes den 23 februari 1862 på Stora Uppåkra nr 3. Han var den yngste i syskonskaran men ändå den som fick överta gården 1891 efter föräldrarnas bortgång. Gården hade tillhört familjen Siversson sedan 1779. Den 2 maj 1894 gifte han sig med Anna Nilsson från Lilla Uppåkra nr 2 och paret fick fem barn, däribland ett tvillingpar. Nils avled oväntat den 16 april 1903, bara 41 år gammal, och lämnade Anna ensam med fem barn i åldrarna 2–8 år. Anna drev gården vidare i 23 år till dess sonen Nils Hilding kunde ta över 1926.",
    storySections: [
      {
        title: "Den yngste ärver gården",
        text: "Nils Siversson var yngst bland syskonen på Stora Uppåkra nr 3, men det var han som fick ta över den anrika gården 1891 efter föräldrarnas bortgång. Gården hade tillhört familjen sedan 1779.",
      },
      {
        title: "En kort men meningsfull tid",
        text: "Med hustrun Anna Nilsson fick Nils fem barn på Stora Uppåkra nr 3. Hans liv som hemmansägare var dock kort – han avled den 16 april 1903, 41 år gammal, och lämnade Anna ensam att föra gården vidare.",
      },
    ],
    timeline: [
      {
        year: "1862",
        title: "Född i Stora Uppåkra",
        description: "Nils Siversson föds den 23 februari på Stora Uppåkra nr 3.",
        type: "birth",
      },
      {
        year: "1891",
        title: "Övertar gården",
        description: "Nils tar över Stora Uppåkra nr 3 efter föräldrarnas bortgång.",
        type: "other",
      },
      {
        year: "1894",
        title: "Gift med Anna Nilsson",
        description: "Vigsel den 2 maj 1894 med Anna Nilsson från Lilla Uppåkra nr 2.",
        type: "marriage",
      },
      {
        year: "1903",
        title: "Bortgång",
        description: "Nils Siversson avlider den 16 april, 41 år gammal.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-johanna-henriksson",
    firstName: "Johanna",
    lastName: "Henriksson",
    fullName: "Johanna Henriksson",
    gender: "female",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1862-02-16",
    birthYear: 1862,
    deathDate: "1949-01-31",
    deathYear: 1949,
    birthPlace: "Särslöv",
    occupation: "Hemmafru / Lantbrukare",
    partner: ["jan-jons-andersson-lindoff"],
    children: ["jan-anders-henning-lindoff"],
    bioShort:
      "Johanna Persdotter Henriksson (1862–1949), born i Särslöv. Gift med dragon Jöns Andersson Lindoff 1892. Följde familjen från Burlöv till Limhamn till Stor-Bjällerup till Kyrkheddinge.",
    bioLong:
      "Johanna Persdotter Henriksson föddes den 16 februari 1862 i Särslöv. Fram till 1892 bodde hon med föräldrarna på Gullåkra 7 i Brågarp. Den 9 december 1892 gifte hon sig med dragonen Jöns Andersson Lindoff. Paret fick fyra barn: Anna Beata (1893 i Burlöv), Anders Henning (1896 i Lund), Matilda Elvira (1897–1900 i Hyllie) och Anton Valdemar (1902 i Limhamn). Familjen bodde i Burlöv 1893–1897, i Limhamn 1897–1910 (där Jöns arbetade som murare), sedan på Stor Bjällerup 13 (1910–1915) och arrenderade Stor Bjällerup 14 (1915–1936). År 1936 köpte Jöns ett gatuhus i Kyrkheddinge nr 8:36. Johanna levde till den 31 januari 1949.",
    storySections: [
      {
        title: "Dragonsoldatens hustru",
        text: "Johanna Henriksson gifte sig 1892 med dragonen Jöns Andersson Lindoff, en man som sedan 1883 burit soldatnamnet Lindoff. De följdes åt livet ut — genom Burlöv, Limhamn, Stor Bjällerup och till sist Kyrkheddinge.",
      },
      {
        title: "Kyrkheddinge 8:36",
        text: "År 1936 köpte Jöns och Johanna huset Kyrkheddinge 8:36 och bodde där med yngste sonen Anton. Huset kom att förbli i familjens ägo — Anton bodde där efter föräldrarnas bortgång, och 1977 köpte Jan Lindoff huset och lät riva och bygga nytt.",
      },
    ],
    timeline: [
      {
        year: "1862",
        title: "Född i Särslöv",
        description: "Johanna Henriksson föds den 16 februari 1862 i Särslöv.",
        type: "birth",
      },
      {
        year: "1892",
        title: "Gift med Jöns Andersson Lindoff",
        description: "Vigsel den 9 december 1892 i Brågarp.",
        type: "marriage",
      },
      {
        year: "1936",
        title: "Kyrkheddinge 8:36",
        description: "Jöns köper huset Kyrkheddinge 8:36. Familjen Lindoff etablerar sig i Kyrkheddinge.",
        type: "move",
      },
      {
        year: "1949",
        title: "Bortgång",
        description: "Johanna Henriksson avlider den 31 januari 1949.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-jons-andersson-lindoff",
    firstName: "Jöns",
    lastName: "Andersson Lindoff",
    fullName: "Jöns Andersson Lindoff",
    gender: "male",
    side: "Jans sida",
    role: "Soldat / Stamfader Lindoff",
    generation: -1,
    birthYear: 1863,
    deathYear: 1948,
    birthPlace: "Hötofta, Södra Åkarp",
    occupation: "Dragon / Soldat, Skånska Dragonregementet",
    partner: ["jan-johanna-henriksson"],
    children: ["jan-anders-henning-lindoff"],
    bioShort:
      "Jöns Andersson Lindoff (1863–1948), dragon i Skånska Dragonregementet från 1883 vid Tygelsjö. Tog familjenamnet Lindoff som soldat. Köpte Kyrkheddinge 8:36 år 1936.",
    bioLong:
      "Jöns Andersson Lindoff, född 1863 i Hötofta, Södra Åkarp, antog soldatnamnet Lindoff när han skrevs in som dragon 1883 vid Tygelsjö i Skånska Dragonregementet. Han gifte sig med Johanna Henriksson 1892 och köpte huset Kyrkheddinge 8:36 år 1936. Jöns avled 1948.",
    storySections: [
      {
        title: "Dragonen från Hötofta",
        text: "Jöns Andersson Lindoff föddes 1863 i Hötofta, Södra Åkarp. År 1883 värvades han som dragon vid Tygelsjö i Skånska Dragonregementet – och det var då han fick soldatnamnet Lindoff, det namn som familjen bär än idag.",
      },
      {
        title: "Familjeliv och Kyrkheddinge",
        text: "Jöns gifte sig med Johanna Henriksson 1892 och de fick barn tillsammans. År 1936 köpte Jöns huset Kyrkheddinge 8:36, ett hem som blev familjenamnet Lindoffs ankare i trakten.",
      },
      {
        title: "Namnets ursprung",
        text: "Soldatnamnet Lindoff gavs Jöns vid intagningen i dragonregementet. Det var vanligt att soldater fick ett nytt namn – ett tjänstenamn – som sedan överfördes till familjen. Så blev Andersson till Lindoff.",
      },
    ],
    timeline: [
      {
        year: "1863",
        title: "Född i Hötofta",
        description: "Jöns Andersson föds i Hötofta, Södra Åkarp.",
        type: "birth",
      },
      {
        year: "1883",
        title: "Dragon i Skånska Dragonregementet",
        description: "Skrivs in som dragon vid Tygelsjö, tar soldatnamnet Lindoff.",
        type: "military",
      },
      {
        year: "1892",
        title: "Gift med Johanna Henriksson",
        description: "Vigsel med Johanna Henriksson.",
        type: "marriage",
      },
      {
        year: "1936",
        title: "Köper Kyrkheddinge 8:36",
        description: "Jöns köper huset som blir familjens hem.",
        type: "move",
      },
      {
        year: "1948",
        title: "Bortgång",
        description: "Jöns Andersson Lindoff avlider, 85 år gammal.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-christina-jonsdotter",
    firstName: "Christina",
    lastName: "Jönsdotter",
    fullName: "Christina Jönsdotter",
    gender: "female",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1866-03-19",
    birthYear: 1866,
    deathDate: "1953-08-05",
    deathYear: 1953,
    birthPlace: "Skeglinge nr 3",
    partner: ["jan-hans-mansson"],
    children: ["jan-anna-hansson"],
    bioShort:
      "Christina Jönsdotter (1866–1953), född i Skeglinge nr 3. Gifte sig först 1886 med Per Persson, lämnade honom 1889 och gifte om sig med änklingen Hans Månsson 1896. Levde till 87 år.",
    bioLong:
      "Christina Jönsdotter föddes den 19 mars 1866 i Skeglinge nr 3 utom äktenskapet – föräldrarna var vid den tidpunkten bara trolovade. År 1883 lämnade hon föräldrahemmet och tog anställning som piga i Västra Sallerup. Den 19 november 1886 gifte hon sig med åbon Per Persson (f. 1865-04-11, V. Sallerup) och bosatte sig på Nöbbelöv nr 3, V. Sallerups fs. Tillsammans fick de sonen Olof (1887). I slutet av oktober 1889 lämnade Christina maken och flyttade till Lund med sonen. Per Persson utvandrade sedermera till Amerika. Från 1896 träffade hon Hans Månsson, en änkling med fyra barn, och den 28 mars 1896 gifte de sig. Paret bosatte sig på N. Nöbbelöv nr 5 och sedan på Valkärratorn nr 1. Tillsammans fick de fyra gemensamma barn, däribland Anna Hansson (1900), farmor till Kjell Jönsson. Hans Månsson avled 1912 och Christina bodde kvar i Vallkärratorn fram till 1920 då hon med hemmavarande barn flyttade till Flädie. Christina Jönsdotter avled den 5 augusti 1953, nästan 87 år gammal, och är gravsatt i Vallkärra tillsammans med sin styvson Nils Emil.",
    storySections: [
      {
        title: "Uppväxt och ungdomsår",
        text: "Christina Jönsdotter föddes den 19 mars 1866 i Skeglinge nr 3, utom äktenskapet – föräldrarna var ännu bara trolovade. Åren som piga i Västra Sallerup formade henne inför ett liv av egna val och omständigheter.",
      },
      {
        title: "Första äktenskapet och flykten till Lund",
        text: "År 1886 gifte sig Christina med åbon Per Persson i V. Sallerup och fick sonen Olof 1887. Men i slutet av 1889 lämnade hon maken och reste till Lund med sonen. Per Persson sökte sin lycka i Amerika och är antecknad som obefintlig i husförhörslängderna.",
      },
      {
        title: "Nytt liv med Hans Månsson",
        text: "År 1896 gifte sig Christina med änklingen Hans Månsson, som hade fyra barn sedan tidigare. Paret bosatte sig på N. Nöbbelöv nr 5 och sedan Valkärratorn nr 1, och fick fyra gemensamma barn. Hans avled 1912. Christina levde till 1953 – nästan 87 år gammal.",
      },
    ],
    timeline: [
      {
        year: "1866",
        title: "Född i Skeglinge",
        description: "Christina Jönsdotter föds den 19 mars i Skeglinge nr 3.",
        type: "birth",
      },
      {
        year: "1883",
        title: "Lämnar hemmet",
        description: "Tar anställning som piga i Västra Sallerup.",
        type: "move",
      },
      {
        year: "1886",
        title: "Gift med Per Persson",
        description: "Vigsel den 19 november 1886 med åbon Per Persson. Bosätter sig på Nöbbelöv nr 3, V. Sallerup.",
        type: "marriage",
      },
      {
        year: "1889",
        title: "Flyttar till Lund",
        description: "Lämnar maken och flyttar med sonen Olof till Lund. Per Persson utvandrar till Amerika.",
        type: "move",
      },
      {
        year: "1896",
        title: "Gift med Hans Månsson",
        description: "Vigsel den 28 mars 1896 med änklingen Hans Månsson. Bosätter sig på N. Nöbbelöv nr 5.",
        type: "marriage",
      },
      {
        year: "1920",
        title: "Flyttar till Flädie",
        description: "Efter Hans bortgång 1912 bor Christina kvar i Vallkärratorn. 1920 flyttar hon med hemmavarande barn till Flädie.",
        type: "move",
      },
      {
        year: "1953",
        title: "Bortgång",
        description: "Christina Jönsdotter avlider den 5 augusti, 87 år gammal. Gravsatt i Vallkärra.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-hans-mansson",
    firstName: "Hans",
    lastName: "Månsson",
    fullName: "Hans Månsson",
    gender: "male",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1858-07-21",
    birthYear: 1858,
    deathDate: "1912-11-12",
    deathYear: 1912,
    birthPlace: "Lunnarp",
    occupation: "Bonde / Åbo",
    partner: ["jan-christina-jonsdotter"],
    children: ["jan-anna-hansson"],
    bioShort:
      "Hans Månsson (1858–1912), born i Lunnarp. Änkling med fyra barn när han gifte sig med Christina Jönsdotter 1896. Drev ett småbruk i Vallkärratorn nr 1 tills han avled 1912.",
    bioLong:
      "Hans Månsson föddes den 21 juli 1858 i Lunnarp. Den 14 maj 1887 gifte han sig med Maria Nilsson och fick åtta barn med henne, varav fyra nådde vuxen ålder. I samband med den sista tvillingfödseln 1900 miste Hans hustrun Maria och en av tvillingarna samma dag. Den 25 maj 1900 stod han ensam kvar med sex barn, den yngste nyfödde. En del av barnen tvingades han lämna till fosterhem. Den 28 mars 1896 gifte han om sig med Christina Jönsdotter, och paret bosatte sig på N. Nöbbelöv nr 5, sedan på Valkärratorn nr 1 där de drev ett småbruk. Tillsammans fick de fyra gemensamma barn, däribland Anna Hansson (1900). Hans avled den 12 november 1912.",
    storySections: [
      {
        title: "Svåra år som änkeman",
        text: "Hans Månsson förlorade sin hustru Maria Nilsson och ett av barnen i samband med en tvillingfödsel år 1900. Ensam med sex barn tvingades han lämna en del av dem till fosterhem – en realitet för många fattiga familjer vid sekelskiftet.",
      },
      {
        title: "Nytt hem med Christina",
        text: "År 1896 gifte sig Hans med Christina Jönsdotter och paret slog sig ner i Valkärratorn nr 1 där de drev ett småbruk. De fick fyra barn tillsammans. Hans Månsson avled 1912, 54 år gammal.",
      },
    ],
    timeline: [
      {
        year: "1858",
        title: "Född i Lunnarp",
        description: "Hans Månsson föds den 21 juli i Lunnarp.",
        type: "birth",
      },
      {
        year: "1887",
        title: "Gift med Maria Nilsson",
        description: "Vigsel den 14 maj 1887 med Maria Nilsson. Får åtta barn, varav fyra når vuxen ålder.",
        type: "marriage",
      },
      {
        year: "1900",
        title: "Hustrun Maria avlider",
        description: "Maria Nilsson dör i samband med en tvillingfödsel den 25 maj. Hans kvar med sex barn, den yngste nyfödde.",
        type: "other",
      },
      {
        year: "1896",
        title: "Gift med Christina Jönsdotter",
        description: "Vigsel den 28 mars 1896 med Christina Jönsdotter. Bosätter sig på N. Nöbbelöv nr 5, sedan Valkärratorn nr 1.",
        type: "marriage",
      },
      {
        year: "1912",
        title: "Bortgång",
        description: "Hans Månsson avlider den 12 november, 54 år gammal.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-hanna-andersdotter",
    firstName: "Hanna",
    lastName: "Andersdotter",
    fullName: "Hanna Andersdotter",
    gender: "female",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1859-08-30",
    birthYear: 1859,
    deathDate: "1934-08-23",
    deathYear: 1934,
    birthPlace: "Fjelie nr 17",
    occupation: "Piga / Hemmafru",
    partner: ["jan-jons-bengtsson"],
    children: ["jan-nils-jonsson"],
    bioShort:
      "Hanna Andersdotter (1859–1934), född i Fjelie nr 17. Tjänstgjorde som piga i Fjelie och Nöbbelöv innan hon gifte sig med Jöns Bengtsson 1887 och bosatte sig på N. Nöbbelöv nr 5.",
    bioLong:
      "Hanna Andersdotter föddes den 30 augusti 1859 på Fjelie nr 17. Åren 1875–1881 tjänstgjorde hon som piga på Fjelie nr 11, och därefter på N. Nöbbelöv nr 1 (1882–1885) och N. Nöbbelöv nr 7, Gunnesbo (1885–1887). Den 29 december 1887 gifte hon sig med Jöns Bengtsson och paret bosatte sig på N. Nöbbelöv nr 5 där de levde fram till sin död. De fick två söner: Bengt (1889) och Nils (1896). Jöns avled 1924 och yngste sonen Nils Jönsson drev gården vidare. När Hanna avled den 23 augusti 1934 ärvde äldste sonen Bengt gården och flyttade in med sin familj – något som ledde till en livslång schism mellan bröderna som enligt uppgift aldrig talades vid efter detta. Jöns och Hanna är begravda på N. Nöbbelövs kyrkogård, gravplats 009/A-B.",
    storySections: [
      {
        title: "Piga i bygden",
        text: "Hanna Andersdotter växte upp på Fjelie nr 17 och tillbringade sin ungdom som piga på gårdar i Fjelie och Norra Nöbbelöv. Det var i denna bygd hon mötte sin blivande man Jöns Bengtsson.",
      },
      {
        title: "Livet på N. Nöbbelöv nr 5",
        text: "Gift 1887 med Jöns Bengtsson bosatte sig Hanna på N. Nöbbelöv nr 5. De fick sönerna Bengt och Nils. Jöns avled 1924 och Hanna levde kvar till 1934. Vid hennes död ärvde äldste sonen Bengt gården – ett beslut som skapade en livslång bitterhet mellan bröderna.",
      },
    ],
    timeline: [
      {
        year: "1859",
        title: "Född i Fjelie",
        description: "Hanna Andersdotter föds den 30 augusti på Fjelie nr 17.",
        type: "birth",
      },
      {
        year: "1875",
        title: "Piga i Fjelie",
        description: "Börjar arbeta som piga på Fjelie nr 11, sedan N. Nöbbelöv nr 1 och Gunnesbo.",
        type: "other",
      },
      {
        year: "1887",
        title: "Gift med Jöns Bengtsson",
        description: "Vigsel den 29 december 1887. Paret bosätter sig på N. Nöbbelöv nr 5.",
        type: "marriage",
      },
      {
        year: "1934",
        title: "Bortgång",
        description: "Hanna Andersdotter avlider den 23 augusti. Gravsatt på N. Nöbbelövs kyrkogård, gravplats 009/A-B.",
        type: "death",
      },
    ],
  },
  {
    id: "jan-jons-bengtsson",
    firstName: "Jöns",
    lastName: "Bengtsson",
    fullName: "Jöns Bengtsson",
    gender: "male",
    side: "Jans sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1859-09-04",
    birthYear: 1859,
    deathDate: "1924-07-28",
    deathYear: 1924,
    birthPlace: "Stora Uppåkra nr 3",
    occupation: "Åbo / Bonde",
    // Lägg originalbild här: public/images/people/jan-jons-bengtsson.jpg
    image: "/images/people/jan-jons-bengtsson.jpg",
    gallery: [
      "/images/gallery/jan-jons-bengtsson-familj.jpg",
      "/images/gallery/jan-jons-bengtsson-hast.jpg",
    ],
    partner: ["jan-hanna-andersdotter"],
    children: ["jan-nils-jonsson"],
    bioShort:
      "Jöns Bengtsson (1859–1924), åbo och bonde, född i Stora Uppåkra nr 3. Arbetade som dräng på flera gårdar i Uppåkra och Nöbbelöv innan han gifte sig med Hanna Andersdotter 1887 och bosatte sig på N. Nöbbelöv nr 5.",
    bioLong:
      "Jöns Bengtsson föddes den 4 september 1859 på Stora Uppåkra nr 3. Familjen lämnade gården 1862 och övertog Hjärup nr 7 efter farföräldrarna. År 1874 lämnade Jöns föräldrahemmet och arbetade som dräng på olika gårdar: Lilla Uppåkra nr 9 (1874–1876), Stora Uppåkra nr 13 (1876–1878), Laxmans Åkarp nr 2 (1878–1880), N. Nöbbelöv nr 6 (1880–1882) och N. Nöbbelöv nr 9 (1882–1887). Den 29 december 1887 gifte han sig med Hanna Andersdotter och paret bosatte sig på N. Nöbbelöv nr 5 där de levde fram till sin död. De fick sönerna Bengt (1889) och Nils (1896). Jöns avled den 28 juli 1924. Hans efterlämnade hustru Hanna levde kvar på gården tills hon avled 1934, varefter äldste sonen Bengt ärvde gården – vilket skapade en livslång schism med brodern Nils. Jöns och Hanna är begravda på N. Nöbbelövs kyrkogård, gravplats 009/A-B.",
    storySections: [
      {
        title: "Dräng i bygden",
        text: "Jöns Bengtsson lämnade föräldrahemmet 1874 och vandrade som dräng från gård till gård i Uppåkra och Nöbbelöv under tretton år. Det var i dessa trakter han slog rot och mötte sin blivande hustru Hanna Andersdotter.",
      },
      {
        title: "Åbo på N. Nöbbelöv nr 5",
        text: "Gift 1887 med Hanna Andersdotter bosatte sig Jöns på N. Nöbbelöv nr 5 och drev gården fram till sin bortgång 1924. Sönerna Bengt och Nils växte upp på gården, men när Hanna avled 1934 uppstod en bitter arvsstrid som splittrade bröderna för livet.",
      },
    ],
    timeline: [
      {
        year: "1859",
        title: "Född i Stora Uppåkra",
        description: "Jöns Bengtsson föds den 4 september på Stora Uppåkra nr 3.",
        type: "birth",
      },
      {
        year: "1874",
        title: "Dräng på olika gårdar",
        description: "Lämnar föräldrahemmet och arbetar som dräng i Uppåkra, Åkarp och Nöbbelöv.",
        type: "other",
      },
      {
        year: "1887",
        title: "Gift med Hanna Andersdotter",
        description: "Vigsel den 29 december 1887. Paret bosätter sig på N. Nöbbelöv nr 5.",
        type: "marriage",
      },
      {
        year: "1924",
        title: "Bortgång",
        description: "Jöns Bengtsson avlider den 28 juli. Gravsatt på N. Nöbbelövs kyrkogård, gravplats 009/A-B.",
        type: "death",
      },
    ],
  },

  // ─── Generation 0: Karin's side ──────────────────────────────────────────
  {
    id: "karin-sven-elof-olsson",
    firstName: "Sven Elof",
    lastName: "Olsson",
    fullName: "Sven Elof Olsson",
    gender: "male",
    side: "Karins sida",
    role: "Äldre generation",
    generation: 0,
    birthDate: "1883-04-13",
    birthYear: 1883,
    deathDate: "1957-01-21",
    deathYear: 1957,
    birthPlace: "Södra Siggamåla, Backaryds fs",
    occupation: "Statare / Ryktare",
    parents: ["karin-gumme-olsson-bramstang", "karin-elin-gummesdotter"],
    partner: ["karin-elida-petersdotter-alin"],
    children: ["karin-lennart-olsson"],
    bioShort:
      "Sven Elof Olsson (1883–1957), son till båtsmannen Gumme Olsson Bramstång. Statare och ryktare i Skåne. Gift med Elida Petersdotter Alin 1908. Fick tio barn, bland dem Lennart.",
    bioLong:
      "Sven Elof Olsson föddes den 13 april 1883 i en backstuga i Södra Siggamåla i Backaryds fs som son till båtsmannen Gumme Olsson Bramstång och Elin Gummesdotter. 1901 lämnade han föräldrahemmet och flyttade till Skåne för att arbeta som ryktare. Mellan 1903–1906 tillhörde han 3:e skvadronen vid Kronprinsens husarregemente i Malmö. Han gifte sig med Elida Petersdotter Alin den 12 juli 1908. Familjen levde ett kringflyttande statarliv — Malmö, Borgeby, L. Slågarp, Östra Grevie, Törringe, Hököpinge, Görslöv med flera. De fick tio barn, varav åtta nådde vuxen ålder. Sonen Lennart blev Karins far. Sven Elof avled den 21 januari 1957 och Elida den 12 april 1971.",
    storySections: [
      {
        title: "Båtsmannens son",
        text: "Sven Elof Olsson växte upp i Södra Siggamåla som son till den legendariske båtsmannen Gumme Olsson Bramstång. Som ung lämnade han hemtrakterna i Blekinge och drog till Skåne — ett av många statarbarn som sökte bättre villkor.",
      },
      {
        title: "Statarlivet",
        text: "Sven Elof och Elida levde ett kringflyttande statarliv, alltid i hopp om det skulle bli bättre på nästa gård. Familjen flyttade från Malmö till Borgeby, vidare söderut i Skåne. De fick tio barn. 'Jag tror det finns skyddsänglar' — Lennarts barndomsminnen vittnar om ett hårt men kärleksfullt liv.",
      },
    ],
    timeline: [
      {
        year: "1883",
        title: "Född i Södra Siggamåla",
        description: "Sven Elof Olsson föds den 13 april 1883 i Södra Siggamåla.",
        type: "birth",
      },
      {
        year: "1903",
        title: "Husarregementet",
        description: "Tjänstgör vid 3:e skvadronen, Kronprinsens husarregemente i Malmö (1903–1906).",
        type: "military",
      },
      {
        year: "1908",
        title: "Gift med Elida Petersdotter Alin",
        description: "Vigsel den 12 juli 1908 i Malmö.",
        type: "marriage",
      },
      {
        year: "1957",
        title: "Bortgång",
        description: "Sven Elof Olsson avlider den 21 januari 1957.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-elida-petersdotter-alin",
    firstName: "Elida",
    lastName: "Petersdotter Alin",
    fullName: "Elida Petersdotter Alin",
    gender: "female",
    side: "Karins sida",
    role: "Äldre generation",
    generation: 0,
    birthDate: "1888-03-31",
    birthYear: 1888,
    deathDate: "1971-04-12",
    deathYear: 1971,
    birthPlace: "Hormeshults soldattorp, Virestad",
    occupation: "Hemmafru / Statare",
    parents: ["karin-peter-bengtsson-alin", "karin-elin-jonsdotter"],
    partner: ["karin-sven-elof-olsson"],
    children: ["karin-lennart-olsson"],
    bioShort:
      "Elida Petersdotter Alin (1888–1971), born i Hormeshults soldattorp, Virestad. Gift med Sven Elof Olsson 1908. Levde som statarfru i Skåne och fick tio barn, däribland Lennart.",
    bioLong:
      "Elin Petersdotter Alin, kallad Elida, föddes den 31 mars 1888 i Hormeshults soldattorp i Virestads fs som dotter till soldaten Peter Bengtsson Alin och Elin Jonsdotter. Hon gifte sig med Sven Elof Olsson den 12 juli 1908 och familjen bosatte sig i kv. Krokodilen i Malmö. Paret levde som statare och flyttade runt i Skåne. De fick tio barn, varav åtta nådde vuxen ålder — inklusive Lennart (1922), Karins far. De sista åren som pensionärer bodde de i Klågerup. Elida avled den 12 april 1971.",
    storySections: [
      {
        title: "Soldatdottern Alin",
        text: "Elida Petersdotter bar sin fars soldatnamn Alin — ett arv från det militära rotesystem som präglade familjer som denna i generationer. Precis som Bramstång på den andra grenen av Karins träd bar hon ett namn som vittnade om militärtjänst och heder.",
      },
      {
        title: "Statarlivets moder",
        text: "Som hustru till Sven Elof Olsson levde Elida ett kringflyttande statarliv. Hon gav liv åt tio barn och höll familjen samman genom alla de gårdar de passerade. Sonen Lennart beskriver henne med kärlek i sina barndomsminnen.",
      },
    ],
    timeline: [
      {
        year: "1888",
        title: "Född i Virestad",
        description: "Elida Petersdotter Alin föds den 31 mars 1888 i Hormeshults soldattorp, Virestad.",
        type: "birth",
      },
      {
        year: "1908",
        title: "Gift med Sven Elof Olsson",
        description: "Vigsel den 12 juli 1908 i Malmö.",
        type: "marriage",
      },
      {
        year: "1971",
        title: "Bortgång",
        description: "Elida Petersdotter Alin avlider den 12 april 1971.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-anna-andersson",
    firstName: "Anna",
    lastName: "Andersson",
    fullName: "Anna Andersson",
    gender: "female",
    side: "Karins sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1879-05-03",
    birthYear: 1879,
    deathDate: "1947-10-27",
    deathYear: 1947,
    birthPlace: "Lund",
    occupation: "Hemmafru",
    partner: ["karin-hans-hansson"],
    children: ["karin-knut-hansson"],
    bioShort:
      "Anna Sofia Andersson (1879–1947), född i Lund. Gift med Hans Waldemar Hansson 1898. Bodde på Prennegatan 2 i Nöden, Lund. Fick 6 barn, däribland Knut.",
    bioLong:
      "Anna Sofia Andersson, born 1879-05-03 i Lund, gifte sig med Hans Waldemar Hansson den 12 november 1898. Familjen bodde på Prennegatan 2 i Nöden i Lund åren 1900–1925. Tillsammans fick de 6 barn: Johan Anton Hugo (1899), Ester Valborg (1900), Knut Waldemar (1902), Anna Greta (1903), Elna Theresia (1905) och Vanda Maria (1906). Anna avled den 27 oktober 1947. Paret är begravda på Norra kyrkogården i Lund.",
    storySections: [
      {
        title: "Lundaborna i Nöden",
        text: "Anna Andersson och Hans Waldemar Hansson levde i Lunds arbetarstadsdel Nöden, på Prennegatan 2. Det var en tid av social rörlighet och stadslivets utmaningar. Tillsammans skapade de ett hem för sina sex barn.",
      },
    ],
    timeline: [
      {
        year: "1879",
        title: "Född i Lund",
        description: "Anna Sofia Andersson föds den 3 maj 1879 i Lund.",
        type: "birth",
      },
      {
        year: "1898",
        title: "Gift med Hans Waldemar Hansson",
        description: "Vigsel den 12 november 1898. Bosätter sig på Prennegatan 2 i Nöden, Lund.",
        type: "marriage",
      },
      {
        year: "1947",
        title: "Bortgång",
        description: "Anna Andersson avlider den 27 oktober 1947.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-hans-hansson",
    firstName: "Hans",
    lastName: "Waldemar Hansson",
    fullName: "Hans Waldemar Hansson",
    gender: "male",
    side: "Karins sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1876-02-19",
    birthYear: 1876,
    deathDate: "1956-02-20",
    deathYear: 1956,
    birthPlace: "Lund",
    occupation: "Stilgjutare, Håkan Ohlssons boktryckeri",
    partner: ["karin-anna-andersson"],
    children: ["karin-knut-hansson"],
    bioShort:
      "Hans Waldemar Hansson (1876–1956), stilgjutare vid Håkan Ohlssons boktryckeri i Lund. Gift med Anna Andersson 1898. Far till Knut Hansson.",
    bioLong:
      "Hans Waldemar Hansson, born 1876-02-19 i Lund, var stilgjutare vid det ansedda Håkan Ohlssons boktryckeri i Lund — ett hantverkyrke som krävde precision. Han gifte sig med Anna Andersson den 12 november 1898 och familjen bodde på Prennegatan 2 i Nöden. Tillsammans fick de 6 barn. Dottern Maj-Britt Hansson kom senare att arbeta på samma tryckeri. Hans avled den 20 februari 1956. Paret är begravda på Norra kyrkogården i Lund.",
    storySections: [
      {
        title: "Stilgjutaren på Håkan Ohlssons",
        text: "Hans Waldemar Hansson var stilgjutare vid Håkan Ohlssons boktryckeri i Lund — en av stadens viktigaste kulturinstitutioner under tidigt 1900-tal. Det var ett precisionshantverkyrke som han ägnade sig åt livet ut.",
      },
      {
        title: "Tryckeriet binder generationerna",
        text: "Det var på Håkan Ohlssons Boktryckeri som dottern Maj-Britt Hansson senare fick anställning. Tryckeriet kopplar samman generationerna i familjen på Karins sida.",
      },
    ],
    timeline: [
      {
        year: "1876",
        title: "Född i Lund",
        description: "Hans Waldemar Hansson föds den 19 februari 1876 i Lund.",
        type: "birth",
      },
      {
        year: "1898",
        title: "Gift med Anna Andersson",
        description: "Vigsel den 12 november 1898.",
        type: "marriage",
      },
      {
        year: "1956",
        title: "Bortgång",
        description: "Hans Waldemar Hansson avlider den 20 februari 1956.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-vilhelmina-nilsson",
    firstName: "Vilhelmina",
    lastName: "Nilsson",
    fullName: "Vilhelmina Nilsson",
    gender: "female",
    side: "Karins sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1876-12-03",
    birthYear: 1876,
    deathDate: "1933-01-31",
    deathYear: 1933,
    birthPlace: "Karlskrona",
    occupation: "Piga / Hemmafru",
    // Lägg originalbild här: public/images/people/karin-vilhelmina-nilsson.jpg
    image: "/images/people/karin-vilhelmina-nilsson.jpg",
    gallery: ["/images/gallery/karin-vilhelmina-nilsson-portatt.jpg"],
    partner: ["karin-hans-larsson"],
    children: ["karin-hilma-larsson"],
    bioShort:
      "Vilhelmina Nilsson (1876–1933), född i Karlskrona. Gift med änklingen Hans Larsson 1902. Fick tio gemensamma barn, däribland Hilma Larsson (1906). Familjen levde ett kringflackande statarliv och bodde på 18 olika ställen.",
    bioLong:
      "Vilhelmina Nilsson föddes den 3 december 1876 i Karlskrona. År 1895 lämnade hon Karlskrona och tog anställning som piga i Husie nr 2. Hon arbetade sedan på Botildenborg (1897–1898) och Ettarp i Gödelövs fs (1900–1902), där hon träffade änklingen Hans Larsson. Hans hade nyss blivit ensam med sex barn efter att hans första hustru dog 1900. Den 15 november 1902 gifte sig Vilhelmina och Hans i Gödelöv. Tillsammans fick de tio barn, varav alla utom ett nådde vuxen ålder. Hans arbetade som ryktare och familjen levde ett kringflackande statarliv – totalt bodde de på 18 olika ställen åren 1902–1930. De sista åren tillbringade paret på ålderdomshemmet i Östra Torn. Hans avled den 9 maj 1932 och Vilhelmina den 31 januari 1933. De är begravda på Norra kyrkogården i Lund, kvarter 041, gravplats 0121–122. Där vilar även deras dotter Hilma med make och dotter.",
    storySections: [
      {
        title: "Från Karlskrona till Skånes gårdar",
        text: "Vilhelmina Nilsson lämnade Karlskrona som ung kvinna och sökte sig till Skånes gårdar som piga. Det var under ett sådant arbetsår i Gödelöv som hon träffade änklingen Hans Larsson.",
      },
      {
        title: "Kringflackande statarliv",
        text: "Gift 1902 med Hans Larsson delade Vilhelmina ett hårt liv på resande fot. Familjen bodde på 18 olika ställen under 28 år. Trots detta fick de tio barn tillsammans, nästan alla med livet i behåll – däribland dottern Hilma, som skulle bli mor till Karin.",
      },
      {
        title: "Sista åren och minnet",
        text: "Paret tillbringade sina sista år på ålderdomshemmet i Östra Torn. Vilhelmina avled 1933, ett drygt halvår efter Hans. De vilar på Norra kyrkogården i Lund, tillsammans med dottern Hilma och hennes familj.",
      },
    ],
    timeline: [
      {
        year: "1876",
        title: "Född i Karlskrona",
        description: "Vilhelmina Nilsson föds den 3 december i Karlskrona.",
        type: "birth",
      },
      {
        year: "1895",
        title: "Lämnar Karlskrona",
        description: "Tar anställning som piga i Husie nr 2, Skåne.",
        type: "move",
      },
      {
        year: "1902",
        title: "Gift med Hans Larsson",
        description: "Vigsel den 15 november 1902 i Gödelöv med änklingen Hans Larsson.",
        type: "marriage",
      },
      {
        year: "1933",
        title: "Bortgång",
        description: "Vilhelmina Nilsson avlider den 31 januari. Gravsatt på Norra kyrkogården i Lund, kvarter 041, gravplats 0121–122.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-hans-larsson",
    firstName: "Hans",
    lastName: "Larsson",
    fullName: "Hans Larsson",
    gender: "male",
    side: "Karins sida",
    role: "Äldre generation",
    generation: -1,
    birthDate: "1862-12-27",
    birthYear: 1862,
    deathDate: "1932-05-09",
    deathYear: 1932,
    birthPlace: "Östra Vemmenhög",
    occupation: "Ryktare / Statare",
    // Lägg originalbild här: public/images/people/karin-hans-larsson.jpg
    image: "/images/people/karin-hans-larsson.jpg",
    gallery: ["/images/gallery/karin-hans-larsson-portatt.jpg"],
    partner: ["karin-vilhelmina-nilsson"],
    children: ["karin-hilma-larsson"],
    bioShort:
      "Hans Larsson (1862–1932), ryktare, född i Östra Vemmenhög. Fick en svår start i livet med uppväxt i fattighuset. Änkling 1900 med sex barn. Gift med Vilhelmina Nilsson 1902, fick tio barn till, däribland Hilma.",
    bioLong:
      "Hans Larsson föddes den 27 december 1862 i Östra Vemmenhög. Hans barndom präglades av fattigdom – han bodde med familjen i fattighuset. Vid 18 års ålder lämnade han föräldrarna och förde sedan ett kringflackande liv som statare och ryktare. Den 14 maj 1887 gifte han sig med Maria Nilsson och fick åtta barn med henne, varav fyra nådde vuxen ålder. I samband med en tvillingfödsel den 25 maj 1900 dog hustrun Maria och en av tvillingarna. Hans stod ensam med sex barn, den yngste nyfödde, och tvingades lämna en del av dem till fosterhem. Den 15 november 1902 gifte han om sig med Vilhelmina Nilsson och fick tio barn till. Familjen levde ett kringflackande statarliv och bodde på 18 olika ställen åren 1902–1930. De sista åren tillbringade Hans på ålderdomshemmet i Östra Torn. Han avled den 9 maj 1932. Vilhelmina följde kort därpå, den 31 januari 1933. De vilar på Norra kyrkogården i Lund, kvarter 041, gravplats 0121–122, tillsammans med dottern Hilma och hennes familj.",
    storySections: [
      {
        title: "Uppväxt i fattigdom",
        text: "Hans Larsson växte upp i fattighuset i Östra Vemmenhög. Vid 18 år lämnade han familjen bakom sig och sökte sitt uppehälle som statare och ryktare – ett liv han sedan förde i decennier.",
      },
      {
        title: "Tragedi och nytt liv",
        text: "Med sin första hustru Maria Nilsson fick Hans åtta barn, men fyra av dem dog unga. Vid en tvillingfödsel 1900 dog Maria och ett av tvillingarna på samma dag. Ensam med sex barn tvingades Hans lämna en del till fosterhem. 1902 gifte han om sig med Vilhelmina Nilsson och fick tio barn till.",
      },
      {
        title: "Kringflackande statarliv",
        text: "Hans och Vilhelmina bodde på hela 18 olika ställen under 28 år. Trots det kringflackande livet höll familjen ihop. De sista åren tillbringade de på ålderdomshemmet i Östra Torn och vilar idag på Norra kyrkogården i Lund.",
      },
    ],
    timeline: [
      {
        year: "1862",
        title: "Född i Östra Vemmenhög",
        description: "Hans Larsson föds den 27 december i Östra Vemmenhög.",
        type: "birth",
      },
      {
        year: "1887",
        title: "Gift med Maria Nilsson",
        description: "Vigsel den 14 maj 1887. Får åtta barn, varav fyra når vuxen ålder.",
        type: "marriage",
      },
      {
        year: "1900",
        title: "Hustrun Maria dör",
        description: "Maria Nilsson och ett av tvillingarna dör vid födseln den 25 maj. Hans ensam med sex barn.",
        type: "other",
      },
      {
        year: "1902",
        title: "Gift med Vilhelmina Nilsson",
        description: "Vigsel den 15 november 1902 i Gödelöv. Får tio barn till, däribland Hilma (1906).",
        type: "marriage",
      },
      {
        year: "1932",
        title: "Bortgång",
        description: "Hans Larsson avlider den 9 maj. Gravsatt på Norra kyrkogården i Lund, kvarter 041, gravplats 0121–122.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-peter-bengtsson-alin",
    firstName: "Peter",
    lastName: "Bengtsson Alin",
    fullName: "Peter Bengtsson Alin",
    gender: "male",
    side: "Karins sida",
    role: "Äldre generation / Soldat",
    generation: -1,
    birthYear: 1859,
    deathYear: 1933,
    birthPlace: "Näranshults soldattorp, Virestad",
    occupation: "Soldat (båtsman)",
    partner: ["karin-elin-jonsdotter"],
    children: ["karin-elida-petersdotter-alin"],
    bioShort:
      "Peter Bengtsson Alin (1859–1933), soldat, born i Näranshults soldattorp, Virestad. Kronobergs regemente 1879. Fick dottern Elida med sin första hustru Ingrid Jakobsdotter.",
    bioLong:
      "Peter Bengtsson Alin föddes den 23 april 1859 i Näranshults soldattorp i Virestads fs. Han tog värvning vid Allbo kompani, Kronobergs regemente år 1879 och fick soldatnamnet Alin. Han gifte sig med Ingrid Jakobsdotter den 23 september 1882 och de fick tre barn: Karl Johan (1883), Hilda (1885) och Elida (1888). Ingrid avled tidigt den 24 januari 1889. Den 21 juni 1890 gifte Peter om sig med Elin Jonsdotter — de fick inga gemensamma barn. Peter tog avsked som soldat 1906 och bodde kvar i soldattorpet till sin bortgång den 25 mars 1933. Elin Jonsdotter avled den 3 februari 1931.",
    storySections: [
      {
        title: "Soldatnamnet Alin",
        text: "Likt Jöns Andersson Lindoff på Jans sida, fick Peter Bengtsson ett soldatnamn vid sin inskrivning 1879 – Alin. Soldatnamnens tradition är ett genomgående drag i familjens historia.",
      },
      {
        title: "Soldattorpet i Virestad",
        text: "Peter Bengtsson Alin föddes i Näranshults soldattorp i Virestad – en fysisk plats som knöt an till det militära arv som präglade familjen på Karins sida.",
      },
    ],
    timeline: [
      {
        year: "1859",
        title: "Född i Näranshults soldattorp",
        description: "Peter Bengtsson föds i soldattorpet i Virestad.",
        type: "birth",
      },
      {
        year: "1879",
        title: "Tar soldatnamnet Alin",
        description: "Skrivs in som soldat och antar namnet Alin.",
        type: "military",
      },
      {
        year: "1882",
        title: "Gift med Ingrid Jakobsdotter",
        description: "Vigsel med Ingrid Jakobsdotter.",
        type: "marriage",
      },
      {
        year: "1933",
        title: "Bortgång",
        description: "Peter Bengtsson Alin avlider, 74 år gammal.",
        type: "death",
      },
    ],
  },
  {
    id: "karin-elin-gummesdotter",
    firstName: "Elin",
    lastName: "Gummesdotter",
    fullName: "Elin Gummesdotter",
    gender: "female",
    side: "Karins sida",
    role: "Äldre generation",
    generation: -1,
    birthYear: 1845,
    deathYear: 1915,
    partner: ["karin-gumme-olsson-bramstang"],
    children: ["karin-sven-elof-olsson"],
    birthPlace: "Abborremåla, Backaryds fs",
    deathPlace: "Malmö",
    bioShort:
      "Elin Gummesdotter (1845–1915), born i Abborremåla, Backaryd. Gift med Gumme Olsson Bramstång 1874. Mor till Sven Elof Olsson. Avled i Malmö 1915.",
    bioLong:
      "Elin Gummesdotter föddes den 25 september 1845 i Abborremåla i Backaryds fs. Hon gifte sig 1865 med Sven Karlsson och fick tre barn, men båda äldsta barnen och maken avled 1869. År 1874 gifte hon om sig med änklingen och f.d. båtsmannen Gumme Olsson Bramstång. Tillsammans fick de sex barn, varav fem nådde vuxen ålder. Sonen Sven Elof Olsson (1883) är Lennarts farfar och Karins anfader. Gumme avled 1895 och Elin lämnade Södra Siggamåla 1909 och flyttade till Malmö, där hon avled den 1 juni 1915.",
    storySections: [
      {
        title: "Båtsmanshustrun",
        text: "Elin Gummesdotter gifte sig med Gumme Olsson Bramstång och delade det sjöfartsliv som präglade kustsocknarna i södra Sverige. Deras son Sven Elof Olsson för linjen vidare till Lennart Olsson och Karin.",
      },
    ],
    timeline: [
      { year: "1845", title: "Född", description: "Elin Gummesdotter föds.", type: "birth" },
      { year: "1874", title: "Gift med Gumme Olsson Bramstång", description: "Vigsel.", type: "marriage" },
      { year: "1915", title: "Bortgång", description: "Elin Gummesdotter avlider.", type: "death" },
    ],
  },
  {
    id: "karin-elin-jonsdotter",
    firstName: "Elin",
    lastName: "Jonsdotter",
    fullName: "Elin Jonsdotter",
    gender: "female",
    side: "Karins sida",
    role: "Äldre generation",
    generation: -1,
    birthYear: 1847,
    deathYear: 1931,
    partner: ["karin-peter-bengtsson-alin"],
    children: ["karin-elida-petersdotter-alin"],
    bioShort:
      "Elin Jonsdotter (1847–1931), gift med soldaten Peter Bengtsson Alin. Mor till Elida Petersdotter Alin.",
    bioLong:
      "Elin Jonsdotter, born 1847, gifter sig med soldaten Peter Bengtsson Alin och de får dottern Elida Petersdotter Alin 1888. Elin lever till 1931.",
    storySections: [
      {
        title: "Soldathustruns liv",
        text: "Elin Jonsdotter delade livet med soldaten Peter Bengtsson Alin, som bar det militära tjänstenamnet Alin. Deras dotter Elida för arvet vidare.",
      },
    ],
    timeline: [
      { year: "1847", title: "Född", description: "Elin Jonsdotter föds.", type: "birth" },
      { year: "1931", title: "Bortgång", description: "Elin Jonsdotter avlider, 84 år gammal.", type: "death" },
    ],
  },
  {
    id: "karin-gumme-olsson-bramstang",
    firstName: "Gumme",
    lastName: "Olsson Bramstång",
    fullName: "Gumme Olsson Bramstång",
    gender: "male",
    side: "Karins sida",
    role: "Äldre generation / Båtsman",
    generation: -1,
    birthYear: 1828,
    deathYear: 1895,
    birthPlace: "Horkoneryd kvarnbacke, Södra Sandsjö",
    occupation: "Båtsman / Sjöman",
    partner: ["karin-elin-gummesdotter"],
    children: ["karin-sven-elof-olsson"],
    bioShort:
      "Gumme Olsson Bramstång (1828–1895), båtsman, born i Horkoneryd kvarnbacke, Södra Sandsjö. Tog tjänstenamnet Bramstång för Södra Siggamåla. Gift med Elin Gummesdotter 1874. Far till Sven Elof Olsson.",
    bioLong:
      "Gumme Olsson Bramstång, born 1828-06-14 i Horkoneryd kvarnbacke, Södra Sandsjö, var f.d. båtsman i Södra Siggamåla och bar tjänstenamnet Bramstång. Han var änkling med tre barn 1873 när han träffade Elin Gummesdotter. De gifte sig 1874-04-24. Sonen Sven Elof Olsson föddes 1883 och är Lennarts far och Karins farfar. Karin skriver i familjesagan att hennes intresse för släktforskning väcktes på nytt 2008 när hon och Jan besökte platsen i Södra Siggamåla där båtmanstorpet en gång låg. Gumme avled 1895-02-13.",
    storySections: [
      {
        title: "Båtsmannen Bramstång",
        text: "Gumme Olsson Bramstång, born 1828 i Horkoneryd kvarnbacke, Södra Sandsjö, antog båtsmannamnet Bramstång 1847 för Södra Siggamåla. Precis som Jöns Andersson Lindoff på Jans sida fick han ett nytt namn genom sin militärtjänst.",
      },
      {
        title: "Livet vid vattnet",
        text: "Som båtsman tillhörde Gumme den svenska flottans rotesystem. Han och Elin Gummesdotter bildade familj och fick sonen Sven Elof. Gumme avled 1895.",
      },
    ],
    timeline: [
      {
        year: "1828",
        title: "Född i Horkoneryd",
        description: "Gumme Olsson föds i Horkoneryd kvarnbacke, Södra Sandsjö.",
        type: "birth",
      },
      {
        year: "1847",
        title: "Blir båtsman",
        description: "Antar båtsmannamnet Bramstång för Södra Siggamåla.",
        type: "military",
      },
      {
        year: "1874",
        title: "Gift med Elin Gummesdotter",
        description: "Vigsel med Elin Gummesdotter.",
        type: "marriage",
      },
      {
        year: "1895",
        title: "Bortgång",
        description: "Gumme Olsson Bramstång avlider, 67 år gammal.",
        type: "death",
      },
    ],
  },
];

export function getPersonById(id: string): Person | undefined {
  return familyData.find((p) => p.id === id);
}

export function getPersonsByGeneration(generation: number): Person[] {
  return familyData.filter((p) => p.generation === generation);
}

export function getPersonsBySide(side: string): Person[] {
  return familyData.filter((p) => p.side === side);
}

export function getRelatives(
  person: Person,
  relation: "parents" | "children" | "partner" | "siblings"
): Person[] {
  const ids = person[relation] ?? [];
  return ids.map((id) => getPersonById(id)).filter((p): p is Person => p !== undefined);
}

export function searchPersons(query: string): Person[] {
  const q = query.toLowerCase().trim();
  if (!q) return familyData;

  return familyData.filter((person) => {
    const nameMatch = person.fullName.toLowerCase().includes(q);
    const placeMatch =
      (person.birthPlace?.toLowerCase().includes(q) ?? false) ||
      (person.deathPlace?.toLowerCase().includes(q) ?? false);
    const yearMatch =
      (person.birthYear?.toString().includes(q) ?? false) ||
      (person.deathYear?.toString().includes(q) ?? false) ||
      (person.birthDate?.includes(q) ?? false);
    const occupationMatch = person.occupation?.toLowerCase().includes(q) ?? false;
    const bioMatch = person.bioShort?.toLowerCase().includes(q) ?? false;
    return nameMatch || placeMatch || yearMatch || occupationMatch || bioMatch;
  });
}

export const featuredPersonIds = [
  "jan-jons-andersson-lindoff",
  "karin-maj-britt-hansson",
  "jan-anna-nilsson",
  "karin-gumme-olsson-bramstang",
];
