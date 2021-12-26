function week(a) {
    a == null && (a = day);
    var b = new Date(1e3 * epoch + 864e5 * a);
    b.setUTCDate(b.getUTCDate() + 4 - (b.getUTCDay() || 7));
    var c = new Date(Date.UTC(2020, 0, 1));
    return Math.ceil(((b - c) / 864e5 + 1) / 7)
}

function shuffle(a) { for (let b, c = a.length; 0 != c;) b = Math.floor(Math.random() * c), c--, [a[c], a[b]] = [a[b], a[c]]; return a }

var outlets = { nos: "NOS", rtl: "RTL", nu: "NU.nl", vk: "Volkskrant", tgf: "Telegraaf", nrc: "NRC", trouw: "Trouw", algd: "AD", parool: "Parool", metro: "Metro", bnr: "BNR", "1v": "EenVandaag", hvnl: "Hart van Nederland", reuters: "Reuters", ap: "Associated Press", bbc: "BBC", nyt: "New York Times", wapo: "Washington Post", cnn: "CNN" };

pairs = [
    ["nos", "rtl", "nu", "algd"], //0
    ["vk", "tgf"], //1
    ["nrc", "trouw", "parool"], //2
    ["metro", "bnr"], //3
    ["1v", "hvnl"], //4
    ["bbc", "cnn"], //5
    ["nyt", "wapo"], //6
    ["reuters", "ap"] //7
];

for (const b in pairs) pairs[b] = pairs[b].map(b => ({ value: b, sort: Math.random() })).sort((b, c) => b.sort - c.sort).map(({ value: b }) => b);

var nextNews = 0;
var lastCat = -1;
var rdelay = 30;
var repeat = {};
var nwscnt = 0;

function getNews() {
    if (![11, 14, 18].includes(day) && day < nextNews) return;
    nwscnt++;
    shuffle(nws);
    var max = [1e3, -1];
    var temparr = [];
    if (dev)
        for (i in nws) {
            if (eval(nws[i][3]) && !Object.values(repeat).includes(nws[i][4])) {
                temparr.push([nws[i][0], nws[i][2], nws[i][3]]);
            }
        }
    for (i in nws) {
        /*&& (lastCat != nws[i][1] || nws[i][0] == 0)*/
        if (nws[i][0] < max[0] && eval(nws[i][3]) && !Object.values(repeat).includes(nws[i][4])) {
            max = [nws[i][0], i];
            if (max[0] == 0) break;
        }
    }
    if (max[0] == 1e3) {
        console.log(day)
        return;
    }
    if (nws[max[1]][4] != undefined) {
        repeat[day + rdelay] = nws[max[1]][4];
    }
    nextNews = day < 18 ? 18 : day + randInt(3, 4);
    // if (nws[max[1]].length > 6) chos[day + 1] = cchos[nws[max[1]][6]];
    var pair = pairs[nws[max[1]][1]];
    pair.push(pair.shift());
    4 == pair.length && .5 < Math.random() && (pair[2] = pair.splice(3, 1, pair[2])[0]);
    source = pair[0];
    title = vars(nws[max[1]][2]);
    nws.splice(max[1], 1);
    if (dev) {
        console.clear();
        console.table(temparr.sort(function(c, a) { return c[0] - a[0] }));
    }
}

function vars(a) {
    // a = a.replace("De Jonge", lname);
    a = a.replace("`", "‘");
    a = a.replace("'", "’");
    if (!a.includes("$")) return a;
    a = a.replace("$deadrounded", (Math.round(s.tD / 1000) * 1000).toLocaleString("nl-NL"));
    a = a.replace("$dead", s.tD.toLocaleString("nl-NL"));
    a = a.replace("$firstpoll", Math.round((randBetween(.4, .5) + index ** 2 * 0.4 - (s.H / 1600) / 6) * 100));
    return a;
}

var nws = [
    // 0. ziekenhuis
    [3, 2, "Steeds meer mensen positief getest, zorg vreest voor drukte op intensive care", "h100H400c5", 'Ov'],
    [3, 2, "Steeds meer coronapatiënten in het ziekenhuis, `ook impact op reguliere zorg'", "h100H400c5", 'Ov'],
    [3, 2, "Capaciteitsproblemen dreigen in zorg als aantal besmettingen blijft stijgen", "h100H400c5", 'Ov'],
    [2, 0, "Ziekenhuizen zetten zich schrap: `Alle noodscenario's worden uit de kast getrokken'", "h2000H800c10", 'kJ'],
    [2, 0, "Elke dag dichterbij `code zwart': wat gebeurt er als er geen bedden meer zijn?", "h2000H800c10", 'kJ'],
    [2, 0, "Geen grip op virus, artsen waarschuwen voor `code zwart' in ziekenhuizen", "h2000H800c10", "kJ"],
    [2, 0, "Ziekenhuizen overweldigd door `tsnunami aan coronapatiënten', capaciteit nadert", "h200H800c10", 'kJ'],
    [2, 0, "Ziekenhuisbestuurders waarschuwen kabinet: `Meer opnames kunnen we niet aan'", "h200H800c10", 'kJ'],
    [3, 1, "Groot deel `planbare zorg' afgeschaald: experts vrezen voor `schaduwpandemie'", "h200H400c5D100", 'xB'],
    [3, 1, "Reguliere zorg wordt in de wacht gezet terwijl corona-afdelingen volstromen", "h200H400c5D100", 'xB'],
    [1, 0, "De Jonge bekrachtigt: alle niet-kritieke operaties worden voorlopig afgebeld", "h400H1000c5", "Gv"],
    [1, 0, "De Jonge: planbare zorg wordt afgeschaald, zelfs chemokuren uitgesteld", "h400H1000c5", "Gv"],

    // 1. doden
    [5, 1, "Een maand na eerste coronadode: inmiddels meer dan $dead mensen overleden", "w15t1T10", 'lk'],
    [5, 1, "Eerste coronadode een maand geleden, nu meer dan $dead mensen overleden", "w15t1T10", 'lk'],
    [5, 1, "Een maand na eerste coronadode: inmiddels ongeveer $dead mensen overleden", "w15T1", 'lk'],
    [5, 1, "Eerste coronadode een maand geleden, nu circa $dead mensen overleden", "w15T1", 'lk'],
    [1, 0, "Meer dan $deadrounded coronapatiënten overleden, `werkelijk aantal nog veel hoger'", "t10", 'lk'],
    [1, 0, "RIVM telt meer dan $deadrounded coronadoden, volgens experts zijn het er veel meer", "t10", 'lk'],

    // 2. opinie / explainers
    [4, 0, "Scholen gewoon open ondanks corona? `Mijn kinderen blijven thuis'", "d24D50i1nj0ma0", "sc"],
    [4, 2, "`Als ik niet naar kantoor kan, stuur ik mijn kinderen niet naar school'", "d24D50i1ma0nj0ma0", "sc"],
    [4, 0, "Leraren roepen op tot sluiting scholen, steeds meer scholen vrijwillig dicht", "d24D50i1nj0ma0", "sc"],
    [1, 2, "Kabinet zet geen grote stappen: is dit wel genoeg om het virus in toom te houden?", "d23D35i0I2", "RI"],
    [1, 1, "Heel Europa grijpt in: waarom neemt Nederland zo weinig maatregelen?", "d23D35i0I2", "RI"],
    [1, 1, "Heel Europa grijpt in: waarom doet alleen Nederland niets tegen corona?", "d23D35I0", "RI"],
    [1, 2, "`Kabinet moet nu maatregelen nemen, of de zorg ligt binnen twee weken plat'", "d23D35I0", "RI"],
    [5, 2, "Aantal positieve testen stabiliseert door `veel te kleine testcapaciteit'", "p4000C0D100", "Bh"],
    [5, 2, "GGD: zicht op virus kwijt, stabilisatie aantal positieve testen nietszeggend", "p4000C0D100", "Bh"],

    // 3. maatregelen
    [4, 2, "`Flatten the curve': waarom ziekenhuizen voor strenge coronamaatregelen pleiten", "d18D35I5", 'AU'],
    [4, 2, "`Flatten the curve': waarom maatregelen tegen het coronavirus broodnodig zijn", "d18D35", 'AU'],
    [4, 2, "Wat `flatten the curve' betekent, en waarom daarvoor maatregelen nodig zijn", "d18D35", 'AU'],
    [1, 0, "Complete lockdown aangekondigd: vrijwel alles gesloten, iedereen blijft thuis", "MM14", 'wv'],
    [1, 0, "Kabinet kiest voor harde lockdown: alleen je huis nog uit als het echt nodig is", "MM14", 'wv'],
    [1, 0, "Nederland in lockdown: thuisblijven wordt de norm, alle gelegenheden dicht", "MM14", 'wv'],
    [3, 2, "Miljoenen kinderen thuis door sluiting scholen: `Juiste keuze in onzekere tijden'", "mj0D75", 'dp'],
    [3, 1, "Scholen sluiten hun deuren: leraren vroegen erom, maar virologen twijfelden", "mj0D75H300", 'dp'],
    [7, 0, "Minister De Jonge doet oproep: `Houd afstand en werk zo veel mogelijk thuis'", "MA14MB14", 'bX'],
    [9, 3, "Veel evenementen geschrapt door corona, organisaties vragen om compensatie", "MD30", "DW"],
    [9, 3, "Lege theaterzalen bedreigen cultuursector, organisaties hopen op steunregeling", "ME30", "DW"],
    [8, 3, "Evenementen en theater in coronatijd: geschrapt, verplaatst, en online alternatief", "md14me14", "DW"],
    [6, 2, "Door coronamaatregelen een begrafenis missen: hoe rouw je in tijden van corona?", "mf0d40", 'I6'],
    [6, 2, "Niet knuffelen met stervende, niet naar begrafenis: hoe rouw je in tijden van corona?", "mf0d40", 'I6'],
    [9, 0, "Nachtleven komt stil te liggen: lobby heeft begrip, maar teleurstelling overheerst", "MH14d40", 'I6'],
    [5, 0, "Grote strop voor ondernemers: horeca moet tijdelijk dicht vanwege coronavirus", "MG14", '4H'],
    [5, 0, "Veel winkels moet deuren sluiten, ondernemers vragen om miljarden overheidssteun", "MI14", '4H'],
    [4, 0, "Niet-essentiële winkels en horeca op slot, `harde klap voor duizenden ondernemers'", "MG14MI14", '4H'],
    [4, 0, "Verslagenheid bij ondernemers: meeste winkels en restaurants dicht door coronavirus", "MG14MI14", '4H'],

    // 4. tweede kamer / minister
    [4, 1, "Felle kritiek op minister De Jonge vanuit oppositie: `Grijp in of stap op'", "d25D50h200I0", "Xf"],
    [4, 1, "Oppositie woedend op De Jonge: `Luister naar de helden in de zorg'", "d25D50h200I0", "Xf"],
    [0, 0, "Tweede Kamer steunt motie van afkeuring, `zorginfarct was niet onvermijdbaar'", "h1500c5", "QC"],
    [0, 0, "In coronadebat bijna unanieme afkeuring: `Tragische gevolgen van wanbeleid'", "h1500c5", "QC"],

    // 5. experts
    [6, 1, "We moeten mondkapjes dragen, maar `het is onwaarschijnlijk dat ze werken'", "MC30D75H200", 'Lu'],
    [6, 1, "RIVM-baas Van Dissel: `Er is simpelweg geen bewijs voor mondkapjesplicht'", "MC30D75H200", 'Lu'],
    [6, 2, "WHO adviseert tegen mondkapjes: waarom voert De Jonge toch plicht in?", "MC30D75H200", 'Lu'],
    [3, 2, "IC-arts Gommers: `Kabinet kiest voor een coronaramp door niet in te grijpen'", "h800I0c5", "CM"],
    [3, 3, "IC-voorzitter Gommers: `Schuld voor coronaramp ligt ongetwijfeld bij kabinet'", "h800I2c5", "CM"],
    [3, 2, "`Het kan heel snel misgaan': epidemiologen pleiten voor strengere maatregelen", "d27D35i1I4"],

    // 6. peiling
    [5, 4, "Coronabeleid heeft weinig steun: slechts $firstpoll% heeft vertrouwen in De Jonge", "h1000d25D75", "yj"],
    [5, 4, "Weinig vertrouwen in De Jonge: slechts $firstpoll% steunt coronabeleid kabinet", "h1000d25D75", "yj"],
    [5, 4, "Meerderheid heeft zorgen over coronacrisis, $firstpoll% heeft vertrouwen in De Jonge", "H1000i2d25D75", "yj"],
    [5, 4, "Gezondheidszorg door corona belangrijkste thema, $firstpoll% heeft vertrouwen in De Jonge", "H1000i2d25D75", "yj"],

    // 7. event
    [0, 0, "Eerste Nederlander met coronavirus in het ziekenhuis, `man vierde carnaval'", "q11", 'b5'],
    [0, 0, "RIVM: eerste coronageval in Nederland, man kwam uit risicogebied Italië", "q11", 'b5'],
    [0, 1, "Coronavirus duikt op in Nederland: eerste patiënt (56) in Tilburg geïsoleerd", "q11", 'b5'],
    [0, 1, "Viroloog over maatregelen coronavirus: `We moeten waken voor paniekvoetbal'", "q14i0", 'zl'],
    [0, 1, "Geen reden tot zorgen door coronavirus: `Nederland is het best voorbereide land'", "q14i0", 'zl'],
    [0, 2, "Zijn we klaar voor een epidemie? `Kabinet moet niet bang zijn om in te grijpen'", "q14I0", 'zl'],
    [0, 2, "`Het verleden leert ons: maatregelen tegen een epidemie komen eigenlijk altijd te laat'", "q14I0", 'zl'],
    [0, 0, "Eerste overleden coronapatiënt (86) uit Oud-Beijerland `was ontzettend lieve man'", "q18", 'WO'],
    [0, 0, "Eerste Nederlander (86) aan coronavirus overleden in Rotterdams ziekenhuis", "q18", 'WO'],
    [0, 1, "Eerste coronadode in Nederland, man (86) had al gezondheidsproblemen", "q18", 'WO'],
    [9, 2, "`Hoopvolle en alarmerende toespraak van koning schudt Nederlanders wakker'", "d29D43I2", "MD"],
    [9, 2, "Koning in zeldzame toespraak: `Coronavirus niet te stoppen, eenzaamheidsvirus wel'", "d29D43i2", "MD"],
    [9, 2, "Toespraak van de koning is kijkcijferkanon: `We moeten hier samen doorheen'", "d29D43", "MD"],
]

var conds = { w: "week()==", q: "day==", d: "day", i: "index*10", s: "stringency", h: "s.nH", r: "s.dP", c: "s.dH*100", f: "s.F", t: "s.tD/1000", p: "s.P", x: "s.X!=0&&s.X*10" }

function cm(b) { if (0 < a[b][0]) return day - a[b][0] }

function cn(b) { if (0 >= a[b][0]) return day + a[b][0] }

for (j in nws) {
    var cond = nws[j][3].match(/[^\d\.\|]+|\d+|\.+|\|+/g),
        ret = "";
    for (i in cond) {
        cc = cond[i];
        lc = cc.toLowerCase();
        ll = (cc == lc) ? ">" : "<=";
        if (lc[0] == "m" || lc[0] == "n") {
            ret += "&&c" + lc[0] + "('" + Object.keys(a)[lc.charCodeAt(1) - 97] + "')" + ll;
        } else if (cc.match(/[a-z]/i)) {
            ret += "&&" + conds[lc]
            if (!ret.endsWith("==")) ret += ll;
        } else {
            ret += cc;
        }
    }
    nws[j][3] = ret.substring(2);
}

// console.log(nws

// var crc32 = function(r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
//     o[c] = a } for (var n = -1, t = 0; t < r.length; t++) n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return ((-1 ^ n) >>> 0).toString(36) };

//remove on launch
function b64() { for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", b = "", c = 0; 2 > c; c++) b += a.charAt(Math.floor(Math.random() * a.length)); return b }