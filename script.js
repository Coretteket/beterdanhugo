const epoch = 1577833200;
var cont = true;
var day = 0;

var wdays = ["zo.", "ma.", "di.", "wo.", "do.", "vr.", "za."]
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "oktober", "november", "december"]
var outlets = { "nos": "NOS NIEUWS", "rtl": "RTL NIEUWS", "nu": "NU.NL" }

var speeds = [0, 4000, 2000, 1000];
var speed = 0;

var w = 3;
var d = 1;
var m = 1;
var y = 2020;

var sentNews = [
    ["nu", "0", "Ziekenhuizen ziet aantal slachtoffers met vuuwerkletsel fors stijgen"]
];
var currentPinned = 0;

function timer() {
    if (speed == 0) {
        return;
    }

    day++;

    var a = intToDate(day);

    document.getElementById('weekday').innerHTML = wdays[a[3]];
    document.getElementById("date").innerHTML = ((a[2] < 10) ? "0" + a[2] : a[2]) + " " + mos[a[1]] + " " + a[0];

    getNews();

    setTimeout(timer, speeds[speed]);
}

function getNews() {
    var title = "";
    var source = "";

    if (day == dateToInt(2020, 1, 3)) {
        title = "China pneumonia outbreak: Mystery virus probed in Wuhan";
        source = "rtl";
    }

    if (day == dateToInt(2020, 1, 6)) {
        title = "Tot nu toe 59 gevallen van mysterieuze longziekte in China";
        source = "nos";
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
    pin.children[2].innerHTML = sentNews[i][2];
    currentPinned = i;
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
    if (speed == 0 && i > 0) {
        speed = i;
        timer();
    } else {
        speed = i;
    }
}