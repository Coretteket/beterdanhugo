var seed = ""

var outlets = {
    "nos": "NOS",
    "rtl": "RTL",
    "nu": "NU.nl",
    "volkskrant": "Volkskrant",
    "telegraaf": "Telegraaf",
    "nrc": "NRC",
    "trouw": "Trouw",
    "ad": "AD",
    "parool": "Parool",
    "metro": "Metro",
    "bnr": "BNR",
    "1v": "EenVandaag",
    "hvnl": "Hart van Nederland",
    "reuters": "Reuters",
    "ap": "Associated Press",
    "bbc": "BBC",
    "nyt": "New York Times",
    "wsj": "Wall Street Journal",
    "cnn": "CNN",
};

var pairs = [
    ["nos", "rtl"],
    ["nu", "ad"],
    ["volkskrant", "telegraaf"],
    ["nrc", "trouw", "parool"],
    ["metro", "bnr"],
    ["1v", "hvnl"],
    ["bbc", "cnn"],
    ["nyt", "wsj"],
    ["reuters", "ap"]
]

for (const e in pairs) {
    pairs[e] = pairs[e].map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
}

var nws = {
    11: [
        [0, "Eerste Nederlander met coronavirus opgenomen in Tilburg, `man vierde carnaval'"],
        [0, "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië"],
        [1, "Eerste besmetting coronavirus in Nederland: patiënt (56) in Tilburg geïsoleerd"],
        [1, "Ondernemer uit Loon op Zand is eerste coronapatiënt in het ziekenhuis"]
    ],
    14: [
        [2, "Viroloog over verslaggeving coronavirus: `Overdrijven we niet een beetje?'"],
        [2, "Volgens het RIVM nog geen reden tot zorgen: `Nederland het best voorbereid'"],
        [3, "Zijn we voorbereid op een epidemie? `Kabinet moet niet bang zijn om in te grijpen'"],
        [3, "`Het verleden leert ons: maatregelen tegen een epidemie komen eigenlijk altijd te laat'"],
    ],
    18: [
        [1, "Eerste overleden coronapatiënt (86) uit Oud-Beijerland `was ontzettend lieve man'"],
        [1, "Eerste Nederlander (86) aan corona&shy;virus overleden in Rotterdams ziekenhuis"],
        [2, "Eerste corona-dode in Nederland, man (86) had al gezondheids&shy;problemen"]
    ],
    21: [
        ["g('lockdown')", [
            [1, "Nederland volledig op slot: alleen huis uit als het echt nodig is, vermijd grote groepen"],
            [0, "Kabinet kiest voor harde lockdown: alleen je huis nog uit als het echt nodig is"]
        ]],
        ["measureCount(2)", [
            [0, "Kabinet in persconferentie: $announced"],
            [1, "Maatregelen tegen corona: $announced"],
        ]],
        ["true", [
            [3, "Afgelopen week $lastweekpos besmettingen: druk op kabinet om maatregelen te nemen groeit"],
            [3, "Kabinet neemt vooralsnog geen landelijke maatregelen, is dat wel verantwoord?"],
            [3, "Steeds meer corona&shy;besmettingen: `De politiek moet nu echt durven in te grijpen'"]
        ]],
    ],
    // 25: [], // werken mondkapjes wel? schrikbeeld italië? opiniestukken? scholensluiting?
    29: [ // zorg voor minder []
        ["g('lockdown')", [
            [5, "Meerderheid steunt corona&shy;maatregelen, maar lockdown is controversieel"]
        ]],
        ["!measureCount(5)", [
            [5, "Weinig vertrouwen in coronaminster $lname, meerderheid wil meer maatregelen"]
        ]],
        ["g('curfew')", [
            [5, "Meerderheid steunt corona&shy;maatregelen, maar avondklok is controversieel"]
        ]],
        ["g('masks')", [
            [5, "Grote meerderheid steunt corona&shy;maatregelen, mondkapjes wel impopulair"]
        ]],
        ["true", [
            [5, "Veel vertrouwen in minster $lname én de maatregelen tegen het coronavirus"]
        ]]
    ],
    32: [
        [0, "`Hoopvolle en alarmerende speech van koning schudt Nederlanders wakker'"],
        [0, "Koning in zeldzame toespraak: `Corona&shy;virus niet te stoppen, eenzaamheidsvirus wel'"],
        [1, "Miljoenen zien toespraak van de koning: `We moeten hier samen doorheen'"]
    ]
}

var lastNews = -1;

function getNews() {
    if (day in nws) {
        if (nws[day][0][0] % 1 == 0) {
            rI = randInt(0, nws[day].length - 1);
            pairs[nws[day][rI][0]].push(pairs[nws[day][rI][0]].shift());
            source = pairs[nws[day][rI][0]][0];
            title = vars(nws[day][rI][1]);
            lastNews = day;
            return;
        } else {
            for (var i = 0; i < nws[day].length; i++) {
                if (eval(nws[day][i][0])) {
                    rI = randInt(0, nws[day][i][1].length - 1);
                    pairs[nws[day][i][1][rI][0]].push(pairs[nws[day][i][1][rI][0]].shift());
                    source = pairs[nws[day][i][1][rI][0]][0];
                    title = vars(nws[day][i][1][rI][1]);
                    lastNews = day;
                    return;
                }
            }
        }
    }
}

function measureCount(c) {
    for (const [k, v] of Object.entries(a)) { if (v[0] > 0) { c-- }; if (c == 0) return true; };
}

var prio = { "edlow": "kinderen blijven thuis", "curfew": "avondklok ingevoerd", "shops": "alleen essentiële winkels open", "horeca": "horeca gesloten", "border": "grenzen gesloten", "edmid": "middelbare scholen gesloten", "events": "evenementen verboden", "eduni": "hoger onderwijs dicht", "socdis": "afstand van elkaar houden", "workhome": "vaker thuiswerken", "theater": "geen theater meer", "clubs": "nachtclubs dicht", "gather": "bijeenkomsten verboden", "masks": "een mondkapje dragen" };

function announce() {
    var an = [];
    for (const [k, v] of Object.entries(prio)) { console.log(k); if (g(k)) an.push(v); if (an.length == 2) break }
    var rtxt = an[0] + " en " + an[1];
    return rtxt
}

function vars(a) {
    a = a.replace("$lname", lname);
    a = a.replace("$lastweekpos", s.Ps[day] + s.Ps[day - 1] + s.Ps[day - 2] + s.Ps[day - 3] + s.Ps[day - 4] + s.Ps[day - 5] + s.Ps[day - 6]);
    a = a.replace("$totalpos", s.Ps.reduce((p, a) => p + a, 0));
    a = a.replace("$announced", announce());
    a = a.replace("`", "‘");
    a = a.replace("'", "’")
    return a;
}