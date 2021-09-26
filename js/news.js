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
        [2, "Eerste overleden coronapatiënt (86) uit Oud-Beijerland `was ontzettend lieve man'"],
        [2, "Eerste Nederlander (86) aan corona&shy;virus overleden in Rotterdams ziekenhuis"],
        [2, "Eerste corona-dode in Nederland, man (86) had al gezondheids&shy;problemen"]
    ],
    21: [
        ["g('lockdown')", [
            [1, "Nederland volledig op slot: alleen huis uit als het echt nodig is, vermijd grote groepen"],
            [0, "Kabinet kiest voor harde lockdown: alleen je huis nog uit als het echt nodig is"]
        ]],
        ["true", [
            [3, "Afgelopen week $lastweekpos besmettingen: druk op kabinet om maatregelen te nemen groeit"],
            [3, "Kabinet neemt vooralsnog geen landelijke maatregelen, is dat wel verantwoord?"],
            [3, "Explosief aantal corona&shy;besmettingen: `Wanneer gaat de politiek ingrijpen?'"]
        ]],
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

function vars(a) {
    a = a.replace("$lname", lname);
    a = a.replace("$lastweekpos", s.Ps[day] + s.Ps[day - 1] + s.Ps[day - 2] + s.Ps[day - 3] + s.Ps[day - 4] + s.Ps[day - 5] + s.Ps[day - 6]);
    a = a.replace("$totalpos", s.Ps.reduce((p, a) => p + a, 0));
    a = a.replace("`", "‘");
    a = a.replace("'", "’")
    return a;
}