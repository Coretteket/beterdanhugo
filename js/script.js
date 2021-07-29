const epoch = 1577833200;
var cont = true;
var day = 0;
var counter = 0;

var ldays = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
var wdays = ["zo", "ma.", "di.", "wo.", "do.", "vr.", "za."];
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

var currentPinned = 0;

var speeds = [0, 2500, 1250, 750];
var speed = 0;

var w = 3;
var d = 1;
var m = 1;
var y = 2020;

var lname = "";
var dev = false;

var url = new URL(window.location.href);
var dev = (url.searchParams.get("dev") != null);

var gameOver = false;

if (dev) {
    speeds[3] = 100;
    lname = "De Jonge";
    start();
}

function checkStart() {
    lname = q("lname").value.replace(/[\[\]0-9\(\)\.\,\?\!\=\+\<\>\/\\\n]/gi, '');
    var starttxt = q("starttxt");
    if (lname == "" || lname == "Je achternaam") {
        starttxt.innerText = "Kies eerst een achternaam.";
        setTimeout(function() { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }, 4000);
    } else if (lname.length > 20) {
        starttxt.innerText = "Kies een kortere achternaam.";
        setTimeout(function() { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }, 4000);
    } else {
        //console.log(lname);
        start();
    }
}

function start() {
    q("main").removeAttribute("class");
    q("start").setAttribute("class", "d-none");
    q("pinned").setAttribute("class", "box d-block d-md-none");
    q("firstnews").setAttribute("class", "box d-none d-md-block");
    q("stats").setAttribute("class", "d-block")
}

function timer() {
    if (speed == 0) {
        counter = 0;
        return;
    }

    if (counter >= speeds[speed]) {
        day++;

        if (day == dateToInt(2020, 2, 28)) {
            q("chartbox").setAttribute("class", "box")
            q("scroll").setAttribute("id", "scrollsmall")
        }
        if (day >= dateToInt(2020, 2, 28)) {
            updateStats();
        }

        var a = intToDate(day);

        //q('weekday').innerHTML = wdays[a[3]];
        q("date").innerHTML = a[2] + " " + mos[a[1]] + " " + a[0];

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

var snws = [
    ["reuters", "-1", "Chinese officials investigate cause of pneumonia outbreak in Wuhan"]
];

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

        var pluswhat = snws.length - currentPinned;
        q("totop").innerHTML = "+" + pluswhat;

        if (currentPinned == snws.length - 1) {
            snws.push([source, day, title]);
            updatePinned(snws.length - 1);
        } else {
            snws.push([source, day, title]);
        }

        /*if (snws.length > 5) {
            q("news").children[7].setAttribute("class", "rembox d-none d-md-block");
        }*/

    }
}

function updatePinned(i) {
    if (i >= snws.length || i < 0) {
        return;
    }
    var pin = q('content');
    var a = intToDate(snws[i][1]);
    pin.children[0].setAttribute('src', 'img/' + snws[i][0] + '.png');
    pin.children[1].innerHTML = outlets[snws[i][0]] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]];
    pin.children[3].innerHTML = snws[i][2];

    currentPinned = i;

    var pluswhat = snws.length - currentPinned - 1;
    q("totop").innerHTML = "+" + pluswhat;

    if (currentPinned == snws.length - 1) {
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

function toggleStat(s) {
    if (s == 'test') {
        q("testCnt").setAttribute("class", "chartcnt");
        q("hospCnt").setAttribute("class", "chartcnt d-none");
        q("deadCnt").setAttribute("class", "chartcnt d-none");
        q("testBtn").setAttribute("class", "col statbtn statbtnactive");
        q("hospBtn").setAttribute("class", "col statbtn");
        q("deadBtn").setAttribute("class", "col statbtn");
    } else if (s == 'hosp') {
        q("hospCnt").setAttribute("class", "chartcnt");
        q("testCnt").setAttribute("class", "chartcnt d-none");
        q("deadCnt").setAttribute("class", "chartcnt d-none");
        q("hospBtn").setAttribute("class", "col statbtn statbtnactive");
        q("testBtn").setAttribute("class", "col statbtn");
        q("deadBtn").setAttribute("class", "col statbtn");
    } else if (s == 'dead') {
        q("deadCnt").setAttribute("class", "chartcnt");
        q("testCnt").setAttribute("class", "chartcnt d-none");
        q("hospCnt").setAttribute("class", "chartcnt d-none");
        q("deadBtn").setAttribute("class", "col statbtn statbtnactive");
        q("testBtn").setAttribute("class", "col statbtn");
        q("hospBtn").setAttribute("class", "col statbtn");
    }
}

function updateStats() {
    var covday = day - dateToInt(2020, 2, 28);
    addData(testChart, covday + 1, test[covday]);
    q("testCount").innerText = test[covday];
    addData(hospChart, covday + 1, hosp[covday]);
    q("hospCount").innerText = hosp[covday];
    addData(deadChart, covday + 1, dead[covday]);
    q("deadCount").innerText = dead[covday];
}

var FAQ = false;
var preSpeed = 0;

function toggleFAQ() {
    if (FAQ) {
        q("dash").setAttribute("class", "col-md-6 col-lg-5 col-xl-6 order-3 order-md-2");
        q("news").setAttribute("class", "col-md-6 col-lg-5 col-xl-4 order-2 order-md-3");
        q("faq").setAttribute("class", "d-none");
        FAQ = false;
        setSpeed(preSpeed);
    } else {
        q("dash").setAttribute("class", "d-none");
        q("news").setAttribute("class", "d-none");
        q("faq").setAttribute("class", "col-12 col-lg-10 order-2");
        FAQ = true;
        preSpeed = speed;
        setSpeed(0);
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

var lightmode = true;

function colorSwitch() {
    if (lightmode) {
        q("light").setAttribute("id", "dark");
        q("colormode").getElementsByTagName("i")[0].setAttribute("class", "fas fa-sun");
        lightmode = false;
    } else {
        q("dark").setAttribute("id", "light");
        q("colormode").getElementsByTagName("i")[0].setAttribute("class", "fas fa-moon");
        lightmode = true;
    }
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function q(i) {
    return document.getElementById(i);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorSwitch();
}

q("lname").addEventListener('keydown', function(event) {
    if (event.key == "Enter") {
        checkStart();
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

if (!dev) {
    $(window).bind('beforeunload', function() {
        if (!gameOver) {
            return window.confirm();
        }
    });
}