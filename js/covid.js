var ans = 0;
var f = false

function lin(y1, y2, x1, x2) {
    if (f) {
        return;
    }
    if (x2 == -1) {
        x2 = 999999;
    }
    if (day >= x1 && day < x2 && y1 == y2) {
        ans = y1;
        f = true;
    } else if (day >= x1 && day < x2) {
        ans = (y2 - y1) / (x2 - x1) * (day - x1) + y1;
        f = true;
    }
}

function siMe(arr) { //simplemeasure
    var par = arr[0];
    var ch = arr[1];
    var bck = arr[2];
    var delay = arr[3];
    if (ch == 1) {
        return 1;
    } else if (par > 0) {
        f = !1;
        lin(1, ch, par, par + delay);
        lin(ch, ch, par + delay, -1);
        return ans;
    } else if (par < 0) {
        f = !1;
        lin(ch, bck, -par, -par + delay * 2 / 3);
        lin(bck, 1, -par + delay * 2 / 3, -par + delay);
        lin(1, 1, -par + delay, -1);
        return ans;
    } else {
        return 1;
    }
}

var a = { // active, eff, boost, delay, impact, no. days, ever used
    workhome: [0, .95, 1, 3, 3, 0], //a
    socdis: [0, .95, 1, 3, 4, 0], //b
    masks: [0, .9, 1.1, 3, 2, 0], //c

    events: [0, .85, 1.1, 7, 7, 0], //d
    theater: [0, .9, 1.05, 7, 4, 0], //e
    gather: [0, .9, 1.1, 7, 7, 0], //f

    horeca: [0, .85, 1.05, 7, 9, 0], //g
    clubs: [0, .9, 1.2, 7, 4, 0], //h
    shops: [0, .85, 1.05, 7, 8, 0], //i

    edlow: [0, .925, 1, 7, 10, 0], //j
    edmid: [0, .875, 1.1, 7, 7, 0], //k
    eduni: [0, .815, 1.1, 7, 5, 0], //l

    lockdown: [0, .85, 1.05, 7, 15, 0], //m
    curfew: [0, .925, 1.1, 7, 10, 0], //n
    border: [0, .95, 1.1, 7, 8, 0] //o
}

var c = { //gemaakte keuzes
    jan11warning: [0, 1]
}


var r = { //changes in covid dynamic rates, like undercounting
    death: () => {
        f = !1;
        lin(1, 1, 0, 120);
        lin(1, 0.6, 120, 180);
        lin(0.6, 0.6, 180, -1);
        return ans;
    },
    underdeath: () => {
        f = !1;
        lin(0, 0.2, 0, 35);
        lin(0.2, 0.6, 35, 45);
        lin(0.6, 0.6, 45, -1)
        return ans;
    },
    deathday: () => {
        var wday = new Date(epoch + day * 8.64e7).getDay();
        var weff = [0.786, 0.799, 1.181, 1.106, 1.027, 1.045, 1.057]
        return weff[wday];
    },
    testratio: () => {
        f = !1;
        lin(40, 40, 0, 120);
        lin(40, 12, 120, 160);
        lin(12, 12, 160, -1);
        return ans;
    },
    testcapacity: () => {
        f = !1;
        lin(0, 100, 10, 20);
        lin(100, 750, 20, 30);
        lin(750, 4000, 30, 40);
        lin(4000, 10000, 40, 120)
        lin(10000, 20000, 120, 160);
        lin(20000, 100000, 160, 220);
        lin(100000, 100000, 220, -1);
        return ans + Math.sqrt(s.I) / 4;
    },
    testday: () => {
        var wday = new Date(epoch + day * 8.64e7).getDay();
        var weff = [1.008, 0.901, 0.863, 0.988, 1.088, 1.092, 1.048];
        return weff[wday];
    },
    season: () => {
        // return Math.cos(2 * Math.PI / 365 * day) * 0.2 + 1;
        return Math.cos(0.0172 * day) * .2 + 1;
    },
    scare: () => {
        if (day < 90) {
            return (-(((day / 90) - 1) ** 2) + 1) * 0.3 + 0.7;
        } else {
            return 1;
        }
    },
    hosp: () => {
        f = !1;
        lin(0.001, 0.001, 0, 25);
        lin(0.001, 0.017, 25, 50);
        lin(0.017, 0.01, 50, 73);
        lin(0.01, 0.005, 73, 164);
        lin(0.005, 0.005, 164, -1);
        return ans;
    },
    hospratio: () => {
        f = !1;
        lin(10, 100, 0, 30);
        lin(100, 100, 30, 120);
        lin(100, 20, 120, 160);
        lin(20, 20, 160, -1);
        return ans;
    },
    hospcapacity: () => {
        f = !1;
        lin(100, 1000, 0, 40);
        lin(1000, 1000, 40, -1);
        return ans;
    },
    hospday: () => {
        var wday = new Date(epoch + day * 8.64e7).getDay();
        var weff = [0.908, 0.875, 1.104, 1.031, 1.048, 1.028, 1.006]
        return weff[wday] //* ans;
    }
}

var v = [ // age specific info for vax
    { perc: 0.10185, aifr: 0.00048, vax: 0 }, // 0 - 9
    { perc: 0.11503, aifr: 0.00161, vax: 0 }, // 10 - 19
    { perc: 0.12831, aifr: 0.00538, vax: 0 }, // 20 - 29
    { perc: 0.12339, aifr: 0.01788, vax: 0 }, // 30 - 39
    { perc: 0.12685, aifr: 0.06265, vax: 0 }, // 40 - 49
    { perc: 0.14548, aifr: 0.22048, vax: 0 }, // 50 - 59
    { perc: 0.12143, aifr: 0.87891, vax: 0 }, // 60 - 69
    { perc: 0.09044, aifr: 2.81399, vax: 0 }, // 70 - 79
    { perc: 0.03977, aifr: 10.0284, vax: 0 }, // 80 - 89
    { perc: 0.00746, aifr: 26.3875, vax: 0 }, // 90+
]

var s = { // spread info
    a: 0,
    b: 1 / 5,
    c: 1 / 365,

    Rt: 1,

    N: 17500000, //population
    S: 17500000 - 1000, //susceptible
    I: 1000, //infectious
    R: 0, //removed
    F: 0, //real fatalities

    Ss: [17500000 - 1000],
    Is: [1000],
    Rs: [0],
    Fs: [0],

    dSs: [0],
    dIs: [0],
    dRs: [0],
    dFs: [0],

    P: 0, //positive tests
    H: 0, //hospitalisations
    D: 0, //counted deaths

    Ps: [0],
    Hs: [0],
    Ds: [0],
}

var b = { //preset constant beginning values
    Ps: [0, 1, 1, 3, 5, 4],
    Hs: [0, 1, 0, 1, 0, 1, /*1, 3, 5, 7, 12, 4, 12, 15, 23*/ ],
    Ds: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, /*0, 3, 3, 7, 4*/ ],
    Rts: [1.73556, 1.92938, 1.87953, 2.02735, 1.99951, 1.91549, 2.13945, 2.23684, 2.19142, 2.22130, 2.26765]
}

function calcIFR() {
    var ifr = 0.0105;
    return ifr * r.death();

}

function calcIHR() {
    return r.hosp();
}

function calcR() {
    var R0 = 2.5;
    if (day + 1 < b.Rts.length) {
        R0 = b.Rts[day]
    } else {
        R0 *= r.season();
        R0 *= r.scare();
        var mult = 1;
        for (const [key, value] of Object.entries(a)) { mult *= siMe(a[key]); }
        for (const [key, value] of Object.entries(c)) { mult *= siMe(c[key]); }
        R0 = mult > 1.2 ? 1.2 * R0 : mult * R0;
    }
    s.Rt = R0;
    return s.Rt * randBetween(0.9, 1.1);
    // return Rts[day] / s.S * s.N;
}

function calcCOV() {
    s.a = calcR() * s.b;

    var dS = s.R * s.c;
    var dI = s.a * s.S * s.I / s.N;
    var dR = s.b * s.I * (1 - calcIFR());
    var dF = s.b * s.I * calcIFR();

    s.dSs.push(dS);
    s.dIs.push(dI);
    s.dRs.push(dR);
    s.dFs.push(dF);

    s.S += dS - dI;
    s.I += dI - dR - dF;
    s.R += dR - dS;
    s.F += dF;

    s.Ss.push(s.S);
    s.Is.push(s.I);
    s.Rs.push(s.R);
    s.Fs.push(s.F);

    if (day - 10 < b.Ps.length && day >= 10) { s.P = b.Ps[day - 10] } else {
        s.P = Math.round(s.I / s.N * r.testratio() * r.testcapacity() / (s.I / s.N * (r.testratio() - 1) + 1) * r.testday() * randBetween(.9, 1.1));
    };
    if (day - 10 < b.Hs.length && day >= 10) { s.H = b.Hs[day - 10] } else {
        // s.H = Math.round(s.dIs[day - 7] * calcIHR() * randBetween(0.8, 1.2));
        // s.H = Math.round((s.Is[day - 7] / s.N * r.hospratio() * r.hospcapacity()) / (s.Is[day - 7] / s.N * (r.hospratio() - 1) + 1) * r.hospday() * randBetween(0.8, 1.2));
        s.H = Math.round(s.dIs[day - 7] * calcIHR() * randBetween(0.95, 1.05));
        s.H = s.H > 300 ? Math.round(1600 - 1600 / (1 + s.H / 1e3)) : s.H;
        s.H = Math.round(s.H * r.hospday());
    };
    if (day - 10 < b.Ds.length && day >= 10) { s.D = b.Ds[day - 10] } else {
        s.D = s.dFs[day - 7] * r.underdeath() * randBetween(0.8, 1.2);
        s.D = s.D > 300 ? 1200 - 1200 / (1 + s.D / 1e3) : s.D;
        s.D = Math.round(s.D * r.deathday());
    };

    s.Ps.push(s.P);
    s.Hs.push(s.H);
    s.Ds.push(s.D);
}

var maxIndex = 0;
var stringency = 0;
var index = 0;

for (const [key, value] of Object.entries(a)) {
    if (key == "curfew") continue;
    maxIndex += value[4];
}

function getIndex() {
    index = 0;
    for (const [k, v] of Object.entries(a)) {
        index += v[0] > 0 ? v[4] / maxIndex : 0;
    }
    index = Math.round(index * 1e4) / 1e4;
}

function getStringency() {
    stringency = 0;
    for (const [k, v] of Object.entries(a)) {
        stringency += v[4] * v[5] / maxIndex / (day - 13);
    }
    stringency = Math.round(stringency * 1e4) / 1e4;

}