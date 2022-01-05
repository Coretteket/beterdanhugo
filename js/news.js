function week(a) {
    a == null && (a = day);
    var b = new Date(1e3 * epoch + 864e5 * a);
    b.setUTCDate(b.getUTCDate() + 4 - (b.getUTCDay() || 7));
    var c = new Date(Date.UTC(2020, 0, 1));
    return Math.ceil(((b - c) / 864e5 + 1) / 7)
}

function shuffle(a) { for (var b, c, d = a.length; d;) c = Math.floor(Math.random() * d--), b = a[d], a[d] = a[c], a[c] = b; return a }

shuffle(nws);

var fname = shuffle(["Anna", "Esther", "Karin", "Sandra", "Fatima", "Khadija", "Saskia", "Astrid", "Petra", "Ingrid"]);
var mname = shuffle(["Jan", "Maurice", "Johan", "Peter", "Mohammed", "Ahmed", "Robert", "Marcel", "Kees", "Patrick"]);

function getName(mf) {
    mf ? fname.push(fname.shift()) : mname.push(mname.shift());
    return mf ? fname[0] : mname[0];
}

var outlets = { nos: "NOS", rtl: "RTL", nu: "NU.nl", vk: "Volkskrant", tgf: "Telegraaf", nrc: "NRC", trouw: "Trouw", algd: "AD", parool: "Parool", metro: "Metro", bnr: "BNR", "1v": "EenVandaag", hvnl: "Hart van Nederland", /*reuters: "Reuters", ap: "Associated Press",*/ bbc: "BBC", nyt: "New York Times", wapo: "Washington Post", cnn: "CNN" };

pairs = [
    ["nos", "rtl", "nu", "algd"], //0
    ["vk", "tgf"], //1
    ["nrc", "trouw", "parool"], //2
    ["metro", "bnr"], //3
    ["1v", "hvnl"], //4
    ["bbc", "cnn"], //5
    ["nyt", "wapo"], //6
    // ["reuters", "ap"] //7
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
        // console.log(day)
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
        // console.clear();
        console.table(temparr.sort(function(c, a) { return c[0] - a[0] }));
    }
}

function vars(a) {
    // a = a.replace("De Jonge", lname);
    a = a.replaceAll("`", "‘");
    a = a.replaceAll("'", "’");
    if (!a.includes("$")) return a;
    a = a.replaceAll("$deadrounded", (Math.round(s.tD / 1000) * 1000).toLocaleString("nl-NL"));
    a = a.replaceAll("$dead", s.tD.toLocaleString("nl-NL"));
    a = a.replaceAll("$poll", calcPoll());
    a = a.replaceAll("$mname", getName(0));
    a = a.replaceAll("$fname", getName(1));
    a = a.replaceAll("$age", randInt(50, 70));
    return a;
}

var conds = { w: "week()==", q: "day==", d: "day", i: "index*10", s: "stringency*10", h: "s.H", r: "s.dP", c: "s.dH*100", f: "s.F/1000", t: "s.tD/1000", p: "s.P", x: "s.X!=0&&s.X*10", o: "calcPoll()/10" }

function cm(c) { x = a[c][0]; if (0 < x) return day - x }

function cn(c) { x = a[c][0]; if (0 > x) return day + x; if (x == 0) return 0; }

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

//remove on launch
function b64() { for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", b = "", c = 0; 2 > c; c++) b += a.charAt(Math.floor(Math.random() * a.length)); return b }