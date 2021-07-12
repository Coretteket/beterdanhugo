var cov = {
    0: { "v": 1772895, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    10: { "v": 2002362, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    20: { "v": 2233550, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    30: { "v": 2147931, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    40: { "v": 2208076, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    50: { "v": 2532418, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    60: { "v": 2113846, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    70: { "v": 1574419, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    80: { "v": 692257, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
    90: { "v": 129831, "e": [], "i": [], "s": [], "d": [], "h": [], "c": [], "r": 0, "f": 0 },
}

const epoch = 1577833200;
var cont = true;
var day = 0;
var counter = 0;

var wdays = ["zo.", "ma.", "di.", "wo.", "do.", "vr.", "za."]
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "oktober", "november", "december"]
var outlets = { "nos": "NOS NIEUWS", "rtl": "RTL NIEUWS", "nu": "NU.NL", "bbc": "BBC NEWS", "volkskrant": "VOLKSKRANT", "telegraaf": "TELEGRAAF", "nrc": "NRC HANDELSBLAD" }

var speeds = [0, 4500, 2500, 1500];
var speed = 0;

var w = 3;
var d = 1;
var m = 1;
var y = 2020;

var sentNews = [
    ["nu", "0", "Ziekenhuizen zien aantal slachtoffers met vuurwerkletsel fors stijgen"]
];
var currentPinned = 0;

function timer() {
    if (speed == 0) {
        counter = 0;
        return;
    }

    if (counter >= speeds[speed]) {
        day++;

        if (day == dateToInt(2020, 3, 18)) {
            document.getElementById("hugo").innerText = "Hugo";
            document.getElementById("hugo").removeAttribute('id', "hugo");
        }

        var a = intToDate(day);

        document.getElementById('weekday').innerHTML = wdays[a[3]];
        document.getElementById("date").innerHTML = ((a[2] < 10) ? "0" + a[2] : a[2]) + " " + mos[a[1]] + " " + a[0];

        getNews();

        counter = 0;
    }

    setTimeout(timer, 100);
    counter += 100;

}

function getNews() {
    var title = "";
    var source = "";

    if (day == dateToInt(2020, 1, 2)) {
        title = "China pneumonia outbreak: Mystery virus probed in Wuhan";
        source = "bbc";
    }

    if (day == dateToInt(2020, 1, 3)) {
        title = "Tot nu toe 59 gevallen van mysterieuze longziekte in China";
        source = "nos";
    }

    if (day == dateToInt(2020, 1, 4)) {
        title = "Risiconiveaus vanaf dinsdag omhoog, meerdere plaatsen 'zeer ernstig'";
        source = "rtl";
    }

    if (day == dateToInt(2020, 1, 5)) {
        title = "OMT-lid Marc Bonten: door allerlei kleine dingen werd Testen voor Toegang van een schild een gatenkaas";
        source = "volkskrant";
    }

    if (day == dateToInt(2020, 1, 6)) {
        title = "Belgische viroloog Marc van Ranst: ’Nederland heeft te snel versoepeld’";
        source = "telegraaf";
    }

    if (day == dateToInt(2020, 1, 7)) {
        title = "‘Voor mijn gevoel zat ik al negen jaar in quarantaine’";
        source = "nrc";
    }

    if (title != "") {
        var a = intToDate(day);
        var div = document.createElement('div');
        div.setAttribute("class", "box d-none d-md-block");
        div.innerHTML += '<img src="img/' + source + '.png" width="16" height="16">';
        div.innerHTML += '<p class="app">' + outlets[source] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]] + '</p>';
        div.innerHTML += "<p class='newstitle'>" + title + "</p>";
        var news = document.getElementById("pinned");
        news.parentNode.insertBefore(div, news.nextSibling);

        var pluswhat = sentNews.length - currentPinned;
        document.getElementById("totop").innerHTML = "+" + pluswhat;

        if (currentPinned == sentNews.length - 1) {
            sentNews.push([source, day, title]);
            updatePinned(sentNews.length - 1);
        } else {
            sentNews.push([source, day, title]);
        }

    }
}

function updatePinned(i) {
    if (i >= sentNews.length || i < 0) {
        return;
    }
    var pin = document.getElementById('content');
    var a = intToDate(sentNews[i][1]);
    pin.children[0].setAttribute('src', 'img/' + sentNews[i][0] + '.png');
    pin.children[1].innerHTML = outlets[sentNews[i][0]] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]];
    pin.children[3].innerHTML = sentNews[i][2];

    currentPinned = i;

    var pluswhat = sentNews.length - currentPinned - 1;
    document.getElementById("totop").innerHTML = "+" + pluswhat;

    if (currentPinned == sentNews.length - 1) {
        document.getElementById("up").setAttribute("style", "opacity:20%;");
        document.getElementById("down").setAttribute("style", "opacity:100%;");
        document.getElementById("totop").setAttribute("style", "display: none;");
    } else if (currentPinned == 0) {
        document.getElementById("up").setAttribute("style", "opacity:100%;");
        document.getElementById("down").setAttribute("style", "opacity:20%;");
        document.getElementById("totop").setAttribute("style", "display: inline;");
    } else {
        document.getElementById("up").setAttribute("style", "opacity:100%;");
        document.getElementById("down").setAttribute("style", "opacity:100%;");
        document.getElementById("totop").setAttribute("style", "display: inline;");
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
    document.getElementById("s" + speed).setAttribute('class', 'btn');
    document.getElementById("s" + i).setAttribute('class', 'btn tsel');
    if (speed == 0 && day == 0 && i > 0) {
        speed = i;
        counter = speeds[i] / 2;
        timer();
    } else if (speed == 0 && i > 0) {
        speed = i;
        timer();
    } else {
        speed = i;
    }
}

Object.keys(outlets).forEach(element => {
    var img = new Image();
    img.src = "./img/" + element + ".png";
});