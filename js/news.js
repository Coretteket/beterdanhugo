function week(a) {
    a == null && (a = day);
    var b = new Date(1e3 * epoch + 864e5 * a);
    b.setUTCDate(b.getUTCDate() + 4 - (b.getUTCDay() || 7));
    var c = new Date(Date.UTC(2020, 0, 1));
    return Math.ceil(((b - c) / 864e5 + 1) / 7)
}

function shuffle(a) { for (let b, c = a.length; 0 != c;) b = Math.floor(Math.random() * c), c--, [a[c], a[b]] = [a[b], a[c]]; return a }

var outlets = { nos: "NOS", rtl: "RTL", nu: "NU.nl", vk: "Volkskrant", tgf: "Telegraaf", nrc: "NRC", trouw: "Trouw", ad: "AD", parool: "Parool", metro: "Metro", bnr: "BNR", "1v": "EenVandaag", hvnl: "Hart van Nederland", reuters: "Reuters", ap: "Associated Press", bbc: "BBC", nyt: "New York Times", wsj: "Wall Street Journal", cnn: "CNN" };

pairs = [
    ["nos", "rtl", "nu", "ad"],
    ["vk", "tgf"],
    ["nrc", "trouw", "parool"],
    ["metro", "bnr"],
    ["1v", "hvnl"],
    ["bbc", "cnn"],
    ["nyt", "wsj"],
    ["reuters", "ap"]
];

for (const b in pairs) pairs[b] = pairs[b].map(b => ({ value: b, sort: Math.random() })).sort((b, c) => b.sort - c.sort).map(({ value: b }) => b);

var lastNews = -1;
var lastCat = -1;
var rdelay = 30;
var repeat = {};

function getNews() {
    if (day in repeat && delete repeat[day], !(20 > day)) { if (3 > day - lastNews) return; if (5 > day - lastNews && .5 < Math.random()) return } else if (![11, 14, 18].includes(day)) return;
    shuffle(nws);
    var max = [1e3, -1];
    for (i in nws) {
        if (nws[i][0] < max[0] && eval(nws[i][4]) && lastCat != nws[i][1] && !Object.values(repeat).includes(nws[i][5])) {
            max = [nws[i][0], i];
            if (max == 0) break;
        }
    }
    if (max[0] == 1e3) return;
    repeat[day + rdelay] = nws[max[1]][5];
    lastNews = day;
    lastCat = nws[max[1]][1];
    if (nws[max[1]].length > 6) chos[day + 1] = cchos[nws[max[1]][6]];
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
    a = a.replace("'", "’")
    return a;
}

// 0. coronacijfers
// 1. opinie
// 2. maatregelen
// 3. tweede kamer
// 4. experts
// 5. peiling
// 6. event 

var nws = [
    // vast nieuws
    [0, 0, 0, "Eerste Nederlander met coronavirus opgenomen in Tilburg, `man vierde carnaval'", "q11", 'b5'],
    [0, 0, 0, "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië", "q11", 'b5'],
    [0, 0, 0, "Eerste besmetting coronavirus in Nederland: patiënt (56) in Tilburg geïsoleerd", "q11", 'b5'],
    [0, 0, 0, "Ondernemer uit Loon op Zand is eerste coronapatiënt in Nederlands ziekenhuis", "q11", 'b5'],
    [0, 4, 1, "Viroloog over verslaggeving coronavirus: `Overdrijven we niet een beetje?'", "q14i0", 'zl'],
    [0, 4, 1, "Geen reden tot zorgen door coronavirus: `Nederland is het best voorbereide land'", "q14i0", 'zl'],
    [0, 4, 2, "Zijn we voorbereid op een epidemie? `Kabinet moet niet bang zijn om in te grijpen'", "q14I0", 'zl'],
    [0, 4, 2, "`Het verleden leert ons: maatregelen tegen een epidemie komen eigenlijk altijd te laat'", "q14I0", 'zl'],
    [0, 0, 0, "Eerste overleden coronapatiënt (86) uit Oud-Beijerland `was ontzettend lieve man'", "q18", 'WO'],
    [0, 0, 0, "Eerste Nederlander (86) aan coronavirus overleden in Rotterdams ziekenhuis", "q18", 'WO'],
    [0, 0, 1, "Eerste corona-dode in Nederland, man (86) had al gezondheidsproblemen", "q18", 'WO'],
    // maatregelen
    //// lockdown
    [1, 2, 0, "Strenge maatregelen aangekondigd: vrijwel alles gesloten, iedereen blijft thuis", "MM14", 'wv'],
    [1, 2, 0, "Kabinet kiest voor harde lockdown: alleen je huis nog uit als het echt nodig is", "MM14", 'wv'],
    [1, 2, 0, "Nederland in lockdown: thuisblijven wordt de norm, alle gelegenheden dicht", "MM14", 'wv'],
    //// scholen
    [6, 1, 0, "Scholen gewoon open ondanks corona? `Mijn kinderen blijven thuis'", "D50i1nj0", "sc"],
    [6, 1, 2, "`Als het niet veilig is op kantoor, is het voor kinderen ook niet veilig op school'", "D50i1ma0nj0", "sc"],
    [6, 1, 0, "Leraren roepen kabinet op tot scholensluiting, steeds meer scholen vrijwillig dicht", "D50i1nj0", "sc"],
    //// mondkapjes
    [4, 4, 1, "We moeten mondkapjes dragen, maar `het is onwaarschijnlijk dat ze werken'", "MC30D75", 'Lu'],
    [4, 4, 1, "RIVM-baas Van Dissel: `Er is simpelweg geen bewijs voor mondkapjesplicht'", "MC30D75", 'Lu'],
    [4, 4, 2, "Zorg dreigt in de knel te komen door mondkapjestekort na verplichting", "MC30D75", 'Lu'],
    [4, 4, 2, "WHO adviseert tegen mondkapjes: waarom voert De Jonge toch plicht in?", "MC30D75", 'Lu'],
    // waarschuwingen
    [1, 4, 2, "`Kabinet moet nu maatregelen nemen, of de zorg ligt binnen twee weken plat'", "d22D35I0", "RI"],
    [1, 4, 0, "Geen grip op virus: artsen waarschuwen voor `code zwart' in ziekenhuizen", "d22D35i0I2", "RI"],
    [1, 1, 0, "Kabinet zet geen grote stappen: is dit wel genoeg om het virus in toom te houden?", "d22D35i0I2", "RI"],
    [2, 3, 1, "Felle kritiek op minister De Jonge in coronadebat: `Grijp in of stap op'", "d25D40I0", "Xf", "noMeasureMotion"],
    [2, 3, 1, "Tweede Kamer woedend op De Jonge: `Luister naar de helden in de zorg'", "d25D40I0", "Xf", "noMeasureMotion"],
    //ziekenhuizen
    [1, 0, 0, "Ziekenhuizen zetten zich schrap: `Alle noodscenario's worden uit de kast getrokken'", "h100r2", 'kJ'],
    [1, 0, 0, "Elke dag dichterbij `code zwart': wat gebeurt er als er geen bedden meer zijn?", "h100r2", 'kJ'],
    [1, 0, 0, "Ziekenhuizen overweldigd door `tsnunami aan coronapatiënten', capaciteit nadert", "h100r2", 'kJ'],
    // events
    [9, 6, 2, "`Hoopvolle en alarmerende toespraak van koning schudt Nederlanders wakker'", "w12I2", "MD"],
    [9, 6, 2, "Koning in zeldzame toespraak: `Coronavirus niet te stoppen, eenzaamheidsvirus wel'", "w12i2", "MD"],
    [9, 6, 2, "Miljoenen zien toespraak van de koning: `We moeten hier samen doorheen'", "w12", "MD"],
]

var conds = { w: "week()==", q: "day==", d: "day", i: "index", s: "stringency", h: "s.H", r: "s.Rt" }

function checkm(b) { if (0 < a[b][0]) return day - a[b][0] }

function checkn(b) { if (0 >= a[b][0]) return day + a[b][0] }

for (j in nws) {
    var cond = nws[j][4].match(/[^\d\.\|]+|\d+|\.+|\|+/g),
        ret = "";
    for (i in cond) {
        var cc = cond[i];
        lc = cond[i].toLowerCase();
        if (lc.startsWith("m") || lc.startsWith("n")) {
            ret += "&&check" + lc[0] + "('" + Object.keys(a)[lc.charCodeAt(1) - 97] + "')"
            ret += (cc == lc) ? ">" : "<=";
        } else if (cc.match(/[a-z]/i)) {
            ret += "&&" + conds[lc]
            if (!ret.endsWith("==")) ret += (cc == lc) ? ">" : "<=";
            if (lc == "i") ret += "0.";
        } else {
            ret += cc;
        }
    }
    nws[j][4] = ret.replace("|&&", "|").substring(2);
}


//remove on launch
function b64() { for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", b = "", c = 0; 2 > c; c++) b += a.charAt(Math.floor(Math.random() * a.length)); return b }