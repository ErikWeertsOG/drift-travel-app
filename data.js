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
            ],
            clubs: [
                {
                    name: "Gewölbe",
                    neighborhood: "belgisches",
                    type: "🎧 Club",
                    address: "Hans-Böckler-Platz 2",
                    lat: 50.9410, lng: 6.9345,
                    story: "Onder de spoorrails van Bahnhof West, in een bakstenen gewelf uit de 19e eeuw. Martin Orgon-horns aan de muur, betonnen vloer, geen ramen. Dit is Keulen's techno-heiligdom. De deur is streng, de sound is chirurgisch. Telefoons weg, dansen tot het licht komt.",
                    budget: "mid",
                    energy: "explorer"
                },
                {
                    name: "Ursprung Fi",
                    neighborhood: "ehrenfeld",
                    type: "🎧 Club",
                    address: "Widdersdorfer Straße 246",
                    lat: 50.9445, lng: 6.8890,
                    story: "Keulen's eerste techno-club die from scratch is gebouwd, geopend in 2024. Twee verdiepingen plus rooftop. Beneden is een donkere techno-tempel met waanzinnig geluid, boven voelt als Panorama Bar. Verstopt op een industrieterrein in Ehrenfeld — de taxi kent de weg niet, jij wel.",
                    budget: "mid",
                    energy: "explorer"
                },
                {
                    name: "Odonien",
                    neighborhood: "ehrenfeld",
                    type: "🎧 Club",
                    address: "Hornstraße 85",
                    lat: 50.9508, lng: 6.9165,
                    story: "Een openlucht-sculptuurpark dat 's nachts verandert in een techno-speeltuin. Kunstinstallaties tussen de dansende mensen, vuurtonnen in de winter, bomen en metaal in de zomer. Geen gewone club — eerder een festival dat nooit stopt. De line-ups zijn onvoorspelbaar en precies daarom goed.",
                    budget: "mid",
                    energy: "explorer"
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
            noord: { name: "Noord", vibe: "Creatief, rauw, verrassend" },
            oudwest: { name: "Oud-West", vibe: "Foodhallen, levendig, locals" },
            centrum: { name: "Centrum", vibe: "Grachten, historisch, compact" }
        },
        places: {
            coffee: [
                { name: "Scandinavian Embassy", neighborhood: "depijp", type: "☕ Koffie", address: "Sarphatipark 34", lat: 52.3535, lng: 4.8942, story: "Nordic minimalism meets Amsterdamse gezelligheid. De kanelbroodjes zijn het echte kunstwerk hier, niet de latte art. Ga op zaterdag, neem een boek mee, en doe alsof je een local bent.", budget: "mid", energy: "chill" },
                { name: "Lot Sixty One", neighborhood: "jordaan", type: "☕ Koffie", address: "Kinkerstraat 112", lat: 52.3688, lng: 4.8695, story: "Geen wifi. Geen stopcontacten. Alleen koffie die zo goed is dat je je laptop niet mist. De eigenaren hebben in Melbourne geleerd wat koffie kan zijn.", budget: "low", energy: "balanced" },
                { name: "Back to Black", neighborhood: "jordaan", type: "☕ Koffie", address: "Weteringstraat 48", lat: 52.3610, lng: 4.8884, story: "Verstopt achter een onopvallende gevel. Binnen is het een parel: verse roast, keramiek van lokale kunstenaars, en een barista die vijf minuten over je pour-over praat als je het toelaat.", budget: "low", energy: "chill" },
                { name: "White Label Coffee", neighborhood: "oost", type: "☕ Koffie", address: "Jan Evertsenstraat 136", lat: 52.3684, lng: 4.8465, story: "Een rösterij in een voormalige garage. De bonen worden hier gebrand terwijl je wacht. De eigenaren zijn obsessief over hun proces — single-origin, lichte roast, en een brutale eerlijkheid over wat goede koffie is. Geen havermelk-opties hier. Alleen bonen die voor zichzelf spreken.", budget: "low", energy: "balanced" },
                { name: "Bocca Coffee", neighborhood: "centrum", type: "☕ Koffie", address: "Kerkstraat 96", lat: 52.3636, lng: 4.8873, story: "Amsterdam's OG specialty roaster, al bezig sinds voordat third-wave een ding was. De zaak is klein, de espresso is foutloos, en de eigenaar kan je alles vertellen over de boer die zijn bonen verbouwde. Geen fratsen. Vakmanschap.", budget: "low", energy: "balanced" }
            ],
            character: [
                { name: "NDSM Werf", neighborhood: "noord", type: "🎭 Karakter", address: "NDSM-plein 28", lat: 52.4000, lng: 4.8931, story: "Voormalige scheepswerf, nu een creatieve vrijhaven. Graffiti, ateliers, een strandje, en het gevoel dat alles hier mogelijk is. Neem de pont — de overtocht is al een beleving.", budget: "low", energy: "explorer" },
                { name: "Noordermarkt (zaterdag)", neighborhood: "jordaan", type: "🎭 Karakter", address: "Noordermarkt 48", lat: 52.3742, lng: 4.8850, story: "Boerenmarkt op zaterdag. Organic kaas, vers brood, bloemen. De Jordanezen doen hier hun weekend-inkopen terwijl ze buurvrouwen begroeten. Dit is niet shoppen, dit is sociologie.", budget: "low", energy: "balanced" },
                { name: "De Hallen", neighborhood: "oudwest", type: "🎭 Karakter", address: "Hannie Dankbaar Passage 33", lat: 52.3627, lng: 4.8619, story: "Een voormalige tramremise omgebouwd tot cultureel epicentrum. Foodhal, bioscoop, bibliotheek, vintage markt — alles onder één industrieel dak. Geen toeristenval, maar waar Oud-West samenkomt voor een Vietnamees broodje en een ambachtelijk biertje.", budget: "mid", energy: "balanced" },
                { name: "Amsterdam Roest", neighborhood: "oost", type: "🎭 Karakter", address: "Jacob Bontiusplaats 1", lat: 52.3636, lng: 4.9280, story: "Strandbar in een industrieel niemandsland. Zand, vuurkorven, een zeecontainer als bar, en het gevoel dat je ergens bent waar je niet hoort te zijn. Zondagmiddag is het hier vol met creatieven die doen alsof het festival is. Elke dag.", budget: "low", energy: "explorer" },
                { name: "Electric Ladyland", neighborhood: "jordaan", type: "🎭 Karakter", address: "Tweede Leliedwarsstraat 5", lat: 52.3756, lng: 4.8818, story: "Het eerste museum ter wereld gewijd aan fluorescerende kunst. Een kelder vol UV-licht, gloeiende mineralen, en een excentrieke eigenaar die al 30 jaar zijn passie deelt. Bizar, onvergetelijk, en precies het soort plek dat alleen in de Jordaan kan bestaan.", budget: "low", energy: "explorer" }
            ],
            cultural: [
                { name: "Foam Fotografiemuseum", neighborhood: "jordaan", type: "🎨 Cultuur Wildcard", address: "Keizersgracht 609", lat: 52.3594, lng: 4.8942, story: "Klein, intiem, en altijd verrassend. Fotografie die je perspectief verschuift. Het grachtenpand alleen is al de moeite waard.", budget: "mid", energy: "balanced" },
                { name: "EYE Filmmuseum", neighborhood: "noord", type: "🎨 Cultuur Wildcard", address: "IJpromenade 1", lat: 52.3843, lng: 4.9012, story: "Het gebouw lijkt op een ruimteschip dat op de IJ-oever is geland. Binnen: filmgeschiedenis, experimentele installaties, en het beste terras van Amsterdam.", budget: "mid", energy: "balanced" },
                { name: "Tolhuistuin", neighborhood: "noord", type: "🎨 Cultuur Wildcard", address: "IJpromenade 2", lat: 52.3843, lng: 4.9030, story: "Cultuurpodium in een voormalige Shell-kantine. Concerten, debatavonden, festivals, en een tuin waar je op zomerdagen vergeet dat je in een stad van een miljoen mensen zit. Neem de pont, drink een biertje, laat je verrassen door wat er speelt.", budget: "low", energy: "explorer" }
            ],
            walks: [
                { name: "Vondelpark → Jordaan slenteren", neighborhood: "jordaan", type: "🌙 Avondwandeling", address: "Vondelpark → Jordaan", lat: 52.3580, lng: 4.8686, story: "Start bij het Vondelpark als de straatlantaarns aangaan. Loop via de stille grachten van de Jordaan waar het licht op het water danst. Eindig bij een bruin café dat al 100 jaar hetzelfde doet.", budget: "low", energy: "chill" },
                { name: "Pont naar Noord → NDSM loop", neighborhood: "noord", type: "🌙 Avondwandeling", address: "Centraal Station pont → NDSM", lat: 52.3825, lng: 4.8995, story: "Neem de gratis pont achter Centraal Station. De overtocht duurt vijf minuten maar voelt als een andere wereld. Loop langs het IJ richting NDSM, passeer graffitikunst, scheepswerven en illegale strandjes. Amsterdam-Noord is het nieuwe Berlijn — alleen zegt niemand dat hardop.", budget: "low", energy: "explorer" },
                { name: "Plantage → Oosterpark route", neighborhood: "oost", type: "🌙 Avondwandeling", address: "Artis → Tropenmuseum → Oosterpark", lat: 52.3655, lng: 4.9125, story: "Loop van de Plantagebuurt via het Tropenmuseum naar Oosterpark. De route gaat van koloniaal Amsterdam naar het multiculturele hart van Oost. Ga op een bankje zitten bij het Oosterpark. De diversiteit van de stad loopt letterlijk langs je heen.", budget: "low", energy: "balanced" }
            ],
            dinner: [
                { name: "Wilde Zwijnen", neighborhood: "oost", type: "🍽️ Locals-only Diner", address: "Javaplein 23", lat: 52.3614, lng: 4.9412, story: "Farm-to-table voordat het een buzzword was. Het menu verandert dagelijks, de ingrediënten komen van boeren die de chef bij naam kent. Amsterdam-Oost op z'n best.", budget: "high", energy: "balanced" },
                { name: "Bar Spek", neighborhood: "jordaan", type: "🍽️ Locals-only Diner", address: "Admiraal de Ruyterweg 1", lat: 52.3737, lng: 4.8598, story: "Geen menu. Je eet wat de chef maakt. Klinkt eng? Dat is het punt. Elke avond een verrassing, altijd spectaculair. Dit is blind vertrouwen in iemands talent.", budget: "mid", energy: "explorer" },
                { name: "Restaurant Rijsel", neighborhood: "oost", type: "🍽️ Locals-only Diner", address: "Marcusstraat 52b", lat: 52.3545, lng: 4.9170, story: "Frans-Vlaamse keuken in een verbouwde school. Stoofvlees, rotisserie-kip, en friet die je doet vergeten dat je in Amsterdam bent. De rij begint om 17:30. Ga staan. Het is het waard. Elke avond is de zaal vol met mensen die hier wekelijks komen.", budget: "mid", energy: "balanced" },
                { name: "Café Modern", neighborhood: "noord", type: "🍽️ Locals-only Diner", address: "Meidoornweg 2", lat: 52.3960, lng: 4.9220, story: "Buurtkroeg van Amsterdam-Noord die ook fantastisch eten serveert. Seizoensgebonden menu, lokale ingrediënten, en een sfeer die je doet afvragen waarom je ooit in het centrum at. Neem de pont. Je tafel wacht.", budget: "mid", energy: "chill" }
            ],
            clubs: [
                { name: "Shelter", neighborhood: "noord", type: "🎧 Club", address: "Overhoeksplein 3", lat: 52.3845, lng: 4.9010, story: "Onder de A'DAM Toren, bereikbaar via de gratis pont achter Centraal. Funktion-One sound in een betonnen kelder onder de IJ. Telefoons verboden op de dansvloer. De deur is selectief, de sound is meedogenloos. Als je van Berghain-niveau techno houdt maar in Amsterdam bent — dit is het.", budget: "mid", energy: "explorer" },
                { name: "Lofi", neighborhood: "noord", type: "🎧 Club", address: "NDSM-Plein 1", lat: 52.4010, lng: 4.8945, story: "Indoor-outdoor op het NDSM-terrein. De techno hier is diep, hypnotisch, slow-building. Perfect voor lange sessies die van dag naar nacht gaan. De vibe is relaxter dan Shelter maar de muziek is net zo serieus. Als de zon schijnt op het terras terwijl de bass rolt — dat is het moment.", budget: "mid", energy: "balanced" },
                { name: "Radion", neighborhood: "oudwest", type: "🎧 Club", address: "Louwesweg 1", lat: 52.3541, lng: 4.8360, story: "Voormalig tandheelkunde-gebouw in Nieuw-West. De programmering is experimenteler en tripper dan de rest — hier draait het niet alleen om vier-op-de-vloer maar ook om geluidskunst, ambient, en alles wat raar en mooi is. Het awareness-team hier is legendarisch goed.", budget: "mid", energy: "explorer" }
            ]
        }
    },
    antwerp: {
        name: "Antwerpen",
        center: { lat: 51.2194, lng: 4.4025 },
        neighborhoods: {
            zurenborg: { name: "Zurenborg", vibe: "Art nouveau, bohemien, kleurrijk" },
            eilandje: { name: "'t Eilandje", vibe: "Haven, modern, opkomend" },
            zuidstation: { name: "Zuid", vibe: "Galerieën, design, culinair" },
            oudestad: { name: "Oude Stad", vibe: "Kathedraal, steegjes, verborgen pareltjes" },
            kloosterstraat: { name: "Kloosterstraat", vibe: "Vintage, antiek, brocante" }
        },
        places: {
            coffee: [
                { name: "Caffènation", neighborhood: "zuidstation", type: "☕ Koffie", address: "Hopland 46", lat: 51.2140, lng: 4.4062, story: "Antwerpen's koffie-pionier. Ze roastten al specialty coffee toen de rest van België nog oploskoffie dronk. De espresso is kort, sterk, en verandert je ochtend.", budget: "low", energy: "balanced" },
                { name: "Normo", neighborhood: "eilandje", type: "☕ Koffie", address: "Minderbroedersrui 30", lat: 51.2224, lng: 4.4042, story: "Koffie en vinyl. Letterlijk — er staat een platenwinkel naast de bar. Bestel een V60, blader door de jazz-sectie, en vergeet dat je een toerist bent.", budget: "low", energy: "chill" },
                { name: "Kaffeenini", neighborhood: "zuidstation", type: "☕ Koffie", address: "Volkstraat 52", lat: 51.2094, lng: 4.3990, story: "Micro-rösterij in het zuiden van de stad. Ze branden in zulke kleine batches dat de voorraad soms op is voor het middag is. De eigenaar praat over bonen alsof het wijn is — herkomst, terroir, profiel. Je leert hier meer in tien minuten dan in een barista-cursus.", budget: "low", energy: "chill" },
                { name: "Barnini", neighborhood: "zurenborg", type: "☕ Koffie", address: "Dageraadplaats 16", lat: 51.2030, lng: 4.4250, story: "Koffie overdag, natural wines 's avonds. De perfecte Zurenborg-plek: art nouveau gevels als decor, een terras op het plein, en een barista die je met naam begroet na twee bezoeken. Zaterdagochtend is het hier alsof heel Zurenborg brunch.", budget: "mid", energy: "chill" },
                { name: "Broer Breewijd", neighborhood: "eilandje", type: "☕ Koffie", address: "Brouwersvliet 1", lat: 51.2248, lng: 4.4010, story: "Specialty coffee in een ruimte die ooit een brouwerij was. De industriële look is echt — bakstenen muren, stalen balken, en een espressomachine die eruitziet als een oldtimer. De flat white hier is de maatstaf voor de rest van de stad.", budget: "low", energy: "balanced" }
            ],
            character: [
                { name: "Cogels-Osylei wandeling", neighborhood: "zurenborg", type: "🎭 Karakter", address: "Cogels-Osylei", lat: 51.2018, lng: 4.4340, story: "De mooiste straat van België die niemand kent. Art nouveau gevels in elke kleur, elk een meesterwerk. Loop langzaam, kijk omhoog, en realiseer je dat schoonheid soms gewoon in een woonwijk woont.", budget: "low", energy: "balanced" },
                { name: "Dageraadplaats (zondagsmarkt)", neighborhood: "zurenborg", type: "🎭 Karakter", address: "Dageraadplaats", lat: 51.2025, lng: 4.4250, story: "Het kloppende hart van Zurenborg. Zondag is het hier markt: organic groenten, ambachtelijk brood, lokale kazen. Doordeweeks is het een plein waar buurtbewoners hun hond uitlaten en kinderen spelen. Ga op het terras zitten en kijk. Dit is hoe Belgen leven.", budget: "low", energy: "chill" },
                { name: "MAS Museum dakterras", neighborhood: "eilandje", type: "🎭 Karakter", address: "Hanzestedenplaats 1", lat: 51.2290, lng: 4.4048, story: "Je hoeft niet naar binnen. Het dakterras van het MAS is gratis en biedt het beste uitzicht van de stad. Neem de roltrap omhoog, verdieping na verdieping, terwijl Antwerpen zich steeds verder ontvouwt. Bovenaan: 360 graden haven, stad, en Schelde. Ga bij zonsondergang.", budget: "low", energy: "balanced" },
                { name: "Café Kapitein Zeppos", neighborhood: "oudestad", type: "🎭 Karakter", address: "Vleminckveld 78", lat: 51.2191, lng: 4.4047, story: "Verstopt in een steegje dat je drie keer mist. Push de deur open en je staat in een verborgen binnenplaats met een café dat eruitziet als een filmset uit de jaren 30. Jazz op de achtergrond, Belgisch bier op tafel, en het gevoel dat je een geheim hebt ontdekt.", budget: "mid", energy: "chill" },
                { name: "Kloosterstraat vintage ronde", neighborhood: "kloosterstraat", type: "🎭 Karakter", address: "Kloosterstraat", lat: 51.2140, lng: 4.3950, story: "De langste antiekstraat van België. Geen ketens, geen franchises — alleen eigenaren die hun collectie kennen alsof het familie is. Van art deco lampen tot vintage Belgische posters. Ga zonder plan, eindig met iets dat je niet zocht maar niet kunt laten liggen.", budget: "low", energy: "balanced" }
            ],
            cultural: [
                { name: "M HKA", neighborhood: "zuidstation", type: "🎨 Cultuur Wildcard", address: "Leuvenstraat 32", lat: 51.2111, lng: 4.3953, story: "Museum voor Hedendaagse Kunst. Klein maar confronterend. De tentoonstellingen zijn nooit veilig — en dat is precies waarom je hier moet zijn.", budget: "mid", energy: "balanced" },
                { name: "FotoMuseum (FOMU)", neighborhood: "zuidstation", type: "🎨 Cultuur Wildcard", address: "Waalsekaai 47", lat: 51.2125, lng: 4.3942, story: "Fotografie als kunstvorm, niet als Instagram-content. De collectie is indrukwekkend, de tijdelijke tentoonstellingen zijn altijd scherp, en het gebouw aan de Schelde is een bezoek waard op zich. Combineer met een wandeling langs de kaai.", budget: "mid", energy: "balanced" },
                { name: "Zuiderpershuis", neighborhood: "zuidstation", type: "🎨 Cultuur Wildcard", address: "Waalsekaai 14", lat: 51.2130, lng: 4.3958, story: "Voormalig hydraulisch pompstation, nu een broedplaats voor wereldmuziek, theater en dans. Het programma is onvoorspelbaar — van Marokkaanse gnawa tot Congolese rumba. Check de agenda, of loop gewoon binnen en laat je verrassen.", budget: "low", energy: "explorer" }
            ],
            walks: [
                { name: "Scheldekaaien bij schemering", neighborhood: "eilandje", type: "🌙 Avondwandeling", address: "Scheldekaaien", lat: 51.2200, lng: 4.3940, story: "De vernieuwde kaai langs de Schelde. Bij schemering zie je de stad in een ander licht: de kathedraal als silhouet, het water dat glinsters, en een rust die je niet verwacht van een havenstad.", budget: "low", energy: "chill" },
                { name: "Zurenborg → Eilandje → Zuid loop", neighborhood: "zurenborg", type: "🌙 Avondwandeling", address: "Dageraadplaats → MAS → Waalsekaai", lat: 51.2025, lng: 4.4250, story: "De ultieme Antwerpen-wandeling. Start bij de art nouveau van Zurenborg, loop door het bruisende Eilandje langs het MAS, en eindig bij de galerieën van het Zuid. Drie buurten, drie sferen, één stad. Reken op anderhalf uur als je nergens stopt. Maar je stopt overal.", budget: "low", energy: "explorer" }
            ],
            dinner: [
                { name: "Het Gerecht", neighborhood: "zuidstation", type: "🍽️ Locals-only Diner", address: "Amerikalei 20", lat: 51.2082, lng: 4.3990, story: "Voormalige rechtbank, nu restaurant. De ironie is niet verloren: je wordt hier 'veroordeeld' tot genieten. Belgische keuken met flair, in een zaal met meer karakter dan de meeste Michelin-zaken.", budget: "high", energy: "balanced" },
                { name: "Bar Burbure", neighborhood: "oudestad", type: "🍽️ Locals-only Diner", address: "Graanmarkt 3", lat: 51.2207, lng: 4.4000, story: "Low-key briljant. Klein, onopvallend, en toch weten alle locals het te vinden. Seizoensgebonden menu, open keuken, en een chef die kookt alsof het voor vrienden is. Reserveer — er zijn maar 20 plekken. Dit is waar Antwerpse foodies stiekem heen gaan.", budget: "mid", energy: "chill" },
                { name: "Gin-Fish", neighborhood: "zurenborg", type: "🍽️ Locals-only Diner", address: "Dageraadplaats 8", lat: 51.2028, lng: 4.4245, story: "Vis en gin. Meer hoef je niet te weten. De vis is dagvers, de gin-tonic kaart heeft 40 opties, en het terras op Dageraadplaats is het beste van Zurenborg. De eigenaar selecteert elke ochtend zelf op de vismarkt. Dat proef je.", budget: "mid", energy: "balanced" }
            ],
            clubs: [
                { name: "Ampere", neighborhood: "oudestad", type: "🎧 Club", address: "Simonsstraat 21", lat: 51.2170, lng: 4.4210, story: "Onder de spoorrails richting Centraal Station. De treinvibraties mixen met de bass — dystopisch en briljant. Eerste eco-vriendelijke club van België, maar daar merk je niks van behalve dat de energie op de dansvloer eindeloos voelt. Line-ups die je op Resident Advisor checkt, niet op Instagram.", budget: "mid", energy: "explorer" },
                { name: "Club Vaag", neighborhood: "eilandje", type: "🎧 Club", address: "Rijnkaai 2", lat: 51.2305, lng: 4.3990, story: "Intiem, donker, en alles-over-de-beat. In het Eilandje-district, weg van het centrum. De sound is fenomenaal voor zo'n kleine ruimte — deep house, melodic techno, minimal. De crowd is er voor de muziek, niet voor de selfie. Antwerpen's antwoord op een Berlijnse Keller.", budget: "mid", energy: "explorer" }
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
            principe: { name: "Príncipe Real", vibe: "Chic, groen, relaxed" },
            graca: { name: "Graça", vibe: "Hoog, uitzicht, lokaal" },
            marvila: { name: "Marvila", vibe: "Industrieel, brouwerijen, opkomend" }
        },
        places: {
            coffee: [
                { name: "Copenhagen Coffee Lab", neighborhood: "principe", type: "☕ Koffie", address: "Rua Nova da Piedade 10", lat: 38.7106, lng: -9.1518, story: "Scandinavische koffie in een Portugees paleis. De tegels op de muur zijn origineel azulejo, de melk is oat, en de contradictie is prachtig. Ga naar het terras achter — dat kent niemand.", budget: "mid", energy: "chill" },
                { name: "Fabrica Coffee Roasters", neighborhood: "mouraria", type: "☕ Koffie", address: "Rua das Portas de Santo Antão 136", lat: 38.7166, lng: -9.1397, story: "Verstopt in een steegje dat je drie keer zou missen. Binnen ruikt het naar vers gebrande bonen en hoop. De eigenaar vluchtte uit een corporate leven en opende dit. Je proeft de vrijheid.", budget: "low", energy: "balanced" },
                { name: "Heim Café", neighborhood: "graca", type: "☕ Koffie", address: "Rua Santos-o-Velho 2", lat: 38.7130, lng: -9.1505, story: "Duits-Portugees echtpaar dat hun droom volgde en een café opende in een woonbuurt. Specialty coffee, zuurdesembrood uit eigen oven, en een terras met uitzicht op de rivier. Geen toeristen. Alleen buren die hier elke ochtend zitten.", budget: "mid", energy: "chill" },
                { name: "Wish Slow Coffee House", neighborhood: "graca", type: "☕ Koffie", address: "Rua da Graça 49", lat: 38.7170, lng: -9.1330, story: "Slow coffee als filosofie, niet als marketingterm. Pour-over, AeroPress, cold brew — alles met dezelfde geduldige precisie. De ruimte is minimaal, de koffie is maximaal. Neem er de tijd voor. Dat is het punt.", budget: "low", energy: "chill" },
                { name: "Café Janis", neighborhood: "mouraria", type: "☕ Koffie", address: "Rua da Mouraria 10", lat: 38.7148, lng: -9.1370, story: "Koffie, vinyl en vintage in het hart van Mouraria. De platencollectie draait non-stop — soul, funk, jazz. Bestel een galão, neem de krant, en doe alsof je Portugees bent. Na een uur geloof je het zelf.", budget: "low", energy: "balanced" }
            ],
            character: [
                { name: "Feira da Ladra (dinsdag/zaterdag)", neighborhood: "alfama", type: "🎭 Karakter", address: "Campo de Santa Clara", lat: 38.7150, lng: -9.1240, story: "Rommelmarkt met ziel. Tussen de troep vind je azulejo-tegels, vintage fado-platen, en verhalen van verkopers die hier al 30 jaar staan. Het is chaos, maar de mooie soort.", budget: "low", energy: "explorer" },
                { name: "Miradouro da Graça (niet Senhora do Monte)", neighborhood: "graca", type: "🎭 Karakter", address: "Largo da Graça", lat: 38.7172, lng: -9.1297, story: "Elke blog noemt Senhora do Monte. Ga in plaats daarvan naar Graça: hetzelfde uitzicht, een tiende van de toeristen, en een kiosk die ginjinha schenkt voor €1. Proost op het uitzicht.", budget: "low", energy: "balanced" },
                { name: "Mercado de Campo de Ourique", neighborhood: "principe", type: "🎭 Karakter", address: "Rua Coelho da Rocha 104", lat: 38.7200, lng: -9.1600, story: "Vergeet Time Out Market. Dit is waar Lissabonners echt eten. Een buurtmarkt met visboeren, kaasstalletjes, en een paar bars waar je petiscos deelt met mensen die hier al 40 jaar komen. Geen Instagrammers. Alleen eten.", budget: "low", energy: "balanced" },
                { name: "LX Factory deep dive", neighborhood: "lxfactory", type: "🎭 Karakter", address: "Rua Rodrigues de Faria 103", lat: 38.7030, lng: -9.1780, story: "Ja, het staat in elke gids. Maar de meeste toeristen zien alleen de oppervlakte. Ga naar de bovenste verdiepingen van de gebouwen. Daar zitten ateliers, drukkerijen, en een tweedehands boekwinkel die zo groot is dat je er een middag kwijtraakt. De achterkant is beter dan de voorkant.", budget: "low", energy: "explorer" }
            ],
            cultural: [
                { name: "MAAT", neighborhood: "lxfactory", type: "🎨 Cultuur Wildcard", address: "Av. Brasília", lat: 38.6959, lng: -9.1945, story: "Museum aan de Taag dat eruitziet als een golf die land raakt. De tentoonstellingen wisselen, maar het dak is altijd open: loop eroverheen en kijk uit over de rivier. Architectuur als kunst.", budget: "mid", energy: "balanced" },
                { name: "Fábrica Braço de Prata", neighborhood: "marvila", type: "🎨 Cultuur Wildcard", address: "Rua da Fábrica de Material de Guerra 1", lat: 38.7450, lng: -9.1010, story: "Een voormalige wapenfabriek getransformeerd tot alternatief cultuurcentrum. Boekwinkel, tentoonstellingen, concerten, restaurant — alles onder één industrieel dak. Dit is Lissabon's antwoord op Berlijnse Kulturbrauerei. Niet in het centrum, maar juist daarom.", budget: "low", energy: "explorer" }
            ],
            walks: [
                { name: "Alfama verdwaal-sessie bij schemering", neighborhood: "alfama", type: "🌙 Avondwandeling", address: "Start bij Castelo de São Jorge", lat: 38.7139, lng: -9.1335, story: "Geen Google Maps. Begin bij het kasteel en loop bergafwaarts. Elke steeg is een verrassing: fado uit een open raam, katten op trappen, wasgoed als vlaggen. Je verdwaalt. Dat is het punt.", budget: "low", energy: "balanced" },
                { name: "Mouraria → Graça → Alfama afdaling", neighborhood: "mouraria", type: "🌙 Avondwandeling", address: "Largo do Intendente → Miradouro da Graça → Sé", lat: 38.7180, lng: -9.1355, story: "Start bij het hippe Largo do Intendente. Loop omhoog door Mouraria — Lissabons meest multiculturele buurt — via Graça naar de miradouro. Dan afdalen door Alfama naar de kathedraal. Drie buurten, drie sferen, steeds bergafwaarts. Je knieën bedanken je.", budget: "low", energy: "explorer" }
            ],
            dinner: [
                { name: "Taberna da Rua das Flores", neighborhood: "mouraria", type: "🍽️ Locals-only Diner", address: "Rua das Flores 103", lat: 38.7100, lng: -9.1436, story: "Geen reserveringen, geen menu, geen keuze. Chef André kiest voor je. Kleine gerechten die de Portugese keuken deconstrueren en weer opbouwen. De rij op straat is je garantie.", budget: "mid", energy: "explorer" },
                { name: "Tasca do Chico", neighborhood: "alfama", type: "🍽️ Locals-only Diner", address: "Rua do Diário de Notícias 39", lat: 38.7118, lng: -9.1440, story: "Fado + eten + te veel wijn in een ruimte zo klein dat je elleboog in het bord van je buurman belandt. Als de zanger begint, stopt alles. Letterlijk alles. Dit is waarom je naar Lissabon kwam.", budget: "mid", energy: "balanced" },
                { name: "Cantinho do Aziz", neighborhood: "mouraria", type: "🍽️ Locals-only Diner", address: "Rua de São Lourenço 5", lat: 38.7135, lng: -9.1330, story: "Mozambikaanse keuken in het hart van Mouraria. Aziz vluchtte uit Maputo en opende dit restaurant dat twee werelden verbindt. De caril de caranguejo is een openbaring. Klein, vol, en je eet met je handen als niemand kijkt.", budget: "low", energy: "balanced" },
                { name: "Zé da Mouraria", neighborhood: "mouraria", type: "🍽️ Locals-only Diner", address: "Rua João do Outeiro 24", lat: 38.7155, lng: -9.1365, story: "Traditionele petiscos in een buurt die snel verandert maar hier is de tijd gestopt. De eigenaar kent elke klant bij naam. De bacalhau is simpel en perfect. De rekening is belachelijk laag. Dit is het Lissabon dat verdwijnt — ga nu.", budget: "low", energy: "chill" },
                { name: "A Cevicheria", neighborhood: "principe", type: "🍽️ Locals-only Diner", address: "Rua Dom Pedro V 129", lat: 38.7150, lng: -9.1480, story: "Peruaanse ceviche in een Portugese setting. Chef Kiko combineert twee oceaanculturen. De teller aan de bar is de beste plek — kijk hoe hij snijdt met chirurgische precisie. De octopus-ceviche verandert je perspectief op vis. Reserveer of sta in de rij.", budget: "high", energy: "balanced" }
            ],
            clubs: [
                { name: "Lux Frágil", neighborhood: "alfama", type: "🎧 Club", address: "Av. Infante D. Henrique", lat: 38.7140, lng: -9.1200, story: "Drie verdiepingen, rooftop over de Taag, en een deur die al sinds 1998 de standaard zet. Lux is geen club — het is een instituut. John Malkovich is mede-eigenaar, de programmering is eclectisch (techno, house, experimental), en het terras bij zonsopgang is een religieuze ervaring. Ga niet voor middernacht, dat heeft geen zin.", budget: "mid", energy: "explorer" },
                { name: "Ministerium", neighborhood: "alfama", type: "🎧 Club", address: "Terreiro do Paço, Ala Nascente 72", lat: 38.7078, lng: -9.1355, story: "In het historische gebouw aan het Praça do Comércio. De locatie is spectaculair — waar ooit ministeries zaten, draait nu Berghain-level techno. De sound is chirurgisch, de ruimte is monumentaal, en de line-ups lezen als een Resident Advisor-droomlijst. Elegante underground.", budget: "mid", energy: "explorer" },
                { name: "Kremlin", neighborhood: "lxfactory", type: "🎧 Club", address: "Escadinhas da Praia 5", lat: 38.7060, lng: -9.1440, story: "Open sinds 1988 — een van de oudste clubs van Europa. Rauwe muren, krachtig geluid, en een sfeer die je terugvoert naar het gouden tijdperk van de rave. Klein genoeg om de bass in je botten te voelen. Geen franje, alleen muziek en zweet. Lissabon's meest authentieke danservaring.", budget: "low", energy: "explorer" }
            ]
        }
    },
    newcastle: {
        name: "Newcastle",
        center: { lat: 54.9783, lng: -1.6178 },
        neighborhoods: {
            ouseburn: { name: "Ouseburn", vibe: "Creatief, rauw, kunstenaars en brouwerijen" },
            jesmond: { name: "Jesmond", vibe: "Groen, brunch-cultuur, jong-professioneel" },
            grainger: { name: "Grainger Town", vibe: "Historisch, architectuur, independent winkels" },
            quayside: { name: "Quayside", vibe: "Rivier, modern, zondagsmarkt" },
            heaton: { name: "Heaton", vibe: "Residentieel, divers, verborgen eettentjes" },
            sandgate: { name: "Sandgate", vibe: "Historisch, Tudor, rivieroevers" }
        },
        places: {
            coffee: [
                { name: "Ouseburn Coffee Co.", neighborhood: "ouseburn", type: "☕ Koffie", address: "276 Shields Road", lat: 54.9735, lng: -1.5895, story: "Micro-rösterij verstopt in het creatieve hart van Ouseburn. Ze branden ter plekke in kleine batches, en de ruimte fungeert als hangout voor lokale kunstenaars en makers. De geur van vers gebrande bonen mengt met verf en ambacht.", budget: "low", energy: "chill" },
                { name: "Flat Caps Coffee", neighborhood: "grainger", type: "☕ Koffie", address: "9 Carliol Square", lat: 54.9745, lng: -1.6095, story: "Minimaal, geen-onzin specialty coffee bar gerund door obsessieve baristas. Locals beschouwen dit als de beste espresso van het noordoosten van Engeland. Geen franje, alleen vakmanschap in een kopje.", budget: "low", energy: "balanced" },
                { name: "Pink Lane Coffee", neighborhood: "grainger", type: "☕ Koffie", address: "1 Pink Lane", lat: 54.9690, lng: -1.6200, story: "Verstopt in een steegje bij Central Station. Deze röster-café is een hoeksteen van Newcastle's third-wave koffiescene. Wisselende single-origin bonen en een cult-following onder locals die weten waar ze moeten zijn.", budget: "low", energy: "balanced" },
                { name: "Kiln Coffee", neighborhood: "ouseburn", type: "☕ Koffie", address: "Hoults Yard, Walker Road", lat: 54.9710, lng: -1.5830, story: "Verscholen in Hoults Yard — een complex van creatieve bedrijven in een oud fabrieksgebouw. Kiln roast hun eigen bonen en de espresso is onberispelijk. De vibe is werkplaats-chic: beton, staal en de geur van versgebrand. Ouseburn's best bewaarde geheim voor koffie-nerds.", budget: "low", energy: "chill" }
            ],
            character: [
                { name: "The Biscuit Factory", neighborhood: "ouseburn", type: "🎭 Karakter", address: "16 Stoddart Street", lat: 54.9753, lng: -1.5940, story: "De grootste onafhankelijke commerciële kunstgalerie van het VK, in een verbouwd Victoriaans pakhuis. Twee verdiepingen hedendaagse kunst, craft en design. Een plek waar je uren kunt dwalen en altijd iets vindt dat je raakt.", budget: "low", energy: "balanced" },
                { name: "Tyneside Cinema", neighborhood: "grainger", type: "🎭 Karakter", address: "10-12 Pilgrim Street", lat: 54.9730, lng: -1.6115, story: "Een prachtig gerestaureerde bioscoop uit 1937 — het laatste overgebleven purpose-built newsreel theater in het VK. Nu arthouse en wereldcinema, met een art deco café-bar. Hier kijk je film zoals film bedoeld was.", budget: "mid", energy: "chill" },
                { name: "Wylam Brewery", neighborhood: "jesmond", type: "🎭 Karakter", address: "Palace of Arts, Exhibition Park", lat: 54.9810, lng: -1.6155, story: "Een craft brewery in een monumentaal Palace of Arts gebouw uit 1929. Het contrast is fenomenaal: art deco plafonds boven biertanks, glas-in-lood boven hoppige IPAs. Vrijdagavond is het hier een local block party — muziek, food trucks, en het beste bier dat in Newcastle gebrouwen wordt.", budget: "mid", energy: "explorer" },
                { name: "The Cumberland Arms", neighborhood: "ouseburn", type: "🎭 Karakter", address: "James Place Street, Byker", lat: 54.9730, lng: -1.5870, story: "Een echte community pub verscholen op een heuvel boven de Ouseburn Valley. Folk sessions op zondag, een biertuin met uitzicht over de vallei, en locals die hier al decennia komen. Geen pretentie, geen thema — gewoon een pub zoals pubs ooit bedoeld waren. De biertuin bij zonsondergang is magisch.", budget: "low", energy: "chill" }
            ],
            cultural: [
                { name: "Star and Shadow Cinema", neighborhood: "ouseburn", type: "🎨 Cultuur Wildcard", address: "Warwick Street", lat: 54.9758, lng: -1.5920, story: "Vrijwilligers-run, radicaal onafhankelijke bioscoop en live muziek venue. DIY-ethos, experimentele programmering, punk en underground gigs. Het spirituele hart van Newcastle's tegencultuur. Als NTS een gebouw was.", budget: "low", energy: "explorer" },
                { name: "BALTIC Centre for Contemporary Art", neighborhood: "quayside", type: "🎨 Cultuur Wildcard", address: "South Shore Road, Gateshead", lat: 54.9690, lng: -1.6005, story: "Een verbouwde meelfabriek getransformeerd tot een van de grootste hedendaagse kunsthallen ter wereld. Gratis entree, wisselende tentoonstellingen, en een dakterras met panoramisch uitzicht over de Tyne. Architectuur als statement.", budget: "low", energy: "balanced" },
                { name: "Bessie Surtees House", neighborhood: "sandgate", type: "🎨 Cultuur Wildcard", address: "41-44 Sandhill", lat: 54.9695, lng: -1.6090, story: "Twee samengevoegde Jacobean merchant houses uit de 16e en 17e eeuw, pal aan de Quayside. Gratis te bezoeken, en bijna niemand weet dat het bestaat. Bessie Surtees ontvluchtte hier in 1772 via het raam om te trouwen met haar geliefde. Tudor houten panelen, open haarden, en een verhaal dat beter is dan elke Netflix-serie.", budget: "low", energy: "chill" }
            ],
            walks: [
                { name: "Quayside → Ouseburn zonsondergang", neighborhood: "quayside", type: "🌙 Avondwandeling", address: "Millennium Bridge → Free Trade Inn", lat: 54.9695, lng: -1.5995, story: "Loop oost langs de noordoever van de Tyne vanaf de Millennium Bridge. Volg het rivierpad terwijl het zich de Ouseburn Valley in slingert. Eindig bij de Free Trade Inn — een pub op een heuvel met het beste zonsondergangsterras van de stad. De bruggen lichten op terwijl jij je pint drinkt.", budget: "low", energy: "balanced" },
                { name: "Jesmond Dene → Ouseburn groene corridor", neighborhood: "jesmond", type: "🚶 Wandeling", address: "Jesmond Dene Road → Stepney Bank", lat: 54.9870, lng: -1.5955, story: "Newcastle's verborgen groene long. Begin bij de waterval in Jesmond Dene — een Victoriaans ravijn vol oud bos midden in de stad. Volg het pad zuidwaarts langs de beek, onder stenen bruggetjes door, tot je in de Ouseburn Valley uitkomt. Van natuur naar street art in één ononderbroken wandeling. Voelt alsof je de stad uitloopt zonder ooit te vertrekken.", budget: "low", energy: "explorer" }
            ],
            dinner: [
                { name: "Dabbawal", neighborhood: "grainger", type: "🍽️ Locals-only Diner", address: "69-75 High Bridge", lat: 54.9735, lng: -1.6135, story: "Street-food-geïnspireerde Indiase keuken waar locals bij zweren. Kleine gerechten, gedurfde smaken, en een bruisende sfeer. Lichtjaren verwijderd van generieke curry houses — hier draait het om regionale Indiase kookkunst, goed gedaan.", budget: "mid", energy: "balanced" },
                { name: "Cook House", neighborhood: "ouseburn", type: "🍽️ Locals-only Diner", address: "Foundry Lane", lat: 54.9718, lng: -1.5880, story: "Klein, seizoensgebonden restaurant in een verbouwde container aan de Ouseburn. Chef Anna Hedworth kookt met hyper-lokale ingrediënten en een dagelijks wisselend menu. Het voelt als eten bij een briljante vriendin — als die vriendin een award-winning chef is.", budget: "mid", energy: "chill" },
                { name: "Kaltur", neighborhood: "grainger", type: "🍽️ Locals-only Diner", address: "1-3 Higham Place", lat: 54.9720, lng: -1.6160, story: "Spaans-Baskische tapas in een intiem souterrain bij Grey's Monument. De eigenaar is zelf Baskisch en importeert alles — van de jamón tot de pintxos — rechtstreeks. De calamares zijn een openbaring. Wijnlijst vol verrassingen, nul toeristen. Dit is waar Newcastle's chefs eten op hun avond vrij.", budget: "mid", energy: "balanced" },
                { name: "The Patricia", neighborhood: "jesmond", type: "🍽️ Locals-only Diner", address: "139 Jesmond Road", lat: 54.9780, lng: -1.5980, story: "Tien zitplaatsen aan een bar. Geen menu — je eet wat chef Nick kookt. Elke avond anders, altijd seizoensgebonden, altijd briljant. Het concept is simpel: vertrouw de chef. Het resultaat is een van de beste eetervaring in het noorden van Engeland. Reserveer weken vooruit of probeer je geluk als walk-in.", budget: "high", energy: "chill" },
                { name: "Sky Apple Café", neighborhood: "heaton", type: "🍽️ Locals-only Diner", address: "182 Heaton Road", lat: 54.9790, lng: -1.5830, story: "Vegetarisch-vegan café in het hart van Heaton, gerund door muzikanten en creatievelingen. Overdag brunch met zelfgebakken sourdough en huisgemaakte hummus. 's Avonds intieme live muziek — folk, jazz, singer-songwriter. De vibe is iemands huiskamer, maar dan met eten dat je niet verwacht in een buurthuis.", budget: "low", energy: "chill" }
            ],
            clubs: [
                { name: "World Headquarters", neighborhood: "quayside", type: "🎧 Club", address: "Curtis Mayfield House, Carliol Square", lat: 54.9720, lng: -1.6100, story: "Al vier decennia de underground club van het noorden. Funk, disco, Northern Soul, en steeds meer techno en house. De programming is eclectisch en altijd goed — van A-list DJs tot lokaal talent. De plek ademt muziekgeschiedenis. Als de mensen van Newcastle je zeggen 'ga naar WHQ' — luister.", budget: "mid", energy: "explorer" },
                { name: "Digital", neighborhood: "grainger", type: "🎧 Club", address: "Times Square", lat: 54.9710, lng: -1.6150, story: "Funktion-One sound die je ribbenkast masseert. Dit is waar de bass het hardst slaat in Newcastle. Techno, house, drum & bass — het programma is breed maar altijd quality. De ruimte is donker, de lichten zijn choreografisch, en de crowd weet waarom ze er is. Niet voor beginners.", budget: "mid", energy: "explorer" }
            ]
        }
    },

    tallinn: {
        name: "Tallinn",
        center: { lat: 59.4370, lng: 24.7536 },
        neighborhoods: {
            kalamaja: { name: "Kalamaja", vibe: "Creatief, houten huizen, hipster-brouwerijen" },
            telliskivi: { name: "Telliskivi", vibe: "Street art, onafhankelijke winkels, culturele hub" },
            oldtown: { name: "Old Town", vibe: "Middeleeuws, toeristen boven, verborgen kelders onder" },
            rotermann: { name: "Rotermann", vibe: "Industrieel-modern, architectuur, design" },
            noblessner: { name: "Noblessner", vibe: "Voormalige onderzeeërwerf, restaurants aan het water" },
            pelgulinn: { name: "Pelgulinn", vibe: "Residentieel, rauw, upcoming" }
        },
        places: {
            coffee: [
                { name: "Røst Coffee", neighborhood: "telliskivi", type: "☕ Koffie", address: "Telliskivi 60a", lat: 59.4405, lng: 24.7310, story: "Micro-rösterij in het hart van Telliskivi Creative City. Ze branden ter plekke in piepkleine batches, en de baristas zijn fanatiek over hun extractie. De ruimte is minimaal — beton en hout — maar de flat white is een van de beste in het Balticum. Geen haast, alleen vakmanschap.", budget: "low", energy: "chill" },
                { name: "Caffeine", neighborhood: "oldtown", type: "☕ Koffie", address: "Pikk 5", lat: 59.4388, lng: 24.7475, story: "Verstopt in een kelder onder de middeleeuwse straten van de Oude Stad. Terwijl boven de toeristen langs marcheren, zit je hier in een gewelfd souterrain met de beste espresso van Tallinn. De eigenaar is een voormalige barista-kampioen. Het contrast tussen middeleeuws decor en third-wave koffie is surrealistisch.", budget: "low", energy: "balanced" },
                { name: "Pagaripoisid", neighborhood: "kalamaja", type: "☕ Koffie & Bakkerij", address: "Lai 14", lat: 59.4400, lng: 24.7440, story: "Ambachtelijke bakkerij die om 7 uur 's ochtends al vol zit met locals. Het zuurdesembrood is legendarisch, de kaneel-kardemombroodjes zijn verslavend, en de koffie is sterk en eerlijk. De geur trekt je drie straten mee. Dit is waar Tallinn ontbijt.", budget: "low", energy: "balanced" },
                { name: "Kalev Marzipan Café", neighborhood: "oldtown", type: "☕ Koffie & Snoep", address: "Sauna 8", lat: 59.4375, lng: 24.7465, story: "In het oudste marzipan-atelier ter wereld (sinds 1806) kun je koffie drinken omringd door handgemaakte marsepein. Kitscherig? Nee — dit is levend erfgoed. De marsepein is vers, niet dat droge spul dat je elders koopt. Bestel een koffie met een handgeschilderd marsepein-figuurtje.", budget: "low", energy: "chill" }
            ],
            character: [
                { name: "Telliskivi Creative City", neighborhood: "telliskivi", type: "🎭 Karakter", address: "Telliskivi 60a", lat: 59.4405, lng: 24.7310, story: "Een voormalig industrieel complex getransformeerd tot Tallinn's culturele epicentrum. Vintage winkels, galeries, een vlooienmarkt op zaterdag, brouwerijen, en street art op elke muur. Het is rommelig, onvoorspelbaar, en precies daarom briljant. Verdwaal er bewust.", budget: "low", energy: "explorer" },
                { name: "Patarei Zeevesting", neighborhood: "kalamaja", type: "🎭 Karakter", address: "Kalaranna 2", lat: 59.4505, lng: 24.7475, story: "Een vervallen 19e-eeuwse zeevesting en voormalige Sovjetgevangenis aan de kust. Deels open als culturele ruimte, deels nog in ruïne. De sfeer is beklemmend en fascinerend tegelijk. Loop over de zeemuur voor uitzicht op de Finse Golf. Urbex-achtig maar legaal.", budget: "low", energy: "explorer" },
                { name: "Balti Jaama Turg", neighborhood: "kalamaja", type: "🎭 Karakter", address: "Kopli 1", lat: 59.4395, lng: 24.7335, story: "De markthal van Tallinn — drie verdiepingen eten, vintage, en lokale producten. Beneden verse vis en Estse kaas. Boven tweedehands kleding en vinyl. Op het dak een terras met uitzicht. Het is de enige markt waar je tegelijk kunt lunchen, vinyl kopen, en een bontjas scoren.", budget: "low", energy: "balanced" },
                { name: "Lennusadam — Seaplane Harbour", neighborhood: "noblessner", type: "🎭 Karakter", address: "Vesilennuki 6", lat: 59.4515, lng: 24.7385, story: "Een gigantische watervliegtuighangar uit 1917 omgebouwd tot maritiem museum. Een echte onderzeeër, historische schepen, en een vliegsimulator. Het gebouw zelf — met z'n dunne betonnen schaalconstructie — was een technisch wonder in z'n tijd. Beter dan elk maritiem museum dat je kent.", budget: "mid", energy: "balanced" }
            ],
            cultural: [
                { name: "Kumu Kunstmuseum", neighborhood: "rotermann", type: "🎨 Cultuur Wildcard", address: "A. Weizenbergi 34, Kadriorg", lat: 59.4365, lng: 24.7950, story: "Het grootste kunstmuseum van het Balticum, in een spectaculair gebouw van Fins architect Pekka Vapaavuori. Estse kunst van de 18e eeuw tot nu, met een verdieping gewijd aan Sovjettijd-kunst. De collectie is verrassend diep — van socialistisch realisme tot radicale hedendaagse installaties. Gratis op woensdag.", budget: "mid", energy: "balanced" },
                { name: "Fotografiska Tallinn", neighborhood: "rotermann", type: "🎨 Cultuur Wildcard", address: "Telliskivi 60a/8", lat: 59.4408, lng: 24.7320, story: "De Tallinn-vestiging van het Zweedse fotomuseum. Wisselende tentoonstellingen van wereldklasse in een industriële setting. Het restaurant op de bovenste verdieping serveert een van de beste lunches van de stad met panoramisch uitzicht. Kunst en eten in één bezoek.", budget: "mid", energy: "balanced" },
                { name: "Kadriorg Paleistuin", neighborhood: "rotermann", type: "🎨 Cultuur Wildcard", address: "A. Weizenbergi 37, Kadriorg", lat: 59.4380, lng: 24.7920, story: "Een barokpaleis gebouwd door Peter de Grote in 1718 voor zijn vrouw Catharina. De tuinen zijn formeel en sereen — een verrassend stuk Versailles in het Balticum. Het paleis huisvest nu buitenlandse kunst. De Japanse tuin erachter is het stilste plekje van Tallinn.", budget: "low", energy: "chill" }
            ],
            walks: [
                { name: "Kalamaja houten huizen wandeling", neighborhood: "kalamaja", type: "🚶 Wandeling", address: "Kotzebue → Kalaranna promenade", lat: 59.4440, lng: 24.7380, story: "Loop door de kleurrijke houten huizen van Kalamaja — pastelgeel, mintgroen, roze. Deze 19e-eeuwse arbeidershuizen zijn nu het hipste vastgoed van Tallinn. Volg Kotzebue straat naar de kust, dan de Kalaranna promenade langs de zee. Eindig bij Noblessner voor een drankje aan het water. Het nieuwe Tallinn in één wandeling.", budget: "low", energy: "balanced" },
                { name: "Toompea → Oude Stad afdaling", neighborhood: "oldtown", type: "🌙 Avondwandeling", address: "Kohtuotsa vaateplats → Raekoja Plats", lat: 59.4380, lng: 24.7415, story: "Begin op Toompea bij het uitzichtpunt Kohtuotsa — heel Tallinn onder je, de Finse Golf aan de horizon. Daal af via de Pikk Jalg (Lange Been) trap, door de middeleeuwse poorten, langs de oudste apotheek ter wereld (sinds 1422), naar het marktplein. Bij zonsondergang kleuren de torens oranje.", budget: "low", energy: "chill" }
            ],
            dinner: [
                { name: "Leib", neighborhood: "oldtown", type: "🍽️ Locals-only Diner", address: "Uus 31", lat: 59.4395, lng: 24.7510, story: "Farm-to-table restaurant dat letterlijk 'brood' heet. Chef kookt met hyper-lokale Estse ingrediënten — wild, bessen, vis uit de Baltische Zee. Het brood wordt in-house gebakken en is fenomenaal. De locatie in een middeleeuws pand geeft het een intimiteit die je nergens anders vindt. Reserveer.", budget: "mid", energy: "chill" },
                { name: "Rataskaevu 16", neighborhood: "oldtown", type: "🍽️ Locals-only Diner", address: "Rataskaevu 16", lat: 59.4372, lng: 24.7440, story: "Het restaurant waar Tallinn-locals hun gasten meenemen. In een kelder onder de Oude Stad, met gewelfde plafonds en kaarslicht. De keuken is modern Ests — rendier, zuurkool, rogge, maar dan geëleveerd. De prijzen zijn belachelijk redelijk voor de kwaliteit. De wachtlijst op vrijdag is de moeite waard.", budget: "mid", energy: "balanced" },
                { name: "Põhjala Tap Room", neighborhood: "noblessner", type: "🍽️ Locals-only Diner", address: "Peetri 5", lat: 59.4530, lng: 24.7350, story: "De taproom van Estlands beroemdste craft brewery, in een enorme voormalige onderzeeër-fabriek in Noblessner. 24 taps, een menu dat draait om BBQ en rookvlees, en een industriële sfeer die doet denken aan Brooklyn. Vrijdagavond is het hier een block party. De Öö Imperial Porter is een must.", budget: "mid", energy: "explorer" },
                { name: "F-Hoone", neighborhood: "telliskivi", type: "🍽️ Locals-only Diner", address: "Telliskivi 60a", lat: 59.4405, lng: 24.7315, story: "Het restaurant dat Telliskivi op de kaart zette. Industrieel interieur, seizoensgebonden menu, en een brunch die het waard is om voor in de rij te staan. De signature dish — duck confit met bietenpuree — is al jaren een klassieker. De binnentuin in de zomer is het beste terras van Tallinn.", budget: "mid", energy: "balanced" },
                { name: "Moon", neighborhood: "oldtown", type: "🍽️ Locals-only Diner", address: "Võrgu 3", lat: 59.4415, lng: 24.7475, story: "Fine dining in een voormalig pakhuis aan de rand van de Oude Stad. Chef combineert Estse ingrediënten met Aziatische technieken — het resultaat is verrassend en onvoorspelbaar. Het tasting menu verandert wekelijks. Klein, intiem, en een van de spannendste keukens in het Balticum.", budget: "high", energy: "chill" }
            ],
            clubs: [
                { name: "HALL", neighborhood: "noblessner", type: "🎧 Club", address: "Peetri 6", lat: 59.4528, lng: 24.7355, story: "De beste techno-club in het Balticum en Scandinavië, punt. Industrieel, rauw, en met een geluidssysteem dat je huid doet trillen. Camera-stickers op je telefoon — geen foto's, alleen dansen. De locatie in Noblessner naast Põhjala geeft het die perfecte end-of-the-world-vibe. Berlijn-kwaliteit, Tallinn-prijzen.", budget: "mid", energy: "explorer" },
                { name: "Lekker", neighborhood: "oldtown", type: "🎧 Club", address: "Mere pst 6e", lat: 59.4365, lng: 24.7445, story: "Letterlijk underground — een kelder in het centrum van Tallinn. Goed geluid, goede line-ups, en een crowd die er is voor de muziek. De naam zegt het: lekker. Intimate setting waar je na drie uur dansen het gevoel hebt dat je iedereen kent. De late-night sessies zijn het waard om op te blijven.", budget: "low", energy: "explorer" }
            ]
        }
    }
};

// ============================================
// 🍴 LOKALE GERECHTEN — Dish-first, restaurant-second
// ============================================
// Wat MOET je proeven in elke stad? En waar is de beste versie?

const LOCAL_FOOD = {
    cologne: [
        {
            dishName: "Himmel un Ääd",
            description: "Letterlijk 'Hemel en Aarde' — aardappelpuree met appelmoes en gebakken bloedworst (Flönz). Keulen's meest iconische gerecht. De combinatie van zoet en hartig is verslavend, en de bloedworst is knapperig van buiten, zacht van binnen.",
            restaurant: "Gasthaus Schreckenskammer",
            address: "Ursulagartenstraße 11",
            lat: 50.9410, lng: 6.9562,
            whyHere: "Familie-run sinds 1921. De bloedworst komt van een lokale slager die al drie generaties levert. Nul toeristen, volle tafels locals.",
            priceRange: "€€",
            neighborhood: "altstadt",
            mustTry: true
        },
        {
            dishName: "Halver Hahn",
            description: "De grap van Keulen: je bestelt een 'halve haan' en krijgt... een roggebroodje met oude Hollandse kaas en mosterd. Geen kip. De naam is een running joke die al meer dan 100 jaar meegaat. Een must om mee te maken.",
            restaurant: "Päffgen Brauhaus",
            address: "Friesenstraße 64-66",
            lat: 50.9425, lng: 6.9450,
            whyHere: "Päffgen brouwt hun eigen Kölsch in het pand. De Köbes (ober) brengt ongevraagd nieuw bier tot je je viltje op je glas legt. Theater en eten in één.",
            priceRange: "€",
            neighborhood: "altstadt",
            mustTry: true
        },
        {
            dishName: "Rheinischer Sauerbraten",
            description: "Stoofvlees dat dagenlang marineert in azijn en kruiden, geserveerd met een zoete rozijnen-saus, rode kool en aardappelknoedels. Het Rijnlandse antwoord op de Franse coq au vin — maar dan steviger, dieper, en onvergetelijk.",
            restaurant: "Bei Oma Kleinmann",
            address: "Zülpicher Straße 9",
            lat: 50.9315, lng: 6.9405,
            whyHere: "Klein familierestaurant waar de recepten letterlijk van oma komen. Het vlees marineert 7 dagen. Reserveer of sta in de rij — het is het waard.",
            priceRange: "€€",
            neighborhood: "kwartier-lateng",
            mustTry: false
        },
        {
            dishName: "Reibekuchen met Apfelmus",
            description: "Knapperige aardappelpannenkoeken met appelmoes. Simpel, briljant, verslavend. Op de kerstmarkt zijn ze goddelijk, maar het hele jaar door bestelbaar in elk goed Brauhaus. De buitenkant kraakt, de binnenkant smelt.",
            restaurant: "Früh am Dom",
            address: "Am Hof 12-18",
            lat: 50.9407, lng: 6.9570,
            whyHere: "Ja, het ligt naast de Dom en ja, er zijn toeristen. Maar de Reibekuchen hier zijn perfect — knapperig, niet vettig, met huisgemaakte appelmoes. Locals komen hier nog steeds.",
            priceRange: "€",
            neighborhood: "altstadt",
            mustTry: false
        },
        {
            dishName: "Kölsch & Mettbrötchen",
            description: "Rauw gehakt op een broodje met uienringen. Ja, rauw varkensvlees. Het is de ultieme Kölner snack bij je Kölsch-biertje. Als je je erbij kunt zetten: je ontdekt waarom Duitsland het land van Mett is.",
            restaurant: "Lommerzheim",
            address: "Siegesstraße 18",
            lat: 50.9265, lng: 6.9705,
            whyHere: "Legendarische Eck-Kneipe in Deutz. De Kotelett is eigenlijk beroemder, maar het Mettbrötchen hier is de perfecte entree tot Keulse eetcultuur. Cash only, geen reserveringen, volle bak.",
            priceRange: "€",
            neighborhood: "deutz",
            mustTry: false
        },
        {
            dishName: "Flönz",
            description: "Keulse bloedworst — milder en kruidiger dan je verwacht. Warm geserveerd met brood en mosterd, of koud als snack bij je Kölsch. Keulen's antwoord op Britse black pudding, maar eleganter.",
            restaurant: "Malzmühle",
            address: "Heumarkt 6",
            lat: 50.9370, lng: 6.9610,
            whyHere: "Brouwerij op de Heumarkt die hun eigen Mühlen Kölsch brouwen. De Flönz is huisgemaakt en de sfeer is onvervalst Keuls. Probeer het met een Halve Hahn erbij.",
            priceRange: "€",
            neighborhood: "altstadt",
            mustTry: false
        }
    ],
    amsterdam: [
        {
            dishName: "Bitterballen",
            description: "Knapperig gefrituurd, romig ragout van binnen. De ultieme Nederlandse borrelsnack. Elke Amsterdammer heeft een mening over waar de beste zijn. Dip in mosterd, blaas, brand je mond, herhaal.",
            restaurant: "Café 't Smalle",
            address: "Egelantiersgracht 12",
            lat: 52.3755, lng: 4.8835,
            whyHere: "Proeflokaal uit 1786 aan de Jordaan-gracht. De bitterballen zijn vers, het terras hangt boven het water, en de sfeer is tijdloos Amsterdam. Dit is waar Amsterdammers hun zondagmiddag doorbrengen.",
            priceRange: "€",
            neighborhood: "jordaan",
            mustTry: true
        },
        {
            dishName: "Verse Stroopwafel",
            description: "Twee dunne wafellagen met warme kaneelstroop ertussen. Vers gemaakt, warm gegeten — een compleet andere ervaring dan die uit de supermarkt. De stroop plakt aan je vingers en de geur trekt je drie straten mee.",
            restaurant: "Albert Cuyp Markt (kraam)",
            address: "Albert Cuypstraat",
            lat: 52.3558, lng: 4.8945,
            whyHere: "De originele markt-stroopwafel. Staat er al decennia, de rij is altijd lang maar beweegt snel. Warm uit het ijzer, €3, perfectie. Ga rond 10u voor de kortste rij.",
            priceRange: "€",
            neighborhood: "depijp",
            mustTry: true
        },
        {
            dishName: "Hollandse Nieuwe",
            description: "Rauwe haring met uitjes en augurk. Je pakt 'm bij de staart, hoofd achterover, en slikt. Of op een broodje als je beschaafd wilt doen. De vetste, ziltigste, meest Hollandse snack die er is. Seizoen: juni-juli is vers.",
            restaurant: "Vis aan de Schelde (haringkar)",
            address: "Centuurbaan / hoek Albert Cuypstraat",
            lat: 52.3555, lng: 4.8925,
            whyHere: "Niet de toeristenkramen bij het Centraal Station. Dit is een buurt-viskraam in De Pijp waar locals hun haring halen. Vers, proper, en de eigenaar vertelt je precies uit welk vat je haring komt.",
            priceRange: "€",
            neighborhood: "depijp",
            mustTry: false
        },
        {
            dishName: "Stamppot",
            description: "Aardappelpuree gestampt met groenten — boerenkool, zuurkool of hutspot (wortel-ui). Met rookworst en jus. Nederlands comfort food op z'n best. Het gerecht dat Hollanders naar huis trekt als het koud wordt.",
            restaurant: "Moeders",
            address: "Rozengracht 251",
            lat: 52.3718, lng: 4.8770,
            whyHere: "Restaurant vol ingelijste moederfoto's aan de muur. Elke gast brengt een foto van z'n moeder mee. De stamppot is stevig, eerlijk en precies wat je oma zou maken. Kitscherig? Ja. Goed? Absoluut.",
            priceRange: "€€",
            neighborhood: "jordaan",
            mustTry: false
        },
        {
            dishName: "Poffertjes",
            description: "Mini-pannenkoekjes met boter en poedersuiker. Luchtig, zoet, en verslavend. Geen dessert maar een maaltijd als je er genoeg bestelt. De luchtigheid komt van boekweitmeel en gist.",
            restaurant: "The Pancake Bakery",
            address: "Prinsengracht 191",
            lat: 52.3750, lng: 4.8825,
            whyHere: "In een verbouwd 17e-eeuws VOC-pakhuis aan de Prinsengracht. Toeristisch? Beetje. Maar de poffertjes zijn authentiek en het pand is spectaculair. Ga doordeweeks voor rust.",
            priceRange: "€",
            neighborhood: "jordaan",
            mustTry: false
        },
        {
            dishName: "Ossenworst",
            description: "Amsterdams erfgoed: rauwe, gerookte rundvleesworst. Ooit bedacht door Joodse slagers in de 17e eeuw. Zacht, kruidig, licht gerookt. Je snijdt dunne plakjes en eet het op brood of puur. Een stuk eetbare geschiedenis.",
            restaurant: "Slagerij Louman",
            address: "Noordse Bosje 17 (Noordermarkt)",
            lat: 52.3800, lng: 4.8850,
            whyHere: "De beroemdste slagerij van Amsterdam, op de zaterdag Noordermarkt. Familie Louman maakt al generaties ossenworst volgens het originele recept. De rij op zaterdag is het bewijs.",
            priceRange: "€",
            neighborhood: "jordaan",
            mustTry: false
        }
    ],
    antwerp: [
        {
            dishName: "Antwerpse Handjes",
            description: "Chocolaatjes in de vorm van een hand — het symbool van Antwerpen. De legende: een Romeinse soldaat hakte de hand af van een reus die tol hief op de Schelde. De beste versie is gevuld met praline of marzipan.",
            restaurant: "Chocolatier Del Rey",
            address: "Appelmansstraat 5",
            lat: 51.2180, lng: 4.4145,
            whyHere: "Ambachtelijke chocolatier sinds 1949. Hun handjes zijn kunststukjes — niet de massaproductie die je bij de Grote Markt vindt. Probeer de versie met nougat-vulling.",
            priceRange: "€€",
            neighborhood: "oudestad",
            mustTry: true
        },
        {
            dishName: "Stoofvlees met Friet",
            description: "Vlaamse stoofschotel met bier, brood met mosterd op de bodem, en uren geduld. Geserveerd met de dikste, dubbel-gefrituurde friet die je ooit zult eten. DIT is waarom België culinair superieur is aan Nederland.",
            restaurant: "De Zuiderkroon",
            address: "Vlaamse Kaai 14",
            lat: 51.2135, lng: 4.3945,
            whyHere: "Eetcafé in het Zuid waar locals hun stoofvlees eten. Niet fancy, niet instagrammable — gewoon goed. Het vlees valt uit elkaar en de friet is knapperig van buiten, smeuïg van binnen.",
            priceRange: "€€",
            neighborhood: "zuid",
            mustTry: true
        },
        {
            dishName: "Frietjes met Stoofvleessaus",
            description: "Ja, apart van stoofvlees. Want Belgische friet verdient een eigen vermelding. Dubbel gebakken in ossewit, geserveerd in een puntzak met stoofvleessaus of mayo (NOOIT ketchup). Het nationale monument van België.",
            restaurant: "Frituur No. 1",
            address: "Hoogstraat 1",
            lat: 51.2205, lng: 4.4010,
            whyHere: "Geen tafel, geen service, geen pretentie. Frituur met een luik waar je bestelt en op straat eet. De friet is twee keer gebakken en de stoofvleessaus is dik en donker. Antwerpen op z'n puurst.",
            priceRange: "€",
            neighborhood: "oudestad",
            mustTry: false
        },
        {
            dishName: "Vol-au-Vent",
            description: "Bladerdeeg gevuld met kip, champignons en een romige saus met een vleugje citroen. Belgische comfort food van de oude stempel. Elke brasserie serveert het, maar de goede versies zijn zeldzaam — het verschil zit in de saus.",
            restaurant: "Grand Café De Rooden Hoed",
            address: "Oude Koornmarkt 25",
            lat: 51.2200, lng: 4.3975,
            whyHere: "Het oudste café van Antwerpen, al open sinds 1750. De vol-au-vent is een klassieker: romig, genereus, en geserveerd in een sfeer die je nergens anders vindt. Ga op een doordeweekse lunch.",
            priceRange: "€€",
            neighborhood: "oudestad",
            mustTry: false
        },
        {
            dishName: "Bolleke De Koninck",
            description: "Geen gerecht maar een ritueel. Het amberkleurige bier van Antwerpen, geserveerd in een bolleke-glas. Elk Antwerps café tapt het, maar de ervaring begint bij de brouwerij. Zacht, licht bitter, onmiskenbaar Antwerps.",
            restaurant: "Brouwerij De Koninck",
            address: "Mechelsesteenweg 291",
            lat: 51.2080, lng: 4.4130,
            whyHere: "De brouwerij zelf. Tour door de stadsbrouwerij, eindig met proeverij in het proeflokaal. Je leert waarom een Bolleke in Antwerpen meer is dan bier — het is een levenshouding.",
            priceRange: "€",
            neighborhood: "zuid",
            mustTry: true
        },
        {
            dishName: "Garnaalkroketten",
            description: "Knapperig gefrituurd met romige Noordzeegarnalen van binnen. De Vlaamse versie van bitterballen, maar delicater en met de zilte smaak van de zee. Het verschil met de Nederlandse versie? De Belgen gebruiken meer boter. Altijd.",
            restaurant: "Brasserie Dock's",
            address: "Jordaenskaai 7",
            lat: 51.2265, lng: 4.3960,
            whyHere: "Art deco brasserie aan de Scheldekaaien met uitzicht op het water. De garnaalkroketten zijn handgemaakt en de sfeer is oud-Antwerps glamour. Perfect voor een lange lunch.",
            priceRange: "€€",
            neighborhood: "eilandje",
            mustTry: false
        }
    ],
    lisbon: [
        {
            dishName: "Pastel de Nata",
            description: "Bladerdeeg, custard, zwarte vlekjes van de oven. Warm gegeten, bestrooid met kaneel en poedersuiker. Het meest iconische gebakje ter wereld — en in Lissabon smaakt het anders dan overal elders. De bodem kraakt, de vulling beeft.",
            restaurant: "Manteigaria",
            address: "Rua do Loreto 2",
            lat: 38.7115, lng: -9.1435,
            whyHere: "Niet Pastéis de Belém (toeristenwachtrij). Manteigaria bakt ze voor je ogen in een open keuken. Warm uit de oven, goedkoper, en Lissabonners zweren dat deze beter zijn. Eet ze staand aan de toonbank.",
            priceRange: "€",
            neighborhood: "bairro",
            mustTry: true
        },
        {
            dishName: "Bacalhau à Brás",
            description: "Gedroogde kabeljauw (bacalhau) met dunne frietjes, roerei, olijven en peterselie. Een van de 365 manieren waarop Portugal kabeljauw bereidt — voor elke dag een. Dit is de meest verslavende versie: romig, ziltig, knapperig tegelijk.",
            restaurant: "Zé da Mouraria",
            address: "Rua João do Outeiro 24",
            lat: 38.7150, lng: -9.1345,
            whyHere: "Geen-onzin tascas in de Mouraria, Lissabon's meest authentieke buurt. Hier eet je bacalhau zoals Portugezen het thuis maken. Plastic tafelkleed, TV aan de muur, perfectie op je bord.",
            priceRange: "€",
            neighborhood: "mouraria",
            mustTry: true
        },
        {
            dishName: "Bifana",
            description: "Dun gesneden varkensvlees gemarineerd in knoflook, witte wijn en piri-piri, op een broodje. Portugal's antwoord op de hamburger — en eerlijk gezegd beter. Simpel, vet, een beetje pittig, en voor €2,50.",
            restaurant: "As Bifanas do Afonso",
            address: "Rua da Madalena 146",
            lat: 38.7110, lng: -9.1355,
            whyHere: "Hole-in-the-wall in de Baixa waar de bifana's sneller weggaan dan ze gemaakt worden. Locals bestellen er twee tegelijk met een Imperial (biertje). Geen zitplaatsen, geen menu, geen probleem.",
            priceRange: "€",
            neighborhood: "bairro",
            mustTry: false
        },
        {
            dishName: "Ginjinha",
            description: "Kerslikeur. Je drinkt het in één shot, staand bij een ginjinha-kraam. Zoet, warm, medicinaal — het is de aperitief van Lissabon. Sommigen nemen het 'com ginja' (met een kers op de bodem) of in een chocolade bekertje.",
            restaurant: "A Ginjinha",
            address: "Largo de São Domingos 8",
            lat: 38.7140, lng: -9.1395,
            whyHere: "Het origineel sinds 1840. Een piepklein lokaal met alleen een toonbank. Je bestelt, je drinkt, je gaat. Het plein ervoor is een van Lissabon's meest levendige — perfecte people watching erbij.",
            priceRange: "€",
            neighborhood: "bairro",
            mustTry: true
        },
        {
            dishName: "Sardinhas Assadas",
            description: "Gegrilde sardines op houtskool. Heel, met kop en staart, op brood zodat het vet intrekt. De geur vult hele straten in juni (Santos Populares festival). Buiten het seizoen: nog steeds goed, maar juni is magisch.",
            restaurant: "Ponto Final",
            address: "Rua do Ginjal 72, Almada",
            lat: 38.6870, lng: -9.1645,
            whyHere: "Neem de veerboot naar Cacilhas, loop langs de kade. Dit restaurant hangt letterlijk boven het water met uitzicht op heel Lissabon. De sardines zijn vers, de wijn goedkoop, en de zonsondergang is gratis.",
            priceRange: "€",
            neighborhood: "bairro",
            mustTry: false
        },
        {
            dishName: "Caldo Verde",
            description: "Boerenkoolsoep met aardappel, olijfolie en een plak chouriço. Portugees comfort in een kom. Simpel, gezond, vol smaak. Het recept verandert al honderden jaren niet — en dat hoeft ook niet.",
            restaurant: "Tasca do Chico",
            address: "Rua dos Remédios 83",
            lat: 38.7130, lng: -9.1270,
            whyHere: "Fado-restaurant in Alfama. De caldo verde is een proloog voor een avond live fado — rauw, emotioneel, echt. Reserveer vooruit, het is klein en altijd vol.",
            priceRange: "€€",
            neighborhood: "alfama",
            mustTry: false
        }
    ],
    newcastle: [
        {
            dishName: "Stottie Cake",
            description: "Plat, dicht, rond brood. Niet mooi, wel briljant. Gevuld met ham and pease pudding, of bacon. Het Geordie antwoord op het broodje — maar dan steviger, voedzamer, en met een naam die je moet leren uitspreken.",
            restaurant: "Greggs (originele bakkerij)",
            address: "Gosforth High Street",
            lat: 54.9830, lng: -1.6140,
            whyHere: "Ja, Greggs. Het begon als een lokale bakkerij in Newcastle. De stottie bij een originele Greggs in Gosforth is nog steeds handgemaakt en een wereld van verschil met de keten-versie. Nostalgie en koolhydraten in één.",
            priceRange: "€",
            neighborhood: "jesmond",
            mustTry: true
        },
        {
            dishName: "Pease Pudding",
            description: "Een dikke, gele pudding van gespleten gele erwten. Klinkt vreemd, smaakt fantastisch — zacht, aards, een beetje zoet. Een van de oudste recepten van Northumbria, traditioneel geserveerd op een stottie met ham.",
            restaurant: "The Broad Chare",
            address: "25 Broad Chare",
            lat: 54.9700, lng: -1.6050,
            whyHere: "Gastropub aan de Quayside gerund door Terry Laybourne, een van Newcastle's chef-legendes. Hun pease pudding is een hommage aan de regio — geserveerd als bijgerecht bij slow-cooked vlees. Verfijnd maar trouw aan de roots.",
            priceRange: "€€",
            neighborhood: "quayside",
            mustTry: true
        },
        {
            dishName: "Pan Haggerty",
            description: "Lagen aardappel, ui en kaas, langzaam gebakken in een pan tot goudbruin en smeuïg. Het Northumbriaanse equivalent van gratin dauphinois — maar dan zonder de Franse pretentie. Comfort food voor koude avonden aan de Tyne.",
            restaurant: "The Patricia",
            address: "139 Jesmond Road",
            lat: 54.9780, lng: -1.5980,
            whyHere: "Chef's table restaurant met 10 zitplaatsen. Geen menu — je eet wat chef Nick kookt. Als pan haggerty op z'n seizoensgebonden menu staat, heb je geluk. De versie hier is geëleveerd maar eerlijk.",
            priceRange: "€€€",
            neighborhood: "jesmond",
            mustTry: false
        },
        {
            dishName: "Craster Kippers",
            description: "Gerookte haring uit het vissersdorp Craster, 50km ten noorden van Newcastle. Al generaties gerookt in hetzelfde rookhuis. Goudbruin, zilt, rokerig. Op toast met boter voor ontbijt is dit een openbaring.",
            restaurant: "The Kipper House at Swallow Fish",
            address: "Craster (dagtrip) / Newcastle Grainger Market",
            lat: 54.9730, lng: -1.6130,
            whyHere: "Op de Grainger Market in het centrum vind je verse Craster kippers bij de visboer. Neem ze mee en bak ze zelf, of maak de dagtrip naar Craster zelf — het rookhuis is al 130+ jaar in bedrijf.",
            priceRange: "€",
            neighborhood: "grainger",
            mustTry: false
        },
        {
            dishName: "Parmo",
            description: "Gepaneerd kippenschnitzel met bechamelsaus en gesmolten kaas. Geen Italiaans gerecht maar een creatie uit Teesside die heel Noord-Engeland veroverd heeft. Trashy? Misschien. Onweerstaanbaar? Absoluut. De guilty pleasure van de Geordie.",
            restaurant: "Scream for Pizza",
            address: "Side, Newcastle",
            lat: 54.9710, lng: -1.6095,
            whyHere: "Ja, het is een pizzazaak. Maar hun chicken parmo is cult. De bechamel is zelfgemaakt, de kaas is royaal, en na een avond in de Geordie pubs is dit precies wat je nodig hebt. Open tot laat.",
            priceRange: "€",
            neighborhood: "grainger",
            mustTry: true
        }
    ],
    tallinn: [
        {
            dishName: "Verivorst & Mulgikapsas",
            description: "Bloedworst met zuurkoolstoofpot. Het meest Estse gerecht dat bestaat — donker, aards, diep van smaak. Traditioneel gegeten rond Kerstmis, maar het hele jaar beschikbaar in goede restaurants. De bloedworst is zachter en kruidiger dan je verwacht.",
            restaurant: "Rataskaevu 16",
            address: "Rataskaevu 16, Oude Stad",
            lat: 59.4372, lng: 24.7440,
            whyHere: "Kelderrestaurant onder de middeleeuwse straten. De chef maakt de verivorst zelf — geen fabrieksproduct. De zuurkool is licht en fris, niet zuur. Locals brengen hier hun gasten mee.",
            priceRange: "€€",
            neighborhood: "oldtown",
            mustTry: true
        },
        {
            dishName: "Kohuke",
            description: "Een met chocolade omhuld kwarkstaafje. Estlands nationale snoep. Elke supermarkt heeft een hele schapwand vol. Er zijn tientallen smaken — vanille, kokos, karamel, bessen — en elke Est heeft een favoriet. Het is goedkoop, verslavend, en absoluut uniek.",
            restaurant: "Elke supermarkt (Selver, Rimi, Coop)",
            address: "Diverse locaties",
            lat: 59.4370, lng: 24.7536,
            whyHere: "Ga naar een Selver of Rimi supermarkt en sta voor de kohuke-muur. Koop er 5 verschillende. Het kost je €2 totaal en je hebt het meest authentieke Estse snoep in handen. Kohuke.com rankt ze zelfs.",
            priceRange: "€",
            neighborhood: "kalamaja",
            mustTry: true
        },
        {
            dishName: "Kiluvõileib",
            description: "Open broodje met kilusprot — kleine gerookte sprot, een Baltische klassieker. Op roggebrood met boter, gekookt ei en verse ui. Simpel, ziltig, rokerig. Het Estse antwoord op de Deense smørrebrød. De vis is klein maar de smaak is enorm.",
            restaurant: "Leib Resto ja Aed",
            address: "Uus 31, Oude Stad",
            lat: 59.4395, lng: 24.7510,
            whyHere: "Farm-to-table restaurant dat 'brood' heet. Hun kiluvõileib is de verfijnde versie — huisgebakken roggebrood, vers gerookte sprot, en eetbare bloemen uit de eigen tuin. Simpel gerecht, onvergetelijke uitvoering.",
            priceRange: "€€",
            neighborhood: "oldtown",
            mustTry: false
        },
        {
            dishName: "Kama",
            description: "Estlands superfood: een mix van geroosterde gerst, rogge, haver en erwten, gemalen tot poeder. Gemixed met kefir of yoghurt als ontbijt, of als dessert met bessen. Het smaakt nootachtig, licht zoet, en diep Ests. Er bestaat nergens ter wereld iets vergelijkbaars.",
            restaurant: "Kukeke Pagarikoda",
            address: "Telliskivi 60a",
            lat: 59.4405, lng: 24.7315,
            whyHere: "Bakkerij in Telliskivi die kama in alles verwerkt — smoothies, taarten, ontbijtbowls. De kama-kefir bowl met seizoensbessen is de perfecte start van de dag. Lokaler wordt het niet.",
            priceRange: "€",
            neighborhood: "telliskivi",
            mustTry: true
        },
        {
            dishName: "Põhjala Öö Porter",
            description: "Geen gerecht maar een ritueel. De Öö (Nacht) Imperial Baltic Porter van brouwerij Põhjala is donker, complex, en het beste bier dat Estland maakt. Chocolade, koffie, een vleugje rook. Estland heeft een exploderende craft beer scene en dit is het vlaggenschip.",
            restaurant: "Põhjala Tap Room",
            address: "Peetri 5, Noblessner",
            lat: 59.4530, lng: 24.7350,
            whyHere: "De brouwerij zelf, in een voormalige onderzeeërfabriek. 24 taps, industriële sfeer, BBQ erbij. De Öö op tap smaakt anders dan uit de fles — voller, romiger. Vrijdagavond is het hier een feest.",
            priceRange: "€€",
            neighborhood: "noblessner",
            mustTry: false
        }
    ]
};

// ============================================
// 🎲 DRIFT — City-Specific Challenges
// ============================================
// Stad-bewuste challenges die inspelen op lokale cultuur en buurten.
// Worden met 60% kans gekozen als locatie aan staat.

const DRIFT_CITY_CHALLENGES = {
    cologne: [
        {
            title: "Het Kölsch Ritueel",
            duration: 20,
            icon: "🍺",
            phase: "settle",
            instruction: "Zoek het dichtstbijzijnde Brauhaus. Bestel een Kölsch. Observeer de Köbes.",
            details: "De Köbes (ober) brengt ongevraagd nieuw bier. Je viltje op je glas = stop. Dit is het Keulse ritueel — je drinkt niet, je neemt deel. Kijk naar de Köbes: hoe hij loopt, hoe hij serveert, hoe hij iedereen gelijk behandelt. Dit is Keulse democratie in actie.",
            prompt: "Hoeveel Kölsch heb je gedronken voor je je viltje op je glas legde?"
        },
        {
            title: "Ehrenfeld Street Art Safari",
            duration: 25,
            icon: "🎨",
            phase: "opening",
            instruction: "Loop door Ehrenfeld en zoek 5 stuks street art die je raken.",
            details: "Ehrenfeld is Keulen's meest creatieve buurt. Elke muur vertelt een verhaal. Loop door de Körnerstraße en omgeving. Zoek murals, stickers, paste-ups. Niet fotograferen — beschrijf ze in woorden. Wat zegt deze kunst over deze buurt?",
            prompt: "Welk kunstwerk raakte je het meest? Wat denk je dat de kunstenaar wilde zeggen?"
        },
        {
            title: "De Veedel-test",
            duration: 20,
            icon: "🏘️",
            phase: "interact",
            instruction: "Vraag een local: 'Welk Veedel is het beste?' Bereid je voor op een passioneel antwoord.",
            details: "Keulenaars zijn fanatiek over hun Veedel (buurt). Südstadt vs Ehrenfeld vs Nippes — het is de eeuwige discussie. Zoek iemand in een café of op straat en stel de vraag. Luister. De passie waarmee ze antwoorden vertelt je meer over Keulen dan elke reisgids.",
            prompt: "Welk Veedel werd genoemd en waarom? Ben je het eens?"
        },
        {
            title: "De Rijn-Oever Meditatie",
            duration: 15,
            icon: "🌊",
            phase: "settle",
            instruction: "Ga zitten aan de Rijn. Kijk naar het water. Tel de schepen.",
            details: "De Rijn is de hartslag van Keulen. Zoek een plek op de oever — Deutzer Brücke of Rheinauhafen — en ga zitten. Kijk naar de binnenvaartschepen. Elke boot heeft een naam, een herkomst, een bestemming. Net als jij.",
            prompt: "Hoeveel schepen heb je geteld? Waar kwamen ze vandaan?"
        }
    ],
    amsterdam: [
        {
            title: "Het Bruin Café Experiment",
            duration: 20,
            icon: "🍺",
            phase: "settle",
            instruction: "Vind het oudste bruin café dat je kunt vinden. Ga zitten. Bestel een biertje.",
            details: "Bruine cafés zijn Amsterdam's ziel — donker hout, vergeeld plafond, bierviltjes als decoratie. Hoe ouder, hoe beter. Kijk naar het interieur: hoeveel lagen geschiedenis zie je? Praat met de barman. Vraag hoe lang dit café al bestaat.",
            prompt: "Hoe oud was het café? Wat hing er aan de muur dat je niet verwachtte?"
        },
        {
            title: "De Pont",
            duration: 25,
            icon: "⛴️",
            phase: "opening",
            instruction: "Neem de gratis pont naar Noord. Loop tot je verdwaalt.",
            details: "Achter Centraal Station vaart elke paar minuten een gratis pont naar Amsterdam-Noord. Stap op, stap af, en loop. Noord is Amsterdam's frontier — NDSM-werf, street art, brouwerijen in pakhuizen. Hier is Amsterdam rauw en echt.",
            prompt: "Wat is het eerste dat opvalt aan Noord dat je niet in het centrum ziet?"
        },
        {
            title: "De Grachten-Code",
            duration: 20,
            icon: "🏠",
            phase: "interact",
            instruction: "Zoek 3 gevelstenen op grachtenpanden. Ontcijfer hun betekenis.",
            details: "Voor huisnummers waren er gevelstenen — beelden in de gevel die vertelden wie er woonde of wat er verkocht werd. Een vis = vishandel. Een boot = scheepvaart. Loop langs de Herengracht of Keizersgracht en zoek ze. Amsterdam's oudste storytelling.",
            prompt: "Welke gevelstenen heb je gevonden? Wat vertellen ze?"
        },
        {
            title: "De Jordaan Fluister-tour",
            duration: 20,
            icon: "🤫",
            phase: "opening",
            instruction: "Loop door de Jordaan. Volg de smalste steegjes die je vindt.",
            details: "De Jordaan zit vol hofjes — verborgen binnentuinen achter onopvallende deuren. Zoek de smalste straatjes en steegjes. Als je een open deur ziet naar een binnentuin: loop zachtjes naar binnen. Dit is Amsterdam's best bewaarde geheim.",
            prompt: "Heb je een hofje gevonden? Beschrijf de stilte."
        }
    ],
    antwerp: [
        {
            title: "De Cogels-Osylei Test",
            duration: 25,
            icon: "🏛️",
            phase: "opening",
            instruction: "Loop de Cogels-Osylei af in Zurenborg. Tel hoeveel architectuurstijlen je herkent.",
            details: "De mooiste straat van België — en bijna niemand kent het. Art Nouveau, Neo-Gotiek, Neo-Renaissance, Jugendstil, alles door elkaar. Elk huis is een statement. Loop langzaam, kijk omhoog, en tel de stijlen. Hint: er zijn er meer dan 10.",
            prompt: "Hoeveel stijlen heb je geteld? Welk huis was je favoriet?"
        },
        {
            title: "Scheldt Sunset",
            duration: 20,
            icon: "🌅",
            phase: "settle",
            instruction: "Wandel langs de Scheldekaaien naar het zuiden. Stop waar de zon het mooist op het water valt.",
            details: "De vernieuwde Scheldekaaien zijn Antwerpen's nieuwe woonkamer. Loop richting het zuiden, voorbij het MAS, langs de oude dokken. De Schelde wordt breder, de lucht wordt groter. Ga zitten waar het licht het mooist is.",
            prompt: "Wat zie je aan de overkant? Hoe klinkt de rivier?"
        },
        {
            title: "Het Bolleke Protocol",
            duration: 20,
            icon: "🍺",
            phase: "interact",
            instruction: "Bestel een Bolleke De Koninck in een buurtcafé. Vraag de barman naar z'n favoriete plek in Antwerpen.",
            details: "Een Bolleke bestellen is een statement — je bent geen toerist, je bent een Antwerpenaar (voor even). Het amberkleurige bier in het bolronde glas is een ritueel. Proost met 'Santé' en vraag de barman waar hij zelf eet. Dat is je volgende bestemming.",
            prompt: "Wat raadde de barman aan? Ga je erheen?"
        },
        {
            title: "De Kloosterstraat Tijdmachine",
            duration: 20,
            icon: "🕰️",
            phase: "interact",
            instruction: "Loop de Kloosterstraat in en ga de meest intrigerende vintage winkel binnen.",
            details: "De Kloosterstraat is Antwerpen's antiekwijk — maar dan cool. Vintage meubels, oude platen, tweedehands boeken, mid-century design. Ga een winkel binnen die je aantrekt. Raak iets aan. Vraag naar het verhaal. Elk object heeft er een.",
            prompt: "Wat heb je gevonden? Wat zou je mee naar huis nemen als geld geen rol speelt?"
        }
    ],
    lisbon: [
        {
            title: "Het Fado Moment",
            duration: 25,
            icon: "🎵",
            phase: "settle",
            instruction: "Loop door Alfama tot je fado hoort. Stop. Luister.",
            details: "Fado klinkt door de steegjes van Alfama — soms live uit een café, soms uit een open raam. Loop zonder haast door de smalle straatjes. Als je het hoort: stop. Ga niet naar binnen. Luister van buiten. Fado is gemaakt voor saudade — het verlangen naar iets dat je niet kunt benoemen.",
            prompt: "Waar hoorde je fado? Wat voelde je?"
        },
        {
            title: "De Azulejo Route",
            duration: 20,
            icon: "🎨",
            phase: "opening",
            instruction: "Volg de mooiste azulejos (tegels) die je ziet. Laat ze je route bepalen.",
            details: "Lissabon is bedekt met azulejos — blauwe, gele, groene tegels op elke gevel. Kies een startpunt en loop richting de mooiste patronen. Elke keer dat je een gevel ziet die je raakt: die kant op. De tegels zijn je kompas.",
            prompt: "Welk azulejo-patroon was het mooist? Waar bracht het je?"
        },
        {
            title: "De Miradouro Jacht",
            duration: 25,
            icon: "👀",
            phase: "opening",
            instruction: "Zoek een miradouro (uitzichtpunt) waar geen andere toerist staat.",
            details: "Lissabon heeft tientallen miradouros — maar de beroemde zijn altijd vol. Jouw missie: vind er een die leeg is. Klim omhoog in Graça, Mouraria of Alfama. Kijk op elke hoek of er een verborgen uitzicht is. De stad onthult zich alleen aan wie klimt.",
            prompt: "Heb je een leeg miradouro gevonden? Wat zie je?"
        },
        {
            title: "Het Tram 28 Alternatief",
            duration: 20,
            icon: "🚶",
            phase: "opening",
            instruction: "Loop de route van Tram 28 — maar dan te voet. Niet instappen.",
            details: "Tram 28 is een toeristenattractie geworden. Maar de route is briljant: door Alfama, Graça, Baixa, Estrela. Loop dezelfde route te voet. Je ziet alles wat de tram mist — de steegjes, de binnenplaatsen, de details. En je hoeft niet in de rij te staan.",
            prompt: "Wat heb je gezien dat je vanuit de tram gemist zou hebben?"
        }
    ],
    newcastle: [
        {
            title: "De Zeven Bruggen",
            duration: 30,
            icon: "🌉",
            phase: "opening",
            instruction: "Loop langs de Tyne en probeer alle 7 bruggen te zien. Tel ze.",
            details: "Van de Tyne Bridge tot de Millennium Bridge — 7 bruggen over de Tyne, elk uit een ander tijdperk. Loop langs de noordoever van oost naar west (of andersom). Elke brug vertelt het verhaal van een ander Newcastle. De Millennium Bridge knipoogt 's avonds.",
            prompt: "Hoeveel bruggen heb je geteld? Welke is de mooiste?"
        },
        {
            title: "Ouseburn Valley Art Hunt",
            duration: 25,
            icon: "🎨",
            phase: "interact",
            instruction: "Loop de Ouseburn Valley in en zoek 3 creatieve ruimtes die open zijn.",
            details: "De Ouseburn is Newcastle's creatieve hartslag — oude fabrieken vol galeries, studio's, brouwerijen en muziekzalen. Loop Stepney Bank af, kijk welke deuren open staan. Ga naar binnen. Praat met de makers. Dit is waar Newcastle's cultuur geboren wordt.",
            prompt: "Welke creatieve ruimte verraste je het meest? Wat werd er gemaakt?"
        },
        {
            title: "De Grainger Market Ontdekking",
            duration: 20,
            icon: "🏪",
            phase: "interact",
            instruction: "Loop de Grainger Market in. Koop iets dat je niet kent van een kraam die je normaal zou mislopen.",
            details: "De Grainger Market is Victoriaans, covered, en vol onverwachte kraampjes. Vergeet de bekende namen — zoek de kramen in de hoeken. De Turkse bakker. De vintage platenverkoper. De man die al 40 jaar vis verkoopt. Koop iets en vraag om het verhaal.",
            prompt: "Wat heb je gekocht? Wat was het verhaal van de verkoper?"
        },
        {
            title: "Het Geordie Biertje",
            duration: 20,
            icon: "🍺",
            phase: "settle",
            instruction: "Zoek een pub die er van buiten niet uitziet. Ga naar binnen. Bestel een local ale.",
            details: "Newcastle is een bierstad. Niet de fancy craft bars — de hoekpubs waar niemand z'n telefoon checkt. Ga op zoek naar een pub zonder chalkboard-menu of fairy lights. Bestel wat de man naast je drinkt. Dit is waar je het echte Newcastle vindt.",
            prompt: "Welke pub vond je? Wat dronk je? Wie zat er naast je?"
        }
    ],
    tallinn: [
        {
            title: "Kalamaja Houten Huizen Drift",
            duration: 25,
            icon: "🏠",
            phase: "opening",
            instruction: "Loop door Kalamaja en zoek de 5 mooiste houten huizen. Geen Google.",
            details: "Kalamaja is Tallinn's hipste buurt — maar onder de craft bars en brouwerijen staan nog steeds 19e-eeuwse houten arbeidershuizen in elke kleur. Loop door de zijstraten — Kotzebue, Vana-Kalamaja, Soo — en zoek de mooiste. Pastelgeel, mintgroen, verweerd blauw. Elk huis heeft een verhaal.",
            prompt: "Welke 5 kleuren heb je gevonden? Welk huis zou je willen bewonen?"
        },
        {
            title: "De Middeleeuwse Kelder",
            duration: 20,
            icon: "🕯️",
            phase: "settle",
            instruction: "Zoek een kelder-café in de Oude Stad. Ga naar beneden. Bestel iets warms.",
            details: "Onder de middeleeuwse straten van Tallinn liggen tientallen gewelfde kelders die nu cafés, bars of restaurants zijn. Negeer de terrassen op straatniveau — zoek de trappen naar beneden. Hoe dieper je gaat, hoe meer je de stad voelt. Bestel glögi (glühwein) in de winter of een lokaal bier in de zomer.",
            prompt: "Hoe diep was de kelder? Wat hoorde je van bovengronds?"
        },
        {
            title: "De Kust Achter de Stad",
            duration: 25,
            icon: "🌊",
            phase: "opening",
            instruction: "Loop naar de kust. Tallinn ligt aan zee maar bijna niemand gaat erheen.",
            details: "Tallinn is een kuststad die z'n zee vergeten is. Loop naar Noblessner of Kalaranna en zoek het water. De Finse Golf is koud, grijs, en prachtig. In de verte zie je op heldere dagen Helsinki. Ga zitten op de rotsen en luister naar het water. Dit is het Tallinn dat toeristen missen.",
            prompt: "Hoe voelt de zee hier? Wat zie je aan de horizon?"
        },
        {
            title: "Het Telliskivi Experiment",
            duration: 20,
            icon: "🎨",
            phase: "interact",
            instruction: "Loop Telliskivi Creative City in. Ga de eerste deur binnen die open staat.",
            details: "Telliskivi is een labyrint van creatieve bedrijven, galeries, tweedehands winkels en ateliers in een voormalig fabrieksterrein. Elke deur verbergt iets anders — een platenwinkel, een keramiek-atelier, een vintage kledingzaak. Ga naar binnen waar de deur open staat. Vraag wat ze maken. Dit is Tallinn's ziel.",
            prompt: "Welke deur koos je? Wat vond je erachter?"
        }
    ]
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
        lisbon: ['alfama', 'mouraria', 'lxfactory'],
        newcastle: ['ouseburn', 'grainger', 'heaton', 'jesmond'],
        tallinn: ['kalamaja', 'telliskivi', 'noblessner']
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
