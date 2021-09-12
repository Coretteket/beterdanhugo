var id = "id" + Math.random().toString(16).slice(2);

const epoch = 1581894e3;
var cont = true;
var day = -1;

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
//dev in graph.js

var started = false;
var gameOver = false;

dev && (speeds[3] = 100, start());
beta && start();

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

var startTime = 0;

function start() {
    startTime = +new Date();
    show("head", "timechoice", "col1", "col2", "news");
    hide("start", "disclaimermob", "wip");
    newsSize();
    started = true;
    post(`id=${id}&start=${startTime}`);
}

function end() {
    pause();
    gameOver = true;
    var prop = Math.abs((s.R / s.N - 0.047) / 0.047);
    var resImmune = (Math.round(s.R / s.N * 1000) / 10).toLocaleString('nl-NL', { minimumFractionDigits: 0 });;
    var resDead = (Math.round(s.F / 100) * 100).toLocaleString('nl-NL', { minimumFractionDigits: 0 });
    if (prop > .1) {
        var resImmuneSev = prop > .5 ? "veel " : "";
        var resDeadSev = prop > .5 ? "" : "iets ";
        var resMore = s.R / s.N > 0.047 ? "meer" : "minder";
        var resGood = s.R / s.N < 0.047 ? "gelukkig" : "helaas";
        q("results").innerHTML = `Dan: hoe heb je het eigenlijk gedaan? In jouw simulatie werd in vier maanden tijd <strong>${resImmune}% van de bevolking</strong> besmet. Dat zijn <strong>${resImmuneSev}${resMore} mensen</strong> dan de 4,7% die in het echt besmet raakten. Hierdoor vielen er ${resGood} ook ${resDeadSev}${resMore} doden te betreuren in jouw simulatie, in totaal zo'n <strong>${resDead} mensen</strong>.`;
    } else {
        q("results").innerHTML = `Dan: hoe heb je het eigenlijk gedaan? In jouw simulatie werd in vier maanden tijd <strong>${resImmune}% van de bevolking</strong> besmet. Dat zijn <strong>ongeveer evenveel mensen</strong> als de 4,7% die in het echt besmet raakten. Hierdoor vielen er helaas ook een vergelijkbaar aantal doden te betreuren in jouw simulatie, in totaal zo'n <strong>${resDead} mensen</strong>.`;
    }

    setTimeout(() => {
        hide("timechoice", "col1", "col2", "news");
        show("gameover");
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

    var a = intToDate(day);
    q("date").innerHTML = a[2] + " " + mos[a[1]] + " " + a[0];

    setNews();
    setChoices();
    showActions();
    checkBtn();
    showTut();
    getIndex();
    updateStats();

    console.log(index);
}

// function timer() {
//     if (speed == 0) {
//         counter = 0;
//         return;
//     }
//     if (counter >= speeds[speed]) {
//         day++;

//         var a = intToDate(day);
//         q("date").innerHTML = a[2] + " " + mos[a[1]] + " " + a[0];

//         updateStats();
//         setNews();
//         setChoices();
//         showActions();
//         checkBtn();
//         showTut();

//         console.log(counter);
//         counter = 0;
//         lastHit = new Date();
//     }

//     setTimeout(timer, 10);
//     var hit = new Date();
//     counter = hit - lastHit;
// }

var title = "";
var source = "";

var snws = [];

function setNews() {
    title = ""
    source = "";

    getNews();

    if (day == 11) {
        var div = q("firstnews");
        div.innerHTML = '<img class="logo" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo"><p class="app">' + outlets[source] + ' &ndash; do. 27 februari</p><p class="newstitle">' + title + '</p>';
        var div = q("content");
        div.innerHTML = '<img src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo"><p class="app">' + outlets[source] + ' &ndash; do. 27 februari</p><a id="totop" onclick="updatePinned(snws.length-1);" style="opacity: 0;">+1</a><p class="newstitle">' + title + '</p>';
        snws = [
            [source, "-1", title]
        ];
    } else if (title != "") {
        var a = intToDate(day);
        var div = document.createElement('div');
        div.setAttribute("class", "box desk");
        div.innerHTML += '<img class="logo" src="img/' + source + '.jpg" width="16" height="16" alt="' + outlets[source] + ' logo">';
        div.innerHTML += '<p class="app">' + outlets[source] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]] + '</p>';
        div.innerHTML += "<p class='newstitle'>" + title + "</p>";
        var news = q("tut");
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
    if (dev) {
        addData(hospChart, day, mindex);
        q("hospCount").innerText = Math.round(mindex);
    } else {
        addData(hospChart, day, s.H);
        q("hospCount").innerText = s.H;
    }
    addData(deadChart, day, s.D);
    q("deadCount").innerText = s.D;
}

function pause() {
    q("s1").style = "opacity:.4;cursor:default;transition:opacity .5s;";
    q("s2").style = "opacity:.4;cursor:default;transition:opacity .5s;";
    q("s3").style = "opacity:.4;cursor:default;transition:opacity .5s;";
    q("col1").classList = "freeze";
    q("col2").classList = "freeze";
    preSpeed = speed;
    setSpeed(0);
    paused = true;
}

function unpause() {
    q("s1").style = "opacity:1;transition: opacity .5s;";
    q("s2").style = "opacity:1;transition: opacity .5s;";
    q("s3").style = "opacity:1;transition: opacity .5s;";
    q("toggles").classList = "row";
    paused = false;
    setSpeed(preSpeed);
}

function setChoices() {
    getChoices();
    if (cho != "") {
        q("choice").classList = "choice";
        var sethtml = "";
        sethtml += chotit != "" ? "<b>" + chotit + "</b>" : "";
        sethtml += "<p>" + cho + "</p>";
        q("choice").innerHTML = sethtml;
        var setchos = "<div class='row'>";
        for (const [key, value] of Object.entries(chobtns)) {
            setchos += "<div class='col-lg-4'><a class='btn txt' onclick='" + value + "'>" + key + "</a></div>"
        }
        q("choice").innerHTML += setchos + "</div>";
        pause();
    }
}

function delActions() {
    hide("choice");
    unpause();
}

function updatePinned(i) {
    if (i >= snws.length || i < 0) {
        return;
    }
    var pin = q('content');
    var a = intToDate(snws[i][1]);
    pin.children[0].setAttribute('src', 'img/' + snws[i][0] + '.jpg');
    pin.children[1].innerHTML = outlets[snws[i][0]] + ' &ndash; ' + wdays[a[3]] + ' ' + a[2] + ' ' + mos[a[1]];
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
    if (!beta) return;
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
            q("btn-" + freeze[day][i]).style = "opacity:.4;cursor:default;transition: opacity .5s;";
            q("btn-" + freeze[day][i]).removeAttribute("onclick");
        }
    }
    if (day in unfreeze) {
        for (var i = 0; i < unfreeze[day].length; i++) {
            q("btn-" + unfreeze[day][i]).style = "opacity:1;transition: opacity .5s;";
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
    document.documentElement.style.overflow = "hidden";
    document.body.clientWidth;
    document.documentElement.setAttribute(
        "data-color-scheme", !lightmode ? "light" : "dark"
    );
    document.documentElement.style.overflow = "";
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
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        }
    };

    xml.open("POST", "https://nieuwindekamer.nl/bdh/data.php", false);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send(i);
}

if (!Array.prototype.last) {
    Array.prototype.last = () => {
        return this[this.length - 1];
    };
};

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !dev) {
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