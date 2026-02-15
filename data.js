// ============================================
// DRIFT APP — Location Database
// ============================================

const CITIES = {
    cologne: {
        name: "Keulen",
        center: { lat: 50.9375, lng: 6.9603 },
        neighborhoods: {
            belgisches: {
                name: "Belgisches Viertel",
                vibe: "Creatief, hip, vol karakter"
            },
            ehrenfeld: {
                name: "Ehrenfeld",
                vibe: "Rauw, multicultureel, street art"
            },
            suedstadt: {
                name: "Südstadt",
                vibe: "Bohemien, gezellig, studentikoos"
            },
            nippes: {
                name: "Nippes",
                vibe: "Dorps gevoel in de stad, markt"
            },
            altstadt: {
                name: "Altstadt-Nord",
                vibe: "Historisch, levendig, klassiek"
            }
        },
        places: {
            coffee: [
                {
                    name: "Heilandt Kaffeemanufaktur",
                    neighborhood: "belgisches",
                    type: "☕ Koffie",
                    address: "Brüsseler Platz area",
                    lat: 50.9388,
                    lng: 6.9350,
                    story: "Een micro-rösterij waar de eigenaar elke boon persoonlijk selecteert. Ga vroeg — de locals zitten hier al om 8u met hun laptop en een flat white. De geur van vers gebrande bonen trekt je naar binnen voordat je het bordje ziet.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Van Dyck Rosterei",
                    neighborhood: "ehrenfeld",
                    type: "☕ Koffie",
                    address: "Körnerstraße 54",
                    lat: 50.9493,
                    lng: 6.9226,
                    story: "Third-wave coffee in een voormalige industriehal. Hier kom je niet voor de latte art maar voor het gesprek met de barista over single-origin uit Ethiopië. De ruimte ademt Ehrenfeld: rauw, eerlijk, zonder pretentie.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Café Sehnsucht",
                    neighborhood: "suedstadt",
                    type: "☕ Koffie",
                    address: "Bonner Straße 48",
                    lat: 50.9499,
                    lng: 6.9233,
                    story: "Sehnsucht — verlangen naar iets moois. De naam zegt alles. Klein café met tweedehands meubels, verse taart, en een eigenares die je naam onthoudt na twee bezoeken. Het is alsof je bij iemand thuis koffie drinkt.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Schamong Kaffee",
                    neighborhood: "altstadt",
                    type: "☕ Koffie",
                    address: "Kyffhäuserstraße 18",
                    lat: 50.9559,
                    lng: 6.9053,
                    story: "Sinds 1949 brandt deze familie koffie in Keulen. Geen hipster-vibes, gewoon generaties aan vakmanschap. De filterkoffie hier is een tijdmachine naar hoe koffie bedoeld was.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Bäckerei Zimmermann",
                    neighborhood: "nippes",
                    type: "☕ Koffie",
                    address: "Neusser Straße 173",
                    lat: 50.9614,
                    lng: 6.9502,
                    story: "Technisch een bakker, maar de koffie is een excuus om hun Sauerteig-brood te proeven. Zaterdag ochtend is het hier vol met Nippes-bewoners die hun weekendbrood ophalen. Ga in de rij staan — het is het waard.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Ernst Kaffeeröster",
                    neighborhood: "suedstadt",
                    type: "☕ Koffie",
                    address: "Bonner Straße 56",
                    lat: 50.9222,
                    lng: 6.9484,
                    story: "Minimalisme in een kopje. Witte muren, perfecte espresso, en een eigenaar die 'nee' zegt als je om havermelk vraagt. Hier gaat het om de boon, niet om jouw voorkeur. Verfrissend eerlijk.",
                    budget: "mid",
                    energy: "balanced"
                }
            ],
            character: [
                {
                    name: "Brüsseler Platz (na 17u)",
                    neighborhood: "belgisches",
                    type: "🎭 Karakter",
                    address: "Brüsseler Platz",
                    lat: 50.9386,
                    lng: 6.9342,
                    story: "Overdag een onopvallend pleintje bij een kerk. Na vijf uur 's middags transformeert het in Keulens onofficiële woonkamer. Mensen zitten op de trappen, delen wijn uit flesjes, en het geluid van gitaren mengt met gesprekken in zes talen.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Atelierhaus Ehrenfeld",
                    neighborhood: "ehrenfeld",
                    type: "🎭 Karakter",
                    address: "Hospeltstraße 69",
                    lat: 50.9521,
                    lng: 6.9026,
                    story: "Een voormalig fabrieksgebouw waar kunstenaars werken met open deuren. Loop binnen, kijk rond, praat met iemand. Geen entree, geen gids, geen regels. Alleen creatie in haar puurste vorm.",
                    budget: "low",
                    energy: "explorer"
                },
                {
                    name: "Volkstheater Millowitsch",
                    neighborhood: "altstadt",
                    type: "🎭 Karakter",
                    address: "Aachener Straße 5",
                    lat: 50.9364,
                    lng: 6.9368,
                    story: "Keuls dialect-theater dat al generaties publiek trekt. Je hoeft niet alles te verstaan — de sfeer vertelt het verhaal. Hier lach je mee met een zaal vol mensen die dit als traditie koesteren.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Neptunbad",
                    neighborhood: "ehrenfeld",
                    type: "🎭 Karakter",
                    address: "Neptunplatz 1",
                    lat: 50.9470,
                    lng: 6.9187,
                    story: "Art deco zwembad uit 1912, getransformeerd tot wellness-tempel. De architectuur alleen is een bezoek waard. Zwem baantjes in een ruimte die je doet vergeten dat je in een stad bent.",
                    budget: "high",
                    energy: "chill"
                },
                {
                    name: "Bücherbüchse Nippes",
                    neighborhood: "nippes",
                    type: "🎭 Karakter",
                    address: "Neusser Straße 197",
                    lat: 50.9630,
                    lng: 6.9531,
                    story: "Een boekenwinkel waar de eigenaar je boek kiest op basis van je humeur. Zeg wat je voelt, en je krijgt een stapel die je leven verandert. Tenminste, dat beweert ze. En ze heeft vaak gelijk.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Südstadt Flohmarkt (zondag)",
                    neighborhood: "suedstadt",
                    type: "🎭 Karakter",
                    address: "Volksgarten",
                    lat: 50.9219,
                    lng: 6.9493,
                    story: "Zondagochtend, 8u: vintage jassen, DDR-design, vinyl voor 2 euro. Het is niet de spullen die het bijzonder maken, maar het ritueel. Koffie in de hand, langzaam slenteren, met vreemden onderhandelen over een lamp.",
                    budget: "low",
                    energy: "balanced"
                }
            ],
            cultural: [
                {
                    name: "Museum Ludwig",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Heinrich-Böll-Platz",
                    lat: 50.9408,
                    lng: 6.9600,
                    story: "Vergeet de Dom — dit is Keulens echte meesterwerk. De grootste Pop Art collectie buiten de VS, Picasso's die je sprakeloos maken, en een gebouw dat zelf kunst is. Ga op donderdag na 17u voor rust.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Kolumba Museum",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Kolumbastraße 4",
                    lat: 50.9364,
                    lng: 6.9526,
                    story: "Peter Zumthor bouwde dit museum letterlijk op de ruïnes van een gotische kerk. Licht, stilte, en kunst die je niet uitlegt maar laat voelen. Dit is geen museum — het is meditatie met muren.",
                    budget: "mid",
                    energy: "chill"
                },
                {
                    name: "Underground Cologne Tour",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Roncalliplatz",
                    lat: 50.9412,
                    lng: 6.9571,
                    story: "Onder je voeten ligt 2000 jaar geschiedenis. Romeinse riolen, middeleeuwse kelders, WWII-bunkers. Een lokale gids neemt je mee naar wat toeristen nooit zien: de stad onder de stad.",
                    budget: "mid",
                    energy: "explorer"
                },
                {
                    name: "King Georg (live muziek)",
                    neighborhood: "suedstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Sudermanstraße 2",
                    lat: 50.9510,
                    lng: 6.9564,
                    story: "Geen aankondigingen op Facebook, geen reserveringen. Loop binnen op een doordeweekse avond en er is 50% kans dat er iemand speelt die je nooit hebt gehoord maar nooit zal vergeten.",
                    budget: "low",
                    energy: "explorer"
                },
                {
                    name: "Rautenstrauch-Joest Museum",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Cäcilienstraße 29-33",
                    lat: 50.9354,
                    lng: 6.9517,
                    story: "Culturen van de wereld, verteld zonder koloniaal perspectief. Dit museum laat je nadenken over hoe we naar 'de ander' kijken. Verrassend confronterend, verrassend relevant.",
                    budget: "mid",
                    energy: "balanced"
                }
            ],
            walks: [
                {
                    name: "Rijnpark bij zonsondergang",
                    neighborhood: "suedstadt",
                    type: "🌙 Avondwandeling",
                    address: "Rheinauhafen → Südbrücke",
                    lat: 50.9252,
                    lng: 6.9660,
                    story: "Loop van de Rheinauhafen richting de Südbrücke als de zon ondergaat. De kranen van de haven worden silhouetten, roeiers glijden over het water, en Keulen voelt even als een mediterrane stad.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Volksgarten avondloop",
                    neighborhood: "suedstadt",
                    type: "🌙 Avondwandeling",
                    address: "Volksgarten",
                    lat: 50.9219,
                    lng: 6.9493,
                    story: "Het park verandert na donker. Studenten met wijn, joggers die hun dag uitlopen, en af en toe een saxofonist bij het meer. De stad stopt hier met druk zijn.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Mediapark → Ehrenfeld route",
                    neighborhood: "ehrenfeld",
                    type: "🌙 Avondwandeling",
                    address: "Mediapark → Venloer Straße",
                    lat: 50.9421,
                    lng: 6.9399,
                    story: "Van het stille Mediapark loop je geleidelijk de chaos van Ehrenfeld in. Street art verschijnt, kebabzaken gloeien, en je eindigt ergens bij een Späti met een Kölsch in de hand.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Aachener Weiher ronde",
                    neighborhood: "belgisches",
                    type: "🌙 Avondwandeling",
                    address: "Aachener Weiher",
                    lat: 50.9353,
                    lng: 6.9277,
                    story: "Een vijver omringd door oude bomen, op loopafstand van het Belgisches Viertel. In de zomer zitten hier groepen met picknickmanden. In de winter is het stil genoeg om je eigen adem te horen.",
                    budget: "low",
                    energy: "chill"
                }
            ],
            dinner: [
                {
                    name: "Bei Oma Kleinmann",
                    neighborhood: "altstadt",
                    type: "🍽️ Locals-only Diner",
                    address: "Zülpicher Straße 9",
                    lat: 50.9296,
                    lng: 6.9382,
                    story: "Schnitzel zo groot als je bord, geserveerd door een team dat je behandelt als familie. Anthony Bourdain at hier. De muren hangen vol met foto's van beroemdheden die hier 'per ongeluk' binnenkwamen. Reserveer niet — wacht gewoon.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Salon Schmitz",
                    neighborhood: "belgisches",
                    type: "🍽️ Locals-only Diner",
                    address: "Aachener Straße 28",
                    lat: 50.9375,
                    lng: 6.9356,
                    story: "Drie zaken in één: slagerij, bar, restaurant. De Metzgerei (slagerij-kant) serveert 's avonds gerechten die je oma zou goedkeuren, in een setting die je oma niet zou herkennen. Bestelling gaat via krijtbord.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Habibi (laat)",
                    neighborhood: "ehrenfeld",
                    type: "🍽️ Locals-only Diner",
                    address: "Zülpicher Straße 28",
                    lat: 50.9275,
                    lng: 6.9342,
                    story: "Na middernacht is dit de enige plek die ertoe doet. Falafel die je bijblijft, hummus waar je stil van wordt, en een rij die bewijst dat de beste dingen in het leven wachten waard zijn.",
                    budget: "low",
                    energy: "explorer"
                },
                {
                    name: "Törtchen Törtchen (brunch spot)",
                    neighborhood: "altstadt",
                    type: "🍽️ Locals-only Diner",
                    address: "Apostelnstraße 19",
                    lat: 50.9380,
                    lng: 6.9447,
                    story: "Voor als 'diner' eigenlijk 'laat ontbijt' betekent. Patisserie-level gebak in een café dat eruitziet als een Wes Anderson-set. De locals noemen het hun 'guilty pleasure'. Ze hebben gelijk aan beide kanten.",
                    budget: "mid",
                    energy: "chill"
                },
                {
                    name: "Ouzeria",
                    neighborhood: "suedstadt",
                    type: "🍽️ Locals-only Diner",
                    address: "Alteburger Straße 25",
                    lat: 50.9389,
                    lng: 6.9340,
                    story: "Grieks, maar dan zoals Grieken het zelf eten. Geen toeristen-moussaka, wel meze-tafels waar je twee uur voor gaat zitten. De eigenaar schenkt ouzo als je blijft tot na tienen. Blijf tot na tienen.",
                    budget: "mid",
                    energy: "balanced"
                }
            ]
        }
    },
    amsterdam: {
        name: "Amsterdam",
        center: { lat: 52.3676, lng: 4.9041 },
        neighborhoods: {
            jordaan: { name: "Jordaan", vibe: "Gezellig, kunstzinnig, grachten" },
            depijp: { name: "De Pijp", vibe: "Multicultureel, markt, trendy" },
            oost: { name: "Oost", vibe: "Opkomend, divers, groen" },
            noord: { name: "Noord", vibe: "Creatief, rauw, verrassend" }
        },
        places: {
            coffee: [
                { name: "Scandinavian Embassy", neighborhood: "depijp", type: "☕ Koffie", address: "Sarphatipark 34", lat: 52.3535, lng: 4.8942, story: "Nordic minimalism meets Amsterdamse gezelligheid. De kanelbroodjes zijn het echte kunstwerk hier, niet de latte art. Ga op zaterdag, neem een boek mee, en doe alsof je een local bent.", budget: "mid", energy: "chill" },
                { name: "Lot Sixty One", neighborhood: "jordaan", type: "☕ Koffie", address: "Kinkerstraat 112", lat: 52.3688, lng: 4.8695, story: "Geen wifi. Geen stopcontacten. Alleen koffie die zo goed is dat je je laptop niet mist. De eigenaren hebben in Melbourne geleerd wat koffie kan zijn.", budget: "low", energy: "balanced" },
                { name: "Back to Black", neighborhood: "jordaan", type: "☕ Koffie", address: "Weteringstraat 48", lat: 52.3610, lng: 4.8884, story: "Verstopt achter een onopvallende gevel. Binnen is het een parel: verse roast, keramiek van lokale kunstenaars, en een barista die vijf minuten over je pour-over praat als je het toelaat.", budget: "low", energy: "chill" }
            ],
            character: [
                { name: "NDSM Werf", neighborhood: "noord", type: "🎭 Karakter", address: "NDSM-plein 28", lat: 52.4000, lng: 4.8931, story: "Voormalige scheepswerf, nu een creatieve vrijhaven. Graffiti, ateliers, een strandje, en het gevoel dat alles hier mogelijk is. Neem de pont — de overtocht is al een beleving.", budget: "low", energy: "explorer" },
                { name: "Noordermarkt (zaterdag)", neighborhood: "jordaan", type: "🎭 Karakter", address: "Noordermarkt 48", lat: 52.3742, lng: 4.8850, story: "Boerenmarkt op zaterdag. Organic kaas, vers brood, bloemen. De Jordanezen doen hier hun weekend-inkopen terwijl ze buurvrouwen begroeten. Dit is niet shoppen, dit is sociologie.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "Foam Fotografiemuseum", neighborhood: "jordaan", type: "🎨 Cultuur Wildcard", address: "Keizersgracht 609", lat: 52.3594, lng: 4.8942, story: "Klein, intiem, en altijd verrassend. Fotografie die je perspectief verschuift. Het grachtenpand alleen is al de moeite waard.", budget: "mid", energy: "balanced" },
                { name: "EYE Filmmuseum", neighborhood: "noord", type: "🎨 Cultuur Wildcard", address: "IJpromenade 1", lat: 52.3843, lng: 4.9012, story: "Het gebouw lijkt op een ruimteschip dat op de IJ-oever is geland. Binnen: filmgeschiedenis, experimentele installaties, en het beste terras van Amsterdam.", budget: "mid", energy: "balanced" }
            ],
            walks: [
                { name: "Vondelpark → Jordaan slenteren", neighborhood: "jordaan", type: "🌙 Avondwandeling", address: "Vondelpark → Jordaan", lat: 52.3580, lng: 4.8686, story: "Start bij het Vondelpark als de straatlantaarns aangaan. Loop via de stille grachten van de Jordaan waar het licht op het water danst. Eindig bij een bruin café dat al 100 jaar hetzelfde doet.", budget: "low", energy: "chill" }
            ],
            dinner: [
                { name: "Wilde Zwijnen", neighborhood: "oost", type: "🍽️ Locals-only Diner", address: "Javaplein 23", lat: 52.3614, lng: 4.9412, story: "Farm-to-table voordat het een buzzword was. Het menu verandert dagelijks, de ingrediënten komen van boeren die de chef bij naam kent. Amsterdam-Oost op z'n best.", budget: "high", energy: "balanced" },
                { name: "Bar Spek", neighborhood: "jordaan", type: "🍽️ Locals-only Diner", address: "Admiraal de Ruyterweg 1", lat: 52.3737, lng: 4.8598, story: "Geen menu. Je eet wat de chef maakt. Klinkt eng? Dat is het punt. Elke avond een verrassing, altijd spectaculair. Dit is blind vertrouwen in iemands talent.", budget: "mid", energy: "explorer" }
            ]
        }
    },
    antwerp: {
        name: "Antwerpen",
        center: { lat: 51.2194, lng: 4.4025 },
        neighborhoods: {
            zurenborg: { name: "Zurenborg", vibe: "Art nouveau, bohemien, kleurrijk" },
            eilandje: { name: "'t Eilandje", vibe: "Haven, modern, opkomend" },
            zuidstation: { name: "Zuid", vibe: "Galerieën, design, culinair" }
        },
        places: {
            coffee: [
                { name: "Caffènation", neighborhood: "zuidstation", type: "☕ Koffie", address: "Hopland 46", lat: 51.2140, lng: 4.4062, story: "Antwerpen's koffie-pionier. Ze roastten al specialty coffee toen de rest van België nog oploskoffie dronk. De espresso is kort, sterk, en verandert je ochtend.", budget: "low", energy: "balanced" },
                { name: "Normo", neighborhood: "eilandje", type: "☕ Koffie", address: "Minderbroedersrui 30", lat: 51.2224, lng: 4.4042, story: "Koffie en vinyl. Letterlijk — er staat een platenwinkel naast de bar. Bestel een V60, blader door de jazz-sectie, en vergeet dat je een toerist bent.", budget: "low", energy: "chill" }
            ],
            character: [
                { name: "Cogels-Osylei wandeling", neighborhood: "zurenborg", type: "🎭 Karakter", address: "Cogels-Osylei", lat: 51.2018, lng: 4.4340, story: "De mooiste straat van België die niemand kent. Art nouveau gevels in elke kleur, elk een meesterwerk. Loop langzaam, kijk omhoog, en realiseer je dat schoonheid soms gewoon in een woonwijk woont.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "M HKA", neighborhood: "zuidstation", type: "🎨 Cultuur Wildcard", address: "Leuvenstraat 32", lat: 51.2111, lng: 4.3953, story: "Museum voor Hedendaagse Kunst. Klein maar confronterend. De tentoonstellingen zijn nooit veilig — en dat is precies waarom je hier moet zijn.", budget: "mid", energy: "balanced" }
            ],
            walks: [
                { name: "Scheldekaaien bij schemering", neighborhood: "eilandje", type: "🌙 Avondwandeling", address: "Scheldekaaien", lat: 51.2200, lng: 4.3940, story: "De vernieuwde kaai langs de Schelde. Bij schemering zie je de stad in een ander licht: de kathedraal als silhouet, het water dat glinsters, en een rust die je niet verwacht van een havenstad.", budget: "low", energy: "chill" }
            ],
            dinner: [
                { name: "Het Gerecht", neighborhood: "zuidstation", type: "🍽️ Locals-only Diner", address: "Amerikalei 20", lat: 51.2082, lng: 4.3990, story: "Voormalige rechtbank, nu restaurant. De ironie is niet verloren: je wordt hier 'veroordeeld' tot genieten. Belgische keuken met flair, in een zaal met meer karakter dan de meeste Michelin-zaken.", budget: "high", energy: "balanced" }
            ]
        }
    },
    lisbon: {
        name: "Lissabon",
        center: { lat: 38.7223, lng: -9.1393 },
        neighborhoods: {
            alfama: { name: "Alfama", vibe: "Oud, fado, labyrint" },
            lxfactory: { name: "LX Factory / Alcântara", vibe: "Creatief, industrieel, trendy" },
            mouraria: { name: "Mouraria", vibe: "Multicultureel, authentiek, rauw" },
            principe: { name: "Príncipe Real", vibe: "Chic, groen, relaxed" }
        },
        places: {
            coffee: [
                { name: "Copenhagen Coffee Lab", neighborhood: "principe", type: "☕ Koffie", address: "Rua Nova da Piedade 10", lat: 38.7106, lng: -9.1518, story: "Scandinavische koffie in een Portugees paleis. De tegels op de muur zijn origineel azulejo, de melk is oat, en de contradictie is prachtig. Ga naar het terras achter — dat kent niemand.", budget: "mid", energy: "chill" },
                { name: "Fabrica Coffee Roasters", neighborhood: "mouraria", type: "☕ Koffie", address: "Rua das Portas de Santo Antão 136", lat: 38.7166, lng: -9.1397, story: "Verstopt in een steegje dat je drie keer zou missen. Binnen ruikt het naar vers gebrande bonen en hoop. De eigenaar vluchtte uit een corporate leven en opende dit. Je proeft de vrijheid.", budget: "low", energy: "balanced" }
            ],
            character: [
                { name: "Feira da Ladra (dinsdag/zaterdag)", neighborhood: "alfama", type: "🎭 Karakter", address: "Campo de Santa Clara", lat: 38.7150, lng: -9.1240, story: "Rommelmarkt met ziel. Tussen de troep vind je azulejo-tegels, vintage fado-platen, en verhalen van verkopers die hier al 30 jaar staan. Het is chaos, maar de mooie soort.", budget: "low", energy: "explorer" },
                { name: "Miradouro da Graça (niet Senhora do Monte)", neighborhood: "alfama", type: "🎭 Karakter", address: "Largo da Graça", lat: 38.7172, lng: -9.1297, story: "Elke blog noemt Senhora do Monte. Ga in plaats daarvan naar Graça: hetzelfde uitzicht, een tiende van de toeristen, en een kiosk die ginjinha schenkt voor €1. Proost op het uitzicht.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "MAAT", neighborhood: "lxfactory", type: "🎨 Cultuur Wildcard", address: "Av. Brasília", lat: 38.6959, lng: -9.1945, story: "Museum aan de Taag dat eruitziet als een golf die land raakt. De tentoonstellingen wisselen, maar het dak is altijd open: loop eroverheen en kijk uit over de rivier. Architectuur als kunst.", budget: "mid", energy: "balanced" }
            ],
            walks: [
                { name: "Alfama verdwaal-sessie bij schemering", neighborhood: "alfama", type: "🌙 Avondwandeling", address: "Start bij Castelo de São Jorge", lat: 38.7139, lng: -9.1335, story: "Geen Google Maps. Begin bij het kasteel en loop bergafwaarts. Elke steeg is een verrassing: fado uit een open raam, katten op trappen, wasgoed als vlaggen. Je verdwaalt. Dat is het punt.", budget: "low", energy: "balanced" }
            ],
            dinner: [
                { name: "Taberna da Rua das Flores", neighborhood: "mouraria", type: "🍽️ Locals-only Diner", address: "Rua das Flores 103", lat: 38.7100, lng: -9.1436, story: "Geen reserveringen, geen menu, geen keuze. Chef André kiest voor je. Kleine gerechten die de Portugese keuken deconstrueren en weer opbouwen. De rij op straat is je garantie.", budget: "mid", energy: "explorer" },
                { name: "Tasca do Chico", neighborhood: "alfama", type: "🍽️ Locals-only Diner", address: "Rua do Diário de Notícias 39", lat: 38.7118, lng: -9.1440, story: "Fado + eten + te veel wijn in een ruimte zo klein dat je elleboog in het bord van je buurman belandt. Als de zanger begint, stopt alles. Letterlijk alles. Dit is waarom je naar Lissabon kwam.", budget: "mid", energy: "balanced" }
            ]
        }
    }
};

// ============================================
// 90-MINUTE DRIFT — Challenge Pool System
// ============================================

const DRIFT_POOL = {
    // PHASE 1: Opening — hoe begin je met lopen
    opening: [
        {
            title: "De Eerste Afslag",
            duration: 20,
            icon: "🚶",
            phase: "opening",
            instruction: "Loop 20 minuten in een willekeurige richting.",
            details: "Geen Google Maps. Kies een richting — links, rechts, of gewoon rechtdoor. Loop tot je iets ziet dat je aandacht trekt. Het kan een gevel zijn, een geur, een geluid. Volg je instinct, niet je telefoon.",
            prompt: "Wat is het eerste dat opvalt als je stopt met navigeren en begint met kijken?"
        },
        {
            title: "Volg het Geluid",
            duration: 20,
            icon: "👂",
            phase: "opening",
            instruction: "Sluit je ogen 10 seconden. Loop richting het interessantste geluid.",
            details: "Welk geluid trekt je? Muziek? Water? Stemmen? Verkeer? Loop die kant op zonder na te denken. Laat je oren beslissen, niet je hoofd.",
            prompt: "Welk geluid leidde je hier? Was het wat je verwachtte?"
        },
        {
            title: "De Kleurenroute",
            duration: 15,
            icon: "🎨",
            phase: "opening",
            instruction: "Kies een kleur. Volg die kleur door de stad.",
            details: "Rood, blauw, geel — kies er een. Elke keer dat je die kleur ziet op een gevel, auto, bord, of bloem: loop die kant op. De stad wordt een schilderij dat jij interpreteert.",
            prompt: "Welke kleur koos je? Waar bracht die je?"
        },
        {
            title: "De Schaduwkant",
            duration: 20,
            icon: "🌓",
            phase: "opening",
            instruction: "Loop alleen aan de schaduwkant van de straat.",
            details: "De zon bepaalt je route. Blijf in de schaduw. Dit dwingt je om straten te kiezen die je normaal zou missen. Schaduw trekt je naar steegjes, overdekte passages, binnenhoven.",
            prompt: "Waar heeft de schaduw je gebracht?"
        },
        {
            title: "100 Stappen",
            duration: 15,
            icon: "👣",
            phase: "opening",
            instruction: "Tel 100 stappen. Stop. Kijk om je heen. Herhaal 3 keer.",
            details: "Na elke 100 stappen stop je 30 seconden. Kijk naar links, naar rechts, omhoog. Wat zie je? Na drie sets van 100 stappen: je bent ergens. Dat is je startpunt.",
            prompt: "Beschrijf de drie plekken waar je stopte. Welke was het meest verrassend?"
        },
        {
            title: "De Omweg",
            duration: 20,
            icon: "🔄",
            phase: "opening",
            instruction: "Loop naar het verste punt dat je kunt zien. Neem de langst mogelijke route ernaartoe.",
            details: "Kijk in de verte. Zie je een toren? Een brug? Een heuvel? Loop ernaartoe, maar neem elke zijstraat die je kunt. Het doel is niet aankomen, het doel is de omweg.",
            prompt: "Ben je aangekomen? Maakt het uit?"
        }
    ],

    // PHASE 2: Settle — ergens gaan zitten, observeren
    settle: [
        {
            title: "De Plek",
            duration: 15,
            icon: "📍",
            phase: "settle",
            instruction: "Ga zitten bij de eerste plek waar locals zitten.",
            details: "Geen reviews checken. Geen sterren tellen. Kijk gewoon waar de mensen zitten die er uitzien alsof ze hier wonen. Dat is je plek. Ga zitten. Adem in.",
            prompt: "Beschrijf deze plek in drie woorden."
        },
        {
            title: "Het Bankje",
            duration: 15,
            icon: "🪑",
            phase: "settle",
            instruction: "Zoek het meest interessante bankje of zitplek in de buurt.",
            details: "Niet het comfortabelste. Het meest interessante. Misschien bij een kruispunt waar vijf straten samenkomen. Misschien bij een verlaten plein. Misschien op een muurtje. Ga 15 minuten zitten en doe niets.",
            prompt: "Wat zie je vanaf deze plek dat je nergens anders zou zien?"
        },
        {
            title: "De Ingang",
            duration: 15,
            icon: "🚪",
            phase: "settle",
            instruction: "Zoek een café, bar of zaak met de meest uitnodigende ingang. Ga naar binnen.",
            details: "Het gaat niet om het bordje of de naam. Het gaat om de ingang. Is de deur open? Staat er een plant? Hangt er een handgeschreven bordje? Als de ingang je aantrekt, is de plek het waard.",
            prompt: "Wat trok je aan bij de ingang? Klopte je gevoel?"
        },
        {
            title: "Het Pleintje",
            duration: 15,
            icon: "🏛️",
            phase: "settle",
            instruction: "Zoek het kleinste plein in de buurt en ga in het midden staan.",
            details: "Niet het grote stadsplein. Het kleine, vergeten pleintje waar misschien maar drie gebouwen omheen staan. Ga in het midden staan, draai 360 graden, en kies dan je zitplek.",
            prompt: "Hoeveel mensen zie je? Wat doen ze?"
        },
        {
            title: "De Trappen",
            duration: 15,
            icon: "🪜",
            phase: "settle",
            instruction: "Zoek een trap, stoep, of verhoging. Ga zitten en kijk naar het straatleven.",
            details: "Overal in een stad zijn verhoogde plekken waar je het leven van bovenaf kunt bekijken. Een kerktrap, een brug, een helling. Neem het perspectief van een regisseur die naar zijn scène kijkt.",
            prompt: "Welk verhaal speelt zich af onder je?"
        }
    ],

    // PHASE 3: Interact — iets doen, ergens mee bezig zijn
    interact: [
        {
            title: "Het Onbekende",
            duration: 15,
            icon: "🍽️",
            phase: "interact",
            instruction: "Bestel iets dat je niet kent.",
            details: "Wijs naar iets op het menu dat je niet herkent. Of vraag: 'Wat bestellen locals hier?' Wees niet voorzichtig. Het ergste dat kan gebeuren is dat je iets nieuws ontdekt.",
            prompt: "Wat heb je besteld? Hoe smaakt het onbekende?"
        },
        {
            title: "De Foto Die Je Niet Neemt",
            duration: 10,
            icon: "📸",
            phase: "interact",
            instruction: "Zoek het mooiste beeld dat je ziet. Beschrijf het in woorden.",
            details: "Je ogen zijn een betere camera dan je telefoon. Wat zou je foto laten zien? Beschrijf licht, kleur, compositie, gevoel. Dit beeld bestaat straks alleen nog in jouw geheugen. Dat maakt het bijzonder.",
            prompt: "Beschrijf het beeld dat je niet gefotografeerd hebt."
        },
        {
            title: "De Winkel",
            duration: 15,
            icon: "🏪",
            phase: "interact",
            instruction: "Ga de eerste niet-keten winkel binnen die je ziet.",
            details: "Geen H&M, geen Starbucks, geen keten. De eigenaar staat waarschijnlijk achter de toonbank. Kijk rond. Raak iets aan. Vraag naar het verhaal achter een product.",
            prompt: "Wat verkoopt deze winkel en wat zegt dat over deze buurt?"
        },
        {
            title: "Het Briefje",
            duration: 10,
            icon: "📝",
            phase: "interact",
            instruction: "Schrijf iets positiefs op een briefje en laat het ergens achter.",
            details: "In een boek in een winkel. Op een tafel in een café. Onder een steen op een bankje. Iets als 'Je bent op de goede plek' of 'Deze stad houdt van je'. Klein gebaar, groot effect.",
            prompt: "Wat heb je geschreven en waar heb je het achtergelaten?"
        },
        {
            title: "De Kaart",
            duration: 15,
            icon: "🗺️",
            phase: "interact",
            instruction: "Teken een kaart van deze buurt uit je hoofd. Zonder telefoon.",
            details: "Op een servet, in je notitieboek, of in deze app. Teken de straten die je gelopen hebt. Waar was die koffieplek? Dat plein? De kaart hoeft niet te kloppen — het gaat om wat je onthouden hebt.",
            prompt: "Wat ontbreekt er op je kaart? Wat was groter dan je dacht?"
        },
        {
            title: "De Verzamelaar",
            duration: 15,
            icon: "🍂",
            phase: "interact",
            instruction: "Verzamel 5 kleine dingen van de grond die je mooi vindt.",
            details: "Een blad, een steen, een bonnetje, een lucifer, een kapotte tegel. Geen waarde, wel betekenis. Leg ze voor je op tafel en maak er een stilleven van.",
            prompt: "Wat heb je gevonden? Welk object heeft het meeste verhaal?"
        },
        {
            title: "De Taal",
            duration: 10,
            icon: "🗣️",
            phase: "interact",
            instruction: "Leer één woord in de lokale taal van iemand op straat.",
            details: "Wijs naar iets en vraag: 'Hoe heet dit?' Of vraag: 'Hoe zeg je dankjewel hier?' Taal is de snelste weg naar een cultuur. Eén woord is genoeg.",
            prompt: "Welk woord heb je geleerd? Van wie?"
        }
    ],

    // PHASE 4: Connect — menselijk contact
    connect: [
        {
            title: "Het Gesprek",
            duration: 10,
            icon: "💬",
            phase: "connect",
            instruction: "Praat met iemand die je niet kent.",
            details: "Het hoeft geen diep gesprek te zijn. 'Is dit een goede plek?' werkt. 'Wat is jouw favoriete plek in deze buurt?' werkt beter. Mensen willen praten. Geef ze een reden.",
            prompt: "Wat heb je geleerd van een vreemde?"
        },
        {
            title: "De Vraag",
            duration: 10,
            icon: "❓",
            phase: "connect",
            instruction: "Vraag iemand: 'Wat is jouw geheim van deze buurt?'",
            details: "Iedereen heeft een plek die ze koesteren. Een bakker, een uitzichtpunt, een bankje. Vraag ernaar. De antwoorden zijn altijd verrassender dan wat je op Google vindt.",
            prompt: "Welk geheim werd er met je gedeeld?"
        },
        {
            title: "Het Compliment",
            duration: 10,
            icon: "✨",
            phase: "connect",
            instruction: "Geef drie vreemden een oprecht compliment.",
            details: "Over hun jas, hun hond, hun tuin, hun etalage. Niet geforceerd, niet overdreven. Gewoon iets dat je opvalt. Kijk wat er gebeurt als je vriendelijkheid zaait zonder er iets voor terug te willen.",
            prompt: "Welk compliment gaf de mooiste reactie?"
        },
        {
            title: "De Aanbeveling",
            duration: 10,
            icon: "🍴",
            phase: "connect",
            instruction: "Vraag drie verschillende mensen: 'Waar zou je hier eten vanavond?'",
            details: "Niet aan toeristen. Aan de vrouw achter de kassa, de man die zijn hond uitlaat, de barista. Drie verschillende antwoorden = drie verschillende perspectieven op dezelfde plek.",
            prompt: "Wat waren de drie aanbevelingen? Ga je ergens naartoe?"
        },
        {
            title: "De Luisteraar",
            duration: 15,
            icon: "👂",
            phase: "connect",
            instruction: "Ga ergens zitten en luister 10 minuten naar gesprekken om je heen.",
            details: "Niet afluisteren — absorberen. Welke talen hoor je? Waarover praten mensen? Lachen ze? Zijn ze serieus? De soundtrack van een plek vertelt meer dan elk reisgids-artikel.",
            prompt: "Welk flard van een gesprek blijft hangen?"
        }
    ],

    // PHASE 5: Closing — afsluiten, reflecteren
    closing: [
        {
            title: "De Laatste Loop",
            duration: 15,
            icon: "🌅",
            phase: "closing",
            instruction: "Loop terug via een andere route.",
            details: "Neem bewust een andere weg terug. Kijk wat je gemist hebt. De stad laat altijd iets achter voor de tweede keer kijken. Neem je tijd. Dit is geen race.",
            prompt: "Wat zie je nu dat je eerder gemist had?"
        },
        {
            title: "De Brief",
            duration: 10,
            icon: "✉️",
            phase: "closing",
            instruction: "Schrijf een korte brief aan deze stad. Drie zinnen.",
            details: "Begin met 'Beste...' en schrijf alsof de stad kan lezen. Wat zou je zeggen? Wat heb je gezien dat je niet verwachtte? Wat neem je mee?",
            prompt: "Wat heb je de stad geschreven?"
        },
        {
            title: "De Terugblik",
            duration: 10,
            icon: "🔮",
            phase: "closing",
            instruction: "Sta stil op de plek waar je nu bent. Sluit je ogen. Replay de drift in je hoofd.",
            details: "Waar begon je? Welke bocht nam je? Welke geur herinner je? Welk gezicht? Probeer de hele drift als een film in je hoofd af te spelen. Wat is de scène die het meest blijft hangen?",
            prompt: "Welk moment van vandaag vergeet je niet?"
        },
        {
            title: "Het Cadeau",
            duration: 15,
            icon: "🎁",
            phase: "closing",
            instruction: "Koop iets kleins als herinnering. Max €5.",
            details: "Geen souvenir-winkel. Iets echts. Een ansichtkaart, een broodje van die bakker, een tweedehands boek. Iets dat over een jaar nog het gevoel terugbrengt. De prijs doet er niet toe, het verhaal wel.",
            prompt: "Wat heb je gekocht? Waarom juist dit?"
        },
        {
            title: "De Stilte",
            duration: 10,
            icon: "🤫",
            phase: "closing",
            instruction: "Zoek de stilste plek in de buurt. Zit daar 5 minuten zonder iets te doen.",
            details: "Geen telefoon. Geen notities. Geen denken over wat je nog moet. Gewoon zitten. Ademen. De stad voelen zonder er iets van te willen. Dit is hoe je een plek echt verlaat.",
            prompt: "Hoe voelt stilte in deze stad?"
        }
    ]
};

// Wildcard challenges — worden random tussendoor geïnjecteerd
const DRIFT_WILDCARDS = [
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Tel het aantal rode deuren dat je in 5 minuten ziet.", details: "Rood is de kleur van aandacht. Hoeveel rode deuren zijn er in deze buurt? Je zou verbaasd zijn.", prompt: "Hoeveel rode deuren? Welke was de mooiste?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Zoek het oudste ding in je zicht.", details: "Een steen, een boom, een gevel, een putdeksel. Wat is het oudste object dat je kunt vinden? Raak het aan.", prompt: "Wat was het oudste ding en hoe oud denk je dat het is?" },
    { icon: "🎲", phase: "wildcard", duration: 3, title: "Wildcard", instruction: "Kijk omhoog. 60 seconden lang. Alleen omhoog.", details: "We kijken nooit omhoog. Daklijnen, schoorstenen, lucht, vogels, kabels, balkons. Er is een hele wereld boven ooghoogte.", prompt: "Wat heb je boven je gezien dat je nog nooit eerder opviel?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Zoek iets dat niet in deze buurt thuishoort.", details: "Een palmboom in Keulen? Een Japans restaurant in een Vlaamse straat? Een neonbord bij een gotische kerk? Elke buurt heeft anachronismen.", prompt: "Wat was het meest misplaatste ding dat je vond?" },
    { icon: "🎲", phase: "wildcard", duration: 3, title: "Wildcard", instruction: "Ruik. Diep inademen. Wat ruik je?", details: "Brood? Uitlaatgas? Regen? Koffie? Bloemen? Riool? De geur van een plek is het meest onderschatte zintuig. Het gaat direct naar je geheugen.", prompt: "Beschrijf de geur van deze plek." },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Volg de eerstvolgende persoon met een hond. 3 minuten.", details: "Hondeneigenaren kennen hun buurt beter dan wie dan ook. Ze lopen routes die wij nooit zouden kiezen. Volg op respectvolle afstand.", prompt: "Waar bracht de hond je?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Zoek street art. Niet een muurschildering — iets kleins.", details: "Een sticker, een tag, een klein figuurtje op een lantaarnpaal. De stad praat in fluistertoon als je goed kijkt.", prompt: "Wat heb je gevonden? Wat probeert het te zeggen?" },
    { icon: "🎲", phase: "wildcard", duration: 3, title: "Wildcard", instruction: "Beschrijf het weer in één emotie.", details: "Niet 'bewolkt' of '18 graden'. Hoe voelt het weer? Melancholisch? Energiek? Troostend? Onverschillig?", prompt: "Welke emotie is het weer vandaag?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Zoek een deur die open staat. Kijk naar binnen (loop niet zomaar naar binnen).", details: "Open deuren zijn uitnodigingen. Wat zie je? Een binnenplaats? Een werkplaats? Een tuin? Soms is gluren de mooiste vorm van ontdekken.", prompt: "Wat lag er achter de open deur?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Tel hoeveel verschillende talen je hoort in 3 minuten.", details: "Sta stil op een druk punt. Sluit je ogen en tel. Elke taal is een leven dat hier is beland. Hoe internationaler, hoe rijker de plek.", prompt: "Hoeveel talen telde je? Welke herkende je niet?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Zoek de smalste straat of steeg in de buurt.", details: "Hoe smaller de straat, hoe meer geheimen. Dwarssteegjes, passages, poortjes — dit zijn de aderen van een stad die toeristen nooit vinden.", prompt: "Hoe smal was de steeg? Wat vond je erin?" },
    { icon: "🎲", phase: "wildcard", duration: 3, title: "Wildcard", instruction: "Zoek een plek waar natuur de stad terugverovert.", details: "Onkruid door een stoeptegel. Mos op een muur. Een boom die een hek omhelst. De natuur geeft nooit op.", prompt: "Waar vecht de natuur terug?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Maak oogcontact met 5 vreemden en glimlach.", details: "Geen woorden. Gewoon kijken en glimlachen. Tel hoeveel mensen terug glimlachen. Dit is de vriendelijkheidsindex van een stad.", prompt: "Hoeveel glimlachten er terug?" },
    { icon: "🎲", phase: "wildcard", duration: 5, title: "Wildcard", instruction: "Loop 2 minuten met je ogen half dicht. Wat hoor en ruik je?", details: "Niet helemaal dicht — dat is gevaarlijk. Maar half dicht, zodat alles wazig wordt. Je andere zintuigen nemen het over. Welke geluiden en geuren vallen op?", prompt: "Wat ervaar je als je ogen minder doen?" }
];

// Richtingssuggesties voor loop-fasen
const DRIFT_DIRECTIONS = [
    "Loop naar het noorden tot je een boom ziet die ouder is dan jij.",
    "Volg het geluid van water.",
    "Sla links af bij elke kruising tot je verdwaald bent.",
    "Loop richting het hoogste gebouw dat je ziet.",
    "Volg de eerste kat die je tegenkomt.",
    "Loop naar de plek waar de meeste fietsen staan.",
    "Ga de richting op waar de zon op je gezicht schijnt.",
    "Volg de smalste straat die je kunt vinden.",
    "Loop tot je een kleur ziet die je opvalt. Stop daar.",
    "Ga de kant op waar je muziek hoort.",
    "Loop richting de dichtstbijzijnde brug en steek over.",
    "Volg de tram- of busroute zonder in te stappen.",
    "Kies de straat met de mooiste bomen.",
    "Loop bergop. Altijd bergop.",
    "Volg de geur van vers brood.",
    "Ga de kant op waar het minste verkeer is.",
    "Loop tot je een fontein of waterpartij vindt.",
    "Volg de straat met de meeste fietsen.",
    "Kies steeds de straat met de kleinste huisnummers.",
    "Loop naar de dichtstbijzijnde kerk of toren.",
    "Ga de richting op waar je de meeste vogels hoort.",
    "Volg de eerste persoon die er uitziet alsof die ergens naartoe gaat.",
    "Loop tot je iets ziet dat je doet glimlachen.",
    "Kies de straat die het meest op een dorp lijkt.",
    "Loop naar de plek waar je het meeste groen ziet."
];

// ============================================
// "IK HEB ZIN IN..." — Craving → Overpass Tags
// ============================================

const CRAVING_MAP = {
    'koffie':    { tags: [['amenity','cafe']], label: 'Koffieplekken', icon: '☕' },
    'coffee':    { tags: [['amenity','cafe']], label: 'Koffieplekken', icon: '☕' },
    'espresso':  { tags: [['amenity','cafe']], label: 'Koffieplekken', icon: '☕' },
    'cappuccino':{ tags: [['amenity','cafe']], label: 'Koffieplekken', icon: '☕' },
    'thee':      { tags: [['amenity','cafe']], label: 'Theeplekken', icon: '🍵' },
    'tea':       { tags: [['amenity','cafe']], label: 'Theeplekken', icon: '🍵' },
    'bier':      { tags: [['amenity','pub'],['amenity','bar'],['amenity','biergarten']], label: 'Bierplekken', icon: '🍺' },
    'beer':      { tags: [['amenity','pub'],['amenity','bar']], label: 'Bierplekken', icon: '🍺' },
    'cocktail':  { tags: [['amenity','bar']], label: 'Cocktailbars', icon: '🍸' },
    'cocktails': { tags: [['amenity','bar']], label: 'Cocktailbars', icon: '🍸' },
    'wijn':      { tags: [['amenity','bar'],['shop','wine']], label: 'Wijnplekken', icon: '🍷' },
    'wine':      { tags: [['amenity','bar'],['shop','wine']], label: 'Wijnplekken', icon: '🍷' },
    'taart':     { tags: [['amenity','cafe'],['shop','pastry'],['shop','confectionery']], label: 'Taart & gebak', icon: '🍰' },
    'gebak':     { tags: [['amenity','cafe'],['shop','pastry']], label: 'Taart & gebak', icon: '🍰' },
    'cake':      { tags: [['amenity','cafe'],['shop','pastry']], label: 'Taart & gebak', icon: '🍰' },
    'ijs':       { tags: [['amenity','ice_cream'],['shop','ice_cream'],['cuisine','ice_cream']], label: 'IJsjes', icon: '🍦' },
    'gelato':    { tags: [['amenity','ice_cream'],['cuisine','ice_cream']], label: 'IJsjes', icon: '🍦' },
    'eten':      { tags: [['amenity','restaurant']], label: 'Restaurants', icon: '🍽️' },
    'food':      { tags: [['amenity','restaurant']], label: 'Restaurants', icon: '🍽️' },
    'restaurant':{ tags: [['amenity','restaurant']], label: 'Restaurants', icon: '🍽️' },
    'pizza':     { tags: [['amenity','restaurant'],['cuisine','pizza']], label: 'Pizza', icon: '🍕' },
    'sushi':     { tags: [['amenity','restaurant'],['cuisine','sushi']], label: 'Sushi', icon: '🍣' },
    'ramen':     { tags: [['amenity','restaurant'],['cuisine','ramen']], label: 'Ramen', icon: '🍜' },
    'burger':    { tags: [['amenity','restaurant'],['amenity','fast_food']], label: 'Burgers', icon: '🍔' },
    'brood':     { tags: [['shop','bakery']], label: 'Bakkerijen', icon: '🥖' },
    'bakker':    { tags: [['shop','bakery']], label: 'Bakkerijen', icon: '🥖' },
    'ontbijt':   { tags: [['amenity','cafe'],['amenity','restaurant']], label: 'Ontbijtplekken', icon: '🥐' },
    'brunch':    { tags: [['amenity','cafe'],['amenity','restaurant']], label: 'Brunchplekken', icon: '🥐' },
    'lunch':     { tags: [['amenity','restaurant'],['amenity','cafe']], label: 'Lunchplekken', icon: '🥗' },
    'boeken':    { tags: [['shop','books']], label: 'Boekenwinkels', icon: '📚' },
    'books':     { tags: [['shop','books']], label: 'Boekenwinkels', icon: '📚' },
    'vinyl':     { tags: [['shop','music']], label: 'Platenwinkels', icon: '🎵' },
    'platen':    { tags: [['shop','music']], label: 'Platenwinkels', icon: '🎵' },
    'park':      { tags: [['leisure','park'],['leisure','garden']], label: 'Parken', icon: '🌳' },
    'museum':    { tags: [['tourism','museum']], label: 'Musea', icon: '🏛️' },
    'kunst':     { tags: [['tourism','museum'],['tourism','gallery']], label: 'Kunst & galerie', icon: '🎨' },
    'galerie':   { tags: [['tourism','gallery']], label: 'Galerieën', icon: '🎨' },
    'markt':     { tags: [['amenity','marketplace'],['shop','supermarket']], label: 'Markten', icon: '🧺' },
    'falafel':   { tags: [['amenity','restaurant'],['amenity','fast_food']], label: 'Falafel', icon: '🧆' },
    'kebab':     { tags: [['amenity','restaurant'],['amenity','fast_food']], label: 'Kebab', icon: '🥙' },
    'doner':     { tags: [['amenity','restaurant'],['amenity','fast_food']], label: 'Döner', icon: '🥙' },
};

// ============================================
// TASTE PROFILE — Erik's smaak scoring
// ============================================

const TASTE_PROFILE = {
    vibeKeywords: [
        'rauw', 'eerlijk', 'creatief', 'kunstenaars', 'vintage',
        'vinyl', 'underground', 'onopvallend', 'verstopt', 'locals',
        'geen toeristen', 'klein', 'onbekend', 'authentiek', 'puur',
        'industrieel', 'bohemien', 'alternatief', 'atelier', 'galerie',
        'experimenteel', 'handgeschreven', 'tweedehands', 'graffiti',
        'street art', 'fado', 'jazz', 'live muziek', 'independent',
        'single-origin', 'specialty', 'vakmanschap', 'ambachtelijk',
        'persoonlijk', 'eigenaar', 'familie', 'generaties', 'traditie',
        'geheim', 'verborgen', 'intiem', 'parel', 'chaos',
        'vrijheid', 'transformeert', 'ritueel', 'ziel'
    ],
    preferredNeighborhoods: {
        cologne: ['ehrenfeld', 'belgisches', 'suedstadt'],
        amsterdam: ['jordaan', 'noord', 'oost'],
        antwerp: ['zurenborg', 'eilandje'],
        lisbon: ['alfama', 'mouraria', 'lxfactory']
    },
    energyWeights: { chill: 1.2, balanced: 1.0, explorer: 0.8 },
    budgetWeights: { low: 1.3, mid: 1.0, high: 0.6 },
    typeWeights: {
        'character': 1.4,
        'cultural': 1.3,
        'coffee': 1.1,
        'dinner': 1.0,
        'walks': 0.9
    }
};
