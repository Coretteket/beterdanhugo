const epoch = 1577833200;
var cont = true;
var day = 0;
var counter = 0;

var ldays = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
var wdays = ["zo", "ma.", "di.", "wo.", "do.", "vr.", "za."];
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

var currentPinned = 0;

var stats = { "n": [], "r": [], "t": [] };
var currentStat = 0;

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

var test = [1, 1, 3, 5, 4, 10, 17, 40, 50, 32, 61, 130, 123, 127, 113, 219, 173, 270, 288, 347, 396, 533, 637, 604, 554, 749, 843, 1006, 1167, 1147, 1092, 873, 834, 1008, 1083, 1020, 1002, 1099, 945, 782, 958, 1209, 1327, 1301, 1171, 959, 862, 730, 1069, 1234, 1186, 1023, 748, 716, 708, 874, 805, 647, 651, 405, 193, 388, 507, 478, 437, 338, 201, 319, 319, 361, 319, 287, 243, 179, 195, 223, 274, 202, 194, 125, 148, 111, 187, 254, 184, 177, 173, 213, 129, 194, 178, 178, 141, 176, 104, 95, 93, 188, 217, 190, 239, 166, 164, 181, 162, 207, 181, 144, 159, 134, 113, 124, 108, 90, 95, 68, 70, 80, 110, 93, 77, 66, 76, 57, 62, 75, 76, 65, 72, 41, 34, 57, 60, 65, 84, 95, 72, 98, 109, 119, 109, 145, 145, 183, 169, 170, 164, 155, 184, 213, 209, 224, 248, 341, 341, 431, 359, 372, 487, 428, 605, 517, 484, 577, 787, 620, 651, 576, 627, 656, 498, 487, 493, 553, 531, 533, 507, 455, 573, 416, 572, 508, 501, 503, 506, 526, 467, 720, 599, 743, 649, 920, 795, 969, 1140, 837, 1271, 1222, 1087, 1297, 1376, 1537, 1739, 1955, 1892, 1844, 2211, 2237, 2334, 2536, 2764, 2700, 2976, 2902, 3004, 3286, 3253, 3804, 3935, 3983, 4555, 4519, 4972, 5784, 5960, 6478, 6342, 6803, 7333, 7252, 7778, 7951, 8105, 8148, 7985, 8145, 8715, 9250, 9975, 8642, 10168, 10303, 10267, 8077, 10247, 11067, 9772, 8679, 8265, 7738, 7600, 6946, 7226, 6616, 5656, 4669, 4644, 5383, 5619, 6068, 5897, 5418, 4842, 4280, 4584, 5686, 5932, 6004, 5358, 5181, 3947, 4910, 4468, 5752, 4465, 5565, 4572, 4038, 4908, 5594, 5891, 6529, 6761, 7094, 6119, 6544, 8709, 8837, 9122, 9878, 8461, 6631, 11166, 12778, 11957, 12224, 12997, 11156, 9822, 10393, 11494, 11495, 9815, 9005, 7398, 7518, 9449, 9664, 8170, 8589, 7396, 6632, 6369, 7090, 9678, 8112, 7330, 6602, 5448, 4942, 6091, 6499, 6025, 5295, 5582, 4784, 4295, 5569, 5805, 5746, 5446, 4880, 4090, 3958, 4726, 4691, 4397, 4171, 3678, 3237, 3549, 4018, 4200, 4317, 4089, 3918, 2257, 1759, 3173, 4427, 4325, 4174, 3425, 2842, 2690, 3368, 4558, 4676, 4539, 4669, 4179, 3809, 4369, 4985, 5089, 4923, 4635, 3749, 3965, 5023, 4091, 4663, 5312, 4508, 3884, 4286, 5259, 5297, 5975, 6375, 5954, 5502, 4942, 5908, 6131, 7349, 7602, 6970, 6299, 5609, 7556, 7688, 7559, 8782, 7470, 6781, 5855, 7629, 7819, 7214, 7597, 6861, 5335, 5559, 6369, 7760, 7661, 7659, 8141, 6659, 6722, 5440, 8693, 8890, 8251, 8523, 7160, 6822, 8472, 9578, 9237, 8062, 8020, 6226, 5304, 8652, 7283, 7765, 5783, 5461, 9187, 7757, 7247, 6751, 7461, 7424, 6637, 5861, 5525, 6341, 6012, 5543, 4472, 4424, 2858, 5325, 4549, 4616, 4138, 3173, 3423, 2728, 2484, 2738, 3374, 3840, 3345, 2622, 2020, 2480, 2559, 2761, 2395, 2118, 1569, 1469, 1437, 1751, 1578, 1390, 1240, 1041, 879, 1040, 1024, 1059, 891, 693, 713, 570, 698, 666, 697, 648, 555, 502, 567, 530, 643, 824, 942, 1124, 1204, 1517, 2197, 3614, 5401, 6892, 10246, 9318, 8449, 7814, 10418, 10995, 11277, 11073, 10197, 8886, 6787, 6887, 6249, 6399, 5275, 4635, 3914];

var hosp = [1, 0, 1, 0, 1, 1, 3, 5, 7, 12, 4, 12, 15, 23, 21, 27, 27, 41, 105, 90, 76, 150, 194, 160, 228, 254, 333, 312, 341, 450, 517, 499, 727, 441, 627, 496, 356, 225, 263, 290, 314, 238, 219, 195, 200, 142, 209, 191, 180, 157, 129, 108, 71, 119, 128, 136, 123, 102, 75, 66, 92, 82, 82, 82, 94, 40, 39, 83, 20, 37, 72, 57, 24, 37, 38, 57, 32, 34, 47, 16, 29, 32, 15, 11, 12, 10, 12, 9, 10, 7, 16, 10, 5, 8, 7, 7, 12, 10, 10, 4, 6, 5, 5, 5, 2, 5, 11, 8, 2, 3, 4, 3, 10, 1, 3, 2, 3, 5, 4, 7, 2, 2, 3, 3, 1, 0, 4, 1, 0, 0, 3, 4, 0, 3, 4, 2, 1, 8, 5, 1, 1, 3, 3, 2, 1, 1, 3, 3, 3, 2, 4, 6, 3, 4, 7, 4, 6, 7, 7, 5, 3, 4, 3, 7, 8, 10, 8, 7, 11, 7, 6, 5, 9, 14, 9, 18, 12, 6, 6, 15, 18, 7, 9, 4, 2, 9, 5, 6, 5, 7, 5, 6, 8, 6, 8, 16, 12, 5, 16, 14, 19, 16, 13, 13, 31, 20, 26, 30, 34, 25, 34, 28, 37, 39, 45, 48, 40, 23, 30, 24, 60, 84, 59, 49, 62, 51, 56, 59, 105, 76, 71, 86, 80, 67, 81, 93, 106, 104, 107, 98, 102, 80, 106, 87, 82, 105, 120, 105, 90, 103, 93, 104, 95, 121, 93, 47, 74, 74, 93, 89, 93, 99, 84, 77, 102, 93, 64, 83, 67, 50, 81, 73, 63, 79, 67, 70, 54, 55, 65, 68, 58, 61, 49, 79, 70, 77, 69, 57, 81, 85, 72, 63, 65, 93, 84, 101, 100, 76, 86, 88, 90, 84, 70, 83, 91, 105, 98, 132, 71, 68, 109, 71, 94, 96, 99, 77, 87, 68, 63, 97, 67, 83, 67, 56, 72, 85, 99, 76, 87, 67, 77, 61, 102, 72, 65, 63, 69, 74, 58, 43, 68, 60, 69, 92, 72, 56, 42, 56, 65, 76, 80, 65, 57, 44, 60, 83, 59, 78, 84, 48, 61, 59, 50, 60, 48, 86, 59, 70, 49, 52, 61, 81, 37, 83, 58, 91, 66, 85, 71, 64, 54, 52, 62, 70, 76, 67, 66, 66, 69, 71, 63, 93, 82, 62, 71, 58, 69, 91, 70, 87, 66, 60, 56, 103, 139, 85, 91, 59, 93, 61, 84, 81, 86, 51, 78, 68, 93, 56, 78, 82, 100, 61, 76, 66, 86, 66, 70, 82, 89, 26, 94, 90, 91, 65, 68, 70, 56, 75, 94, 70, 41, 54, 57, 62, 28, 60, 49, 60, 42, 66, 41, 41, 36, 39, 41, 39, 41, 26, 22, 29, 37, 35, 24, 29, 19, 13, 17, 24, 28, 20, 9, 13, 9, 21, 13, 17, 17, 16, 8, 12, 15, 3, 7, 5, 11, 6, 6, 2, 14, 5, 5, 3, 2, 0, 4, 7, 2, 5, 6, 9, 9, 6, 9, 18, 17, 16, 16, 11, 28, 16, 20, 28, 25, 25, 23];

var dead = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 3, 3, 7, 4, 18, 16, 21, 29, 31, 43, 32, 62, 80, 75, 114, 89, 125, 90, 172, 134, 164, 142, 177, 105, 101, 232, 148, 144, 115, 134, 94, 85, 122, 185, 185, 144, 144, 80, 65, 162, 141, 129, 111, 120, 65, 43, 58, 136, 82, 100, 93, 69, 27, 82, 40, 84, 72, 64, 18, 16, 56, 49, 29, 54, 25, 11, 16, 21, 32, 28, 13, 22, 11, 8, 23, 15, 31, 25, 21, 3, 6, 4, 12, 15, 13, 7, 3, 3, 16, 12, 3, 9, 4, 2, 6, 5, 4, 4, 3, 8, 1, 0, 6, 2, 3, 3, 2, 0, 2, 5, 3, 3, 2, 6, 1, 1, 4, 3, 2, 1, 4, 0, 0, 11, 1, 2, 2, 1, 0, 0, 1, 3, 0, 0, 1, 0, 1, 4, 2, 0, 0, 1, 1, 0, 2, 3, 0, 1, 3, 0, 0, 2, 2, 4, 2, 2, 3, 1, 3, 9, 5, 1, 5, 1, 3, 3, 8, 3, 3, 4, 0, 0, 6, 5, 3, 1, 5, 2, 0, 1, 3, 2, 3, 1, 1, 2, 2, 3, 5, 6, 4, 3, 2, 10, 8, 14, 17, 36, 9, 9, 10, 14, 13, 10, 17, 5, 9, 29, 26, 12, 16, 20, 18, 13, 38, 28, 27, 20, 26, 13, 28, 42, 59, 42, 51, 48, 26, 29, 71, 50, 66, 86, 53, 29, 36, 111, 109, 88, 114, 62, 44, 46, 95, 82, 74, 60, 73, 50, 48, 84, 86, 67, 47, 47, 20, 64, 89, 72, 75, 81, 54, 25, 32, 56, 66, 60, 57, 35, 24, 24, 66, 72, 59, 61, 51, 29, 37, 90, 76, 71, 82, 58, 29, 41, 109, 96, 92, 91, 48, 32, 41, 171, 113, 107, 92, 40, 52, 72, 187, 128, 84, 92, 134, 53, 60, 143, 117, 85, 95, 100, 37, 57, 110, 86, 95, 82, 83, 35, 45, 80, 72, 76, 66, 79, 39, 38, 77, 60, 65, 62, 60, 45, 30, 87, 82, 65, 80, 48, 28, 23, 93, 94, 67, 46, 62, 20, 33, 93, 63, 29, 71, 37, 17, 21, 66, 49, 31, 31, 41, 29, 36, 53, 26, 48, 30, 19, 24, 22, 30, 47, 34, 41, 18, 16, 15, 53, 27, 26, 22, 29, 14, 13, 35, 31, 19, 16, 30, 15, 8, 23, 23, 21, 41, 21, 14, 19, 34, 26, 12, 18, 26, 13, 22, 26, 18, 19, 18, 17, 14, 14, 27, 16, 16, 26, 18, 3, 21, 29, 30, 18, 25, 27, 2, 19, 43, 18, 11, 11, 13, 15, 7, 13, 16, 19, 11, 20, 6, 13, 15, 6, 18, 15, 7, 7, 2, 8, 11, 13, 10, 6, 3, 4, 13, 6, 4, 3, 1, 3, 3, 1, 4, 4, 3, 1, 1, 1, 6, 1, 1, 5, 0, 1, 0, 4, 0, 4, 6, 1, 0, 1, 1, 2, 2, 2, 1, 1, 0, 3, 1, 3, 2, 0, 1, 2, 5, 3, 3, 3, 4, 4, 1];

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