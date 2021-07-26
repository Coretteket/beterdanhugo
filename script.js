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
        q("stats").setAttribute("class", "d-block")
    }
}

var test = [1.93, 1.74, 1.59, 1.74, 2.03, 2.17, 2.18, 2.20, 2.15, 2.06, 2.06, 2.10, 1.99, 1.83, 1.79, 1.82, 1.84, 1.86, 1.89, 1.90, 1.80, 1.67, 1.55, 1.43, 1.33, 1.25, 1.16, 1.04, 0.96, 0.92, 0.88, 0.84, 0.81, 0.79, 0.75, 0.72, 0.71, 0.71, 0.72, 0.74, 0.76, 0.76, 0.75, 0.71, 0.69, 0.69, 0.72, 0.75, 0.77, 0.79, 0.81, 0.78, 0.73, 0.70, 0.69, 0.70, 0.72, 0.74, 0.76, 0.77, 0.77, 0.75, 0.72, 0.70, 0.72, 0.74, 0.77, 0.77, 0.77, 0.75, 0.73, 0.72, 0.71, 0.69, 0.69, 0.72, 0.76, 0.80, 0.83, 0.83, 0.82, 0.82, 0.81, 0.78, 0.77, 0.78, 0.80, 0.84, 0.91, 1.00, 1.08, 1.13, 1.08, 0.96, 0.88, 0.88, 0.88, 0.80, 0.73, 0.68, 0.56, 0.48, 0.48, 0.52, 0.58, 0.67, 0.82, 0.96, 1.01, 1.05, 1.14, 1.26, 1.30, 1.18, 0.96, 0.80, 0.75, 0.73, 0.73, 0.75, 0.79, 0.85, 0.92, 0.98, 1.02, 1.01, 0.97, 0.91, 0.89, 0.91, 0.94, 0.95, 0.94, 0.94, 0.97, 1.05, 1.18, 1.33, 1.43, 1.45, 1.43, 1.41, 1.42, 1.44, 1.44, 1.40, 1.31, 1.21, 1.15, 1.16, 1.21, 1.26, 1.29, 1.28, 1.27, 1.28, 1.34, 1.40, 1.43, 1.40, 1.33, 1.26, 1.24, 1.24, 1.25, 1.25, 1.20, 1.12, 1.05, 1.00, 0.97, 0.96, 0.97, 0.98, 0.96, 0.94, 0.91, 0.91, 0.91, 0.93, 0.96, 0.98, 1.00, 1.03, 1.07, 1.10, 1.13, 1.14, 1.14, 1.14, 1.16, 1.21, 1.29, 1.38, 1.44, 1.42, 1.37, 1.35, 1.36, 1.36, 1.36, 1.33, 1.28, 1.23, 1.22, 1.24, 1.27, 1.29, 1.29, 1.24, 1.18, 1.15, 1.15, 1.17, 1.20, 1.19, 1.16, 1.14, 1.16, 1.21, 1.27, 1.32, 1.35, 1.33, 1.29, 1.26, 1.24, 1.22, 1.20, 1.18, 1.15, 1.12, 1.11, 1.11, 1.12, 1.13, 1.13, 1.11, 1.08, 1.07, 1.07, 1.08, 1.08, 1.07, 1.03, 0.99, 0.96, 0.93, 0.91, 0.89, 0.87, 0.85, 0.83, 0.83, 0.83, 0.85, 0.86, 0.86, 0.86, 0.87, 0.89, 0.93, 0.96, 0.99, 1.01, 1.00, 0.99, 0.98, 0.99, 1.00, 1.00, 0.99, 0.96, 0.93, 0.92, 0.93, 0.96, 0.99, 1.01, 1.02, 1.02, 1.05, 1.10, 1.16, 1.22, 1.26, 1.25, 1.23, 1.21, 1.22, 1.23, 1.24, 1.24, 1.20, 1.16, 1.14, 1.14, 1.14, 1.14, 1.12, 1.06, 1.00, 0.95, 0.93, 0.91, 0.90, 0.88, 0.86, 0.84, 0.85, 0.87, 0.91, 0.94, 0.94, 0.91, 0.90, 0.92, 0.95, 0.98, 0.97, 0.94, 0.88, 0.84, 0.84, 0.85, 0.89, 0.92, 0.94, 0.94, 0.92, 0.92, 0.93, 0.95, 0.96, 0.97, 0.94, 0.90, 0.88, 0.87, 0.88, 0.90, 0.91, 0.92, 0.91, 0.91, 0.92, 0.94, 0.97, 0.98, 0.97, 0.94, 0.93, 0.94, 0.96, 0.99, 1.02, 1.03, 1.02, 1.03, 1.06, 1.10, 1.14, 1.16, 1.15, 1.11, 1.07, 1.05, 1.04, 1.04, 1.03, 1.00, 0.98, 0.97, 0.99, 1.01, 1.04, 1.05, 1.05, 1.06, 1.07, 1.11, 1.14, 1.16, 1.16, 1.14, 1.11, 1.09, 1.08, 1.09, 1.10, 1.10, 1.09, 1.07, 1.06, 1.06, 1.06, 1.07, 1.07, 1.04, 1.01, 0.98, 0.96, 0.96, 0.97, 0.98, 0.97, 0.97, 0.96, 0.98, 1.01, 1.04, 1.08, 1.08, 1.06, 1.03, 1.02, 1.03, 1.04, 1.06, 1.06, 1.04, 1.03, 1.03, 1.03, 1.02, 1.01, 0.97, 0.94, 0.91, 0.91, 0.94, 0.97, 1.00, 1.01, 1.00, 0.97, 0.95, 0.94, 0.94, 0.94, 0.92, 0.89, 0.87, 0.86, 0.86, 0.86, 0.86, 0.84, 0.82, 0.81, 0.83, 0.84, 0.86, 0.85, 0.84, 0.82, 0.81, 0.83, 0.86, 0.90, 0.93, 0.93, 0.89, 0.85, 0.83, 0.82, 0.83, 0.82, 0.80, 0.78, 0.75, 0.75, 0.75, 0.76, 0.77, 0.77, 0.77, 0.77, 0.77, 0.79, 0.80, 0.80, 0.78, 0.76, 0.77, 0.79, 0.82, 0.86, 0.91, 0.95, 0.98, 1.05, 1.17, 1.36, 1.59, 1.84, 2.03, 2.19, 2.39, 2.66, 2.91]

function timer() {
    if (speed == 0) {
        counter = 0;
        return;
    }

    if (counter >= speeds[speed]) {
        day++;

        addData(myChart, day, test[day])
        q("count").innerText = test[day]

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

        setNews();

        counter = 0;
    }

    setTimeout(timer, 100);
    counter += 100;

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
        div.innerHTML += '<img class="logo" src="img/' + source + '.png" width="16" height="16">';
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

        /*if (sentNews.length > 5) {
            q("news").children[7].setAttribute("class", "rembox d-none d-md-block");
        }*/

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

var FAQ = false;

function toggleFAQ() {
    if (FAQ) {
        q("dash").setAttribute("class", "col-md-6 col-lg-5 col-xl-6 order-3 order-md-2");
        q("news").setAttribute("class", "col-md-6 col-lg-5 col-xl-4 order-2 order-md-3");
        q("faq").setAttribute("class", "d-none");
        FAQ = false;
    } else {
        q("dash").setAttribute("class", "d-none");
        q("news").setAttribute("class", "d-none");
        q("faq").setAttribute("class", "col-12 col-lg-10 order-2");
        FAQ = true;
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