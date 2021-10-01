var id = "id" + Math.random().toString(16).slice(2);

var url = new URL(window.location.href);
var cid = url.searchParams.get("id");
if (cid != null) {
    id = "cd" + cid + id.substr(2 + cid.length, 1e2);
}

var screenwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var pst = ["`id=${id}&os=${jscd.os}&osv=${jscd.osv}&browser=${jscd.browser}&browserv=${jscd.browserv}&width=${screenwidth}&visit=${visitTime}`", "`id=${id}&start=${startTime}`", "`id=${id}&start=${startTime}&end=${endTime}&deaths=${Math.round(s.F)}`"]

var startTime = 0;

var visitTimeL = +new Date();
var visitTime = Math.floor(new Date() / 1000);
setTimeout(() => { post(0); }, 5e3);

const epoch = 1581894e3;
var cont = true;
var day = -1;

var platform = navigator.userAgent;

var ldays = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
var wdays = ["zo", "ma.", "di.", "wo.", "do.", "vr.", "za."];
var mos = ["err", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

var currentPinned = 0;

var speeds = [0, 3000, 1500, 750];
var speed = 0;
var counter = speeds[3] * 2 / 3;

var w = 4;
var d = 27;
var m = 2;
var y = 2020;

var lname = "De Jonge";

var beta = (url.searchParams.get("beta") != null);
var aname = url.searchParams.get("name");
var dev = (url.searchParams.get("dev") != null);

var started = false;
var gameOver = false;

if (dev) {
    speeds[3] = 100;
    start();
} else if ((beta || cid != null) && aname == null) {
    show("start", "head");
} else if (beta || cid != null) {
    lname = aname;
    start();
} else {
    show("wip");
}

function checkStart() {
    lname = q("lname").value.replace(/[\[\]0-9\(\)\.,?!=+<>/\\\n%_@#$€^&*]/gi, '');
    lname = lname.charAt(0).toUpperCase() + lname.slice(1);
    var starttxt = q("starttxt");
    if (lname.replace(/ /g, '') == "") {
        starttxt.innerText = "Kies eerst een achternaam.";
        setTimeout((() => { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }), 4e3);
    } else if (lname.length > 25) {
        starttxt.innerText = "Kies een kortere achternaam.";
        setTimeout((() => { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }), 4e3);
    } else {
        start();
    }
}

function start() {
    startTime = Math.floor(new Date() / 1000);
    show("head", "timechoice", "col1", "col2", "news");
    hide("start", "wip");
    newsSize();
    started = true;
    var delay = 5000 - new Date() + visitTimeL + 1000;
    setTimeout(() => { post(1); }, delay > 0 ? delay : 0);
}

function end() {
    pause();
    gameOver = true;
    var prop = Math.abs((s.R / s.N - 0.047) / 0.047);
    var resImmune = (Math.round(s.R / s.N * 1000) / 10).toLocaleString('nl-NL', { minimumFractionDigits: 0 });;
    var resDead = (Math.round(s.F / 100) * 100).toLocaleString('nl-NL', { minimumFractionDigits: 0 });
    if (prop > .1) {
        var resImmuneSev = prop > .5 ? "veel " : "iets ";
        var resMore = s.R / s.N > 0.047 ? "meer" : "minder";
        var resGood = s.R / s.N < 0.047 ? "gelukkig" : "helaas";
        q("results").innerHTML = `Dan: hoe heb je het eigenlijk gedaan? In jouw simulatie werd in vier maanden tijd <strong>${resImmune}% van de bevolking</strong> besmet. Dat zijn <strong>${resImmuneSev}${resMore} mensen</strong> dan de 4,7% die in het echt besmet raakten. Hierdoor vielen er ${resGood} ook ${resMore} doden te betreuren in jouw simulatie, in totaal zo'n <strong>${resDead} mensen</strong>.`;
    } else {
        q("results").innerHTML = `Dan: hoe heb je het eigenlijk gedaan? In jouw simulatie werd in vier maanden tijd <strong>${resImmune}% van de bevolking</strong> besmet. Dat zijn <strong>ongeveer evenveel mensen</strong> als de 4,7% die in het echt besmet raakten. Hierdoor vielen er helaas ook een vergelijkbaar aantal doden te betreuren in jouw simulatie, in totaal zo'n <strong>${resDead} mensen</strong>.`;
    }

    getIndex();

    setTimeout(() => {
        hide("timechoice", "col1", "col2", "news");
        show("gameover");
        endTime = Math.floor(new Date() / 1000);
        post(2);
        // confettiStart = Date.now()
        // confettiFrame();
    }, !dev ? 1500 : 0);
}

function startTimer() {
    startedAt = Date.now();
    requestAnimationFrame(timer);
}

function timer() {
    if (speed == 0) return;
    let playback = (Date.now() - startedAt) / speeds[speed];
    if (playback >= 1) update();

    if (playback > 0 && playback < 1) {
        requestAnimationFrame(timer)
    } else {
        startTimer();
    }
}

function update() {
    day++;

    if (day == dateToInt(2020, 7, 1)) { end(); return; };
    if (day == 12) {
        q("btn-socdis").classList.add("nudge");
    }

    for (const [k, v] of Object.entries(a)) { if (g(k)) a[k][5]++; };

    var intdate = intToDate(day);
    q("date").innerHTML = intdate[2] + " " + mos[intdate[1]] + " " + intdate[0];

    setChoices();
    checkBtn();
    // getIndex();
    updateStats();
    setNews();
}

function restart() {
    if (window.location.href.includes("&name")) {
        window.location.href += "";
    } else if (window.location.href.includes("?")) {
        window.location.href += '&name=' + lname;
    } else {
        window.location.href += '?name=' + lname;
    }

}

function act(i, j) {
    a[i][0] = j;
}

function choose(i, j) {
    c[i][0] = j;
}

var title = "";
var source = "";

var snws = [];

function setNews() {
    title = ""
    source = "";

    getNews();

    if (day == 11) {
        var div = q("firstnews");
        div.innerHTML = '<img draggable="false" class="logo" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo"><p class="app">' + outlets[source] + ' · do. 27 februari</p><p class="newstitle">' + title + '</p>';
        var div = q("content");
        div.innerHTML = '<img draggable="false" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo"><p class="app">' + outlets[source] + ' · <span class="big">do. </span>27 februari</p><a id="totop" onclick="updatePinned(snws.length-1);" style="opacity: 0;">+1</a><p class="newstitle">' + title + '</p>';
        snws = [
            [source, "-1", title]
        ];
    } else if (title != "") {
        var a = intToDate(day);
        var div = document.createElement('div');
        div.setAttribute("class", "box desk");
        div.innerHTML += '<img class="logo" draggable="false" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo">';
        div.innerHTML += '<p class="app">' + outlets[source] + ' · ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]] + '</p>';
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
            q("news").children[7].setAttribute("class", "rembox desk");
        }*/

    }
}

var paused = false;

function updateStats() {
    calcCOV();
    addData(testChart, day, s.P);
    q("testCount").innerText = s.P;
    addData(hospChart, day, s.B);
    q("hospCount").innerText = s.H;
    addData(deadChart, day, s.D);
    q("deadCount").innerText = s.D;
}

function pause() {
    preSpeed = speed;
    setSpeed(0);
    q("s1").classList = "btn paused";
    q("s2").classList = "btn paused";
    q("s3").classList = "btn paused";
    q("col1").classList.add("freeze");
    q("col2").classList.add("freeze");
    paused = true;
}

function unpause() {
    q("s1").classList.remove("paused");
    q("s2").classList.remove("paused");
    q("s3").classList.remove("paused");
    q("col1").classList.remove("freeze");
    q("col2").classList.remove("freeze");
    paused = false;
    setSpeed(preSpeed);
}

function setChoices() {
    getChoices();
    if (cho != "") {
        var sethtml = "";
        sethtml += "<p>" + cho + "</p>";
        for (const [key, value] of Object.entries(chobtns)) {
            sethtml += "<a class='btn txt' onclick='" + value + "'>" + key + "</a>"
        }
        q("choice").innerHTML = sethtml;
        q("main").classList = "withchoice";
        q("choice").classList.remove("remchoice");
        show("choice")
        pause();
    }
}

function delActions() {
    q("choice").classList.add("remchoice");
    setTimeout(() => {
        hide("choice");
        q("main").classList = "wochoice";
        unpause();
    }, 400);

}

function updatePinned(i) {
    if (i >= snws.length || i < 0) {
        return;
    }
    var pin = q('content');
    var a = intToDate(snws[i][1]);
    pin.children[0].setAttribute('src', 'img/' + snws[i][0] + '.jpg');
    pin.children[1].innerHTML = outlets[snws[i][0]] + ' · <span class="big">' + wdays[a[3]] + ' </span>' + a[2] + ' ' + mos[a[1]];
    pin.children[3].innerHTML = snws[i][2];

    currentPinned = i;

    var pluswhat = snws.length - currentPinned - 1;
    q("totop").innerHTML = "+" + pluswhat;

    if (currentPinned == snws.length - 1) {
        q("up").classList = "inactive";
        q("down").classList = "active";
        q("totop").style = "opacity: 0;";
    } else if (currentPinned == 0) {
        q("up").classList = "active";
        q("down").classList = "inactive";
        q("totop").style = "opacity: 1;";
    } else {
        q("up").classList = "active";
        q("down").classList = "active";
        q("totop").style = "opacity: 1;";
    }
}

var toggled = false;


function toggleStat(s) {
    var o = ["test", "hosp", "dead"];
    if (!o.includes(s)) return;
    toggled = true;
    removeItem(o, s);
    show(s + "Cnt");
    hide(o[0] + "Cnt", o[1] + "Cnt");
    q(s + "Btn").classList.add("statbtnactive");
    q(o[0] + "Btn").classList.remove("statbtnactive");
    q(o[1] + "Btn").classList.remove("statbtnactive");
}

var FAQ = false;
var preSpeed = 0;

function toggleFAQ() {
    if ((!beta && !dev) || (paused && !gameOver)) return;
    if (FAQ && !gameOver && started) {
        window.scrollTo(0, 0);
        show("timechoice", "col1", "col2", "news");
        hide("faq");
        q("knowmore").innerHTML = "Meer weten?";
        FAQ = false;
        setSpeed(preSpeed);
    } else if (FAQ && !started) {
        window.scrollTo(0, 0);
        show("disclaimermob", "start");
        hide("faq");
        q("knowmore").innerHTML = "Meer weten?";
        FAQ = false;
    } else if (FAQ && gameover) {
        window.scrollTo(0, 0);
        hide("faq");
        show("gameover");
        FAQ = false;
    } else {
        window.scrollTo(0, 0);
        hide("disclaimermob", "gameover", "timechoice", "col1", "col2", "news", "start");
        show("faq");
        q("knowmore").innerHTML = "Terug naar spel.";
        FAQ = true;
        preSpeed = speed;
        setSpeed(0);
    }
}

var toggles = [];
var unfreeze = {};
var freeze = {};
var lock = ["eduni", "shops", "horeca", "clubs", "gather", "theater", "events", "workhome", "socdis"];

function toggleBtn(btn) {
    if (paused) { return; }
    if (q("btn-socdis").classList.contains("nudge")) q("btn-socdis").classList.remove("nudge");
    if (toggles.includes(btn)) {
        removeItem(toggles, btn);
    } else {
        toggles.push(btn);
    };
    if (!q("btn-" + btn).classList.contains("txtsel")) {
        q("btn-" + btn).classList = "btn txt txtsel";
        if (btn == "lockdown" && q("btn-curfew").classList.contains("txtsel")) {
            q("btn-curfew").classList = "btn txt";
            if (toggles.includes("curfew")) {
                removeItem(toggles, "curfew");
            } else {
                toggles.push("curfew");
            }
        } else if (btn == "curfew" && q("btn-lockdown").classList.contains("txtsel")) {
            q("btn-lockdown").classList = "btn txt";
            if (toggles.includes("lockdown")) {
                removeItem(toggles, "lockdown");
            } else {
                toggles.push("lockdown");
            }
        }
    } else {
        q("btn-" + btn).classList = "btn txt";
        if (q("btn-lockdown").classList.contains("txtsel") && lock.includes(btn)) {
            q("btn-lockdown").classList = "btn txt";
            if (toggles.includes("lockdown")) {
                removeItem(toggles, "lockdown");
            } else {
                toggles.push("lockdown");
            }
        } else if (q("btn-curfew").classList.contains("txtsel") && btn == "clubs") {
            q("btn-curfew").classList = "btn txt";
            if (toggles.includes("curfew")) {
                removeItem(toggles, "curfew");
            } else {
                toggles.push("curfew");
            }
        }
    }
    if (btn == "lockdown") {
        for (var i = 0; i < lock.length; i++) {
            if (!q("btn-" + lock[i]).classList.contains("txtsel")) {
                toggleBtn(lock[i]);
            }
        }
    } else if (btn == "curfew") {
        if (!q("btn-clubs").classList.contains("txtsel")) {
            toggleBtn("clubs");
        }
    }
}

function checkBtn() {
    for (var i = 0; i < toggles.length; i++) {
        var btn = toggles[i];
        var abtn = eval("a." + btn);
        var delay = abtn[3];
        if (abtn[0] <= 0) {
            act(btn, day);
            if (day in freeze) {
                freeze[day].push(btn);
            } else {
                freeze[day] = [btn];
            }
            if (day + delay in unfreeze) {
                unfreeze[day + delay].push(btn);
            } else {
                unfreeze[day + delay] = [btn];
            }
        } else {
            act(btn, -day);
            if (day in freeze) {
                freeze[day].push(btn);
            } else {
                freeze[day] = [btn];
            }
            if (day + delay in unfreeze) {
                unfreeze[day + delay].push(btn);
            } else {
                unfreeze[day + delay] = [btn];
            }
        }
    }
    toggles = [];
    if (day in freeze) {
        for (var i = 0; i < freeze[day].length; i++) {
            q("btn-" + freeze[day][i]).classList.add("paused");
            q("btn-" + freeze[day][i]).classList.remove("nudge");
            q("btn-" + freeze[day][i]).removeAttribute("onclick");
        }
    }
    if (day in unfreeze) {
        for (var i = 0; i < unfreeze[day].length; i++) {
            q("btn-" + unfreeze[day][i]).classList.remove("paused");
            q("btn-" + unfreeze[day][i]).setAttribute("onclick", "toggleBtn('" + unfreeze[day][i] + "');");
        }
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

var sped = false;

function setSpeed(i) {
    if (speed == i || paused || gameOver) return;
    sped = true;
    if (speed > 0) {
        preSpeed = speed;
    }

    q("s" + speed).setAttribute('class', 'btn');
    q("s" + i).setAttribute('class', 'btn tsel');
    if (speed == 0 && i > 0) {
        q("s1").classList.remove("nudge")
        speed = i;
        startTimer();
    } else {
        speed = i;
    }
}

var lightmode = true;

function colorSwitch() {
    q(lightmode ? "light" : "dark").classList.add("notrans");
    document.documentElement.style.overflow = "hidden";
    document.body.clientWidth;
    document.documentElement.setAttribute(
        "data-color-scheme", !lightmode ? "light" : "dark"
    );
    document.documentElement.style.overflow = "";
    if (lightmode) {
        q("light").setAttribute("id", "dark");
        q("colormode").getElementsByTagName("i")[0].innerHTML = "&#xf185;";

        lightmode = false;
    } else {
        q("dark").setAttribute("id", "light");
        q("colormode").getElementsByTagName("i")[0].innerHTML = "&#xf186;";
        lightmode = true;
    }
    q(lightmode ? "light" : "dark").offsetHeight;
    q(lightmode ? "light" : "dark").classList.remove("notrans");
}

function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}


// var colors = ["#F94144", "#F8961E", "#F9C74F", "#43AA8B", "#277DA1"];

// function confettiFrame() {
//     var mob = $(document).height() > $(document).width();
//     if (!mob) {
//         confetti({
//             particleCount: 5,
//             angle: 60,
//             spread: 120,
//             origin: { x: -.05, y: .4 },
//             colors: colors,
//         });
//         confetti({
//             particleCount: 5,
//             angle: 120,
//             spread: 120,
//             origin: { x: 1.05, y: .4 },
//             colors: colors,
//         });
//     } else {
//         confetti({
//             particleCount: 5,
//             angle: 270,
//             spread: 55,
//             origin: { y: -.5 },
//             colors: colors,
//         });
//     }

//     if (Date.now() < confettiStart + 1000) {
//         requestAnimationFrame(confettiFrame);
//     }
// }

function randBetween(min, max) {
    return Math.random() * (max - min) + min; //Math.floor(
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function q(i) {
    return document.getElementById(i);
}

function show() {
    for (j = 0; j < arguments.length; j++) {
        q(arguments[j]).classList.remove("hide");
    }
}

function hide() {
    for (j = 0; j < arguments.length; j++) {
        q(arguments[j]).classList.add("hide");
    }
}

function post(i) {
    if (dev) return;
    var xml = new XMLHttpRequest();
    // xml.onreadystatechange = function() { if (xml.readyState == 4 && xml.status == 200) { console.log(xml.responseText); } };
    xml.open("POST", "https://nieuwindekamer.nl/bdh/data.php", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send(eval(pst[i]));
}

// if (!Array.prototype.last) {
//     Array.prototype.last = () => {
//         return this[this.length - 1];
//     };
// };

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorSwitch();
}

q("lname").addEventListener('keydown', (function(event) {
    if (event.key == "Enter") {
        checkStart();
    }
}));

document.addEventListener('keypress', (function(event) {
    if (event.key == ' ' && speed == 0) {
        setSpeed(preSpeed);
    } else if (event.key == ' ' && speed > 0) {
        setSpeed(0);
    } else if (event.key > 0 && event.key < 5 && started) {
        setSpeed(event.key - 1);
    }
}));

// Object.keys(outlets).forEach(element => {
//     var img = new Image();
//     img.src = "./img/" + element + ".jpg";
// });

if (!dev) {
    window.onbeforeunload = () => {
        if (!gameOver && started) {
            return "";
        }
    }
}

function newsSize() {
    if (q('col1').offsetHeight == q('col2').offsetHeight) {
        var pos1 = Math.round(q('stats').getBoundingClientRect().bottom);
        var pos2 = Math.round(q('news').getBoundingClientRect().top);
        var height = document.documentElement.clientHeight;
        q('news').setAttribute("style", "max-height: " + (height - pos2 - 10) + "px;");
        q('scroll').setAttribute("style", "max-height: " + (height - pos1 - 10) + "px;");
    } else {
        var maxheight = q('timechoice').offsetHeight;
        var sheight = q('stats').offsetHeight + 10;
        maxheight += q('col1').offsetHeight;
        maxheight += q('col2').offsetHeight;
        q('news').setAttribute("style", "max-height: " + maxheight + "px;");
        q('scroll').setAttribute("style", "max-height: " + (maxheight - sheight) + "px;");
    }
}

window.addEventListener('resize', function(event) {
    newsSize();
}, true);

for (var i = day; i < 11; i++) {
    day++;
    day < 10 ? calcCOV() : updateStats();
}
var aa = intToDate(day);
q("date").innerHTML = aa[2] + " " + mos[aa[1]] + " " + aa[0];
setChoices();
setNews();

console.log('%cBeter dan Hugo', 'background:#212529;color:#ebebeb;font-size:2.5em;font-family:sans-serif;font-weight:900;padding:20px;border-radius:10px;');
console.log("https://github.com/coretteket/beterdanhugo");