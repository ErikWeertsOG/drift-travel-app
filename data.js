// ============================================
// DRIFT APP — Location Database
// ============================================

const CITIES = {
    cologne: {
        name: "Keulen",
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
                    story: "Een micro-rösterij waar de eigenaar elke boon persoonlijk selecteert. Ga vroeg — de locals zitten hier al om 8u met hun laptop en een flat white. De geur van vers gebrande bonen trekt je naar binnen voordat je het bordje ziet.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Van Dyck Rosterei",
                    neighborhood: "ehrenfeld",
                    type: "☕ Koffie",
                    address: "Körnerstraße",
                    story: "Third-wave coffee in een voormalige industriehal. Hier kom je niet voor de latte art maar voor het gesprek met de barista over single-origin uit Ethiopië. De ruimte ademt Ehrenfeld: rauw, eerlijk, zonder pretentie.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Café Sehnsucht",
                    neighborhood: "suedstadt",
                    type: "☕ Koffie",
                    address: "Bonner Straße",
                    story: "Sehnsucht — verlangen naar iets moois. De naam zegt alles. Klein café met tweedehands meubels, verse taart, en een eigenares die je naam onthoudt na twee bezoeken. Het is alsof je bij iemand thuis koffie drinkt.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Schamong Kaffee",
                    neighborhood: "altstadt",
                    type: "☕ Koffie",
                    address: "Kyffhäuserstraße",
                    story: "Sinds 1949 brandt deze familie koffie in Keulen. Geen hipster-vibes, gewoon generaties aan vakmanschap. De filterkoffie hier is een tijdmachine naar hoe koffie bedoeld was.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Bäckerei Zimmermann",
                    neighborhood: "nippes",
                    type: "☕ Koffie",
                    address: "Neusser Straße",
                    story: "Technisch een bakker, maar de koffie is een excuus om hun Sauerteig-brood te proeven. Zaterdag ochtend is het hier vol met Nippes-bewoners die hun weekendbrood ophalen. Ga in de rij staan — het is het waard.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Ernst Kaffeeröster",
                    neighborhood: "suedstadt",
                    type: "☕ Koffie",
                    address: "Bonner Straße",
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
                    story: "Overdag een onopvallend pleintje bij een kerk. Na vijf uur 's middags transformeert het in Keulens onofficiële woonkamer. Mensen zitten op de trappen, delen wijn uit flesjes, en het geluid van gitaren mengt met gesprekken in zes talen.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Atelierhaus Ehrenfeld",
                    neighborhood: "ehrenfeld",
                    type: "🎭 Karakter",
                    address: "Hospeltstraße",
                    story: "Een voormalig fabrieksgebouw waar kunstenaars werken met open deuren. Loop binnen, kijk rond, praat met iemand. Geen entree, geen gids, geen regels. Alleen creatie in haar puurste vorm.",
                    budget: "low",
                    energy: "explorer"
                },
                {
                    name: "Volkstheater Millowitsch",
                    neighborhood: "altstadt",
                    type: "🎭 Karakter",
                    address: "Aachener Straße",
                    story: "Keuls dialect-theater dat al generaties publiek trekt. Je hoeft niet alles te verstaan — de sfeer vertelt het verhaal. Hier lach je mee met een zaal vol mensen die dit als traditie koesteren.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Neptunbad",
                    neighborhood: "ehrenfeld",
                    type: "🎭 Karakter",
                    address: "Neptunplatz",
                    story: "Art deco zwembad uit 1912, getransformeerd tot wellness-tempel. De architectuur alleen is een bezoek waard. Zwem baantjes in een ruimte die je doet vergeten dat je in een stad bent.",
                    budget: "high",
                    energy: "chill"
                },
                {
                    name: "Bücherbüchse Nippes",
                    neighborhood: "nippes",
                    type: "🎭 Karakter",
                    address: "Neusser Straße",
                    story: "Een boekenwinkel waar de eigenaar je boek kiest op basis van je humeur. Zeg wat je voelt, en je krijgt een stapel die je leven verandert. Tenminste, dat beweert ze. En ze heeft vaak gelijk.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Südstadt Flohmarkt (zondag)",
                    neighborhood: "suedstadt",
                    type: "🎭 Karakter",
                    address: "Volksgarten",
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
                    story: "Vergeet de Dom — dit is Keulens echte meesterwerk. De grootste Pop Art collectie buiten de VS, Picasso's die je sprakeloos maken, en een gebouw dat zelf kunst is. Ga op donderdag na 17u voor rust.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Kolumba Museum",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Kolumbastraße",
                    story: "Peter Zumthor bouwde dit museum letterlijk op de ruïnes van een gotische kerk. Licht, stilte, en kunst die je niet uitlegt maar laat voelen. Dit is geen museum — het is meditatie met muren.",
                    budget: "mid",
                    energy: "chill"
                },
                {
                    name: "Underground Cologne Tour",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Various locations",
                    story: "Onder je voeten ligt 2000 jaar geschiedenis. Romeinse riolen, middeleeuwse kelders, WWII-bunkers. Een lokale gids neemt je mee naar wat toeristen nooit zien: de stad onder de stad.",
                    budget: "mid",
                    energy: "explorer"
                },
                {
                    name: "King Georg (live muziek)",
                    neighborhood: "suedstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Sudermanstraße",
                    story: "Geen aankondigingen op Facebook, geen reserveringen. Loop binnen op een doordeweekse avond en er is 50% kans dat er iemand speelt die je nooit hebt gehoord maar nooit zal vergeten.",
                    budget: "low",
                    energy: "explorer"
                },
                {
                    name: "Rautenstrauch-Joest Museum",
                    neighborhood: "altstadt",
                    type: "🎨 Cultuur Wildcard",
                    address: "Cäcilienstraße",
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
                    story: "Loop van de Rheinauhafen richting de Südbrücke als de zon ondergaat. De kranen van de haven worden silhouetten, roeiers glijden over het water, en Keulen voelt even als een mediterrane stad.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Volksgarten avondloop",
                    neighborhood: "suedstadt",
                    type: "🌙 Avondwandeling",
                    address: "Volksgarten",
                    story: "Het park verandert na donker. Studenten met wijn, joggers die hun dag uitlopen, en af en toe een saxofonist bij het meer. De stad stopt hier met druk zijn.",
                    budget: "low",
                    energy: "chill"
                },
                {
                    name: "Mediapark → Ehrenfeld route",
                    neighborhood: "ehrenfeld",
                    type: "🌙 Avondwandeling",
                    address: "Mediapark → Venloer Straße",
                    story: "Van het stille Mediapark loop je geleidelijk de chaos van Ehrenfeld in. Street art verschijnt, kebabzaken gloeien, en je eindigt ergens bij een Späti met een Kölsch in de hand.",
                    budget: "low",
                    energy: "balanced"
                },
                {
                    name: "Aachener Weiher ronde",
                    neighborhood: "belgisches",
                    type: "🌙 Avondwandeling",
                    address: "Aachener Weiher",
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
                    address: "Zülpicher Straße",
                    story: "Schnitzel zo groot als je bord, geserveerd door een team dat je behandelt als familie. Anthony Bourdain at hier. De muren hangen vol met foto's van beroemdheden die hier 'per ongeluk' binnenkwamen. Reserveer niet — wacht gewoon.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Salon Schmitz",
                    neighborhood: "belgisches",
                    type: "🍽️ Locals-only Diner",
                    address: "Aachener Straße",
                    story: "Drie zaken in één: slagerij, bar, restaurant. De Metzgerei (slagerij-kant) serveert 's avonds gerechten die je oma zou goedkeuren, in een setting die je oma niet zou herkennen. Bestelling gaat via krijtbord.",
                    budget: "mid",
                    energy: "balanced"
                },
                {
                    name: "Habibi (laat)",
                    neighborhood: "ehrenfeld",
                    type: "🍽️ Locals-only Diner",
                    address: "Zülpicher Straße",
                    story: "Na middernacht is dit de enige plek die ertoe doet. Falafel die je bijblijft, hummus waar je stil van wordt, en een rij die bewijst dat de beste dingen in het leven wachten waard zijn.",
                    budget: "low",
                    energy: "explorer"
                },
                {
                    name: "Törtchen Törtchen (brunch spot)",
                    neighborhood: "altstadt",
                    type: "🍽️ Locals-only Diner",
                    address: "Apostelnstraße",
                    story: "Voor als 'diner' eigenlijk 'laat ontbijt' betekent. Patisserie-level gebak in een café dat eruitziet als een Wes Anderson-set. De locals noemen het hun 'guilty pleasure'. Ze hebben gelijk aan beide kanten.",
                    budget: "mid",
                    energy: "chill"
                },
                {
                    name: "Ouzeria",
                    neighborhood: "suedstadt",
                    type: "🍽️ Locals-only Diner",
                    address: "Alteburger Straße",
                    story: "Grieks, maar dan zoals Grieken het zelf eten. Geen toeristen-moussaka, wel meze-tafels waar je twee uur voor gaat zitten. De eigenaar schenkt ouzo als je blijft tot na tienen. Blijf tot na tienen.",
                    budget: "mid",
                    energy: "balanced"
                }
            ]
        }
    },
    amsterdam: {
        name: "Amsterdam",
        neighborhoods: {
            jordaan: { name: "Jordaan", vibe: "Gezellig, kunstzinnig, grachten" },
            depijp: { name: "De Pijp", vibe: "Multicultureel, markt, trendy" },
            oost: { name: "Oost", vibe: "Opkomend, divers, groen" },
            noord: { name: "Noord", vibe: "Creatief, rauw, verrassend" }
        },
        places: {
            coffee: [
                { name: "Scandinavian Embassy", neighborhood: "depijp", type: "☕ Koffie", address: "Sarphatipark", story: "Nordic minimalism meets Amsterdamse gezelligheid. De kanelbroodjes zijn het echte kunstwerk hier, niet de latte art. Ga op zaterdag, neem een boek mee, en doe alsof je een local bent.", budget: "mid", energy: "chill" },
                { name: "Lot Sixty One", neighborhood: "jordaan", type: "☕ Koffie", address: "Kinkerstraat", story: "Geen wifi. Geen stopcontacten. Alleen koffie die zo goed is dat je je laptop niet mist. De eigenaren hebben in Melbourne geleerd wat koffie kan zijn.", budget: "low", energy: "balanced" },
                { name: "Back to Black", neighborhood: "jordaan", type: "☕ Koffie", address: "Weteringstraat", story: "Verstopt achter een onopvallende gevel. Binnen is het een parel: verse roast, keramiek van lokale kunstenaars, en een barista die vijf minuten over je pour-over praat als je het toelaat.", budget: "low", energy: "chill" }
            ],
            character: [
                { name: "NDSM Werf", neighborhood: "noord", type: "🎭 Karakter", address: "NDSM-plein", story: "Voormalige scheepswerf, nu een creatieve vrijhaven. Graffiti, ateliers, een strandje, en het gevoel dat alles hier mogelijk is. Neem de pont — de overtocht is al een beleving.", budget: "low", energy: "explorer" },
                { name: "Noordermarkt (zaterdag)", neighborhood: "jordaan", type: "🎭 Karakter", address: "Noordermarkt", story: "Boerenmarkt op zaterdag. Organic kaas, vers brood, bloemen. De Jordanezen doen hier hun weekend-inkopen terwijl ze buurvrouwen begroeten. Dit is niet shoppen, dit is sociologie.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "Foam Fotografiemuseum", neighborhood: "jordaan", type: "🎨 Cultuur Wildcard", address: "Keizersgracht", story: "Klein, intiem, en altijd verrassend. Fotografie die je perspectief verschuift. Het grachtenpand alleen is al de moeite waard.", budget: "mid", energy: "balanced" },
                { name: "EYE Filmmuseum", neighborhood: "noord", type: "🎨 Cultuur Wildcard", address: "IJpromenade", story: "Het gebouw lijkt op een ruimteschip dat op de IJ-oever is geland. Binnen: filmgeschiedenis, experimentele installaties, en het beste terras van Amsterdam.", budget: "mid", energy: "balanced" }
            ],
            walks: [
                { name: "Vondelpark → Jordaan slenteren", neighborhood: "jordaan", type: "🌙 Avondwandeling", address: "Vondelpark → Jordaan", story: "Start bij het Vondelpark als de straatlantaarns aangaan. Loop via de stille grachten van de Jordaan waar het licht op het water danst. Eindig bij een bruin café dat al 100 jaar hetzelfde doet.", budget: "low", energy: "chill" }
            ],
            dinner: [
                { name: "Wilde Zwijnen", neighborhood: "oost", type: "🍽️ Locals-only Diner", address: "Javaplein", story: "Farm-to-table voordat het een buzzword was. Het menu verandert dagelijks, de ingrediënten komen van boeren die de chef bij naam kent. Amsterdam-Oost op z'n best.", budget: "high", energy: "balanced" },
                { name: "Bar Spek", neighborhood: "jordaan", type: "🍽️ Locals-only Diner", address: "Admiraal de Ruyterweg", story: "Geen menu. Je eet wat de chef maakt. Klinkt eng? Dat is het punt. Elke avond een verrassing, altijd spectaculair. Dit is blind vertrouwen in iemands talent.", budget: "mid", energy: "explorer" }
            ]
        }
    },
    antwerp: {
        name: "Antwerpen",
        neighborhoods: {
            zurenborg: { name: "Zurenborg", vibe: "Art nouveau, bohemien, kleurrijk" },
            eilandje: { name: "'t Eilandje", vibe: "Haven, modern, opkomend" },
            zuidstation: { name: "Zuid", vibe: "Galerieën, design, culinair" }
        },
        places: {
            coffee: [
                { name: "Caffènation", neighborhood: "zuidstation", type: "☕ Koffie", address: "Hopland", story: "Antwerpen's koffie-pionier. Ze roastten al specialty coffee toen de rest van België nog oploskoffie dronk. De espresso is kort, sterk, en verandert je ochtend.", budget: "low", energy: "balanced" },
                { name: "Normo", neighborhood: "eilandje", type: "☕ Koffie", address: "Minderbroedersrui", story: "Koffie en vinyl. Letterlijk — er staat een platenwinkel naast de bar. Bestel een V60, blader door de jazz-sectie, en vergeet dat je een toerist bent.", budget: "low", energy: "chill" }
            ],
            character: [
                { name: "Cogels-Osylei wandeling", neighborhood: "zurenborg", type: "🎭 Karakter", address: "Cogels-Osylei", story: "De mooiste straat van België die niemand kent. Art nouveau gevels in elke kleur, elk een meesterwerk. Loop langzaam, kijk omhoog, en realiseer je dat schoonheid soms gewoon in een woonwijk woont.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "M HKA", neighborhood: "zuidstation", type: "🎨 Cultuur Wildcard", address: "Leuvenstraat", story: "Museum voor Hedendaagse Kunst. Klein maar confronterend. De tentoonstellingen zijn nooit veilig — en dat is precies waarom je hier moet zijn.", budget: "mid", energy: "balanced" }
            ],
            walks: [
                { name: "Scheldekaaien bij schemering", neighborhood: "eilandje", type: "🌙 Avondwandeling", address: "Scheldekaaien", story: "De vernieuwde kaai langs de Schelde. Bij schemering zie je de stad in een ander licht: de kathedraal als silhouet, het water dat glinsters, en een rust die je niet verwacht van een havenstad.", budget: "low", energy: "chill" }
            ],
            dinner: [
                { name: "Het Gerecht", neighborhood: "zuidstation", type: "🍽️ Locals-only Diner", address: "Amerikalei", story: "Voormalige rechtbank, nu restaurant. De ironie is niet verloren: je wordt hier 'veroordeeld' tot genieten. Belgische keuken met flair, in een zaal met meer karakter dan de meeste Michelin-zaken.", budget: "high", energy: "balanced" }
            ]
        }
    },
    lisbon: {
        name: "Lissabon",
        neighborhoods: {
            alfama: { name: "Alfama", vibe: "Oud, fado, labyrint" },
            lxfactory: { name: "LX Factory / Alcântara", vibe: "Creatief, industrieel, trendy" },
            mouraria: { name: "Mouraria", vibe: "Multicultureel, authentiek, rauw" },
            principe: { name: "Príncipe Real", vibe: "Chic, groen, relaxed" }
        },
        places: {
            coffee: [
                { name: "Copenhagen Coffee Lab", neighborhood: "principe", type: "☕ Koffie", address: "Rua Nova da Piedade", story: "Scandinavische koffie in een Portugees paleis. De tegels op de muur zijn origineel azulejo, de melk is oat, en de contradictie is prachtig. Ga naar het terras achter — dat kent niemand.", budget: "mid", energy: "chill" },
                { name: "Fabrica Coffee Roasters", neighborhood: "mouraria", type: "☕ Koffie", address: "Rua das Portas de Santo Antão", story: "Verstopt in een steegje dat je drie keer zou missen. Binnen ruikt het naar vers gebrande bonen en hoop. De eigenaar vluchtte uit een corporate leven en opende dit. Je proeft de vrijheid.", budget: "low", energy: "balanced" }
            ],
            character: [
                { name: "Feira da Ladra (dinsdag/zaterdag)", neighborhood: "alfama", type: "🎭 Karakter", address: "Campo de Santa Clara", story: "Rommelmarkt met ziel. Tussen de troep vind je azulejo-tegels, vintage fado-platen, en verhalen van verkopers die hier al 30 jaar staan. Het is chaos, maar de mooie soort.", budget: "low", energy: "explorer" },
                { name: "Miradouro da Graça (niet Senhora do Monte)", neighborhood: "alfama", type: "🎭 Karakter", address: "Graça", story: "Elke blog noemt Senhora do Monte. Ga in plaats daarvan naar Graça: hetzelfde uitzicht, een tiende van de toeristen, en een kiosk die ginjinha schenkt voor €1. Proost op het uitzicht.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "MAAT", neighborhood: "lxfactory", type: "🎨 Cultuur Wildcard", address: "Av. Brasília", story: "Museum aan de Taag dat eruitziet als een golf die land raakt. De tentoonstellingen wisselen, maar het dak is altijd open: loop eroverheen en kijk uit over de rivier. Architectuur als kunst.", budget: "mid", energy: "balanced" }
            ],
            walks: [
                { name: "Alfama verdwaal-sessie bij schemering", neighborhood: "alfama", type: "🌙 Avondwandeling", address: "Start bij Castelo", story: "Geen Google Maps. Begin bij het kasteel en loop bergafwaarts. Elke steeg is een verrassing: fado uit een open raam, katten op trappen, wasgoed als vlaggen. Je verdwaalt. Dat is het punt.", budget: "low", energy: "balanced" }
            ],
            dinner: [
                { name: "Taberna da Rua das Flores", neighborhood: "mouraria", type: "🍽️ Locals-only Diner", address: "Rua das Flores", story: "Geen reserveringen, geen menu, geen keuze. Chef André kiest voor je. Kleine gerechten die de Portugese keuken deconstrueren en weer opbouwen. De rij op straat is je garantie.", budget: "mid", energy: "explorer" },
                { name: "Tasca do Chico", neighborhood: "alfama", type: "🍽️ Locals-only Diner", address: "Rua do Diário de Notícias", story: "Fado + eten + te veel wijn in een ruimte zo klein dat je elleboog in het bord van je buurman belandt. Als de zanger begint, stopt alles. Letterlijk alles. Dit is waarom je naar Lissabon kwam.", budget: "mid", energy: "balanced" }
            ]
        }
    }
};

// ============================================
// 90-MINUTE DRIFT — Steps & Prompts
// ============================================

const DRIFT_STEPS = [
    {
        title: "De Eerste 20 Minuten",
        duration: 20,
        icon: "🚶",
        instruction: "Loop 20 minuten in een willekeurige richting.",
        details: "Geen Google Maps. Kies een richting — links, rechts, of gewoon rechtdoor. Loop tot je iets ziet dat je aandacht trekt. Het kan een gevel zijn, een geur, een geluid. Volg je instinct, niet je telefoon.",
        prompt: "Wat is het eerste dat opvalt als je stopt met navigeren en begint met kijken?"
    },
    {
        title: "De Plek",
        duration: 15,
        icon: "📍",
        instruction: "Ga zitten bij de eerste plek waar locals zitten.",
        details: "Geen reviews checken. Geen sterren tellen. Kijk gewoon waar de mensen zitten die er uitzien alsof ze hier wonen. Dat is je plek. Ga zitten. Adem in.",
        prompt: "Beschrijf deze plek in drie woorden."
    },
    {
        title: "Het Onbekende",
        duration: 15,
        icon: "🍽️",
        instruction: "Bestel iets dat je niet kent.",
        details: "Wijs naar iets op het menu dat je niet herkent. Of vraag: 'Wat bestellen locals hier?' Wees niet voorzichtig. Het ergste dat kan gebeuren is dat je iets nieuws ontdekt.",
        prompt: "Wat heb je besteld? Hoe smaakt het onbekende?"
    },
    {
        title: "Observeer",
        duration: 15,
        icon: "👀",
        instruction: "Schrijf 3 observaties op.",
        details: "Kijk om je heen. Niet door een scherm. Met je eigen ogen. Wat zie je? Wat hoor je? Wat voel je? Schrijf het op. Niet voor Instagram. Voor jezelf.",
        prompt: "Drie dingen die je opvallen op deze plek..."
    },
    {
        title: "Het Gesprek",
        duration: 10,
        icon: "💬",
        instruction: "Praat met iemand die je niet kent.",
        details: "Het hoeft geen diep gesprek te zijn. 'Is dit een goede plek?' werkt. 'Wat is jouw favoriete plek in deze buurt?' werkt beter. Mensen willen praten. Geef ze een reden.",
        prompt: "Wat heb je geleerd van een vreemde?"
    },
    {
        title: "De Laatste Loop",
        duration: 15,
        icon: "🌅",
        instruction: "Loop terug via een andere route.",
        details: "Neem bewust een andere weg terug. Kijk wat je gemist hebt. De stad laat altijd iets achter voor de tweede keer kijken. Neem je tijd. Dit is geen race.",
        prompt: "Wat zie je nu dat je eerder gemist had?"
    }
];

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
    "Ga de kant op waar je muziek hoort."
];
