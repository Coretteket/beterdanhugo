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

var lname = "";
//dev in graph.js

var started = false;
var gameOver = false;

dev && (speeds[3] = 100, lname = "De Jonge", start());

function checkStart() {
    lname = q("lname").value.replace(/[\[\]0-9\(\)\.,?!=+<>/\\\n%_@#$€^&*]/gi, '');
    lname = lname.charAt(0).toUpperCase() + lname.slice(1);
    var starttxt = q("starttxt");
    if (lname.replace(/ /g, '') == "") {
        starttxt.innerText = "Kies eerst een achternaam.";
        setTimeout((function() { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }), 4e3);
    } else if (lname.length > 25) {
        starttxt.innerText = "Kies een kortere achternaam.";
        setTimeout((function() { starttxt.innerHTML = "Voor we beginnen, hoe mogen we je noemen?"; }), 4e3);
    } else {
        //
        start();
    }
}

function start() {
    q("timechoice").removeAttribute("class");
    q("col1").removeAttribute("class");
    q("col2").removeAttribute("class");
    q("news").removeAttribute("class");
    q("start").classList = "d-none";
    q("pinned").classList = "box mob";
    q("firstnews").classList = "box desk";
    q("chartbox").classList = "box";
    q("disclaimermob").classList = "d-none"
    newsSize();
    started = true;
}

function end() {
    pause();
    gameOver = true;

    var resImmune = (Math.round(s.R / s.N * 1000) / 10).toLocaleString('nl-NL', { minimumFractionDigits: 0 });;
    var resImmuneSev = Math.abs((s.R / s.N - 0.047) / 0.047) > .8 ? "veel " : "";
    var resDeadSev = Math.abs((s.R / s.N - 0.047) / 0.047) > .8 ? "" : "iets ";
    var resMore = s.R / s.N > 0.047 ? "meer" : "minder";
    var resGood = s.R / s.N < 0.047 ? "gelukkig" : "helaas";
    var resDead = (Math.round(s.F / 100) * 100).toLocaleString('nl-NL', { minimumFractionDigits: 0 });
    q("results").innerHTML = `Dan: hoe heb je het eigenlijk gedaan? In jouw simulatie werd in vier maanden tijd zo'n <strong>${resImmune}% van de bevolking</strong> besmet. Dat zijn <strong>${resImmuneSev}${resMore} mensen</strong> dan de 4,7% die in het echt besmet raakten. Hierdoor vielen er ${resGood} ook ${resDeadSev}${resMore} doden te betreuren in jouw simulatie, er was namelijk een oversterfte van ongeveer <strong>${resDead} mensen</strong>.`;

    setTimeout(function() {
        q("timechoice").classList = "d-none";
        q("col1").classList = "d-none";
        q("col2").classList = "d-none";
        q("news").classList = "d-none";
        q("gameover").classList = "";
        confettiStart = Date.now()
        confettiFrame();
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

    updateStats();
    setNews();
    setChoices();
    showActions();
    checkBtn();
    showTut();
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
        div.setAttribute("class", "box desk");
        div.innerHTML += '<img class="logo" src="img/' + source + '.png" width="16" height="16">';
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
        addData(hospChart, day, calcR());
        q("hospCount").innerText = Math.round(calcR() * 100) / 100;
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
    q("choice").classList = "d-none";
    unpause();
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
    toggled = true;
    if (s == 'test') {
        q("testCnt").classList = "chartcnt";
        q("hospCnt").classList = "chartcnt d-none";
        q("deadCnt").classList = "chartcnt d-none";
        q("testBtn").classList = "col statbtn statbtnactive";
        q("hospBtn").classList = "col statbtn";
        q("deadBtn").classList = "col statbtn";
    } else if (s == 'hosp') {
        q("hospCnt").classList = "chartcnt";
        q("testCnt").classList = "chartcnt d-none";
        q("deadCnt").classList = "chartcnt d-none";
        q("hospBtn").classList = "col statbtn statbtnactive";
        q("testBtn").classList = "col statbtn";
        q("deadBtn").classList = "col statbtn";
    } else if (s == 'dead') {
        q("deadCnt").classList = "chartcnt";
        q("testCnt").classList = "chartcnt d-none";
        q("hospCnt").classList = "chartcnt d-none";
        q("deadBtn").classList = "col statbtn statbtnactive";
        q("testBtn").classList = "col statbtn";
        q("hospBtn").classList = "col statbtn";
    }
}

var FAQ = false;
var preSpeed = 0;

function toggleFAQ() {
    if (FAQ && !gameOver && started) {
        window.scrollTo(0, 0);
        q("timechoice").classList = "";
        q("col1").classList = "";
        q("col2").classList = "";
        q("news").classList = "";
        q("faq").classList = "d-none";
        q("knowmore").innerHTML = "Meer weten?";
        FAQ = false;
        setSpeed(preSpeed);
    } else if (FAQ && !started) {
        window.scrollTo(0, 0);
        q("disclaimermob").classList = "mob";
        q("start").classList = "";
        q("faq").classList = "d-none";
        FAQ = false;
        q("knowmore").innerHTML = "Meer weten?";
    } else if (FAQ && gameover) {
        window.scrollTo(0, 0);
        q("faq").classList = "d-none";
        q("gameover").classList = "";
        FAQ = false;
    } else {
        window.scrollTo(0, 0);
        q("disclaimermob").classList = "d-none";
        q("gameover").classList = "d-none";
        q("timechoice").classList = "d-none";
        q("col1").classList = "d-none";
        q("col2").classList = "d-none";
        q("news").classList = "d-none";
        q("start").classList = "d-none";
        q("faq").classList = "";
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


var colors = ["#F94144", "#F8961E", "#F9C74F", "#43AA8B", "#277DA1"];

function confettiFrame() {
    var mob = $(document).height() > $(document).width();
    if (!mob) {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 120,
            origin: { x: -.05, y: .4 },
            colors: colors,
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 120,
            origin: { x: 1.05, y: .4 },
            colors: colors,
        });
    } else {
        confetti({
            particleCount: 5,
            angle: 270,
            spread: 55,
            origin: { y: -.5 },
            colors: colors,
        });
    }

    if (Date.now() < confettiStart + 1000) {
        requestAnimationFrame(confettiFrame);
    }
}

function randBetween(min, max) {
    return Math.random() * (max - min) + min; //Math.floor(
}

function q(i) {
    return document.getElementById(i);
}

if (!Array.prototype.last) {
    Array.prototype.last = function() {
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

Object.keys(outlets).forEach(element => {
    var img = new Image();
    img.src = "./img/" + element + ".png";
});

if (!dev) {
    $(window).bind('beforeunload', (function() {
        if (!gameOver && started) {
            return window.confirm();
        }
    }));
}

for (var i = day; i < 11; i++) {
    day++;
    day < 10 ? calcCOV() : updateStats();
}
var aa = intToDate(day);
q("date").innerHTML = aa[2] + " " + mos[aa[1]] + " " + aa[0];
setChoices();

function newsSize() {
    if (q('col1').offsetHeight == q('col2').offsetHeight) {
        var pos1 = Math.round(q('stats').getBoundingClientRect().bottom);
        var pos2 = Math.round(q('news').getBoundingClientRect().top);
        var height = document.documentElement.clientHeight;
        q('news').setAttribute("style", "max-height: " + (height - pos2 - 10) + "px;");
        q('scroll').setAttribute("style", "max-height: " + (height - pos1 - 10) + "px;");
    } else {
        var maxheight = q('timechoice').offsetHeight;
        var sheight = q('stats').offsetHeight;
        maxheight += q('col1').offsetHeight;
        maxheight += q('col2').offsetHeight;
        q('news').setAttribute("style", "max-height: " + maxheight + "px;");
        q('scroll').setAttribute("style", "max-height: " + (maxheight - sheight) + "px;");
    }
}

window.addEventListener('resize', function(event) {
    newsSize();
}, true);