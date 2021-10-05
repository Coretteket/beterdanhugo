var outlets = { nos: "NOS", rtl: "RTL", nu: "NU.nl", volkskrant: "Volkskrant", telegraaf: "Telegraaf", nrc: "NRC", trouw: "Trouw", ad: "AD", parool: "Parool", metro: "Metro", bnr: "BNR", "1v": "EenVandaag", hvnl: "Hart van Nederland", reuters: "Reuters", ap: "Associated Press", bbc: "BBC", nyt: "New York Times", wsj: "Wall Street Journal", cnn: "CNN" };

var pairs = [
    ["nos", "rtl", "nu", "ad"],
    ["volkskrant", "telegraaf"],
    ["nrc", "trouw", "parool"],
    ["metro", "bnr"],
    ["1v", "hvnl"],
    ["bbc", "cnn"],
    ["nyt", "wsj"],
    ["reuters", "ap"]
];

for (const e in pairs) {
    pairs[e] = pairs[e].map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
}

var nws = {
    11: [
        [0, "Eerste Nederlander met coronavirus opgenomen in Tilburg, `man vierde carnaval'"],
        [0, "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië"],
        [0, "Eerste besmetting coronavirus in Nederland: patiënt (56) in Tilburg geïsoleerd"],
        [0, "Ondernemer uit Loon op Zand is eerste coronapatiënt in het ziekenhuis"]
    ],
    14: [
        [1, "Viroloog over verslaggeving coronavirus: `Overdrijven we niet een beetje?'"],
        [1, "Volgens het RIVM nog geen reden tot zorgen: `Nederland het best voorbereid'"],
        [2, "Zijn we voorbereid op een epidemie? `Kabinet moet niet bang zijn om in te grijpen'"],
        [2, "`Het verleden leert ons: maatregelen tegen een epidemie komen eigenlijk altijd te laat'"],
    ],
    18: [
        [0, "Eerste overleden coronapatiënt (86) uit Oud-Beijerland `was ontzettend lieve man'"],
        [0, "Eerste Nederlander (86) aan corona&shy;virus overleden in Rotterdams ziekenhuis"],
        [1, "Eerste corona-dode in Nederland, man (86) had al gezondheids&shy;problemen"]
    ],
    21: [
        ["g('lockdown')", [
            [0, "Nederland volledig op slot: alleen huis uit als het echt nodig is, vermijd grote groepen"],
            [0, "Kabinet kiest voor harde lockdown: alleen je huis nog uit als het echt nodig is"]
        ]],
        ["measureCount(2)", [
            [0, "Kabinet in persconferentie: $announced"],
            [0, "Maatregelen tegen corona: $announced"],
        ]],
        [true, [
            [2, "Afgelopen week $lastweekpos besmettingen: druk op kabinet om maatregelen te nemen groeit"],
            [2, "Kabinet neemt vooralsnog geen landelijke maatregelen, is dat wel verantwoord?"],
            [2, "Steeds meer corona&shy;besmettingen: `De politiek moet ingrijpen voor het te laat is'"]
        ]],
    ],
    25: [
        ["measureCount(5)&&g('masks')", [
            [1, "We moeten mondkapjes gaan dragen, maar `het is onwaarschijnlijk dat ze werken'"],
            [1, "RIVM-baas Van Dissel: `Er is simpelweg geen bewijs voor mondkapjesadvies'"],
            [1, "Zorg dreigt in de knel te komen door mondkapjestekort na oproep kabinet"]
        ]],
        ["measureCount(5)&&g('workhome')&&!g('edlow')&&!g('edmid')", [
            [1, "Kritiek op kabinet tijdens virusdebat: `Openhouden scholen niet uit te leggen'"],
            [1, "Zorgen in Tweede Kamer: `Onbegrijpelijk dat scholen niet dicht moeten'"]
        ]],
        ["!measureCount(5)", [
            [0, "Tweede Kamer kritisch in virusdebat, roept kabinet op harder in te grijpen"],
            [0, "Kamermeerderheid steunt oppositiemotie: kabinet moet actiever coronabeleid voeren"]
        ]]
    ], // werken mondkapjes wel? schrikbeeld italië? opiniestukken? scholensluiting?
    29: [
        ["g('lockdown')", 4, "Meerderheid steunt corona&shy;maatregelen, maar lockdown is controversieel"],
        ["!measureCount(5)", 4, "Weinig vertrouwen in minister $lname, $poll29% heeft grote zorgen over corona"],
        ["g('curfew')", 4, "Meerderheid steunt corona&shy;maatregelen, maar avondklok is controversieel"],
        ["g('masks')", 4, "Meerderheid steunt maatregelen tegen corona, mondkapjes wel impopulair"],
        [true, 4, "Veel vertrouwen in minster $lname: $poll29% steunt maatregelen tegen coronavirus"]
    ],
    32: [
        [2, "`Hoopvolle en alarmerende speech van koning schudt Nederlanders wakker'"],
        [2, "Koning in zeldzame toespraak: `Corona&shy;virus niet te stoppen, eenzaamheidsvirus wel'"],
        [2, "Miljoenen zien toespraak van de koning: `We moeten hier samen doorheen'"]
    ],
    35: [
        [0, "Boop"],
    ],
}

var ovr = [
    ["s.IC > 600 - 6 * Math.sqrt(s.IC)", [
        [0, "Zorg bedwelmd"]
    ]]
]

var lastNews = -1;

function handleOutlets(pair) {
    pair.push(pair.shift());
    if (pair.length == 4 && Math.random() > 0.5) pair[2] = pair.splice(3, 1, pair[2])[0];
    source = pair[0];
}

function getNews() {
    if (day in nws) {
        lastNews = day;
        for (var i = 0; i < ovr.length; i++) {
            if (eval(ovr[i][0])) {
                rI = randInt(0, ovr[i][1].length - 1);
                handleOutlets(pairs[ovr[i][1][rI][0]]);
                title = vars(ovr[i][1][rI][1]);
                ovr.splice(rI, 1);
                return;
            }
        }
        if (nws[day][0][0] % 1 == 0) {
            rI = randInt(0, nws[day].length - 1);
            handleOutlets(pairs[nws[day][rI][0]]);
            title = vars(nws[day][rI][1]);
            return;
        } else if (nws[day][0][1] % 1 == 0) {
            for (var i = 0; i < nws[day].length; i++) {
                if (eval(nws[day][i][0])) {
                    handleOutlets(pairs[nws[day][i][1]]);
                    title = vars(nws[day][i][2]);
                    return;
                }
            }
        } else {
            for (var i = 0; i < nws[day].length; i++) {
                if (eval(nws[day][i][0])) {
                    rI = randInt(0, nws[day][i][1].length - 1);
                    handleOutlets(pairs[nws[day][i][1][rI][0]]);
                    title = vars(nws[day][i][1][rI][1]);
                    return;
                }
            }
        }
    }
}

function measureCount(c) {
    for (const [k, v] of Object.entries(a)) { if (v[0] > 0) { c-- }; if (c == 0) return true; };
}

var prio = { edlow: "kinderen blijven thuis", curfew: "avondklok ingevoerd", shops: "niet-essenti\xEBle winkels dicht", horeca: "alle horeca dicht", border: "grenzen gesloten", edmid: "middelbare scholen dicht", events: "evenementen verboden", eduni: "hoger onderwijs dicht", socdis: "afstand van elkaar houden", workhome: "vaker thuiswerken", theater: "cultuursector dicht", clubs: "nachtclubs dicht", gather: "bijeenkomsten verboden", masks: "een mondkapje dragen" };

function announce() {
    var an = [];
    if (g("shops") && g("horeca") && measureCount(3)) {
        var oth = "";
        for (const [k, v] of Object.entries(prio)) { if (g(k) && k != "shops" && k != "horeca") { oth = v; break } };
        rtxt = oth + ", horeca en winkels gesloten"
    } else {
        for (const [k, v] of Object.entries(prio)) { if (an.length == 2) break; if (g(k)) an.push(v); }
        var rtxt = an[1] + " en " + an[0];
    }
    if ((rtxt.match(/dicht/g) || []).length == 2) rtxt = rtxt.replace("dicht", '');
    return rtxt
}

function vars(a) {
    a = a.replace("$lname", lname);
    a = a.replace("$lastweekpos", s.Ps[day] + s.Ps[day - 1] + s.Ps[day - 2] + s.Ps[day - 3] + s.Ps[day - 4] + s.Ps[day - 5] + s.Ps[day - 6]);
    a = a.replace("$totalpos", s.Ps.reduce((p, a) => p + a, 0));
    a = a.replace("$announced", announce());
    a = a.replace("$poll29", randInt(71,79));
    a = a.replace("`", "‘");
    a = a.replace("'", "’")
    return a;
}