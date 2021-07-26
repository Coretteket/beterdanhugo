var cov = [
    { "v": [1772895], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] }, // 10-19
    { "v": [2002362], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] }, // 20-29
    { "v": [2233550], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] }, // etc.
    { "v": [2147931], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
    { "v": [2208076], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
    { "v": [2532418], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
    { "v": [2113846], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
    { "v": [1574419], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
    { "v": [692257], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
    { "v": [129831], "i": [0], "s": [0], "d": [0], "h": [0], "r": [0], "f": [0] },
]

/* v: vulnerable, i: infected, s: symptomatic, d: diagnosed, h: hospitalised, r: recovered, f: fatal */

const epoch = 1577833200;
var cont = true;
var day = 0;
var counter = 0;

var wdays = ["zo.", "ma.", "di.", "wo.", "do.", "vr.", "za."];
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "oktober", "november", "december"];
var outlets = { "nos": "NOS NIEUWS", "rtl": "RTL NIEUWS", "nu": "NU.NL", "bbc": "BBC NEWS", "volkskrant": "VOLKSKRANT", "telegraaf": "TELEGRAAF", "nrc": "NRC HANDELSBLAD", "reuters": "REUTERS", "nyt": "NEW YORK TIMES" };
var sentNews = [
    ["reuters", "0", "Chinese officials investigate cause of pneumonia outbreak in Wuhan"]
];
var currentPinned = 0;

var stats = { "n": [], "r": [], "t": [] };
var currentStat = 0;

var speeds = [0, 2500, 1500, 750];
var speed = 0;

var w = 3;
var d = 1;
var m = 1;
var y = 2020;

var lname = "";

function start() {
    lname = q("lname").value.replace(/[\[\]0-9\(\)\.\,\?\!\=\+\<\>\/\\\n]/gi, '');
    var starttxt = q("starttxt");
    if (lname == "" || lname == "Je achternaam") {
        starttxt.innerText = "Kies eerst een achternaam.";
        setTimeout(function() { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }, 4000);
    } else if (lname.length > 20) {
        starttxt.innerText = "Kies een kortere achternaam.";
        setTimeout(function() { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }, 4000);
    } else {
        console.log(lname);
        q("main").removeAttribute("class");
        q("start").setAttribute("class", "d-none");
        q("pinned").setAttribute("class", "box d-block d-md-none");
        q("firstnews").setAttribute("class", "box d-none d-md-block");
    }
}

function timer() {
    if (speed == 0) {
        counter = 0;
        return;
    }

    if (counter >= speeds[speed]) {
        day++;

        if (day == dateToInt(2020, 3, 18)) {
            q("hugo").innerText = "Hugo";
            q("hugo").removeAttribute('id', "hugo");
        }

        var a = intToDate(day);

        q('weekday').innerHTML = wdays[a[3]];
        q("date").innerHTML = ((a[2] < 10) ? "0" + a[2] : a[2]) + " " + mos[a[1]] + " " + a[0];

        stats.n = [randBetween(10, 999), randBetween(10, 999), randBetween(10, 999)];
        stats.r = [randBetween(0, 20) + "%", randBetween(50, 100) + "%", randBetween(0, 1) + "," + randBetween(0, 99)]
        stats.t = [randBetween(20, 90) + "k", randBetween(10, 20) + "k", randBetween(5, 10) + "k"];

        setStats();
        setNews();

        counter = 0;
    }

    setTimeout(timer, 100);
    counter += 100;

}

function setStats() {
    if (currentStat == 0) {
        q('stat1').innerHTML = stats.n[0];
        q('stat2').innerHTML = stats.n[1];
        q('stat3').innerHTML = stats.n[2];
    } else if (currentStat == 1) {
        q('stat1').innerHTML = stats.r[0];
        q('stat2').innerHTML = stats.r[1];
        q('stat3').innerHTML = stats.r[2];
    } else if (currentStat == 2) {
        q('stat1').innerHTML = stats.t[0];
        q('stat2').innerHTML = stats.t[1];
        q('stat3').innerHTML = stats.t[2];
    }

}

var title = "";
var source = "";

function setNews() {
    title = ""
    source = "";

    getNews();

    if (title != "") {
        var a = intToDate(day);
        var div = document.createElement('div');
        div.setAttribute("class", "box d-none d-md-block");
        div.innerHTML += '<img src="img/' + source + '.png" width="16" height="16">';
        div.innerHTML += '<p class="app">' + outlets[source] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]] + '</p>';
        div.innerHTML += "<p class='newstitle'>" + title + "</p>";
        var news = q("pinned");
        news.parentNode.insertBefore(div, news.nextSibling);

        var pluswhat = sentNews.length - currentPinned;
        q("totop").innerHTML = "+" + pluswhat;

        if (currentPinned == sentNews.length - 1) {
            sentNews.push([source, day, title]);
            updatePinned(sentNews.length - 1);
        } else {
            sentNews.push([source, day, title]);
        }

        if (sentNews.length > 5) {
            q("news").children[7].setAttribute("class", "rembox d-none d-md-block");
        }

    }
}

function updatePinned(i) {
    if (i >= sentNews.length || i < 0) {
        return;
    }
    var pin = q('content');
    var a = intToDate(sentNews[i][1]);
    pin.children[0].setAttribute('src', 'img/' + sentNews[i][0] + '.png');
    pin.children[1].innerHTML = outlets[sentNews[i][0]] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]];
    pin.children[3].innerHTML = sentNews[i][2];

    currentPinned = i;

    var pluswhat = sentNews.length - currentPinned - 1;
    q("totop").innerHTML = "+" + pluswhat;

    if (currentPinned == sentNews.length - 1) {
        q("up").setAttribute("class", "inactive");
        q("down").setAttribute("class", "active");
        q("totop").setAttribute("style", "display: none;");
    } else if (currentPinned == 0) {
        q("up").setAttribute("class", "active");
        q("down").setAttribute("class", "inactive");
        q("totop").setAttribute("style", "display: inline;");
    } else {
        q("up").setAttribute("class", "active");
        q("down").setAttribute("class", "active");
        q("totop").setAttribute("style", "display: inline;");
    }
}

function updateStats(i) {
    console.log(i);

    if (i >= Object.keys(stats).length || i < 0) {
        return;
    }

    currentStat = i;
    getStats();

    if (i == 0 || i == 2) {
        q("ico1").setAttribute("class", "fas fa-virus");
        q("ico2").setAttribute("class", "fas fa-ambulance");
        q("ico3").setAttribute("class", "fas fa-skull");
    } else if (i == 1) {
        q("ico1").setAttribute("class", "fas fa-virus");
        q("ico2").setAttribute("class", "fas fa-ambulance");
        q("ico3").setAttribute("class", "fas fa-project-diagram");
    }

    if (i == 0) {
        q("statbar").innerHTML = '<i class="fas fa-chart-bar"></i> STATISTIEKEN &ndash; Dagcijfers</p>';
        q("sdiv1").setAttribute("title", "Nieuwe besmettingen");
        q("sdiv2").setAttribute("title", "Nieuwe ziekenhuisopnames");
        q("sdiv3").setAttribute("title", "Nieuwe overlijdens");
    } else if (i == 1) {
        q("statbar").innerHTML = '<i class="fas fa-chart-bar"></i> STATISTIEKEN &ndash; Relatieve cijfers</p>';
        q("sdiv1").setAttribute("title", "Percentage positief getest");
        q("sdiv2").setAttribute("title", "Gebruikte ziekenhuiscapaciteit");
        q("sdiv3").setAttribute("title", "Huidige R-waarde");
    } else if (i == 2) {
        q("statbar").innerHTML = '<i class="fas fa-chart-bar"></i> STATISTIEKEN &ndash; Totale cijfers</p>';
        q("sdiv1").setAttribute("title", "Totale besmettingen");
        q("sdiv2").setAttribute("title", "Totale ziekenhuisopnames");
        q("sdiv3").setAttribute("title", "Totale overlijdens");
    }

    if (currentStat == Object.keys(stats).length - 1) {
        q("sup").setAttribute("class", "active");
        q("sdown").setAttribute("class", "inactive");
    } else if (currentStat == 0) {
        q("sup").setAttribute("class", "inactive");
        q("sdown").setAttribute("class", "active");
    } else {
        q("sup").setAttribute("class", "active");
        q("sdown").setAttribute("class", "active");
    }
}

function dateToInt(y, m, d) {
    var get = new Date(y, m - 1, d).getTime() / 1000 - epoch;
    var get = get / 24 / 60 / 60
    return Math.round(get);
}

function intToDate(i) {
    t = epoch + i * 60 * 60 * 24;
    date = new Date(t * 1000);
    w = date.getDay();
    d = date.getDate();
    m = date.getMonth() + 1;
    y = date.getYear() + 1900;
    return [y, m, d, w];
}

function setSpeed(i) {
    if (day == 0 && i > 0) {
        q("welcome").setAttribute("class", "d-none");
    }
    q("s" + speed).setAttribute('class', 'btn');
    q("s" + i).setAttribute('class', 'btn tsel');
    if (speed == 0 && i > 0) {
        speed = i;
        timer();
    } else {
        speed = i;
    }
}

var oldnws = false;

function oldNews() {
    if (!oldnws) {
        oldnws = true;
        q("news").children.forEach(e => {
            if (e.getAttribute("class").includes("rembox")) {
                e.setAttribute("class", "box d-none d-md-block");
            }
        });
    }
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function q(i) {
    return document.getElementById(i);
}

q("lname").addEventListener('keydown', function(event) {
    if (event.key == "Enter") {
        start();
    }
});

document.addEventListener('keydown', function(event) {
    //console.log(event.key);
    if (event.key == 1) {
        setSpeed(0);
    } else if (event.key == 2) {
        setSpeed(1);
    } else if (event.key == 3) {
        setSpeed(2);
    } else if (event.key == 4) {
        setSpeed(3)
    }
});

Object.keys(outlets).forEach(element => {
    var img = new Image();
    img.src = "./img/" + element + ".png";
});