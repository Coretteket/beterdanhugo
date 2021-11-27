function week(a) {
    a == null && (a = day);
    var b = new Date(1e3 * epoch + 864e5 * a);
    b.setUTCDate(b.getUTCDate() + 4 - (b.getUTCDay() || 7));
    var c = new Date(Date.UTC(2020, 0, 1));
    return Math.ceil(((b - c) / 864e5 + 1) / 7)
}

function shuffle(a) { for (let b, c = a.length; 0 != c;) b = Math.floor(Math.random() * c), c--, [a[c], a[b]] = [a[b], a[c]]; return a }

var outlets = { nos: "NOS", rtl: "RTL", nu: "NU.nl", vk: "Volkskrant", tgf: "Telegraaf", nrc: "NRC", trouw: "Trouw", ad: "AD", parool: "Parool", metro: "Metro", bnr: "BNR", "1v": "EenVandaag", hvnl: "Hart van Nederland", reuters: "Reuters", ap: "Associated Press", bbc: "BBC", nyt: "New York Times", wapo: "Washington Post", cnn: "CNN" };

pairs = [
    ["nos", "rtl", "nu", "ad"],
    ["vk", "tgf"],
    ["nrc", "trouw", "parool"],
    ["metro", "bnr"],
    ["1v", "hvnl"],
    ["bbc", "cnn"],
    ["nyt", "wapo"],
    ["reuters", "ap"]
];

for (const b in pairs) pairs[b] = pairs[b].map(b => ({ value: b, sort: Math.random() })).sort((b, c) => b.sort - c.sort).map(({ value: b }) => b);

var lastNews = -1;
var lastCat = -1;
var rdelay = 30;
var repeat = {};
var nwscnt = 0;

function getNews() {
    if (day in repeat && delete repeat[day], !(20 > day)) { if (3 > day - lastNews) return; if (5 > day - lastNews && .3 < Math.random()) return } else if (![11, 14, 18].includes(day)) return;
    nwscnt++;
    lastNews = day;
    shuffle(nws);
    var max = [1e3, -1];
    for (i in nws) {
        if (nws[i][0] < max[0] && eval(nws[i][4]) && (lastCat != nws[i][1] || nws[i][0] == 0) && !Object.values(repeat).includes(nws[i][5])) {
            max = [nws[i][0], i];
            if (max == 0) break;
        }
    }
    if (max[0] == 1e3) return;
    repeat[day + rdelay] = nws[max[1]][5];
    lastNews = day;
    lastCat = nws[max[1]][1];
    // if (nws[max[1]].length > 6) chos[day + 1] = cchos[nws[max[1]][6]];
    var pair = pairs[nws[max[1]][2]];
    pair.push(pair.shift());
    4 == pair.length && .5 < Math.random() && (pair[2] = pair.splice(3, 1, pair[2])[0]);
    source = pair[0];
    title = vars(nws[max[1]][3]);
    nws.splice(max[1], 1);
}

function vars(a) {
    // a = a.replace("De Jonge", lname);
    a = a.replace("`", "‘");
    a = a.replace("'", "’");
    if (!a.includes("$")) return a;
    a = a.replace("$deadrounded", (Math.round(s.tD / 1000) * 1000).toLocaleString("nl-NL"));
    a = a.replace("$dead", s.tD.toLocaleString("nl-NL"));
    a = a.replace("$firstpoll", Math.round((randBetween(.4,.5) + index ** 2 * 0.4 - (s.H / 1600) / 6) * 100));
    return a;
}

var nws = [
    // 0. ziekenhuis
    [1, 0, 0, "Ziekenhuizen zetten zich schrap: `Alle noodscenario's worden uit de kast getrokken'", "h100r2c0", 'kJ'],
    [1, 0, 0, "Elke dag dichterbij `code zwart': wat gebeurt er als er geen bedden meer zijn?", "h100r2c0", 'kJ'],
    [1, 4, 0, "Geen grip op virus: artsen waarschuwen voor `code zwart' in ziekenhuizen", "h100r2c0", "kJ"],
    [1, 0, 0, "Ziekenhuizen overweldigd door `tsnunami aan coronapatiënten', capaciteit nadert", "h100r2c0", 'kJ'],
    [1, 0, 0, "Ziekenhuisbestuurders waarschuwen kabinet: `Meer opnames kunnen we niet aan'", "h100r2c0", 'kJ'],
    [2, 0, 0, "Steeds meer coronapatiënten in het ziekenhuis, `ook impact op reguliere zorg'", "h100H400c0", 'Ov'],
    [2, 0, 0, "Capaciteitsproblemen dreigen in zorg als aantal besmettingen blijft stijgen", "h100H400c0", 'Ov'],
    [3, 0, 1, "Groot deel `planbare zorg' afgeschaald: experts vrezen voor `schaduwpandemie'", "h200H400c0D100", 'xB'],
    [3, 0, 1, "Reguliere zorg wordt in de wacht gezet terwijl corona-afdelingen volstromen", "h200H400c0D100", 'xB'],
    // 1. doden
    [5, 1, 1, "Een maand na eerste coronadode: inmiddels meer dan $dead mensen overleden", "w15t1T10", 'lk'],
    [5, 1, 1, "Eerste coronadode een maand geleden, nu meer dan $dead mensen overleden", "w15t1T10", 'lk'],
    [5, 1, 1, "Een maand na eerste coronadode: inmiddels ongeveer $dead mensen overleden", "w15T1", 'lk'],
    [5, 1, 1, "Eerste coronadode een maand geleden, nu circa $dead mensen overleden", "w15T1", 'lk'],
    [1, 1, 0, "Meer dan $deadrounded coronapatiënten overleden, `werkelijk aantal nog hoger'", "t10", 'lk'],
    [1, 1, 0, "RIVM telt meer dan $deadrounded coronadoden, volgens experts zijn het er nog meer", "t10", 'lk'],
    // 2. opinie / explainers
    [3, 2, 0, "Scholen gewoon open ondanks corona? `Mijn kinderen blijven thuis'", "D50i1nj0ma0", "sc"],
    [3, 2, 2, "`Als ik niet naar kantoor mag, kunnen mijn kinderen niet veilig naar school'", "D50i1ma0nj0ma0", "sc"],
    [3, 2, 0, "Leraren roepen kabinet op tot sluiting scholen, steeds meer scholen blijven dicht", "D50i1nj0ma0", "sc"],
    [1, 2, 2, "Kabinet zet geen grote stappen: is dit wel genoeg om het virus in toom te houden?", "d20D35i0I2", "RI"],
    [1, 2, 2, "Heel Europa grijpt in: waarom neemt Nederland zo weinig maatregelen?", "d20D35i0I2", "RI"],
    [1, 2, 2, "`Kabinet moet nu maatregelen nemen, of de zorg ligt binnen twee weken plat'", "d20D35I0", "RI"],
    [6, 2, 2, "Aantal positieve testen stabiliseert, `beperkte testcapaciteit de oorzaak'", "p4000C0D100", "Bh"],
    [6, 2, 2, "GGD: zicht op virus kwijt, stabilisatie aantal positieve testen nietszeggend", "p4000C0D100", "Bh"],
    // 3. maatregelen
    [1, 3, 0, "Strenge maatregelen aangekondigd: vrijwel alles gesloten, iedereen blijft thuis", "MM14", 'wv'],
    [1, 3, 0, "Kabinet kiest voor harde lockdown: alleen je huis nog uit als het echt nodig is", "MM14", 'wv'],
    [1, 3, 0, "Nederland in lockdown: thuisblijven wordt de norm, alle gelegenheden dicht", "MM14", 'wv'],
    // 4. tweede kamer / minister
    [2, 4, 1, "Felle kritiek op minister De Jonge in coronadebat: `Grijp in of stap op'", "d25D40H1500I0", "Xf"],
    [2, 4, 1, "Tweede Kamer woedend op De Jonge: `Luister naar de helden in de zorg'", "d25D40H1500I0", "Xf"],
    [2, 4, 0, "De Jonge bekrachtigt: alle niet-kritieke operaties worden voorlopig afgebeld", "h400H1000c0", "Gv"],
    [2, 4, 0, "Minister bekrachtigt laatste fase voor code zwart,  zelfs chemokuren uitgesteld", "h400H1000c0", "Gv"],
    [0, 4, 0, "Tweede Kamer steunt motie van afkeuring, `zorginfarct was niet onvermijdbaar'", "h1500c0", "QC"],
    [0, 4, 0, "In coronadebat bijna unanieme afkeuring: `Tragische gevolgen van wanbeleid'", "h1500c0", "QC"],
    // 5. experts
    [4, 5, 1, "We moeten mondkapjes dragen, maar `het is onwaarschijnlijk dat ze werken'", "MC30D75", 'Lu'],
    [4, 5, 1, "RIVM-baas Van Dissel: `Er is simpelweg geen bewijs voor mondkapjesplicht'", "MC30D75", 'Lu'],
    [4, 5, 2, "Zorg dreigt in de knel te komen door mondkapjestekort na verplichting", "MC30D75", 'Lu'],
    [4, 5, 2, "WHO adviseert tegen mondkapjes: waarom voert De Jonge toch plicht in?", "MC30D75", 'Lu'],
    [3, 5, 2, "IC-arts Gommers: `Kabinet kiest voor een coronaramp door niet in te grijpen'", "h800I0c0", "CM"],
    [3, 5, 3, "IC-voorzitter Gommers: `Schuld voor coronaramp ligt ongetwijfeld bij kabinet'", "h800I0c0", "CM"],

    // 6. peiling
    [5, 6, 4, "Coronabeleid heeft weinig steun: slechts $firstpoll% heeft vertrouwen in De Jonge", "h1000D75", "yj"],
    [5, 6, 4, "Weinig vertrouwen in De Jonge: slechts $firstpoll% steunt coronabeleid kabinet", "h1000D75", "yj"],
    [5, 6, 4, "Grote meerderheid heeft zorgen over corona, circa $firstpoll% steunt maatregelen", "H1000i2D75", "yj"],
    [5, 6, 4, "Gezondheidszorg door corona belangrijkste thema, $firstpoll% heeft vertrouwen in De Jonge", "H1000i2D75", "yj"],

    // 7. event
    [0, 7, 0, "Eerste Nederlander met coronavirus opgenomen in Tilburg, `man vierde carnaval'", "q11", 'b5'],
    [0, 7, 0, "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië", "q11", 'b5'],
    [0, 7, 0, "Eerste besmetting coronavirus in Nederland: patiënt (56) in Tilburg geïsoleerd", "q11", 'b5'],
    [0, 7, 0, "Ondernemer uit Loon op Zand is eerste coronapatiënt in Nederlands ziekenhuis", "q11", 'b5'],
    [0, 7, 1, "Viroloog over verslaggeving coronavirus: `Overdrijven we niet een beetje?'", "q14i0", 'zl'],
    [0, 7, 1, "Geen reden tot zorgen door coronavirus: `Nederland is het best voorbereide land'", "q14i0", 'zl'],
    [0, 7, 2, "Zijn we voorbereid op een epidemie? `Kabinet moet niet bang zijn om in te grijpen'", "q14I0", 'zl'],
    [0, 7, 2, "`Het verleden leert ons: maatregelen tegen een epidemie komen eigenlijk altijd te laat'", "q14I0", 'zl'],
    [0, 7, 0, "Eerste overleden coronapatiënt (86) uit Oud-Beijerland `was ontzettend lieve man'", "q18", 'WO'],
    [0, 7, 0, "Eerste Nederlander (86) aan coronavirus overleden in Rotterdams ziekenhuis", "q18", 'WO'],
    [0, 7, 1, "Eerste corona-dode in Nederland, man (86) had al gezondheidsproblemen", "q18", 'WO'],
    [5, 7, 2, "`Hoopvolle en alarmerende toespraak van koning schudt Nederlanders wakker'", "w12I2|w13I2", "MD"],
    [5, 7, 2, "Koning in zeldzame toespraak: `Coronavirus niet te stoppen, eenzaamheidsvirus wel'", "w12i2|w13i2", "MD"],
    [5, 7, 2, "Miljoenen zien toespraak van de koning: `We moeten hier samen doorheen'", "w12|w13", "MD"],
]

var conds = { w: "week()==", q: "day==", d: "day", i: "index", s: "stringency", h: "s.nH", r: "s.Rt", c: "s.dH", f: "s.F", t: "s.tD/1000", p: "s.P" }

function checkm(b) { if (0 < a[b][0]) return day - a[b][0] }

function checkn(b) { if (0 >= a[b][0]) return day + a[b][0] }

for (j in nws) {
    var cond = nws[j][4].match(/[^\d\.\|]+|\d+|\.+|\|+/g),
        ret = "";
    for (i in cond) {
        var cc = cond[i];
        lc = cond[i].toLowerCase();
        if (["m", "n"].includes(lc[0])) {
            ret += "&&check" + lc[0] + "('" + Object.keys(a)[lc.charCodeAt(1) - 97] + "')"
            ret += (cc == lc) ? ">" : "<=";
        } else if (cc.match(/[a-z]/i)) {
            ret += "&&" + conds[lc]
            if (!ret.endsWith("==")) ret += (cc == lc) ? ">" : "<=";
            if (lc == "i" || lc == "c") ret += "0.";
        } else {
            ret += cc;
        }
    }
    nws[j][4] = ret.replace("|&&", "||").substring(2);
}

// var crc32 = function(r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
//     o[c] = a } for (var n = -1, t = 0; t < r.length; t++) n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return ((-1 ^ n) >>> 0).toString(36) };

//remove on launch
function b64() { for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", b = "", c = 0; 2 > c; c++) b += a.charAt(Math.floor(Math.random() * a.length)); return b }